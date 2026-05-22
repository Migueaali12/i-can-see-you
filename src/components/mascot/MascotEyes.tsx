import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react"

type Expression = "neutral" | "suspicious" | "annoyed"
type BlinkPhase = "idle" | "closing" | "closed" | "opening"

interface MascotEyesProps {
  className?: string
  size?: string
  expression?: Expression
  ariaLabel?: string
}

const PUPIL_MAX_OFFSET = 0.22 // em fraction
const SUSPICIOUS_THRESHOLD = 80 // px
const ANNOYED_DURATION = 1800 // ms
const NEUTRAL_DEBOUNCE = 600 // ms

// Phase-based blink timing
const BLINK_CLOSE_MS = 120
const BLINK_HOLD_MS = 55
const BLINK_OPEN_MS = 150
const DOUBLE_BLINK_GAP_MS = 130

// Idle wandering config
const IDLE_GLANCE_MIN = 700 // ms looking in one direction
const IDLE_GLANCE_MAX = 2200
const IDLE_BLINK_CHANCE = 0.38 // probability of blink between glances
const IDLE_DOUBLE_BLINK_CHANCE = 0.18
// Directions the mascot prefers to "look" when bored (angles in radians)
// Weighted toward sides and slightly down — feels natural
const IDLE_ANGLE_POOL = [
  0, // right
  Math.PI, // left
  Math.PI / 6, // right-down
  (5 * Math.PI) / 6, // left-down
  Math.PI / 2, // down
  Math.PI / 4, // right-down diagonal
  (3 * Math.PI) / 4, // left-down diagonal
  -Math.PI / 6, // right-up
  (-5 * Math.PI) / 6, // left-up
]

