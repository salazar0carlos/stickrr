/**
 * Environment variable validation utility
 * Ensures all required environment variables are present
 */

export function validateEnv(variables: Record<string, string | undefined>, context: string): Record<string, string> {
  const missing: string[] = []
  const validated: Record<string, string> = {}

  for (const [key, value] of Object.entries(variables)) {
    if (!value || value === '') {
      missing.push(key)
    } else {
      validated[key] = value
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables for ${context}: ${missing.join(', ')}\n` +
      'Please check your .env.local file and compare with .env.example'
    )
  }

  return validated
}

// Validate Stripe environment variables
export function getStripeEnv() {
  return validateEnv({
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  }, 'Stripe')
}

// Validate Supabase environment variables
export function getSupabaseEnv() {
  return validateEnv({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }, 'Supabase')
}

// Validate Supabase service role (for server-side only)
export function getSupabaseServiceEnv() {
  return validateEnv({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }, 'Supabase Service Role')
}
