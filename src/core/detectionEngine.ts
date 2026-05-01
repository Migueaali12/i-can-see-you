export type DetectionSignal =
  | "visibility"
  | "blur"
  | "fullscreen"
  | "mouseleave"
  | "paste"
  | "devtools"

export interface DetectionEvent {
  id: string
  type: DetectionSignal
  startedAt: number
  endedAt?: number
  durationMs?: number
  confidence: "high" | "medium" | "low"
  source: "browser_api" | "heuristic"
}

interface EngineCallbacks {
  onEventStart: (event: DetectionEvent) => void
  onEventEnd: (id: string, endedAt: number) => void
}

const DEVTOOLS_THRESHOLD = 160

function uid(type: DetectionSignal): string {
  return `${type}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
}

export class DetectionEngine {
  private cleanups: Array<() => void> = []
  private activeIds = new Map<DetectionSignal, string>()
  private hadFullscreen = false
  private devtoolsOpen = false
  private devtoolsTimer?: ReturnType<typeof setInterval>
  private onEventStart: EngineCallbacks["onEventStart"]
  private onEventEnd: EngineCallbacks["onEventEnd"]

  constructor(callbacks: EngineCallbacks) {
    this.onEventStart = callbacks.onEventStart
    this.onEventEnd = callbacks.onEventEnd
  }

  private open(
    type: DetectionSignal,
    confidence: DetectionEvent["confidence"],
    source: DetectionEvent["source"],
  ) {
    if (this.activeIds.has(type)) return
    const id = uid(type)
    this.activeIds.set(type, id)
    this.onEventStart({ id, type, startedAt: Date.now(), confidence, source })
  }

  private close(type: DetectionSignal) {
    const id = this.activeIds.get(type)
    if (!id) return
    this.activeIds.delete(type)
    this.onEventEnd(id, Date.now())
  }

  start() {
    // 1. visibilitychange
    const onVisibility = () => {
      if (document.hidden) this.open("visibility", "high", "browser_api")
      else this.close("visibility")
    }
    document.addEventListener("visibilitychange", onVisibility)
    this.cleanups.push(() =>
      document.removeEventListener("visibilitychange", onVisibility),
    )

    // 2. window blur / focus
    const onBlur = () => this.open("blur", "high", "browser_api")
    const onFocus = () => this.close("blur")
    window.addEventListener("blur", onBlur)
    window.addEventListener("focus", onFocus)
    this.cleanups.push(() => {
      window.removeEventListener("blur", onBlur)
      window.removeEventListener("focus", onFocus)
    })

    // 3. fullscreenchange — only emit on exit (if user was in fullscreen)
    const onFullscreen = () => {
      if (document.fullscreenElement) {
        this.hadFullscreen = true
        this.close("fullscreen")
      } else if (this.hadFullscreen) {
        this.open("fullscreen", "medium", "browser_api")
        setTimeout(() => this.close("fullscreen"), 3500)
      }
    }
    document.addEventListener("fullscreenchange", onFullscreen)
    this.cleanups.push(() =>
      document.removeEventListener("fullscreenchange", onFullscreen),
    )

    // 4. mouse leaves viewport
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) this.open("mouseleave", "medium", "browser_api")
    }
    const onEnter = (e: MouseEvent) => {
      if (!e.relatedTarget) this.close("mouseleave")
    }
    document.documentElement.addEventListener("mouseleave", onLeave)
    document.documentElement.addEventListener("mouseenter", onEnter)
    this.cleanups.push(() => {
      document.documentElement.removeEventListener("mouseleave", onLeave)
      document.documentElement.removeEventListener("mouseenter", onEnter)
    })

    // 5. paste
    const onPaste = () => {
      this.open("paste", "medium", "browser_api")
      setTimeout(() => this.close("paste"), 2500)
    }
    document.addEventListener("paste", onPaste)
    this.cleanups.push(() => document.removeEventListener("paste", onPaste))

    // 6. devtools heuristic (size-based, best-effort)
    this.devtoolsTimer = setInterval(() => {
      const isOpen =
        window.outerWidth - window.innerWidth > DEVTOOLS_THRESHOLD ||
        window.outerHeight - window.innerHeight > DEVTOOLS_THRESHOLD
      if (isOpen && !this.devtoolsOpen) {
        this.devtoolsOpen = true
        this.open("devtools", "low", "heuristic")
      } else if (!isOpen && this.devtoolsOpen) {
        this.devtoolsOpen = false
        this.close("devtools")
      }
    }, 500)
    this.cleanups.push(() => clearInterval(this.devtoolsTimer))

    // Check initial focus state
    if (document.hidden) this.open("visibility", "high", "browser_api")
    if (!document.hasFocus()) this.open("blur", "high", "browser_api")
  }

  stop() {
    this.cleanups.forEach((fn) => fn())
    this.cleanups = []
    for (const type of [...this.activeIds.keys()]) {
      this.close(type)
    }
  }
}
