'use client'

import React, { useEffect, memo } from 'react'
import { useDesignerStore } from '@/store/designerStore'
import {
  Copy,
  Trash2,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ArrowUpToLine,
  ArrowDownToLine,
  Layers,
} from 'lucide-react'

interface ContextMenuProps {
  x: number
  y: number
  elementId: string | null
  onClose: () => void
}

const ContextMenu = memo(function ContextMenu({ x, y, elementId, onClose }: ContextMenuProps) {
  const elements = useDesignerStore((state) => state.elements)
  const duplicateElements = useDesignerStore((state) => state.duplicateElements)
  const deleteElements = useDesignerStore((state) => state.deleteElements)
  const updateElement = useDesignerStore((state) => state.updateElement)
  const moveToFront = useDesignerStore((state) => state.moveToFront)
  const moveToBack = useDesignerStore((state) => state.moveToBack)

  const element = elementId ? elements.find((el) => el.id === elementId) : null

  useEffect(() => {
    const handleClick = () => onClose()
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  if (!element) return null

  const isLocked = element.locked

  const menuItems = [
    // Show locked indicator if element is locked
    ...(isLocked
      ? [
          {
            label: 'Locked Element',
            icon: Lock,
            onClick: () => {},
            disabled: true,
            info: true,
          },
          { divider: true },
        ]
      : []),
    {
      label: 'Duplicate',
      icon: Copy,
      onClick: () => {
        duplicateElements([element.id])
        onClose()
      },
      disabled: isLocked,
    },
    {
      label: element.locked ? 'Unlock' : 'Lock',
      icon: element.locked ? Unlock : Lock,
      onClick: () => {
        updateElement(element.id, { locked: !element.locked })
        onClose()
      },
    },
    {
      label: element.visible ? 'Hide' : 'Show',
      icon: element.visible ? EyeOff : Eye,
      onClick: () => {
        updateElement(element.id, { visible: !element.visible })
        onClose()
      },
    },
    { divider: true },
    {
      label: 'Bring to Front',
      icon: ArrowUpToLine,
      onClick: () => {
        moveToFront([element.id])
        onClose()
      },
      disabled: isLocked,
    },
    {
      label: 'Send to Back',
      icon: ArrowDownToLine,
      onClick: () => {
        moveToBack([element.id])
        onClose()
      },
      disabled: isLocked,
    },
    { divider: true },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: () => {
        if (!isLocked) {
          deleteElements([element.id])
        }
        onClose()
      },
      danger: true,
      disabled: isLocked,
    },
  ]

  return (
    <div
      className="fixed bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50 min-w-[180px]"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
    >
      {menuItems.map((item, index) => {
        if ('divider' in item) {
          return <div key={index} className="h-px bg-gray-200 my-1" />
        }

        const Icon = item.icon
        const isDisabled = 'disabled' in item && item.disabled
        const isInfo = 'info' in item && item.info

        return (
          <button
            key={index}
            onClick={!isDisabled ? item.onClick : undefined}
            disabled={isDisabled}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition ${
              isInfo
                ? 'text-amber-700 bg-amber-50 cursor-default'
                : isDisabled
                ? 'text-gray-400 cursor-not-allowed opacity-50'
                : item.danger
                ? 'text-red-600 hover:bg-red-50'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-4 h-4" />
            {item.label}
          </button>
        )
      })}
    </div>
  )
})

export default ContextMenu
