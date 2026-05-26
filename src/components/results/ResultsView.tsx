import { useEffect, useMemo, useRef, useState } from "react"
import {
  clearResults,
  loadResults,
  type SessionResults,
} from "@/core/resultsBuilder"
import type { DetectionSignal } from "@/core/detectionEngine"
import MascotEyes from "@/components/mascot/MascotEyes"
import MetricsRow from "./MetricsRow"
import SessionTimeline from "./SessionTimeline"
import TransparencyBlock from "./TransparencyBlock"
import Button from "@/components/ui/Button"
import { Loader, RefreshCw, Share2 } from "lucide-react"
import { toBlob } from "html-to-image"
import ShareableCard from "./ShareableCard"
import { useTranslations, getRelativeLocaleUrl } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

type Expression = "neutral" | "suspicious" | "annoyed"

function getScoreExpression(score: number): Expression {
  if (score >= 80) return "neutral"
  if (score >= 50) return "suspicious"
  return "annoyed"
}

function getDetectedSignals(results: SessionResults): DetectionSignal[] {
  const types = new Set<DetectionSignal>()
  for (const ev of results.events.closed) types.add(ev.type)
  for (const ev of results.events.open) types.add(ev.type)
  return Array.from(types)
}

interface ResultsViewProps {
  lang?: Lang
}

export default function ResultsView({ lang = 'en' }: ResultsViewProps) {
  const t = useTranslations(lang)
  const [results] = useState<SessionResults | null>(() => loadResults())
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    clearResults()
  }, [])

  const [shareStatus, setShareStatus] = useState<
    "idle" | "copied" | "error" | "sharing"
  >("idle")

  const detectedSignals = useMemo(
    () => (results ? getDetectedSignals(results) : []),
    [results],
  )

  const handleShare = async () => {
    if (!cardRef.current || !results) return

    try {
      setShareStatus("sharing")

      await document.fonts.ready

      const blob = await toBlob(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      })

      if (!blob) {
        setShareStatus("error")
        setTimeout(() => setShareStatus("idle"), 2000)
        return
      }

      const file = new File([blob], "icanseeyou-results.png", {
        type: "image/png",
      })

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: t('results.shareTitle'),
          text: t('results.shareText', { score: results.attentionScore }),
          files: [file],
        })
        setShareStatus("copied")
        setTimeout(() => setShareStatus("idle"), 2000)
      } else {
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "icanseeyou-results.png"
        link.click()
        URL.revokeObjectURL(url)
        setShareStatus("copied")
        setTimeout(() => setShareStatus("idle"), 2000)
      }
    } catch {
      setShareStatus("error")
      setTimeout(() => setShareStatus("idle"), 2000)
    }
  }

  if (!results) {
    return (
      <div className='flex flex-col items-center justify-center flex-1 px-6 text-center min-h-[calc(100dvh-150px)]'>
        <MascotEyes
          size='mascot--md'
          expression='suspicious'
          className='mb-8'
        />
        <h1 className='font-display text-4xl md:text-5xl text-(--color-on-card) mb-4'>
          {t('results.noResults')}
        </h1>
        <p className='text-(--color-secondary) text-base md:text-lg mb-8 max-w-md'>
          {t('results.noResultsBody')}
        </p>
        <Button href={getRelativeLocaleUrl(lang, '/demo')} variant='black' size='lg' icon={<RefreshCw />}>
          {t('results.tryDetection')}
        </Button>
      </div>
    )
  }

  const expression = getScoreExpression(results.attentionScore)

  const hiddenResultsCard = results ? (
    <div
      style={{
        position: "absolute",
        top: "-9999px",
        left: "-9999px",
        width: "1080px",
        height: "1920px",
        backgroundColor: "#ffffff",
      }}
    >
      <div ref={cardRef} className='w-full h-full'>
        <ShareableCard results={results} lang={lang} />
      </div>
    </div>
  ) : null

  return (
    <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16 flex flex-col gap-8 md:gap-12'>
      <div className='flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-2 duration-500'>
        <MascotEyes
          size='mascot--md'
          expression={expression}
          className='mb-6'
        />
        <h1 className='font-display text-4xl md:text-6xl text-(--color-on-card) m-0 tracking-tight'>
          {t('results.yourResults')}
        </h1>
        <p className='text-base md:text-lg text-(--color-secondary) mt-4 max-w-xl leading-relaxed m-0'>
          {t('results.subtitle')}
        </p>
      </div>

      <MetricsRow results={results} lang={lang} />

      <SessionTimeline results={results} lang={lang} />

      <TransparencyBlock detectedSignals={detectedSignals} lang={lang} />

      <div className='flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500'>
        <Button href={getRelativeLocaleUrl(lang, '/demo')} variant='gray' size='lg' icon={<RefreshCw />}>
          {t('common.retry')}
        </Button>
        <Button
          disabled={shareStatus === "sharing"}
          variant='gray'
          size='lg'
          icon={
            shareStatus === "sharing" ? (
              <Loader className='animate-spin' />
            ) : (
              <Share2 />
            )
          }
          onClick={handleShare}
        >
          {shareStatus === "sharing"
            ? t('common.shareSharing')
            : shareStatus === "copied"
              ? t('common.shareShared')
              : shareStatus === "error"
                ? t('common.shareError')
                : t('common.share')}
        </Button>
      </div>

      {hiddenResultsCard}
    </div>
  )
}
