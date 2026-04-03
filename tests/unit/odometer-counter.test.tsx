import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OdometerStats } from '@/components/odometer/odometer-counter'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      prizePool: 'Annual Prize Pool',
      anglers: 'Registered Anglers',
      events: 'Annual Events',
    }
    return map[key] || key
  },
}))

vi.mock('gsap', () => ({
  default: { registerPlugin: vi.fn() },
}))
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { create: vi.fn() },
}))
vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((cb) => cb()),
}))

describe('OdometerStats', () => {
  it('renders all three stat labels', () => {
    render(<OdometerStats />)
    expect(screen.getByText('Annual Prize Pool')).toBeInTheDocument()
    expect(screen.getByText('Registered Anglers')).toBeInTheDocument()
    expect(screen.getByText('Annual Events')).toBeInTheDocument()
  })

  it('renders the correct number of stat items', () => {
    const { container } = render(<OdometerStats />)
    const statItems = container.querySelectorAll('.stat-item')
    expect(statItems.length).toBe(3)
  })
})
