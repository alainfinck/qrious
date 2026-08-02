import React, { useEffect, useMemo, useState } from 'react'
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native'
import Animated, {
  Easing,
  type SharedValue,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from 'react-native-svg'

import { Card } from './ui'
import { colors, spacing } from '../theme/colors'

type ChartMode = 'line' | 'bar'
type ActivityPoint = { day: string; scans: number }

const CHART_COLOR = colors.signal
const ACCENT_BG = '#FFF1EE'
const ACCENT_FG = '#C93A2A'
const GRID = colors.slate200
const TICK = colors.slate500
const CHART_HEIGHT = 240
const PAD = { top: 12, right: 12, bottom: 28, left: 36 }

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

function niceMax(value: number) {
  if (value <= 0) return 28
  const padded = value * 1.15
  const magnitude = 10 ** Math.floor(Math.log10(padded))
  const normalized = padded / magnitude
  const nice = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10
  return nice * magnitude
}

/** Monotone cubic Hermite → SVG path (Fritsch–Carlson). */
function buildMonotonePath(points: { x: number; y: number }[]) {
  if (points.length === 0) return ''
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`

  const n = points.length
  const dx: number[] = []
  const dy: number[] = []
  const m: number[] = []

  for (let i = 0; i < n - 1; i++) {
    dx[i] = points[i + 1].x - points[i].x
    dy[i] = points[i + 1].y - points[i].y
    m[i] = dy[i] / dx[i]
  }
  const slopes = [m[0]]
  for (let i = 1; i < n - 1; i++) {
    slopes[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2
  }
  slopes[n - 1] = m[n - 2]

  for (let i = 0; i < n - 1; i++) {
    if (Math.abs(m[i]) < 1e-8) {
      slopes[i] = 0
      slopes[i + 1] = 0
    } else {
      const a = slopes[i] / m[i]
      const b = slopes[i + 1] / m[i]
      const s = a * a + b * b
      if (s > 9) {
        const t = 3 / Math.sqrt(s)
        slopes[i] = t * a * m[i]
        slopes[i + 1] = t * b * m[i]
      }
    }
  }

  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < n - 1; i++) {
    const p0 = points[i]
    const p1 = points[i + 1]
    const cp1x = p0.x + dx[i] / 3
    const cp1y = p0.y + (slopes[i] * dx[i]) / 3
    const cp2x = p1.x - dx[i] / 3
    const cp2y = p1.y - (slopes[i + 1] * dx[i]) / 3
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`
  }
  return d
}

function estimatePathLength(points: { x: number; y: number }[]) {
  let len = 0
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x
    const dy = points[i].y - points[i - 1].y
    len += Math.hypot(dx, dy)
  }
  return len * 1.15
}

function ModeToggle({ mode, onChange }: { mode: ChartMode; onChange: (m: ChartMode) => void }) {
  return (
    <View style={styles.toggle}>
      <Pressable
        onPress={() => onChange('line')}
        style={[styles.toggleBtn, mode === 'line' && styles.toggleBtnActive]}
      >
        <Text style={[styles.toggleLabel, mode === 'line' && styles.toggleLabelActive]}>Ligne</Text>
      </Pressable>
      <Pressable
        onPress={() => onChange('bar')}
        style={[styles.toggleBtn, mode === 'bar' && styles.toggleBtnActive]}
      >
        <Text style={[styles.toggleLabel, mode === 'bar' && styles.toggleLabelActive]}>Barres</Text>
      </Pressable>
    </View>
  )
}

