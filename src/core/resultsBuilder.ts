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
    localStorage.setItem("icsy_session_results", JSON.stringify(results))
  } catch {
    // localStorage unavailable — silently continue
  }
}
