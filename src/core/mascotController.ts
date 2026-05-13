import type { DetectionSignal } from "./detectionEngine"

/** Several lines per signal so each new incident can pick the next variant (playful / ironic). */
export const SIGNAL_MESSAGE_VARIANTS: Record<
  DetectionSignal,
  readonly string[]
> = {
  visibility: [
    "Hey… that tab went on a little trip.",
    "Back already—or was that another tab pretending to care?",
    "The page hid. My eyebrows didn't.",
    "Multitasking, or evasive maneuvering? Tomato, suspicious tomato.",
  ],
  blur: [
    "Tiny distraction detected. I saw everything.",
    "Focus wandered off. Should I file a missing-person report?",
    "You were late coming back—busy being mysterious?",
    "Window lost focus; my notebook kept score anyway.",
  ],
  fullscreen: [
    "Fullscreen exit… already bored?",
    "Couldn't commit to the big picture for long, huh?",
    "Shrinking back to normal—stage fright or strategy?",
    "The cinematic experience ended sooner than the trailer promised.",
  ],
  mouseleave: [
    "Your mouse escaped the notebook.",
    "Cursor left the crime scene. Convenient.",
    "Pointer off-stage again—rehearsing your alibi?",
    "The mouse slipped away like it owed me money.",
  ],
  paste: [
    "Paste detected. Creative cheating?",
    "Ctrl+V with confidence. Brave.",
    "That's a lot of clipboard ambition for one sitting.",
    "Imported wisdom—or wholesale borrowing?",
  ],
  devtools: [
    "Hmm… curious eyes behind the curtain?",
    "Inspecting me? I'm touched. Also filing that away.",
    "DevTools open—doing homework or hunting bugs in my ego?",
    "Peeking under the hood. Cute. Obvious, but cute.",
  ],
}

export const DEFAULT_MESSAGE = "All good… for now."

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

  constructor(cooldownMs = 4000) {
    this.cooldownMs = cooldownMs
    const keys = Object.keys(this.variantCursor) as DetectionSignal[]
    for (const key of keys) {
      this.variantCursor[key] = Math.floor(
        Math.random() * SIGNAL_MESSAGE_VARIANTS[key].length,
      )
    }
  }

  private nextVariant(signal: DetectionSignal): string {
    const variants = SIGNAL_MESSAGE_VARIANTS[signal]
    const i = this.variantCursor[signal] % variants.length
    this.variantCursor[signal]++
    return variants[i]!
  }

  /** Returns the message to display. Respects cooldown to prevent spam. */
  resolveMessage(signal: DetectionSignal | null, currentMessage: string): string {
    if (!signal) return DEFAULT_MESSAGE
    const now = Date.now()
    if (now - this.lastMessageAt < this.cooldownMs) return currentMessage
    this.lastMessageAt = now
    return this.nextVariant(signal)
  }
}
