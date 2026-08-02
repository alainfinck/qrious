import React, { type ReactNode } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Circle, G, Path, Rect } from 'react-native-svg'

import type { QrCornerDotStyle, QrCornerSquareStyle, QrDotStyle, QrFrameStyle } from '../lib/qr-style'
import { colors } from '../theme/colors'

const SIZE = 40

/** Mini SVG previews for module (dot) styles */
export function DotStyleIcon({ type, color = colors.slate900 }: { type: QrDotStyle; color?: string }) {
  const cells = [
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 1],
  ]
  const gap = 2
  const cell = (SIZE - gap * 3) / 4

  return (
    <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      {cells.map((row, r) =>
        row.map((on, c) => {
          if (!on) return null
          const x = c * (cell + gap)
          const y = r * (cell + gap)
          const key = `${r}-${c}`
          switch (type) {
            case 'dots':
              return (
                <Circle key={key} cx={x + cell / 2} cy={y + cell / 2} r={cell / 2.2} fill={color} />
              )
            case 'rounded':
              return (
                <Rect
                  key={key}
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
                <Rect
                  key={key}
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
                <Path
                  key={key}
                  d={`M${x + cell * 0.15} ${y} H${x + cell} V${y + cell * 0.85} Q${x + cell} ${y + cell} ${x + cell * 0.85} ${y + cell} H${x} V${y + cell * 0.15} Q${x} ${y} ${x + cell * 0.15} ${y} Z`}
                  fill={color}
                />
              )
            case 'classy-rounded':
              return (
                <Path
                  key={key}
                  d={`M${x + cell * 0.35} ${y} H${x + cell * 0.65} Q${x + cell} ${y} ${x + cell} ${y + cell * 0.35} V${y + cell * 0.65} Q${x + cell} ${y + cell} ${x + cell * 0.65} ${y + cell} H${x + cell * 0.35} Q${x} ${y + cell} ${x} ${y + cell * 0.65} V${y + cell * 0.35} Q${x} ${y} ${x + cell * 0.35} ${y} Z`}
                  fill={color}
                />
              )
            default:
              return <Rect key={key} x={x} y={y} width={cell} height={cell} fill={color} />
          }
        }),
      )}
    </Svg>
  )
}

/** Mini SVG for finder pattern outer (corners square) */
export function CornerSquareIcon({
  type,
  color = colors.slate900,
}: {
  type: QrCornerSquareStyle
  color?: string
}) {
  const s = SIZE
  const stroke = Math.max(4, s * 0.18)
  const inset = stroke / 2

  if (type === 'dot') {
    return (
      <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <Circle
          cx={s / 2}
          cy={s / 2}
          r={s / 2 - inset}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
        />
      </Svg>
    )
  }

  if (type === 'extra-rounded' || type === 'rounded') {
    const rx = type === 'extra-rounded' ? s * 0.28 : s * 0.16
    return (
      <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <Rect
          x={inset}
          y={inset}
          width={s - stroke}
          height={s - stroke}
          rx={rx}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
        />
      </Svg>
    )
  }

  if (type === 'dots') {
    return (
      <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {[0, 1, 2, 3, 4].flatMap((r) =>
          [0, 1, 2, 3, 4].map((c) => {
            const edge = r === 0 || r === 4 || c === 0 || c === 4
            if (!edge) return null
            const cell = s / 5
            return (
              <Circle
                key={`${r}-${c}`}
                cx={c * cell + cell / 2}
                cy={r * cell + cell / 2}
                r={cell * 0.35}
                fill={color}
              />
            )
          }),
        )}
      </Svg>
    )
  }

  if (type === 'classy' || type === 'classy-rounded') {
    return (
      <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <Path
          d={
            type === 'classy-rounded'
              ? `M${s * 0.25} ${inset} H${s - inset} V${s * 0.75} Q${s - inset} ${s - inset} ${s * 0.75} ${s - inset} H${inset} V${s * 0.25} Q${inset} ${inset} ${s * 0.25} ${inset} Z`
              : `M${inset} ${inset} H${s - inset} V${s * 0.72} L${s * 0.72} ${s - inset} H${inset} Z`
          }
          fill="none"
          stroke={color}
          strokeWidth={stroke}
        />
      </Svg>
    )
  }

  return (
    <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <Rect
        x={inset}
        y={inset}
        width={s - stroke}
        height={s - stroke}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
      />
    </Svg>
  )
}

