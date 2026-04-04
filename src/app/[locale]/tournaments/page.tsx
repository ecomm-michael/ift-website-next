'use client'

import { useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { InteriorHero } from '@/components/interior-hero/interior-hero'
import { basePath } from '@/lib/base-path'
import { ScrollReveal } from '@/components/scroll-reveal/scroll-reveal'
import { Accordion } from '@/components/accordion/accordion'

gsap.registerPlugin(ScrollTrigger)

/* ── Tournament schedule data ── */
const schedule = [
  { date: 'Jun 15, 2026', name: 'Summer Slam', location: 'Dorado, PR', prize: '$10,000', status: 'open' as const },
  { date: 'Aug 22, 2026', name: 'Blue Marlin Classic', location: 'Fajardo, PR', prize: '$25,000', status: 'upcoming' as const },
  { date: 'Sep 12, 2026', name: 'Dorado Derby', location: 'Rincon, PR', prize: '$5,000', status: 'upcoming' as const },
  { date: 'Oct 3, 2026', name: 'Wahoo Open', location: 'Cabo Rojo, PR', prize: '$8,000', status: 'upcoming' as const },
  { date: 'Nov 14, 2026', name: 'Festival Championship', location: 'Isla Verde, PR', prize: '$50,000', status: 'upcoming' as const },
]

const pastResults = [
  { trigger: '2025 Championship', content: 'Winner: Carlos Rivera — 487 lbs Blue Marlin' },
  { trigger: '2024 Summer Slam', content: 'Winner: Maria Santos — 312 lbs Yellowfin Tuna' },
  { trigger: '2023 Festival Classic', content: 'Winner: James Chen — 256 lbs Mahi-Mahi' },
]

const statusStyles = {
  open: 'bg-teal/10 text-teal animate-[pulse-badge_2.5s_ease_infinite]',
  upcoming: 'bg-gold/10 text-gold',
  completed: 'bg-navy/8 text-navy/50',
}

const statusLabels = {
  open: 'Registration Open',
  upcoming: 'Upcoming',
  completed: 'Completed',
}

export default function TournamentsPage() {
  const t = useTranslations('events')
  const tableRef = useRef<HTMLTableSectionElement>(null)
  const mobileCardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  /* ── Table row stagger via IntersectionObserver ── */
  useEffect(() => {
    const tbody = tableRef.current
    if (!tbody) return

    const rows = tbody.querySelectorAll('.schedule-row')
    if (rows.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const allRows = entry.target.closest('tbody')?.querySelectorAll('.schedule-row')
            allRows?.forEach((row, idx) => {
              setTimeout(() => {
                row.classList.add('row-visible')
              }, idx * 100)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(rows[0])
    return () => observer.disconnect()
  }, [])

  /* ── Mobile card stagger via IntersectionObserver ── */
  useEffect(() => {
    const container = mobileCardsRef.current
    if (!container) return

    const cards = container.querySelectorAll('.mobile-event-card')
    if (cards.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const allCards = Array.from(cards)
            const idx = allCards.indexOf(entry.target as HTMLElement)
            setTimeout(() => {
              entry.target.classList.add('visible')
            }, idx * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  /* ── Register CTA GSAP entrance ── */
  useGSAP(
    () => {
      const section = ctaRef.current
      if (!section) return

      gsap.fromTo(
        '.register-cta-content > *',
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
      {/* ── HERO with parallax + slide-from-left content ── */}
      <InteriorHero
        imageSrc={`${basePath}/images/generated/event-tournament.jpg`}
        imageAlt="Tournament fishing in Puerto Rico"
        overlayClass="bg-gradient-to-t from-navy/70 to-navy/30"
        minHeight="60vh"
        entranceDirection="left"
      >
        <div className="eyebrow text-gold" style={{ letterSpacing: '5px' }}>
          Compete in Paradise
        </div>
        <h1 className="font-[family-name:var(--font-barlow-condensed)] font-black text-[72px] text-white uppercase leading-[0.95] tracking-tight max-md:text-[48px]">
          {t('heading')}
        </h1>
      </InteriorHero>

      {/* ── TOURNAMENT SCHEDULE ── */}
      <section className="section-pad">
        <div className="container">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] font-bold text-[36px] text-navy mb-10">
              2026 Tournament Schedule
            </h2>
          </ScrollReveal>

          {/* Desktop Table */}
          <div className="max-md:hidden">
            <ScrollReveal>
              <table className="w-full border-collapse font-[family-name:var(--font-barlow)]">
                <thead>
                  <tr>
                    {['Date', 'Tournament', 'Location', 'Prize Pool', 'Status'].map((h) => (
                      <th
                        key={h}
                        className="font-semibold text-[12px] tracking-[2px] uppercase text-navy/50 text-left py-4 px-5 border-b-2 border-navy/8"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody ref={tableRef}>
                  {schedule.map((row) => (
                    <tr
                      key={row.name}
                      className="schedule-row hover:bg-seafoam"
                    >
                      <td className="py-5 px-5 border-b border-navy/6 text-[15px] text-navy/60">
                        {row.date}
                      </td>
                      <td className="py-5 px-5 border-b border-navy/6 text-[15px] font-semibold text-navy">
                        {row.name}
                      </td>
                      <td className="py-5 px-5 border-b border-navy/6 text-[15px] text-navy/60">
                        {row.location}
                      </td>
                      <td className="py-5 px-5 border-b border-navy/6 text-[15px] font-semibold text-gold">
                        {row.prize}
                      </td>
                      <td className="py-5 px-5 border-b border-navy/6">
                        <span
                          className={`inline-block font-[family-name:var(--font-barlow)] font-semibold text-[12px] py-[5px] px-[14px] rounded-full tracking-[0.5px] ${statusStyles[row.status]}`}
                        >
                          {statusLabels[row.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollReveal>
          </div>

          {/* Mobile Cards */}
          <div className="hidden max-md:block" ref={mobileCardsRef}>
            {schedule.map((row) => (
              <div
                key={row.name}
                className="mobile-event-card bg-white rounded-xl shadow-[0_2px_12px_rgba(11,45,69,0.06)] border border-navy/8 p-6 mb-4"
              >
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <div className="font-[family-name:var(--font-barlow-condensed)] font-bold text-[18px] text-navy">
                      {row.name}
                    </div>
                    <div className="text-[14px] text-navy/50">{row.date}</div>
                  </div>
                  <span
                    className={`inline-block font-[family-name:var(--font-barlow)] font-semibold text-[12px] py-[5px] px-[14px] rounded-full tracking-[0.5px] whitespace-nowrap ${statusStyles[row.status]}`}
                  >
                    {statusLabels[row.status]}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-navy/60">{row.location}</span>
                  <span className="font-semibold text-gold">{row.prize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAST RESULTS (Accordion) ── */}
      <section className="section-pad bg-seafoam">
        <div className="container">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] font-bold text-[36px] text-navy mb-10">
              Past Results
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <Accordion items={pastResults} className="max-w-[720px]" />
          </ScrollReveal>
        </div>
      </section>

      {/* ── REGISTRATION CTA ── */}
      <section
        ref={ctaRef}
        className="bg-teal py-20 text-center relative overflow-hidden"
      >
        {/* Decorative radial glow */}
        <div
          className="absolute -top-[60%] -left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="container register-cta-content relative z-10">
          <h2 className="font-[family-name:var(--font-barlow-condensed)] font-black text-[40px] text-white uppercase mb-6 max-md:text-[28px]">
            Ready to Compete?
          </h2>
          <Link
            href="#"
            className="inline-block font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[1.5px] uppercase no-underline py-3.5 px-8 rounded-full bg-white text-teal border-2 border-white transition-all duration-300 hover:bg-white/90 hover:border-white/90"
          >
            Register Now
          </Link>
        </div>
      </section>
    </>
  )
}
