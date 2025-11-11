'use client'

import { useState } from 'react'
import { X, Download, Printer } from 'lucide-react'
import type { LabelData, LabelSize, PrintOptions } from '@/types'
import { printerProfiles } from '@/lib/printer-profiles'
import { generateLabelPDF, downloadPDF, printPDF } from '@/lib/pdf-generator'

interface PrintDialogProps {
  labelData: LabelData
  labelSize: LabelSize
  onClose: () => void
  onDownload: () => void
}

export default function PrintDialog({
  labelData,
  labelSize,
  onClose,
  onDownload,
}: PrintDialogProps) {
  const [selectedPrinter, setSelectedPrinter] = useState('dymo')
  const [copies, setCopies] = useState(1)
  const [layout, setLayout] = useState<'single' | '6-up' | '12-up'>('single')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    setIsGenerating(true)
    try {
      const options: PrintOptions = {
        printerProfile: printerProfiles[selectedPrinter],
        copies,
        layout,
      }

      const pdf = await generateLabelPDF(labelData, labelSize, options)
      downloadPDF(pdf, `stickrr-label-${Date.now()}.pdf`)

      onDownload() // Track the download
      onClose()
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePrint = async () => {
    setIsGenerating(true)
    try {
      const options: PrintOptions = {
        printerProfile: printerProfiles[selectedPrinter],
        copies,
        layout,
      }

      const pdf = await generateLabelPDF(labelData, labelSize, options)
      printPDF(pdf)

      onDownload() // Track the download
      onClose()
    } catch (error) {
      console.error('Error printing PDF:', error)
      alert('Failed to print. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Print Settings</h2>
            <p className="text-gray-600 mt-1">Configure your label export</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Printer Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Printer Type
            </label>
            <div className="space-y-2">
              {Object.values(printerProfiles).map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setSelectedPrinter(profile.id)}
                  className={`w-full p-3 border-2 rounded-lg text-left transition ${
                    selectedPrinter === profile.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{profile.name}</div>
                  <div className="text-sm text-gray-600">
                    {profile.dpi} DPI • {profile.type}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Layout */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Layout
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setLayout('single')}
                className={`p-3 border-2 rounded-lg transition ${
                  layout === 'single'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="font-semibold">Single</div>
                <div className="text-xs mt-1">1 per page</div>
              </button>
              <button
                onClick={() => setLayout('6-up')}
                className={`p-3 border-2 rounded-lg transition ${
                  layout === '6-up'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="font-semibold">6-Up</div>
                <div className="text-xs mt-1">2×3 grid</div>
              </button>
              <button
                onClick={() => setLayout('12-up')}
                className={`p-3 border-2 rounded-lg transition ${
                  layout === '12-up'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="font-semibold">12-Up</div>
                <div className="text-xs mt-1">3×4 grid</div>
              </button>
            </div>
          </div>

          {/* Copies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Number of Copies
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={copies}
              onChange={(e) => setCopies(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </button>
            <button
              onClick={handlePrint}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Printer className="w-5 h-5" />
              {isGenerating ? 'Generating...' : 'Print'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
