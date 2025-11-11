'use client'

import React, { useRef, useEffect, useState, memo } from 'react'
import { Text, Rect, Circle, Line, Image as KonvaImage, Transformer, Group, Path } from 'react-konva'
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
const ImageRenderer = memo(function ImageRenderer({ element, commonProps }: { element: ImageElement; commonProps: any }) {
  const [image] = useImage(element.src)
  const imageRef = useRef<any>(null)

  useEffect(() => {
    if (imageRef.current && image) {
      // Apply filters using Konva's cache and filters
      const node = imageRef.current

      // Apply brightness, contrast, saturation filters
      if (element.brightness !== undefined && element.brightness !== 100) {
        const brightnessValue = (element.brightness - 100) / 100
        node.cache()
        node.brightness(brightnessValue)
      }

      if (element.blur && element.blur > 0) {
        node.cache()
        node.blurRadius(element.blur)
      }

      node.getLayer()?.batchDraw()
    }
  }, [image, element.brightness, element.contrast, element.saturation, element.blur])

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
      ref={imageRef}
      image={image}
      width={element.width}
      height={element.height}
      scaleX={element.flipX ? -1 : 1}
      scaleY={element.flipY ? -1 : 1}
      offsetX={element.flipX ? element.width : 0}
      offsetY={element.flipY ? element.height : 0}
    />
  )
})

const ElementRenderer = memo(function ElementRenderer({
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

  // Apply visual styling for locked elements
  const visualOpacity = element.locked && !isSelected ? element.opacity * 0.7 : element.opacity

  const commonProps = {
    ref: shapeRef,
    x: element.x,
    y: element.y,
    rotation: element.rotation,
    opacity: visualOpacity,
    draggable: !element.locked,
    onClick: onSelect,
    onTap: onSelect,
    shadowColor: element.shadowColor || 'rgba(0,0,0,0)',
    shadowBlur: element.shadowBlur || 0,
    shadowOffsetX: element.shadowOffsetX || 0,
    shadowOffsetY: element.shadowOffsetY || 0,
    shadowOpacity: element.shadowOpacity || 0.5,
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
    onMouseEnter: (e: any) => {
      const container = e.target.getStage()?.container()
      if (container) {
        container.style.cursor = element.locked ? 'not-allowed' : 'move'
      }
    },
    onMouseLeave: (e: any) => {
      const container = e.target.getStage()?.container()
      if (container) {
        container.style.cursor = 'default'
      }
    },
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

  // Lock icon badge for locked elements
  const renderLockBadge = () => {
    if (!element.locked) return null

    const badgeSize = 16
    const padding = 4
    const badgeX = element.x + element.width - badgeSize - padding
    const badgeY = element.y + padding

    return (
      <Group>
        {/* Badge background */}
        <Rect
          x={badgeX}
          y={badgeY}
          width={badgeSize}
          height={badgeSize}
          fill="rgba(239, 68, 68, 0.95)"
          cornerRadius={3}
          shadowColor="rgba(0,0,0,0.3)"
          shadowBlur={2}
          shadowOffsetY={1}
        />
        {/* Lock icon using SVG path */}
        <Path
          x={badgeX + 4}
          y={badgeY + 3}
          data="M4 5V3.5C4 2.12 5.12 1 6.5 1C7.88 1 9 2.12 9 3.5V5M2 5h9c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1H2c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1z"
          fill="white"
          scale={{ x: 0.6, y: 0.6 }}
        />
      </Group>
    )
  }

  return (
    <>
      {renderElement()}
      {renderLockBadge()}
      {isSelected && !element.locked && (
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
})

export default ElementRenderer
