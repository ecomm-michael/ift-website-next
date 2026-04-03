'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxImageProps {
  src: string
  alt: string
  /** Parallax yPercent — negative = float up, positive = float down */
  yPercent?: number
  /** Scrub smoothness */
  scrub?: number | boolean
  /** Container height class */
  heightClass?: string
  /** Extra container classes */
  className?: string
  /** Whether to also do an entrance animation */
  entrance?: boolean
}

export function ParallaxImage({
  src,
  alt,
  yPercent = -8,
  scrub = 1,
  heightClass = 'h-[480px]',
  className = '',
  entrance = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const container = containerRef.current
      const image = imageRef.current
      if (!container || !image) return

      // Entrance animation
      if (entrance) {
        gsap.from(container, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        })
      }

      // Parallax scroll
      gsap.to(image, {
        yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className={`w-full ${heightClass} rounded-xl relative overflow-hidden ${className}`}
    >
      <div
        ref={imageRef}
        className="absolute inset-[-15%] w-[130%] h-[130%]"
        style={{ willChange: 'transform' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  )
}
