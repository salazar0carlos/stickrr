'use client'

import React, { useRef, useEffect } from 'react'
import { Stage, Layer, Text, Rect, Circle } from 'react-konva'
import type { Template } from '@/lib/templates/enhanced-types'
import type { TextElement, ShapeElement } from '@/types/designer'

interface TemplatePreviewProps {
  template: Template
  width?: number
  height?: number
}

export default function TemplatePreview({ template, width = 200, height = 120 }: TemplatePreviewProps) {
  const stageRef = useRef(null)

  // Get canvas dimensions from template metadata
  const canvasSize = template.metadata.size
  let canvasWidth = 675
  let canvasHeight = 375

  // Map size to dimensions
  const sizeMap: Record<string, { width: number; height: number }> = {
    '2x1': { width: 600, height: 300 },
    '2.25x1.25': { width: 675, height: 375 },
    '3x2': { width: 900, height: 600 },
    '4x2': { width: 1200, height: 600 },
    '4x3': { width: 1200, height: 900 },
    '4x6': { width: 1200, height: 1800 },
  }

  if (sizeMap[canvasSize]) {
    canvasWidth = sizeMap[canvasSize].width
    canvasHeight = sizeMap[canvasSize].height
  }

  // Calculate scale to fit preview
  const scaleX = width / canvasWidth
  const scaleY = height / canvasHeight
  const scale = Math.min(scaleX, scaleY)

  const scaledWidth = canvasWidth * scale
  const scaledHeight = canvasHeight * scale

  return (
    <div
      className="flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Stage width={scaledWidth} height={scaledHeight} ref={stageRef}>
        <Layer>
          {/* Background */}
          <Rect
            x={0}
            y={0}
            width={canvasWidth}
            height={canvasHeight}
            fill={template.backgroundColor}
            scaleX={scale}
            scaleY={scale}
          />

          {/* Render all elements */}
          {template.elements.map((element) => {
            if (element.type === 'text') {
              const textEl = element as TextElement
              return (
                <Text
                  key={element.id}
                  x={textEl.x}
                  y={textEl.y}
                  text={textEl.content}
                  fontSize={textEl.fontSize}
                  fontFamily={textEl.fontFamily}
                  fontStyle={textEl.fontStyle || 'normal'}
                  fill={textEl.color}
                  align={textEl.textAlign}
                  width={textEl.width}
                  rotation={textEl.rotation}
                  opacity={textEl.opacity}
                  scaleX={scale}
                  scaleY={scale}
                  listening={false}
                />
              )
            }

            if (element.type === 'shape') {
              const shapeEl = element as ShapeElement
              if (shapeEl.shapeType === 'rectangle') {
                return (
                  <Rect
                    key={element.id}
                    x={shapeEl.x}
                    y={shapeEl.y}
                    width={shapeEl.width}
                    height={shapeEl.height}
                    fill={shapeEl.fill}
                    stroke={shapeEl.stroke}
                    strokeWidth={shapeEl.strokeWidth}
                    cornerRadius={shapeEl.cornerRadius || 0}
                    rotation={shapeEl.rotation}
                    opacity={shapeEl.opacity}
                    scaleX={scale}
                    scaleY={scale}
                    listening={false}
                  />
                )
              }

              if (shapeEl.shapeType === 'circle') {
                return (
                  <Circle
                    key={element.id}
                    x={shapeEl.x + shapeEl.width / 2}
                    y={shapeEl.y + shapeEl.height / 2}
                    radius={shapeEl.width / 2}
                    fill={shapeEl.fill}
                    stroke={shapeEl.stroke}
                    strokeWidth={shapeEl.strokeWidth}
                    rotation={shapeEl.rotation}
                    opacity={shapeEl.opacity}
                    scaleX={scale}
                    scaleY={scale}
                    listening={false}
                  />
                )
              }
            }

            return null
          })}
        </Layer>
      </Stage>
    </div>
  )
}
