import { t, shadow4 } from "./styles"

export default function DialogBubble({ message }: { message: string }) {
  return (
    <div style={{ position: "relative", paddingBottom: "14px" }}>
      <div
        style={{
          ...shadow4,
          bottom: "14px",
        }}
        aria-hidden
      />
      <div
        style={{
          position: "relative",
          background: "#fff",
          border: "2.5px solid #111",
          padding: "0.7rem 0.95rem",
          maxWidth: "200px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: t.fontBody,
            fontSize: "0.8rem",
            fontStyle: "italic",
            color: "#111",
            lineHeight: 1.45,
          }}
        >
          &ldquo;{message}&rdquo;
        </p>
        {/* Bubble tail pointing down toward mascot */}
        <div
          style={{
            position: "absolute",
            bottom: "-13px",
            right: "22px",
            width: "16px",
            height: "16px",
            background: "#fff",
            borderRight: "2.5px solid #111",
            borderBottom: "2.5px solid #111",
            transform: "rotate(45deg)",
          }}
          aria-hidden
        />
      </div>
    </div>
  )
}
