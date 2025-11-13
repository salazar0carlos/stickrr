'use client'

import React, { useState } from 'react'
import { Download, X, FileText, Image } from 'lucide-react'

interface ExportDialogProps {
  onClose: () => void
  onExport: (options: ExportOptions) => void
}

export interface ExportOptions {
  format: 'png' | 'jpeg' | 'pdf'
  quality: number
  scale: number
}

export default function ExportDialog({ onClose, onExport }: ExportDialogProps) {
  const [format, setFormat] = useState<'png' | 'jpeg' | 'pdf'>('pdf')
  const [quality, setQuality] = useState(100)
  const [scale, setScale] = useState(2)

  const handleExport = () => {
    onExport({ format, quality, scale })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Export Label</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFormat('pdf')}
                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  format === 'pdf'
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-5 h-5" />
                PDF
              </button>
              <button
                onClick={() => setFormat('png')}
                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  format === 'png'
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Image className="w-5 h-5" />
                PNG
              </button>
              <button
                onClick={() => setFormat('jpeg')}
                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  format === 'jpeg'
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Image className="w-5 h-5" />
                JPEG
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {format === 'pdf' && '✨ Best for printing labels'}
              {format === 'png' && 'High quality image with transparency'}
              {format === 'jpeg' && 'Compressed image for sharing'}
            </p>
          </div>

          {format === 'jpeg' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality: {quality}%
              </label>
              <input
                type="range"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                min={1}
                max={100}
                className="w-full"
              />
            </div>
          )}

          {format !== 'pdf' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scale: {scale}x
              </label>
              <input
                type="range"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                min={1}
                max={4}
                step={0.5}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Higher scale = better quality, larger file size
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            <Download className="w-4 h-4" />
            Export {format.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  )
}
