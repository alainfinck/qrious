import { cn } from '@/lib/utils'

type BrandWordmarkProps = {
  className?: string
  /** Apply the brand rainbow gradient to the whole wordmark */
  rainbow?: boolean
}

/**
 * QRious wordmark — “QR” in a modular pixel face, “ious” in the display font.
 */
export function BrandWordmark({ className, rainbow = false }: BrandWordmarkProps) {
  return (
    <span className={cn('inline-flex items-baseline leading-none', className)}>
      <span
        className={cn(
          'font-qr translate-y-[0.04em] text-[1.08em] font-bold leading-none tracking-[0.04em]',
          rainbow && 'mq-rainbow-text',
        )}
      >
        QR
      </span>
      <span
        className={cn(
          'font-display font-bold leading-none tracking-tight',
          rainbow && 'mq-rainbow-text',
        )}
      >
        ious
      </span>
    </span>
  )
}
