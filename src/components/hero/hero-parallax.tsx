'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export function HeroParallax() {
  const t = useTranslations('hero')
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      // Background layer: slow scale 1 -> 1.25
      gsap.fromTo(
        '.hero-layer-bg',
        { scale: 1 },
        {
          scale: 1.25,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      )

      // Mid layer: moderate parallax, scale 1 -> 1.5, y: 0 -> -80
      gsap.fromTo(
        '.hero-layer-mid',
        { scale: 1, y: 0 },
        {
          scale: 1.5,
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      )

      // Wave layers: shift down as you scroll (parallax)
      gsap.to('.hero-wave-1', {
        y: 60,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: true },
      })
      gsap.to('.hero-wave-2', {
        y: 40,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: true },
      })
      gsap.to('.hero-wave-3', {
        y: 20,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: true },
      })

      // Hero content: slowly zoom and fade
      gsap.to('.hero-content', {
        scale: 1.15,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: section, start: '20% top', end: '60% top', scrub: true },
      })

      // Progress bar fill
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.height = `${self.progress * 100}%`
          }
        },
      })

      // Marlin SVG: rises from bottom-right
      gsap.fromTo(
        '#heroMarlin',
        { opacity: 0, y: 100, x: 50 },
        {
          opacity: 0.2, y: -40, x: 0, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top top', end: '60% top', scrub: true },
        }
      )
      gsap.to('#heroMarlin', {
        opacity: 0, y: -120, ease: 'none',
        scrollTrigger: { trigger: section, start: '60% top', end: '85% top', scrub: true },
      })

      // Scroll indicator/arrow fade out
      gsap.to('.scroll-indicator, .scroll-arrow', {
        opacity: 0, ease: 'none',
        scrollTrigger: { trigger: section, start: '10% top', end: '25% top', scrub: true },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section className="hero-section relative h-[400vh]" ref={sectionRef}>
      <div className="hero-sticky sticky top-0 w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
        {/* Parallax layers */}
        <div
          className="hero-layer hero-layer-bg absolute inset-0 z-[1] will-change-transform"
          style={{
            background: 'linear-gradient(175deg, #F5C962 0%, var(--gold) 8%, #3dc4c9 22%, var(--turquoise) 32%, var(--teal) 50%, #0B5575 70%, var(--navy) 100%)',
          }}
        />
        <div
          className="hero-layer hero-layer-mid absolute inset-0 z-[2] will-change-transform"
          style={{
            background: `
              radial-gradient(ellipse at 50% 20%, rgba(245,166,35,0.35) 0%, transparent 50%),
              radial-gradient(ellipse at 30% 70%, rgba(0,153,181,0.2) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, rgba(0,196,204,0.15) 0%, transparent 40%)
            `,
          }}
        />

        {/* Wave layers */}
        <div className="hero-wave-1 absolute bottom-[30px] left-[-5%] w-[110%] h-[120px] z-[3]"
          style={{ background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120Z' fill='rgba(11,45,69,0.25)'/%3E%3C/svg%3E") no-repeat center bottom / cover` }} />
        <div className="hero-wave-2 absolute bottom-[10px] left-[-5%] w-[110%] h-[100px] z-[3]"
          style={{ background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,60 C320,100 640,20 960,60 C1120,80 1320,40 1440,60 L1440,100 L0,100Z' fill='rgba(0,153,181,0.2)'/%3E%3C/svg%3E") no-repeat center bottom / cover` }} />
        <div className="hero-wave-3 absolute bottom-0 left-[-5%] w-[110%] h-[80px] z-[3]"
          style={{ background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,40 C240,80 480,10 720,50 C960,90 1200,20 1440,50 L1440,80 L0,80Z' fill='rgba(11,45,69,0.35)'/%3E%3C/svg%3E") no-repeat center bottom / cover` }} />

        {/* Dark overlay */}
        <div className="absolute inset-0 z-[4]"
          style={{ background: 'linear-gradient(to top, rgba(11,45,69,0.55) 0%, rgba(11,45,69,0.15) 40%, transparent 70%)' }} />

        {/* Progress bar */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[3px] h-[120px] bg-white/15 rounded-sm z-20 overflow-hidden">
          <div ref={progressRef} className="w-full h-0 bg-gold rounded-sm" style={{ transition: 'height 0.1s linear' }} />
        </div>

        {/* Hero content */}
        <div className="hero-content relative z-10 text-center text-white px-8">
          <div className="font-[family-name:var(--font-barlow)] font-semibold text-[11px] tracking-[5px] text-gold mb-6 uppercase">
            {t('label')}
          </div>
          <h1 className="font-[family-name:var(--font-barlow-condensed)] font-black text-[96px] leading-[0.95] tracking-tight uppercase mb-6 max-md:text-[56px]" style={{ textShadow: '0 4px 40px rgba(11,45,69,0.3)' }}>
            <span className="hero-line block overflow-hidden">
              <span className="hero-line-inner block animate-[slideFromLeft_0.9s_cubic-bezier(0.16,1,0.3,1)_0.3s_forwards] opacity-0 -translate-x-full">
                {t('line1')}
              </span>
            </span>
            <span className="hero-line block overflow-hidden">
              <span className="hero-line-inner block animate-[slideFromRight_0.9s_cubic-bezier(0.16,1,0.3,1)_0.6s_forwards] opacity-0 translate-x-full">
                {t('line2')}
              </span>
            </span>
          </h1>
          <p className="font-[family-name:var(--font-barlow)] font-normal text-lg text-white/70 mb-10 max-w-[560px] mx-auto leading-relaxed animate-[fadeUp_0.8s_ease_0.9s_forwards] opacity-0">
            {t('sub')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-[fadeUp_0.8s_ease_1.2s_forwards] opacity-0">
            <Link href="/tournaments" className="inline-block font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[1.5px] uppercase no-underline py-3.5 px-8 rounded bg-teal text-white border-2 border-teal transition-all duration-300 hover:bg-[#007a91] hover:border-[#007a91]">
              {t('cta1')}
            </Link>
            <Link href="/trips" className="inline-block font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[1.5px] uppercase no-underline py-3.5 px-8 rounded bg-transparent text-white border-2 border-white/60 transition-all duration-300 hover:bg-white/15 hover:border-white">
              {t('cta2')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-[60px] left-10 z-20 flex items-end gap-3">
          <div className="w-px h-[60px]" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5))' }} />
          <span className="font-[family-name:var(--font-barlow)] font-semibold text-[9px] tracking-[3px] text-white/45 uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            {t('scroll')}
          </span>
        </div>
        <div className="scroll-arrow absolute bottom-[50px] right-[50px] z-20 animate-[bounceArrow_2s_ease-in-out_infinite]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-45">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Blue Marlin SVG */}
        <svg id="heroMarlin" className="absolute z-[5] opacity-0 w-[380px] h-auto -bottom-[100px] -right-[5%] -rotate-[15deg]" viewBox="0 0 400 220" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,140 Q20,135 35,120 Q50,100 60,95 Q55,85 50,70 Q48,60 55,55 Q65,65 70,80 Q75,70 85,60 Q95,50 110,45 Q105,35 100,20 Q98,12 105,10 Q112,18 115,30 Q120,45 125,50 Q140,38 160,30 Q180,22 200,20 Q230,17 260,25 Q290,33 310,50 Q330,67 345,90 Q355,105 360,115 L395,108 Q385,115 365,120 Q358,128 348,135 Q330,148 305,155 Q280,160 255,160 Q230,158 210,150 Q195,155 175,162 Q155,168 140,168 Q120,167 105,160 Q90,165 72,170 Q55,175 45,172 Q50,165 60,160 Q45,162 30,160 Q15,157 10,150 Z" />
          <circle cx="280" cy="60" r="5" fill="rgba(11,45,69,0.15)" />
        </svg>
      </div>
    </section>
  )
}