export default function MascotEyes({
  className = "",
  size = "mascot--hero",
  expression: externalExpression,
  ariaLabel = "Eyes Watching",
}: MascotEyesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)

  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const [internalExpression, setInternalExpression] =
    useState<Expression>("neutral")
  const [blinkPhase, setBlinkPhase] = useState<BlinkPhase>("idle")
  const [isIdle, setIsIdle] = useState(true)
  const [expressionMasked, setExpressionMasked] = useState(false)

  const neutralTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const annoyedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const blinkTimers = useRef<ReturnType<typeof setTimeout>[]>([])
  const autoBlinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isIdleRef = useRef(true) // treat as idle until first mousemove
  const prefersReducedRef = useRef(false)

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    prefersReducedRef.current = mql.matches
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedRef.current = e.matches
    }
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  const [isTransitioning, setIsTransitioning] = useState(false)

  const activeExpression = expressionMasked
    ? internalExpression
    : (externalExpression ?? internalExpression)

  // ── Phase-based blink ────────────────────────────────────────────
  const clearBlinkTimers = useCallback(() => {
    for (const t of blinkTimers.current) clearTimeout(t)
    blinkTimers.current = []
  }, [])

  const cancelBlink = useCallback(() => {
    clearBlinkTimers()
    setBlinkPhase("idle")
  }, [clearBlinkTimers])

  const scheduleBlink = useCallback(
    (isDouble = false) => {
      if (prefersReducedRef.current) return
      clearBlinkTimers()

      const timers: ReturnType<typeof setTimeout>[] = []

      // Phase 1: closing
      timers.push(setTimeout(() => setBlinkPhase("closing"), 0))
      // Phase 2: closed (hold)
      timers.push(
        setTimeout(() => setBlinkPhase("closed"), BLINK_CLOSE_MS),
      )
      // Phase 3: opening
      timers.push(
        setTimeout(
          () => setBlinkPhase("opening"),
          BLINK_CLOSE_MS + BLINK_HOLD_MS,
        ),
      )
      // Phase 4: idle (reset)
      timers.push(
        setTimeout(
          () => setBlinkPhase("idle"),
          BLINK_CLOSE_MS + BLINK_HOLD_MS + BLINK_OPEN_MS,
        ),
      )

      // Double blink: schedule second blink after gap
      if (isDouble) {
        const secondStart =
          BLINK_CLOSE_MS + BLINK_HOLD_MS + BLINK_OPEN_MS + DOUBLE_BLINK_GAP_MS
        timers.push(setTimeout(() => setBlinkPhase("closing"), secondStart))
        timers.push(
          setTimeout(() => setBlinkPhase("closed"), secondStart + BLINK_CLOSE_MS),
        )
        timers.push(
          setTimeout(
            () => setBlinkPhase("opening"),
            secondStart + BLINK_CLOSE_MS + BLINK_HOLD_MS,
          ),
        )
        timers.push(
          setTimeout(
            () => setBlinkPhase("idle"),
            secondStart + BLINK_CLOSE_MS + BLINK_HOLD_MS + BLINK_OPEN_MS,
          ),
        )
      }

      blinkTimers.current = timers
    },
    [clearBlinkTimers],
  )

  // Cancel blink when expression becomes annoyed (avoids scaleY conflict)
  useEffect(() => {
    if (activeExpression === "annoyed") cancelBlink()
  }, [activeExpression, cancelBlink])

  // ── Idle pupil wander ────────────────────────────────────────────
  const getMaxPx = useCallback(() => {
    if (!containerRef.current) return 22
    return (
      PUPIL_MAX_OFFSET *
      parseFloat(getComputedStyle(containerRef.current).fontSize)
    )
  }, [])

  const runIdleLoop = useCallback(() => {
    if (!isIdleRef.current) return

    const maxPx = getMaxPx()
    const angle =
      IDLE_ANGLE_POOL[Math.floor(Math.random() * IDLE_ANGLE_POOL.length)]
    // Vary distance: sometimes far, sometimes mid
    const travel = maxPx * (0.45 + Math.random() * 0.55)

    setPupilOffset({
      x: travel * Math.cos(angle),
      y: travel * Math.sin(angle),
    })

    const holdTime =
      IDLE_GLANCE_MIN + Math.random() * (IDLE_GLANCE_MAX - IDLE_GLANCE_MIN)

    idleTimer.current = setTimeout(() => {
      if (!isIdleRef.current) return

      if (Math.random() < IDLE_BLINK_CHANCE) {
        const isDouble = Math.random() < IDLE_DOUBLE_BLINK_CHANCE
        scheduleBlink(isDouble)
        // Small pause after blink before next glance
        idleTimer.current = setTimeout(runIdleLoop, isDouble ? 580 : 420)
      } else {
        runIdleLoop()
      }
    }, holdTime)
  }, [getMaxPx, scheduleBlink])

  const startIdle = useCallback(() => {
    isIdleRef.current = true
    setIsIdle(true)
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(runIdleLoop, 500)
  }, [runIdleLoop])

  const stopIdle = useCallback(() => {
    isIdleRef.current = false
    setIsIdle(false)
    if (idleTimer.current) clearTimeout(idleTimer.current)
  }, [])

  // ── Pupil tracking (active) ──────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!leftEyeRef.current || !rightEyeRef.current) return

      if (isIdleRef.current) {
        stopIdle()
        setIsTransitioning(true)
        if (transitionTimer.current) clearTimeout(transitionTimer.current)
        transitionTimer.current = setTimeout(
          () => setIsTransitioning(false),
          350,
        )
        setExpressionMasked(false)
        if (!externalExpression) setInternalExpression("neutral")
      }

      const maxPx = getMaxPx()
      const eyes = [leftEyeRef.current, rightEyeRef.current]
      let sumX = 0
      let sumY = 0

      for (const eye of eyes) {
        const rect = eye.getBoundingClientRect()
        sumX += rect.left + rect.width / 2
        sumY += rect.top + rect.height / 2
      }

      const cx = sumX / 2
      const cy = sumY / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)
      const travel = Math.min(dist * 0.25, maxPx)

      setPupilOffset({
        x: travel * Math.cos(angle),
        y: travel * Math.sin(angle),
      })

      if (!externalExpression) {
        if (dist < SUSPICIOUS_THRESHOLD) {
          setInternalExpression("suspicious")
          if (neutralTimer.current) clearTimeout(neutralTimer.current)
        } else {
          if (neutralTimer.current) clearTimeout(neutralTimer.current)
          neutralTimer.current = setTimeout(() => {
            setInternalExpression("neutral")
          }, NEUTRAL_DEBOUNCE)
        }
      }
    },
    [externalExpression, getMaxPx, stopIdle],
  )

  // ── Mouse leaves viewport → annoyed + idle wander ───────────────
  const handleWindowMouseLeave = useCallback(() => {
    if (neutralTimer.current) clearTimeout(neutralTimer.current)
    if (annoyedTimer.current) clearTimeout(annoyedTimer.current)

    cancelBlink()

    setIsTransitioning(false)
    if (transitionTimer.current) clearTimeout(transitionTimer.current)

    if (externalExpression) {
      setExpressionMasked(true)
      setInternalExpression("neutral")
      startIdle()
    } else {
      setExpressionMasked(false)
      setInternalExpression("annoyed")

      annoyedTimer.current = setTimeout(() => {
        setInternalExpression("neutral")
        startIdle()
      }, ANNOYED_DURATION)

      startIdle()
    }
  }, [externalExpression, cancelBlink, startIdle])

  // ── Blink on hover ───────────────────────────────────────────────
  const handleMouseEnter = useCallback(() => {
    scheduleBlink()
  }, [scheduleBlink])

  // ── Auto-blink (active mode only) ───────────────────────────────
  useEffect(() => {
    if (prefersReducedRef.current) return

    const scheduleNextBlink = () => {
      const delay = 2500 + Math.random() * 4000
      autoBlinkTimer.current = setTimeout(() => {
        // Only auto-blink in active mode (idle loop handles its own blinks)
        if (!isIdleRef.current) {
          const isDouble = Math.random() < 0.1
          scheduleBlink(isDouble)
        }
        scheduleNextBlink()
      }, delay)
    }

    scheduleNextBlink()
    return () => {
      if (autoBlinkTimer.current) clearTimeout(autoBlinkTimer.current)
    }
  }, [scheduleBlink])

  // ── Kick off idle on mount ───────────────────────────────────────
  useEffect(() => {
    startIdle()
    return () => stopIdle()
  }, [startIdle, stopIdle])

  // ── Event listeners ──────────────────────────────────────────────
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    document.documentElement.addEventListener(
      "mouseleave",
      handleWindowMouseLeave,
    )
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.documentElement.removeEventListener(
        "mouseleave",
        handleWindowMouseLeave,
      )
      if (neutralTimer.current) clearTimeout(neutralTimer.current)
      if (annoyedTimer.current) clearTimeout(annoyedTimer.current)
      if (transitionTimer.current) clearTimeout(transitionTimer.current)
      clearBlinkTimers()
    }
  }, [handleMouseMove, handleWindowMouseLeave, clearBlinkTimers])

  const pupilStyle: CSSProperties = {
    transform: `translate(calc(-50% + ${pupilOffset.x}px), calc(-50% + ${pupilOffset.y}px))`,
  }

  return (
    <div
      ref={containerRef}
      className={`mascot ${size} ${className}`.trim()}
      data-expression={activeExpression}
      data-idle={isIdle ? "true" : "false"}
      data-transitioning={isTransitioning ? "true" : "false"}
      data-blink-phase={blinkPhase}
      role='img'
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
    >
      <Eye eyeRef={leftEyeRef} pupilStyle={pupilStyle} />
      <Eye eyeRef={rightEyeRef} pupilStyle={pupilStyle} />
    </div>
  )
}

// ── Eye sub-component ────────────────────────────────────────────
interface EyeProps {
  eyeRef: React.RefObject<HTMLDivElement | null>
  pupilStyle: CSSProperties
}

function Eye({ eyeRef, pupilStyle }: EyeProps) {
  return (
    <div ref={eyeRef} className='mascot__eye'>
      <div className='mascot__brow mascot__brow--left' aria-hidden='true' />
      <div className='mascot__brow mascot__brow--right' aria-hidden='true' />
      <div className='mascot__pupil' style={pupilStyle} aria-hidden='true' />
      <div className='mascot__eyelid' aria-hidden='true' />
    </div>
  )
}
