import MascotEyes from "@/components/mascot/MascotEyes"
import type { Expression } from "./useActiveSession"
import DialogBubble from "./DialogBubble"

export default function MascotCorner({
  expression,
  message,
}: {
  expression: Expression
  message: string
}) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "4rem",
        right: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.25rem",
        zIndex: 150,
      }}
    >
      <DialogBubble message={message} />
      <MascotEyes size='mascot--sm' expression={expression} />
    </div>
  )
}
