'use client'

import React, { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const pillarConfigs: Array<{
  id: string
  watermark: string
  gradient: string
  textColor: string
  btnClass: string
  href: string
  zIndex: number
  watermarkColor?: string
  icon: React.ReactNode
}> = [
  {
    id: 'tournaments',
    watermark: '01',
    gradient: 'linear-gradient(135deg, var(--navy) 0%, #0B5575 40%, var(--teal) 100%)',
    textColor: 'text-white',
    btnClass: 'bg-transparent text-white border-2 border-white/60 hover:bg-white/15 hover:border-white',
    href: '/tournaments',
    zIndex: 1,
    icon: (
      <svg className="w-12 h-12 mb-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 6h20v4c0 8-4 16-10 18C18 26 14 18 14 10V6z" stroke="#F5A623" strokeWidth="2.5" fill="none"/>
        <path d="M14 10H8c0 6 3 10 6 12" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M34 10h6c0 6-3 10-6 12" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="20" y="28" width="8" height="6" rx="1" stroke="#F5A623" strokeWidth="2.5"/>
        <rect x="16" y="34" width="16" height="4" rx="2" stroke="#F5A623" strokeWidth="2.5"/>
      </svg>
    ),
  },
  {
    id: 'trips',
    watermark: '02',
    gradient: 'linear-gradient(135deg, var(--teal) 0%, #0bbec5 60%, var(--turquoise) 100%)',
    textColor: 'text-white',
    btnClass: 'bg-transparent text-white border-2 border-white/60 hover:bg-white/15 hover:border-white',
    href: '/trips',
    zIndex: 2,
    icon: (
      <svg className="w-12 h-12 mb-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="10" r="4" stroke="white" strokeWidth="2.5"/>
        <line x1="24" y1="14" x2="24" y2="40" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="20" x2="32" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M8 32c4 6 10 10 16 10s12-4 16-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'festival',
    watermark: '03',
    gradient: 'linear-gradient(135deg, var(--sandy) 0%, #F5DBA3 50%, var(--gold) 100%)',
    textColor: 'text-navy',
    btnClass: 'bg-navy text-white border-2 border-navy hover:bg-[#0a2438] hover:border-[#0a2438]',
    href: '/festival',
    zIndex: 3,
    watermarkColor: 'rgba(11,45,69,0.05)',
    icon: (
      <svg className="w-12 h-12 mb-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4l5.5 12.5L43 18l-10 9 3 13.5L24 34l-12 6.5 3-13.5-10-9 13.5-1.5Z" stroke="#0B2D45" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export function StickyCards() {
  const t = useTranslations('pillars')
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progressVisible, setProgressVisible] = useState(false)

  useGSAP(
    () => {
      const pillars = document.querySelectorAll('.pillar')
      if (!pillars.length) return

      pillars.forEach((card, i) => {
        if (i < pillars.length - 1) {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.5,
            scrollTrigger: {
              trigger: pillars[i + 1],
              start: 'top 90%',
              end: 'top 20%',
              scrub: true,
            },
          })
        }

        ScrollTrigger.create({
          trigger: card,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        })
      })

      ScrollTrigger.create({
        trigger: '.pillars-section',
        start: 'top 30%',
        end: 'bottom 70%',
        onEnter: () => setProgressVisible(true),
        onLeave: () => setProgressVisible(false),
        onEnterBack: () => setProgressVisible(true),
        onLeaveBack: () => setProgressVisible(false),
      })
    },
    { scope: sectionRef }
  )

  return (
    <div className="pillars-section" ref={sectionRef}>
      <div className={`pillar-progress fixed right-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-3 items-center transition-opacity duration-300 pointer-events-none max-md:hidden ${progressVisible ? 'opacity-100' : 'opacity-0'}`}>
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <div className={`pillar-dot w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'bg-gold border-2 border-gold scale-[1.3]' : 'bg-white/30 border-2 border-white/50'}`} data-index={i} />
            {i < 2 && <div className="w-0.5 h-6 bg-white/15 mx-auto mt-3" />}
          </div>
        ))}
      </div>

      {pillarConfigs.map((config) => (
        <section
          key={config.id}
          className={`pillar sticky top-0 w-full min-h-screen flex items-center overflow-hidden will-change-transform ${config.textColor}`}
          style={{ background: config.gradient, zIndex: config.zIndex }}
          id={config.id}
        >
          <div className="absolute top-1/2 right-[8%] -translate-y-1/2 font-[family-name:var(--font-barlow-condensed)] font-black text-[260px] leading-none select-none z-[1]"
            style={{ color: config.watermarkColor || 'rgba(255,255,255,0.07)' }}>
            {config.watermark}
          </div>
          <div className="relative z-[3] max-w-[700px] py-20 px-16">
            {config.icon}
            <h3 className="font-[family-name:var(--font-barlow-condensed)] font-black text-[60px] uppercase leading-[1.05] mb-5 tracking-tight whitespace-pre-line max-md:text-[42px]">
              {t(`${config.id}.heading`)}
            </h3>
            <p className="text-[17px] leading-[1.7] mb-8 max-w-[480px]">
              {t(`${config.id}.body`)}
            </p>
            <Link href={config.href} className={`inline-block font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[1.5px] uppercase no-underline py-3.5 px-8 rounded transition-all duration-300 ${config.btnClass}`}>
              {t(`${config.id}.cta`)}<span aria-hidden="true"> →</span>
            </Link>
          </div>
        </section>
      ))}
    </div>
  )
}
