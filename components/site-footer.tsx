'use client'

import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from './motion'

export function SiteFooter() {
  return (
    <motion.footer
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="border-t border-border px-6 py-14"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full border border-gold/50 font-heading text-base font-semibold text-gold">
              TT
            </span>
            <div>
              <p className="font-heading text-lg font-medium text-ivory">
                TimeTravel Agency
              </p>
              <p className="text-xs text-muted-foreground">
                Voyage temporel de luxe
              </p>
            </div>
          </div>

          <nav className="flex gap-7 text-sm text-muted-foreground">
            <a href="#accueil" className="transition-colors hover:text-ivory">
              Accueil
            </a>
            <a href="#epoques" className="transition-colors hover:text-ivory">
              Époques
            </a>
            <a href="#conseiller" className="transition-colors hover:text-ivory">
              Conseiller IA
            </a>
          </nav>
        </div>

        <div className="my-8 h-px w-full bg-border" />

        <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-muted-foreground md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} TimeTravel Agency. Tous siècles réservés.</p>
          <p className="italic">Maquette générée avec assistance IA.</p>
        </div>
      </div>
    </motion.footer>
  )
}
