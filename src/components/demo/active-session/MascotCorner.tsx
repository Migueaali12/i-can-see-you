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
    <div className="fixed bottom-25 right-6 z-150 flex flex-col items-end gap-1">
      <DialogBubble message={message} />
      <MascotEyes size="mascot--sm" expression={expression} />
    </div>
  )
}
