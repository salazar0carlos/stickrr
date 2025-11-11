'use client'

import React, { useState } from 'react'
import { useDesignerStore } from '@/store/designerStore'
import { LABEL_SIZES, ZOOM_PRESETS, type LabelSizeKey } from '@/lib/designerConstants'
import ExportDialog, { type ExportOptions } from '../ExportDialog'
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
  Maximize2,
  ChevronDown,
  Download,
} from 'lucide-react'

export default function MainToolbar() {
  const [showCanvasSizeMenu, setShowCanvasSizeMenu] = useState(false)
  const [showZoomMenu, setShowZoomMenu] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const zoom = useDesignerStore((state) => state.zoom)
  const selectedIds = useDesignerStore((state) => state.selectedIds)
  const gridVisible = useDesignerStore((state) => state.gridVisible)
  const snapToGrid = useDesignerStore((state) => state.snapToGrid)
  const history = useDesignerStore((state) => state.history)

  const setZoom = useDesignerStore((state) => state.setZoom)
  const undo = useDesignerStore((state) => state.undo)
  const redo = useDesignerStore((state) => state.redo)
  const toggleGrid = useDesignerStore((state) => state.toggleGrid)
  const setSnapToGrid = useDesignerStore((state) => state.setSnapToGrid)
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
  const canvasWidth = useDesignerStore((state) => state.canvasWidth)
  const canvasHeight = useDesignerStore((state) => state.canvasHeight)
  const setCanvasSize = useDesignerStore((state) => state.setCanvasSize)

  const hasSelection = selectedIds.length > 0
  const canUndo = history.past.length > 0
  const canRedo = history.future.length > 0

  const handleCanvasSizeChange = (size: LabelSizeKey) => {
    const { width, height } = LABEL_SIZES[size]
    setCanvasSize(width, height)
    setShowCanvasSizeMenu(false)
  }

  const handleZoomPreset = (zoomValue: number) => {
    setZoom(zoomValue)
    setShowZoomMenu(false)
  }

  const getCurrentSizeLabel = () => {
    const sizeEntry = Object.entries(LABEL_SIZES).find(
      ([_, size]) => size.width === canvasWidth && size.height === canvasHeight
    )
    return sizeEntry ? sizeEntry[1].label : 'Custom'
  }

  const handleExport = (options: ExportOptions) => {
    // Get the canvas element from the Konva stage
    const stage = document.querySelector('canvas')
    if (!stage) return

    // Create a temporary link to download
    const dataURL = (stage as HTMLCanvasElement).toDataURL(
      `image/${options.format}`,
      options.quality / 100
    )

    const link = document.createElement('a')
    link.download = `design-${Date.now()}.${options.format}`
    link.href = dataURL
    link.click()
  }

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

      {/* Center - Canvas Size & Zoom controls */}
      <div className="flex items-center gap-2">
        {/* Canvas Size Selector */}
        <div className="relative">
          <button
            onClick={() => setShowCanvasSizeMenu(!showCanvasSizeMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition text-sm font-medium text-gray-700 border border-gray-300"
            title="Canvas Size"
          >
            <Maximize2 className="w-4 h-4" />
            {getCurrentSizeLabel()}
            <ChevronDown className="w-3 h-3" />
          </button>
          {showCanvasSizeMenu && (
            <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[150px]">
              {Object.entries(LABEL_SIZES).map(([key, size]) => (
                <button
                  key={key}
                  onClick={() => handleCanvasSizeChange(key as LabelSizeKey)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition"
                >
                  {size.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Zoom Controls */}
        <button
          onClick={() => setZoom(zoom - 0.1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5 text-gray-700" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowZoomMenu(!showZoomMenu)}
            className="min-w-[70px] px-3 py-1.5 rounded-lg hover:bg-gray-100 transition text-sm font-medium text-gray-700 border border-gray-300"
            title="Zoom Level"
          >
            {Math.round(zoom * 100)}%
          </button>
          {showZoomMenu && (
            <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
              {ZOOM_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handleZoomPreset(preset.value)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setZoom(zoom + 0.1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5 text-gray-700" />
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

        <button
          onClick={() => setSnapToGrid(!snapToGrid)}
          className={`px-3 py-1.5 rounded-lg transition text-xs font-medium ${
            snapToGrid ? 'bg-indigo-100 text-indigo-600 border border-indigo-300' : 'hover:bg-gray-100 text-gray-700 border border-gray-300'
          }`}
          title="Snap to Grid"
        >
          Snap
        </button>
      </div>

      {/* Right side - Save & Export */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowExportDialog(true)}
          className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
          title="Export Design"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
        <button
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium shadow-sm"
          title="Save Design"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>

      {/* Export Dialog */}
      {showExportDialog && (
        <ExportDialog
          onClose={() => setShowExportDialog(false)}
          onExport={handleExport}
        />
      )}
    </div>
  )
}
