import type { SessionResults } from "@/core/resultsBuilder"
import type { DetectionSignal } from "@/core/detectionEngine"

export type Confidence = "high" | "medium" | "low"

export interface SeriesPoint {
  /** Milliseconds relative to session start. */
  t: number
  /** Attention level 0-100. */
  attention: number
}

export interface IncidentMarker {
  /** Milliseconds relative to session start. */
  t: number
  type: DetectionSignal
  confidence: Confidence
  /** Attention level at the moment of the incident. */
  attention: number
}

export interface AttentionSeries {
  points: SeriesPoint[]
  markers: IncidentMarker[]
  durationMs: number
}

/** Attention floor reached while an incident of a given confidence is active. */
const CONFIDENCE_FLOOR: Record<Confidence, number> = {
  high: 20,
  medium: 50,
  low: 70,
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

interface Interval {
  start: number
  end: number
  floor: number
}

export function buildAttentionSeries(results: SessionResults): AttentionSeries {
  const durationMs = results.sessionDurationMs

  if (!results.endedAt || durationMs <= 0) {
    return { points: [{ t: 0, attention: 100 }], markers: [], durationMs }
  }

  const sessionStart = results.endedAt - durationMs
  const sessionEnd = results.endedAt

  const intervals: Interval[] = []
  const markers: IncidentMarker[] = []

  for (const ev of results.events.closed) {
    const start = clamp(ev.startedAt, sessionStart, sessionEnd)
    const end = clamp(ev.startedAt + ev.durationMs, sessionStart, sessionEnd)
    if (end > start) {
      intervals.push({ start, end, floor: CONFIDENCE_FLOOR[ev.confidence] })
    }
    markers.push({
      t: start - sessionStart,
      type: ev.type,
      confidence: ev.confidence,
      attention: CONFIDENCE_FLOOR[ev.confidence],
    })
  }

  for (const ev of results.events.open) {
    const start = clamp(ev.startedAt, sessionStart, sessionEnd)
    const end = sessionEnd
    if (end > start) {
      intervals.push({ start, end, floor: CONFIDENCE_FLOOR[ev.confidence] })
    }
    markers.push({
      t: start - sessionStart,
      type: ev.type,
      confidence: ev.confidence,
      attention: CONFIDENCE_FLOOR[ev.confidence],
    })
  }

  intervals.sort((a, b) => a.start - b.start)
  markers.sort((a, b) => a.t - b.t)

  const merged: Interval[] = []
  for (const interval of intervals) {
    const last = merged[merged.length - 1]
    if (last && interval.start <= last.end) {
      last.end = Math.max(last.end, interval.end)
      last.floor = Math.min(last.floor, interval.floor)
    } else {
      merged.push({ ...interval })
    }
  }

  const points: SeriesPoint[] = [{ t: 0, attention: 100 }]
  for (const interval of merged) {
    const startMs = Math.max(0, interval.start - sessionStart)
    const endMs = Math.min(durationMs, interval.end - sessionStart)
    const last = points[points.length - 1]
    if (startMs > last.t) {
      points.push({ t: startMs, attention: 100 })
    }
    points.push({ t: startMs, attention: interval.floor })
    points.push({ t: endMs, attention: interval.floor })
  }

  const last = points[points.length - 1]
  if (last.t < durationMs) {
    points.push({ t: durationMs, attention: 100 })
  }

  return { points, markers, durationMs }
}
