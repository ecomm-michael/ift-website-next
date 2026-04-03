'use client'

import { useTranslations } from 'next-intl'
import { HeroParallax } from '@/components/hero/hero-parallax'
import { OdometerStats } from '@/components/odometer/odometer-counter'
import { KineticMarquee } from '@/components/marquee/kinetic-marquee'
import { StickyCards } from '@/components/pillars/sticky-cards'
import { GalleryStrip } from '@/components/gallery/gallery-strip'
import { ScrollReveal } from '@/components/scroll-reveal/scroll-reveal'
import { EmailCapture } from '@/components/email-capture/email-capture'

export default function HomePage() {
  const t = useTranslations('tagline')

  return (
    <>
      <HeroParallax />
      <section className="bg-white relative section-pad">
        <div className="max-w-[780px] mx-auto text-center px-8">
          <ScrollReveal><div className="eyebrow text-teal">{t('eyebrow')}</div></ScrollReveal>
          <ScrollReveal><div className="w-[60px] h-0.5 bg-teal mx-auto mb-10" /></ScrollReveal>
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] font-extrabold text-[52px] text-navy leading-[1.1] max-w-[700px] mx-auto mb-6 uppercase tracking-tight">
              {t('heading')}
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="font-[family-name:var(--font-barlow)] text-[17px] text-navy/65 leading-[1.7] max-w-[540px] mx-auto">
              {t('body')}
            </p>
          </ScrollReveal>
          <ScrollReveal><div className="w-[60px] h-0.5 bg-teal mx-auto mt-10" /></ScrollReveal>
        </div>
      </section>
      <OdometerStats />
      <KineticMarquee />
      <StickyCards />
      <GalleryStrip />
      <EmailCapture />
    </>
  )
}