function LineChartSvg({
  data,
  width,
  height,
  yMax,
}: {
  data: ActivityPoint[]
  width: number
  height: number
  yMax: number
}) {
  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const progress = useSharedValue(0)
  const fillOpacity = useSharedValue(0)

  const points = useMemo(
    () =>
      data.map((d, i) => ({
        x: PAD.left + (data.length === 1 ? plotW / 2 : (i / (data.length - 1)) * plotW),
        y: PAD.top + plotH - (d.scans / yMax) * plotH,
        label: d.day,
        value: d.scans,
      })),
    [data, plotW, plotH, yMax],
  )

  const linePath = useMemo(() => buildMonotonePath(points), [points])
  const areaPath = useMemo(() => {
    if (!points.length) return ''
    const baseY = PAD.top + plotH
    return `${linePath} L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`
  }, [linePath, points, plotH])
  const pathLength = useMemo(() => estimatePathLength(points), [points])

  useEffect(() => {
    progress.value = 0
    fillOpacity.value = 0
    progress.value = withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) })
    fillOpacity.value = withDelay(280, withTiming(1, { duration: 520, easing: Easing.out(Easing.quad) }))
  }, [data, fillOpacity, progress])

  const lineProps = useAnimatedProps(() => ({
    strokeDashoffset: pathLength * (1 - progress.value),
  }))

  const areaProps = useAnimatedProps(() => ({
    opacity: fillOpacity.value * 0.95,
  }))

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(yMax * t))

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="5%" stopColor={CHART_COLOR} stopOpacity={0.35} />
          <Stop offset="95%" stopColor={CHART_COLOR} stopOpacity={0.02} />
        </LinearGradient>
      </Defs>

      {ticks.map((tick) => {
        const y = PAD.top + plotH - (tick / yMax) * plotH
        return (
          <G key={`g-${tick}`}>
            <Line
              x1={PAD.left}
              y1={y}
              x2={width - PAD.right}
              y2={y}
              stroke={GRID}
              strokeDasharray="3 3"
              strokeWidth={1}
            />
            <SvgText x={PAD.left - 8} y={y + 4} fill={TICK} fontSize={11} fontWeight="500" textAnchor="end">
              {tick}
            </SvgText>
          </G>
        )
      })}

      <AnimatedPath animatedProps={areaProps} d={areaPath} fill="url(#scanGradient)" />
      <AnimatedPath
        animatedProps={lineProps}
        d={linePath}
        fill="none"
        stroke={CHART_COLOR}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={`${pathLength} ${pathLength}`}
      />

      {points.map((p, i) => (
        <AnimatedDot key={p.label} cx={p.x} cy={p.y} delay={180 + i * 70} />
      ))}

      {points.map((p) => (
        <SvgText
          key={`lbl-${p.label}`}
          x={p.x}
          y={height - 8}
          fill={TICK}
          fontSize={12}
          fontWeight="500"
          textAnchor="middle"
        >
          {p.label}
        </SvgText>
      ))}
    </Svg>
  )
}

function AnimatedDot({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  const scale = useSharedValue(0)
  useEffect(() => {
    scale.value = 0
    scale.value = withDelay(delay, withTiming(1, { duration: 320, easing: Easing.out(Easing.back(1.4)) }))
  }, [cx, cy, delay, scale])

  const props = useAnimatedProps(() => ({
    r: 4 * scale.value,
    opacity: scale.value,
  }))

  return <AnimatedCircle animatedProps={props} cx={cx} cy={cy} fill={CHART_COLOR} />
}

function BarChartSvg({
  data,
  width,
  height,
  yMax,
}: {
  data: ActivityPoint[]
  width: number
  height: number
  yMax: number
}) {
  const plotW = width - PAD.left - PAD.right
  const plotH = height - PAD.top - PAD.bottom
  const gap = 10
  const barW = Math.max(8, (plotW - gap * (data.length - 1)) / data.length)
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = 0
    progress.value = withTiming(1, { duration: 780, easing: Easing.out(Easing.cubic) })
  }, [data, progress])

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(yMax * t))

  return (
    <Svg width={width} height={height}>
      {ticks.map((tick) => {
        const y = PAD.top + plotH - (tick / yMax) * plotH
        return (
          <G key={`bg-${tick}`}>
            <Line
              x1={PAD.left}
              y1={y}
              x2={width - PAD.right}
              y2={y}
              stroke={GRID}
              strokeDasharray="3 3"
              strokeWidth={1}
            />
            <SvgText x={PAD.left - 8} y={y + 4} fill={TICK} fontSize={11} fontWeight="500" textAnchor="end">
              {tick}
            </SvgText>
          </G>
        )
      })}

      {data.map((d, i) => {
        const x = PAD.left + i * (barW + gap)
        const fullH = (d.scans / yMax) * plotH
        return (
          <AnimatedBar
            key={d.day}
            x={x}
            baseY={PAD.top + plotH}
            fullHeight={fullH}
            width={barW}
            progress={progress}
            delay={i * 55}
          />
        )
      })}

      {data.map((d, i) => {
        const x = PAD.left + i * (barW + gap) + barW / 2
        return (
          <SvgText
            key={`bl-${d.day}`}
            x={x}
            y={height - 8}
            fill={TICK}
            fontSize={12}
            fontWeight="500"
            textAnchor="middle"
          >
            {d.day}
          </SvgText>
        )
      })}
    </Svg>
  )
}

