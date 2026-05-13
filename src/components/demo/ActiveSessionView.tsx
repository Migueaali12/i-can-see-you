import MascotEyes from "@/components/mascot/MascotEyes"
import SiteShell from "@/components/layout/SiteShell"
import { useActiveSession } from "./active-session/useActiveSession"
import StatusCard from "./active-session/StatusCard"
import IncidentsCard from "./active-session/IncidentsCard"
import TimerHero from "./active-session/TimerHero"
import MascotCorner from "./active-session/MascotCorner"

// ── Finished (transition screen while building results) ───────────
function FinishedView() {
  return (
    <div className='notebook-bg fixed inset-0 z-100 flex flex-col items-center justify-center gap-6'>
      <MascotEyes size='mascot--md' expression='suspicious' />
      <p className='font-body text-base text-(--color-secondary) m-0'>
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
    <SiteShell
      className='notebook-bg fixed inset-0 z-100 flex min-h-0 flex-col'
      mainClassName='flex flex-1 flex-col items-center justify-center gap-6 overflow-auto px-8 pt-8 pb-12'
      afterMain={
        <MascotCorner expression={mascotExpression} message={mascotMessage} />
      }
      footerNavAriaLabel='Demo links'
      footerWithPageSpacing={false}
    >
      <div className='grid w-full max-w-[720px] grid-cols-[2fr_1fr] gap-5'>
        <div className='animate-in fade-in slide-in-from-bottom-4'>
          <StatusCard status={focusStatus} signal={currentSignal} />
        </div>
        <div className='animate-in fade-in slide-in-from-bottom-4' style={{ animationDelay: '100ms' }}>
          <IncidentsCard count={incidentCount} />
        </div>
        <div className='col-span-2 animate-in fade-in slide-in-from-bottom-4' style={{ animationDelay: '200ms' }}>
          <TimerHero timeLeft={timeLeft} isUrgent={isUrgent} onStop={onStop} />
        </div>
      </div>
    </SiteShell>
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
