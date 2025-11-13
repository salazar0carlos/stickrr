'use client'

import React from 'react'
import { Group, Rect, Path } from 'react-konva'

interface LockedIndicatorProps {
  x: number
  y: number
  width: number
}

export default function LockedIndicator({ x, y, width }: LockedIndicatorProps) {
  const indicatorSize = 20
  const indicatorX = x + width - indicatorSize - 5
  const indicatorY = y + 5

  // Lock icon path (simplified SVG)
  const lockPath = 'M6 8V6C6 3.79 7.79 2 10 2C12.21 2 14 3.79 14 6V8H15C15.55 8 16 8.45 16 9V15C16 15.55 15.55 16 15 16H5C4.45 16 4 15.55 4 15V9C4 8.45 4.45 8 5 8H6ZM8 6V8H12V6C12 4.9 11.1 4 10 4C8.9 4 8 4.9 8 6Z'

  return (
    <Group>
      {/* Background circle */}
      <Rect
        x={indicatorX}
        y={indicatorY}
        width={indicatorSize}
        height={indicatorSize}
        fill="rgba(239, 68, 68, 0.9)"
        cornerRadius={indicatorSize / 2}
        shadowBlur={4}
        shadowColor="rgba(0,0,0,0.3)"
      />
      {/* Lock icon - using a simple rect for now since SVG paths are complex in Konva */}
      <Rect
        x={indicatorX + 6}
        y={indicatorY + 6}
        width={8}
        height={8}
        fill="white"
        cornerRadius={2}
      />
    </Group>
  )
}
