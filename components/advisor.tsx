'use client'

import { motion } from 'framer-motion'
import { bubbleIn, EASE_OUT, fadeUp, viewportOnce } from './motion'
import { CHAT_TOPICS, useChat } from './chat-context'

const STEPS = [
  {
    n: '01',
    title: 'Décrivez votre expérience',
    text: 'Partagez vos envies, votre époque de prédilection et le niveau de frisson souhaité.',
  },
  {
    n: '02',
    title: 'Recommandations IA',
    text: 'Notre conseiller compose un itinéraire temporel sur-mesure en quelques secondes.',
  },
  {
    n: '03',
    title: 'Affinage & réservation',
    text: 'Ajustez chaque détail, puis confirmez votre départ vers le siècle choisi.',
  },
]

export function Advisor() {
  const { messages, sendTopic } = useChat()

  return (
    <section id="conseiller" className="relative px-6 py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 50% at 20% 50%, rgba(201,169,97,0.08), transparent 70%)',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        {/* left */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">
            Conseiller IA
          </p>
          <h2 className="text-balance font-heading text-4xl font-medium text-ivory sm:text-5xl">
            Votre itinéraire, façonné par l&apos;intelligence
          </h2>
          <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Un dialogue raffiné pour transformer vos rêves d&apos;histoire en un
            voyage temporel parfaitement orchestré.
          </p>

          <ol className="mt-10 space-y-6">
            {STEPS.map((step) => (
              <li key={step.n} className="flex gap-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/40 font-mono text-sm text-gold">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-medium text-ivory">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* right — mock chat */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.12 }}
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-panel shadow-2xl shadow-black/40">
            <div className="flex items-center gap-3 border-b border-border bg-panel-2/60 px-5 py-4 backdrop-blur">
              <span className="flex size-9 items-center justify-center rounded-full border border-gold/50 font-heading text-sm font-semibold text-gold">
                TT
              </span>
              <div>
                <p className="text-sm font-medium text-ivory">Conseiller temporel</p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-cretace" />
                  En ligne
                </p>
              </div>
            </div>

            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.2, delayChildren: 0.15 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex max-h-80 min-h-72 flex-col gap-4 overflow-y-auto px-5 py-6"
            >
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  variants={bubbleIn}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <p
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'rounded-br-sm bg-gold text-primary-foreground'
                        : 'rounded-bl-sm border border-border bg-panel-2 text-ivory'
                    }`}
                  >
                    {m.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <div className="border-t border-border px-5 py-4">
              <p className="mb-3 text-xs text-muted-foreground">Suggestions</p>
              <div className="flex flex-wrap gap-2">
                {CHAT_TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => sendTopic(topic.id)}
                    className="rounded-full border border-border px-3.5 py-1.5 text-xs text-ivory transition-colors hover:border-gold/60 hover:text-gold"
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
