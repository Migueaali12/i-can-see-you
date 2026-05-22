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
import { MascotController } from "@/core/mascotController"
import { buildResults, persistResults } from "@/core/resultsBuilder"
import { getRelativeLocaleUrl } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

// ── Types ─────────────────────────────────────────────────────────
export type Phase = "idle" | "running" | "finished"
export type FocusStatus = "in_focus" | "out_of_focus" | "event_detected"
export type Expression = "neutral" | "suspicious" | "annoyed"

const SESSION_DURATION = 60

// ── Hook ──────────────────────────────────────────────────────────
export function useActiveSession(lang: Lang = 'en') {
  const [phase, setPhase] = useState<Phase>("idle")
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION)
  const [incidentCount, setIncidentCount] = useState(0)
  const [currentSignal, setCurrentSignal] = useState<DetectionSignal | null>(
    null,
  )
  const [focusStatus, setFocusStatus] = useState<FocusStatus>("in_focus")
  const [mascotMessage, setMascotMessage] = useState("")
  const [mascotExpression, setMascotExpression] = useState<Expression>("neutral")

  // ── Refs (transient values that don't need re-render) ─────────────
  const storeRef = useRef(new EventStore())
  const mascotRef = useRef<MascotController | null>(null)
  const engineRef = useRef<DetectionEngine | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeLeftRef = useRef(SESSION_DURATION)
  const mascotMessageRef = useRef("")

  // Sync ref to avoid stale closure inside callbacks
  mascotMessageRef.current = mascotMessage

  // ── Unified session close ──────────────────────────────────────────
  const finalizeSession = useCallback((elapsedMs: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
    engineRef.current?.stop()
    engineRef.current = null

    const results = buildResults(storeRef.current, elapsedMs)
    persistResults(results)
    setPhase("finished")
    setTimeout(() => {
      window.location.href = getRelativeLocaleUrl(lang, '/results')
    }, 900)
  }, [lang])

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

    const msg = mascotRef.current?.resolveMessage(signal, mascotMessageRef.current) ?? mascotMessageRef.current
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

  // ── Manual stop ───
  const finishSession = useCallback(() => {
    const elapsed = Math.max(
      (SESSION_DURATION - timeLeftRef.current) * 1000,
      1000,
    )
    finalizeSession(elapsed)
  }, [finalizeSession])

  // ── Start session ───
  const startSession = useCallback(() => {
    storeRef.current = new EventStore()
    const controller = new MascotController(lang, 4000)
    mascotRef.current = controller
    timeLeftRef.current = SESSION_DURATION
    const defaultMsg = controller.resolveMessage(null, "")
    mascotMessageRef.current = defaultMsg

    setPhase("running")
    setTimeLeft(SESSION_DURATION)
    setIncidentCount(0)
    setCurrentSignal(null)
    setFocusStatus("in_focus")
    setMascotExpression("neutral")
    setMascotMessage(defaultMsg)

    const engine = new DetectionEngine({
      onEventStart: handleEventStart,
      onEventEnd: handleEventEnd,
    })
    engine.start()
    engineRef.current = engine

    timerRef.current = setInterval(() => {
      timeLeftRef.current -= 1
      const next = timeLeftRef.current
      setTimeLeft(next)

      if (next <= 0) {
        clearInterval(timerRef.current!)
        timerRef.current = null
        finalizeSession(SESSION_DURATION * 1000)
      }
    }, 1000)
  }, [handleEventStart, handleEventEnd, finalizeSession, lang])

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
