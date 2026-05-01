import type { DetectionEvent, DetectionSignal } from "./detectionEngine"

export interface ClosedIncident extends DetectionEvent {
  endedAt: number
  durationMs: number
}

export class EventStore {
  private openEvents = new Map<string, DetectionEvent>()
  private closedEvents: ClosedIncident[] = []

  add(event: DetectionEvent) {
    this.openEvents.set(event.id, event)
  }

  resolve(id: string, endedAt: number) {
    const event = this.openEvents.get(id)
    if (!event) return
    const durationMs = endedAt - event.startedAt
    this.closedEvents.push({ ...event, endedAt, durationMs })
    this.openEvents.delete(id)
  }

  getIncidentCount(): number {
    return this.closedEvents.length + this.openEvents.size
  }

  getTotalDistractedMs(): number {
    const closedMs = this.closedEvents.reduce((sum, e) => sum + e.durationMs, 0)
    const openMs = Array.from(this.openEvents.values()).reduce(
      (sum, e) => sum + (Date.now() - e.startedAt),
      0,
    )
    return closedMs + openMs
  }

  getLongestIncidentMs(): number {
    if (this.closedEvents.length === 0) return 0
    return Math.max(...this.closedEvents.map((e) => e.durationMs))
  }

  getCurrentSignal(): DetectionSignal | null {
    if (this.openEvents.size === 0) return null
    const latest = Array.from(this.openEvents.values()).sort(
      (a, b) => b.startedAt - a.startedAt,
    )[0]
    return latest?.type ?? null
  }

  snapshot() {
    return {
      open: Array.from(this.openEvents.values()),
      closed: [...this.closedEvents],
    }
  }
}
