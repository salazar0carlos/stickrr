import type { PrinterProfile } from '@/types'

export const printerProfiles: Record<string, PrinterProfile> = {
  dymo: {
    id: 'dymo',
    name: 'Dymo LabelWriter',
    dpi: 300,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    type: 'thermal',
  },
  brother: {
    id: 'brother',
    name: 'Brother QL Series',
    dpi: 180,
    marginTop: 0.05,
    marginRight: 0.05,
    marginBottom: 0.05,
    marginLeft: 0.05,
    type: 'thermal',
  },
  hp: {
    id: 'hp',
    name: 'HP Inkjet',
    dpi: 300,
    marginTop: 0.25,
    marginRight: 0.25,
    marginBottom: 0.25,
    marginLeft: 0.25,
    type: 'inkjet',
  },
  generic: {
    id: 'generic',
    name: 'Generic Thermal',
    dpi: 203,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    type: 'thermal',
  },
}

export const labelSizes = {
  '2.25x1.25': { width: 2.25, height: 1.25 },
  '2.25x4': { width: 2.25, height: 4 },
  '3.5x1.125': { width: 3.5, height: 1.125 },
}
