import type { CSSProperties, ReactNode } from "react"
import { CircleCheck, CircleX } from "lucide-react"

export type DoodleCardCorner = "scan" | "eye-off"

const listMarker = "•"

const defaultInnerClass =
  "relative bg-(--color-surface) border-2 border-black p-8 h-full flex flex-col"

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
 */
export function DoodleCard({
  className,
  corner,
  title,
  listItems,
  listMuted,
  innerClassName,
  innerStyle,
  dashedBorder = false,
  children,
}: DoodleCardProps) {
  const inner = innerClassName ?? defaultInnerClass

  return (
    <article className={["relative", className].filter(Boolean).join(" ")}>
      <div
        className='absolute inset-0 bg-black translate-x-1.5 translate-y-1.5'
        aria-hidden='true'
      />
      <div className={inner} style={innerStyle}>
        {dashedBorder && (
          <div
            className='absolute inset-[10px] border border-dashed border-[#ddd] pointer-events-none'
            aria-hidden='true'
          />
        )}
        {corner != null ? <CornerSticker corner={corner} /> : null}
        {(title != null && title !== "") ? (
          <h2 className='mb-6 font-display text-[1.35rem] font-semibold leading-tight flex items-center gap-2 border-b-2 border-black pb-3 text-black'>
            {title}
          </h2>
        ) : null}
        {listItems != null && listItems.length > 0 ? (
          <ul
            className={[
              "list-none m-0 p-0 flex flex-col gap-4 text-[1.05rem] leading-relaxed text-(--color-on-surface) grow",
              listMuted ? "opacity-80" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {listItems.map((item, i) => (
              <li key={`${i}-${item}`} className='flex items-start gap-[0.6rem]'>
                <span
                  className='text-black mt-[0.15rem] font-bold shrink-0'
                  aria-hidden='true'
                >
                  {listMarker}
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
