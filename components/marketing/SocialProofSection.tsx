'use client'

import { useTranslations } from 'next-intl'
import { Building2, Contact, Palette, RefreshCw, Smartphone, Sparkles } from 'lucide-react'

import { Marquee } from '@/components/ui/marquee'
import { cn } from '@/lib/utils'

const items = [
  { icon: Palette, key: 'galeries' as const, tone: 'bg-mq-sun/25 text-mq-ink border-mq-sun/40' },
  {
    icon: Building2,
    key: 'immo' as const,
    tone: 'bg-mq-sky/20 text-mq-ink border-mq-sky/40',
  },
  {
    icon: Contact,
    key: 'vcard' as const,
    tone: 'bg-mq-signal/20 text-mq-ink border-mq-signal/40',
  },
  {
    icon: RefreshCw,
    key: 'dynamic' as const,
    tone: 'bg-mq-coral/15 text-mq-ink border-mq-coral/35',
  },
  {
    icon: Smartphone,
    key: 'mobile' as const,
    tone: 'bg-[#ffe8a3] text-mq-ink border-mq-sun/50',
  },
  {
    icon: Sparkles,
    key: 'whiteLabel' as const,
    tone: 'bg-[#d7f8ff] text-mq-ink border-mq-sky/45',
  },
]

export function SocialProofSection() {
  const t = useTranslations('SocialProof')

  return (
    <section className="relative overflow-hidden border-y border-mq-ink/5 bg-gradient-to-r from-mq-mist via-mq-paper to-[#fff4e8] py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-mq-mist to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#fff4e8] to-transparent" />

      <Marquee pauseOnHover className="[--duration:32s]">
        {items.map((item) => (
          <div
            key={item.key}
            className={cn(
              'mx-2 flex items-center gap-2.5 rounded-2xl border px-5 py-2.5 font-medium transition-transform hover:-rotate-1 hover:scale-105',
              item.tone,
            )}
          >
            <item.icon className="h-4 w-4" />
            <span className="text-sm">{t(item.key)}</span>
          </div>
        ))}
      </Marquee>
    </section>
  )
}
