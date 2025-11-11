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

  // Separate elements into editable and locked
  const editableElements = sortedElements.filter((el) => !el.locked)
  const lockedElements = sortedElements.filter((el) => el.locked)

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

  const renderLayerItem = (element: any) => {
    const Icon = getElementIcon(element)
    const isSelected = selectedIds.includes(element.id)
    const isLocked = element.locked

    return (
      <div
        key={element.id}
        onClick={() => selectElement(element.id)}
        className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
          isSelected
            ? 'bg-indigo-100 border border-indigo-300'
            : 'hover:bg-gray-100 border border-transparent'
        } ${isLocked && !isSelected ? 'opacity-70' : ''}`}
      >
        {/* Element Icon */}
        <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-indigo-600' : isLocked ? 'text-gray-400' : 'text-gray-500'}`} />

        {/* Lock Icon Badge (always visible for locked elements) */}
        {isLocked && (
          <Lock className="w-3 h-3 text-amber-600 flex-shrink-0" />
        )}

        {/* Element Name */}
        <span className={`flex-1 text-sm truncate ${isSelected ? 'text-indigo-900 font-medium' : isLocked ? 'text-gray-500' : 'text-gray-700'}`}>
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
              <Lock className="w-3.5 h-3.5 text-amber-600" />
            ) : (
              <Unlock className="w-3.5 h-3.5 text-gray-400" />
            )}
          </button>

          {/* Delete - disabled for locked elements */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (!isLocked) {
                deleteElements([element.id])
              }
            }}
            className={`p-1 rounded ${isLocked ? 'opacity-30 cursor-not-allowed' : 'hover:bg-red-100'}`}
            title={isLocked ? 'Cannot delete locked element' : 'Delete'}
            disabled={isLocked}
          >
            <Trash2 className={`w-3.5 h-3.5 ${isLocked ? 'text-gray-400' : 'text-red-600'}`} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">Layers</h3>

      {elements.length === 0 ? (
        <div className="text-center text-gray-400 text-sm py-8">
          No elements yet.<br />Add elements from the sidebar.
        </div>
      ) : (
        <div className="space-y-4">
          {/* Editable Fields Section */}
          {editableElements.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                  Editable Fields
                </h4>
                <div className="flex-1 h-px bg-emerald-200"></div>
              </div>
              {editableElements.map((element) => renderLayerItem(element))}
            </div>
          )}

          {/* Template Design Section */}
          {lockedElements.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-3 h-3 text-amber-600" />
                <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  Template Design (Locked)
                </h4>
                <div className="flex-1 h-px bg-amber-200"></div>
              </div>
              {lockedElements.map((element) => renderLayerItem(element))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
