'use client'

import React from 'react'
import { useDesignerStore } from '@/store/designerStore'
import type { TextElement, ShapeElement } from '@/types/designer'
import { Type, Square, Circle, Image as ImageIcon, Minus, Triangle, Star } from 'lucide-react'

export default function ElementsPanel() {
  const addElement = useDesignerStore((state) => state.addElement)
  const elements = useDesignerStore((state) => state.elements)

  const addTextElement = () => {
    const newElement: TextElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      x: 50,
      y: 50,
      width: 200,
      height: 40,
      rotation: 0,
      zIndex: elements.length,
      locked: false,
      visible: true,
      opacity: 1,
      content: 'Click to edit text',
      fontSize: 24,
      fontFamily: 'Inter',
      fontWeight: 400,
      color: '#000000',
      textAlign: 'left',
      lineHeight: 1.2,
      letterSpacing: 0,
    }
    addElement(newElement)
  }

  const addRectangle = () => {
    const newElement: ShapeElement = {
      id: `rect-${Date.now()}`,
      type: 'shape',
      shapeType: 'rectangle',
      x: 50,
      y: 50,
      width: 150,
      height: 100,
      rotation: 0,
      zIndex: elements.length,
      locked: false,
      visible: true,
      opacity: 1,
      fill: '#6366F1',
      stroke: '#4F46E5',
      strokeWidth: 2,
      cornerRadius: 8,
    }
    addElement(newElement)
  }

  const addCircle = () => {
    const newElement: ShapeElement = {
      id: `circle-${Date.now()}`,
      type: 'shape',
      shapeType: 'circle',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      rotation: 0,
      zIndex: elements.length,
      locked: false,
      visible: true,
      opacity: 1,
      fill: '#EC4899',
      stroke: '#DB2777',
      strokeWidth: 2,
    }
    addElement(newElement)
  }

  const addLine = () => {
    const newElement: ShapeElement = {
      id: `line-${Date.now()}`,
      type: 'shape',
      shapeType: 'line',
      x: 50,
      y: 100,
      width: 200,
      height: 2,
      rotation: 0,
      zIndex: elements.length,
      locked: false,
      visible: true,
      opacity: 1,
      fill: 'transparent',
      stroke: '#374151',
      strokeWidth: 3,
      points: [0, 0, 200, 0],
    }
    addElement(newElement)
  }

  const addTriangle = () => {
    const newElement: ShapeElement = {
      id: `triangle-${Date.now()}`,
      type: 'shape',
      shapeType: 'polygon',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      rotation: 0,
      zIndex: elements.length,
      locked: false,
      visible: true,
      opacity: 1,
      fill: '#10B981',
      stroke: '#059669',
      strokeWidth: 2,
      points: [50, 0, 100, 100, 0, 100],
    }
    addElement(newElement)
  }

  const addStar = () => {
    const newElement: ShapeElement = {
      id: `star-${Date.now()}`,
      type: 'shape',
      shapeType: 'polygon',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      rotation: 0,
      zIndex: elements.length,
      locked: false,
      visible: true,
      opacity: 1,
      fill: '#F59E0B',
      stroke: '#D97706',
      strokeWidth: 2,
      points: [
        50, 0,
        61, 35,
        98, 35,
        68, 57,
        79, 91,
        50, 70,
        21, 91,
        32, 57,
        2, 35,
        39, 35,
      ],
    }
    addElement(newElement)
  }

  const elements_list = [
    {
      name: 'Text',
      icon: Type,
      description: 'Add text to your design',
      onClick: addTextElement,
    },
    {
      name: 'Rectangle',
      icon: Square,
      description: 'Add a rectangle shape',
      onClick: addRectangle,
    },
    {
      name: 'Circle',
      icon: Circle,
      description: 'Add a circle shape',
      onClick: addCircle,
    },
    {
      name: 'Line',
      icon: Minus,
      description: 'Add a line',
      onClick: addLine,
    },
    {
      name: 'Triangle',
      icon: Triangle,
      description: 'Add a triangle shape',
      onClick: addTriangle,
    },
    {
      name: 'Star',
      icon: Star,
      description: 'Add a star shape',
      onClick: addStar,
    },
  ]

  return (
    <div className="p-4 space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Elements</h3>
      <div className="grid grid-cols-2 gap-2">
        {elements_list.map((element) => (
          <button
            key={element.name}
            onClick={element.onClick}
            className="group flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition cursor-pointer"
            title={element.description}
          >
            <element.icon className="w-6 h-6 text-gray-600 group-hover:text-indigo-600 transition" />
            <span className="text-xs font-medium text-gray-700 group-hover:text-indigo-700">
              {element.name}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 transition text-gray-600 hover:text-indigo-600"
          title="Upload Image"
        >
          <ImageIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Upload Image</span>
        </button>
      </div>
    </div>
  )
}
