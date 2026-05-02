import { DoodleCard } from "@/components/ui/Card"

export default function IncidentsCard({ count }: { count: number }) {
  return (
    <DoodleCard
      className="min-w-0"
      innerClassName="relative bg-white border-[2.5px] border-black px-6 py-5 text-center h-full"
      dashedBorder
    >
      <div className="font-body text-[0.6rem] tracking-[0.14em] text-(--color-secondary) uppercase mb-3 flex items-center justify-center gap-[0.35rem]">
        <span aria-hidden>⚠</span>
        Incidents
      </div>
      <div className="font-display text-[clamp(2.5rem,8vw,3.8rem)] font-bold text-[#111] leading-none">
        {count}
      </div>
    </DoodleCard>
  )
}
