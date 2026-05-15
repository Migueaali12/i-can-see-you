import DialogBubble from "@/components/demo/active-session/DialogBubble"

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
}

function getScoreMessage(score: number): string {
  if (score === 100) return "Perfect focus. Or you just didn't touch anything for 60 seconds. Either way, I'm suspicious."
  if (score >= 90) return "So close to perfect! Your browser almost believed you cared."
  if (score >= 75) return "Not bad. But I saw that tab switch. Don't deny it."
  if (score >= 50) return "Half focused, half elsewhere. Classic multitasker energy."
  if (score >= 20) return "Were you even in the room? Your browser feels neglected."
  return "You started the timer and walked away, didn't you? At least close the tab next time."
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
}: MascotEyesStaticProps) {
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
      aria-label='Observing eyes'
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
        <DialogBubble message={getScoreMessage(score)} />
        {eyes}
      </div>
    )
  }

  return eyes
}
