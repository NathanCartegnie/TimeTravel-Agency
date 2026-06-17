'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { EASE_OUT } from './motion'
import { useChat } from './chat-context'

const NAV = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Époques', href: '#epoques' },
  { label: 'Conseiller IA', href: '#conseiller' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openChat } = useChat()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-background/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href="#accueil" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full border border-gold/50 font-heading text-base font-semibold tracking-wide text-gold">
            TT
          </span>
          <span className="font-heading text-lg font-medium tracking-wide text-ivory">
            TimeTravel Agency
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-ivory"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openChat()}
            className="hidden rounded-full border border-gold/60 px-5 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-primary-foreground md:inline-flex"
          >
            Réserver
          </button>
          <button
            type="button"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-ivory md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height] duration-300 md:hidden ${
          menuOpen ? 'max-h-72' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-ivory"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false)
              openChat()
            }}
            className="mt-2 rounded-full border border-gold/60 px-5 py-3 text-sm font-medium text-gold"
          >
            Réserver
          </button>
        </nav>
      </div>
    </motion.header>
  )
}
