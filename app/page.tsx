'use client'

import { MotionConfig } from 'framer-motion'
import { ChatProvider } from '@/components/chat-context'
import { ChatWidget } from '@/components/chat-widget'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Eras } from '@/components/eras'
import { Advisor } from '@/components/advisor'
import { SiteFooter } from '@/components/site-footer'
import {VideoShowcase} from "@/components/video-showcase";

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <ChatProvider>
        <SiteHeader />
        <main>
          <Hero />
          <VideoShowcase />
          <Eras />
          <Advisor />
        </main>
        <SiteFooter />
        <ChatWidget />
      </ChatProvider>
    </MotionConfig>
  )
}
