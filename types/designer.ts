// Base element type that all designer elements extend
export interface BaseElement {
  id: string
  type: 'text' | 'shape' | 'image' | 'icon'
  x: number
  y: number
  width: number
  height: number
  rotation: number
  zIndex: number
  locked: boolean
  visible: boolean
  opacity: number
}

// Text element with typography options
export interface TextElement extends BaseElement {
  type: 'text'
  content: string
  fontSize: number
  fontFamily: string
  fontWeight: number
  color: string
  textAlign: 'left' | 'center' | 'right'
  lineHeight: number
  letterSpacing: number
  textDecoration?: 'none' | 'underline' | 'line-through'
  fontStyle?: 'normal' | 'italic'
}

// Shape element (rectangles, circles, etc.)
export interface ShapeElement extends BaseElement {
  type: 'shape'
  shapeType: 'rectangle' | 'circle' | 'line' | 'polygon'
  fill: string
  stroke: string
  strokeWidth: number
  cornerRadius?: number
  points?: number[] // For polygons and lines
}

// Image element
export interface ImageElement extends BaseElement {
  type: 'image'
  src: string
  originalWidth: number
  originalHeight: number
  cropX?: number
  cropY?: number
  cropWidth?: number
  cropHeight?: number
}

// Icon element
export interface IconElement extends BaseElement {
  type: 'icon'
  iconName: string
  color: string
}

// Union type for all elements
export type DesignerElement = TextElement | ShapeElement | ImageElement | IconElement

// Canvas state
export interface CanvasState {
  elements: DesignerElement[]
  selectedIds: string[]
  zoom: number
  pan: { x: number; y: number }
  canvasWidth: number
  canvasHeight: number
  backgroundColor: string
  gridVisible: boolean
  gridSize: number
  snapToGrid: boolean
}

// History state for undo/redo
export interface HistoryState {
  past: CanvasState[]
  present: CanvasState
  future: CanvasState[]
}

// Designer store actions
export interface DesignerActions {
  // Element operations
  addElement: (element: DesignerElement) => void
  updateElement: (id: string, changes: Partial<DesignerElement>) => void
  deleteElements: (ids: string[]) => void
  duplicateElements: (ids: string[]) => void

  // Selection operations
  selectElements: (ids: string[]) => void
  selectElement: (id: string, addToSelection?: boolean) => void
  clearSelection: () => void

  // Layer operations
  moveToFront: (ids: string[]) => void
  moveToBack: (ids: string[]) => void
  moveForward: (ids: string[]) => void
  moveBackward: (ids: string[]) => void

  // Canvas operations
  setZoom: (zoom: number) => void
  setPan: (pan: { x: number; y: number }) => void
  setBackgroundColor: (color: string) => void
  setCanvasSize: (width: number, height: number) => void
  toggleGrid: () => void
  setSnapToGrid: (snap: boolean) => void

  // Alignment operations
  alignLeft: (ids: string[]) => void
  alignCenter: (ids: string[]) => void
  alignRight: (ids: string[]) => void
  alignTop: (ids: string[]) => void
  alignMiddle: (ids: string[]) => void
  alignBottom: (ids: string[]) => void

  // History operations
  undo: () => void
  redo: () => void

  // Utility
  reset: () => void
}
