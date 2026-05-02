import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react"
import {
  DetectionEngine,
  type DetectionSignal,
  type DetectionEvent,
} from "@/core/detectionEngine"
import { EventStore } from "@/core/eventStore"
import { MascotController, DEFAULT_MESSAGE } from "@/core/mascotController"
import { buildResults, persistResults } from "@/core/resultsBuilder"

// ── Types ─────────────────────────────────────────────────────────
export type Phase = "idle" | "running" | "finished"
export type FocusStatus = "in_focus" | "out_of_focus" | "event_detected"
export type Expression = "neutral" | "suspicious" | "annoyed"

const SESSION_DURATION = 60

// ── Hook ──────────────────────────────────────────────────────────
export function useActiveSession() {
  const [phase, setPhase] = useState<Phase>("idle")
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION)
  const [incidentCount, setIncidentCount] = useState(0)
  const [currentSignal, setCurrentSignal] = useState<DetectionSignal | null>(
    null,
  )
  const [focusStatus, setFocusStatus] = useState<FocusStatus>("in_focus")
  const [mascotMessage, setMascotMessage] = useState(DEFAULT_MESSAGE)
  const [mascotExpression, setMascotExpression] = useState<Expression>("neutral")

  // ── Refs (transient values that don't need re-render) ─────────────
  // (rerender-use-ref-transient-values)
  const storeRef = useRef(new EventStore())
  const mascotRef = useRef(new MascotController(4000))
  const engineRef = useRef<DetectionEngine | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeLeftRef = useRef(SESSION_DURATION)
  const mascotMessageRef = useRef(DEFAULT_MESSAGE)

  // Sync ref to avoid stale closure inside callbacks
  mascotMessageRef.current = mascotMessage

  // ── Unified session close ──────────────────────────────────────────
  // Single function used by both manual stop and natural timer end,
  // eliminating the duplicated buildResults + persistResults + redirect.
  const finalizeSession = useCallback((elapsedMs: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
    engineRef.current?.stop()
    engineRef.current = null

    const results = buildResults(storeRef.current, elapsedMs)
    persistResults(results)
    setPhase("finished")
    setTimeout(() => {
      window.location.href = "/result"
    }, 900)
  }, [])

  // ── Event handlers ────────────────────────────────────────────────
  const handleEventStart = useCallback((event: DetectionEvent) => {
    storeRef.current.add(event)
    const { type: signal } = event

    setCurrentSignal(signal)
    setIncidentCount(storeRef.current.getIncidentCount())

    if (signal === "blur" || signal === "visibility") {
      setFocusStatus("out_of_focus")
      setMascotExpression("annoyed")
    } else {
      setFocusStatus("event_detected")
      setMascotExpression("suspicious")
    }

    const msg = mascotRef.current.resolveMessage(signal, mascotMessageRef.current)
    mascotMessageRef.current = msg
    setMascotMessage(msg)
  }, [])

  const handleEventEnd = useCallback((id: string, endedAt: number) => {
    storeRef.current.resolve(id, endedAt)
    const remaining = storeRef.current.getCurrentSignal()

    setCurrentSignal(remaining)
    setIncidentCount(storeRef.current.getIncidentCount())

    if (!remaining) {
      setFocusStatus("in_focus")
      setMascotExpression("neutral")
    }
  }, [])

  // ── Manual stop (calls finalizeSession with actual elapsed time) ───
  const finishSession = useCallback(() => {
    const elapsed = Math.max(
      (SESSION_DURATION - timeLeftRef.current) * 1000,
      1000,
    )
    finalizeSession(elapsed)
  }, [finalizeSession])

  // ── Start session (advanced-init-once: init once per session) ────
  const startSession = useCallback(() => {
    storeRef.current = new EventStore()
    mascotRef.current = new MascotController(4000)
    timeLeftRef.current = SESSION_DURATION
    mascotMessageRef.current = DEFAULT_MESSAGE

    setPhase("running")
    setTimeLeft(SESSION_DURATION)
    setIncidentCount(0)
    setCurrentSignal(null)
    setFocusStatus("in_focus")
    setMascotExpression("neutral")
    setMascotMessage(DEFAULT_MESSAGE)

    const engine = new DetectionEngine({
      onEventStart: handleEventStart,
      onEventEnd: handleEventEnd,
    })
    engine.start()
    engineRef.current = engine

    timerRef.current = setInterval(() => {
      // Decrement via ref to avoid stale closure; sync state separately.
      timeLeftRef.current -= 1
      const next = timeLeftRef.current
      setTimeLeft(next)

      if (next <= 0) {
        clearInterval(timerRef.current!)
        timerRef.current = null
        finalizeSession(SESSION_DURATION * 1000)
      }
    }, 1000)
  }, [handleEventStart, handleEventEnd, finalizeSession])

  // ── Auto-start before first paint ────────────────────────────────
  useLayoutEffect(() => {
    startSession()
  }, [startSession])

  // ── Cleanup on unmount ────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      engineRef.current?.stop()
    }
  }, [])

  return {
    phase,
    timeLeft,
    incidentCount,
    currentSignal,
    focusStatus,
    mascotMessage,
    mascotExpression,
    finishSession,
  }
}
