import { useMemo } from "react"
import type { SessionResults } from "@/core/resultsBuilder"
import type { DetectionSignal } from "@/core/detectionEngine"
import { DoodleCard } from "@/components/ui/DoodleCard"
import { formatTimerMs } from "./utils"
import { X, Eye } from "lucide-react"

const SIGNAL_LABELS: Record<DetectionSignal, string> = {
  visibility: "Tab hidden",
  blur: "Focus lost",
  fullscreen: "Fullscreen exit",
  mouseleave: "Cursor left",
  paste: "Paste",
  devtools: "DevTools",
}

interface TimelineMarker {
  type: DetectionSignal
  label: string
  startOffsetMs: number
  durationMs: number
  leftPercent: number
}

interface SessionTimelineProps {
  results: SessionResults
}

export default function SessionTimeline({ results }: SessionTimelineProps) {
  const markers = useMemo(() => {
    if (!results.endedAt || !results.sessionDurationMs) return []
    const sessionStart = results.endedAt - results.sessionDurationMs

    const all: TimelineMarker[] = []

    for (const ev of results.events.closed) {
      const offset = ev.startedAt - sessionStart
      const leftPct = Math.max(
        0,
        Math.min(100, (offset / results.sessionDurationMs) * 100),
      )
      all.push({
        type: ev.type,
        label: SIGNAL_LABELS[ev.type] ?? ev.type,
        startOffsetMs: offset,
        durationMs: ev.durationMs,
        leftPercent: leftPct,
      })
    }

    for (const ev of results.events.open) {
      const offset = ev.startedAt - sessionStart
      const leftPct = Math.max(
        0,
        Math.min(100, (offset / results.sessionDurationMs) * 100),
      )
      all.push({
        type: ev.type,
        label: SIGNAL_LABELS[ev.type] ?? ev.type,
        startOffsetMs: offset,
        durationMs: ev.durationMs ?? 0,
        leftPercent: leftPct,
      })
    }

    return all.sort((a, b) => a.startOffsetMs - b.startOffsetMs)
  }, [results])

  return (
    <DoodleCard
      dashedBorder
      className='animate-in fade-in slide-in-from-bottom-4 duration-500'
      innerClassName='relative bg-(--color-surface) border-2 border-black p-6 md:p-8 h-full flex flex-col'
    >
      <h2 className='mb-6 font-display text-[1.35rem] font-semibold leading-tight flex items-center gap-2 border-b-2 border-black pb-3 text-black'>
        <Eye className='w-5 h-5' />
        Session timeline
      </h2>

      <div className='relative mt-4'>
        <div className='relative h-3 bg-(--color-surface-variant) border border-(--color-outline-variant)'>
          {markers.map((m, i) => (
            <div
              key={`${m.type}-${i}`}
              className='absolute top-1/2 -translate-y-1/2 z-10 group'
              style={{ left: `${m.leftPercent}%` }}
            >
              <div className='relative flex items-center justify-center w-6 h-6 -ml-3 bg-(--color-surface) border-2 border-black rounded-full'>
                <X className='w-3.5 h-3.5 text-black' />
              </div>
              <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-(--color-on-primary) text-xs font-body rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none'>
                {m.label} ({formatTimerMs(m.durationMs)})
              </div>
            </div>
          ))}

          {markers.length === 0 && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Eye className='w-4 h-4 text-(--color-secondary)' />
            </div>
          )}
        </div>

        <div className='flex justify-between mt-3 text-xs font-body text-(--color-secondary)'>
          <span>0:00</span>
          <span>{formatTimerMs(results.sessionDurationMs)}</span>
        </div>
      </div>

      {markers.length > 0 && (
        <div className='mt-6 flex flex-col gap-1'>
          {markers.map((m, i) => (
            <div
              key={`legend-${i}`}
              className='flex items-center gap-2 text-sm font-body text-(--color-on-surface)'
            >
              <X className='w-3.5 h-3.5 shrink-0 text-black' />
              <span className='font-semibold'>{m.label}</span>
              <span className='text-(--color-secondary)'>
                {formatTimerMs(m.durationMs)}
              </span>
              <span className='text-(--color-outline) ml-auto text-xs'>
                {formatTimerMs(m.startOffsetMs)}
              </span>
            </div>
          ))}
        </div>
      )}
    </DoodleCard>
  )
}
