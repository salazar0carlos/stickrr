import { TemplateCategory } from './enhanced-types'
import { masonJarTemplates } from './mason-jar'
import { spiceJarTemplates } from './spice-jar'
import { freezerTemplates } from './freezer'
import { pantryTemplates } from './pantry'
import { schoolTemplates } from './school'
import { storageTemplates } from './storage'

// Export all template arrays
export { masonJarTemplates } from './mason-jar'
export { spiceJarTemplates } from './spice-jar'
export { freezerTemplates } from './freezer'
export { pantryTemplates } from './pantry'
export { schoolTemplates } from './school'
export { storageTemplates } from './storage'

// Export types
export type { Template, TemplateMetadata, TemplateCategory } from './enhanced-types'

// Template categories with metadata
export const templateCategories: TemplateCategory[] = [
  {
    id: 'mason-jar',
    name: 'Mason Jar Labels',
    description: 'Beautiful labels for mason jars, preserves, and canning',
    icon: '🫙',
    templates: masonJarTemplates,
  },
  {
    id: 'spice-jar',
    name: 'Spice Jar Labels',
    description: 'Compact labels perfect for spice jars and small containers',
    icon: '🌶️',
    templates: spiceJarTemplates,
  },
  {
    id: 'freezer',
    name: 'Freezer Labels',
    description: 'Organize your frozen foods with date and content tracking',
    icon: '❄️',
    templates: freezerTemplates,
  },
  {
    id: 'pantry',
    name: 'Pantry Labels',
    description: 'Keep your pantry organized with clear, readable labels',
    icon: '🥫',
    templates: pantryTemplates,
  },
  {
    id: 'school',
    name: 'School Labels',
    description: 'Colorful labels for school supplies, notebooks, and belongings',
    icon: '📚',
    templates: schoolTemplates,
  },
  {
    id: 'storage',
    name: 'Storage Labels',
    description: 'Professional labels for bins, boxes, and home organization',
    icon: '📦',
    templates: storageTemplates,
  },
]

// Get all templates as a flat array
export const allTemplates = [
  ...masonJarTemplates,
  ...spiceJarTemplates,
  ...freezerTemplates,
  ...pantryTemplates,
  ...schoolTemplates,
  ...storageTemplates,
]

// Utility functions for working with templates

/**
 * Get a template by its ID
 */
export function getTemplateById(id: string) {
  return allTemplates.find(template => template.metadata.id === id)
}

/**
 * Get all templates for a specific category
 */
export function getTemplatesByCategory(categoryId: string) {
  return allTemplates.filter(template => template.metadata.category === categoryId)
}

/**
 * Get templates by tag
 */
export function getTemplatesByTag(tag: string) {
  return allTemplates.filter(template =>
    template.metadata.tags.includes(tag.toLowerCase())
  )
}

/**
 * Get templates by difficulty level
 */
export function getTemplatesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced') {
  return allTemplates.filter(template => template.metadata.difficulty === difficulty)
}

/**
 * Get templates by size
 */
export function getTemplatesBySize(size: string) {
  return allTemplates.filter(template => template.metadata.size === size)
}

/**
 * Search templates by name or description
 */
export function searchTemplates(query: string) {
  const lowerQuery = query.toLowerCase()
  return allTemplates.filter(template =>
    template.metadata.name.toLowerCase().includes(lowerQuery) ||
    template.metadata.description.toLowerCase().includes(lowerQuery) ||
    template.metadata.tags.some(tag => tag.includes(lowerQuery))
  )
}

/**
 * Get category by ID
 */
export function getCategoryById(id: string) {
  return templateCategories.find(category => category.id === id)
}

/**
 * Get template statistics
 */
export function getTemplateStats() {
  return {
    totalTemplates: allTemplates.length,
    totalCategories: templateCategories.length,
    templatesByCategory: templateCategories.map(category => ({
      categoryId: category.id,
      categoryName: category.name,
      count: category.templates.length,
    })),
    templatesBySize: Object.entries(
      allTemplates.reduce((acc, template) => {
        acc[template.metadata.size] = (acc[template.metadata.size] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    ).map(([size, count]) => ({ size, count })),
    templatesByDifficulty: {
      beginner: allTemplates.filter(t => t.metadata.difficulty === 'beginner').length,
      intermediate: allTemplates.filter(t => t.metadata.difficulty === 'intermediate').length,
      advanced: allTemplates.filter(t => t.metadata.difficulty === 'advanced').length,
    },
  }
}

/**
 * Get featured templates (one from each category)
 */
export function getFeaturedTemplates() {
  return templateCategories.map(category => category.templates[0])
}

/**
 * Get random template
 */
export function getRandomTemplate() {
  return allTemplates[Math.floor(Math.random() * allTemplates.length)]
}

/**
 * Get random template from a specific category
 */
export function getRandomTemplateFromCategory(categoryId: string) {
  const categoryTemplates = getTemplatesByCategory(categoryId)
  if (categoryTemplates.length === 0) return undefined
  return categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)]
}
