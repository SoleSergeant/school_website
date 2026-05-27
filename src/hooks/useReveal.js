import { useEffect, useRef, useState } from 'react'

/* Respect OS-level reduced-motion preference */
const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * useReveal — attaches an IntersectionObserver to a ref.
 * Returns [ref, isVisible].  Once visible it stays visible (one-shot).
 */
export function useReveal(threshold = 0.08) {
  const ref = useRef(null)
  const [vis, setVis] = useState(reduced)   // skip animation if reduced-motion

  useEffect(() => {
    if (reduced()) { setVis(true); return }
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVis(true); io.unobserve(el) }
      },
      { threshold, rootMargin: '0px 0px -48px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return [ref, vis]
}

/**
 * fx(vis, delay?, dist?) — inline style object for fade-up entrance.
 * Uses ONLY opacity + transform (never width/height/top/left — avoids layout thrash).
 * Easing: cubic-bezier(.16,1,.3,1) = spring-like ease-out (fast start, smooth landing).
 * Duration: 550ms — editorial pace that reads as premium, not sluggish.
 */
export const fx = (vis, delay = 0, dist = 26) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? 'translateY(0)' : `translateY(${dist}px)`,
  transition: `opacity .55s cubic-bezier(.16,1,.3,1) ${delay}ms,
               transform .55s cubic-bezier(.16,1,.3,1) ${delay}ms`,
  willChange: vis ? 'auto' : 'opacity, transform',
})

/**
 * fxFade — simple fade-only (no vertical movement), for overlays / images.
 */
export const fxFade = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transition: `opacity .65s ease ${delay}ms`,
})
