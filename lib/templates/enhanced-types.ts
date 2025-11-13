import { DesignerElement } from '@/types/designer'
import { LabelSizeKey } from '@/lib/designerConstants'

// Extended template types with locked/editable properties
export interface TemplateMetadata {
  id: string
  name: string
  description: string
  category: 'mason-jar' | 'spice-jar' | 'freezer' | 'pantry' | 'school' | 'storage'
  size: LabelSizeKey
  thumbnail?: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  lockedElementIds: string[] // IDs of elements that should stay locked
  editableElementIds: string[] // IDs of text elements users should edit
}

export interface Template {
  metadata: TemplateMetadata
  elements: DesignerElement[]
  backgroundColor: string
}

export interface TemplateCategory {
  id: string
  name: string
  description: string
  icon: string
  templates: Template[]
}

// Helper function to generate unique IDs
export const generateId = (() => {
  let counter = 0
  return (prefix: string = 'elem') => `${prefix}-${Date.now()}-${++counter}`
})()

// Helper to mark elements as locked decorative elements
export const createLockedElement = <T extends DesignerElement>(
  element: T,
  id?: string
): T => ({
  ...element,
  id: id || generateId('locked'),
  locked: true,
  visible: true,
  opacity: 1,
})

// Helper to mark elements as editable text fields
export const createEditableElement = <T extends DesignerElement>(
  element: T,
  id?: string
): T => ({
  ...element,
  id: id || generateId('editable'),
  locked: false,
  visible: true,
  opacity: 1,
})
