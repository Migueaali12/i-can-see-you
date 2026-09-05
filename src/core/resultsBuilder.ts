import type { EventStore, ClosedIncident } from "./eventStore"
import type { DetectionEvent } from "./detectionEngine"
import { buildAttentionSamples } from "./attention"

export interface SessionResults {
  sessionDurationMs: number
  incidentCount: number
  totalDistractedMs: number
  longestIncidentMs: number
  attentionScore: number
  events: {
    open: DetectionEvent[]
    closed: ClosedIncident[]
  }
  /** Per-second attention samples (0-100), length ≈ duration/1s. */
  samples?: number[]
  endedAt: number
}

const RESULTS_KEY = "icsy_session_results:v1"

export function buildResults(
  store: EventStore,
  sessionDurationMs: number,
): SessionResults {
  const incidentCount = store.getIncidentCount()
  const totalDistractedMs = store.getTotalDistractedMs()
  const longestIncidentMs = store.getLongestIncidentMs()
  const events = store.snapshot()
  const endedAt = Date.now()

  // Base score: % of session spent in focus
  const distractedRatio = Math.min(
    totalDistractedMs / Math.max(sessionDurationMs, 1),
    1,
  )
  const rawScore = Math.round((1 - distractedRatio) * 100)
  // Additional penalty per incident (capped at 20 points)
  const incidentPenalty = Math.min(incidentCount * 3, 20)
  const attentionScore = Math.max(0, rawScore - incidentPenalty)

  return {
    sessionDurationMs,
    incidentCount,
    totalDistractedMs,
    longestIncidentMs,
    attentionScore,
    events,
    samples: buildAttentionSamples(events, sessionDurationMs, endedAt),
    endedAt,
  }
}

export function persistResults(results: SessionResults): void {
  try {
    sessionStorage.setItem(RESULTS_KEY, JSON.stringify(results))
  } catch {
    // localStorage unavailable — silently continue
  }
}

export function loadResults(): SessionResults | null {
  try {
    const raw = sessionStorage.getItem(RESULTS_KEY)
    return raw ? (JSON.parse(raw) as SessionResults) : null
  } catch {
    return null
  }
}

export function clearResults() {
  try {
    sessionStorage.removeItem(RESULTS_KEY)
  } catch {
    // ignore
  }
}
