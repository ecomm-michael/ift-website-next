import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Brand tokens', () => {
  const cssContent = fs.readFileSync(
    path.resolve(__dirname, '../../src/styles/globals.css'),
    'utf-8'
  )

  it('defines all brand color custom properties', () => {
    const requiredTokens = [
      '--navy', '--teal', '--turquoise', '--gold', '--coral', '--seafoam', '--sandy',
    ]
    requiredTokens.forEach((token) => {
      expect(cssContent).toContain(token)
    })
  })

  it('defines correct hex values', () => {
    expect(cssContent).toContain('#0B2D45')
    expect(cssContent).toContain('#0099B5')
    expect(cssContent).toContain('#00C4CC')
    expect(cssContent).toContain('#F5A623')
    expect(cssContent).toContain('#E84E3A')
    expect(cssContent).toContain('#EDF7F9')
    expect(cssContent).toContain('#F9F4E8')
  })
})
