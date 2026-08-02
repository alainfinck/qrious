import { cn } from '@/lib/utils'

/** QR finder-pattern mark used next to the wordmark. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={cn(className)} aria-hidden>
      <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="2.2" />
      <rect x="5.5" y="5.5" width="5" height="5" fill="currentColor" />
      <rect x="18" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="2.2" />
      <rect x="21.5" y="5.5" width="5" height="5" fill="currentColor" />
      <rect x="2" y="18" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="2.2" />
      <rect x="5.5" y="21.5" width="5" height="5" fill="currentColor" />
      <rect x="18" y="18" width="5" height="5" fill="currentColor" />
      <rect x="25" y="18" width="5" height="5" fill="currentColor" />
      <rect x="18" y="25" width="5" height="5" fill="currentColor" />
      <rect x="24" y="24" width="6" height="6" fill="currentColor" />
    </svg>
  )
}
