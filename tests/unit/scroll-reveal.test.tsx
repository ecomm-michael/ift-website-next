import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ScrollReveal } from '@/components/scroll-reveal/scroll-reveal'

const mockObserve = vi.fn()
const mockUnobserve = vi.fn()

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  observe: mockObserve,
  unobserve: mockUnobserve,
  disconnect: vi.fn(),
})))

describe('ScrollReveal', () => {
  it('renders children', () => {
    const { getByText } = render(
      <ScrollReveal><p>Test content</p></ScrollReveal>
    )
    expect(getByText('Test content')).toBeInTheDocument()
  })

  it('starts with reveal class (hidden)', () => {
    const { container } = render(
      <ScrollReveal><p>Content</p></ScrollReveal>
    )
    expect(container.firstChild).toHaveClass('reveal')
  })

  it('observes the element', () => {
    render(<ScrollReveal><p>Content</p></ScrollReveal>)
    expect(mockObserve).toHaveBeenCalled()
  })
})
