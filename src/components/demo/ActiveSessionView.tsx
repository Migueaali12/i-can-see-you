import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  type CSSProperties,
} from "react"
import MascotEyes from "@/components/mascot/MascotEyes"
import {
  DetectionEngine,
  type DetectionSignal,
  type DetectionEvent,
} from "@/core/detectionEngine"
import { EventStore } from "@/core/eventStore"
import { MascotController, DEFAULT_MESSAGE } from "@/core/mascotController"
import { buildResults, persistResults } from "@/core/resultsBuilder"

// ── Types ─────────────────────────────────────────────────────────
type Phase = "idle" | "running" | "finished"
type FocusStatus = "in_focus" | "out_of_focus" | "event_detected"
type Expression = "neutral" | "suspicious" | "annoyed"

const SESSION_DURATION = 60 // seconds

// ── Design tokens ─────────────────────────────────────────────────
const t = {
  fontDisplay: "var(--font-display)",
  fontBody: "var(--font-body)",
  secondary: "var(--color-secondary)",
  outline: "var(--color-outline)",
  outlineVariant: "var(--color-outline-variant)",
  surface: "var(--color-surface)",
} as const

// ── Signal label map ──────────────────────────────────────────────
const SIGNAL_LABELS: Record<DetectionSignal, string> = {
  visibility: "visibility",
  blur: "blur",
  fullscreen: "fullscreen",
  mouseleave: "mouseleave",
  paste: "paste",
  devtools: "devtools",
}

// ── ShadowButton ──────────────────────────────────────────────────
interface ShadowButtonProps {
  onClick: () => void
  children: React.ReactNode
  variant?: "primary" | "danger" | "ghost"
  large?: boolean
}

function ShadowButton({
  onClick,
  children,
  variant = "primary",
  large = false,
}: ShadowButtonProps) {
  const bgMap = { primary: "#111", danger: t.surface, ghost: t.surface }
  const colorMap = { primary: "#fff", danger: "#111", ghost: "#111" }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#111",
          translate: "5px 5px",
        }}
        aria-hidden
      />
      <button
        onClick={onClick}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: large ? "1rem 2.8rem" : "0.6rem 1.3rem",
          border: "2.5px solid #111",
          background: bgMap[variant],
          color: colorMap[variant],
          fontFamily: t.fontBody,
          fontSize: large ? "1rem" : "0.82rem",
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "0.05em",
          transition: "transform 100ms ease, translate 100ms ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.transform =
            "rotate(-1.5deg)"
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.transform = ""
        }}
        onMouseDown={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.translate = "3px 3px"
        }}
        onMouseUp={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.translate = ""
        }}
      >
        {children}
      </button>
    </div>
  )
}

// ── StatusBadge ───────────────────────────────────────────────────
function StatusBadge({
  status,
  signal,
}: {
  status: FocusStatus
  signal: DetectionSignal | null
}) {
  const config: Record<
    FocusStatus,
    { label: string; bg: string; color: string; border: string }
  > = {
    in_focus: {
      label: "IN FOCUS",
      bg: "#fff",
      color: "#111",
      border: "2.5px solid #111",
    },
    out_of_focus: {
      label: "OUT OF FOCUS",
      bg: "transparent",
      color: "#111",
      border: "2.5px dashed #111",
    },
    event_detected: {
      label: "EVENT DETECTED",
      bg: "#111",
      color: "#fff",
      border: "2.5px solid #111",
    },
  }

  const { label, bg, color, border } = config[status]

  return (
    <div style={{ textAlign: "center" }}>
      <span
        style={{
          display: "inline-block",
          padding: "0.4rem 1.1rem",
          border,
          background: bg,
          color,
          fontFamily: t.fontBody,
          fontSize: "0.78rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          transition: "all 220ms ease",
        }}
      >
        {label}
      </span>
      <div
        style={{
          fontFamily: t.fontBody,
          fontSize: "0.7rem",
          color: t.secondary,
          letterSpacing: "0.08em",
          marginTop: "0.45rem",
          minHeight: "1.1em",
          transition: "opacity 200ms ease",
          opacity: signal ? 1 : 0,
        }}
      >
        {signal ? `signal: ${SIGNAL_LABELS[signal]}` : "—"}
      </div>
    </div>
  )
}

// ── StatBox ───────────────────────────────────────────────────────
function StatBox({
  value,
  label,
  large = false,
  urgent = false,
}: {
  value: string | number
  label: string
  large?: boolean
  urgent?: boolean
}) {
  return (
    <div
      style={{
        position: "relative",
        flex: large ? "1 1 140px" : "0 0 auto",
        // Avoid flex cross-axis stretch: shadow uses inset:0 and would fill the full row height.
        alignSelf: "flex-start",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#111",
          translate: "5px 5px",
        }}
        aria-hidden
      />
      <div
        style={{
          position: "relative",
          background: urgent ? "#111" : "#fff",
          border: "2.5px solid #111",
          padding: large ? "1.5rem 2rem" : "1.1rem 1.5rem",
          textAlign: "center",
          transition: "background 300ms ease",
        }}
      >
        <div
          style={{
            fontFamily: t.fontDisplay,
            fontSize: large ? "clamp(3.5rem, 10vw, 5rem)" : "clamp(1.8rem, 5vw, 2.4rem)",
            fontWeight: 700,
            color: urgent ? "#fff" : "#111",
            lineHeight: 1,
            transition: "color 300ms ease",
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontFamily: t.fontBody,
            fontSize: "0.65rem",
            color: urgent ? "#eee" : t.secondary,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginTop: "0.4rem",
            transition: "color 300ms ease",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  )
}

// ── MascotCard ────────────────────────────────────────────────────
function MascotCard({
  expression,
  message,
}: {
  expression: Expression
  message: string
}) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#111",
          translate: "6px 6px",
        }}
        aria-hidden
      />
      <div
        style={{
          position: "relative",
          background: "#fff",
          border: "2.5px solid #111",
          padding: "2rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
          textAlign: "center",
        }}
      >
        <MascotEyes size="mascot--md" expression={expression} />
        <p
          style={{
            fontFamily: t.fontBody,
            fontSize: "0.9rem",
            fontStyle: "italic",
            color: "#111",
            margin: 0,
            lineHeight: 1.55,
            minHeight: "2.2em",
          }}
        >
          &ldquo;{message}&rdquo;
        </p>
      </div>
    </div>
  )
}

