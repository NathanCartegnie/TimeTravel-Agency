'use client'

import { MessageCircle, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { EASE_OUT } from './motion'
import { CHAT_TOPICS, useChat } from './chat-context'

export function ChatWidget() {
    const { open, toggleChat, closeChat, messages, sendTopic, sendMessage } =
        useChat()

    const reduceMotion = useReducedMotion()
    const [input, setInput] = useState('')

    return (
        <>
            {/* PANEL */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 8 }}
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                        className="fixed bottom-24 right-5 z-50 w-[min(22rem,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-2xl border border-border bg-panel shadow-2xl shadow-black/50 backdrop-blur-xl"
                        role="dialog"
                    >
                        {/* HEADER */}
                        <div className="flex items-center justify-between border-b border-border bg-panel-2/60 px-4 py-3">
                            <p className="text-sm font-medium text-ivory">
                                Conseiller temporel Æon
                            </p>

                            <button onClick={closeChat}>
                                <X className="size-4" />
                            </button>
                        </div>

                        {/* MESSAGES */}
                        <div className="flex max-h-72 min-h-56 flex-col gap-3 overflow-y-auto px-4 py-4">
                            <AnimatePresence initial={false}>
                                {messages.map((m) => (
                                    <motion.div
                                        key={m.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${
                                            m.role === 'user' ? 'justify-end' : 'justify-start'
                                        }`}
                                    >
                                        <p
                                            className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                                                m.role === 'user'
                                                    ? 'bg-gold text-black'
                                                    : 'border border-border/60 bg-panel-2/70 text-ivory leading-relaxed'
                                            }`}
                                        >
                                            {m.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* TOPICS */}
                        <div className="border-t border-border px-4 py-3">
                            <div className="flex flex-wrap gap-2">
                                {CHAT_TOPICS.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => sendTopic(t.id)}
                                        className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-ivory transition-colors hover:border-gold hover:text-gold"
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* INPUT USER */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                if (!input.trim()) return
                                sendMessage(input)
                                setInput('')
                            }}
                            className="flex gap-2 border-t border-border p-3"
                        >
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Décrivez votre voyage..."
                                className="flex-1 bg-transparent text-sm text-ivory outline-none"
                            />

                            <button className="text-gold text-sm">Envoyer</button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FLOAT BUTTON */}
            <motion.button
                onClick={toggleChat}
                aria-label="chat"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-gold text-black"
            >
                {open ? <X /> : <MessageCircle />}
            </motion.button>
        </>
    )
}