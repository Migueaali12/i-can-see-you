import { t, shadow9, shadowGray4 } from "./styles"

export default function TimerHero({
  timeLeft,
  isUrgent,
}: {
  timeLeft: number
  isUrgent: boolean
}) {
  return (
    <div style={{ position: "relative" }}>
      <div style={shadow9} aria-hidden />
      <div style={shadowGray4} aria-hidden />
      <div
        style={{
          position: "relative",
          background: isUrgent ? "#111" : "#fff",
          border: "2.5px solid #111",
          padding: "3rem 2rem",
          textAlign: "center",
          transition: "background 300ms ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "10px",
            border: `1.5px dashed ${isUrgent ? "#444" : "#ddd"}`,
            pointerEvents: "none",
            transition: "border-color 300ms ease",
          }}
          aria-hidden
        />
        <div
          style={{
            fontFamily: t.fontDisplay,
            fontSize: "clamp(5rem, 20vw, 9rem)",
            fontWeight: 700,
            color: isUrgent ? "#fff" : "#111",
            lineHeight: 1,
            transition: "color 300ms ease",
            position: "relative",
          }}
        >
          {timeLeft}
        </div>
        <div
          style={{
            fontFamily: t.fontBody,
            fontSize: "0.68rem",
            color: isUrgent ? "#888" : t.secondary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: "0.6rem",
            transition: "color 300ms ease",
          }}
        >
          Seconds
        </div>
      </div>
    </div>
  )
}
