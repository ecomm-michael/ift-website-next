'use client'

import { useTranslations } from 'next-intl'
import { ScrollReveal } from '@/components/scroll-reveal/scroll-reveal'
import Link from 'next/link'

export default function FestivalPage() {
  const t = useTranslations('pillars.festival')

  return (
    <section className="section-pad relative" style={{ background: 'linear-gradient(135deg, var(--sandy) 0%, #F5DBA3 50%, var(--gold) 100%)' }}>
      <div className="container">
        <div className="max-w-[700px]">
          <ScrollReveal><div className="eyebrow text-navy/60">August 2026 · San Juan</div></ScrollReveal>
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] font-black text-[60px] text-navy uppercase leading-[1.05] mb-5 tracking-tight max-md:text-[42px]">{t('heading')}</h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="font-[family-name:var(--font-barlow)] text-[17px] text-navy/70 leading-[1.7] mb-10 max-w-[480px]">{t('body')}</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-6 mb-10 max-md:grid-cols-1">
              {[
                { icon: '🎵', label: 'Live Music', desc: "Local and international acts performing throughout the weekend" },
                { icon: '🎣', label: 'Fishing Competitions', desc: 'Open-entry tournaments for all skill levels' },
                { icon: '🍽', label: 'Local Food', desc: "Puerto Rican cuisine from the island's best vendors" },
                { icon: '👪', label: 'Family Friendly', desc: 'Activities and entertainment for all ages' },
              ].map((item) => (
                <div key={item.label} className="bg-white/40 rounded-xl p-6 backdrop-blur-sm">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-[family-name:var(--font-barlow-condensed)] font-bold text-lg text-navy uppercase mb-1">{item.label}</div>
                  <p className="font-[family-name:var(--font-barlow)] text-sm text-navy/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <Link href="#" className="inline-block font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[1.5px] uppercase no-underline py-3.5 px-8 rounded bg-navy text-white border-2 border-navy transition-all duration-300 hover:bg-[#0a2438]">
              Get Festival Updates →
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
