'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Nav() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { key: 'tournaments', href: '/tournaments' },
    { key: 'trips', href: '/trips' },
    { key: 'festival', href: '/festival' },
    { key: 'sponsors', href: '/sponsors' },
    { key: 'about', href: '/about' },
  ] as const

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-16 bg-white z-[1000] flex items-center px-10 transition-shadow duration-300 border-b ${
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
        <span className="font-[family-name:var(--font-barlow)] font-semibold text-[10px] tracking-[2.5px] text-navy/50 uppercase">
          International Fishing Team
        </span>
      </div>

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

      <div className="flex items-center gap-5 shrink-0">
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
    </nav>
  )
}
