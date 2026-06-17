'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeUp, viewportOnce } from './motion'
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
  const { messages, sendTopic, sendMessage } = useChat()
  const [input, setInput] = useState('')

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

          {/* LEFT */}
          <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              viewport={viewportOnce}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">
              Conseiller IA
            </p>

            <h2 className="font-heading text-4xl font-medium text-ivory sm:text-5xl">
              Votre itinéraire, façonné par l&apos;intelligence
            </h2>

            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Un dialogue raffiné pour transformer vos rêves d&apos;histoire en un voyage temporel parfaitement orchestré.
            </p>

            <ol className="mt-10 space-y-6">
              {STEPS.map((step) => (
                  <li key={step.n} className="flex gap-5">
                <span className="flex size-11 items-center justify-center rounded-full border border-gold/40 font-mono text-sm text-gold">
                  {step.n}
                </span>

                    <div>
                      <h3 className="font-heading text-xl font-medium text-ivory">
                        {step.title}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {step.text}
                      </p>
                    </div>
                  </li>
              ))}
            </ol>
          </motion.div>

          {/* CHAT */}
          <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              viewport={viewportOnce}
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-panel shadow-2xl shadow-black/40">

              {/* HEADER */}
              <div className="flex items-center gap-3 border-b border-border bg-panel-2/60 px-5 py-4">
              <span className="flex size-9 items-center justify-center rounded-full border border-gold/50 font-heading text-sm font-semibold text-gold">
                TT
              </span>

                <div>
                  <p className="text-sm font-medium text-ivory">
                    Conseiller temporel Æon
                  </p>
                  <p className="text-xs text-muted-foreground">En ligne</p>
                </div>
              </div>

              {/* MESSAGES */}
              <div className="flex h-80 flex-col gap-3 overflow-y-auto px-5 py-5">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`flex ${
                            m.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                      <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                              m.role === 'user'
                                  ? 'bg-gold text-black'
                                  : 'border border-border bg-panel-2 text-ivory'
                          }`}
                      >
                        {m.text}
                      </div>
                    </div>
                ))}
              </div>

              {/* INPUT */}
              <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!input.trim()) return
                    sendMessage(input)
                    setInput('')
                  }}
                  className="flex gap-2 border-t border-border p-4"
              >
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Décrivez votre voyage..."
                    className="flex-1 bg-transparent text-sm text-ivory outline-none"
                />

                <button className="text-sm text-gold">Envoyer</button>
              </form>

              {/* TOPICS */}
              <div className="border-t border-border px-5 py-4">
                <div className="flex flex-wrap gap-2">
                  {CHAT_TOPICS.map((topic) => (
                      <button
                          key={topic.id}
                          onClick={() => sendTopic(topic.id)}
                          className="rounded-full border border-border px-3 py-1 text-xs text-ivory hover:text-gold"
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