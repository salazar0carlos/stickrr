import jsPDF from 'jspdf'
import type { LabelData, LabelSize, PrintOptions } from '@/types'
import { labelSizes } from './printer-profiles'

export async function generateLabelPDF(
  labelData: LabelData,
  labelSize: LabelSize,
  options: PrintOptions
): Promise<jsPDF> {
  const { printerProfile, layout, copies } = options
  const { width, height } = labelSizes[labelSize]

  // Convert inches to points (1 inch = 72 points)
  const widthPt = width * 72
  const heightPt = height * 72

  // Create PDF with label dimensions
  const pdf = new jsPDF({
    orientation: width > height ? 'landscape' : 'portrait',
    unit: 'pt',
    format: [widthPt, heightPt],
  })

  // Apply margins
  const marginTopPt = printerProfile.marginTop * 72
  const marginLeftPt = printerProfile.marginLeft * 72
  const marginRightPt = printerProfile.marginRight * 72
  const marginBottomPt = printerProfile.marginBottom * 72

  const contentWidth = widthPt - marginLeftPt - marginRightPt
  const contentHeight = heightPt - marginTopPt - marginBottomPt

  // Helper to render a single label
  const renderLabel = (xOffset = 0, yOffset = 0) => {
    // Draw background
    if (labelData.backgroundColor) {
      pdf.setFillColor(labelData.backgroundColor)
      pdf.rect(
        marginLeftPt + xOffset,
        marginTopPt + yOffset,
        contentWidth,
        contentHeight,
        'F'
      )
    }

    // Draw text elements
    labelData.textElements.forEach((element) => {
      pdf.setFontSize(element.fontSize)
      pdf.setFont('helvetica', element.fontWeight === 'bold' ? 'bold' : 'normal')
      pdf.setTextColor(element.color)

      const xPos = marginLeftPt + (element.x / 100) * contentWidth + xOffset
      const yPos = marginTopPt + (element.y / 100) * contentHeight + yOffset

      const align = element.textAlign === 'center' ? 'center' : element.textAlign === 'right' ? 'right' : 'left'
      pdf.text(element.text, xPos, yPos, { align })
    })

    // Note: Icons would require converting lucide-react icons to SVG paths
    // For MVP, we'll note icon positions and names
    labelData.iconElements.forEach((element) => {
      pdf.setFontSize(8)
      pdf.setTextColor('#666666')
      const xPos = marginLeftPt + (element.x / 100) * contentWidth + xOffset
      const yPos = marginTopPt + (element.y / 100) * contentHeight + yOffset
      pdf.text(`[${element.iconName}]`, xPos, yPos)
    })
  }

  if (layout === 'single') {
    // Render single label, repeated for number of copies
    for (let i = 0; i < copies; i++) {
      if (i > 0) {
        pdf.addPage([widthPt, heightPt])
      }
      renderLabel()
    }
  } else if (layout === '6-up') {
    // 2x3 grid on letter size
    pdf.deletePage(1)
    pdf.addPage([612, 792]) // 8.5" x 11" in points

    const labelsPerPage = 6
    const cols = 2
    const rows = 3
    const spacing = 10

    for (let copy = 0; copy < copies; copy++) {
      for (let i = 0; i < labelsPerPage; i++) {
        if (i === 0 && copy === 0) {
          // First label on first page
        } else if (i === 0) {
          pdf.addPage([612, 792])
        }

        const col = i % cols
        const row = Math.floor(i / cols)
        const xOffset = col * (widthPt + spacing) + 36 // 0.5" margin
        const yOffset = row * (heightPt + spacing) + 36

        renderLabel(xOffset, yOffset)
      }
    }
  } else if (layout === '12-up') {
    // 3x4 grid on letter size
    pdf.deletePage(1)
    pdf.addPage([612, 792])

    const labelsPerPage = 12
    const cols = 3
    const rows = 4
    const spacing = 8

    for (let copy = 0; copy < copies; copy++) {
      for (let i = 0; i < labelsPerPage; i++) {
        if (i === 0 && copy === 0) {
          // First label on first page
        } else if (i === 0) {
          pdf.addPage([612, 792])
        }

        const col = i % cols
        const row = Math.floor(i / cols)
        const xOffset = col * (widthPt + spacing) + 36
        const yOffset = row * (heightPt + spacing) + 36

        renderLabel(xOffset, yOffset)
      }
    }
  }

  return pdf
}

export function downloadPDF(pdf: jsPDF, filename: string) {
  pdf.save(filename)
}

export function printPDF(pdf: jsPDF) {
  const blob = pdf.output('blob')
  const url = URL.createObjectURL(blob)
  const printWindow = window.open(url)
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print()
      URL.revokeObjectURL(url)
    }
  }
}
