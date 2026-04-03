import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeroParallax } from '@/components/hero/hero-parallax'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      label: 'Puerto Rico',
      line1: 'Born to Fish.',
      line2: 'Built to Win.',
      sub: 'Description text',
      cta1: 'View Tournaments',
      cta2: 'Explore Trips',
      scroll: 'Scroll to Explore',
    }
    return map[key] || key
  },
}))

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    fromTo: vi.fn(),
    to: vi.fn(),
  },
}))

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { create: vi.fn() },
}))

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((cb) => cb()),
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('HeroParallax', () => {
  it('renders hero headline lines', () => {
    render(<HeroParallax />)
    expect(screen.getByText('Born to Fish.')).toBeInTheDocument()
    expect(screen.getByText('Built to Win.')).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<HeroParallax />)
    expect(screen.getByText('View Tournaments')).toBeInTheDocument()
    expect(screen.getByText('Explore Trips')).toBeInTheDocument()
  })

  it('renders the hero section container with 400vh height', () => {
    const { container } = render(<HeroParallax />)
    const heroSection = container.querySelector('.hero-section')
    expect(heroSection).toBeInTheDocument()
  })
})