function topRoundedBarPath(x: number, topY: number, w: number, h: number, r = 6) {
  'worklet'
  if (h <= 0) return `M ${x} ${topY} Z`
  const radius = Math.min(r, w / 2, h)
  const bottom = topY + h
  return [
    `M ${x} ${bottom}`,
    `L ${x} ${topY + radius}`,
    `Q ${x} ${topY} ${x + radius} ${topY}`,
    `L ${x + w - radius} ${topY}`,
    `Q ${x + w} ${topY} ${x + w} ${topY + radius}`,
    `L ${x + w} ${bottom}`,
    'Z',
  ].join(' ')
}

function AnimatedBar({
  x,
  baseY,
  fullHeight,
  width,
  progress,
  delay,
}: {
  x: number
  baseY: number
  fullHeight: number
  width: number
  progress: SharedValue<number>
  delay: number
}) {
  const local = useSharedValue(0)

  useEffect(() => {
    local.value = 0
    local.value = withDelay(delay, withTiming(1, { duration: 650, easing: Easing.out(Easing.cubic) }))
  }, [delay, fullHeight, local])

  const props = useAnimatedProps(() => {
    const t = Math.min(1, progress.value) * local.value
    const h = Math.max(0, fullHeight * t)
    return {
      d: topRoundedBarPath(x, baseY - h, width, h, 6),
    }
  })

  return <AnimatedPath animatedProps={props} fill={CHART_COLOR} />
}

export function ActivityChart({
  data,
  style,
}: {
  data: ActivityPoint[]
  style?: StyleProp<ViewStyle>
}) {
  const [mode, setMode] = useState<ChartMode>('line')
  const [width, setWidth] = useState(0)
  const yMax = useMemo(() => niceMax(Math.max(...data.map((d) => d.scans), 1)), [data])

  const onLayout = (e: LayoutChangeEvent) => {
    const next = Math.floor(e.nativeEvent.layout.width)
    if (next > 0 && next !== width) setWidth(next)
  }

  return (
    <Card style={StyleSheet.flatten([styles.card, style])}>
      <View style={styles.header}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={styles.title}>Activité récente</Text>
          <Text style={styles.subtitle}>Nombre de scans par jour cette semaine</Text>
        </View>
        <ModeToggle mode={mode} onChange={setMode} />
      </View>

      <View style={styles.chartWrap} onLayout={onLayout}>
        {width > 0 ? (
          mode === 'line' ? (
            <LineChartSvg key="line" data={data} width={width} height={CHART_HEIGHT} yMax={yMax} />
          ) : (
            <BarChartSvg key="bar" data={data} width={width} height={CHART_HEIGHT} yMax={yMax} />
          )
        ) : (
          <View style={{ height: CHART_HEIGHT }} />
        )}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: { flex: 1.4, minWidth: 280, gap: 4 },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  title: { fontSize: 18, fontWeight: '700', color: colors.ink, letterSpacing: -0.3 },
  subtitle: { marginTop: 4, fontSize: 13, color: colors.slate500, fontWeight: '500' },
  toggle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 3,
    backgroundColor: colors.white,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toggleBtnActive: {
    backgroundColor: ACCENT_BG,
  },
  toggleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.slate600,
  },
  toggleLabelActive: {
    color: ACCENT_FG,
  },
  chartWrap: {
    width: '100%',
    minHeight: CHART_HEIGHT,
  },
})
