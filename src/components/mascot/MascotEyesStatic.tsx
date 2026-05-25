import DialogBubble from "@/components/demo/active-session/DialogBubble"
import { useTranslations } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

type Direction =
  | "center"
  | "left"
  | "right"
  | "up"
  | "down"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"

type Expression = "neutral" | "suspicious" | "annoyed"

export interface MascotEyesStaticProps {
  direction?: Direction
  expression?: Expression
  size?: string
  className?: string
  score?: number
  lang?: Lang
}

function getScoreMessage(t: ReturnType<typeof useTranslations>, score: number): string {
  if (score === 100) return t('mascot.score.100')
  if (score >= 80) return t('mascot.score.80')
  if (score >= 60) return t('mascot.score.60')
  if (score >= 40) return t('mascot.score.40')
  if (score >= 20) return t('mascot.score.20')
  return t('mascot.score.0')
}

const PUPIL_MAX = 0.22

function getOffset(dir: Direction): [number, number] {
  const d = PUPIL_MAX * 0.7
  switch (dir) {
    case "center":
      return [0, 0]
    case "left":
      return [-PUPIL_MAX, 0]
    case "right":
      return [PUPIL_MAX, 0]
    case "up":
      return [0, -PUPIL_MAX]
    case "down":
      return [0, PUPIL_MAX]
    case "top-left":
      return [-d, -d]
    case "top-right":
      return [d, -d]
    case "bottom-left":
      return [-d, d]
    case "bottom-right":
      return [d, d]
  }
}

export default function MascotEyesStatic({
  direction = "center",
  expression = "neutral",
  size = "mascot--hero",
  className = "",
  score,
  lang = "en",
}: MascotEyesStaticProps) {
  const t = useTranslations(lang)
  const [ox, oy] = getOffset(direction)
  const pupilStyle = {
    transform: `translate(calc(-50% + ${ox}em), calc(-50% + ${oy}em))`,
  }
  const rootClass = `mascot ${size} ${className}`.trim()

  const eyes = (
    <div
      className={rootClass}
      data-expression={expression}
      data-idle='false'
      data-transitioning='false'
      role='img'
      aria-label={t('mascot.eyesStaticAria')}
    >
      <div className='mascot__eye'>
        <div
          className='mascot__brow mascot__brow--left'
          aria-hidden='true'
        ></div>
        <div
          className='mascot__brow mascot__brow--right'
          aria-hidden='true'
        ></div>
        <div
          className='mascot__pupil'
          style={pupilStyle}
          aria-hidden='true'
        ></div>
        <div className='mascot__eyelid' aria-hidden='true'></div>
      </div>
      <div className='mascot__eye'>
        <div
          className='mascot__brow mascot__brow--left'
          aria-hidden='true'
        ></div>
        <div
          className='mascot__brow mascot__brow--right'
          aria-hidden='true'
        ></div>
        <div
          className='mascot__pupil'
          style={pupilStyle}
          aria-hidden='true'
        ></div>
        <div className='mascot__eyelid' aria-hidden='true'></div>
      </div>
    </div>
  )

  if (score !== undefined) {
    return (
      <div className="flex flex-col items-center gap-1">
        <DialogBubble message={getScoreMessage(t, score)} />
        {eyes}
      </div>
    )
  }

  return eyes
}
