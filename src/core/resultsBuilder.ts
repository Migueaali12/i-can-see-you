import type { EventStore, ClosedIncident } from "./eventStore"
import type { DetectionEvent } from "./detectionEngine"

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
    events: store.snapshot(),
    endedAt: Date.now(),
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
