import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/hero/hero-parallax', () => ({
  HeroParallax: () => <div data-testid="hero-parallax" />,
}))
vi.mock('@/components/odometer/odometer-counter', () => ({
  OdometerStats: () => <div data-testid="odometer-stats" />,
}))
vi.mock('@/components/marquee/kinetic-marquee', () => ({
  KineticMarquee: () => <div data-testid="kinetic-marquee" />,
}))
vi.mock('@/components/pillars/sticky-cards', () => ({
  StickyCards: () => <div data-testid="sticky-cards" />,
}))
vi.mock('@/components/scroll-reveal/scroll-reveal', () => ({
  ScrollReveal: ({ children }: { children: React.ReactNode }) => <div data-testid="scroll-reveal">{children}</div>,
}))
vi.mock('@/components/email-capture/email-capture', () => ({
  EmailCapture: () => <div data-testid="email-capture" />,
}))
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      eyebrow: 'Est. Puerto Rico',
      heading: 'The Premier Sport Fishing Experience',
      body: 'Description text',
    }
    return map[key] || key
  },
}))

import { render, screen } from '@testing-library/react'
import HomePage from '@/app/[locale]/page'

describe('HomePage', () => {
  it('renders the hero parallax section', () => {
    render(<HomePage />)
    expect(screen.getByTestId('hero-parallax')).toBeInTheDocument()
  })

  it('renders the odometer stats', () => {
    render(<HomePage />)
    expect(screen.getByTestId('odometer-stats')).toBeInTheDocument()
  })

  it('renders the kinetic marquee', () => {
    render(<HomePage />)
    expect(screen.getByTestId('kinetic-marquee')).toBeInTheDocument()
  })

  it('renders the sticky cards', () => {
    render(<HomePage />)
    expect(screen.getByTestId('sticky-cards')).toBeInTheDocument()
  })
})
