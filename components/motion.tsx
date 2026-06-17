'use client'

import type { Variants } from 'framer-motion'

/** Natural, cinematic easing used across the site. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

/** Fade + rise, for section headings and standalone blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
}

/** Container that staggers its children on reveal. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
}

/** Card reveal: opacity 0 -> 1, translateY 40 -> 0. */
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
}

/** Chat bubble: fade + slide up from below. */
export const bubbleIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
}

/** Shared viewport config: trigger once, slightly inside the fold. */
export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -10% 0px' } as const
