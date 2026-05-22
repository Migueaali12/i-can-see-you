import type { SessionResults } from "@/core/resultsBuilder"
import MetricCard from "./MetricCard"
import { formatMs } from "./utils"
import { CircleX, Timer, Milestone } from "lucide-react"
import { useTranslations } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

interface MetricsRowProps {
  results: SessionResults
  lang?: Lang
}

export default function MetricsRow({ results, lang = 'en' }: MetricsRowProps) {
  const t = useTranslations(lang)
  const { incidentCount, totalDistractedMs, attentionScore } = results

  const scoreDesc =
    attentionScore >= 90
      ? t('results.scoreExcellent')
      : attentionScore >= 70
        ? t('results.scoreGood')
        : attentionScore >= 50
          ? t('results.scoreOkay')
          : t('results.scorePoor')

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <MetricCard
      className="h-full"
        icon={<CircleX />}
        value={String(incidentCount)}
        label={t('results.distractionsLabel')}
        description={t('results.distractionsDesc')}
        delay={100}
      />
      <MetricCard
      className="h-full"
        icon={<Timer />}
        value={formatMs(totalDistractedMs)}
        label={t('results.durationLabel')}
        description={t('results.durationDesc')}
        delay={200}
      />
      <MetricCard
      className="h-full"
        icon={<Milestone />}
        value={`${attentionScore}%`}
        label={t('results.scoreLabel')}
        description={scoreDesc}
        delay={300}
      />
    </div>
  )
}
