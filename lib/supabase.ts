import { createClient } from '@supabase/supabase-js'
import type { Label, LabelDownload, Subscription, OneTimePurchase } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const auth = {
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },

  async getUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },
}

// Label operations
export const labels = {
  async create(labelData: Omit<Label, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('labels')
      .insert(labelData)
      .select()
      .single()
    return { data, error }
  },

  async update(id: string, labelData: Partial<Label>) {
    const { data, error } = await supabase
      .from('labels')
      .update({ ...labelData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('labels')
      .delete()
      .eq('id', id)
    return { error }
  },

  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('labels')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('labels')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },
}

// Download tracking
export const downloads = {
  async track(userId: string, labelId: string) {
    const { data, error } = await supabase
      .from('label_downloads')
      .insert({ user_id: userId, label_id: labelId })
      .select()
      .single()
    return { data, error }
  },

  async countByUser(userId: string) {
    const { count, error } = await supabase
      .from('label_downloads')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
    return { count: count || 0, error }
  },
}

// Subscription operations
export const subscriptions = {
  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single()
    return { data, error }
  },

  async create(subscription: Omit<Subscription, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert(subscription)
      .select()
      .single()
    return { data, error }
  },

  async update(userId: string, updates: Partial<Subscription>) {
    const { data, error } = await supabase
      .from('subscriptions')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single()
    return { data, error }
  },
}

// One-time purchases
export const purchases = {
  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('one_time_purchases')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async create(purchase: Omit<OneTimePurchase, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('one_time_purchases')
      .insert(purchase)
      .select()
      .single()
    return { data, error }
  },

  async decrementCredit(purchaseId: string) {
    const { data, error } = await supabase.rpc('decrement_label_credit', {
      purchase_id: purchaseId,
    })
    return { data, error }
  },
}

// Check user access
export async function checkUserAccess(userId: string) {
  // Check for active subscription
  const { data: subscription } = await subscriptions.getByUser(userId)
  const hasActiveSubscription = subscription?.status === 'active'

  // Check for one-time purchase credits
  const { data: purchaseList } = await purchases.getByUser(userId)
  const remainingCredits = purchaseList?.reduce((sum, p) => sum + p.label_credits, 0) || 0

  // Check free downloads used
  const { count: freeDownloadsUsed } = await downloads.countByUser(userId)

  // Determine if user can download
  const canDownload = hasActiveSubscription || remainingCredits > 0 || freeDownloadsUsed < 3

  return {
    hasActiveSubscription,
    remainingCredits,
    freeDownloadsUsed,
    canDownload,
  }
}
