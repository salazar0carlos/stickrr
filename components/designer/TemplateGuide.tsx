'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp, Lightbulb, MousePointer, Edit3, Lock } from 'lucide-react'
import { useDesignerStore } from '@/store/designerStore'
import type { TextElement } from '@/types/designer'

interface TemplateGuideProps {
  onDismiss?: () => void
}

export default function TemplateGuide({ onDismiss }: TemplateGuideProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const elements = useDesignerStore((state) => state.elements)

  // Get editable elements (unlocked text elements)
  const editableTextElements = elements.filter(
    (el) => el.type === 'text' && !el.locked
  ) as TextElement[]

  // Get locked elements count
  const lockedElementsCount = elements.filter((el) => el.locked).length

  const handleDismiss = () => {
    setIsDismissed(true)
    if (onDismiss) {
      onDismiss()
    }
  }

  // Don't show if no elements or all dismissed
  if (isDismissed || elements.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="fixed bottom-6 right-6 z-40 w-80 bg-white rounded-xl shadow-2xl border-2 border-indigo-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold text-sm">Template Guide</h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-white/20 rounded transition"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? (
                <ChevronUp className="w-4 h-4 text-white" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white" />
              )}
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 hover:bg-white/20 rounded transition"
              title="Dismiss"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Introduction */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                <p className="text-xs text-indigo-900 leading-relaxed">
                  <span className="font-semibold">Welcome to your template!</span> This design has
                  been professionally crafted. Simply click on the editable fields below to
                  customize your label.
                </p>
              </div>

              {/* Editable Fields */}
              {editableTextElements.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Click to Edit ({editableTextElements.length})
                    </h4>
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {editableTextElements.map((element) => (
                      <div
                        key={element.id}
                        className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 flex items-start gap-2 hover:bg-emerald-100 transition cursor-pointer"
                        onClick={() => {
                          // Select this element in the designer
                          useDesignerStore.getState().selectElement(element.id)
                        }}
                      >
                        <MousePointer className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-emerald-900 truncate">
                            {element.content}
                          </p>
                          <p className="text-xs text-emerald-600 mt-0.5">
                            {element.fontSize}pt, {element.fontFamily}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 text-xs">
                  No editable fields in this template
                </div>
              )}

              {/* Locked Elements Info */}
              {lockedElementsCount > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-amber-900 mb-1">
                        Protected Design Elements
                      </h4>
                      <p className="text-xs text-amber-700 leading-relaxed">
                        {lockedElementsCount} element{lockedElementsCount !== 1 ? 's are' : ' is'}{' '}
                        locked to preserve the professional design. These appear dimmed and cannot
                        be moved or resized.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Quick Tips</h4>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Double-click text to edit directly on canvas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Use the Properties panel to change colors and fonts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Locked elements can be unlocked in the Layers panel</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
