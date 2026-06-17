'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cardReveal, EASE_OUT, fadeUp, staggerContainer, viewportOnce } from './motion'
import { useChat } from './chat-context'

type Era = {
  topic: 'paris' | 'cretace' | 'florence'
  title: string
  subtitle: string
  date: string
  description: string
  accent: string
  glow: string
  image: string
  imageAlt: string
}

const ERAS: Era[] = [
  {
    topic: 'paris',
    title: 'Paris, Belle Époque',
    subtitle: 'Paris 1889',
    date: '1889',
    description:
      "L'Exposition universelle dans toute sa splendeur, l'inauguration de la Tour Eiffel et les salons dorés d'une France au sommet de son art de vivre.",
    accent: 'text-paris',
    glow: 'rgba(74,120,201,0.18)',
    image: '/images/paris-1889.png',
    imageAlt:
      "Paris en 1889 lors de l'Exposition universelle, la Tour Eiffel dominant une foule en tenues d'époque sous une lumière dorée.",
  },
  {
    topic: 'cretace',
    title: 'Crétacé supérieur',
    subtitle: 'Ère des géants',
    date: '−66 000 000',
    description:
      'Une immersion scientifique au cœur d\u2019un monde sauvage. Observez la mégafaune depuis nos plateformes sécurisées : dangereux, spectaculaire, parfaitement maîtrisé.',
    accent: 'text-cretace',
    glow: 'rgba(90,143,107,0.18)',
    image: '/images/cretace.png',
    imageAlt:
      'Un Tyrannosaure rex sur un promontoire rocheux dominant une vallée préhistorique luxuriante au coucher de soleil.',
  },
  {
    topic: 'florence',
    title: 'Florence, Renaissance',
    subtitle: 'Florence 1504',
    date: '1504',
    description:
      "Le berceau de la Renaissance artistique. Ateliers des maîtres, cour des Médicis et dévoilement du David de Michel-Ange sous vos yeux.",
    accent: 'text-florence',
    glow: 'rgba(176,122,79,0.18)',
    image: '/images/florence-1504.jpg',
    imageAlt:
      'Florence à la Renaissance avec le Duomo de Brunelleschi, le David de Michel-Ange et des personnages en costumes d\u2019époque sur une piazza.',
  },
]

export function Eras() {
  const { openChat } = useChat()

  return (
    <section id="epoques" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">
            Destinations
          </p>
          <h2 className="text-balance font-heading text-4xl font-medium text-ivory sm:text-5xl">
            Choisissez votre siècle
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            Trois époques d&apos;exception, chacune restaurée avec une fidélité
            historique absolue et un confort résolument contemporain.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {ERAS.map((era) => (
            <motion.article
              key={era.topic}
              variants={cardReveal}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-panel shadow-lg shadow-black/10 transition-[border-color,box-shadow] duration-300 hover:border-gold/40 hover:shadow-2xl hover:shadow-black/40"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 z-10 size-48 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: era.glow }}
              />
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={era.image || "/placeholder.svg"}
                  alt={era.imageAlt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-panel via-panel/30 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <span className={`text-xs uppercase tracking-[0.25em] ${era.accent}`}>
                    {era.subtitle}
                  </span>
                  <span className="font-mono text-xs text-ivory/70">
                    {era.date}
                  </span>
                </div>
              </div>
              <div className="relative flex flex-1 flex-col p-7">
                <h3 className="font-heading text-2xl font-medium text-ivory">
                  {era.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {era.description}
                </p>
                <button
                  onClick={() => openChat(era.topic)}
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-gold transition-colors hover:text-gold-soft"
                >
                  Planifier ce voyage
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