// ── Disclaimer ────────────────────────────────────────────────────
const disclaimerStyle: CSSProperties = {
  fontFamily: t.fontBody,
  fontSize: "0.7rem",
  color: "var(--color-outline)",
  textAlign: "center",
  lineHeight: 1.65,
  borderTop: "1px dashed var(--color-outline-variant)",
  paddingTop: "1.5rem",
  margin: 0,
}

// ── ActiveSessionView (main export) ───────────────────────────────
export default function ActiveSessionView() {
  const [phase, setPhase] = useState<Phase>("idle")
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION)
  const [incidentCount, setIncidentCount] = useState(0)
  const [currentSignal, setCurrentSignal] = useState<DetectionSignal | null>(null)
  const [focusStatus, setFocusStatus] = useState<FocusStatus>("in_focus")
  const [mascotMessage, setMascotMessage] = useState(DEFAULT_MESSAGE)
  const [mascotExpression, setMascotExpression] = useState<Expression>("neutral")

  // Refs for stable callbacks (avoid stale closures)
  const storeRef = useRef(new EventStore())
  const mascotRef = useRef(new MascotController(4000))
  const engineRef = useRef<DetectionEngine | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeLeftRef = useRef(SESSION_DURATION)
  const mascotMessageRef = useRef(DEFAULT_MESSAGE)

  // Keep message ref in sync
  mascotMessageRef.current = mascotMessage

  // ── Event handlers (stable refs, safe for use in DetectionEngine) ──
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

  // ── Finish session (natural or manual) ────────────────────────────
  const finishSession = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    engineRef.current?.stop()
    engineRef.current = null

    const elapsed = Math.max(
      (SESSION_DURATION - timeLeftRef.current) * 1000,
      1000,
    )
    const results = buildResults(storeRef.current, elapsed)
    persistResults(results)

    setPhase("finished")
    setTimeout(() => {
      window.location.href = "/result"
    }, 900)
  }, [])

  // ── Start session ─────────────────────────────────────────────────
  const startSession = useCallback(() => {
    // Reset state
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

    // Start detection engine
    const engine = new DetectionEngine({
      onEventStart: handleEventStart,
      onEventEnd: handleEventEnd,
    })
    engine.start()
    engineRef.current = engine

    // Start countdown
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1
        timeLeftRef.current = next
        if (next <= 0) {
          clearInterval(timerRef.current!)
          timerRef.current = null
          engineRef.current?.stop()
          engineRef.current = null

          const results = buildResults(storeRef.current, SESSION_DURATION * 1000)
          persistResults(results)
          setPhase("finished")
          setTimeout(() => {
            window.location.href = "/result"
          }, 900)

          return 0
        }
        return next
      })
    }, 1000)
  }, [handleEventStart, handleEventEnd])

  // ── Auto-start on mount (before first paint, eliminates idle flash) ─
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

  const isUrgent = timeLeft <= 10 && phase === "running"

  // ── Idle phase — renders nothing (auto-start fires before first paint) ─
  if (phase === "idle") return null

  // ── Finished phase ────────────────────────────────────────────────
  if (phase === "finished") {
    return (
      <main
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <MascotEyes size="mascot--md" expression="suspicious" />
        </div>
        <p
          style={{
            fontFamily: t.fontBody,
            fontSize: "1rem",
            color: t.secondary,
          }}
        >
          Compiling results…
        </p>
      </main>
    )
  }

  // ── Running phase ─────────────────────────────────────────────────
  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "1.5rem 1.5rem 5rem",
      }}
    >
      {/* Session control bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.5rem",
          paddingBottom: "1rem",
          borderBottom: "3px solid #111",
        }}
      >
        <span
          style={{
            fontFamily: t.fontDisplay,
            fontSize: "1.5rem",
            fontWeight: 700,
            fontStyle: "italic",
            color: "#111",
          }}
        >
          I Can See You
        </span>
        <ShadowButton onClick={finishSession} variant="danger">
          Stop ✕
        </ShadowButton>
      </div>

      {/* Status block */}
      <div style={{ marginBottom: "2rem" }}>
        <StatusBadge status={focusStatus} signal={currentSignal} />
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          justifyContent: "center",
          marginBottom: "2.5rem",
          flexWrap: "wrap",
        }}
      >
        <StatBox value={timeLeft} label="Seconds" large urgent={isUrgent} />
        <StatBox value={incidentCount} label="Incidents" />
      </div>

      {/* Mascot card */}
      <div style={{ marginBottom: "2rem" }}>
        <MascotCard expression={mascotExpression} message={mascotMessage} />
      </div>

      {/* Disclaimer */}
      <p style={disclaimerStyle}>
        This demo detects browser signals; external actions may not be visible.
      </p>
    </main>
  )
}
