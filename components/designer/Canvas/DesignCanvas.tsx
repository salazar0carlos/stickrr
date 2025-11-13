'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Stage, Layer, Rect, Line } from 'react-konva'
import ElementRenderer from './ElementRenderer'
import ContextMenu from './ContextMenu'
import InlineTextEditor from './InlineTextEditor'
import { useDesignerStore } from '@/store/designerStore'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { TextElement } from '@/types/designer'

interface DesignCanvasProps {
  width: number
  height: number
}

export default function DesignCanvas({ width, height }: DesignCanvasProps) {
  const stageRef = useRef<any>(null)
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
    elementId: string | null
  } | null>(null)
  const [editingTextId, setEditingTextId] = useState<string | null>(null)

  const elements = useDesignerStore((state) => state.elements)
  const selectedIds = useDesignerStore((state) => state.selectedIds)
  const zoom = useDesignerStore((state) => state.zoom)
  const pan = useDesignerStore((state) => state.pan)
  const backgroundColor = useDesignerStore((state) => state.backgroundColor)
  const gridVisible = useDesignerStore((state) => state.gridVisible)
  const gridSize = useDesignerStore((state) => state.gridSize)
  const canvasWidth = useDesignerStore((state) => state.canvasWidth)
  const canvasHeight = useDesignerStore((state) => state.canvasHeight)

  const selectElement = useDesignerStore((state) => state.selectElement)
  const clearSelection = useDesignerStore((state) => state.clearSelection)
  const updateElement = useDesignerStore((state) => state.updateElement)

  // Enable keyboard shortcuts
  useKeyboardShortcuts()

  // Sort elements by zIndex
  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex)

  // Text editing handlers
  const handleDoubleClickText = (elementId: string) => {
    setEditingTextId(elementId)
  }

  const handleFinishTextEdit = (newText: string) => {
    if (editingTextId) {
      updateElement(editingTextId, { content: newText })
      setEditingTextId(null)
    }
  }

  const handleCancelTextEdit = () => {
    setEditingTextId(null)
  }

  const editingElement = editingTextId
    ? (elements.find((el) => el.id === editingTextId) as TextElement)
    : null

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    // Click on empty area - clear selection
    if (e.target === e.target.getStage()) {
      clearSelection()
    }
  }

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault()

    const stage = stageRef.current
    if (!stage) return

    const oldScale = stage.scaleX()
    const pointer = stage.getPointerPosition()

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    }

    const newScale = e.evt.deltaY < 0 ? oldScale * 1.1 : oldScale / 1.1

    useDesignerStore.getState().setZoom(newScale)

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    }

    useDesignerStore.getState().setPan(newPos)
  }

  // Render grid
  const renderGrid = () => {
    if (!gridVisible) return null

    const lines = []
    const padding = 50

    // Vertical lines
    for (let i = 0; i < canvasWidth / gridSize + 1; i++) {
      lines.push(
        <Line
          key={`v-${i}`}
          points={[i * gridSize, 0, i * gridSize, canvasHeight]}
          stroke="#ddd"
          strokeWidth={1}
          dash={[4, 4]}
        />
      )
    }

    // Horizontal lines
    for (let i = 0; i < canvasHeight / gridSize + 1; i++) {
      lines.push(
        <Line
          key={`h-${i}`}
          points={[0, i * gridSize, canvasWidth, i * gridSize]}
          stroke="#ddd"
          strokeWidth={1}
          dash={[4, 4]}
        />
      )
    }

    return lines
  }

  // Prevent page scrolling when interacting with canvas
  useEffect(() => {
    const preventDefault = (e: Event) => {
      if ((e.target as HTMLElement).closest('.konvajs-content')) {
        e.preventDefault()
      }
    }

    document.addEventListener('touchmove', preventDefault, { passive: false })

    return () => {
      document.removeEventListener('touchmove', preventDefault)
    }
  }, [])

  return (
    <div
      className="relative overflow-hidden rounded-lg border-2 border-gray-300 shadow-lg bg-gray-100"
      onTouchMove={(e) => e.preventDefault()}
      style={{ touchAction: 'none' }}
    >
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        scaleX={zoom}
        scaleY={zoom}
        x={pan.x}
        y={pan.y}
        onClick={handleStageClick}
        onWheel={handleWheel}
        draggable
        onDragEnd={(e) => {
          // Only update pan if the stage itself was dragged, not an element
          if (e.target === e.target.getStage()) {
            useDesignerStore.getState().setPan({
              x: e.target.x(),
              y: e.target.y(),
            })
          }
        }}
      >
        <Layer>
          {/* Canvas background */}
          <Rect
            x={0}
            y={0}
            width={canvasWidth}
            height={canvasHeight}
            fill={backgroundColor}
            shadowBlur={10}
            shadowColor="rgba(0,0,0,0.2)"
            shadowOffset={{ x: 2, y: 2 }}
          />

          {/* Grid */}
          {renderGrid()}

          {/* Elements */}
          {sortedElements.map((element) => (
            <ElementRenderer
              key={element.id}
              element={element}
              isSelected={selectedIds.includes(element.id)}
              onSelect={(e) => {
                const isMultiSelect = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey
                selectElement(element.id, isMultiSelect)
              }}
              onContextMenu={(e, elementId) => {
                setContextMenu({
                  x: e.evt.clientX,
                  y: e.evt.clientY,
                  elementId,
                })
              }}
              onDoubleClick={handleDoubleClickText}
              onDragEnd={() => {}}
            />
          ))}
        </Layer>
      </Stage>

      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-lg shadow-md text-sm font-medium text-gray-700">
        {Math.round(zoom * 100)}%
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          elementId={contextMenu.elementId}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Inline Text Editor */}
      {editingElement && (
        <InlineTextEditor
          element={editingElement}
          zoom={zoom}
          pan={pan}
          onFinish={handleFinishTextEdit}
          onCancel={handleCancelTextEdit}
        />
      )}
    </div>
  )
}
