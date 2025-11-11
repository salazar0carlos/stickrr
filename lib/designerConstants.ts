// Common label sizes in pixels (at 300 DPI)
// Format: width x height in inches -> pixels
export const LABEL_SIZES = {
  '2x1': { width: 600, height: 300, label: '2" × 1"' },
  '2.25x1.25': { width: 675, height: 375, label: '2.25" × 1.25"' },
  '3x2': { width: 900, height: 600, label: '3" × 2"' },
  '4x2': { width: 1200, height: 600, label: '4" × 2"' },
  '4x3': { width: 1200, height: 900, label: '4" × 3"' },
  '4x6': { width: 1200, height: 1800, label: '4" × 6"' },
  '5x3': { width: 1500, height: 900, label: '5" × 3"' },
  '6x4': { width: 1800, height: 1200, label: '6" × 4"' },
  'custom': { width: 800, height: 600, label: 'Custom' },
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
