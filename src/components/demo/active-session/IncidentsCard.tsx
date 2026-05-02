import {
  t,
  shadow6,
  cardWrapperIncidents,
  incidentsInner,
  microLabel,
} from "./styles"

export default function IncidentsCard({ count }: { count: number }) {
  return (
    <div style={cardWrapperIncidents}>
      <div style={shadow6} aria-hidden />
      <div style={incidentsInner}>
        <div
          style={{
            ...microLabel,
            marginBottom: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.35rem",
          }}
        >
          <span>⚠</span>
          Incidents
        </div>
        <div
          style={{
            fontFamily: t.fontDisplay,
            fontSize: "clamp(2.5rem, 8vw, 3.8rem)",
            fontWeight: 700,
            color: "#111",
            lineHeight: 1,
          }}
        >
          {count}
        </div>
      </div>
    </div>
  )
}
