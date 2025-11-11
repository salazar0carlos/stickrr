import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { validateEnv } from '@/lib/env'

const env = validateEnv({
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PRICE_ID_SUBSCRIPTION: process.env.STRIPE_PRICE_ID_SUBSCRIPTION,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
}, 'Stripe Subscription Checkout')

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
})

export async function POST(request: NextRequest) {
  try {
    const { userId, email } = await request.json()

    if (!userId || !email) {
      return NextResponse.json(
        { error: 'User ID and email are required' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price: env.STRIPE_PRICE_ID_SUBSCRIPTION,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${env.NEXT_PUBLIC_APP_URL}/studio?success=true`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error('Error creating subscription checkout:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
