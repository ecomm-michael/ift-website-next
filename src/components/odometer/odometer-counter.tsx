'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface StatConfig {
  value: string
  prefix?: string
  suffix?: string
  colorClass: string
  labelKey: string
}

const stats: StatConfig[] = [
  { value: '50000', prefix: '$', suffix: '+', colorClass: 'text-gold', labelKey: 'prizePool' },
  { value: '500', suffix: '+', colorClass: 'text-teal', labelKey: 'anglers' },
  { value: '12', colorClass: 'text-navy', labelKey: 'events' },
]

function OdometerDigit({ targetDigit }: { targetDigit: number }) {
  return (
    <div className="odo-digit inline-block overflow-hidden h-[1.15em] relative">
      <div
        className="odo-strip flex flex-col"
        style={{ transition: 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="block h-[1.15em] leading-[1.15]">{i}</span>
        ))}
      </div>
    </div>
  )
}

function OdometerNumber({ stat }: { stat: StatConfig }) {
  const odoRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = odoRef.current
    if (!el) return

    const digits = stat.value.split('')

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const strips = el.querySelectorAll('.odo-strip')
        strips.forEach((strip, i) => {
          const target = parseInt(digits[i])
          const firstChild = strip.children[0] as HTMLElement
          if (!firstChild) return
          const h = firstChild.offsetHeight
          ;(strip as HTMLElement).style.transform = `translateY(-${target * h}px)`
          ;(strip as HTMLElement).style.transitionDelay = `${i * 0.12}s`
        })
      },
    })
  })

  return (
    <div
      ref={odoRef}
      className={`font-[family-name:var(--font-barlow-condensed)] font-black text-[80px] leading-none mb-3 inline-flex justify-center overflow-hidden h-[1.15em] ${stat.colorClass}`}
    >
      {stat.prefix && <span style={{ fontSize: 'inherit', color: 'inherit' }}>{stat.prefix}</span>}
      {stat.value.split('').map((_, i) => (
        <OdometerDigit key={i} targetDigit={parseInt(stat.value[i])} />
      ))}
      {stat.suffix && <span className="align-top" style={{ fontSize: 'inherit', color: 'inherit' }}>{stat.suffix}</span>}
    </div>
  )
}

export function OdometerStats() {
  const t = useTranslations('stats')

  return (
    <section className="bg-white relative section-pad" style={{ paddingTop: '40px' }}>
      <div className="container">
        <div className="grid grid-cols-3 gap-0 text-center max-md:grid-cols-1">
          {stats.map((stat, i) => (
            <div key={stat.labelKey} className="stat-item py-5 px-8 relative">
              {i < stats.length - 1 && (
                <div className="absolute right-0 top-[20%] h-[60%] w-px bg-navy/10 max-md:hidden" />
              )}
              <OdometerNumber stat={stat} />
              <div className="font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[2.5px] uppercase text-navy/50">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
