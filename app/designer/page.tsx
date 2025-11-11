'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth, labels, checkUserAccess, downloads } from '@/lib/supabase'
import LabelDesigner from '@/components/LabelDesigner'
import TemplateLibrary from '@/components/TemplateLibrary'
import IconPicker from '@/components/IconPicker'
import PrintDialog from '@/components/PrintDialog'
import PaywallModal from '@/components/PaywallModal'
import Navbar from '@/components/Navbar'
import type { Template, LabelData, LabelSize } from '@/types'
import { templates } from '@/lib/templates'

export default function DesignerPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null)
  const [labelSize, setLabelSize] = useState<LabelSize>('2.25x1.25')
  const [currentLabelId, setCurrentLabelId] = useState<string | null>(null)
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false)
  const [showIconPicker, setShowIconPicker] = useState(false)
  const [showPrintDialog, setShowPrintDialog] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [userAccess, setUserAccess] = useState<any>(null)
  const [pendingLabelData, setPendingLabelData] = useState<LabelData | null>(null)

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

    // Load user access info
    const access = await checkUserAccess(currentUser.id)
    setUserAccess(access)

    // Show template library on first load
    setShowTemplateLibrary(true)
    setLoading(false)
  }

  const handleTemplateSelect = (template: Template) => {
    setCurrentTemplate(template)
    setLabelSize(template.defaultSize)
    setShowTemplateLibrary(false)
    setCurrentLabelId(null) // Reset label ID when selecting new template
  }

  const handleSave = async (labelData: LabelData) => {
    if (!user || !currentTemplate) return

    try {
      if (currentLabelId) {
        // Update existing label
        await labels.update(currentLabelId, {
          label_data: labelData,
          label_size: labelSize,
          updated_at: new Date().toISOString(),
        })
        alert('Label saved successfully!')
      } else {
        // Create new label
        const { data, error } = await labels.create({
          user_id: user.id,
          template_id: currentTemplate.id,
          label_size: labelSize,
          label_data: labelData,
        })

        if (error) {
          console.error('Error saving label:', error)
          alert('Failed to save label. Please try again.')
        } else {
          setCurrentLabelId(data.id)
          alert('Label saved successfully!')
        }
      }
    } catch (error) {
      console.error('Error saving label:', error)
      alert('Failed to save label. Please try again.')
    }
  }

  const handleExport = async (labelData: LabelData) => {
    if (!user) return

    // Refresh user access
    const access = await checkUserAccess(user.id)
    setUserAccess(access)

    if (!access.canDownload) {
      setShowPaywall(true)
      return
    }

    // Show print dialog
    setPendingLabelData(labelData)
    setShowPrintDialog(true)
  }

  const handleDownloadComplete = async () => {
    if (!user) return

    // Track the download
    if (currentLabelId) {
      await downloads.track(user.id, currentLabelId)
    }

    // Refresh user access
    const access = await checkUserAccess(user.id)
    setUserAccess(access)
  }

  const handleIconSelect = (iconName: string) => {
    // This will be handled by passing icon to LabelDesigner
    // For now, we'll close the picker
    setShowIconPicker(false)
    // In a more complete implementation, you'd pass this to LabelDesigner
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!currentTemplate) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Select a template to get started
            </h2>
            <button
              onClick={() => setShowTemplateLibrary(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Choose Template
            </button>
          </div>
        </div>
        {showTemplateLibrary && (
          <TemplateLibrary
            onSelect={handleTemplateSelect}
            onClose={() => setShowTemplateLibrary(false)}
          />
        )}
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-4rem)]">
        <LabelDesigner
          template={currentTemplate}
          labelSize={labelSize}
          onSave={handleSave}
          onExport={handleExport}
          onAddIcon={() => setShowIconPicker(true)}
          onSizeChange={setLabelSize}
        />
      </div>

      {showTemplateLibrary && (
        <TemplateLibrary
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplateLibrary(false)}
        />
      )}

      {showIconPicker && (
        <IconPicker
          onSelect={handleIconSelect}
          onClose={() => setShowIconPicker(false)}
        />
      )}

      {showPrintDialog && pendingLabelData && (
        <PrintDialog
          labelData={pendingLabelData}
          labelSize={labelSize}
          onClose={() => setShowPrintDialog(false)}
          onDownload={handleDownloadComplete}
        />
      )}

      {showPaywall && userAccess && (
        <PaywallModal
          onClose={() => setShowPaywall(false)}
          downloadsUsed={userAccess.freeDownloadsUsed}
        />
      )}
    </>
  )
}
