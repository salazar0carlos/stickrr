import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { validateEnv } from '@/lib/env'

// Lazy initialization to avoid build-time errors
let stripe: Stripe | null = null
let supabase: SupabaseClient | null = null
let env: Record<string, string> | null = null

function getClients() {
  if (!stripe || !supabase || !env) {
    env = validateEnv({
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    }, 'Stripe Webhook')

    stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })

    supabase = createClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY
    )
  }
  return { stripe, supabase, env }
}

export async function POST(request: NextRequest) {
  const { stripe, supabase: supabaseClient, env } = getClients()
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session, supabaseClient)
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription, supabaseClient)
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(deletedSubscription, supabaseClient)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error processing webhook:', message, error)
    // Return 500 to trigger Stripe retry
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session, supabase: SupabaseClient) {
  const userId = session.metadata?.userId
  if (!userId) {
    console.error('No userId in session metadata')
    throw new Error('Missing userId in session metadata')
  }

  if (session.mode === 'subscription') {
    // Handle subscription
    const subscriptionId = session.subscription as string

    const { error } = await supabase.from('subscriptions').upsert({
      user_id: userId,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: subscriptionId,
      status: 'active',
      plan_type: 'subscription',
    })

    if (error) {
      console.error('Database error in subscription webhook:', error)
      throw new Error(`Failed to update subscription: ${error.message}`)
    }
  } else if (session.mode === 'payment') {
    // Handle one-time payment
    const { error } = await supabase.from('one_time_purchases').insert({
      user_id: userId,
      stripe_payment_id: session.payment_intent as string,
      label_credits: 1,
    })

    if (error) {
      console.error('Database error in payment webhook:', error)
      throw new Error(`Failed to record payment: ${error.message}`)
    }
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription, supabase: SupabaseClient) {
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('Database error in subscription update webhook:', error)
    throw new Error(`Failed to update subscription status: ${error.message}`)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription, supabase: SupabaseClient) {
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('Database error in subscription deletion webhook:', error)
    throw new Error(`Failed to cancel subscription: ${error.message}`)
  }
}
