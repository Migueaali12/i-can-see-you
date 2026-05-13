import type { ReactNode } from "react"
import { DoodleCard } from "@/components/ui/Card"

type MetricCardVariant = "default" | "score"

interface MetricCardProps {
  icon: ReactNode
  value: string
  label: string
  description: string
  variant?: MetricCardVariant
  className?: string
  delay?: number
}

export default function MetricCard({
  icon,
  value,
  label,
  description,
  variant = "default",
  className,
  delay = 0,
}: MetricCardProps) {
  const isScore = variant === "score"

  return (
    <div
      className='animate-in fade-in slide-in-from-bottom-4'
      style={{ animationDelay: `${delay}ms` }}
    >
    <DoodleCard
      className={className}
      innerClassName='relative bg-(--color-surface) border-2 border-black p-6 md:p-8 h-full flex flex-col'
    >
      <div className='flex items-center gap-3 mb-4 text-(--color-secondary)'>
        <span className='shrink-0 [&_svg]:w-5 [&_svg]:h-5'>{icon}</span>
        <span className='font-body text-sm font-semibold uppercase tracking-wider'>
          {label}
        </span>
      </div>
      <p
        className={[
          isScore
            ? "font-display text-5xl md:text-6xl leading-none"
            : "font-display text-4xl md:text-5xl leading-none",
          "text-black mb-3",
        ].join(" ")}
      >
        {value}
      </p>
      <p className='text-sm text-(--color-secondary) leading-relaxed mt-auto'>
        {description}
      </p>
    </DoodleCard>
    </div>
  )
}
