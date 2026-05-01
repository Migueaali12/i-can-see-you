import type { ReactNode } from "react"

export type DoodleCardCorner = "scan" | "eye-off"

const listMarker = "•"

const defaultInnerClass =
  "relative bg-(--color-surface) border-2 border-black p-8 h-full flex flex-col"

function CornerScanEye() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='text-black'
      aria-hidden='true'
    >
      <path d='M3 7V5a2 2 0 0 1 2-2h2' />
      <path d='M17 3h2a2 2 0 0 1 2 2v2' />
      <path d='M21 17v2a2 2 0 0 1-2 2h-2' />
      <path d='M7 21H5a2 2 0 0 1-2-2v-2' />
      <circle cx='12' cy='12' r='1' />
      <path d='M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0' />
    </svg>
  )
}

function CornerEyeOff() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='text-black'
      aria-hidden='true'
    >
      <path d='M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49' />
      <path d='M14.084 14.158a3 3 0 0 1-4.242-4.242' />
      <path d='M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143' />
      <path d='m2 2 20 20' />
    </svg>
  )
}

function CornerSticker({ corner }: { corner: DoodleCardCorner }) {
  return (
    <div
      className='absolute -top-4 -left-4 w-8 h-8 bg-(--color-surface) -rotate-12 inline-flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:stroke-black [&_svg]:stroke-2'
      aria-hidden='true'
    >
      {corner === "scan" ? <CornerScanEye /> : <CornerEyeOff />}
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
  children,
}: DoodleCardProps) {
  const inner = innerClassName ?? defaultInnerClass
  const showTitle = title != null && title !== ""

  return (
    <article className={["relative", className].filter(Boolean).join(" ")}>
      <div
        className='absolute inset-0 bg-black translate-x-1.5 translate-y-1.5'
        aria-hidden='true'
      />
      <div className={inner}>
        {corner != null ? <CornerSticker corner={corner} /> : null}
        {showTitle ? (
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
