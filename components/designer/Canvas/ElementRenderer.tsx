'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Text, Rect, Circle, Line, Image as KonvaImage, Transformer } from 'react-konva'
import type { DesignerElement, TextElement, ShapeElement, ImageElement } from '@/types/designer'
import { useDesignerStore } from '@/store/designerStore'
import useImage from 'use-image'

interface ElementRendererProps {
  element: DesignerElement
  isSelected: boolean
  onSelect: (e: any) => void
  onDragEnd: (e: any) => void
  onContextMenu?: (e: any, elementId: string) => void
  onDoubleClick?: (elementId: string) => void
}

// Separate component for image rendering to use the useImage hook
function ImageRenderer({ element, commonProps }: { element: ImageElement; commonProps: any }) {
  const [image] = useImage(element.src)

  if (!image) {
    // Show placeholder while image is loading
    return (
      <Rect
        {...commonProps}
        width={element.width}
        height={element.height}
        fill="#f0f0f0"
        stroke="#ccc"
        strokeWidth={1}
        dash={[5, 5]}
      />
    )
  }

  return (
    <KonvaImage
      {...commonProps}
      image={image}
      width={element.width}
      height={element.height}
    />
  )
}

export default function ElementRenderer({
  element,
  isSelected,
  onSelect,
  onDragEnd,
  onContextMenu,
  onDoubleClick,
}: ElementRendererProps) {
  const transformerRef = useRef<any>(null)
  const shapeRef = useRef<any>(null)
  const updateElement = useDesignerStore((state) => state.updateElement)
  const snapToGrid = useDesignerStore((state) => state.snapToGrid)
  const gridSize = useDesignerStore((state) => state.gridSize)

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current])
      transformerRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  // Don't render hidden elements
  if (!element.visible) return null

  const snapToGridValue = (value: number) => {
    if (!snapToGrid) return value
    return Math.round(value / gridSize) * gridSize
  }

  const handleTransformEnd = () => {
    const node = shapeRef.current
    if (!node) return

    const scaleX = node.scaleX()
    const scaleY = node.scaleY()

    // Reset scale and update width/height
    node.scaleX(1)
    node.scaleY(1)

    updateElement(element.id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      rotation: node.rotation(),
    })
  }

  const commonProps = {
    ref: shapeRef,
    x: element.x,
    y: element.y,
    rotation: element.rotation,
    opacity: element.opacity,
    draggable: !element.locked,
    onClick: onSelect,
    onTap: onSelect,
    onContextMenu: (e: any) => {
      e.evt.preventDefault()
      if (onContextMenu) {
        onContextMenu(e, element.id)
      }
    },
    onDragEnd: (e: any) => {
      onDragEnd(e)
      const newX = snapToGridValue(e.target.x())
      const newY = snapToGridValue(e.target.y())
      updateElement(element.id, {
        x: newX,
        y: newY,
      })
      // Snap the visual position too
      e.target.x(newX)
      e.target.y(newY)
    },
    onTransformEnd: handleTransformEnd,
  }

  const renderElement = () => {
    switch (element.type) {
      case 'text': {
        const textEl = element as TextElement
        return (
          <Text
            {...commonProps}
            text={textEl.content}
            fontSize={textEl.fontSize}
            fontFamily={textEl.fontFamily}
            fontStyle={textEl.fontStyle === 'italic' ? 'italic' : 'normal'}
            textDecoration={textEl.textDecoration || 'none'}
            fill={textEl.color}
            align={textEl.textAlign}
            width={textEl.width}
            height={textEl.height}
            lineHeight={textEl.lineHeight}
            letterSpacing={textEl.letterSpacing}
            onDblClick={() => {
              if (onDoubleClick) {
                onDoubleClick(element.id)
              }
            }}
          />
        )
      }

      case 'shape': {
        const shapeEl = element as ShapeElement
        if (shapeEl.shapeType === 'rectangle') {
          return (
            <Rect
              {...commonProps}
              width={shapeEl.width}
              height={shapeEl.height}
              fill={shapeEl.fill}
              stroke={shapeEl.stroke}
              strokeWidth={shapeEl.strokeWidth}
              cornerRadius={shapeEl.cornerRadius || 0}
            />
          )
        } else if (shapeEl.shapeType === 'circle') {
          return (
            <Circle
              {...commonProps}
              radius={Math.min(shapeEl.width, shapeEl.height) / 2}
              fill={shapeEl.fill}
              stroke={shapeEl.stroke}
              strokeWidth={shapeEl.strokeWidth}
            />
          )
        } else if (shapeEl.shapeType === 'line') {
          return (
            <Line
              {...commonProps}
              points={shapeEl.points || [0, 0, shapeEl.width, 0]}
              stroke={shapeEl.stroke}
              strokeWidth={shapeEl.strokeWidth}
            />
          )
        } else if (shapeEl.shapeType === 'polygon') {
          return (
            <Line
              {...commonProps}
              points={shapeEl.points || []}
              fill={shapeEl.fill}
              stroke={shapeEl.stroke}
              strokeWidth={shapeEl.strokeWidth}
              closed={true}
            />
          )
        }
        return null
      }

      case 'image': {
        const imageEl = element as ImageElement
        return <ImageRenderer element={imageEl} commonProps={commonProps} />
      }

      default:
        return null
    }
  }

  return (
    <>
      {renderElement()}
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resize to minimum size
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}
