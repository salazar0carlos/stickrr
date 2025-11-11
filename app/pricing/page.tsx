'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { auth } from '@/lib/supabase'
import { createSubscriptionCheckout, createOneTimeCheckout } from '@/lib/stripe'
import { Check, Zap } from 'lucide-react'

export default function PricingPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    auth.getUser().then(setUser)
  }, [])

  const handleSubscribe = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      await createSubscriptionCheckout(user.id, user.email)
    } catch (error) {
      console.error('Error creating checkout:', error)
      alert('Failed to start checkout. Please try again.')
      setLoading(false)
    }
  }

  const handleOneTime = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      await createOneTimeCheckout(user.id, user.email)
    } catch (error) {
      console.error('Error creating checkout:', error)
      alert('Failed to start checkout. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start with 3 free labels. Choose the plan that works best for you.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
                <p className="text-gray-600">Try it out</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">3 free label downloads</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Access to all templates</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Full customization</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">PDF export</span>
                </li>
              </ul>

              <button
                onClick={() => router.push('/signup')}
                className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Get Started
              </button>
            </div>

            {/* Subscription Plan - Featured */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 border-2 border-indigo-500 transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  MOST POPULAR
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="text-4xl font-bold text-white mb-2">$2.99</div>
                <p className="text-indigo-100">per month</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white font-semibold">Unlimited labels</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">All templates</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Cancel anytime</span>
                </li>
              </ul>

              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full bg-white text-indigo-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Subscribe Now'}
              </button>
            </div>

            {/* One-Time Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pay As You Go</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">$0.49</div>
                <p className="text-gray-600">per label</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">No subscription</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Pay only for what you need</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">All features included</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Credits never expire</span>
                </li>
              </ul>

              <button
                onClick={handleOneTime}
                disabled={loading}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Buy One Label'}
              </button>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2">Can I try before I buy?</h3>
                <p className="text-gray-600">
                  Yes! Every new account gets 3 free label downloads to try out all features.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2">Can I cancel my subscription?</h3>
                <p className="text-gray-600">
                  Absolutely. You can cancel your subscription at any time from your account settings.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2">What printers are supported?</h3>
                <p className="text-gray-600">
                  Stickrr works with Dymo, Brother, HP, and most thermal label printers. Export as PDF for universal compatibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
