'use client'

import type { ReactNode } from 'react'

import type { QrCornerDotStyle, QrCornerSquareStyle, QrDotStyle } from '@/lib/qr/style'
import { cn } from '@/lib/utils'

const SIZE = 40

/** Mini SVG previews for module (dot) styles */
export function DotStyleIcon({ type, color = 'currentColor' }: { type: QrDotStyle; color?: string }) {
  const cells = [
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 1],
  ]
  const gap = 2
  const cell = (SIZE - gap * 3) / 4

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden>
      {cells.map((row, r) =>
        row.map((on, c) => {
          if (!on) return null
          const x = c * (cell + gap)
          const y = r * (cell + gap)
          switch (type) {
            case 'dots':
              return (
                <circle
                  key={`${r}-${c}`}
                  cx={x + cell / 2}
                  cy={y + cell / 2}
                  r={cell / 2.2}
                  fill={color}
                />
              )
            case 'rounded':
              return (
                <rect
                  key={`${r}-${c}`}
                  x={x}
                  y={y}
                  width={cell}
                  height={cell}
                  rx={cell * 0.35}
                  fill={color}
                />
              )
            case 'extra-rounded':
              return (
                <rect
                  key={`${r}-${c}`}
                  x={x}
                  y={y}
                  width={cell}
                  height={cell}
                  rx={cell * 0.5}
                  fill={color}
                />
              )
            case 'classy':
              return (
                <path
                  key={`${r}-${c}`}
                  d={`M${x + cell * 0.15} ${y} H${x + cell} V${y + cell * 0.85} Q${x + cell} ${y + cell} ${x + cell * 0.85} ${y + cell} H${x} V${y + cell * 0.15} Q${x} ${y} ${x + cell * 0.15} ${y} Z`}
                  fill={color}
                />
              )
            case 'classy-rounded':
              return (
                <path
                  key={`${r}-${c}`}
                  d={`M${x + cell * 0.35} ${y} H${x + cell * 0.65} Q${x + cell} ${y} ${x + cell} ${y + cell * 0.35} V${y + cell * 0.65} Q${x + cell} ${y + cell} ${x + cell * 0.65} ${y + cell} H${x + cell * 0.35} Q${x} ${y + cell} ${x} ${y + cell * 0.65} V${y + cell * 0.35} Q${x} ${y} ${x + cell * 0.35} ${y} Z`}
                  fill={color}
                />
              )
            default:
              return (
                <rect key={`${r}-${c}`} x={x} y={y} width={cell} height={cell} fill={color} />
              )
          }
        }),
      )}
    </svg>
  )
}

/** Mini SVG for finder pattern outer (corners square) */
export function CornerSquareIcon({
  type,
  color = 'currentColor',
}: {
  type: QrCornerSquareStyle
  color?: string
}) {
  const s = SIZE
  const stroke = Math.max(4, s * 0.18)
  const inset = stroke / 2

  if (type === 'dot') {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
        <circle cx={s / 2} cy={s / 2} r={s / 2 - inset} fill="none" stroke={color} strokeWidth={stroke} />
      </svg>
    )
  }

  if (type === 'extra-rounded' || type === 'rounded') {
    const rx = type === 'extra-rounded' ? s * 0.28 : s * 0.16
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
        <rect
          x={inset}
          y={inset}
          width={s - stroke}
          height={s - stroke}
          rx={rx}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
        />
      </svg>
    )
  }

  if (type === 'dots') {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
        {[0, 1, 2, 3, 4].flatMap((r) =>
          [0, 1, 2, 3, 4].map((c) => {
            const edge = r === 0 || r === 4 || c === 0 || c === 4
            if (!edge) return null
            const cell = s / 5
            return (
              <circle
                key={`${r}-${c}`}
                cx={c * cell + cell / 2}
                cy={r * cell + cell / 2}
                r={cell * 0.35}
                fill={color}
              />
            )
          }),
        )}
      </svg>
    )
  }

  if (type === 'classy' || type === 'classy-rounded') {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
        <path
          d={
            type === 'classy-rounded'
              ? `M${s * 0.25} ${inset} H${s - inset} V${s * 0.75} Q${s - inset} ${s - inset} ${s * 0.75} ${s - inset} H${inset} V${s * 0.25} Q${inset} ${inset} ${s * 0.25} ${inset} Z`
              : `M${inset} ${inset} H${s - inset} V${s * 0.72} L${s * 0.72} ${s - inset} H${inset} Z`
          }
          fill="none"
          stroke={color}
          strokeWidth={stroke}
        />
      </svg>
    )
  }

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
      <rect
        x={inset}
        y={inset}
        width={s - stroke}
        height={s - stroke}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
      />
    </svg>
  )
}

/** Mini SVG for finder pattern inner (corners dot) */
export function CornerDotIcon({
  type,
  color = 'currentColor',
}: {
  type: QrCornerDotStyle
  color?: string
}) {
  const s = SIZE
  const pad = s * 0.22
  const inner = s - pad * 2

  if (type === 'dot' || type === 'dots' || type === 'extra-rounded') {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
        <circle cx={s / 2} cy={s / 2} r={inner / 2} fill={color} />
      </svg>
    )
  }

  if (type === 'rounded' || type === 'classy-rounded') {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
        <rect x={pad} y={pad} width={inner} height={inner} rx={inner * 0.28} fill={color} />
      </svg>
    )
  }

  if (type === 'classy') {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
        <path
          d={`M${pad + inner * 0.2} ${pad} H${pad + inner} V${pad + inner * 0.8} L${pad + inner * 0.8} ${pad + inner} H${pad} V${pad + inner * 0.2} Z`}
          fill={color}
        />
      </svg>
    )
  }

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden>
      <rect x={pad} y={pad} width={inner} height={inner} fill={color} />
    </svg>
  )
}

type ShapeButtonProps = {
  selected: boolean
  label: string
  onClick: () => void
  children: ReactNode
}

export function ShapeButton({ selected, label, onClick, children }: ShapeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={selected}
      className={cn(
        'flex flex-col items-center gap-1.5 rounded-xl border p-2 text-slate-600 transition-colors',
        selected
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:text-slate-900',
      )}
    >
      <span className={cn(selected ? 'text-white' : 'text-slate-700')}>{children}</span>
      <span className="max-w-[4.5rem] truncate text-[10px] font-medium leading-tight">{label}</span>
    </button>
  )
}
