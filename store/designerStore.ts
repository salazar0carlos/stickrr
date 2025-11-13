import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { DesignerElement, CanvasState, DesignerActions } from '@/types/designer'
import { labels, auth } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface DesignerStore extends CanvasState, DesignerActions {
  history: {
    past: CanvasState[]
    future: CanvasState[]
  }
  currentLabelId: string | null
  currentLabelName: string
  isSaving: boolean
  isLoading: boolean
  saveLabel: (name?: string) => Promise<void>
  loadLabel: (labelId: string) => Promise<void>
  createNewLabel: () => void
  getCanvasState: () => CanvasState
  setCanvasState: (state: CanvasState) => void
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
    currentLabelId: null,
    currentLabelName: 'Untitled Label',
    isSaving: false,
    isLoading: false,

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

    // Save/Load operations
    getCanvasState: () => {
      const state = get()
      return {
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
    },

    setCanvasState: (canvasState: CanvasState) => {
      set((draft) => {
        Object.assign(draft, canvasState)
        // Clear selection after loading
        draft.selectedIds = []
      })
    },

    saveLabel: async (name?: string) => {
      const state = get()

      try {
        set((draft) => {
          draft.isSaving = true
        })

        // Get current user
        const user = await auth.getUser()
        if (!user) {
          toast.error('You must be logged in to save labels')
          return
        }

        // Use provided name or current name
        const labelName = name || state.currentLabelName

        // Get current canvas state
        const canvasState = state.getCanvasState()

        // If we have a currentLabelId, update existing label
        if (state.currentLabelId) {
          const { data, error } = await labels.update(state.currentLabelId, {
            name: labelName,
            canvas_data: canvasState,
          })

          if (error) {
            console.error('Error updating label:', error)
            toast.error('Failed to save label')
            return
          }

          toast.success('Label saved successfully!')
        } else {
          // Create new label
          const { data, error } = await labels.create({
            user_id: user.id,
            name: labelName,
            canvas_data: canvasState,
          })

          if (error) {
            console.error('Error creating label:', error)
            toast.error('Failed to save label')
            return
          }

          // Update current label ID and name
          set((draft) => {
            draft.currentLabelId = data.id
            draft.currentLabelName = labelName
          })

          toast.success('Label saved successfully!')
        }
      } catch (error) {
        console.error('Error saving label:', error)
        toast.error('Failed to save label')
      } finally {
        set((draft) => {
          draft.isSaving = false
        })
      }
    },

    loadLabel: async (labelId: string) => {
      try {
        set((draft) => {
          draft.isLoading = true
        })

        // Fetch label from database
        const { data, error } = await labels.getById(labelId)

        if (error || !data) {
          console.error('Error loading label:', error)
          toast.error('Failed to load label')
          return
        }

        // Deserialize canvas_data and populate store
        if (data.canvas_data) {
          const canvasState = data.canvas_data as CanvasState

          set((draft) => {
            // Set canvas state
            Object.assign(draft, canvasState)
            // Set label metadata
            draft.currentLabelId = data.id
            draft.currentLabelName = data.name
            // Clear selection and history
            draft.selectedIds = []
            draft.history = { past: [], future: [] }
          })

          toast.success(`Loaded "${data.name}"`)
        } else {
          toast.error('Label has no canvas data')
        }
      } catch (error) {
        console.error('Error loading label:', error)
        toast.error('Failed to load label')
      } finally {
        set((draft) => {
          draft.isLoading = false
        })
      }
    },

    createNewLabel: () => {
      set((draft) => {
        // Reset canvas to initial state
        Object.assign(draft, initialCanvasState)
        // Reset metadata
        draft.currentLabelId = null
        draft.currentLabelName = 'Untitled Label'
        // Clear history
        draft.history = { past: [], future: [] }
      })
      toast.success('Created new label')
    },
  }))
)
