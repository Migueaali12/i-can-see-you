import { useState, useEffect } from "react"
import MascotEyes from "@/components/mascot/MascotEyes"
import SiteShell from "@/components/layout/SiteShell"
import { DoodleCard } from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import {
  checkAllExplicitPermissions,
  hasPendingPermissions,
  requestPermission,
  type ExplicitApiStatus,
  type ExplicitApiKey,
} from "@/core/permissions"
import { MoveRight, Info } from "lucide-react"

// ── Badge component ───────────────────────────────────────────────
type BadgeVariant = "active" | "partial" | "unavailable"

const BADGE_CLASSES: Record<BadgeVariant, string> = {
  active: "bg-black text-white border-2 border-black",
  partial: "border-2 border-dashed border-black text-black",
  unavailable:
    "border-2 border-(--color-outline-variant) text-(--color-outline) line-through",
}

const BADGE_LABELS: Record<BadgeVariant, string> = {
  active: "ACTIVE",
  partial: "PARTIAL",
  unavailable: "UNAVAILABLE",
}

function Badge({ variant }: { variant: BadgeVariant }) {
  return (
    <span
      className={`inline-block font-body text-[0.65rem] font-bold tracking-[0.08em] px-[0.55rem] py-[0.2rem] rounded-[2px] whitespace-nowrap ${BADGE_CLASSES[variant]}`}
    >
      {BADGE_LABELS[variant]}
    </span>
  )
}

function getBadgeVariant(status: ExplicitApiStatus): BadgeVariant {
  if (status.permission === "granted") return "active"
  if (status.permission === "unsupported") return "unavailable"
  if (status.permission === "denied") return "unavailable"
  return "partial"
}

// ── PermissionRow component ───────────────────────────────────────
interface PermissionRowProps {
  status: ExplicitApiStatus
  isAuthorizing: boolean
  onAuthorize: () => void
}

function PermissionRow({
  status,
  isAuthorizing,
  onAuthorize,
}: PermissionRowProps) {
  const badge = getBadgeVariant(status)
  const canAuthorize = status.support && status.permission === "prompt"

  return (
    <DoodleCard innerClassName='relative w-full flex flex-wrap items-center justify-between gap-4 border-2 border-black bg-(--color-surface) py-[1.1rem] px-5'>
      <div className='flex flex-col gap-[0.35rem] flex-1 min-w-0'>
        <div className='flex items-center gap-[0.6rem] flex-wrap'>
          <span className='font-body text-base font-bold text-[#111]'>
            {status.label}
          </span>
          <Badge variant={badge} />
        </div>
        <span className='font-body text-[0.82rem] text-(--color-secondary) leading-[1.4]'>
          {status.description}
        </span>
      </div>

      {canAuthorize && (
        <Button
          onClick={onAuthorize}
          loading={isAuthorizing}
          loadingText='Requesting…'
          variant='gray'
        >
          Authorize now
        </Button>
      )}

      {status.permission === "granted" && (
        <span
          className='font-body text-[1.1rem] font-bold text-[#111]'
          aria-label='Authorized'
        >
          ✓
        </span>
      )}
    </DoodleCard>
  )
}

// ── Main SupportView ──────────────────────────────────────────────
export default function SupportView() {
  const [statuses, setStatuses] = useState<ExplicitApiStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [authorizing, setAuthorizing] = useState<ExplicitApiKey | null>(null)

  useEffect(() => {
    checkAllExplicitPermissions().then((results) => {
      setStatuses(results)
      setLoading(false)
    })
  }, [])

  const handleAuthorize = async (key: ExplicitApiKey) => {
    setAuthorizing(key)

    try {
      await requestPermission(key)
    } catch {
      // User denied or dismissed — re-check anyway
    }

    const updated = await checkAllExplicitPermissions()
    setStatuses(updated)
    setAuthorizing(null)

    const allActive = updated.every(
      (s) => !s.support || s.permission === "granted",
    )
    if (allActive) {
      window.location.href = "/demo"
    }
  }

  if (loading) {
    return (
      <SiteShell
        className='flex min-h-screen flex-col'
        mainClassName='flex flex-1 flex-col items-center justify-center px-6 py-16'
        footerNavAriaLabel='Support page links'
      >
        <span className='font-body text-base text-(--color-secondary)'>
          Checking permissions…
        </span>
      </SiteShell>
    )
  }

  const hasPending = hasPendingPermissions(statuses)

  return (
    <SiteShell
      className='flex flex-col min-h-dvh'
      mainClassName='mx-auto w-full max-w-[600px] flex-1 px-6 pt-12 pb-5'
      footerNavAriaLabel='Support page links'
    >
      <div className='mb-8 flex justify-center'>
        <MascotEyes
          size='mascot--md'
          expression={hasPending ? "annoyed" : "neutral"}
        />
      </div>

      <h1 className='mb-3 text-center font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.1] text-black'>
        Something's missing here…
      </h1>

      <p className='mb-10 text-center font-body text-base leading-[1.55] text-(--color-secondary)'>
        These signals need explicit permission. You can grant them now or
        continue without them — the demo works great either way.
      </p>

      <div className='mb-10 flex flex-col gap-4'>
        {statuses.map((status, i) => (
          <div
            key={status.key}
            className='animate-in fade-in slide-in-from-bottom-4'
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <PermissionRow
              status={status}
              isAuthorizing={authorizing === status.key}
              onAuthorize={() => handleAuthorize(status.key)}
            />
          </div>
        ))}
      </div>

      {statuses.some((s) => s.permission === "unsupported") && (
        <div className='mb-10 p-4 border border-dashed border-(--color-outline-variant) rounded-[4px] bg-(--color-surface) animate-in fade-in slide-in-from-bottom-3'>
          <div className='flex items-start gap-2'>
            <Info
              size={14}
              className='mt-0.5 text-(--color-outline) shrink-0'
            />
            <p className='font-body text-[0.82rem] text-(--color-secondary) leading-normal m-0'>
              Even if some signals aren't available in your browser (common in
              Firefox and Safari), the demo will still detect tab switches,
              focus loss, fullscreen exit, and mouse leaving — so the core
              experience will be great.
            </p>
          </div>
        </div>
      )}

      <div
        className='text-center animate-in fade-in slide-in-from-bottom-2'
        style={{ animationDelay: `${statuses.length * 100 + 200}ms` }}
      >
        <Button variant='gray' onClick={() => (window.location.href = "/demo")}>
          {hasPending ? (
            "Continue anyway"
          ) : (
            <>
              Continue <MoveRight size={18} />
            </>
          )}
        </Button>
      </div>
    </SiteShell>
  )
}
