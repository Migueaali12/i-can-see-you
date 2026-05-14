import { TriangleAlert } from "lucide-react"
import { DoodleCard } from "@/components/ui/DoodleCard"

export default function IncidentsCard({ count }: { count: number }) {
  return (
    <DoodleCard
      className='min-w-0 h-full'
      innerClassName='relative bg-white border-[2.5px] border-black px-6 py-5 text-center h-full flex flex-col items-center justify-center gap-2'
      dashedBorder
    >
      <div className='flex items-center justify-center gap-1.5'>
        <TriangleAlert
          className='w-3 h-3 text-[--color-secondary]'
          strokeWidth={2.5}
        />
        <span className='font-body text-[0.6rem] tracking-[0.14em] text-[--color-secondary] uppercase'>
          Incidents
        </span>
      </div>
      <div className='font-display text-[clamp(2.5rem,8vw,3.8rem)] font-bold text-[#111] leading-none'>
        {count}
      </div>
    </DoodleCard>
  )
}
