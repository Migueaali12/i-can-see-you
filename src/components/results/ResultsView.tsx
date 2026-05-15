import { useMemo, useRef } from "react"
import {
  clearResults,
  loadResults,
  type SessionResults,
} from "@/core/resultsBuilder"
import type { DetectionSignal } from "@/core/detectionEngine"
import { useState } from "react"
import MascotEyes from "@/components/mascot/MascotEyes"
import MetricsRow from "./MetricsRow"
import SessionTimeline from "./SessionTimeline"
import TransparencyBlock from "./TransparencyBlock"
import Button from "@/components/ui/Button"
import { RefreshCw, Share2 } from "lucide-react"
import { toBlob } from "html-to-image"
import ShareableCard from "./ShareableCard"

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

export default function ResultsView() {
  const [results] = useState<SessionResults | null>(() => {
    const data = loadResults()
    if (data) clearResults()
    return data
  })

  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  )

  const detectedSignals = useMemo(
    () => (results ? getDetectedSignals(results) : []),
    [results],
  )

  const handleShare = async () => {
    if (!cardRef.current || !results) return

    try {
      // 1. Wait for fonts to be loaded
      await document.fonts.ready

      // 2. Capture the card as a PNG blob
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      })

      if (!blob) {
        setShareStatus("error")
        setTimeout(() => setShareStatus("idle"), 2000)
        return
      }

      // 3. Create a File object for the Web Share API
      const file = new File([blob], "icanseeyou-results.png", {
        type: "image/png",
      })

      // 4. Try native Web Share API with the image file
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "I Can See You — My Attention Score",
          text: `I scored ${results.attentionScore}% attention. Can you do better?`,
          files: [file],
        })
      } else {
        // 5. Fallback: trigger download
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "icanseeyou-results.png"
        link.click()
        URL.revokeObjectURL(url)
        setShareStatus("copied") // or create a new "downloaded" status
        setTimeout(() => setShareStatus("idle"), 2000)
      }
    } catch {
      setShareStatus("error")
      setTimeout(() => setShareStatus("idle"), 2000)
    }
  }

  if (!results) {
    return (
      <div className='flex flex-col items-center justify-center flex-1 px-6 text-center min-h-[78svh]'>
        <MascotEyes
          size='mascot--md'
          expression='suspicious'
          className='mb-8'
        />
        <h1 className='font-display text-4xl md:text-5xl text-black mb-4'>
          No results
        </h1>
        <p className='text-(--color-secondary) text-base md:text-lg mb-8 max-w-md'>
          It looks like you haven't completed a detection session yet. Let's try
          again.
        </p>
        <Button href='/demo' variant='black' size='lg' icon={<RefreshCw />}>
          Try detection
        </Button>
      </div>
    )
  }

  const expression = getScoreExpression(results.attentionScore)
  const cardRef = useRef<HTMLDivElement>(null)

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
        <ShareableCard results={results} />
      </div>
    </div>
  ) : null

  return (
    <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16 flex flex-col gap-8 md:gap-12'>
      {/* ── Hero Header ─────────────────────────────────────────────── */}
      <div className='flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-2 duration-500'>
        <MascotEyes
          size='mascot--md'
          expression={expression}
          className='mb-6'
        />
        <h1 className='font-display text-4xl md:text-6xl text-black m-0 tracking-tight'>
          Your results
        </h1>
        <p className='text-base md:text-lg text-(--color-secondary) mt-4 max-w-xl leading-relaxed m-0'>
          The sketchbook stopped watching you (for now). Here's a summary of
          your attention during the session.
        </p>
      </div>

      {/* ── Metric Cards ────────────────────────────────────────────── */}
      <MetricsRow results={results} />

      {/* ── Session Timeline ─────────────────────────────────────────── */}
      <SessionTimeline results={results} />

      {/* ── Transparency Block ───────────────────────────────────────── */}
      <TransparencyBlock detectedSignals={detectedSignals} />

      {/* ── CTA Buttons ─────────────────────────────────────────────── */}
      <div className='flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500'>
        <Button href='/demo' variant='gray' size='lg' icon={<RefreshCw />}>
          Retry demo
        </Button>
        <Button
          variant='gray'
          size='lg'
          icon={<Share2 />}
          onClick={handleShare}
        >
          {shareStatus === "copied"
            ? "Copied!"
            : shareStatus === "error"
              ? "Error sharing"
              : "Share"}
        </Button>
      </div>

      {/* Hidden card for capture */}
      {hiddenResultsCard}
    </div>
  )
}
