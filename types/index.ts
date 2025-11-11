// Label sizes in inches
export type LabelSize = '2.25x1.25' | '2.25x4' | '3.5x1.125'

// Template types
export type TemplateType = 'seed-packet' | 'mason-jar' | 'freezer' | 'kids-school' | 'pantry'

// Text element on a label
export interface TextElement {
  id: string
  text: string
  x: number
  y: number
  fontSize: number
  fontWeight: 'normal' | 'bold'
  textAlign: 'left' | 'center' | 'right'
  color: string
}

// Icon element on a label
export interface IconElement {
  id: string
  iconName: string
  x: number
  y: number
  size: number
  color: string
}

// Label data structure
export interface LabelData {
  backgroundColor: string
  textElements: TextElement[]
  iconElements: IconElement[]
}

// Template definition
export interface Template {
  id: string
  name: string
  description: string
  type: TemplateType
  category: string
  defaultSize: LabelSize
  defaultData: LabelData
  thumbnail?: string
}

// Saved label in database
export interface Label {
  id: string
  user_id: string
  template_id: string
  label_size: LabelSize
  label_data: LabelData
  created_at: string
  updated_at: string
}

// Printer profile for PDF export
export interface PrinterProfile {
  id: string
  name: string
  dpi: number
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
  type: 'thermal' | 'inkjet' | 'laser'
}

// Label download tracking
export interface LabelDownload {
  id: string
  user_id: string
  label_id: string
  downloaded_at: string
}

// Subscription
export interface Subscription {
  id: string
  user_id: string
  stripe_customer_id: string
  stripe_subscription_id: string | null
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  plan_type: 'free' | 'subscription' | 'onetime'
  current_period_end: string | null
  created_at: string
}

// One-time purchase
export interface OneTimePurchase {
  id: string
  user_id: string
  stripe_payment_id: string
  label_credits: number
  created_at: string
}

// User access status
export interface UserAccess {
  hasActiveSubscription: boolean
  remainingCredits: number
  freeDownloadsUsed: number
  canDownload: boolean
}

// Print options
export interface PrintOptions {
  printerProfile: PrinterProfile
  copies: number
  layout: 'single' | '6-up' | '12-up'
}
