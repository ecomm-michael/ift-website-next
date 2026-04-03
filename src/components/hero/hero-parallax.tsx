'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { basePath } from '@/lib/base-path'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const MOBILE_BREAKPOINT = 900
const TOTAL_FRAMES = 120
const MOBILE_FRAME_COUNT = 40
const MOBILE_FRAME_STEP = 3

export function HeroParallax() {
  const t = useTranslations('hero')
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(-1)
  const rafPendingRef = useRef(false)
  const [fallbackVisible, setFallbackVisible] = useState(true)

  // Draw a single frame to the canvas with cover-fit
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = framesRef.current[idx]
    if (!img || !img.complete || !img.naturalWidth) return

    const ir = img.naturalWidth / img.naturalHeight
    const cr = canvas.width / canvas.height
    let dw: number, dh: number, dx: number, dy: number

    if (ir > cr) {
      dh = canvas.height
      dw = dh * ir
      const focalX = window.innerWidth <= MOBILE_BREAKPOINT ? 0.55 : 0.5
      dx = (canvas.width - dw) * focalX
      dy = 0
    } else {
      dw = canvas.width
      dh = dw / ir
      dx = 0
      dy = (canvas.height - dh) / 2
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, dx, dy, dw, dh)
    currentFrameRef.current = idx
  }, [])

  // Size canvas to viewport and redraw current frame
  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    if (currentFrameRef.current >= 0) {
      drawFrame(currentFrameRef.current)
    }
  }, [drawFrame])

  // Preload frames on mount
  useEffect(() => {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT
    const frameCount = isMobile ? MOBILE_FRAME_COUNT : TOTAL_FRAMES
    const frameStep = isMobile ? MOBILE_FRAME_STEP : 1

    // Size canvas initially
    sizeCanvas()

    // Fix 2: assign ref array before the loop so onload callbacks on cached
    // images can access framesRef.current immediately when they fire.
    framesRef.current = []
    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      img.onload = () => {
        if (i === 0 && currentFrameRef.current < 0) {
          drawFrame(0)
          setFallbackVisible(false)
        }
      }
      framesRef.current[i] = img
      const frameNumber = String(i * frameStep + 1).padStart(3, '0')
      img.src = `${basePath}/hero/frames/frame-${frameNumber}.jpg`
    }

    // Fix 3: safety net — if frame 0's onload fired before the ref was ready,
    // this catches it and draws the first frame after a short delay.
    const fallbackTimer = setTimeout(() => {
      if (currentFrameRef.current < 0 && framesRef.current[0]?.complete) {
        drawFrame(0)
        setFallbackVisible(false)
      }
    }, 500)

    // Handle resize
    window.addEventListener('resize', sizeCanvas)
    return () => {
      window.removeEventListener('resize', sizeCanvas)
      clearTimeout(fallbackTimer)
    }
  }, [drawFrame, sizeCanvas])

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT
      const frameCount = isMobile ? MOBILE_FRAME_COUNT : TOTAL_FRAMES

      // Pin hero and scrub frames on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top top+=64',
        end: 'bottom top',
        pin: '.hero-sticky',
        scrub: 1.2,
        onUpdate: (self) => {
          // Update progress bar
          if (progressRef.current) {
            progressRef.current.style.height = `${self.progress * 100}%`
          }
          // Scrub to target frame — gated behind rAF so we only draw once per frame
          const targetFrame = Math.min(
            frameCount - 1,
            Math.floor(self.progress * frameCount)
          )
          if (targetFrame !== currentFrameRef.current && !rafPendingRef.current) {
            rafPendingRef.current = true
            requestAnimationFrame(() => {
              drawFrame(targetFrame)
              rafPendingRef.current = false
            })
          }
        },
      })

      // Hero content: slowly zoom and fade
      gsap.to('.hero-content', {
        scale: 1.15,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: section, start: '20% top+=64', end: '60% top+=64', scrub: true },
      })

      // Marlin SVG: rises from bottom-right
      gsap.fromTo(
        '#heroMarlin',
        { opacity: 0, y: 100, x: 50 },
        {
          opacity: 0.2, y: -40, x: 0, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top top+=64', end: '60% top+=64', scrub: true },
        }
      )
      gsap.to('#heroMarlin', {
        opacity: 0, y: -120, ease: 'none',
        scrollTrigger: { trigger: section, start: '60% top+=64', end: '85% top+=64', scrub: true },
      })

      // Scroll indicator/arrow fade out
      gsap.to('.scroll-indicator, .scroll-arrow', {
        opacity: 0, ease: 'none',
        scrollTrigger: { trigger: section, start: '10% top+=64', end: '25% top+=64', scrub: true },
      })

      // Refresh after fonts load so layout-dependent triggers are accurate
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    },
    { scope: sectionRef }
  )

  return (
    <section className="hero-section relative h-[400vh]" ref={sectionRef}>
      <div className="hero-sticky w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center bg-navy">
        {/* Fallback gradient shown until first frame loads */}
        {fallbackVisible && (
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                'linear-gradient(175deg, #F5C962 0%, var(--gold) 8%, #3dc4c9 22%, var(--turquoise) 32%, var(--teal) 50%, #0B5575 70%, var(--navy) 100%)',
            }}
          />
        )}

        {/* Canvas for frame-scrubbing hero — z-[2] so it paints above the fallback */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-[2]"
        />

        {/* Dark overlay on top of canvas so text reads cleanly */}
        <div
          className="absolute inset-0 z-[4]"
          style={{
            background:
              'linear-gradient(to top, rgba(11,45,69,0.55) 0%, rgba(11,45,69,0.15) 40%, transparent 70%)',
          }}
        />

        {/* Progress bar */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[3px] h-[120px] bg-white/15 rounded-sm z-20 overflow-hidden">
          <div
            ref={progressRef}
            className="w-full h-0 bg-gold rounded-sm"
            style={{ transition: 'height 0.1s linear' }}
          />
        </div>

        {/* Hero content */}
        <div className="hero-content relative z-10 text-center text-white px-8">
          <div className="font-[family-name:var(--font-barlow)] font-semibold text-[11px] tracking-[5px] text-gold mb-6 uppercase">
            {t('label')}
          </div>
          <h1
            className="font-[family-name:var(--font-barlow-condensed)] font-black text-[96px] leading-[0.95] tracking-tight uppercase mb-6 max-md:text-[56px]"
            style={{ textShadow: '0 4px 40px rgba(11,45,69,0.3)' }}
          >
            <span className="hero-line block overflow-hidden">
              <span className="hero-line-inner block animate-[slideFromLeft_0.9s_cubic-bezier(0.16,1,0.3,1)_0.3s_both]">
                {t('line1')}
              </span>
            </span>
            <span className="hero-line block overflow-hidden">
              <span className="hero-line-inner block animate-[slideFromRight_0.9s_cubic-bezier(0.16,1,0.3,1)_0.6s_both]">
                {t('line2')}
              </span>
            </span>
          </h1>
          <p className="font-[family-name:var(--font-barlow)] font-normal text-lg text-white/70 mb-10 max-w-[560px] mx-auto leading-relaxed animate-[fadeUp_0.8s_ease_0.9s_both]">
            {t('sub')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-[fadeUp_0.8s_ease_1.2s_both]">
            <Link
              href="/tournaments"
              className="inline-block font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[1.5px] uppercase no-underline py-3.5 px-8 rounded bg-teal text-white border-2 border-teal transition-all duration-300 hover:bg-[#007a91] hover:border-[#007a91]"
            >
              {t('cta1')}
            </Link>
            <Link
              href="/trips"
              className="inline-block font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[1.5px] uppercase no-underline py-3.5 px-8 rounded bg-transparent text-white border-2 border-white/60 transition-all duration-300 hover:bg-white/15 hover:border-white"
            >
              {t('cta2')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-[60px] left-10 z-20 flex items-end gap-3">
          <div
            className="w-px h-[60px]"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5))',
            }}
          />
          <span
            className="font-[family-name:var(--font-barlow)] font-semibold text-[9px] tracking-[3px] text-white/45 uppercase"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {t('scroll')}
          </span>
        </div>
        <div className="scroll-arrow absolute bottom-[50px] right-[50px] z-20 animate-[bounceArrow_2s_ease-in-out_infinite]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-45"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Blue Marlin SVG */}
        <svg
          id="heroMarlin"
          className="absolute z-[5] opacity-0 w-[380px] h-auto -bottom-[100px] -right-[5%] -rotate-[15deg]"
          viewBox="0 0 400 220"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10,140 Q20,135 35,120 Q50,100 60,95 Q55,85 50,70 Q48,60 55,55 Q65,65 70,80 Q75,70 85,60 Q95,50 110,45 Q105,35 100,20 Q98,12 105,10 Q112,18 115,30 Q120,45 125,50 Q140,38 160,30 Q180,22 200,20 Q230,17 260,25 Q290,33 310,50 Q330,67 345,90 Q355,105 360,115 L395,108 Q385,115 365,120 Q358,128 348,135 Q330,148 305,155 Q280,160 255,160 Q230,158 210,150 Q195,155 175,162 Q155,168 140,168 Q120,167 105,160 Q90,165 72,170 Q55,175 45,172 Q50,165 60,160 Q45,162 30,160 Q15,157 10,150 Z" />
          <circle cx="280" cy="60" r="5" fill="rgba(11,45,69,0.15)" />
        </svg>
      </div>
    </section>
  )
}
