import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { DesignerElement, CanvasState, DesignerActions } from '@/types/designer'

interface DesignerStore extends CanvasState, DesignerActions {
  history: {
    past: CanvasState[]
    future: CanvasState[]
  }
}

const initialCanvasState: CanvasState = {
  elements: [],
  selectedIds: [],
  zoom: 1,
  pan: { x: 0, y: 0 },
  canvasWidth: 800,
  canvasHeight: 600,
  backgroundColor: '#ffffff',
  gridVisible: false,
  gridSize: 20,
  snapToGrid: false,
}

// Helper function to save history
const saveHistory = (state: DesignerStore) => {
  const currentState: CanvasState = {
    elements: [...state.elements],
    selectedIds: [...state.selectedIds],
    zoom: state.zoom,
    pan: { ...state.pan },
    canvasWidth: state.canvasWidth,
    canvasHeight: state.canvasHeight,
    backgroundColor: state.backgroundColor,
    gridVisible: state.gridVisible,
    gridSize: state.gridSize,
    snapToGrid: state.snapToGrid,
  }
  return currentState
}

export const useDesignerStore = create<DesignerStore>()(
  immer((set, get) => ({
    ...initialCanvasState,
    history: {
      past: [],
      future: [],
    },

    // Element operations
    addElement: (element: DesignerElement) => {
      const currentState = saveHistory(get())
      set((draft) => {
        draft.history.past.push(currentState)
        draft.history.future = []
        draft.elements.push(element)
        draft.selectedIds = [element.id]
      })
    },

    updateElement: (id: string, changes: Partial<DesignerElement>) => {
      set((draft) => {
        const index = draft.elements.findIndex((el) => el.id === id)
        if (index !== -1) {
          Object.assign(draft.elements[index], changes)
        }
      })
    },

    deleteElements: (ids: string[]) => {
      const currentState = saveHistory(get())
      set((draft) => {
        draft.history.past.push(currentState)
        draft.history.future = []
        draft.elements = draft.elements.filter((el) => !ids.includes(el.id))
        draft.selectedIds = draft.selectedIds.filter((id) => !ids.includes(id))
      })
    },

    duplicateElements: (ids: string[]) => {
      const currentState = saveHistory(get())
      set((draft) => {
        draft.history.past.push(currentState)
        draft.history.future = []
        const elementsToDuplicate = draft.elements.filter((el) => ids.includes(el.id))
        const duplicated = elementsToDuplicate.map((el) => ({
          ...el,
          id: `${el.id}-copy-${Date.now()}`,
          x: el.x + 20,
          y: el.y + 20,
        }))
        draft.elements.push(...duplicated)
        draft.selectedIds = duplicated.map((el) => el.id)
      })
    },

    // Selection operations
    selectElements: (ids: string[]) => {
      set((draft) => {
        draft.selectedIds = ids
      })
    },

    selectElement: (id: string, addToSelection = false) => {
      set((draft) => {
        if (addToSelection) {
          if (!draft.selectedIds.includes(id)) {
            draft.selectedIds.push(id)
          }
        } else {
          draft.selectedIds = [id]
        }
      })
    },

    clearSelection: () => {
      set((draft) => {
        draft.selectedIds = []
      })
    },

    // Layer operations
    moveToFront: (ids: string[]) => {
      const currentState = saveHistory(get())
      set((draft) => {
        draft.history.past.push(currentState)
        draft.history.future = []
        const maxZ = Math.max(...draft.elements.map((el) => el.zIndex))
        draft.elements.forEach((el) => {
          if (ids.includes(el.id)) {
            el.zIndex = maxZ + 1
          }
        })
      })
    },

    moveToBack: (ids: string[]) => {
      const currentState = saveHistory(get())
      set((draft) => {
        draft.history.past.push(currentState)
        draft.history.future = []
        const minZ = Math.min(...draft.elements.map((el) => el.zIndex))
        draft.elements.forEach((el) => {
          if (ids.includes(el.id)) {
            el.zIndex = minZ - 1
          }
        })
      })
    },

    moveForward: (ids: string[]) => {
      const currentState = saveHistory(get())
      set((draft) => {
        draft.history.past.push(currentState)
        draft.history.future = []
        draft.elements.forEach((el) => {
          if (ids.includes(el.id)) {
            el.zIndex += 1
          }
        })
      })
    },

    moveBackward: (ids: string[]) => {
      const currentState = saveHistory(get())
      set((draft) => {
        draft.history.past.push(currentState)
        draft.history.future = []
        draft.elements.forEach((el) => {
          if (ids.includes(el.id)) {
            el.zIndex -= 1
          }
        })
      })
    },

    // Canvas operations
    setZoom: (zoom: number) => {
      set((draft) => {
        draft.zoom = Math.max(0.1, Math.min(5, zoom))
      })
    },

    setPan: (pan: { x: number; y: number }) => {
      set((draft) => {
        draft.pan = pan
      })
    },

    setBackgroundColor: (color: string) => {
      const currentState = saveHistory(get())
      set((draft) => {
        draft.history.past.push(currentState)
        draft.history.future = []
        draft.backgroundColor = color
      })
    },

    toggleGrid: () => {
      set((draft) => {
        draft.gridVisible = !draft.gridVisible
      })
    },

    setSnapToGrid: (snap: boolean) => {
      set((draft) => {
        draft.snapToGrid = snap
      })
    },

    setCanvasSize: (width: number, height: number) => {
      set((draft) => {
        draft.canvasWidth = width
        draft.canvasHeight = height
      })
    },

    // Alignment operations
    alignLeft: (ids: string[]) => {
      if (ids.length === 0) return
      const selectedElements = get().elements.filter((el) => ids.includes(el.id))
      const minX = Math.min(...selectedElements.map((el) => el.x))

      set((draft) => {
        draft.elements.forEach((el) => {
          if (ids.includes(el.id)) {
            el.x = minX
          }
        })
      })
    },

    alignCenter: (ids: string[]) => {
      if (ids.length === 0) return
      const selectedElements = get().elements.filter((el) => ids.includes(el.id))
      const minX = Math.min(...selectedElements.map((el) => el.x))
      const maxX = Math.max(...selectedElements.map((el) => el.x + el.width))
      const centerX = (minX + maxX) / 2

      set((draft) => {
        draft.elements.forEach((el) => {
          if (ids.includes(el.id)) {
            el.x = centerX - el.width / 2
          }
        })
      })
    },

    alignRight: (ids: string[]) => {
      if (ids.length === 0) return
      const selectedElements = get().elements.filter((el) => ids.includes(el.id))
      const maxX = Math.max(...selectedElements.map((el) => el.x + el.width))

      set((draft) => {
        draft.elements.forEach((el) => {
          if (ids.includes(el.id)) {
            el.x = maxX - el.width
          }
        })
      })
    },

    alignTop: (ids: string[]) => {
      if (ids.length === 0) return
      const selectedElements = get().elements.filter((el) => ids.includes(el.id))
      const minY = Math.min(...selectedElements.map((el) => el.y))

      set((draft) => {
        draft.elements.forEach((el) => {
          if (ids.includes(el.id)) {
            el.y = minY
          }
        })
      })
    },

    alignMiddle: (ids: string[]) => {
      if (ids.length === 0) return
      const selectedElements = get().elements.filter((el) => ids.includes(el.id))
      const minY = Math.min(...selectedElements.map((el) => el.y))
      const maxY = Math.max(...selectedElements.map((el) => el.y + el.height))
      const centerY = (minY + maxY) / 2

      set((draft) => {
        draft.elements.forEach((el) => {
          if (ids.includes(el.id)) {
            el.y = centerY - el.height / 2
          }
        })
      })
    },

    alignBottom: (ids: string[]) => {
      if (ids.length === 0) return
      const selectedElements = get().elements.filter((el) => ids.includes(el.id))
      const maxY = Math.max(...selectedElements.map((el) => el.y + el.height))

      set((draft) => {
        draft.elements.forEach((el) => {
          if (ids.includes(el.id)) {
            el.y = maxY - el.height
          }
        })
      })
    },

    // History operations
    undo: () => {
      const state = get()
      if (state.history.past.length === 0) return

      const previous = state.history.past[state.history.past.length - 1]
      const newPast = state.history.past.slice(0, -1)

      const currentState: CanvasState = {
        elements: state.elements,
        selectedIds: state.selectedIds,
        zoom: state.zoom,
        pan: state.pan,
        canvasWidth: state.canvasWidth,
        canvasHeight: state.canvasHeight,
        backgroundColor: state.backgroundColor,
        gridVisible: state.gridVisible,
        gridSize: state.gridSize,
        snapToGrid: state.snapToGrid,
      }

      set((draft) => {
        Object.assign(draft, previous)
        draft.history.past = newPast
        draft.history.future = [currentState, ...state.history.future]
      })
    },

    redo: () => {
      const state = get()
      if (state.history.future.length === 0) return

      const next = state.history.future[0]
      const newFuture = state.history.future.slice(1)

      const currentState: CanvasState = {
        elements: state.elements,
        selectedIds: state.selectedIds,
        zoom: state.zoom,
        pan: state.pan,
        canvasWidth: state.canvasWidth,
        canvasHeight: state.canvasHeight,
        backgroundColor: state.backgroundColor,
        gridVisible: state.gridVisible,
        gridSize: state.gridSize,
        snapToGrid: state.snapToGrid,
      }

      set((draft) => {
        Object.assign(draft, next)
        draft.history.past = [...state.history.past, currentState]
        draft.history.future = newFuture
      })
    },

    // Utility
    reset: () => {
      set((draft) => {
        Object.assign(draft, initialCanvasState)
        draft.history = { past: [], future: [] }
      })
    },
  }))
)
