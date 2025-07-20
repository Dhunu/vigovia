import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vigovia Itinerary Builder',
  description: 'Create beautiful travel itineraries with Vigovia - Plan, Pack, Go!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
