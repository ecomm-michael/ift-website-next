import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { KineticMarquee } from '@/components/marquee/kinetic-marquee'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    if (key === 'items') {
      return ['TOURNAMENTS', 'TRIPS', 'FESTIVAL']
    }
    return key
  },
}))

vi.mock('gsap', () => ({
  default: { registerPlugin: vi.fn() },
}))
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { create: vi.fn(() => ({ kill: vi.fn() })) },
}))

describe('KineticMarquee', () => {
  it('renders with the marquee-section class', () => {
    const { container } = render(<KineticMarquee />)
    expect(container.querySelector('.marquee-section')).toBeInTheDocument()
  })

  it('renders marquee items', () => {
    const { container } = render(<KineticMarquee />)
    const items = container.querySelectorAll('.marquee-item')
    expect(items.length).toBeGreaterThanOrEqual(3)
  })
})
