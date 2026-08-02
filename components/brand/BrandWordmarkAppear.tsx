'use client'

import { motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

type Props = {
  className?: string
  rainbow?: boolean
}

const QR = ['Q', 'R'] as const
const IOUS = ['i', 'o', 'u', 's'] as const

const PIXEL_SCALE = [0, 0.45, 0.45, 0.78, 0.78, 1.08, 1] as const
const PIXEL_TIMES = [0, 0.18, 0.32, 0.48, 0.62, 0.82, 1] as const

/**
 * Hero wordmark with a modular / pixel snap-in entrance.
 * “QR” pops on a stepped grid rhythm; “ious” follows softer.
 */
export function BrandWordmarkAppear({ className, rainbow = false }: Props) {
  const reduce = useReducedMotion()

  if (reduce) {
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

  return (
    <span className={cn('relative inline-flex items-baseline leading-none', className)}>
      <span className="sr-only">QRious</span>

      <span className="inline-flex items-baseline" aria-hidden>
        {QR.map((letter, i) => (
          <motion.span
            key={`qr-${letter}`}
            className={cn(
              'font-qr relative inline-block origin-bottom translate-y-[0.04em] text-[1.08em] font-bold leading-none tracking-[0.04em]',
              rainbow && 'mq-rainbow-text',
            )}
            initial={{ opacity: 0, scale: 0, filter: 'brightness(2.6)' }}
            animate={{
              opacity: 1,
              scale: [...PIXEL_SCALE],
              filter: 'brightness(1)',
            }}
            transition={{
              delay: 0.1 + i * 0.09,
              duration: 0.55,
              times: [...PIXEL_TIMES],
              ease: 'linear',
              opacity: { duration: 0.2, delay: 0.1 + i * 0.09 },
              filter: { duration: 0.5, delay: 0.1 + i * 0.09 },
            }}
          >
            <motion.span
              className="absolute left-1/2 top-1/2 -z-10 h-[0.85em] w-[0.85em] -translate-x-1/2 -translate-y-1/2 rounded-[0.1em]"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.3, 1.2, 1.6] }}
              transition={{ delay: 0.08 + i * 0.09, duration: 0.55, ease: 'easeOut' }}
              style={{
                background:
                  i === 0
                    ? 'radial-gradient(circle, rgba(18,196,168,0.65), transparent 72%)'
                    : 'radial-gradient(circle, rgba(61,187,255,0.55), transparent 72%)',
              }}
            />
            {letter}
          </motion.span>
        ))}
      </span>

      <span className="inline-flex items-baseline" aria-hidden>
        {IOUS.map((letter, i) => (
          <motion.span
            key={`ious-${letter}`}
            className={cn(
              'font-display inline-block origin-bottom font-bold leading-none tracking-tight',
              rainbow && 'mq-rainbow-text',
            )}
            initial={{ opacity: 0, y: 14, scale: 0.7, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{
              delay: 0.38 + i * 0.05,
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>

      {/* Pixel dust settling under the mark */}
      <span className="pointer-events-none absolute -bottom-3 left-1 flex gap-[3px]" aria-hidden>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <motion.span
            key={i}
            className="block h-1.5 w-1.5 rounded-[1px]"
            style={{
              backgroundColor:
                i % 4 === 0
                  ? '#12c4a8'
                  : i % 4 === 1
                    ? '#3dbbff'
                    : i % 4 === 2
                      ? '#ffc53d'
                      : '#ff5c4d',
            }}
            initial={{ opacity: 0, y: -10, scale: 0 }}
            animate={{ opacity: [0, 1, 0], y: [-10, 2, 10], scale: [0, 1, 0.4] }}
            transition={{
              delay: 0.2 + i * 0.035,
              duration: 0.75,
              ease: 'easeOut',
            }}
          />
        ))}
      </span>
    </span>
  )
}
