'use client'

import { useState, useRef, useCallback, type ReactNode } from 'react'

interface AccordionItemData {
  trigger: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItemData[]
  className?: string
}

export function Accordion({ items, className = '' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = useCallback(
    (idx: number) => {
      setOpenIndex((prev) => (prev === idx ? null : idx))
    },
    []
  )

  return (
    <div
      className={`bg-white rounded-xl border border-navy/8 overflow-hidden ${className}`}
    >
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          trigger={item.trigger}
          isOpen={openIndex === i}
          isLast={i === items.length - 1}
          onToggle={() => toggle(i)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}

/* ── Individual accordion row ── */

interface AccordionItemProps {
  trigger: string
  isOpen: boolean
  isLast: boolean
  onToggle: () => void
  children: ReactNode
}

function AccordionItem({
  trigger,
  isOpen,
  isLast,
  onToggle,
  children,
}: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className={isLast ? '' : 'border-b border-navy/6'}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full bg-transparent border-none py-5 px-6 font-[family-name:var(--font-barlow)] font-semibold text-[16px] text-navy text-left cursor-pointer flex justify-between items-center transition-colors duration-200 hover:bg-seafoam"
      >
        <span>{trigger}</span>
        <span
          className="text-[20px] font-light text-navy/40 transition-transform duration-[350ms] ease-in-out inline-block"
          style={{
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>

      {/* Collapsible content */}
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{
          maxHeight: isOpen
            ? `${contentRef.current?.scrollHeight ?? 200}px`
            : '0px',
          transition:
            'max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease',
        }}
      >
        <div className="px-6 pb-5 text-[15px] text-navy/60 leading-relaxed font-[family-name:var(--font-barlow)]">
          {children}
        </div>
      </div>
    </div>
  )
}
