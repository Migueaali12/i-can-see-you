import type { ClosedIncident } from "./eventStore"
import type { DetectionEvent } from "./detectionEngine"

export interface EventSnapshot {
  open: DetectionEvent[]
  closed: ClosedIncident[]
}

/** Attention floor reached while an incident of a given confidence is active. */
const CONFIDENCE_FLOOR: Record<DetectionEvent["confidence"], number> = {
  high: 20,
  medium: 50,
  low: 70,
}

/** Time it takes attention to linearly recover from an incident floor back to 100. */
const RECOVERY_MS = 4000

/** One attention sample per second of session. */
const SAMPLE_INTERVAL_MS = 1000

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

interface Interval {
  start: number
  end: number
  floor: number
}

/**
 * Derives a per-second attention series (0-100) from the raw incident
 * intervals. Attention sits at its confidence floor while an incident is
 * active, then linearly recovers to 100 over RECOVERY_MS. Overlapping
 * incidents take the minimum attention.
 */
export function buildAttentionSamples(
  events: EventSnapshot,
  sessionDurationMs: number,
  endedAt: number,
): number[] {
  if (!endedAt || sessionDurationMs <= 0) return [100]

  const sessionStart = endedAt - sessionDurationMs
  const sessionEnd = endedAt

  const intervals: Interval[] = []

  for (const ev of events.closed) {
    const start = clamp(ev.startedAt, sessionStart, sessionEnd)
    const end = clamp(ev.startedAt + ev.durationMs, sessionStart, sessionEnd)
    if (end > start) {
      intervals.push({ start, end, floor: CONFIDENCE_FLOOR[ev.confidence] })
    }
  }

  for (const ev of events.open) {
    const start = clamp(ev.startedAt, sessionStart, sessionEnd)
    if (sessionEnd > start) {
      intervals.push({ start, end: sessionEnd, floor: CONFIDENCE_FLOOR[ev.confidence] })
    }
  }

  const sampleCount = Math.floor(sessionDurationMs / SAMPLE_INTERVAL_MS) + 1
  const samples: number[] = []

  for (let i = 0; i < sampleCount; i++) {
    const t = clamp(sessionStart + i * SAMPLE_INTERVAL_MS, sessionStart, sessionEnd)
    let attention = 100

    for (const interval of intervals) {
      let level: number
      if (t >= interval.start && t <= interval.end) {
        level = interval.floor
      } else if (t > interval.end && t < interval.end + RECOVERY_MS) {
        const recovery = (t - interval.end) / RECOVERY_MS
        level = interval.floor + (100 - interval.floor) * recovery
      } else {
        continue
      }
      if (level < attention) attention = level
    }

    samples.push(Math.round(attention))
  }

  return samples
}
