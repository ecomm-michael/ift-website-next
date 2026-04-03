'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')

  return (
    <footer className="bg-white border-t border-[rgba(11,45,69,0.08)] pt-[72px]">
      <div className="container">
        <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 pb-12 max-md:grid-cols-2">
          <div>
            <div className="font-[family-name:var(--font-barlow-condensed)] font-black text-[22px] text-navy mb-2">
              IFT
            </div>
            <p className="font-[family-name:var(--font-barlow)] text-sm text-navy/50 mb-5 leading-relaxed whitespace-pre-line">
              {t('tagline')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-seafoam flex items-center justify-center transition-colors duration-200 hover:bg-teal hover:text-white text-navy" title="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-seafoam flex items-center justify-center transition-colors duration-200 hover:bg-teal hover:text-white text-navy" title="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-seafoam flex items-center justify-center transition-colors duration-200 hover:bg-teal hover:text-white text-navy" title="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-barlow)] font-semibold text-xs tracking-[2px] uppercase text-navy mb-5">
              {t('navigate')}
            </h4>
            {(['tournaments', 'trips', 'festival', 'sponsors', 'about'] as const).map((key) => (
              <Link key={key} href={`/${key}`} className="block font-[family-name:var(--font-barlow)] text-sm text-navy/55 no-underline mb-3 transition-colors duration-200 hover:text-teal">
                {nav(key)}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-barlow)] font-semibold text-xs tracking-[2px] uppercase text-navy mb-5">
              {t('legal')}
            </h4>
            <a href="#" className="block font-[family-name:var(--font-barlow)] text-sm text-navy/55 no-underline mb-3 transition-colors duration-200 hover:text-teal">{t('privacy')}</a>
            <a href="#" className="block font-[family-name:var(--font-barlow)] text-sm text-navy/55 no-underline mb-3 transition-colors duration-200 hover:text-teal">{t('terms')}</a>
            <a href="#" className="block font-[family-name:var(--font-barlow)] text-sm text-navy/55 no-underline mb-3 transition-colors duration-200 hover:text-teal">{t('cookies')}</a>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-barlow)] font-semibold text-xs tracking-[2px] uppercase text-navy mb-5">
              {t('contact')}
            </h4>
            <a href="mailto:info@iftpr.com" className="block font-[family-name:var(--font-barlow)] text-sm text-navy/55 no-underline mb-3 transition-colors duration-200 hover:text-teal">info@iftpr.com</a>
            <a href="#" className="block font-[family-name:var(--font-barlow)] text-sm text-navy/55 no-underline mb-3 transition-colors duration-200 hover:text-teal">San Juan, Puerto Rico</a>
          </div>
        </div>

        <div className="border-t border-[rgba(11,45,69,0.08)] py-5 text-center font-[family-name:var(--font-barlow)] text-[13px] text-navy/40">
          {t('copyright')}
        </div>
      </div>
    </footer>
  )
}
