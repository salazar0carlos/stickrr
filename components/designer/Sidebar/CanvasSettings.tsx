'use client'

import React, { useState } from 'react'
import { useDesignerStore } from '@/store/designerStore'
import { HexColorPicker } from 'react-colorful'
import RecentColors from './RecentColors'
import { LABEL_SIZES, type LabelSizeKey } from '@/lib/designerConstants'

export default function CanvasSettings() {
  const backgroundColor = useDesignerStore((state) => state.backgroundColor)
  const canvasWidth = useDesignerStore((state) => state.canvasWidth)
  const canvasHeight = useDesignerStore((state) => state.canvasHeight)
  const setBackgroundColor = useDesignerStore((state) => state.setBackgroundColor)
  const setCanvasSize = useDesignerStore((state) => state.setCanvasSize)

  const [showColorPicker, setShowColorPicker] = useState(false)
  const [recentColors, setRecentColors] = useState<string[]>([])

  const addToRecentColors = (color: string) => {
    setRecentColors((prev) => {
      const filtered = prev.filter((c) => c !== color)
      return [color, ...filtered].slice(0, 12)
    })
  }

  const getCurrentSizeKey = (): LabelSizeKey => {
    const sizeEntry = Object.entries(LABEL_SIZES).find(
      ([_, size]) => size.width === canvasWidth && size.height === canvasHeight
    )
    return (sizeEntry?.[0] as LabelSizeKey) || 'custom'
  }

  const handleLabelSizeChange = (sizeKey: LabelSizeKey) => {
    const size = LABEL_SIZES[sizeKey]
    setCanvasSize(size.width, size.height)
  }

  const backgroundPresets = [
    { name: 'White', color: '#ffffff' },
    { name: 'Light Gray', color: '#f3f4f6' },
    { name: 'Cream', color: '#fef3c7' },
    { name: 'Light Blue', color: '#dbeafe' },
    { name: 'Light Green', color: '#dcfce7' },
    { name: 'Light Pink', color: '#fce7f3' },
    { name: 'Light Purple', color: '#f3e8ff' },
    { name: 'Black', color: '#000000' },
  ]

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Label Settings</h3>

      {/* Label Size Selector */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Label Size
        </label>
        <div className="space-y-2">
          {Object.entries(LABEL_SIZES).map(([key, size]) => (
            <button
              key={key}
              onClick={() => handleLabelSizeChange(key as LabelSizeKey)}
              className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition text-left ${
                getCurrentSizeKey() === key
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{size.label}</span>
                {getCurrentSizeKey() === key && (
                  <span className="text-xs">✓ Active</span>
                )}
              </div>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Choose a standard label size for printing
        </p>
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">Background Color</label>

        {/* Color Presets */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {backgroundPresets.map((preset) => (
            <button
              key={preset.color}
              onClick={() => {
                setBackgroundColor(preset.color)
                addToRecentColors(preset.color)
              }}
              className="aspect-square rounded-lg border-2 hover:border-indigo-400 transition"
              style={{
                backgroundColor: preset.color,
                borderColor: backgroundColor === preset.color ? '#6366F1' : '#e5e7eb'
              }}
              title={preset.name}
            />
          ))}
        </div>

        {/* Custom Color Picker */}
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <div
              className="w-6 h-6 rounded border border-gray-300"
              style={{ backgroundColor }}
            />
            <span className="text-sm text-gray-700 uppercase">{backgroundColor}</span>
          </button>
          {showColorPicker && (
            <div className="absolute z-10 mt-2 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
              <HexColorPicker
                color={backgroundColor}
                onChange={(color) => {
                  setBackgroundColor(color)
                  addToRecentColors(color)
                }}
              />
              <RecentColors
                recentColors={recentColors}
                onColorSelect={(color) => {
                  setBackgroundColor(color)
                  setShowColorPicker(false)
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
