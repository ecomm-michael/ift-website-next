'use client'

import { useRef, useState, useEffect } from 'react'

interface PriceCounterProps {
  /** Raw price string, e.g. "$850" or "$2,200" */
  value: string
  /** Duration of count-up in ms */
  duration?: number
  className?: string
}

/**
 * Animates a price from $0 up to the target value using requestAnimationFrame.
 * Triggers when the element enters the viewport via IntersectionObserver.
 * After counting, applies a turquoise→teal color flash.
 */
export function PriceCounter({
  value,
  duration = 800,
  className = '',
}: PriceCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [displayValue, setDisplayValue] = useState(value)
  const [counted, setCounted] = useState(false)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Parse the numeric target from the raw string
    const numStr = value.replace(/[^0-9]/g, '')
    const target = parseInt(numStr, 10)
    // Extract prefix (everything before first digit)
    const prefix = value.match(/^[^0-9]*/)?.[0] ?? ''
    // Extract suffix (everything after last digit)
    const suffix = value.match(/[^0-9]*$/)?.[0] ?? ''

    if (target <= 0) return

    // Initially show $0
    setDisplayValue(`${prefix}0${suffix}`)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStartedRef.current) {
            hasStartedRef.current = true
            observer.unobserve(entry.target)

            let startTime: number | null = null

            function countUp(ts: number) {
              if (!startTime) startTime = ts
              const progress = Math.min((ts - startTime) / duration, 1)
              const current = Math.floor(progress * target)
              setDisplayValue(`${prefix}${current.toLocaleString()}${suffix}`)

              if (progress < 1) {
                requestAnimationFrame(countUp)
              } else {
                // Ensure final value matches original formatting
                setDisplayValue(value)
                setCounted(true)
              }
            }

            requestAnimationFrame(countUp)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <div
      ref={ref}
      className={`${className} ${counted ? 'animate-[price-flash_0.6s_ease_forwards]' : ''}`}
    >
      {displayValue}
    </div>
  )
}
