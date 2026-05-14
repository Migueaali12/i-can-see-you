import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

export interface PrivacyCardProps {
  rotation?: number
  icon: LucideIcon
  title: string
  className?: string
  children: ReactNode
}

export function PrivacyCard({
  rotation = 0,
  icon: Icon,
  title,
  className,
  children,
}: PrivacyCardProps) {
  return (
    <article
      className={["privacy-card relative", className].filter(Boolean).join(" ")}
      style={{ "--card-rotation": `${rotation}deg` } as React.CSSProperties}
    >
      <div className='privacy-card__inner relative h-full'>
        {/* Offset shadow */}
        <div
          className='absolute inset-0 bg-black translate-x-1.5 translate-y-1.5'
          aria-hidden='true'
        />

        {/* Main panel */}
        <div className='relative bg-(--color-surface) border-2 border-black p-6 md:p-8 h-full flex flex-col'>
          {/* Dashed inset border */}
          <div
            className='absolute inset-[10px] border border-dashed border-[#ddd] pointer-events-none'
            aria-hidden='true'
          />

          {/* Header */}
          <div className='relative z-10 mb-4'>
            <Icon className='w-6 h-6 text-black mb-3' strokeWidth={2} />
            <h2 className='font-display text-[1.35rem] font-semibold leading-tight text-black border-b-2 border-dashed border-black pb-3'>
              {title}
            </h2>
          </div>

          {/* Body */}
          <div className='relative z-10 flex-1 text-[0.95rem] leading-relaxed text-(--color-on-surface)'>
            {children}
          </div>
        </div>
      </div>
    </article>
  )
}
