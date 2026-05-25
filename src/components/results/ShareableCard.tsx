import { useId, useState } from "react"
import type { SessionResults } from "@/core/resultsBuilder"
import { loadResults } from "@/core/resultsBuilder"
import { formatMs } from "./utils"
import { DoodleCard } from "@/components/ui/DoodleCard"
import { CircleX, Clock, Timer, Sparkles, Star, Zap } from "lucide-react"
import MascotEyesStatic from "../mascot/MascotEyesStatic"
import { useTranslations } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

/* ─── Notebook Grid Background (SVG-based for Firefox compat) ───── */
function NotebookGrid({ patternId }: { patternId: string }) {
  return (
    <svg
      className='absolute inset-0 w-full h-full pointer-events-none -z-1'
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <pattern
          id={patternId}
          width='40'
          height='40'
          patternUnits='userSpaceOnUse' 
        >
          <path
            d='M 40 0 L 0 0 0 40'
            fill='none'
            stroke='var(--color-notebook-line)'
            strokeWidth='1'
          />
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill={`url(#${patternId})`} />
    </svg>
  )
}

interface ShareableCardProps {
  results?: SessionResults
  scale?: number
  lang?: Lang
}

/* ─── Score Ring (SVG circular progress) ───────────────────────── */
function ScoreRing({ score, lang = 'en' }: { score: number; lang?: Lang }) {
  const t = useTranslations(lang)
  const radius = 280
  const stroke = 34
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const progress = (score / 100) * circumference

  return (
    <div className='relative w-[600px] h-[600px]'>
      <svg width='600' height='600' viewBox='0 0 600 600' className='block'>
        <circle cx='300' cy='300' r={normalizedRadius} fill='var(--color-card)' />
        <circle
          cx='300'
          cy='300'
          r={normalizedRadius}
          fill='none'
          stroke='var(--color-outline-variant)'
          strokeWidth={stroke}
        />
        <circle
          cx='300'
          cy='300'
          r={normalizedRadius}
          fill='none'
          stroke='var(--color-on-surface)'
          strokeWidth={stroke}
          strokeLinecap='round'
          strokeDasharray={`${progress} ${circumference}`}
          transform='rotate(-90 300 300)'
        />
        <circle
          cx='300'
          cy='300'
          r={normalizedRadius + 35}
          fill='none'
          stroke='var(--color-on-surface)'
          strokeWidth='5'
          strokeDasharray='12 18'
          opacity='0.22'
        />
      </svg>

      <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
        <span
          className='text-[13rem] leading-none font-bold text-(--color-on-surface)'
          style={{ fontFamily: "var(--font-display)" }}
        >
          {score}%
        </span>
        <span className='font-body text-3xl uppercase tracking-[0.25em] text-(--color-muted) mt-2'>
          {t('results.cardScoreLabel')}
        </span>
      </div>
    </div>
  )
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function ShareableCard({
  results: propResults,
  scale = 1,
  lang = 'en',
}: ShareableCardProps) {
  const t = useTranslations(lang)
  const [results] = useState<SessionResults | null>(() => {
    return propResults ?? loadResults()
  })
  const gridId = useId()

  if (!results) {
    return (
      <div className='w-[1080px] h-[1920px] relative bg-(--color-notebook-bg) flex items-center justify-center border-2 border-(--color-border)'>
        <NotebookGrid patternId={gridId} />
        <div className='text-center relative'>
          <p
            className='text-4xl text-(--color-on-surface)'
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t('results.cardNoData')}
          </p>
          <p className='font-body text-sm text-(--color-muted) mt-3'>
            {t('results.cardCompleteFirst')}
          </p>
        </div>
      </div>
    )
  }

  const sessionDurationSec = Math.round(results.sessionDurationMs / 1000)

  const width = 1080
  const height = 1920

  return (
    <div
      className='relative'
      style={{
        width: width * scale,
        height: height * scale,
      }}
    >
      <div
        className='w-[1080px] h-[1920px] relative flex flex-col overflow-hidden bg-(--color-notebook-bg)'
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <NotebookGrid patternId={gridId} />
        {/* ═══ Header ═══════════════════════════════════════════════════ */}
        <div className='pt-20 pb-30 text-center'>
          <h1
            className='text-[9rem] leading-none font-bold text-(--color-on-surface) m-0'
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t('results.cardHeader')}
          </h1>
          <p className='font-body text-4xl uppercase tracking-[0.3em] text-(--color-muted) mt-5 m-0'>
            {t('results.cardSubheader')}
          </p>
        </div>

        {/* ═══ Score Ring ═══════════════════════════════════════════════ */}
        <div className='flex items-center justify-center pb-30'>
          <div className='relative'>
            <ScoreRing score={results.attentionScore} lang={lang} />

            <Sparkles
              className='absolute -top-10 -left-16 w-16 h-16 text-(--color-on-surface) rotate-12'
              strokeWidth={1.5}
            />
            <Star
              className='absolute top-10 -right-16 w-14 h-14 text-(--color-on-surface) -rotate-12'
              strokeWidth={1.5}
            />
            <Zap
              className='absolute bottom-16 -left-12 w-14 h-14 text-(--color-on-surface) -rotate-45'
              strokeWidth={1.5}
            />
            <Sparkles
              className='absolute -bottom-10 right-10 w-16 h-16 text-(--color-on-surface) rotate-45'
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* ═══ Metric Cards ══════════════════════════════════════════════ */}
        <div className='flex-1 px-16 pb-10 flex flex-col gap-4'>
          <div className='grid grid-cols-2 gap-4'>
            <DoodleCard dashedBorder>
              <div className='grid grid-cols-[auto_1fr]'>
                <div className='min-w-32 h-full flex items-center justify-center'>
                  <CircleX size={80} />
                </div>
                <div
                  className='text-9xl leading-none text-(--color-on-surface)'
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {results.incidentCount}
                  <div className='font-body text-3xl uppercase tracking-[0.2em] text-(--color-muted) mt-1'>
                    {t('results.cardDistractions')}
                  </div>
                </div>
              </div>
            </DoodleCard>

            <DoodleCard dashedBorder>
              <div className='grid grid-cols-[auto_1fr]'>
                <div className='min-w-32 h-full flex items-center justify-center'>
                  <Clock size={80} />
                </div>
                <div
                  className='text-9xl leading-none text-(--color-on-surface)'
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {formatMs(results.totalDistractedMs)}
                  <div className='font-body text-3xl uppercase tracking-[0.2em] text-(--color-muted) mt-1'>
                    {t('results.cardTimeAway')}
                  </div>
                </div>
              </div>
            </DoodleCard>
          </div>

          <div className='relative flex justify-center'>
            <DoodleCard dashedBorder className='w-full'>
              <div className='grid grid-cols-[auto_1fr]'>
                <div className='min-w-32 h-full flex items-center justify-center'>
                  <Timer size={80} />
                </div>
                <div
                  className='text-9xl leading-none text-(--color-on-surface)'
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {sessionDurationSec}s
                  <div className='font-body text-3xl uppercase tracking-[0.2em] text-(--color-muted) mt-1'>
                    {t('results.cardSessionTime')}
                  </div>
                </div>
              </div>
            </DoodleCard>

            {/* ═══ Mascot with bubble over third card ═══════════════════ */}
            <div className='absolute right-15 top-1/2 translate-y-8 rotate-[8deg] z-10 scale-[1.5]'>
              <MascotEyesStatic
                size='mascot--md'
                score={results.attentionScore}
                direction='top-left'
                lang={lang}
              />
            </div>
          </div>
        </div>

        {/* ═══ Footer ═════════════════════════════════════════════════ */}
        <div className='flex justify-between items-center py-8 px-5 text-center bg-(--color-card) border-t-[5px] border-(--color-border)'>
          <p className='text-xl text-(--color-on-surface) m-0'>{t('results.cardFooterLeft')}</p>
          <p className='text-xl text-(--color-muted) uppercase m-0'>{t('results.cardFooterRight')}</p>
        </div>
      </div>
    </div>
  )
}
