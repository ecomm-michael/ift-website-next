'use client'

import { useTranslations } from 'next-intl'
import { ScrollReveal } from '@/components/scroll-reveal/scroll-reveal'
import Link from 'next/link'

const events = [
  { date: 'June 14, 2026', title: 'Marlin Open 2026', location: 'Fajardo, Puerto Rico', prize: '$15,000 Prize Pool', primary: true },
  { date: 'August 2026', title: 'IFT Annual Festival', location: 'San Juan, Puerto Rico', prize: 'Family Event · All Ages', primary: false },
  { date: 'October 2026', title: 'Blue Marlin Classic', location: 'Humacao, Puerto Rico', prize: '$25,000 Prize Pool', primary: true },
]

export default function TournamentsPage() {
  const t = useTranslations('events')

  return (
    <section className="bg-seafoam section-pad relative">
      <div className="container">
        <div className="flex items-center justify-center gap-4 mb-14">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] font-extrabold text-[42px] text-navy uppercase tracking-tight">{t('heading')}</h2>
          </ScrollReveal>
          <ScrollReveal>
            <span className="font-[family-name:var(--font-barlow)] font-semibold text-[11px] tracking-[2px] uppercase bg-teal text-white py-1.5 px-4 rounded-full">{t('season')}</span>
          </ScrollReveal>
        </div>
        <div className="grid grid-cols-3 gap-7 max-md:grid-cols-1">
          {events.map((event, i) => (
            <ScrollReveal key={event.title} stagger={i} threshold={0.1}>
              <div className="bg-white rounded-xl p-9 shadow-[0_4px_24px_rgba(11,45,69,0.08)] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(11,45,69,0.12)]">
                <div className="font-[family-name:var(--font-barlow)] font-semibold text-xs tracking-[2px] uppercase text-teal mb-3">{event.date}</div>
                <div className="font-[family-name:var(--font-barlow-condensed)] font-extrabold text-[26px] text-navy uppercase mb-3 tracking-tight">{event.title}</div>
                <div className="font-[family-name:var(--font-barlow)] text-sm text-navy/55 mb-2">{event.location}</div>
                <div className="font-[family-name:var(--font-barlow)] font-semibold text-sm text-gold mb-6">{event.prize}</div>
                <Link href="#" className={`mt-auto self-start inline-block font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[1.5px] uppercase no-underline py-3.5 px-8 rounded-full transition-all duration-300 ${event.primary ? 'bg-teal text-white border-2 border-teal hover:bg-[#007a91]' : 'bg-transparent text-teal border-2 border-teal hover:bg-teal hover:text-white'}`}>
                  {event.primary ? t('register') : t('learnMore')}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
