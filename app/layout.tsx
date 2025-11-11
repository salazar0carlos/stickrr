import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stickrr - Mobile Label Maker',
  description: 'Create and print custom labels for seed packets, mason jars, freezer containers, and more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
