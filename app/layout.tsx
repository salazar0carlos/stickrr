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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Open+Sans:wght@300;400;600;700&family=Lato:wght@300;400;700&family=Montserrat:wght@300;400;600;700&family=Poppins:wght@300;400;600;700&family=Oswald:wght@300;400;600;700&family=Raleway:wght@300;400;600;700&family=PT+Sans:wght@400;700&family=Nunito:wght@300;400;600;700&family=Ubuntu:wght@300;400;500;700&family=Quicksand:wght@300;400;600;700&family=Work+Sans:wght@300;400;600;700&family=Rubik:wght@300;400;600;700&family=Karla:wght@300;400;600;700&family=Mulish:wght@300;400;600;700&family=Barlow:wght@300;400;600;700&family=Bebas+Neue&family=Archivo:wght@300;400;600;700&family=Hind:wght@300;400;600;700&family=Outfit:wght@300;400;600;700&family=Merriweather:wght@300;400;700&family=Playfair+Display:wght@400;700&family=Lora:wght@400;700&family=PT+Serif:wght@400;700&family=Crimson+Text:wght@400;700&family=EB+Garamond:wght@400;700&family=Cormorant:wght@300;400;700&family=Libre+Baskerville:wght@400;700&family=Bitter:wght@300;400;700&family=Spectral:wght@300;400;700&family=Lobster&family=Righteous&family=Pacifico&family=Permanent+Marker&family=Dancing+Script:wght@400;700&family=Indie+Flower&family=Abril+Fatface&family=Fredoka:wght@300;400;600;700&family=Caveat:wght@400;700&family=Satisfy&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
