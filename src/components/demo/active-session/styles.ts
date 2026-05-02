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
