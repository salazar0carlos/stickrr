'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { TextElement } from '@/types/designer'

interface InlineTextEditorProps {
  element: TextElement
  zoom: number
  pan: { x: number; y: number }
  onFinish: (newText: string) => void
  onCancel: () => void
}

export default function InlineTextEditor({
  element,
  zoom,
  pan,
  onFinish,
  onCancel,
}: InlineTextEditorProps) {
  const [text, setText] = useState(element.content)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Focus and select all text when editor appears
    if (textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.select()
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onCancel()
    } else if (e.key === 'Enter' && !e.shiftKey) {
      // Enter without Shift saves, Shift+Enter adds new line
      e.preventDefault()
      onFinish(text)
    }
  }

  const handleBlur = () => {
    // Save changes when clicking outside
    onFinish(text)
  }

  // Calculate position based on element position, zoom, and pan
  const left = element.x * zoom + pan.x
  const top = element.y * zoom + pan.y
  const width = element.width * zoom
  const minHeight = element.height * zoom

  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        minHeight: `${minHeight}px`,
        zIndex: 1000,
      }}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        style={{
          width: '100%',
          minHeight: `${minHeight}px`,
          padding: '4px',
          border: '2px solid #6366f1',
          borderRadius: '4px',
          backgroundColor: 'white',
          fontSize: `${element.fontSize * zoom}px`,
          fontFamily: element.fontFamily,
          fontStyle: element.fontStyle === 'italic' ? 'italic' : 'normal',
          fontWeight: element.fontWeight,
          textDecoration: element.textDecoration || 'none',
          color: element.color,
          textAlign: element.textAlign as any,
          lineHeight: element.lineHeight,
          letterSpacing: `${element.letterSpacing}px`,
          resize: 'none',
          outline: 'none',
          overflow: 'hidden',
        }}
        rows={3}
      />
      <div className="text-xs text-gray-500 mt-1 bg-white px-2 py-1 rounded shadow-sm">
        Press Enter to save, Esc to cancel, Shift+Enter for new line
      </div>
    </div>
  )
}
