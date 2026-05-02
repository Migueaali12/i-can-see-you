import type { ReactNode } from "react"
import { t, shadowBtnWrapper, shadowBtnShadow } from "./styles"

type Variant = "primary" | "danger" | "ghost"

const bgMap: Record<Variant, string> = {
  primary: "#111",
  danger: t.surface,
  ghost: t.surface,
}

const colorMap: Record<Variant, string> = {
  primary: "#fff",
  danger: "#111",
  ghost: "#111",
}

export default function ShadowButton({
  onClick,
  children,
  variant = "primary",
  large = false,
}: {
  onClick: () => void
  children: ReactNode
  variant?: Variant
  large?: boolean
}) {
  return (
    <div style={shadowBtnWrapper}>
      <div style={shadowBtnShadow} aria-hidden />
      <button
        onClick={onClick}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: large ? "1rem 2.8rem" : "0.6rem 1.3rem",
          border: "2.5px solid #111",
          background: bgMap[variant],
          color: colorMap[variant],
          fontFamily: t.fontBody,
          fontSize: large ? "1rem" : "0.75rem",
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          transition: "transform 100ms ease, translate 100ms ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.transform =
            "rotate(-1.5deg)"
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.transform = ""
        }}
        onMouseDown={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.translate = "3px 3px"
        }}
        onMouseUp={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.translate = ""
        }}
      >
        {children}
      </button>
    </div>
  )
}
