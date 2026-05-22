import type { DetectionSignal } from "@/core/detectionEngine"
import { useTranslations } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

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
export function getSignalLabels(lang: Lang): Record<DetectionSignal, string> {
  const tr = useTranslations(lang)
  return {
    visibility: tr('signal.visibility'),
    blur: tr('signal.blur'),
    fullscreen: tr('signal.fullscreen'),
    mouseleave: tr('signal.mouseleave'),
    paste: tr('signal.paste'),
    devtools: tr('signal.devtools'),
  }
}
