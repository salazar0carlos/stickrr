// Common label sizes in pixels (at 300 DPI)
// Format: width x height in inches -> pixels
// Named for common use cases
export const LABEL_SIZES = {
  '2x1': { width: 600, height: 300, label: 'Small Label (2" × 1") - Spice jars' },
  '2.25x1.25': { width: 675, height: 375, label: 'Standard Label (2.25" × 1.25") - Mason jars' },
  '3x2': { width: 900, height: 600, label: 'Medium Label (3" × 2") - Storage containers' },
  '4x2': { width: 1200, height: 600, label: 'Wide Label (4" × 2") - Freezer bags' },
  '4x3': { width: 1200, height: 900, label: 'Large Label (4" × 3") - Big jars' },
  '4x6': { width: 1200, height: 1800, label: 'Tall Label (4" × 6") - Bottles' },
} as const

export type LabelSizeKey = keyof typeof LABEL_SIZES

export const FONT_FAMILIES = [
  // System Fonts
  'Inter',
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Courier New',
  'Verdana',
  'Trebuchet MS',
  'Impact',
  'Comic Sans MS',
  'Palatino',
  'Garamond',
  'Bookman',
  'Avant Garde',
  // Google Fonts - Sans Serif
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Oswald',
  'Raleway',
  'PT Sans',
  'Nunito',
  'Ubuntu',
  'Quicksand',
  'Work Sans',
  'Rubik',
  'Karla',
  'Mulish',
  'Barlow',
  'Bebas Neue',
  'Archivo',
  'Hind',
  'Outfit',
  // Google Fonts - Serif
  'Merriweather',
  'Playfair Display',
  'Lora',
  'PT Serif',
  'Crimson Text',
  'EB Garamond',
  'Cormorant',
  'Libre Baskerville',
  'Bitter',
  'Spectral',
  // Google Fonts - Display
  'Lobster',
  'Righteous',
  'Pacifico',
  'Permanent Marker',
  'Dancing Script',
  'Indie Flower',
  'Abril Fatface',
  'Fredoka',
  'Caveat',
  'Satisfy',
] as const

export const ZOOM_PRESETS = [
  { value: 0.25, label: '25%' },
  { value: 0.5, label: '50%' },
  { value: 0.75, label: '75%' },
  { value: 1, label: '100%' },
  { value: 1.25, label: '125%' },
  { value: 1.5, label: '150%' },
  { value: 2, label: '200%' },
  { value: 3, label: '300%' },
] as const

export const FONT_SIZE_PRESETS = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72, 96] as const
