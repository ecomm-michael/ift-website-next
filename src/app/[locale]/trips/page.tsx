'use client'

import { useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { InteriorHero } from '@/components/interior-hero/interior-hero'
import { PriceCounter } from '@/components/price-counter/price-counter'

gsap.registerPlugin(ScrollTrigger)

/* ── Trip package data ── */
const trips = [
  {
    name: 'Half Day',
    price: '$500',
    meta: 'per person',
    duration: '4 hours',
    featured: false,
    inclusions: ['Gear included', 'Captain + mate', 'Drinks included'],
  },
  {
    name: 'Full Day',
    price: '$850',
    meta: 'per person',
    duration: '8 hours',
    featured: true,
    badge: 'Most Popular',
    inclusions: ['Gear included', 'Captain + mate', 'Lunch + drinks', 'Photo package'],
  },
  {
    name: 'Multi-Day',
    price: '$2,200',
    meta: 'per person',
    duration: '3 days',
    featured: false,
    inclusions: ['Gear included', 'Captain + mate', 'All meals + drinks', 'Photo + video', 'Hotel coordination'],
  },
]

export default function TripsPage() {
  const t = useTranslations('pillars.trips')
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  /* ── Package card stagger + checklist stagger via IntersectionObserver ── */
  useEffect(() => {
    const container = cardsRef.current
    if (!container) return

    const cards = container.querySelectorAll('.package-card-anim')
    if (cards.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const allCards = Array.from(cards)
            const idx = allCards.indexOf(entry.target as HTMLElement)

            setTimeout(() => {
              entry.target.classList.add('visible')

              // Stagger checklist items inside this card
              const items = entry.target.querySelectorAll('.checklist-item')
              items.forEach((item, i) => {
                setTimeout(() => {
                  item.classList.add('item-visible')
                }, i * 60)
              })
            }, idx * 150)

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  /* ── Booking CTA GSAP entrance ── */
  useGSAP(
    () => {
      const section = ctaRef.current
      if (!section) return

      gsap.fromTo(
        '.booking-cta-content > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      )
    },
    { scope: ctaRef }
  )

  return (
    <>
      {/* ── HERO with parallax + fade-up content ── */}
      <InteriorHero
        imageSrc="/images/generated/pillar-trips.jpg"
        imageAlt="Sport fishing trip in Puerto Rico"
        overlayClass="bg-gradient-to-t from-navy/70 to-navy/30"
        minHeight="60vh"
      >
        <div className="eyebrow text-gold" style={{ letterSpacing: '5px' }}>
          Fish the Caribbean
        </div>
        <h1 className="font-[family-name:var(--font-barlow-condensed)] font-black text-[72px] text-white uppercase leading-[0.95] tracking-tight max-md:text-[48px]">
          {t('heading')}
        </h1>
      </InteriorHero>

      {/* ── PACKAGE CARDS ── */}
      <section className="section-pad">
        <div className="container">
          <div
            ref={cardsRef}
            className="grid grid-cols-3 gap-8 max-w-[1000px] mx-auto max-md:grid-cols-1 max-md:max-w-[400px]"
          >
            {trips.map((trip) => (
              <div
                key={trip.name}
                className={`package-card-anim bg-white rounded-xl shadow-[0_4px_24px_rgba(11,45,69,0.08)] p-10 pb-8 flex flex-col relative transition-all duration-300 hover:shadow-[0_8px_40px_rgba(11,45,69,0.12)] ${
                  trip.featured ? 'border-2 border-teal' : ''
                }`}
              >
                {/* "Most Popular" badge with shine animation */}
                {trip.badge && (
                  <span
                    className="absolute -top-[14px] left-1/2 -translate-x-1/2 text-white font-[family-name:var(--font-barlow)] font-semibold text-[12px] tracking-[0.5px] py-1.5 px-[18px] rounded-full whitespace-nowrap"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--ift-teal) 0%, var(--ift-turquoise) 40%, var(--ift-teal) 60%, var(--ift-teal) 100%)',
                      backgroundSize: '200% auto',
                      animation: 'badge-shine 3s linear infinite',
                    }}
                  >
                    {trip.badge}
                  </span>
                )}

                {/* Package name */}
                <h3 className="font-[family-name:var(--font-barlow-condensed)] font-bold text-[22px] text-navy mb-2">
                  {trip.name}
                </h3>

                {/* Animated price counter */}
                <PriceCounter
                  value={trip.price}
                  className="font-[family-name:var(--font-barlow-condensed)] font-black text-[44px] text-teal leading-none mb-1"
                />

                <p className="font-[family-name:var(--font-barlow)] text-[14px] text-navy/50 mb-1">
                  {trip.meta}
                </p>
                <p className="font-[family-name:var(--font-barlow)] text-[14px] text-navy/50 mb-1">
                  {trip.duration}
                </p>

                {/* Checklist with staggered reveal */}
                <ul className="list-none my-6 flex-1">
                  {trip.inclusions.map((item) => (
                    <li
                      key={item}
                      className="checklist-item font-[family-name:var(--font-barlow)] text-[14px] text-navy/70 py-1.5 flex items-start gap-2.5"
                    >
                      <span className="text-teal font-bold flex-shrink-0">
                        &#10003;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <Link
                  href="#"
                  className="block w-full text-center font-[family-name:var(--font-barlow)] font-semibold text-[14px] tracking-[1px] uppercase no-underline py-3.5 rounded-lg bg-teal text-white transition-colors duration-200 hover:bg-turquoise"
                >
                  Inquire Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA ── */}
      <section ref={ctaRef} className="section-pad bg-seafoam text-center">
        <div className="container booking-cta-content">
          <h2 className="font-[family-name:var(--font-barlow-condensed)] font-bold text-[36px] text-navy mb-4">
            Ready to Book?
          </h2>
          <p className="font-[family-name:var(--font-barlow)] text-[18px] text-navy/60 max-w-[540px] mx-auto leading-relaxed mb-8">
            Contact us to plan your perfect fishing trip.
          </p>
          <Link
            href="#"
            className="inline-block font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[1.5px] uppercase no-underline py-3.5 px-8 rounded-full bg-teal text-white border-2 border-teal transition-all duration-300 hover:bg-turquoise hover:border-turquoise"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
