import MascotEyes from "@/components/mascot/MascotEyes"
import type { Expression } from "./useActiveSession"
import DialogBubble from "./DialogBubble"
import { useTranslations } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

interface MascotCornerProps {
  expression: Expression
  message: string
  lang?: Lang
}

export default function MascotCorner({
  expression,
  message,
  lang = 'en',
}: MascotCornerProps) {
  const t = useTranslations(lang)
  return (
    <div className="fixed bottom-20 right-6 z-150 flex flex-col items-end gap-1">
      <DialogBubble message={message} />
      <MascotEyes size="mascot--md-small" expression={expression} ariaLabel={t('mascot.eyesAria')} />
    </div>
  )
}
