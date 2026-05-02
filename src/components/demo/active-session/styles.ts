import type { CSSProperties } from "react"
import type { DetectionSignal } from "@/core/detectionEngine"

// ── Design tokens ─────────────────────────────────────────────────
export const t = {
  fontDisplay: "var(--font-display)",
  fontBody: "var(--font-body)",
  secondary: "var(--color-secondary)",
  outline: "var(--color-outline)",
  outlineVariant: "var(--color-outline-variant)",
  surface: "var(--color-surface)",
} as const

// ── Signal label map ──────────────────────────────────────────────
export const SIGNAL_LABELS: Record<DetectionSignal, string> = {
  visibility: "visibility",
  blur: "blur",
  fullscreen: "fullscreen",
  mouseleave: "mouseleave",
  paste: "paste",
  devtools: "devtools",
}

// ── Reusable static style objects ────────────────────────────────
// Shadow layers (hoisted to avoid recreating on each render)
export const shadow4: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "#111",
  translate: "4px 4px",
}

export const shadow6: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "#111",
  translate: "6px 6px",
}

export const shadow9: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "#111",
  translate: "9px 9px",
}

export const shadowGray4: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "#d4d4d4",
  border: "2.5px solid #111",
  translate: "4px 4px",
}

// Card wrapper (relative + flex child)
export const cardWrapperStatus: CSSProperties = {
  position: "relative",
  flex: "2 1 200px",
  minWidth: 0,
  alignSelf: "flex-start",
}

export const cardWrapperIncidents: CSSProperties = {
  position: "relative",
  flex: "1 1 100px",
  minWidth: 0,
  alignSelf: "flex-start",
}

// Card inner base (incidents — static, no dynamic state)
export const incidentsInner: CSSProperties = {
  position: "relative",
  background: "#fff",
  border: "2.5px solid #111",
  padding: "1.25rem 1.5rem",
  textAlign: "center",
}

// Label (uppercase micro-text)
export const microLabel: CSSProperties = {
  fontFamily: t.fontBody,
  fontSize: "0.6rem",
  letterSpacing: "0.14em",
  color: t.secondary,
  textTransform: "uppercase",
}

// ShadowButton wrapper
export const shadowBtnWrapper: CSSProperties = {
  position: "relative",
  display: "inline-block",
}

export const shadowBtnShadow: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "#111",
  translate: "5px 5px",
}
