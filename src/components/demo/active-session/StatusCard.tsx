import type { DetectionSignal } from "@/core/detectionEngine"
import type { FocusStatus } from "./useActiveSession"
import { EyeClosed, ScanEye } from "lucide-react"
import { t, getSignalLabels } from "./styles"
import { DoodleCard } from "@/components/ui/DoodleCard"
import { useTranslations } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

type StatusConfig = {
  label: string
  dotBg: string
  dotBorder: string
  text: string
  labelColor: string
  iconColor: string
  bg: string
  borderStyle: string
}

function getStatusConfig(lang: Lang): Record<FocusStatus, StatusConfig> {
  const tr = useTranslations(lang)
  return {
    in_focus: {
      label: tr('demo.inFocus'),
      dotBg: "var(--color-on-card)",
      dotBorder: "var(--color-on-card)",
      text: "var(--color-on-card)",
      labelColor: "var(--color-secondary)",
      iconColor: "var(--color-on-card)",
      bg: "var(--color-card)",
      borderStyle: "2.5px solid var(--color-border)",
    },
    out_of_focus: {
      label: tr('demo.outOfFocus'),
      dotBg: "transparent",
      dotBorder: "var(--color-on-card)",
      text: "var(--color-on-card)",
      labelColor: "var(--color-secondary)",
      iconColor: "var(--color-on-card)",
      bg: "var(--color-card)",
      borderStyle: "2.5px dashed var(--color-border)",
    },
    event_detected: {
      label: tr('demo.eventDetected'),
      dotBg: "var(--color-card)",
      dotBorder: "var(--color-card)",
      text: "var(--color-card)",
      labelColor: "var(--color-muted)",
      iconColor: "var(--color-card)",
      bg: "var(--color-on-card)",
      borderStyle: "2.5px solid var(--color-border)",
    },
  }
}

interface StatusCardProps {
  status: FocusStatus
  signal: DetectionSignal | null
  lang?: Lang
}

export default function StatusCard({
  status,
  signal,
  lang = 'en',
}: StatusCardProps) {
  const tr = useTranslations(lang)
  const cfg = getStatusConfig(lang)[status]
  const Icon =
    status === "out_of_focus" || status === "event_detected"
      ? EyeClosed
      : ScanEye

  const signalLabels = getSignalLabels(lang)

  return (
    <DoodleCard
      className='min-w-0'
      innerClassName='relative px-6 py-5 transition-[background] duration-300'
      innerStyle={{
        background: cfg.bg,
        border: cfg.borderStyle,
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
            color: cfg.labelColor,
            textTransform: "uppercase",
          }}
        >
          {tr('demo.sessionStatus')}
        </span>

        <Icon size={44} strokeWidth={2.25} color={cfg.iconColor} aria-hidden />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
        <div
          style={{
            width: "0.65rem",
            height: "0.65rem",
            borderRadius: "50%",
            background: cfg.dotBg,
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
            color: cfg.text,
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
          color: cfg.labelColor,
          letterSpacing: "0.06em",
          marginTop: "0.6rem",
          minHeight: "1em",
          opacity: signal ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
      >
        {signal ? `signal: ${signalLabels[signal]}` : "—"}
      </div>
    </DoodleCard>
  )
}
