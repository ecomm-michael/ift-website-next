import { describe, it, expect } from 'vitest'
import { routing } from '@/i18n/routing'

describe('i18n routing config', () => {
  it('supports en and es locales', () => {
    expect(routing.locales).toContain('en')
    expect(routing.locales).toContain('es')
  })

  it('defaults to en', () => {
    expect(routing.defaultLocale).toBe('en')
  })
})
