'use client'

import { X, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PaywallModalProps {
  onClose: () => void
  downloadsUsed: number
}

export default function PaywallModal({ onClose, downloadsUsed }: PaywallModalProps) {
  const router = useRouter()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Lock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Free Limit Reached</h2>
              <p className="text-gray-600 mt-1">
                You've used {downloadsUsed} of 3 free labels
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
            <h3 className="font-bold text-lg text-indigo-900 mb-2">
              Unlock Unlimited Labels
            </h3>
            <p className="text-3xl font-bold text-indigo-600 mb-1">$2.99/month</p>
            <p className="text-sm text-gray-600 mb-4">Cancel anytime</p>
            <button
              onClick={() => router.push('/pricing')}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Subscribe Now
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-2">or</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">One-Time Purchase</h3>
            <p className="text-2xl font-bold text-gray-800 mb-1">$0.49</p>
            <p className="text-sm text-gray-600 mb-4">Per label</p>
            <button
              onClick={() => router.push('/pricing')}
              className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Buy One Label
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
