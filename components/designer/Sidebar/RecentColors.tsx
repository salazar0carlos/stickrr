'use client'

import React, { memo } from 'react'

interface RecentColorsProps {
  recentColors: string[]
  onColorSelect: (color: string) => void
}

const RecentColors = memo(function RecentColors({ recentColors, onColorSelect }: RecentColorsProps) {
  if (recentColors.length === 0) return null

  return (
    <div className="mt-2">
      <label className="block text-xs font-medium text-gray-700 mb-2">Recent Colors</label>
      <div className="flex flex-wrap gap-1.5">
        {recentColors.map((color, index) => (
          <button
            key={`${color}-${index}`}
            onClick={() => onColorSelect(color)}
            className="w-8 h-8 rounded border-2 border-gray-200 hover:border-indigo-400 transition"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  )
})

export default RecentColors
