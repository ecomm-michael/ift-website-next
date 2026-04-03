'use client'

import { useRef, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { InteriorHero } from '@/components/interior-hero/interior-hero'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Schedule Timeline — CSS-driven draw + spring dots                 */
/* ------------------------------------------------------------------ */
function ScheduleTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = timelineRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const items = [
    { time: '8:00 AM', title: 'Gates Open', desc: 'Welcome reception and registration' },
    { time: '10:00 AM', title: 'Tournament Launch', desc: 'Boats depart from marina' },
    { time: '2:00 PM', title: 'Weigh-In Begins', desc: 'Live leaderboard updates' },
    { time: '5:00 PM', title: 'Live Music', desc: 'Main stage performances begin' },
    { time: '8:00 PM', title: 'Awards Ceremony', desc: 'Prizes and recognition' },
  ]

  return (
    <div ref={timelineRef} className="relative max-w-[600px] mx-auto py-8">
      {/* Vertical line */}
      <div
        className={`absolute left-6 top-0 bottom-0 w-[2px] bg-teal/30 timeline-line ${visible ? 'visible' : ''}`}
      />

      {items.map((item, i) => (
        <div
          key={item.time}
          className="relative pl-16 pb-10 last:pb-0"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(30px)',
            transition: `opacity 0.7s ease ${350 + i * 100}ms, transform 0.7s ease ${350 + i * 100}ms`,
          }}
        >
          {/* Dot */}
          <div
            className={`absolute left-[18px] top-1 w-4 h-4 rounded-full bg-teal border-2 border-white shadow-sm timeline-dot ${visible ? 'visible' : ''}`}
            style={{ transitionDelay: `${350 + i * 100}ms` }}
          />
          <div className="font-[family-name:var(--font-barlow)] font-semibold text-xs text-teal/70 tracking-[2px] uppercase mb-1">
            {item.time}
          </div>
          <div className="font-[family-name:var(--font-barlow-condensed)] font-bold text-xl text-navy uppercase mb-1">
            {item.title}
          </div>
          <p className="font-[family-name:var(--font-barlow)] text-sm text-navy/60">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Photo Card — scale-in with hover zoom                             */
/* ------------------------------------------------------------------ */
function PhotoCard({ src, alt, staggerIndex }: { src: string; alt: string; staggerIndex: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), staggerIndex * 120)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [staggerIndex])

  return (
    <div ref={cardRef} className={`photo-card-scale ${visible ? 'visible' : ''}`}>
      <div className="w-full h-[280px] rounded-xl relative overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover photo-card-img"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Poster Reveal                                                     */
/* ------------------------------------------------------------------ */
function PosterReveal() {
  const posterRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = posterRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={posterRef} className="flex justify-center mt-10">
      <div className={`w-full max-w-[480px] rounded-xl relative overflow-hidden shadow-[0_8px_40px_rgba(11,45,69,0.15)] poster-reveal ${visible ? 'visible' : ''}`}>
        <Image
          src="/images/festival-teaser.png"
          alt="International Fishing Festival 2026 poster"
          width={480}
          height={680}
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Location Section — GSAP stagger entrance                          */
/* ------------------------------------------------------------------ */
function LocationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = sectionRef.current
      if (!el) return
      const items = el.querySelectorAll('.location-item')
      if (items.length === 0) return

      gsap.from(items, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <div ref={sectionRef} className="grid grid-cols-3 gap-8 max-md:grid-cols-1 max-w-[900px] mx-auto mt-12">
      <div className="location-item text-center">
        <div className="text-3xl mb-3">📍</div>
        <div className="font-[family-name:var(--font-barlow-condensed)] font-bold text-lg text-navy uppercase mb-1">Location</div>
        <p className="font-[family-name:var(--font-barlow)] text-sm text-navy/60">San Juan, Puerto Rico</p>
      </div>
      <div className="location-item text-center">
        <div className="text-3xl mb-3">📅</div>
        <div className="font-[family-name:var(--font-barlow-condensed)] font-bold text-lg text-navy uppercase mb-1">Date</div>
        <p className="font-[family-name:var(--font-barlow)] text-sm text-navy/60">August 2026</p>
      </div>
      <div className="location-item text-center">
        <div className="text-3xl mb-3">🎣</div>
        <div className="font-[family-name:var(--font-barlow-condensed)] font-bold text-lg text-navy uppercase mb-1">Events</div>
        <p className="font-[family-name:var(--font-barlow)] text-sm text-navy/60">Tournaments, Music, Food & More</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Festival Page                                                     */
/* ------------------------------------------------------------------ */
export default function FestivalPage() {
  const t = useTranslations('pillars.festival')

  return (
    <>
      {/* Hero — image parallax + gradient shift + content stagger */}
      <InteriorHero
        imageSrc="/images/generated/event-festival.jpg"
        imageAlt="IFT Annual Festival"
        gradient="linear-gradient(135deg, var(--ift-navy) 0%, var(--ift-teal) 50%, var(--ift-turquoise) 100%)"
        gradientCycleDuration={12}
        overlayClass="bg-navy/60"
      >
        <div className="eyebrow text-white/70">August 2026 · San Juan</div>
        <h1 className="font-[family-name:var(--font-barlow-condensed)] font-black text-[68px] text-white uppercase leading-[1.0] tracking-tight max-md:text-[42px]">
          {t('heading')}
        </h1>
        <p className="font-[family-name:var(--font-barlow)] text-lg text-white/70 max-w-[560px] mt-4">
          {t('body')}
        </p>
        <div className="mt-6">
          <Link
            href="#"
            className="inline-block font-[family-name:var(--font-barlow)] font-semibold text-[13px] tracking-[1.5px] uppercase no-underline py-3.5 px-8 rounded bg-teal text-white border-2 border-teal transition-all duration-300 hover:bg-[#007a91] hover:border-[#007a91]"
          >
            Get Festival Updates →
          </Link>
        </div>
      </InteriorHero>

      {/* Content section with feature cards */}
      <section className="section-pad relative" style={{ background: 'linear-gradient(135deg, var(--sandy) 0%, #F5DBA3 50%, var(--gold) 100%)' }}>
        <div className="container">
          <div className="max-w-[700px]">
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
          </div>
        </div>
      </section>

      {/* Schedule timeline */}
      <section className="section-pad bg-white relative">
        <div className="container">
          <div className="eyebrow text-teal text-center mb-10">Festival Schedule</div>
          <ScheduleTimeline />
        </div>
      </section>

      {/* Photo gallery — scale-in cards with hover zoom */}
      <section className="section-pad bg-seafoam relative">
        <div className="container">
          <div className="eyebrow text-teal text-center mb-10">Festival Gallery</div>
          <div className="grid grid-cols-2 gap-5 mb-8 max-md:grid-cols-1">
            {[
              { src: '/images/festival-food.jpg', alt: 'Local food trucks and vendors' },
              { src: '/images/festival-artisan.jpg', alt: 'Artisan vendor showcasing goods' },
              { src: '/images/festival-crowd.jpg', alt: 'Festival crowd enjoying entertainment' },
              { src: '/images/festival-community.jpg', alt: 'Friends and families at the festival' },
            ].map((img, i) => (
              <PhotoCard key={img.src} src={img.src} alt={img.alt} staggerIndex={i} />
            ))}
          </div>

          {/* Festival teaser poster — reveal animation */}
          <PosterReveal />
        </div>
      </section>

      {/* Location section — GSAP stagger entrance */}
      <section className="section-pad bg-white relative">
        <div className="container">
          <div className="eyebrow text-teal text-center">Event Details</div>
          <LocationSection />
        </div>
      </section>
    </>
  )
}
