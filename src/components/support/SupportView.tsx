import { useState, useEffect } from "react"
import MascotEyes from "@/components/mascot/MascotEyes"
import SiteShell from "@/components/layout/SiteShell"
import { DoodleCard } from "@/components/ui/DoodleCard"
import Button from "@/components/ui/Button"
import {
  checkAllExplicitPermissions,
  hasPendingPermissions,
  requestPermission,
  type ExplicitApiStatus,
  type ExplicitApiKey,
} from "@/core/permissions"
import { MoveRight, Info } from "lucide-react"
import { useTranslations, getRelativeLocaleUrl } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

// ── Badge component ───────────────────────────────────────────────
type BadgeVariant = "active" | "partial" | "unavailable"

const BADGE_CLASSES: Record<BadgeVariant, string> = {
  active:
    "bg-(--color-on-surface) text-(--color-surface) border-2 border-(--color-border)",
  partial:
    "border-2 border-dashed border-(--color-border) text-(--color-on-surface)",
  unavailable:
    "border-2 border-dashed border-(--color-outline-variant) text-(--color-outline) line-through",
}

function getBadgeLabels(lang: Lang): Record<BadgeVariant, string> {
  const t = useTranslations(lang)
  return {
    active: t('signals.badgeActive'),
    partial: t('signals.badgePartial'),
    unavailable: t('signals.badgeUnavailable'),
  }
}

function Badge({ variant, lang = 'en' }: { variant: BadgeVariant; lang?: Lang }) {
  const labels = getBadgeLabels(lang)
  return (
    <span
      className={`inline-block font-body text-[0.65rem] font-bold tracking-[0.08em] px-[0.55rem] py-[0.2rem] rounded-xs whitespace-nowrap ${BADGE_CLASSES[variant]}`}
    >
      {labels[variant]}
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
  lang?: Lang
}

function PermissionRow({
  status,
  isAuthorizing,
  onAuthorize,
  lang = 'en',
}: PermissionRowProps) {
  const t = useTranslations(lang)
  const badge = getBadgeVariant(status)
  const canAuthorize = status.support && status.permission === "prompt"

  return (
    <DoodleCard innerClassName='relative w-full flex flex-wrap items-center justify-between gap-4 border-2 border-(--color-border) bg-(--color-surface) py-[1.1rem] px-5'>
      <div className='flex flex-col gap-[0.35rem] flex-1 min-w-0'>
        <div className='flex items-center gap-[0.6rem] flex-wrap'>
          <span className='font-body text-base font-bold text-(--color-on-surface)'>
            {status.label}
          </span>
          <Badge variant={badge} lang={lang} />
        </div>
        <span className='font-body text-[0.82rem] text-(--color-secondary) leading-[1.4]'>
          {status.description}
        </span>
      </div>

      {canAuthorize && (
        <Button
          onClick={onAuthorize}
          loading={isAuthorizing}
          loadingText={t('common.authorizing')}
          variant='gray'
          lang={lang}
        >
          {t('common.authorize')}
        </Button>
      )}

      {status.permission === "granted" && (
        <span
          className='font-body text-[1.1rem] font-bold text-(--color-on-surface)'
          aria-label={t('common.authorized')}
        >
          ✓
        </span>
      )}
    </DoodleCard>
  )
}

// ── Main SupportView ──────────────────────────────────────────────
interface SupportViewProps {
  lang?: Lang
}

export default function SupportView({ lang = 'en' }: SupportViewProps) {
  const t = useTranslations(lang)
  const [statuses, setStatuses] = useState<ExplicitApiStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [authorizing, setAuthorizing] = useState<ExplicitApiKey | null>(null)

  useEffect(() => {
    checkAllExplicitPermissions(lang).then((results) => {
      setStatuses(results)
      setLoading(false)
    })
  }, [lang])

  const handleAuthorize = async (key: ExplicitApiKey) => {
    setAuthorizing(key)

    try {
      await requestPermission(key)
    } catch {
      // User denied or dismissed — re-check anyway
    }

    const updated = await checkAllExplicitPermissions(lang)
    setStatuses(updated)
    setAuthorizing(null)

    const allActive = updated.every(
      (s) => !s.support || s.permission === "granted",
    )
    if (allActive) {
      window.location.href = getRelativeLocaleUrl(lang, '/demo')
    }
  }

  if (loading) {
    return (
      <SiteShell
        lang={lang}
        className='flex min-h-screen flex-col'
        mainClassName='flex flex-1 flex-col items-center justify-center px-6 py-16'
      >
        <span className='font-body text-base text-(--color-secondary)'>
          {t('signals.loading')}
        </span>
      </SiteShell>
    )
  }

  const hasPending = hasPendingPermissions(statuses)

  return (
    <SiteShell
      lang={lang}
      className='flex flex-col min-h-dvh'
      mainClassName='mx-auto w-full max-w-[600px] flex-1 px-6 pt-12 pb-5'
    >
      <div className='mb-8 flex justify-center'>
        <MascotEyes
          size='mascot--md'
          expression={hasPending ? "annoyed" : "neutral"}
          ariaLabel={t('mascot.eyesAria')}
        />
      </div>

      <h1 className='mb-3 text-center font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.1] text-(--color-on-surface)'>
        {t('signals.heroHeading')}
      </h1>

      <p className='mb-10 text-center font-body text-base leading-[1.55] text-(--color-secondary)'>
        {t('signals.heroDesc')}
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
              lang={lang}
            />
          </div>
        ))}
      </div>

      {statuses.some((s) => s.permission === "unsupported") && (
        <div className='mb-10 p-4 border border-dashed border-(--color-outline-variant) rounded-sm bg-(--color-surface) animate-in fade-in slide-in-from-bottom-3'>
          <div className='flex items-start gap-2'>
            <Info
              size={14}
              className='mt-0.5 text-(--color-outline) shrink-0'
            />
            <p className='font-body text-[0.82rem] text-(--color-secondary) leading-normal m-0'>
              {t('signals.compatNote')}
            </p>
          </div>
        </div>
      )}

      <div
        className='text-center animate-in fade-in slide-in-from-bottom-2'
        style={{ animationDelay: `${statuses.length * 100 + 200}ms` }}
      >
        <Button variant='gray' lang={lang} onClick={() => (window.location.href = getRelativeLocaleUrl(lang, '/demo'))}>
          {hasPending ? (
            <>
              {t('common.continueAnyway')} <MoveRight size={18} />
            </>
          ) : (
            <>
              {t('common.continue')} <MoveRight size={18} />
            </>
          )}
        </Button>
      </div>
    </SiteShell>
  )
}
