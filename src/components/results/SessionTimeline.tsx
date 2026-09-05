import { useMemo } from "react"
import type { SessionResults } from "@/core/resultsBuilder"
import type { DetectionSignal } from "@/core/detectionEngine"
import { DoodleCard } from "@/components/ui/DoodleCard"
import AttentionChart from "./AttentionChart"
import { formatTimerMs } from "./utils"
import { X, Eye } from "lucide-react"
import { useTranslations } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

function useSignalLabels(lang: Lang) {
  const t = useTranslations(lang)
  return {
    visibility: t('signal.visibility'),
    blur: t('signal.blur'),
    fullscreen: t('signal.fullscreen'),
    mouseleave: t('signal.mouseleave'),
    paste: t('signal.paste'),
    devtools: t('signal.devtools'),
  } as Record<DetectionSignal, string>
}

interface LegendGroup {
  type: DetectionSignal
  label: string
  count: number
  startOffsetMs: number
  endOffsetMs: number
}

interface SessionTimelineProps {
  results: SessionResults
  lang?: Lang
}

export default function SessionTimeline({ results, lang = 'en' }: SessionTimelineProps) {
  const t = useTranslations(lang)
  const signalLabels = useSignalLabels(lang)

  const legendGroups = useMemo(() => {
    if (!results.endedAt || !results.sessionDurationMs) return []
    const sessionStart = results.endedAt - results.sessionDurationMs

    const items: Array<{ type: DetectionSignal; startOffsetMs: number; endOffsetMs: number }> = []

    for (const ev of results.events.closed) {
      items.push({
        type: ev.type,
        startOffsetMs: ev.startedAt - sessionStart,
        endOffsetMs: ev.startedAt - sessionStart + ev.durationMs,
      })
    }

    for (const ev of results.events.open) {
      items.push({
        type: ev.type,
        startOffsetMs: ev.startedAt - sessionStart,
        endOffsetMs: ev.startedAt - sessionStart + (ev.durationMs ?? 0),
      })
    }

    items.sort((a, b) => a.startOffsetMs - b.startOffsetMs)

    // Collapse consecutive same-type incidents into one row.
    const groups: LegendGroup[] = []
    for (const item of items) {
      const last = groups[groups.length - 1]
      if (last && last.type === item.type) {
        last.count += 1
        last.endOffsetMs = Math.max(last.endOffsetMs, item.endOffsetMs)
      } else {
        groups.push({
          type: item.type,
          label: signalLabels[item.type] ?? item.type,
          count: 1,
          startOffsetMs: item.startOffsetMs,
          endOffsetMs: item.endOffsetMs,
        })
      }
    }

    return groups
  }, [results, signalLabels])

  return (
    <DoodleCard
      dashedBorder
      className='animate-in fade-in slide-in-from-bottom-4 duration-500'
      innerClassName='relative bg-(--color-surface) border-2 border-(--color-border) p-6 md:p-8 h-full flex flex-col'
    >
      <h2 className='mb-6 font-display text-[1.35rem] font-semibold leading-tight flex items-center gap-2 border-b-2 border-(--color-border) pb-3 text-(--color-on-card)'>
        <Eye className='w-5 h-5' />
        {t('results.timelineTitle')}
      </h2>

      <AttentionChart results={results} lang={lang} />

      {legendGroups.length > 0 && (
        <div className='mt-6 flex flex-col gap-1'>
          {legendGroups.map((g, i) => (
            <div
              key={`legend-${i}`}
              className='flex items-center gap-2 text-sm font-body text-(--color-on-surface)'
            >
              <X className='w-3.5 h-3.5 shrink-0 text-(--color-on-card)' />
              <span className='font-semibold'>{g.label}</span>
              {g.count > 1 && <span className='text-(--color-secondary)'>×{g.count}</span>}
              <span className='text-(--color-secondary)'>
                {formatTimerMs(g.startOffsetMs)}–{formatTimerMs(g.endOffsetMs)}
              </span>
            </div>
          ))}
        </div>
      )}
    </DoodleCard>
  )
}
