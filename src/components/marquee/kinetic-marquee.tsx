'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function KineticMarquee() {
  const t = useTranslations('marquee')
  const rowRef = useRef<HTMLDivElement>(null)
  const items = Array.from({ length: 7 }, (_, i) => t(`item${i}`))
  const scrollVelocityRef = useRef(0)
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        scrollVelocityRef.current = Math.abs(self.getVelocity())
      },
    })

    const row = rowRef.current
    if (!row) return

    const contentEl = row.querySelector('.marquee-content') as HTMLElement
    if (!contentEl) return

    const contentWidth = contentEl.offsetWidth
    const baseSpeed = 50
    const speedMult = 0.8
    let x = 0

    function animate() {
      scrollVelocityRef.current *= 0.95
      const speed = (baseSpeed + scrollVelocityRef.current * 0.08) * speedMult
      x += speed / 60
      if (x >= contentWidth) x -= contentWidth
      if (row) {
        row.style.transform = `translateX(-${x}px)`
      }
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      st.kill()
    }
  }, [])

  const renderItems = () =>
    items.map((item, i) => (
      <span key={i} className="marquee-item inline-flex items-center font-[family-name:var(--font-barlow-condensed)] font-extrabold text-[clamp(28px,5vw,48px)] tracking-tight text-white/85 px-8 uppercase">
        {item}
        <span className="sep inline-block w-2 h-2 bg-gold rounded-full mx-6 opacity-60" />
      </span>
    ))

  return (
    <section className="marquee-section py-6 overflow-hidden bg-navy">
      <div ref={rowRef} className="marquee-row flex whitespace-nowrap will-change-transform py-3" data-speed="0.8" data-direction="left">
        <div className="marquee-content inline-flex items-center shrink-0">{renderItems()}</div>
        <div className="marquee-content inline-flex items-center shrink-0" aria-hidden="true">{renderItems()}</div>
        <div className="marquee-content inline-flex items-center shrink-0" aria-hidden="true">{renderItems()}</div>
      </div>
    </section>
  )
}
