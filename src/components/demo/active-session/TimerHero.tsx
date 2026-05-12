import { useState } from "react"
import { X } from "lucide-react"
import { t } from "./styles"
import Button from "@/components/ui/Button"

export default function TimerHero({
  timeLeft,
  isUrgent,
  onStop,
}: {
  timeLeft: number
  isUrgent: boolean
  onStop?: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Button
      variant="gray"
      className="block w-full"
      onClick={onStop}
      onMouseEnter={onStop ? () => setHovered(true) : undefined}
      onMouseLeave={onStop ? () => setHovered(false) : undefined}
      innerClassName={[
        "relative block w-full text-center flex-col",
        isUrgent ? "!bg-[#111]" : "",
      ].join(" ")}
    >
      {/* Dashed inset border — same as DoodleCard dashedBorder prop */}
      <div
        className="absolute inset-[10px] border border-dashed pointer-events-none transition-[border-color] duration-300"
        style={{ borderColor: isUrgent ? "#444" : "#ddd" }}
        aria-hidden
      />

      {/* Timer number */}
      <div
        style={{
          fontFamily: t.fontDisplay,
          fontSize: "clamp(5rem, 20vw, 9rem)",
          fontWeight: 700,
          color: isUrgent ? "#fff" : "#111",
          lineHeight: 1,
          opacity: hovered && onStop ? 0.12 : 1,
          transition: "color 300ms ease, opacity 200ms ease",
        }}
      >
        {timeLeft}
      </div>

      {/* "Seconds" label */}
      <div
        style={{
          fontFamily: t.fontBody,
          fontSize: "0.68rem",
          color: isUrgent ? "#888" : t.secondary,
          marginBottom: "0.9rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: hovered && onStop ? 0 : 1,
          transition: "color 300ms ease, opacity 200ms ease",
        }}
      >
        Seconds
      </div>

      {/* Stop hint on hover */}
      {onStop && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            opacity: hovered ? 1 : 0,
            transition: "opacity 160ms ease",
            pointerEvents: "none",
          }}
          aria-hidden
        >
          <X size={18} strokeWidth={2.5} style={{ color: isUrgent ? "#fff" : "#111" }} />
          <span
            style={{
              fontFamily: t.fontBody,
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: isUrgent ? "#fff" : "#111",
            }}
          >
            Stop
          </span>
        </div>
      )}
    </Button>
  )
}
