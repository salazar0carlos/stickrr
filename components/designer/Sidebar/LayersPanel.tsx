'use client'

import React from 'react'
import { useDesignerStore } from '@/store/designerStore'
import { Eye, EyeOff, Lock, Unlock, Trash2, Type, Square, Circle, Image as ImageIcon } from 'lucide-react'

export default function LayersPanel() {
  const elements = useDesignerStore((state) => state.elements)
  const selectedIds = useDesignerStore((state) => state.selectedIds)
  const selectElement = useDesignerStore((state) => state.selectElement)
  const updateElement = useDesignerStore((state) => state.updateElement)
  const deleteElements = useDesignerStore((state) => state.deleteElements)

  // Sort elements by zIndex (highest first for layer panel)
  const sortedElements = [...elements].sort((a, b) => b.zIndex - a.zIndex)

  const getElementIcon = (element: any) => {
    if (element.type === 'text') return Type
    if (element.type === 'image') return ImageIcon
    if (element.type === 'shape') {
      if (element.shapeType === 'circle') return Circle
      return Square
    }
    return Square
  }

  const getElementName = (element: any) => {
    if (element.type === 'text') return element.content.substring(0, 20) + (element.content.length > 20 ? '...' : '')
    if (element.type === 'shape') {
      return element.shapeType.charAt(0).toUpperCase() + element.shapeType.slice(1)
    }
    return element.type.charAt(0).toUpperCase() + element.type.slice(1)
  }

  return (
    <div className="p-4 space-y-2">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Layers</h3>

      {elements.length === 0 ? (
        <div className="text-center text-gray-400 text-sm py-8">
          No elements yet.<br />Add elements from the sidebar.
        </div>
      ) : (
        <div className="space-y-1">
          {sortedElements.map((element) => {
            const Icon = getElementIcon(element)
            const isSelected = selectedIds.includes(element.id)

            return (
              <div
                key={element.id}
                onClick={() => selectElement(element.id)}
                className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                  isSelected
                    ? 'bg-indigo-100 border border-indigo-300'
                    : 'hover:bg-gray-100 border border-transparent'
                }`}
              >
                {/* Element Icon */}
                <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`} />

                {/* Element Name */}
                <span className={`flex-1 text-sm truncate ${isSelected ? 'text-indigo-900 font-medium' : 'text-gray-700'}`}>
                  {getElementName(element)}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Visibility Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updateElement(element.id, { visible: !element.visible })
                    }}
                    className="p-1 hover:bg-gray-200 rounded"
                    title={element.visible ? 'Hide' : 'Show'}
                  >
                    {element.visible ? (
                      <Eye className="w-3.5 h-3.5 text-gray-600" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </button>

                  {/* Lock Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updateElement(element.id, { locked: !element.locked })
                    }}
                    className="p-1 hover:bg-gray-200 rounded"
                    title={element.locked ? 'Unlock' : 'Lock'}
                  >
                    {element.locked ? (
                      <Lock className="w-3.5 h-3.5 text-gray-600" />
                    ) : (
                      <Unlock className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteElements([element.id])
                    }}
                    className="p-1 hover:bg-red-100 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-600" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
