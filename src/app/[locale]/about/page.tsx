'use client'

import { useTranslations } from 'next-intl'
import { ScrollReveal } from '@/components/scroll-reveal/scroll-reveal'
import Link from 'next/link'

export default function AboutPage() {
  const t = useTranslations('about')

  return (
    <section className="bg-white section-pad relative">
      <div className="container">
        <div className="grid grid-cols-2 gap-16 items-center max-md:grid-cols-1">
          <div>
            <ScrollReveal><div className="eyebrow text-teal">{t('eyebrow')}</div></ScrollReveal>
            <ScrollReveal>
              <h3 className="font-[family-name:var(--font-barlow-condensed)] font-extrabold text-5xl text-navy leading-[1.1] mb-6">{t('heading')}</h3>
            </ScrollReveal>
            <ScrollReveal><p className="font-[family-name:var(--font-barlow)] text-base text-navy/65 leading-[1.75] mb-4">{t('p1')}</p></ScrollReveal>
            <ScrollReveal><p className="font-[family-name:var(--font-barlow)] text-base text-navy/65 leading-[1.75] mb-4">{t('p2')}</p></ScrollReveal>
            <ScrollReveal><p className="font-[family-name:var(--font-barlow)] text-base text-navy/65 leading-[1.75] mb-4">{t('p3')}</p></ScrollReveal>
            <ScrollReveal>
              <Link href="#" className="font-[family-name:var(--font-barlow)] font-semibold text-sm text-teal no-underline tracking-[1px] uppercase mt-4 inline-block transition-colors duration-200 hover:text-[#007a91]">
                {t('meetTeam')} →
              </Link>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <div className="w-full h-[480px] rounded-xl relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, var(--seafoam) 0%, #b8e6ef 40%, var(--teal) 80%, var(--navy) 100%)' }}>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[4px] text-white/35">PHOTO</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
