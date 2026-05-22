import { DoodleCard } from "@/components/ui/DoodleCard"
import { Info } from "lucide-react"
import type { DetectionSignal } from "@/core/detectionEngine"
import { useTranslations } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

function useSignalDescriptions(lang: Lang) {
  const t = useTranslations(lang)
  return {
    visibility: t('signal.description.visibility'),
    blur: t('signal.description.blur'),
    fullscreen: t('signal.description.fullscreen'),
    mouseleave: t('signal.description.mouseleave'),
    paste: t('signal.description.paste'),
    devtools: t('signal.description.devtools'),
  } as Record<DetectionSignal, string>
}

interface TransparencyBlockProps {
  detectedSignals: DetectionSignal[]
  lang?: Lang
}

export default function TransparencyBlock({
  detectedSignals,
  lang = 'en',
}: TransparencyBlockProps) {
  const t = useTranslations(lang)
  const signalDescriptions = useSignalDescriptions(lang)

  const signals =
    detectedSignals.length > 0
      ? detectedSignals
      : (Object.keys(signalDescriptions) as DetectionSignal[])

  return (
    <DoodleCard
      className='animate-in fade-in slide-in-from-bottom-4 duration-500'
      dashedBorder
      innerClassName='relative bg-(--color-surface) border-2 border-(--color-border) p-6 md:p-8 h-full flex flex-col'
    >
      <h2 className='mb-4 font-display text-[1.35rem] font-semibold leading-tight flex items-center gap-2 border-b-2 border-(--color-border) pb-3 text-(--color-on-card)'>
        <Info className='w-5 h-5' />
        {t('results.transparencyTitle')}
      </h2>

      <p className='text-sm text-(--color-on-surface-variant) leading-relaxed mb-5'>
        {t('results.transparencyText')}
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
            <span className='leading-relaxed'>{signalDescriptions[sig]}</span>
          </li>
        ))}
      </ul>

      <p className='text-xs text-(--color-secondary) leading-relaxed border-t border-(--color-outline-variant) pt-4 mt-auto'>
        {t('results.transparencyFooter')}
      </p>
    </DoodleCard>
  )
}
