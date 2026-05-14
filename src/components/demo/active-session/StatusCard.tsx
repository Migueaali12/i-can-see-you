import type { DetectionSignal } from "@/core/detectionEngine"
import type { FocusStatus } from "./useActiveSession"
import { EyeClosed, ScanEye } from "lucide-react"
import { t, SIGNAL_LABELS } from "./styles"
import { DoodleCard } from "@/components/ui/DoodleCard"

type StatusConfig = {
  label: string
  dot: string
  dotBorder: string
  border: string
  dark: boolean
}

const STATUS_CONFIG: Record<FocusStatus, StatusConfig> = {
  in_focus: {
    label: "IN FOCUS",
    dot: "#111",
    dotBorder: "#111",
    border: "2.5px solid #111",
    dark: false,
  },
  out_of_focus: {
    label: "OUT OF FOCUS",
    dot: "transparent",
    dotBorder: "#111",
    border: "2.5px dashed #111",
    dark: false,
  },
  event_detected: {
    label: "EVENT DETECTED",
    dot: "#fff",
    dotBorder: "#fff",
    border: "2.5px solid #111",
    dark: true,
  },
}

export default function StatusCard({
  status,
  signal,
}: {
  status: FocusStatus
  signal: DetectionSignal | null
}) {
  const cfg = STATUS_CONFIG[status]
  const Icon =
    status === "out_of_focus" || status === "event_detected"
      ? EyeClosed
      : ScanEye
  const iconColor = cfg.dark ? "#fff" : "#111"

  return (
    <DoodleCard
      className='min-w-0'
      innerClassName='relative px-6 py-5 transition-[background] duration-300'
      innerStyle={{
        background: cfg.dark ? "#111" : "#fff",
        border: cfg.border,
      }}
      dashedBorder
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "0.85rem",
        }}
      >
        <span
          style={{
            fontFamily: t.fontBody,
            fontSize: "0.6rem",
            letterSpacing: "0.14em",
            color: cfg.dark ? "#888" : t.secondary,
            textTransform: "uppercase",
          }}
        >
          Session status
        </span>

        <Icon size={44} strokeWidth={2.25} color={iconColor} aria-hidden />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
        <div
          style={{
            width: "0.65rem",
            height: "0.65rem",
            borderRadius: "50%",
            background: cfg.dot,
            border: `2px solid ${cfg.dotBorder}`,
            flexShrink: 0,
            transition: "all 300ms ease",
          }}
        />
        <span
          style={{
            fontFamily: t.fontDisplay,
            fontSize: "clamp(1.5rem, 3.8vw, 2rem)",
            fontWeight: 700,
            color: cfg.dark ? "#fff" : "#111",
            lineHeight: 1,
            transition: "color 300ms ease",
          }}
        >
          {cfg.label}
        </span>
      </div>

      <div
        style={{
          fontFamily: t.fontBody,
          fontSize: "0.65rem",
          color: cfg.dark ? "#888" : t.secondary,
          letterSpacing: "0.06em",
          marginTop: "0.6rem",
          minHeight: "1em",
          opacity: signal ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
      >
        {signal ? `signal: ${SIGNAL_LABELS[signal]}` : "—"}
      </div>
    </DoodleCard>
  )
}
