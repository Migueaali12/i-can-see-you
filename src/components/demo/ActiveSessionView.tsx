import MascotEyes from "@/components/mascot/MascotEyes"
import { useActiveSession } from "./active-session/useActiveSession"
import { t } from "./active-session/styles"
import ShadowButton from "./active-session/ShadowButton"
import StatusCard from "./active-session/StatusCard"
import IncidentsCard from "./active-session/IncidentsCard"
import TimerHero from "./active-session/TimerHero"
import MascotCorner from "./active-session/MascotCorner"
import DemoFooter from "./active-session/DemoFooter"

// ── Finished (transition screen while building results) ───────────
function FinishedView() {
  return (
    <div
      className="notebook-bg"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <MascotEyes size='mascot--md' expression='suspicious' />
      <p
        style={{
          fontFamily: t.fontBody,
          fontSize: "1rem",
          color: t.secondary,
          margin: 0,
        }}
      >
        Compiling results…
      </p>
    </div>
  )
}

// ── Running session layout ─────────────────────────────────────────
function RunningView({
  timeLeft,
  isUrgent,
  incidentCount,
  focusStatus,
  currentSignal,
  mascotExpression,
  mascotMessage,
  onStop,
}: {
  timeLeft: number
  isUrgent: boolean
  incidentCount: number
  focusStatus: ReturnType<typeof useActiveSession>["focusStatus"]
  currentSignal: ReturnType<typeof useActiveSession>["currentSignal"]
  mascotExpression: ReturnType<typeof useActiveSession>["mascotExpression"]
  mascotMessage: string
  onStop: () => void
}) {
  return (
    <div
      className="notebook-bg"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.85rem 1.5rem",
          background: "#fff",
          borderBottom: "3px solid #111",
          flexShrink: 0,
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
        <ShadowButton onClick={onStop} variant='danger'>
          ✕ Stop
        </ShadowButton>
      </header>

      <main
        style={{
          flex: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 2rem 3rem",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1.25rem",
            width: "100%",
            maxWidth: "720px",
            flexWrap: "wrap",
          }}
        >
          <StatusCard status={focusStatus} signal={currentSignal} />
          <IncidentsCard count={incidentCount} />
        </div>

        <div style={{ width: "100%", maxWidth: "720px" }}>
          <TimerHero timeLeft={timeLeft} isUrgent={isUrgent} />
        </div>
      </main>

      <MascotCorner expression={mascotExpression} message={mascotMessage} />
      <DemoFooter />
    </div>
  )
}

// ── Container ─────────────────────────────────────────────────────
export default function ActiveSessionView() {
  const {
    phase,
    timeLeft,
    incidentCount,
    currentSignal,
    focusStatus,
    mascotMessage,
    mascotExpression,
    finishSession,
  } = useActiveSession()

  const isUrgent = timeLeft <= 10 && phase === "running"

  if (phase === "idle") return null

  return phase === "finished" ? (
    <FinishedView />
  ) : (
    <RunningView
      timeLeft={timeLeft}
      isUrgent={isUrgent}
      incidentCount={incidentCount}
      focusStatus={focusStatus}
      currentSignal={currentSignal}
      mascotExpression={mascotExpression}
      mascotMessage={mascotMessage}
      onStop={finishSession}
    />
  )
}
