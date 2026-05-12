import { DoodleCard } from "@/components/ui/Card"
import { Info } from "lucide-react"
import type { DetectionSignal } from "@/core/detectionEngine"

const SIGNAL_DESCRIPTIONS: Record<DetectionSignal, string> = {
  visibility:
    "Page Visibility API: Detects when you switch to another tab or minimize the window.",
  blur: "Focus Events: Registers when the active document loses interaction from your operating system.",
  fullscreen: "Fullscreen API: Detects when you exit fullscreen mode.",
  mouseleave:
    "Mouse Leave: Indicates when your cursor leaves the browser viewport.",
  paste: "Paste Event: Registers if you paste content during the session.",
  devtools:
    "DevTools Heuristic: Best-effort estimate of whether developer tools are open.",
}

interface TransparencyBlockProps {
  detectedSignals: DetectionSignal[]
}

export default function TransparencyBlock({
  detectedSignals,
}: TransparencyBlockProps) {
  const signals =
    detectedSignals.length > 0
      ? detectedSignals
      : (Object.keys(SIGNAL_DESCRIPTIONS) as DetectionSignal[])

  return (
    <DoodleCard
      className='animate-in fade-in slide-in-from-bottom-4 duration-500'
      dashedBorder
      innerClassName='relative bg-(--color-surface) border-2 border-black p-6 md:p-8 h-full flex flex-col'
    >
      <h2 className='mb-4 font-display text-[1.35rem] font-semibold leading-tight flex items-center gap-2 border-b-2 border-black pb-3 text-black'>
        <Info className='w-5 h-5' />
        Technical transparency
      </h2>

      <p className='text-sm text-(--color-on-surface-variant) leading-relaxed mb-5'>
        This experiment uses native browser signals to determine your attention
        level, without turning on your camera or invading your actual privacy.
      </p>

      <ul className='flex flex-col gap-3 mb-5'>
        {signals.map((sig) => (
          <li
            key={sig}
            className='flex items-start gap-2 text-sm text-(--color-on-surface)'
          >
            <span className='mt-0.5 shrink-0 w-4 h-4 border-2 border-(--color-outline-variant) rounded-sm flex items-center justify-center'>
              <svg
                viewBox='0 0 16 16'
                className='w-3 h-3'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path d='M4 8h8' />
              </svg>
            </span>
            <span className='leading-relaxed'>{SIGNAL_DESCRIPTIONS[sig]}</span>
          </li>
        ))}
      </ul>

      <p className='text-xs text-(--color-secondary) leading-relaxed border-t border-(--color-outline-variant) pt-4 mt-auto'>
        No behavioral data is stored on our servers. Everything is processed
        locally on this device and cleared on close.
      </p>
    </DoodleCard>
  )
}
