# CLAUDE.md — IFT Next.js Beta Site

## What This Is

This is the **BETA** version of the International Fishing Team (IFT) website. Production is the HTML/GSAP version at iftpr.com.

**Do not deploy this site without explicit user approval.**

## Project Context

- **Orchestrator repo:** `G:/My Drive/AA_mpratt/Agents - Agentic Workflow/IFT/`
- **Production HTML site:** `D:/ift-website-html/` (full mirror of iftpr.com — 142 files: HTML pages, shared.css, _includes.js, hero frames, images)
- **This project:** `D:/ift-website-next/` (Next.js 16 + TinaCMS beta)
- **Brand assets (source of truth):** `G:/My Drive/AA_mpratt/Agents - Agentic Workflow/IFT/assets/`

## Tech Stack

- Next.js 16 App Router
- TinaCMS (Git-backed, self-hosted/local mode)
- GSAP 3.12 with @gsap/react (useGSAP hook)
- Tailwind CSS 4 + shadcn/ui
- next-intl for EN/ES bilingual routing (/en/, /es/)
- TypeScript
- Vitest (unit tests), Playwright (E2E)

## Development Commands

```bash
npm run dev          # Next.js dev server
npm run tina:dev     # Next.js + TinaCMS dev (starts both)
npm run build        # Production build
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
```

## Brand System (never hardcode hex)

Use CSS custom properties or Tailwind tokens:
- `--navy` / `text-navy` / `bg-navy` — #0B2D45
- `--teal` / `text-teal` / `bg-teal` — #0099B5
- `--turquoise` — #00C4CC
- `--gold` / `text-gold` — #F5A623
- `--coral` — #E84E3A
- `--seafoam` / `bg-seafoam` — #EDF7F9
- `--sandy` / `bg-sandy` — #F9F4E8

## Typography

- Display/Hero: `font-[family-name:var(--font-barlow-condensed)]` weight 800-900
- Headings: `font-[family-name:var(--font-barlow-condensed)]` weight 700
- Body: `font-[family-name:var(--font-barlow)]` weight 400-500

## GSAP Animation Pattern

All GSAP animations use the `useGSAP` hook from `@gsap/react`:
```tsx
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export function MyComponent() {
  const ref = useRef(null)
  useGSAP(() => {
    gsap.to('.target', { /* ... */ scrollTrigger: { /* ... */ } })
  }, { scope: ref })
  return <div ref={ref}>...</div>
}
```

## Key Files

| File | Purpose |
|---|---|
| `src/app/[locale]/page.tsx` | Home page (assembles all components) |
| `src/components/hero/hero-parallax.tsx` | Cinematic hero with scroll-locked parallax |
| `src/components/odometer/odometer-counter.tsx` | Animated stat counters |
| `src/components/marquee/kinetic-marquee.tsx` | Infinite scroll marquee |
| `src/components/pillars/sticky-cards.tsx` | 3 sticky pillar sections |
| `src/components/scroll-reveal/scroll-reveal.tsx` | IntersectionObserver reveal wrapper |
| `tina/config.ts` | TinaCMS schema definitions |
| `messages/en.json` / `messages/es.json` | Bilingual content strings |

## Rules

- Never hardcode hex colors — use CSS custom properties or Tailwind tokens
- Never fabricate business facts — read assets/ from the orchestrator repo
- Always use "International Fishing Team" — never "Island Fishing Team"
- All content must exist in both EN and ES
- TinaCMS runs in local mode (no cloud token needed)
