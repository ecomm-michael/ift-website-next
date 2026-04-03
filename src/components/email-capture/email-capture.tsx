'use client'

import { useTranslations } from 'next-intl'
import { ScrollReveal } from '@/components/scroll-reveal/scroll-reveal'

export function EmailCapture() {
  const t = useTranslations('email')

  return (
    <section className="bg-navy relative overflow-hidden section-pad">
      <div className="absolute -top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,153,181,0.15) 0%, transparent 70%)' }} />
      <div className="max-w-[600px] mx-auto text-center relative z-[2]">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-barlow-condensed)] font-black text-5xl text-white uppercase mb-1 tracking-tight">
            {t('heading')}
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <div className="font-[family-name:var(--font-barlow-condensed)] font-bold text-[28px] text-white/35 uppercase mb-4">
            {t('headingEs')}
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <p className="font-[family-name:var(--font-barlow)] text-base text-white/60 mb-9 leading-relaxed">
            {t('sub')}
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <form className="flex max-w-[480px] mx-auto mb-4" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={t('placeholder')}
              className="flex-1 py-3.5 px-5 border-none rounded-l bg-white text-navy font-[family-name:var(--font-barlow)] text-[15px] outline-none placeholder:text-navy/35" />
            <button type="submit"
              className="py-3.5 px-7 bg-teal text-white border-none rounded-r font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[1.5px] uppercase cursor-pointer transition-colors duration-200 hover:bg-[#007a91]">
              {t('submit')}
            </button>
          </form>
        </ScrollReveal>
        <ScrollReveal>
          <p className="font-[family-name:var(--font-barlow)] text-xs text-white/30">{t('disclaimer')}</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
