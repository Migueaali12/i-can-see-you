import type { DetectionSignal } from "./detectionEngine"
import { useTranslations } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

export function getDefaultMessage(lang: Lang): string {
  return useTranslations(lang)('mascot.default')
}

export function getSignalMessageVariants(lang: Lang): Record<DetectionSignal, readonly string[]> {
  const t = useTranslations(lang)
  return {
    visibility: [
      t('mascot.visibility.1'),
      t('mascot.visibility.2'),
      t('mascot.visibility.3'),
      t('mascot.visibility.4'),
    ],
    blur: [
      t('mascot.blur.1'),
      t('mascot.blur.2'),
      t('mascot.blur.3'),
      t('mascot.blur.4'),
    ],
    fullscreen: [
      t('mascot.fullscreen.1'),
      t('mascot.fullscreen.2'),
      t('mascot.fullscreen.3'),
      t('mascot.fullscreen.4'),
    ],
    mouseleave: [
      t('mascot.mouseleave.1'),
      t('mascot.mouseleave.2'),
      t('mascot.mouseleave.3'),
      t('mascot.mouseleave.4'),
    ],
    paste: [
      t('mascot.paste.1'),
      t('mascot.paste.2'),
      t('mascot.paste.3'),
      t('mascot.paste.4'),
    ],
    devtools: [
      t('mascot.devtools.1'),
      t('mascot.devtools.2'),
      t('mascot.devtools.3'),
      t('mascot.devtools.4'),
    ],
  }
}

export class MascotController {
  private lastMessageAt = 0
  private cooldownMs: number
  private variantCursor: Record<DetectionSignal, number> = {
    visibility: 0,
    blur: 0,
    fullscreen: 0,
    mouseleave: 0,
    paste: 0,
    devtools: 0,
  }
  private defaultMessage: string
  private signalMessageVariants: Record<DetectionSignal, readonly string[]>

  constructor(lang: Lang, cooldownMs = 4000) {
    this.cooldownMs = cooldownMs
    this.defaultMessage = getDefaultMessage(lang)
    this.signalMessageVariants = getSignalMessageVariants(lang)
    const keys = Object.keys(this.variantCursor) as DetectionSignal[]
    for (const key of keys) {
      this.variantCursor[key] = Math.floor(
        Math.random() * this.signalMessageVariants[key].length,
      )
    }
  }

  private nextVariant(signal: DetectionSignal): string {
    const variants = this.signalMessageVariants[signal]
    const i = this.variantCursor[signal] % variants.length
    this.variantCursor[signal]++
    return variants[i]!
  }

  /** Returns the message to display. Respects cooldown to prevent spam. */
  resolveMessage(signal: DetectionSignal | null, currentMessage: string): string {
    if (!signal) return this.defaultMessage
    const now = Date.now()
    if (now - this.lastMessageAt < this.cooldownMs) return currentMessage
    this.lastMessageAt = now
    return this.nextVariant(signal)
  }
}
