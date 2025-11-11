'use client'

import React from 'react'
import { useDesignerStore } from '@/store/designerStore'
import {
  ZoomIn,
  ZoomOut,
  Undo2,
  Redo2,
  Grid3x3,
  Trash2,
  Copy,
  Save,
  ArrowUpToLine,
  ArrowDownToLine,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignHorizontalJustifyStart,
  AlignHorizontalJustifyEnd,
} from 'lucide-react'

export default function MainToolbar() {
  const zoom = useDesignerStore((state) => state.zoom)
  const selectedIds = useDesignerStore((state) => state.selectedIds)
  const gridVisible = useDesignerStore((state) => state.gridVisible)
  const history = useDesignerStore((state) => state.history)

  const setZoom = useDesignerStore((state) => state.setZoom)
  const undo = useDesignerStore((state) => state.undo)
  const redo = useDesignerStore((state) => state.redo)
  const toggleGrid = useDesignerStore((state) => state.toggleGrid)
  const deleteElements = useDesignerStore((state) => state.deleteElements)
  const duplicateElements = useDesignerStore((state) => state.duplicateElements)
  const moveToFront = useDesignerStore((state) => state.moveToFront)
  const moveToBack = useDesignerStore((state) => state.moveToBack)
  const alignLeft = useDesignerStore((state) => state.alignLeft)
  const alignCenter = useDesignerStore((state) => state.alignCenter)
  const alignRight = useDesignerStore((state) => state.alignRight)
  const alignTop = useDesignerStore((state) => state.alignTop)
  const alignMiddle = useDesignerStore((state) => state.alignMiddle)
  const alignBottom = useDesignerStore((state) => state.alignBottom)

  const hasSelection = selectedIds.length > 0
  const canUndo = history.past.length > 0
  const canRedo = history.future.length > 0

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      {/* Left side - Main actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={undo}
          disabled={!canUndo}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
          title="Undo"
        >
          <Undo2 className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
          title="Redo"
        >
          <Redo2 className="w-5 h-5 text-gray-700" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button
          onClick={() => duplicateElements(selectedIds)}
          disabled={!hasSelection}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
          title="Duplicate"
        >
          <Copy className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={() => deleteElements(selectedIds)}
          disabled={!hasSelection}
          className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
          title="Delete"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button
          onClick={() => moveToFront(selectedIds)}
          disabled={!hasSelection}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
          title="Bring to Front"
        >
          <ArrowUpToLine className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={() => moveToBack(selectedIds)}
          disabled={!hasSelection}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
          title="Send to Back"
        >
          <ArrowDownToLine className="w-5 h-5 text-gray-700" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button
          onClick={() => alignLeft(selectedIds)}
          disabled={selectedIds.length < 2}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
          title="Align Left"
        >
          <AlignLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={() => alignCenter(selectedIds)}
          disabled={selectedIds.length < 2}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
          title="Align Center"
        >
          <AlignCenter className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={() => alignRight(selectedIds)}
          disabled={selectedIds.length < 2}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
          title="Align Right"
        >
          <AlignRight className="w-5 h-5 text-gray-700" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button
          onClick={() => alignTop(selectedIds)}
          disabled={selectedIds.length < 2}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
          title="Align Top"
        >
          <AlignHorizontalJustifyStart className="w-5 h-5 text-gray-700 rotate-90" />
        </button>
        <button
          onClick={() => alignMiddle(selectedIds)}
          disabled={selectedIds.length < 2}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
          title="Align Middle"
        >
          <AlignVerticalJustifyCenter className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={() => alignBottom(selectedIds)}
          disabled={selectedIds.length < 2}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
          title="Align Bottom"
        >
          <AlignHorizontalJustifyEnd className="w-5 h-5 text-gray-700 rotate-90" />
        </button>
      </div>

      {/* Center - Zoom controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setZoom(zoom - 0.1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5 text-gray-700" />
        </button>
        <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom(zoom + 0.1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={() => setZoom(1)}
          className="px-3 py-1 rounded-lg hover:bg-gray-100 transition text-sm font-medium text-gray-700"
          title="Reset Zoom"
        >
          Fit
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button
          onClick={toggleGrid}
          className={`p-2 rounded-lg transition ${
            gridVisible ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100 text-gray-700'
          }`}
          title="Toggle Grid"
        >
          <Grid3x3 className="w-5 h-5" />
        </button>
      </div>

      {/* Right side - Save */}
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium shadow-sm"
          title="Save Design"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>
    </div>
  )
}
