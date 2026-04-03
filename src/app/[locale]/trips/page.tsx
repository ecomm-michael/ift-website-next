'use client'

import { useTranslations } from 'next-intl'
import { ScrollReveal } from '@/components/scroll-reveal/scroll-reveal'
import Link from 'next/link'

const trips = [
  { name: 'Half-Day Charter', duration: '4 hours', price: '$499/person', description: 'Perfect for beginners. Inshore fishing with expert guides, all gear included.' },
  { name: 'Full-Day Deep Sea', duration: '8 hours', price: '$899/person', description: "Target marlin, tuna, and mahi-mahi in Puerto Rico's deep waters. Lunch included." },
  { name: 'Weekend Package', duration: '2 days', price: '$1,599/person', description: 'Two full days of fishing with overnight lodging, meals, and sunset cruise.' },
]

export default function TripsPage() {
  const t = useTranslations('pillars.trips')

  return (
    <section className="bg-white section-pad relative">
      <div className="container">
        <div className="text-center mb-14">
          <ScrollReveal><div className="eyebrow text-teal">All-Inclusive Packages</div></ScrollReveal>
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] font-extrabold text-[52px] text-navy uppercase leading-[1.1] mb-6 tracking-tight">{t('heading')}</h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="font-[family-name:var(--font-barlow)] text-[17px] text-navy/65 leading-[1.7] max-w-[540px] mx-auto">{t('body')}</p>
          </ScrollReveal>
        </div>
        <div className="grid grid-cols-3 gap-7 max-md:grid-cols-1">
          {trips.map((trip, i) => (
            <ScrollReveal key={trip.name} stagger={i} threshold={0.1}>
              <div className="bg-seafoam rounded-xl p-9 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(11,45,69,0.12)]">
                <div className="font-[family-name:var(--font-barlow)] font-semibold text-xs tracking-[2px] uppercase text-teal mb-3">{trip.duration}</div>
                <div className="font-[family-name:var(--font-barlow-condensed)] font-extrabold text-[26px] text-navy uppercase mb-3 tracking-tight">{trip.name}</div>
                <p className="font-[family-name:var(--font-barlow)] text-sm text-navy/65 leading-relaxed mb-6">{trip.description}</p>
                <div className="font-[family-name:var(--font-barlow-condensed)] font-black text-3xl text-gold mb-6">{trip.price}</div>
                <Link href="#" className="mt-auto self-start inline-block font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[1.5px] uppercase no-underline py-3.5 px-8 rounded-full bg-teal text-white border-2 border-teal transition-all duration-300 hover:bg-[#007a91]">
                  Book Now
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
