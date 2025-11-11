'use client'

import React from 'react'
import { useDesignerStore } from '@/store/designerStore'
import type { TextElement, ShapeElement } from '@/types/designer'
import { HexColorPicker } from 'react-colorful'
import { ChevronDown } from 'lucide-react'

export default function PropertiesPanel() {
  const elements = useDesignerStore((state) => state.elements)
  const selectedIds = useDesignerStore((state) => state.selectedIds)
  const updateElement = useDesignerStore((state) => state.updateElement)

  const selectedElement = elements.find((el) => el.id === selectedIds[0])

  const [showColorPicker, setShowColorPicker] = React.useState<string | null>(null)

  if (!selectedElement) {
    return (
      <div className="p-4">
        <div className="text-center text-gray-500 text-sm py-8">
          Select an element to edit its properties
        </div>
      </div>
    )
  }

  const renderTextProperties = (element: TextElement) => (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">Text Content</label>
        <textarea
          value={element.content}
          onChange={(e) => updateElement(element.id, { content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Font Size</label>
          <input
            type="number"
            value={element.fontSize}
            onChange={(e) => updateElement(element.id, { fontSize: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Font Weight</label>
          <select
            value={element.fontWeight}
            onChange={(e) => updateElement(element.id, { fontWeight: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500"
          >
            <option value={300}>Light</option>
            <option value={400}>Regular</option>
            <option value={500}>Medium</option>
            <option value={600}>Semibold</option>
            <option value={700}>Bold</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">Text Color</label>
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(showColorPicker === 'text' ? null : 'text')}
            className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <div
              className="w-6 h-6 rounded border border-gray-300"
              style={{ backgroundColor: element.color }}
            />
            <span className="text-sm text-gray-700 uppercase">{element.color}</span>
          </button>
          {showColorPicker === 'text' && (
            <div className="absolute z-10 mt-2">
              <HexColorPicker
                color={element.color}
                onChange={(color) => updateElement(element.id, { color })}
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">Text Align</label>
        <div className="flex gap-2">
          {(['left', 'center', 'right'] as const).map((align) => (
            <button
              key={align}
              onClick={() => updateElement(element.id, { textAlign: align })}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition ${
                element.textAlign === align
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderShapeProperties = (element: ShapeElement) => (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">Fill Color</label>
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(showColorPicker === 'fill' ? null : 'fill')}
            className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <div
              className="w-6 h-6 rounded border border-gray-300"
              style={{ backgroundColor: element.fill }}
            />
            <span className="text-sm text-gray-700 uppercase">{element.fill}</span>
          </button>
          {showColorPicker === 'fill' && (
            <div className="absolute z-10 mt-2">
              <HexColorPicker
                color={element.fill}
                onChange={(color) => updateElement(element.id, { fill: color })}
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">Stroke Color</label>
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(showColorPicker === 'stroke' ? null : 'stroke')}
            className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <div
              className="w-6 h-6 rounded border border-gray-300"
              style={{ backgroundColor: element.stroke }}
            />
            <span className="text-sm text-gray-700 uppercase">{element.stroke}</span>
          </button>
          {showColorPicker === 'stroke' && (
            <div className="absolute z-10 mt-2">
              <HexColorPicker
                color={element.stroke}
                onChange={(color) => updateElement(element.id, { stroke: color })}
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">Stroke Width</label>
        <input
          type="number"
          value={element.strokeWidth}
          onChange={(e) => updateElement(element.id, { strokeWidth: Number(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500"
          min={0}
        />
      </div>

      {element.shapeType === 'rectangle' && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Corner Radius</label>
          <input
            type="number"
            value={element.cornerRadius || 0}
            onChange={(e) => updateElement(element.id, { cornerRadius: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500"
            min={0}
          />
        </div>
      )}
    </div>
  )

  const renderCommonProperties = () => (
    <div className="space-y-4 pt-4 border-t border-gray-200">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">X Position</label>
          <input
            type="number"
            value={Math.round(selectedElement.x)}
            onChange={(e) => updateElement(selectedElement.id, { x: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Y Position</label>
          <input
            type="number"
            value={Math.round(selectedElement.y)}
            onChange={(e) => updateElement(selectedElement.id, { y: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Width</label>
          <input
            type="number"
            value={Math.round(selectedElement.width)}
            onChange={(e) => updateElement(selectedElement.id, { width: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Height</label>
          <input
            type="number"
            value={Math.round(selectedElement.height)}
            onChange={(e) => updateElement(selectedElement.id, { height: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">Rotation</label>
        <input
          type="number"
          value={Math.round(selectedElement.rotation)}
          onChange={(e) => updateElement(selectedElement.id, { rotation: Number(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500"
          min={-180}
          max={180}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">Opacity</label>
        <input
          type="range"
          value={selectedElement.opacity}
          onChange={(e) => updateElement(selectedElement.id, { opacity: Number(e.target.value) })}
          className="w-full"
          min={0}
          max={1}
          step={0.1}
        />
        <div className="text-xs text-gray-500 text-center mt-1">
          {Math.round(selectedElement.opacity * 100)}%
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-semibold text-gray-700">Properties</h3>
      <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
        {selectedElement.type === 'text' && 'Text Element'}
        {selectedElement.type === 'shape' && `${(selectedElement as ShapeElement).shapeType} Shape`}
        {selectedElement.type === 'image' && 'Image Element'}
      </div>

      {selectedElement.type === 'text' && renderTextProperties(selectedElement as TextElement)}
      {selectedElement.type === 'shape' && renderShapeProperties(selectedElement as ShapeElement)}

      {renderCommonProperties()}
    </div>
  )
}
