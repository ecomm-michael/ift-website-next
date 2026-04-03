'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { ScrollReveal } from '@/components/scroll-reveal/scroll-reveal'
import { InteriorHero } from '@/components/interior-hero/interior-hero'
import { ParallaxImage } from '@/components/parallax-image/parallax-image'
import { basePath } from '@/lib/base-path'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const t = useTranslations('about')
  const teamSectionRef = useRef<HTMLElement>(null)
  const contactSectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = teamSectionRef.current
      if (!section) return

      // Team photos parallax — left floats up, right floats down
      const photos = section.querySelectorAll('.team-photo-parallax')
      if (photos[0]) {
        gsap.to(photos[0], {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: photos[0],
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
      if (photos[1]) {
        gsap.to(photos[1], {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: photos[1],
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    },
    { scope: teamSectionRef }
  )

  useGSAP(
    () => {
      const section = contactSectionRef.current
      if (!section) return

      // Contact items stagger — fade up from 30px, 120ms apart
      const items = section.querySelectorAll('.contact-item')
      if (items.length > 0) {
        gsap.from(items, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        })
      }
    },
    { scope: contactSectionRef }
  )

  return (
    <>
      {/* Hero with gradient shift animation */}
      <InteriorHero
        gradient="linear-gradient(135deg, var(--ift-navy) 0%, var(--ift-teal) 50%, var(--ift-turquoise) 100%)"
        gradientCycleDuration={14}
        overlayClass="bg-navy/30"
      >
        <div className="eyebrow text-white/70">{t('eyebrow')}</div>
        <h1 className="font-[family-name:var(--font-barlow-condensed)] font-black text-[68px] text-white uppercase leading-[1.0] tracking-tight max-md:text-[42px]">
          {t('heading')}
        </h1>
        <p className="font-[family-name:var(--font-barlow)] text-lg text-white/70 max-w-[560px] mt-4">
          {t('p1')}
        </p>
      </InteriorHero>

      {/* Story section — founders image with parallax */}
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
            {/* Founders image — entrance + scroll parallax */}
            <ParallaxImage
              src="/images/about-founders.jpg"
              alt="IFT Founders"
              yPercent={-8}
              scrub={1}
              heightClass="h-[480px]"
              entrance
            />
          </div>
        </div>
      </section>

      {/* Team section — photos with differential parallax */}
      <section className="bg-seafoam section-pad relative" ref={teamSectionRef}>
        <div className="container">
          <ScrollReveal>
            <div className="eyebrow text-teal text-center mb-10">Our Team</div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
            {/* Left photo — floats up */}
            <div className="team-photo-parallax w-full h-[340px] rounded-xl relative overflow-hidden" style={{ willChange: 'transform' }}>
              <ScrollReveal stagger={0}>
                <div className="w-full h-[340px] rounded-xl relative overflow-hidden">
                  <div className="absolute inset-[-15%] w-[130%] h-[130%]">
                    <img
                      src={`${basePath}/images/team-group.jpg`}
                      alt="IFT Team Group Photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
            {/* Right photo — floats down */}
            <div className="team-photo-parallax w-full h-[340px] rounded-xl relative overflow-hidden" style={{ willChange: 'transform' }}>
              <ScrollReveal stagger={1}>
                <div className="w-full h-[340px] rounded-xl relative overflow-hidden">
                  <div className="absolute inset-[-15%] w-[130%] h-[130%]">
                    <img
                      src={`${basePath}/images/team-bus.jpg`}
                      alt="IFT Team on the Road"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section with staggered items */}
      <section className="bg-white section-pad relative" ref={contactSectionRef}>
        <div className="container">
          <div className="eyebrow text-teal text-center mb-10">Get in Touch</div>
          <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1 max-w-[800px] mx-auto">
            <div className="contact-item text-center">
              <div className="text-3xl mb-3">📧</div>
              <div className="font-[family-name:var(--font-barlow-condensed)] font-bold text-lg text-navy uppercase mb-1">Email</div>
              <a href="mailto:info@iftpr.com" className="font-[family-name:var(--font-barlow)] text-sm text-teal no-underline hover:underline">info@iftpr.com</a>
            </div>
            <div className="contact-item text-center">
              <div className="text-3xl mb-3">📍</div>
              <div className="font-[family-name:var(--font-barlow-condensed)] font-bold text-lg text-navy uppercase mb-1">Location</div>
              <p className="font-[family-name:var(--font-barlow)] text-sm text-navy/60">San Juan, Puerto Rico</p>
            </div>
            <div className="contact-item text-center">
              <div className="text-3xl mb-3">📱</div>
              <div className="font-[family-name:var(--font-barlow-condensed)] font-bold text-lg text-navy uppercase mb-1">Social</div>
              <a href="#" className="font-[family-name:var(--font-barlow)] text-sm text-teal no-underline hover:underline">@iftpr</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
