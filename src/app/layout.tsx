import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import '@/styles/globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "International Fishing Team — Puerto Rico's Premier Sport Fishing Experience",
  description:
    "Tournaments, Trips & Festivals. Puerto Rico's Premier Sport Fishing Experience.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body className="font-[family-name:var(--font-barlow)]">
        {children}
      </body>
    </html>
  )
}
