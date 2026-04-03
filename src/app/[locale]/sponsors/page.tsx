'use client'

import { useTranslations } from 'next-intl'
import { ScrollReveal } from '@/components/scroll-reveal/scroll-reveal'
import Link from 'next/link'

const tiers = [
  { name: 'Bronze', price: 'Starting at TBD', benefits: ['Logo on event signage', 'Social media mention', '2 complimentary event passes'], accent: false, primary: false },
  { name: 'Silver', price: 'Starting at TBD', benefits: ['Logo on all event materials', 'Dedicated social media post', '4 complimentary event passes', 'Booth space at festivals'], accent: false, primary: false },
  { name: 'Gold', price: 'Starting at TBD', benefits: ['Premium logo placement', 'Social media campaign', '8 complimentary event passes', 'Premium booth at all events'], accent: true, primary: true },
  { name: 'Title', price: 'Starting at TBD', benefits: ['Event naming rights', 'Full marketing integration', 'Unlimited event access', 'Exclusive brand partnership'], accent: true, primary: true },
]

export default function SponsorsPage() {
  const t = useTranslations('sponsors')

  return (
    <section className="bg-sandy section-pad relative">
      <div className="container">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-barlow-condensed)] font-extrabold text-[42px] text-navy uppercase text-center mb-14 tracking-tight">{t('heading')}</h2>
        </ScrollReveal>
        <div className="grid grid-cols-4 gap-6 max-md:grid-cols-1">
          {tiers.map((tier, i) => (
            <ScrollReveal key={tier.name} stagger={i} threshold={0.1}>
              <div className={`bg-white rounded-xl p-9 pb-8 shadow-[0_4px_24px_rgba(11,45,69,0.06)] text-center flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(11,45,69,0.1)] ${tier.accent ? 'border-t-[3px] border-t-gold' : 'border-t-[3px] border-t-transparent'}`}>
                <div className={`font-[family-name:var(--font-barlow-condensed)] font-extrabold text-2xl uppercase mb-2 ${tier.accent ? 'text-gold' : 'text-navy'}`}>{tier.name}</div>
                <div className="font-[family-name:var(--font-barlow)] font-semibold text-[13px] text-navy/40 tracking-[1.5px] uppercase mb-6">{tier.price}</div>
                <ul className="list-none mb-7 text-left flex-1">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="font-[family-name:var(--font-barlow)] text-sm text-navy/65 py-2 border-b border-navy/[0.06] pl-[18px] relative before:content-[''] before:absolute before:left-0 before:top-[15px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-teal">
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Link href="#" className={`self-center w-full text-center inline-block font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[1.5px] uppercase no-underline py-3.5 px-8 rounded-full transition-all duration-300 ${tier.primary ? 'bg-teal text-white border-2 border-teal hover:bg-[#007a91]' : 'bg-transparent text-teal border-2 border-teal hover:bg-teal hover:text-white'}`}>
                  {t('inquire')}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
