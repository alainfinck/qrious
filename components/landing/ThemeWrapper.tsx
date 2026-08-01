import type { CSSProperties, ReactNode } from 'react'

import type { LandingPageTheme } from '@/types/landing-page'

const DEFAULT_PRIMARY = '#0f172a'

interface ThemeWrapperProps {
  theme?: LandingPageTheme | null
  children: ReactNode
}

export function ThemeWrapper({ theme, children }: ThemeWrapperProps) {
  const primaryColor = theme?.primaryColor?.trim() || DEFAULT_PRIMARY

  const style = {
    '--brand-primary': primaryColor,
    '--brand-primary-muted': `${primaryColor}14`,
  } as CSSProperties

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900" style={style}>
      {children}
    </div>
  )
}
