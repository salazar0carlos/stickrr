'use client'

import { useState } from 'react'
import { X, Search } from 'lucide-react'
import * as Icons from 'lucide-react'

interface IconPickerProps {
  onSelect: (iconName: string) => void
  onClose: () => void
}

// Popular icons for labels
const popularIcons = [
  'Leaf', 'Carrot', 'Apple', 'Cherry', 'Flower', 'Sprout', 'Sun', 'Droplets',
  'Cookie', 'CakeSlice', 'Coffee', 'Pizza', 'Wine', 'Milk', 'Sandwich', 'IceCream',
  'School', 'BookOpen', 'Pencil', 'Scissors', 'Palette', 'Music', 'Star', 'Heart',
  'Home', 'Package', 'Gift', 'ShoppingCart', 'Calendar', 'Clock', 'Tag', 'Archive',
  'Sparkles', 'Flame', 'Snowflake', 'Smile', 'Frown', 'Zap', 'Award', 'Flag',
]

export default function IconPicker({ onSelect, onClose }: IconPickerProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredIcons = searchQuery
    ? popularIcons.filter((name) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : popularIcons

  const renderIcon = (name: string) => {
    const IconComponent = (Icons as any)[name]
    if (!IconComponent) return null
    return <IconComponent className="w-6 h-6" />
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Choose an Icon</h2>
            <p className="text-gray-600 mt-1">Select an icon to add to your label</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Icons Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
            {filteredIcons.map((iconName) => (
              <button
                key={iconName}
                onClick={() => onSelect(iconName)}
                className="p-3 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition flex items-center justify-center group"
                title={iconName}
              >
                <div className="text-gray-700 group-hover:text-indigo-600">
                  {renderIcon(iconName)}
                </div>
              </button>
            ))}
          </div>

          {filteredIcons.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No icons found. Try a different search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
