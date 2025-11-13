'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { auth } from '@/lib/supabase'
import { useDesignerStore } from '@/store/designerStore'
import Studio from '@/components/designer/Studio'

export default function StudioPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [loadingLabel, setLoadingLabel] = useState(false)
  const loadLabel = useDesignerStore((state) => state.loadLabel)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const currentUser = await auth.getUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)
    setLoading(false)

    // Check if there's a label query parameter
    const labelId = searchParams.get('label')
    if (labelId) {
      setLoadingLabel(true)
      await loadLabel(labelId)
      setLoadingLabel(false)
    }
  }

  if (loading || loadingLabel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-6 text-lg font-medium text-gray-700">
            {loadingLabel ? 'Loading your label...' : 'Getting your studio ready...'}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {loadingLabel ? 'Just a moment...' : 'Time to make something awesome!'}
          </p>
        </div>
      </div>
    )
  }

  return <Studio />
}
