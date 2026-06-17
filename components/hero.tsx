'use client'

import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { EASE_OUT } from './motion'
import { useChat } from './chat-context'

export function Hero() {
  const { openChat } = useChat()
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  // Very subtle parallax (max ~20px), almost imperceptible but premium.
  const gradientY = useTransform(scrollY, [0, 600], [0, 20])
  const ringsY = useTransform(scrollY, [0, 600], [0, -16])

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
  }

  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* radial gradient ambiance with subtle parallax */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduceMotion ? 0 : gradientY }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 32%, rgba(201,169,97,0.16), transparent 70%), radial-gradient(45% 40% at 78% 70%, rgba(74,120,201,0.12), transparent 70%)',
          }}
        />
      </motion.div>

      {/* orbital rings, slow continuous rotation + subtle parallax */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduceMotion ? 0 : ringsY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
          className="size-[680px] rounded-full border border-gold/10 sm:size-[820px]"
        />
        <motion.div
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 65, ease: 'linear', repeat: Infinity }}
          className="absolute inset-0 m-auto size-[480px] rounded-full border border-paris/15 sm:size-[600px]"
        />
        <motion.div
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
          className="absolute inset-0 m-auto size-[320px] rounded-full border border-gold/15 sm:size-[400px]"
        />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.p
          variants={item}
          className="mb-6 text-xs uppercase tracking-[0.35em] text-gold"
        >
          Voyage temporel de luxe
        </motion.p>
        <h1 className="text-balance font-heading text-5xl font-medium leading-[1.05] text-ivory sm:text-6xl md:text-7xl">
          <motion.span variants={item} className="block">
            Explorez l&apos;Histoire,
          </motion.span>
          <motion.span variants={item} className="block italic text-gold">
            Réinventée
          </motion.span>
        </h1>
        <motion.p
          variants={item}
          className="mx-auto mt-7 max-w-xl text-pretty leading-relaxed text-muted-foreground"
        >
          TimeTravel Agency orchestre des expéditions temporelles d&apos;exception.
          Franchissez les siècles avec un raffinement absolu, escorté par nos
          conseillers et protégé par une ingénierie sans compromis.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#epoques"
            whileHover={{ scale: 1.03, filter: 'brightness(1.06)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="inline-flex w-full items-center justify-center rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground sm:w-auto"
          >
            Découvrir les époques
          </motion.a>
          <motion.button
            onClick={() => openChat()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="inline-flex w-full items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-medium text-ivory transition-colors hover:border-gold/60 hover:text-gold sm:w-auto"
          >
            Parler à notre conseiller IA
          </motion.button>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#epoques"
        aria-label="Défiler vers les époques"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8, ease: EASE_OUT }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Défiler</span>
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
        >
          <ChevronDown className="size-5 text-gold" />
        </motion.span>
      </motion.a>
    </section>
  )
}