/** Mini SVG for finder pattern inner (corners dot) */
export function CornerDotIcon({
  type,
  color = colors.slate900,
}: {
  type: QrCornerDotStyle
  color?: string
}) {
  const s = SIZE
  const pad = s * 0.22
  const inner = s - pad * 2

  if (type === 'dot' || type === 'dots' || type === 'extra-rounded') {
    return (
      <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <Circle cx={s / 2} cy={s / 2} r={inner / 2} fill={color} />
      </Svg>
    )
  }

  if (type === 'rounded' || type === 'classy-rounded') {
    return (
      <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <Rect x={pad} y={pad} width={inner} height={inner} rx={inner * 0.28} fill={color} />
      </Svg>
    )
  }

  if (type === 'classy') {
    return (
      <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <Path
          d={`M${pad + inner * 0.2} ${pad} H${pad + inner} V${pad + inner * 0.8} L${pad + inner * 0.8} ${pad + inner} H${pad} V${pad + inner * 0.2} Z`}
          fill={color}
        />
      </Svg>
    )
  }

  return (
    <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <Rect x={pad} y={pad} width={inner} height={inner} fill={color} />
    </Svg>
  )
}

type ShapeButtonProps = {
  selected: boolean
  label: string
  onPress: () => void
  children: ReactNode
}

export function ShapeButton({ selected, label, onPress, children }: ShapeButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      style={[styles.shapeBtn, selected && styles.shapeBtnActive]}
    >
      <View style={styles.shapeIconWrap}>{children}</View>
      <Text style={[styles.shapeLabel, selected && styles.shapeLabelActive]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  )
}

export function MiniQrMatrix({
  x,
  y,
  size,
  color = colors.slate900,
}: {
  x: number
  y: number
  size: number
  color?: string
}) {
  const c = size / 13
  const dots: [number, number][] = [
    [5, 0],
    [7, 0],
    [4, 1],
    [6, 1],
    [7, 1],
    [8, 1],
    [5, 2],
    [7, 2],
    [4, 3],
    [6, 3],
    [8, 3],
    [0, 4],
    [2, 4],
    [5, 4],
    [7, 4],
    [9, 4],
    [11, 4],
    [12, 4],
    [1, 5],
    [3, 5],
    [4, 5],
    [6, 5],
    [8, 5],
    [10, 5],
    [0, 6],
    [2, 6],
    [5, 6],
    [7, 6],
    [9, 6],
    [11, 6],
    [1, 7],
    [4, 7],
    [6, 7],
    [8, 7],
    [10, 7],
    [12, 7],
    [0, 8],
    [3, 8],
    [5, 8],
    [7, 8],
    [9, 8],
    [11, 8],
    [5, 9],
    [7, 9],
    [10, 9],
    [11, 9],
    [4, 10],
    [6, 10],
    [8, 10],
    [9, 10],
    [12, 10],
    [5, 11],
    [7, 11],
    [11, 11],
    [4, 12],
    [6, 12],
    [8, 12],
    [10, 12],
    [12, 12],
  ]

  const fSize = 4 * c
  const fStroke = c * 0.85
  const fInset = fStroke / 2
  const fInnerSize = 1.6 * c
  const fInnerOffset = 1.2 * c

  return (
    <G transform={`translate(${x}, ${y})`}>
      <Rect
        x={fInset}
        y={fInset}
        width={fSize - fStroke}
        height={fSize - fStroke}
        rx={c * 0.5}
        fill="none"
        stroke={color}
        strokeWidth={fStroke}
      />
      <Rect
        x={fInnerOffset}
        y={fInnerOffset}
        width={fInnerSize}
        height={fInnerSize}
        rx={c * 0.3}
        fill={color}
      />

      <Rect
        x={9 * c + fInset}
        y={fInset}
        width={fSize - fStroke}
        height={fSize - fStroke}
        rx={c * 0.5}
        fill="none"
        stroke={color}
        strokeWidth={fStroke}
      />
      <Rect
        x={9 * c + fInnerOffset}
        y={fInnerOffset}
        width={fInnerSize}
        height={fInnerSize}
        rx={c * 0.3}
        fill={color}
      />

      <Rect
        x={fInset}
        y={9 * c + fInset}
        width={fSize - fStroke}
        height={fSize - fStroke}
        rx={c * 0.5}
        fill="none"
        stroke={color}
        strokeWidth={fStroke}
      />
      <Rect
        x={fInnerOffset}
        y={9 * c + fInnerOffset}
        width={fInnerSize}
        height={fInnerSize}
        rx={c * 0.3}
        fill={color}
      />

      {dots.map(([col, row]) => (
        <Rect
          key={`${col}-${row}`}
          x={col * c + c * 0.08}
          y={row * c + c * 0.08}
          width={c * 0.84}
          height={c * 0.84}
          rx={c * 0.25}
          fill={color}
        />
      ))}
    </G>
  )
}

