import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/footer/footer'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      tagline: 'International Fishing Team\nPuerto Rico\'s Premier Sport Fishing Experience',
      navigate: 'Navigate',
      legal: 'Legal',
      contact: 'Contact',
      copyright: '2026 International Fishing Team',
    }
    return map[key] || key
  },
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('Footer', () => {
  it('renders the IFT logo', () => {
    render(<Footer />)
    expect(screen.getByText('IFT')).toBeInTheDocument()
  })

  it('renders section headings', () => {
    render(<Footer />)
    expect(screen.getByText('Navigate')).toBeInTheDocument()
    expect(screen.getByText('Legal')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
