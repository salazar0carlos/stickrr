'use client'

import { useState, useRef, useEffect } from 'react'
import type { LabelData, LabelSize, TextElement, IconElement, Template } from '@/types'
import { Type, Image as ImageIcon, Palette, Save, FileDown, Trash2 } from 'lucide-react'
import * as Icons from 'lucide-react'
import { labelSizes } from '@/lib/printer-profiles'

interface LabelDesignerProps {
  template: Template
  initialData?: LabelData
  labelSize: LabelSize
  onSave: (data: LabelData) => void
  onExport: (data: LabelData) => void
  onAddIcon: () => void
  onSizeChange: (size: LabelSize) => void
}

export default function LabelDesigner({
  template,
  initialData,
  labelSize,
  onSave,
  onExport,
  onAddIcon,
  onSizeChange,
}: LabelDesignerProps) {
  const [labelData, setLabelData] = useState<LabelData>(
    initialData || template.defaultData
  )
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [editingText, setEditingText] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const dimensions = labelSizes[labelSize]
  const scale = 100 // pixels per inch for display

  const handleTextChange = (id: string, newText: string) => {
    setLabelData((prev) => ({
      ...prev,
      textElements: prev.textElements.map((el) =>
        el.id === id ? { ...el, text: newText } : el
      ),
    }))
  }

  const handleTextStyleChange = (
    id: string,
    changes: Partial<Omit<TextElement, 'id' | 'text'>>
  ) => {
    setLabelData((prev) => ({
      ...prev,
      textElements: prev.textElements.map((el) =>
        el.id === id ? { ...el, ...changes } : el
      ),
    }))
  }

  const handleAddText = () => {
    const newText: TextElement = {
      id: Date.now().toString(),
      text: 'New Text',
      x: 50,
      y: 50,
      fontSize: 14,
      fontWeight: 'normal',
      textAlign: 'center',
      color: '#000000',
    }
    setLabelData((prev) => ({
      ...prev,
      textElements: [...prev.textElements, newText],
    }))
    setSelectedElement(newText.id)
  }

  const handleDeleteElement = () => {
    if (!selectedElement) return

    setLabelData((prev) => ({
      ...prev,
      textElements: prev.textElements.filter((el) => el.id !== selectedElement),
      iconElements: prev.iconElements.filter((el) => el.id !== selectedElement),
    }))
    setSelectedElement(null)
  }

  const handleBackgroundChange = (color: string) => {
    setLabelData((prev) => ({
      ...prev,
      backgroundColor: color,
    }))
  }

  const addIcon = (iconName: string) => {
    const newIcon: IconElement = {
      id: Date.now().toString(),
      iconName,
      x: 50,
      y: 30,
      size: 24,
      color: '#000000',
    }
    setLabelData((prev) => ({
      ...prev,
      iconElements: [...prev.iconElements, newIcon],
    }))
  }

  const selectedTextElement = labelData.textElements.find(
    (el) => el.id === selectedElement
  )

  const renderIcon = (name: string, size: number, color: string) => {
    const IconComponent = (Icons as any)[name]
    if (!IconComponent) return null
    return <IconComponent style={{ width: size, height: size, color }} />
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={handleAddText}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Type className="w-4 h-4" />
          Add Text
        </button>
        <button
          onClick={onAddIcon}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <ImageIcon className="w-4 h-4" />
          Add Icon
        </button>
        <button
          onClick={() => onSave(labelData)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={() => onExport(labelData)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FileDown className="w-4 h-4" />
          Export
        </button>
        {selectedElement && (
          <button
            onClick={handleDeleteElement}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ml-auto"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 bg-gray-100 p-8 overflow-auto flex items-center justify-center">
          <div
            ref={canvasRef}
            className="bg-white shadow-2xl relative"
            style={{
              width: dimensions.width * scale,
              height: dimensions.height * scale,
              backgroundColor: labelData.backgroundColor,
            }}
          >
            {/* Text Elements */}
            {labelData.textElements.map((element) => (
              <div
                key={element.id}
                onClick={() => setSelectedElement(element.id)}
                onDoubleClick={() => setEditingText(element.id)}
                className={`absolute cursor-pointer ${
                  selectedElement === element.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                  transform: 'translate(-50%, -50%)',
                  fontSize: element.fontSize,
                  fontWeight: element.fontWeight,
                  textAlign: element.textAlign,
                  color: element.color,
                }}
              >
                {editingText === element.id ? (
                  <input
                    type="text"
                    value={element.text}
                    onChange={(e) => handleTextChange(element.id, e.target.value)}
                    onBlur={() => setEditingText(null)}
                    autoFocus
                    className="border-2 border-indigo-500 px-2 py-1 rounded"
                    style={{
                      fontSize: element.fontSize,
                      fontWeight: element.fontWeight,
                      textAlign: element.textAlign,
                      color: element.color,
                    }}
                  />
                ) : (
                  <span>{element.text}</span>
                )}
              </div>
            ))}

            {/* Icon Elements */}
            {labelData.iconElements.map((element) => (
              <div
                key={element.id}
                onClick={() => setSelectedElement(element.id)}
                className={`absolute cursor-pointer ${
                  selectedElement === element.id ? 'ring-2 ring-purple-500' : ''
                }`}
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {renderIcon(element.iconName, element.size, element.color)}
              </div>
            ))}
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-80 bg-white border-l p-6 overflow-y-auto">
          <h3 className="text-lg font-bold mb-4">Properties</h3>

          {/* Label Size */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Label Size
            </label>
            <select
              value={labelSize}
              onChange={(e) => onSizeChange(e.target.value as LabelSize)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="2.25x1.25">2.25" × 1.25"</option>
              <option value="2.25x4">2.25" × 4"</option>
              <option value="3.5x1.125">3.5" × 1.125"</option>
            </select>
          </div>

          {/* Background Color */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={labelData.backgroundColor}
                onChange={(e) => handleBackgroundChange(e.target.value)}
                className="w-12 h-10 rounded border border-gray-300"
              />
              <input
                type="text"
                value={labelData.backgroundColor}
                onChange={(e) => handleBackgroundChange(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Text Element Properties */}
          {selectedTextElement && (
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-semibold text-gray-900">Text Properties</h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size
                </label>
                <input
                  type="number"
                  value={selectedTextElement.fontSize}
                  onChange={(e) =>
                    handleTextStyleChange(selectedTextElement.id, {
                      fontSize: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Weight
                </label>
                <select
                  value={selectedTextElement.fontWeight}
                  onChange={(e) =>
                    handleTextStyleChange(selectedTextElement.id, {
                      fontWeight: e.target.value as 'normal' | 'bold',
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Align
                </label>
                <select
                  value={selectedTextElement.textAlign}
                  onChange={(e) =>
                    handleTextStyleChange(selectedTextElement.id, {
                      textAlign: e.target.value as 'left' | 'center' | 'right',
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={selectedTextElement.color}
                    onChange={(e) =>
                      handleTextStyleChange(selectedTextElement.id, {
                        color: e.target.value,
                      })
                    }
                    className="w-12 h-10 rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={selectedTextElement.color}
                    onChange={(e) =>
                      handleTextStyleChange(selectedTextElement.id, {
                        color: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
