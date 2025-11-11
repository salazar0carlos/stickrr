'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { auth, labels } from '@/lib/supabase'
import type { Label } from '@/types'
import type { User } from '@supabase/supabase-js'
import { FileText, Trash2, Plus, Search, ArrowUpDown } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LibraryPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [userLabels, setUserLabels] = useState<Label[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date-new' | 'date-old' | 'size'>('date-new')

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

  const handleDelete = async (id: string, name: string) => {
    // Use toast.promise for a better UX with confirmation
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium">Delete "{name}"?</p>
        <p className="text-sm text-gray-600">This action cannot be undone.</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id)
              setDeleting(id)
              const { error } = await labels.delete(id)
              setDeleting(null)

              if (error) {
                toast.error('Failed to delete label. Please try again.')
              } else {
                setUserLabels(userLabels.filter((label) => label.id !== id))
                toast.success('Label deleted successfully')
              }
            }}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Filter and sort labels
  const getFilteredAndSortedLabels = () => {
    let filtered = userLabels

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((label) => {
        const searchLower = searchQuery.toLowerCase()
        const hasMatchingText = label.label_data.textElements.some((el) =>
          el.text.toLowerCase().includes(searchLower)
        )
        const matchesSize = label.label_size.toLowerCase().includes(searchLower)
        const matchesTemplate = label.template_id.toLowerCase().includes(searchLower)
        return hasMatchingText || matchesSize || matchesTemplate
      })
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date-new':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'date-old':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case 'size':
          return a.label_size.localeCompare(b.label_size)
        default:
          return 0
      }
    })

    return sorted
  }

  const displayedLabels = getFilteredAndSortedLabels()

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
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Labels</h1>
              <p className="text-gray-600">
                {displayedLabels.length} of {userLabels.length} {userLabels.length === 1 ? 'label' : 'labels'}
              </p>
            </div>
            <button
              onClick={() => router.push('/designer')}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Create New Label
            </button>
          </div>

          {/* Search and Sort Controls */}
          {userLabels.length > 0 && (
            <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search labels by text, size, or template..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="sm:w-48">
                  <div className="relative">
                    <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white text-gray-900 cursor-pointer"
                    >
                      <option value="date-new">Newest First</option>
                      <option value="date-old">Oldest First</option>
                      <option value="size">Sort by Size</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Labels Grid */}
          {userLabels.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg shadow-sm">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No labels yet</h2>
              <p className="text-gray-600 mb-6">
                Create your first label to get started
              </p>
              <button
                onClick={() => router.push('/designer')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-sm"
              >
                Create Label
              </button>
            </div>
          ) : displayedLabels.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg shadow-sm">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No labels found</h2>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-sm"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedLabels.map((label) => (
                <div
                  key={label.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group"
                >
                  {/* Preview */}
                  <div
                    className="h-52 flex items-center justify-center p-8"
                    style={{ backgroundColor: label.label_data.backgroundColor }}
                  >
                    <div className="text-center max-w-full px-4">
                      {label.label_data.textElements.slice(0, 2).map((element) => (
                        <div
                          key={element.id}
                          style={{
                            fontSize: element.fontSize * 0.8,
                            fontWeight: element.fontWeight,
                            color: element.color,
                          }}
                          className="truncate mb-1"
                        >
                          {element.text}
                        </div>
                      ))}
                      <div className="text-sm text-gray-500 mt-3 font-medium">
                        {label.label_size.replace('x', ' × ')}"
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 border-t">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600 font-medium">
                        {formatDate(label.created_at)}
                      </span>
                      <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
                        {label.template_id}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => router.push(`/designer?label=${label.id}`)}
                        className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition shadow-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(label.id, label.template_id || 'this label')}
                        className="bg-red-50 text-red-600 p-2.5 rounded-lg hover:bg-red-100 transition"
                        disabled={deleting === label.id}
                      >
                        <Trash2 className="w-5 h-5" />
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
