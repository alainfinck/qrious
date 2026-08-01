'use client'

import { Copy } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

export function CopyUrlClient({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full justify-start"
      onClick={async () => {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
    >
      <Copy className="mr-2 h-4 w-4" />
      {copied ? 'Copié !' : 'Copier l\'URL'}
    </Button>
  )
}