export function FrameStyleIcon({ style, selected }: { style: QrFrameStyle; selected: boolean }) {
  const fg = '#0f172a'
  const bg = '#ffffff'
  const accent = selected ? '#0f172a' : '#475569'

  switch (style) {
    case 'none':
      return (
        <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
          <Rect
            x={3}
            y={3}
            width={38}
            height={38}
            rx={8}
            stroke={selected ? '#ffffff' : fg}
            strokeWidth={2}
            strokeDasharray="3 3"
          />
          <MiniQrMatrix x={9} y={9} size={26} color={selected ? '#ffffff' : fg} />
        </Svg>
      )
    case 'bottom-text':
      return (
        <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
          <Rect x={4} y={2} width={36} height={40} rx={6} fill={accent} />
          <Rect x={7} y={5} width={30} height={28} rx={4} fill={bg} />
          <MiniQrMatrix x={10} y={7} size={24} color={fg} />
          <Rect x={14} y={35} width={16} height={4} rx={2} fill="#ffffff" />
        </Svg>
      )
    case 'top-text':
      return (
        <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
          <Rect x={4} y={2} width={36} height={40} rx={6} fill={accent} />
          <Rect x={7} y={11} width={30} height={28} rx={4} fill={bg} />
          <MiniQrMatrix x={10} y={13} size={24} color={fg} />
          <Rect x={14} y={5} width={16} height={4} rx={2} fill="#ffffff" />
        </Svg>
      )
    case 'balloon':
      return (
        <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
          <Path
            d="M 4 6 Q 4 2 8 2 L 36 2 Q 40 2 40 6 L 40 34 Q 40 38 36 38 L 26 38 L 22 43 L 18 38 L 8 38 Q 4 38 4 34 Z"
            fill={accent}
          />
          <Rect x={7} y={10} width={30} height={25} rx={4} fill={bg} />
          <MiniQrMatrix x={11} y={12} size={21} color={fg} />
          <Rect x={14} y={5} width={16} height={3} rx={1.5} fill="#ffffff" />
        </Svg>
      )
    case 'phone-mockup':
      return (
        <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
          <Rect x={8} y={2} width={28} height={40} rx={7} fill={accent} />
          <Rect x={10} y={6} width={24} height={32} rx={4} fill={bg} />
          <Rect x={14} y={9} width={16} height={4} rx={2} fill={accent} />
          <MiniQrMatrix x={12} y={15} size={20} color={fg} />
        </Svg>
      )
    case 'badge':
      return (
        <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
          <Circle cx={22} cy={4} r={2.5} fill={fg} opacity={0.6} />
          <Rect x={6} y={8} width={32} height={34} rx={6} fill={accent} />
          <Rect x={9} y={11} width={26} height={24} rx={4} fill={bg} />
          <MiniQrMatrix x={12} y={13} size={20} color={fg} />
          <Rect x={14} y={37} width={16} height={3} rx={1.5} fill="#ffffff" />
        </Svg>
      )
    case 'polaroid':
      return (
        <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
          <Rect x={5} y={3} width={34} height={38} rx={4} fill={accent} />
          <Rect x={8} y={6} width={28} height={26} rx={2} fill={bg} />
          <MiniQrMatrix x={11} y={8} size={22} color={fg} />
          <Rect x={14} y={34} width={16} height={3} rx={1.5} fill="#ffffff" />
        </Svg>
      )
    case 'simple-border':
      return (
        <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
          <Rect x={4} y={4} width={36} height={36} rx={6} stroke={accent} strokeWidth={3} fill="none" />
          <Rect x={8} y={8} width={28} height={28} rx={4} fill={bg} />
          <MiniQrMatrix x={11} y={10} size={22} color={fg} />
          <Rect x={14} y={32} width={16} height={4} rx={2} fill={accent} />
        </Svg>
      )
    case 'circle-frame':
      return (
        <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
          <Circle cx={22} cy={18} r={17} fill={accent} />
          <Circle cx={22} cy={18} r={14} fill={bg} />
          <MiniQrMatrix x={12} y={8} size={20} color={fg} />
          <Rect x={10} y={35} width={24} height={6} rx={3} fill={accent} />
          <Rect x={14} y={37} width={16} height={2} rx={1} fill="#ffffff" />
        </Svg>
      )
    case 'ticket':
      return (
        <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
          <Path
            d="M 4 3 Q 4 1 6 1 L 38 1 Q 40 1 40 3 L 40 20 C 37 20 37 24 40 24 L 40 41 Q 40 43 38 43 L 6 43 Q 4 43 4 41 L 4 24 C 7 24 7 20 4 20 Z"
            fill={accent}
          />
          <Rect x={7} y={4} width={30} height={28} rx={2} fill={bg} />
          <MiniQrMatrix x={10} y={6} size={24} color={fg} />
          <Rect x={14} y={36} width={16} height={3} rx={1.5} fill="#ffffff" />
        </Svg>
      )
    case 'ribbon':
      return (
        <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
          <Rect x={5} y={10} width={34} height={32} rx={4} fill={accent} />
          <Rect x={8} y={13} width={28} height={26} rx={2} fill={bg} />
          <MiniQrMatrix x={11} y={15} size={22} color={fg} />
          <Path d="M 4 2 L 40 2 L 36 6 L 40 10 L 4 10 L 8 6 Z" fill={accent} />
          <Rect x={14} y={4} width={16} height={3} rx={1.5} fill="#ffffff" />
        </Svg>
      )
    case 'arrow':
      return (
        <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
          <Rect x={5} y={2} width={34} height={32} rx={4} fill={accent} />
          <Rect x={8} y={5} width={28} height={26} rx={2} fill={bg} />
          <MiniQrMatrix x={11} y={7} size={22} color={fg} />
          <Path d="M 16 34 L 28 34 L 28 38 L 32 38 L 22 44 L 12 38 L 16 38 Z" fill={accent} />
        </Svg>
      )
  }
}

const styles = StyleSheet.create({
  shapeBtn: {
    width: '30%',
    minWidth: 72,
    flexGrow: 1,
    maxWidth: 110,
    alignItems: 'center',
    gap: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  shapeBtnActive: {
    backgroundColor: colors.slate900,
    borderColor: colors.slate900,
  },
  shapeIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shapeLabel: {
    maxWidth: 72,
    fontSize: 10,
    fontWeight: '600',
    color: colors.slate600,
    textAlign: 'center',
  },
  shapeLabelActive: {
    color: colors.white,
    fontWeight: '700',
  },
})
