import type { CSSProperties, ReactNode } from "react"
import { CircleCheck, CircleX, Dot } from "lucide-react"

export type DoodleCardCorner = "scan" | "eye-off"
export type DoodleCardVariant = "default" | "inverted"

const defaultInnerClass =
  "relative bg-(--color-surface) border-2 border-black p-[clamp(1.25rem,4vh,2rem)] h-full flex flex-col"

const invertedInnerClass =
  "relative bg-black border-2 border-black p-[clamp(1.25rem,4vh,2rem)] h-full flex flex-col text-white"

function CornerSticker({ corner }: { corner: DoodleCardCorner }) {
  const Icon = corner === "scan" ? CircleCheck : CircleX
  return (
    <div
      className='absolute -top-4 -left-4 w-8 h-8 bg-(--color-surface) -rotate-12 inline-flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:stroke-black [&_svg]:stroke-2'
      aria-hidden='true'
    >
      <Icon className='text-black' size={24} strokeWidth={2} aria-hidden />
    </div>
  )
}

export type DoodleCardProps = {
  className?: string
  /** Extra classes applied to the offset shadow element behind the card. */
  shadowClassName?: string
  /** Visual variant: "default" or "inverted" (dark/black). */
  variant?: DoodleCardVariant
  corner?: DoodleCardCorner
  title?: string
  listItems?: string[]
  listMuted?: boolean
  /** Replaces default inner panel classes (border, padding, flex). */
  innerClassName?: string
  /** Inline styles applied to the inner panel (useful for dynamic values like border or background). */
  innerStyle?: CSSProperties
  /** Adds a dashed inset border inside the card panel. */
  dashedBorder?: boolean
  children?: ReactNode
}

/**
 * Notebook-style card with offset shadow, matching landing coverage blocks.
 *
 * Use `variant="inverted"` for a black background / white text card.
 * `className` targets the main card `<article>`; use `shadowClassName` to style the shadow div separately.
 */
export function DoodleCard({
  className,
  shadowClassName,
  variant = "default",
  corner,
  title,
  listItems,
  listMuted,
  innerClassName,
  innerStyle,
  dashedBorder = false,
  children,
}: DoodleCardProps) {
  const isInverted = variant === "inverted"
  const inner = innerClassName ?? (isInverted ? invertedInnerClass : defaultInnerClass)

  return (
    <article className={["relative", className].filter(Boolean).join(" ")}>
      {/* Offset shadow */}
      <div
        className={[
          "absolute inset-0 bg-black translate-x-1.5 translate-y-1.5",
          shadowClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden='true'
      />

      {/* Main panel */}
      <div className={inner} style={innerStyle}>
        {dashedBorder && (
          <div
            className='absolute inset-[10px] border border-dashed border-[#ddd] pointer-events-none'
            aria-hidden='true'
          />
        )}

        {corner != null ? <CornerSticker corner={corner} /> : null}

        {title != null && title !== "" ? (
          <h2 className='mb-[clamp(0.75rem,2vh,1.5rem)] font-display text-[1.35rem] font-semibold leading-tight flex items-center gap-2 border-b-2 border-current pb-[clamp(0.5rem,1.5vh,0.75rem)]'>
            {title}
          </h2>
        ) : null}

        {listItems != null && listItems.length > 0 ? (
          <ul
            className={[
              "list-none m-0 p-0 flex flex-col gap-[clamp(0.5rem,1.5vh,1rem)] text-[1.05rem] leading-relaxed grow",
              listMuted ? "opacity-80" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {listItems.map((item, i) => (
              <li key={`${i}-${item}`} className='flex items-start gap-[0.6rem]'>
                <span className='mt-[0.2rem] shrink-0' aria-hidden='true'>
                  <Dot size={18} strokeWidth={2.5} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {children}
      </div>
    </article>
  )
}
