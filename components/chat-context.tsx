'use client'

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'

type Topic = 'paris' | 'cretace' | 'florence'

export type ChatMessage = {
  id: string
  role: 'bot' | 'user'
  text: string
}

type ChatContextValue = {
  open: boolean
  openChat: (topic?: Topic) => void
  closeChat: () => void
  toggleChat: () => void
  messages: ChatMessage[]
  sendTopic: (topic: Topic) => void
  sendMessage: (text: string) => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

const WELCOME: ChatMessage = {
  id: crypto.randomUUID(),
  role: 'bot',
  text:
      'Bonjour, je suis Æon, votre conseiller temporel. Décrivez votre voyage idéal ou choisissez une époque.',
}

const TOPIC_LABELS: Record<Topic, string> = {
  paris: 'Paris 1889',
  cretace: 'Crétacé supérieur',
  florence: 'Florence 1504',
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])

  // 🔹 appel IA (topics)
  const sendTopic = useCallback(async (topic: Topic) => {
    const text = TOPIC_LABELS[topic]

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'user',
        text,
      },
    ])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'bot',
          text: data.answer,
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'bot',
          text: "Perturbation temporelle… veuillez réessayer.",
        },
      ])
    }
  }, [])

  // 🔹 chat libre
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'user',
        text,
      },
    ])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'bot',
          text: data.answer ?? "Je n’ai pas de réponse.",
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'bot',
          text: "Connexion temporelle interrompue.",
        },
      ])
    }
  }, [])

  const openChat = useCallback(
      (topic?: Topic) => {
        setOpen(true)
        if (topic) setTimeout(() => sendTopic(topic), 200)
      },
      [sendTopic],
  )

  const closeChat = useCallback(() => setOpen(false), [])
  const toggleChat = useCallback(() => setOpen((o) => !o), [])

  return (
      <ChatContext.Provider
          value={{
            open,
            openChat,
            closeChat,
            toggleChat,
            messages,
            sendTopic,
            sendMessage,
          }}
      >
        {children}
      </ChatContext.Provider>
  )
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}

export const CHAT_TOPICS: { id: Topic; label: string }[] = [
  { id: 'paris', label: 'Paris 1889' },
  { id: 'cretace', label: 'Crétacé supérieur' },
  { id: 'florence', label: 'Florence 1504' },
]