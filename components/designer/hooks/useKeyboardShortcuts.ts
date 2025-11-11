import { useEffect } from 'react'
import { useDesignerStore } from '@/store/designerStore'

export function useKeyboardShortcuts() {
  const selectedIds = useDesignerStore((state) => state.selectedIds)
  const deleteElements = useDesignerStore((state) => state.deleteElements)
  const duplicateElements = useDesignerStore((state) => state.duplicateElements)
  const undo = useDesignerStore((state) => state.undo)
  const redo = useDesignerStore((state) => state.redo)
  const selectElement = useDesignerStore((state) => state.selectElement)
  const elements = useDesignerStore((state) => state.elements)

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

      // Deselect (Escape)
      if (e.key === 'Escape') {
        e.preventDefault()
        useDesignerStore.getState().clearSelection()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIds, deleteElements, duplicateElements, undo, redo, selectElement, elements])
}
