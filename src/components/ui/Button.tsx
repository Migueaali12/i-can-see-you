import type { ReactNode } from "react"

export type ButtonVariant = "black" | "gray"

/** Typography + padding; omit to keep legacy scale from `variant` (black vs gray). */
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

const SIZE_INNER: Record<ButtonSize, string> = {
  xs: "text-xs px-2.5 py-1.5 gap-1",
  sm: "text-sm px-3 py-2 gap-1.5",
  md: "text-base px-5 py-2.5 gap-2",
  lg: "text-lg px-6 py-3 gap-2",
  xl: "text-xl px-8 py-3.5 gap-2",
}

/** Shadow block offset (doodle style), scaled with `size`. */
const SIZE_SHADOW_TRANSLATE: Record<ButtonSize, { rest: string; active: string }> = {
  xs: { rest: "[translate:3px_3px]", active: "group-active:[translate:1px_1px]" },
  sm: { rest: "[translate:4px_4px]", active: "group-active:[translate:2px_2px]" },
  md: { rest: "[translate:5px_5px]", active: "group-active:[translate:2px_2px]" },
  lg: { rest: "[translate:6px_6px]", active: "group-active:[translate:2px_2px]" },
  xl: { rest: "[translate:8px_8px]", active: "group-active:[translate:3px_3px]" },
}

interface ButtonProps {
  href?: string
  variant?: ButtonVariant
  size?: ButtonSize
  type?: "button" | "submit"
  icon?: ReactNode
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  children?: ReactNode
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  className?: string
  innerClassName?: string
}

export default function Button({
  href,
  variant = "black",
  size,
  type = "button",
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  disabled = false,
  loading = false,
  loadingText = "Loading…",
  className,
  innerClassName,
}: ButtonProps) {
  const isGray = variant === "gray"
  const isDisabled = disabled || loading

  const wrapperCls = [
    "relative inline-block group",
    isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
    className ?? "",
  ].join(" ")

  const shadowTranslateClasses = (() => {
    const motion = "transition-[translate] duration-[120ms] ease-in-out"
    if (isDisabled) {
      const rest = size
        ? SIZE_SHADOW_TRANSLATE[size].rest
        : "[translate:6px_6px]"
      return `${rest} ${motion}`
    }
    if (size) {
      const { rest, active } = SIZE_SHADOW_TRANSLATE[size]
      return `${rest} ${motion} ${active}`
    }
    return `[translate:6px_6px] ${motion} group-active:[translate:2px_2px]`
  })()

  const shadowCls = [
    "absolute inset-0",
    shadowTranslateClasses,
    isGray ? "bg-(--color-secondary)" : "bg-black",
  ].join(" ")

  const typographyPadding = size
    ? SIZE_INNER[size]
    : isGray
      ? "text-[1rem] px-[1.4rem] py-[0.7rem] gap-2"
      : "text-[1.2rem] px-8 py-[0.9rem] gap-2"

  const innerCls = [
    "relative inline-flex items-center",
    "border-2 border-black bg-(--color-surface) text-black",
    "font-body font-semibold leading-[1.2]",
    "transition-[transform,translate] duration-[120ms] ease-in-out",
    isDisabled
      ? "cursor-not-allowed"
      : "cursor-pointer hover:-rotate-2 active:[translate:2px_2px]",
    typographyPadding,
    innerClassName ?? "",
  ].join(" ")

  const content = (
    <>
      {loading ? loadingText : children}
      {!loading && icon}
    </>
  )

  return (
    <div
      className={wrapperCls}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={shadowCls} aria-hidden />
      {href ? (
        <a href={href} className={innerCls}>
          {content}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={isDisabled}
          className={innerCls}
        >
          {content}
        </button>
      )}
    </div>
  )
}
