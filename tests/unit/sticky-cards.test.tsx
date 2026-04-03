import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StickyCards } from '@/components/pillars/sticky-cards'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      'tournaments.heading': 'Compete. Win.\nRepeat.',
      'tournaments.body': 'Tournament description',
      'tournaments.cta': 'View Tournaments',
      'trips.heading': 'Fish. Feast.\nRepeat.',
      'trips.body': 'Trips description',
      'trips.cta': 'Explore Trips',
      'festival.heading': 'The Biggest Fishing Festival',
      'festival.body': 'Festival description',
      'festival.cta': 'Festival Details',
    }
    return map[key] || key
  },
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

vi.mock('gsap', () => ({
  default: { registerPlugin: vi.fn(), to: vi.fn() },
}))
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { create: vi.fn() },
}))
vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((cb) => cb()),
}))

describe('StickyCards', () => {
  it('renders three pillar sections', () => {
    const { container } = render(<StickyCards />)
    const pillars = container.querySelectorAll('.pillar')
    expect(pillars.length).toBe(3)
  })

  it('renders CTA links', () => {
    render(<StickyCards />)
    expect(screen.getByText('View Tournaments')).toBeInTheDocument()
    expect(screen.getByText('Explore Trips')).toBeInTheDocument()
    expect(screen.getByText('Festival Details')).toBeInTheDocument()
  })

  it('renders progress dots', () => {
    const { container } = render(<StickyCards />)
    const dots = container.querySelectorAll('.pillar-dot')
    expect(dots.length).toBe(3)
  })
})
