'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useCallback, useEffect, useState } from 'react'

export function Nav() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const navLinks = [
    { key: 'tournaments', href: '/tournaments' },
    { key: 'trips', href: '/trips' },
    { key: 'festival', href: '/festival' },
    { key: 'sponsors', href: '/sponsors' },
    { key: 'about', href: '/about' },
  ] as const

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 h-16 bg-white z-[1000] flex items-center px-10 max-md:px-5 transition-shadow duration-300 border-b ${
          scrolled
            ? 'shadow-[0_2px_24px_rgba(11,45,69,0.1)] border-b-[rgba(11,45,69,0.12)]'
            : 'border-b-[rgba(11,45,69,0.08)]'
        }`}
      >
        <div className="flex items-baseline gap-2.5 shrink-0">
          <Link
            href="/"
            className="font-[family-name:var(--font-barlow-condensed)] font-black text-2xl text-navy no-underline tracking-tight"
          >
            IFT
          </Link>
          <span className="font-[family-name:var(--font-barlow)] font-semibold text-[10px] tracking-[2.5px] text-navy/50 uppercase max-sm:hidden">
            International Fishing Team
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="flex-1 flex justify-center gap-9 max-md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="font-[family-name:var(--font-barlow)] font-semibold text-[13px] text-navy no-underline tracking-[0.8px] uppercase transition-colors duration-200 hover:text-teal"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* Desktop CTA and language switcher */}
        <div className="flex items-center gap-5 shrink-0 max-md:hidden">
          <span className="font-[family-name:var(--font-barlow)] font-medium text-xs text-navy/45 tracking-[1px]">
            <span className="cursor-pointer hover:opacity-100 text-teal opacity-100">EN</span>
            {' | '}
            <span className="cursor-pointer hover:opacity-100">ES</span>
          </span>
          <Link
            href="/tournaments"
            className="font-[family-name:var(--font-barlow)] font-semibold text-xs tracking-[1.2px] uppercase bg-teal text-white py-2.5 px-5 rounded-full no-underline transition-colors duration-200 hover:bg-[#007a91]"
          >
            {t('register')}
          </Link>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="hidden max-md:flex flex-col justify-center items-center w-10 h-10 ml-auto gap-0 bg-transparent border-none cursor-pointer p-1"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span
            className="block w-6 h-[2px] bg-navy rounded-full transition-all duration-300 ease-in-out"
            style={{
              transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-6 h-[2px] bg-navy rounded-full transition-all duration-300 ease-in-out mt-[5px]"
            style={{
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-[2px] bg-navy rounded-full transition-all duration-300 ease-in-out mt-[5px]"
            style={{
              transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Dark overlay */}
      <div
        className="fixed inset-0 z-[999] bg-[rgba(11,45,69,0.45)] transition-opacity duration-[350ms] ease-in-out md:hidden"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Mobile drawer — slides in from right */}
      <div
        className="fixed top-16 right-0 bottom-0 w-[min(320px,85vw)] bg-white z-[1001] flex flex-col pt-8 px-8 pb-10 transition-transform duration-[350ms] md:hidden"
        style={{
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: mobileOpen ? '-8px 0 30px rgba(11,45,69,0.15)' : 'none',
        }}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={closeMobile}
              className="font-[family-name:var(--font-barlow)] font-semibold text-base text-navy no-underline tracking-[1px] uppercase transition-colors duration-200 hover:text-teal"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        <hr className="my-8 border-navy/10" />

        {/* Language switcher */}
        <span className="font-[family-name:var(--font-barlow)] font-medium text-sm text-navy/45 tracking-[1px] mb-6">
          <span className="cursor-pointer hover:opacity-100 text-teal opacity-100">EN</span>
          {' | '}
          <span className="cursor-pointer hover:opacity-100">ES</span>
        </span>

        {/* CTA */}
        <Link
          href="/tournaments"
          onClick={closeMobile}
          className="font-[family-name:var(--font-barlow)] font-semibold text-sm tracking-[1.2px] uppercase bg-teal text-white py-3 px-6 rounded-full no-underline text-center transition-colors duration-200 hover:bg-[#007a91]"
        >
          {t('register')}
        </Link>
      </div>
    </>
  )
}
