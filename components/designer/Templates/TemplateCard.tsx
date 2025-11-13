'use client'

import React from 'react'
import type { Template } from '@/lib/templates/enhanced-types'
import TemplatePreview from './TemplatePreview'
import { Sparkles } from 'lucide-react'

interface TemplateCardProps {
  template: Template
  onSelect: (template: Template) => void
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  advanced: 'bg-red-100 text-red-700 border-red-200',
}

export default function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <div className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-all hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1">
      {/* Preview */}
      <div className="relative bg-gray-50 p-4">
        <TemplatePreview template={template} width={280} height={168} />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
          <button
            onClick={() => onSelect(template)}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-all transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            Use Template
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight flex-1">
            {template.metadata.name}
          </h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium whitespace-nowrap ${
              difficultyColors[template.metadata.difficulty]
            }`}
          >
            {template.metadata.difficulty}
          </span>
        </div>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {template.metadata.description}
        </p>

        {/* Tags */}
        {template.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {template.metadata.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
            {template.metadata.tags.length > 3 && (
              <span className="text-xs px-2 py-0.5 text-gray-500">
                +{template.metadata.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
