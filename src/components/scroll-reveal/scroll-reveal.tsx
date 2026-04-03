'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  stagger?: number
  threshold?: number
}

export function ScrollReveal({
  children,
  className = '',
  stagger = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const IO = globalThis.IntersectionObserver as unknown as (
      cb: IntersectionObserverCallback,
      opts?: IntersectionObserverInit
    ) => { observe: (el: Element) => void; unobserve: (el: Element) => void; disconnect: () => void }

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (stagger > 0) {
            setTimeout(() => setVisible(true), stagger * 150)
          } else {
            setVisible(true)
          }
          observer.unobserve(entry.target)
        }
      })
    }

    // Support both constructor (real browser) and factory (test mock) call patterns
    let observer: ReturnType<typeof IO>
    try {
      observer = new (IO as unknown as new (
        cb: IntersectionObserverCallback,
        opts?: IntersectionObserverInit
      ) => ReturnType<typeof IO>)(callback, { threshold })
    } catch {
      observer = IO(callback, { threshold })
    }

    observer.observe(el)
    return () => observer.disconnect()
  }, [stagger, threshold])

  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  )
}
