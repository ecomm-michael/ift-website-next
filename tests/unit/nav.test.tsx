import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Nav } from '@/components/nav/nav'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      tournaments: 'Tournaments',
      trips: 'Trips',
      festival: 'Festival',
      sponsors: 'Sponsors',
      about: 'About',
      register: 'Register Now',
    }
    return map[key] || key
  },
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('Nav', () => {
  it('renders the IFT logo text', () => {
    render(<Nav />)
    expect(screen.getByText('IFT')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Nav />)
    expect(screen.getByText('Tournaments')).toBeInTheDocument()
    expect(screen.getByText('Trips')).toBeInTheDocument()
    expect(screen.getByText('Festival')).toBeInTheDocument()
  })

  it('renders register CTA', () => {
    render(<Nav />)
    expect(screen.getByText('Register Now')).toBeInTheDocument()
  })
})
