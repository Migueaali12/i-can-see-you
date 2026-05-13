import type { ReactNode } from "react"

export type ContractCardVariant = "default" | "inverted"

const listMarker = "•"

const defaultInnerClass =
  "relative bg-(--color-surface) border-2 border-black pt-12 pb-8 px-8 h-full flex flex-col"

const invertedInnerClass =
  "relative bg-black border-2 border-black pt-12 pb-8 px-8 h-full flex flex-col text-white"

export type ContractCardProps = {
  className?: string
  variant?: ContractCardVariant
  title?: string
  listItems?: string[]
  listMuted?: boolean
  dashedBorder?: boolean
  hasSignatureLine?: boolean
  innerClassName?: string
  children?: ReactNode
}

export function ContractCard({
  className,
  variant = "default",
  title,
  listItems,
  listMuted,
  dashedBorder = false,
  hasSignatureLine = false,
  innerClassName,
  children,
}: ContractCardProps) {
  const isInverted = variant === "inverted"
  const inner = innerClassName ?? (isInverted ? invertedInnerClass : defaultInnerClass)

  return (
    <article className={["relative", className].filter(Boolean).join(" ")}>
      {/* Offset shadow */}
      <div
        className='absolute inset-0 bg-black translate-x-1.5 translate-y-1.5'
        aria-hidden='true'
      />

      {/* Clipboard clip */}
      <div
        className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center'
        aria-hidden='true'
      >
        <div
          className={[
            "w-20 h-7 rounded-sm flex items-center justify-center gap-1",
            isInverted ? "bg-white" : "bg-black",
          ].join(" ")}
        >
          <div
            className={[
              "w-2.5 h-2.5 rounded-full border",
              isInverted
                ? "border-white bg-black"
                : "border-black bg-white",
            ].join(" ")}
          />
          <div
            className={[
              "w-2.5 h-2.5 rounded-full border",
              isInverted
                ? "border-white bg-black"
                : "border-black bg-white",
            ].join(" ")}
          />
        </div>
      </div>

      {/* Main panel */}
      <div className={inner}>
        {dashedBorder && (
          <div
            className='absolute inset-[10px] top-[44px] border border-dashed border-[#ddd] pointer-events-none'
            aria-hidden='true'
          />
        )}

        {title != null && title !== "" ? (
          <h2
            className={[
              "mb-6 font-display text-[1.35rem] font-semibold leading-tight flex items-center gap-2 border-b-2 pb-3",
              isInverted ? "border-white" : "border-current",
            ].join(" ")}
          >
            {title}
          </h2>
        ) : null}

        {listItems != null && listItems.length > 0 ? (
          <ul
            className={[
              "list-none m-0 p-0 flex flex-col gap-4 text-[1.05rem] leading-relaxed grow",
              listMuted ? "opacity-80" : "",
            ].join(" ")}
          >
            {listItems.map((item, i) => (
              <li key={`${i}-${item}`} className='flex items-start gap-[0.6rem]'>
                <span className='mt-[0.15rem] font-bold shrink-0' aria-hidden='true'>
                  {listMarker}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {children}

        {hasSignatureLine && (
          <div className='mt-6 pt-4 border-t border-dashed border-current'>
            <div className='flex items-end gap-2 font-body text-sm opacity-60'>
              <span className='font-bold italic'>X</span>
              <div className='flex-1 border-b-2 border-current' />
            </div>
            <p className='text-xs opacity-40 mt-2 italic'>
              Sign here to confirm you actually read this.
            </p>
          </div>
        )}
      </div>
    </article>
  )
}