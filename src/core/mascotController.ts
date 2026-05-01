import type { DetectionSignal } from "./detectionEngine"

export const SIGNAL_MESSAGES: Record<DetectionSignal, string> = {
  visibility: "Hey… that tab went on a little trip.",
  blur: "Tiny distraction detected. I saw everything.",
  fullscreen: "Fullscreen exit… already bored?",
  mouseleave: "Your mouse escaped the notebook.",
  paste: "Paste detected. Creative cheating?",
  devtools: "Hmm… curious eyes behind the curtain?",
}

export const DEFAULT_MESSAGE = "All good… for now."

export class MascotController {
  private lastMessageAt = 0
  private cooldownMs: number

  constructor(cooldownMs = 4000) {
    this.cooldownMs = cooldownMs
  }

  /** Returns the message to display. Respects cooldown to prevent spam. */
  resolveMessage(signal: DetectionSignal | null, currentMessage: string): string {
    if (!signal) return DEFAULT_MESSAGE
    const now = Date.now()
    if (now - this.lastMessageAt < this.cooldownMs) return currentMessage
    this.lastMessageAt = now
    return SIGNAL_MESSAGES[signal]
  }
}
