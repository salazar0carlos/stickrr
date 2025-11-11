import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(request: NextRequest) {
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
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription)
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(deletedSubscription)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  if (!userId) {
    console.error('No userId in session metadata')
    return
  }

  if (session.mode === 'subscription') {
    // Handle subscription
    const subscriptionId = session.subscription as string

    await supabase.from('subscriptions').upsert({
      user_id: userId,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: subscriptionId,
      status: 'active',
      plan_type: 'subscription',
    })
  } else if (session.mode === 'payment') {
    // Handle one-time payment
    await supabase.from('one_time_purchases').insert({
      user_id: userId,
      stripe_payment_id: session.payment_intent as string,
      label_credits: 1,
    })
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
    })
    .eq('stripe_subscription_id', subscription.id)
}
