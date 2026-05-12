import type { SessionResults } from "@/core/resultsBuilder"
import MetricCard from "./MetricCard"
import { formatMs } from "./utils"
import { CircleX, Timer, Milestone } from "lucide-react"

interface MetricsRowProps {
  results: SessionResults
}

export default function MetricsRow({ results }: MetricsRowProps) {
  const { incidentCount, totalDistractedMs, attentionScore } = results

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <MetricCard
        icon={<CircleX />}
        value={String(incidentCount)}
        label='Distractions'
        description='Times you switched tabs or windows.'
        delay={100}
      />
      <MetricCard
        icon={<Timer />}
        value={formatMs(totalDistractedMs)}
        label='Duration'
        description='Total time spent out of focus during the session.'
        delay={200}
      />
      <MetricCard
        icon={<Milestone />}
        value={`${attentionScore}%`}
        label='Attention Score'
        description={
          attentionScore >= 90
            ? "Excellent focus. Almost caught you slipping."
            : attentionScore >= 70
              ? "Not bad, but we know you can do better."
              : attentionScore >= 50
                ? "Hmm... there's room for improvement."
                : "We lost sight of you quite a bit."
        }
        variant='score'
        delay={300}
      />
    </div>
  )
}
