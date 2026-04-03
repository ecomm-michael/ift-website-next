'use client'

import { useRef, type ReactNode } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface InteriorHeroProps {
  /** Background image src */
  imageSrc?: string
  imageAlt?: string
  /** Gradient background (used when no image) */
  gradient?: string
  /** Gradient animation duration in seconds (0 = no animation) */
  gradientCycleDuration?: number
  /** Overlay color — defaults to navy/60 */
  overlayClass?: string
  /** Min height */
  minHeight?: string
  /** Content entrance direction — 'up' (default) or 'left' */
  entranceDirection?: 'up' | 'left'
  children: ReactNode
}

export function InteriorHero({
  imageSrc,
  imageAlt = '',
  gradient,
  gradientCycleDuration = 0,
  overlayClass = 'bg-navy/60',
  minHeight = '480px',
  entranceDirection = 'up',
  children,
}: InteriorHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      // Hero image parallax — scroll at 25% rate
      if (imageSrc && imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Hero content stagger entrance
      const contentEls = contentRef.current?.children
      if (contentEls && contentEls.length > 0) {
        const fromVars =
          entranceDirection === 'left'
            ? { x: -60, opacity: 0 }
            : { y: 40, opacity: 0 }

        gsap.from(contentEls, {
          ...fromVars,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.2,
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative flex items-end overflow-hidden"
      style={{ minHeight }}
    >
      {/* Background image with parallax container */}
      {imageSrc && (
        <div
          ref={imageRef}
          className="absolute inset-0"
          style={{ willChange: 'transform' }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Gradient background with optional animation */}
      {gradient && (
        <div
          className="absolute inset-0"
          style={{
            background: gradient,
            backgroundSize: gradientCycleDuration > 0 ? '200% 200%' : undefined,
            animation:
              gradientCycleDuration > 0
                ? `interior-hero-shift ${gradientCycleDuration}s ease infinite`
                : undefined,
          }}
        />
      )}

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClass}`} />

      {/* Content — children are staggered in */}
      <div className="container relative z-10 pb-16 pt-32" ref={contentRef}>
        {children}
      </div>
    </section>
  )
}
