import { useEffect, useRef } from 'react'
import { useDesignerStore } from '@/store/designerStore'
import type { DesignerElement } from '@/types/designer'

export function useKeyboardShortcuts() {
  const selectedIds = useDesignerStore((state) => state.selectedIds)
  const deleteElements = useDesignerStore((state) => state.deleteElements)
  const duplicateElements = useDesignerStore((state) => state.duplicateElements)
  const undo = useDesignerStore((state) => state.undo)
  const redo = useDesignerStore((state) => state.redo)
  const selectElement = useDesignerStore((state) => state.selectElement)
  const elements = useDesignerStore((state) => state.elements)
  const addElement = useDesignerStore((state) => state.addElement)

  // Use ref to store clipboard data (can't use localStorage for complex objects)
  const clipboardRef = useRef<DesignerElement[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore shortcuts when typing in input fields
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey

      // Delete
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIds.length > 0) {
        e.preventDefault()
        deleteElements(selectedIds)
      }

      // Undo (Ctrl/Cmd + Z)
      if (cmdOrCtrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      }

      // Redo (Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y)
      if ((cmdOrCtrl && e.shiftKey && e.key === 'z') || (cmdOrCtrl && e.key === 'y')) {
        e.preventDefault()
        redo()
      }

      // Duplicate (Ctrl/Cmd + D)
      if (cmdOrCtrl && e.key === 'd' && selectedIds.length > 0) {
        e.preventDefault()
        duplicateElements(selectedIds)
      }

      // Select All (Ctrl/Cmd + A)
      if (cmdOrCtrl && e.key === 'a') {
        e.preventDefault()
        useDesignerStore.getState().selectElements(elements.map((el) => el.id))
      }

      // Copy (Ctrl/Cmd + C)
      if (cmdOrCtrl && e.key === 'c' && selectedIds.length > 0) {
        e.preventDefault()
        const selectedElements = elements.filter((el) => selectedIds.includes(el.id))
        clipboardRef.current = selectedElements.map((el) => ({ ...el }))
      }

      // Paste (Ctrl/Cmd + V)
      if (cmdOrCtrl && e.key === 'v' && clipboardRef.current.length > 0) {
        e.preventDefault()
        const newElements = clipboardRef.current.map((el) => ({
          ...el,
          id: `${el.type}-${Date.now()}-${Math.random()}`,
          x: el.x + 20,
          y: el.y + 20,
        }))

        // Clear current selection and add new elements
        useDesignerStore.getState().clearSelection()
        newElements.forEach((el) => addElement(el))
      }

      // Cut (Ctrl/Cmd + X)
      if (cmdOrCtrl && e.key === 'x' && selectedIds.length > 0) {
        e.preventDefault()
        const selectedElements = elements.filter((el) => selectedIds.includes(el.id))
        clipboardRef.current = selectedElements.map((el) => ({ ...el }))
        deleteElements(selectedIds)
      }

      // Deselect (Escape)
      if (e.key === 'Escape') {
        e.preventDefault()
        useDesignerStore.getState().clearSelection()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIds, deleteElements, duplicateElements, undo, redo, selectElement, elements, addElement])
}
