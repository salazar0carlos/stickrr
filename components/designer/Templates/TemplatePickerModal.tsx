'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Sparkles, FileText } from 'lucide-react'
import { templateCategories } from '@/lib/templates/index'
import type { Template, TemplateCategory } from '@/lib/templates/enhanced-types'
import TemplateCard from './TemplateCard'

interface TemplatePickerModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (template: Template) => void
  onStartBlank: () => void
}

export default function TemplatePickerModal({
  isOpen,
  onClose,
  onSelectTemplate,
  onStartBlank,
}: TemplatePickerModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter templates based on search and category
  const filteredTemplates = useMemo(() => {
    let templates: Template[] = []

    if (selectedCategory === 'all') {
      templates = templateCategories.flatMap((cat) => cat.templates)
    } else {
      const category = templateCategories.find((cat) => cat.id === selectedCategory)
      templates = category ? category.templates : []
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      templates = templates.filter(
        (t) =>
          t.metadata.name.toLowerCase().includes(query) ||
          t.metadata.description.toLowerCase().includes(query) ||
          t.metadata.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return templates
  }, [selectedCategory, searchQuery])

  const handleSelectTemplate = (template: Template) => {
    onSelectTemplate(template)
    onClose()
  }

  const handleStartBlank = () => {
    onStartBlank()
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
                  <p className="text-sm text-gray-600">
                    Start with a beautiful design and make it your own
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/80 transition text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates by name, description, or tags..."
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                All Templates
              </button>
              {templateCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition flex items-center gap-2 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredTemplates.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
                <p className="text-sm text-gray-600 max-w-md">
                  Try adjusting your search or browse a different category
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.metadata.id}
                    template={template}
                    onSelect={handleSelectTemplate}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} available
            </p>
            <button
              onClick={handleStartBlank}
              className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              <FileText className="w-4 h-4" />
              Start with Blank Canvas
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
