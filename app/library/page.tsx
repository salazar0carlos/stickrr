'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { auth, labels } from '@/lib/supabase'
import type { Label } from '@/types'
import { FileText, Trash2, Plus } from 'lucide-react'

export default function LibraryPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userLabels, setUserLabels] = useState<Label[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthAndLoadLabels()
  }, [])

  const checkAuthAndLoadLabels = async () => {
    const currentUser = await auth.getUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)

    // Load user's labels
    const { data, error } = await labels.getByUser(currentUser.id)
    if (data) {
      setUserLabels(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this label?')) {
      return
    }

    const { error } = await labels.delete(id)
    if (error) {
      alert('Failed to delete label. Please try again.')
    } else {
      setUserLabels(userLabels.filter((label) => label.id !== id))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your labels...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">My Labels</h1>
              <p className="text-gray-600 mt-2">
                {userLabels.length} {userLabels.length === 1 ? 'label' : 'labels'} saved
              </p>
            </div>
            <button
              onClick={() => router.push('/designer')}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              <Plus className="w-5 h-5" />
              Create New Label
            </button>
          </div>

          {/* Labels Grid */}
          {userLabels.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No labels yet</h2>
              <p className="text-gray-600 mb-6">
                Create your first label to get started
              </p>
              <button
                onClick={() => router.push('/designer')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Create Label
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userLabels.map((label) => (
                <div
                  key={label.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group"
                >
                  {/* Preview */}
                  <div
                    className="h-48 flex items-center justify-center p-6"
                    style={{ backgroundColor: label.label_data.backgroundColor }}
                  >
                    <div className="text-center">
                      {label.label_data.textElements.slice(0, 2).map((element) => (
                        <div
                          key={element.id}
                          style={{
                            fontSize: element.fontSize * 0.8,
                            fontWeight: element.fontWeight,
                            color: element.color,
                          }}
                          className="truncate"
                        >
                          {element.text}
                        </div>
                      ))}
                      <div className="text-sm text-gray-500 mt-2">
                        {label.label_size.replace('x', ' × ')}"
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        {formatDate(label.created_at)}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {label.template_id}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/designer?label=${label.id}`)}
                        className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(label.id)}
                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
