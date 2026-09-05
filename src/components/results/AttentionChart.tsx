import { useMemo, useState } from "react"
import type { MouseEvent } from "react"
import type { SessionResults } from "@/core/resultsBuilder"
import { buildAttentionSeries, type SeriesPoint } from "./attentionSeries"
import { formatTimerMs } from "./utils"
import { useTranslations } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

const W = 720
const H = 280
const PAD_L = 64
const PAD_R = 16
const PAD_T = 22
const PAD_B = 38
const PLOT_W = W - PAD_L - PAD_R
const PLOT_H = H - PAD_T - PAD_B

/** Vertical lane where floating incident markers live (monkeytype-style). */
const MARKER_Y = 11

const Y_TICKS = [100, 75, 50, 25, 0]

const AXIS_COLOR = "var(--color-outline)"
const GRID_COLOR = "var(--color-outline-variant)"
const LINE_COLOR = "var(--color-on-card)"
const LABEL_COLOR = "var(--color-secondary)"
const BODY_FONT = "var(--font-body)"

function xFor(tMs: number, durationMs: number): number {
  return PAD_L + (tMs / durationMs) * PLOT_W
}

function yFor(attention: number): number {
  return PAD_T + (1 - attention / 100) * PLOT_H
}

function buildLinePath(points: SeriesPoint[], durationMs: number): string {
  if (points.length === 0) return ""
  let d = `M ${xFor(points[0].t, durationMs).toFixed(1)} ${yFor(points[0].attention).toFixed(1)}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const cur = points[i]
    d += ` L ${xFor(cur.t, durationMs).toFixed(1)} ${yFor(prev.attention).toFixed(1)}`
    d += ` L ${xFor(cur.t, durationMs).toFixed(1)} ${yFor(cur.attention).toFixed(1)}`
  }
  return d
}

/** Catmull-Rom spline converted to cubic bezier segments (soft, no hard steps). */
function buildSmoothPath(points: SeriesPoint[], durationMs: number): string {
  if (points.length < 2) return buildLinePath(points, durationMs)
  const coords = points.map((p) => ({
    x: xFor(p.t, durationMs),
    y: yFor(p.attention),
  }))
  const n = coords.length
  let d = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`
  for (let i = 0; i < n - 1; i++) {
    const p0 = coords[Math.max(i - 1, 0)]
    const p1 = coords[i]
    const p2 = coords[i + 1]
    const p3 = coords[Math.min(i + 2, n - 1)]
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = clamp(p1.y + (p2.y - p0.y) / 6, PAD_T, PAD_T + PLOT_H)
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = clamp(p2.y - (p3.y - p1.y) / 6, PAD_T, PAD_T + PLOT_H)
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

function buildAreaPath(linePath: string, durationMs: number): string {
  if (!linePath) return ""
  const baseline = yFor(0).toFixed(1)
  const x0 = xFor(0, durationMs).toFixed(1)
  const x1 = xFor(durationMs, durationMs).toFixed(1)
  return `${linePath} L ${x1} ${baseline} L ${x0} ${baseline} Z`
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function nearestPoint(points: SeriesPoint[], tMs: number): SeriesPoint {
  let best = points[0]
  for (const p of points) {
    if (Math.abs(p.t - tMs) < Math.abs(best.t - tMs)) best = p
  }
  return best
}

/** Per-second points derived from pre-computed samples (new sessions). */
function pointsFromSamples(samples: number[], durationMs: number): SeriesPoint[] {
  return samples.map((attention, i) => ({
    t: Math.min(i * 1000, durationMs),
    attention,
  }))
}

interface AttentionChartProps {
  results: SessionResults
  lang?: Lang
}

interface HoverState {
  t: number
  attention: number
  x: number
  y: number
}

export default function AttentionChart({
  results,
  lang = "en",
}: AttentionChartProps) {
  const t = useTranslations(lang)

  // Samples mode (new sessions) vs step fallback (old results).
  const series = useMemo(() => buildAttentionSeries(results), [results])
  const durationMs = series.durationMs || 1

  const samples =
    results.samples && results.samples.length > 1 ? results.samples : null

  const points = useMemo(() => {
    if (samples) return pointsFromSamples(samples, durationMs)
    return series.points
  }, [samples, series.points, durationMs])

  const xTicks = useMemo(() => {
    const totalSec = Math.max(1, Math.round(durationMs / 1000))
    const step = totalSec <= 30 ? 5 : totalSec <= 90 ? 15 : 30
    const ticks: number[] = []
    for (let s = 0; s <= totalSec; s += step) ticks.push(s)
    if (ticks[ticks.length - 1] !== totalSec) ticks.push(totalSec)
    return ticks
  }, [durationMs])

  const linePath = useMemo(
    () => (samples ? buildSmoothPath(points, durationMs) : buildLinePath(points, durationMs)),
    [samples, points, durationMs],
  )
  const areaPath = useMemo(
    () => buildAreaPath(linePath, durationMs),
    [linePath, durationMs],
  )

  const [hover, setHover] = useState<HoverState | null>(null)

  const handleMove = (e: MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * W
    if (px < PAD_L || px > PAD_L + PLOT_W) {
      setHover(null)
      return
    }
    const tMs = ((px - PAD_L) / PLOT_W) * durationMs
    const nearest = nearestPoint(points, tMs)
    setHover({
      t: nearest.t,
      attention: nearest.attention,
      x: xFor(nearest.t, durationMs),
      y: yFor(nearest.attention),
    })
  }

  const hasIncidents = series.markers.length > 0

  return (
    <div className='relative'>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className='w-full h-auto block'
        role='img'
        aria-label={t('results.timelineTitle')}
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      >
        {/* Y gridlines */}
        {Y_TICKS.map((tick) => {
          const y = yFor(tick)
          return (
            <line
              key={tick}
              x1={PAD_L}
              y1={y}
              x2={PAD_L + PLOT_W}
              y2={y}
              stroke={GRID_COLOR}
              strokeWidth={1}
              strokeDasharray='4 6'
            />
          )
        })}

        {/* X tick marks */}
        {xTicks.map((sec) => {
          const x = xFor(sec * 1000, durationMs)
          return (
            <line
              key={sec}
              x1={x}
              y1={PAD_T + PLOT_H}
              x2={x}
              y2={PAD_T + PLOT_H + 6}
              stroke={AXIS_COLOR}
              strokeWidth={1.5}
            />
          )
        })}

        {/* Axes */}
        <line
          x1={PAD_L}
          y1={PAD_T}
          x2={PAD_L}
          y2={PAD_T + PLOT_H}
          stroke={AXIS_COLOR}
          strokeWidth={1.5}
        />
        <line
          x1={PAD_L}
          y1={PAD_T + PLOT_H}
          x2={PAD_L + PLOT_W}
          y2={PAD_T + PLOT_H}
          stroke={AXIS_COLOR}
          strokeWidth={1.5}
        />

        {/* Y labels: Focused / 50 / Distracted */}
        <text
          x={PAD_L - 10}
          y={yFor(100) + 4}
          textAnchor='end'
          fill={LABEL_COLOR}
          style={{ fontFamily: BODY_FONT, fontSize: 11 }}
        >
          {t('results.chartFocus')}
        </text>
        <text
          x={PAD_L - 10}
          y={yFor(50) + 4}
          textAnchor='end'
          fill={LABEL_COLOR}
          style={{ fontFamily: BODY_FONT, fontSize: 11 }}
        >
          50
        </text>
        <text
          x={PAD_L - 10}
          y={yFor(0) + 4}
          textAnchor='end'
          fill={LABEL_COLOR}
          style={{ fontFamily: BODY_FONT, fontSize: 11 }}
        >
          {t('results.chartDistracted')}
        </text>

        {/* X labels */}
        {xTicks.map((sec) => (
          <text
            key={sec}
            x={xFor(sec * 1000, durationMs)}
            y={H - PAD_B + 20}
            textAnchor='middle'
            fill={LABEL_COLOR}
            style={{ fontFamily: BODY_FONT, fontSize: 11 }}
          >
            {formatTimerMs(sec * 1000)}
          </text>
        ))}

        {/* Area fill under the line (fillOpacity is immune to the fade animation) */}
        <path d={areaPath} fill={LINE_COLOR} fillOpacity={0.05} className='chart-fade' />

        {/* Attention line (draw-in) */}
        <path
          d={linePath}
          fill='none'
          stroke={LINE_COLOR}
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
          pathLength={1}
          className='draw-line'
        />

        {/* Sample dots (monkeytype-style) */}
        {samples &&
          points.map((p, i) => (
            <circle
              key={`dot-${i}`}
              cx={xFor(p.t, durationMs)}
              cy={yFor(p.attention)}
              r={1.8}
              fill={LINE_COLOR}
              className='chart-fade'
            />
          ))}

        {/* Incident markers floating in the top lane */}
        {series.markers.map((m, i) => (
          <g
            key={`${m.type}-${i}`}
            className='chart-fade'
            transform={`translate(${xFor(m.t, durationMs)} ${MARKER_Y})`}
          >
            <line x1={-3} y1={-3} x2={3} y2={3} stroke={LINE_COLOR} strokeWidth={1.5} />
            <line x1={-3} y1={3} x2={3} y2={-3} stroke={LINE_COLOR} strokeWidth={1.5} />
          </g>
        ))}

        {/* Hover crosshair */}
        {hover && (
          <g pointerEvents='none'>
            <line
              x1={hover.x}
              y1={PAD_T}
              x2={hover.x}
              y2={PAD_T + PLOT_H}
              stroke={AXIS_COLOR}
              strokeWidth={1}
              strokeDasharray='3 4'
            />
            <circle cx={hover.x} cy={hover.y} r={4} fill={LINE_COLOR} />
          </g>
        )}

        {/* Empty state note */}
        {!hasIncidents && (
          <text
            x={PAD_L + PLOT_W / 2}
            y={PAD_T + PLOT_H / 2}
            textAnchor='middle'
            fill={LABEL_COLOR}
            style={{ fontFamily: BODY_FONT, fontSize: 12 }}
          >
            {t('results.chartNoIncidents')}
          </text>
        )}
      </svg>

      {/* Tooltip */}
      {hover && (
        <div
          className='absolute z-10 px-2 py-1 text-xs font-body whitespace-nowrap pointer-events-none bg-(--color-on-card) text-(--color-card) rounded'
          style={{
            left: `${(hover.x / W) * 100}%`,
            top: `${(hover.y / H) * 100}%`,
            transform: "translate(-50%, -140%)",
          }}
        >
          {formatTimerMs(hover.t)} · {t('results.chartAttention')} {hover.attention}%
        </div>
      )}
    </div>
  )
}
