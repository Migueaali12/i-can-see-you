import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { DoodleCard } from "@/components/ui/DoodleCard"

export interface ManualCardProps {
  rotation?: number
  icon: LucideIcon
  title: string
  className?: string
  children: ReactNode
}

export function ManualCard({
  rotation = 0,
  icon,
  title,
  className,
  children,
}: ManualCardProps) {
  return (
    <DoodleCard
      rotation={rotation}
      icon={icon}
      title={title}
      className={className}
      variant='note'
      dashedBorder
    >
      {children}
    </DoodleCard>
  )
}
