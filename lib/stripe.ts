import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')
  }
  return stripePromise
}

// Create checkout session for subscription
export async function createSubscriptionCheckout(userId: string, email: string) {
  const response = await fetch('/api/checkout/subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, email }),
  })

  const { sessionId, error } = await response.json()

  if (error) {
    throw new Error(error)
  }

  const stripe = await getStripe()
  if (!stripe) {
    throw new Error('Stripe failed to load')
  }

  const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })

  if (stripeError) {
    throw stripeError
  }
}

// Create checkout session for one-time purchase
export async function createOneTimeCheckout(userId: string, email: string) {
  const response = await fetch('/api/checkout/onetime', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, email }),
  })

  const { sessionId, error } = await response.json()

  if (error) {
    throw new Error(error)
  }

  const stripe = await getStripe()
  if (!stripe) {
    throw new Error('Stripe failed to load')
  }

  const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })

  if (stripeError) {
    throw stripeError
  }
}
