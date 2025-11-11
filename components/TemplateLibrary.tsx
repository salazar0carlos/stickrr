'use client'

import { useState } from 'react'
import { templates, categories } from '@/lib/templates'
import type { Template } from '@/types'
import { X } from 'lucide-react'

interface TemplateLibraryProps {
  onSelect: (template: Template) => void
  onClose: () => void
}

export default function TemplateLibrary({ onSelect, onClose }: TemplateLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredTemplates =
    selectedCategory === 'all'
      ? templates
      : templates.filter((t) => t.category === selectedCategory)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
            <p className="text-gray-600 mt-1">Select a template to start designing</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 p-6 border-b overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Templates
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => onSelect(template)}
                className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-lg transition group"
              >
                <div
                  className="w-full h-32 rounded mb-3 flex items-center justify-center text-sm text-gray-500"
                  style={{ backgroundColor: template.defaultData.backgroundColor }}
                >
                  <span className="font-medium text-gray-700">
                    {template.defaultSize.replace('x', ' × ')}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {template.category}
                  </span>
                  <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                    {template.defaultSize}"
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
