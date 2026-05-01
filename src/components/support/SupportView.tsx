import { useState, useEffect, type CSSProperties } from "react"
import MascotEyes from "@/components/mascot/MascotEyes"
import { DoodleCard } from "@/components/ui/DoodleCard"
import {
  checkAllExplicitPermissions,
  hasPendingPermissions,
  requestPermission,
  type ExplicitApiStatus,
  type ExplicitApiKey,
} from "@/core/permissions"

// ── Shared style tokens ───────────────────────────────────────────
const css = {
  fontDisplay: "var(--font-display)",
  fontBody: "var(--font-body)",
  colorSecondary: "var(--color-secondary)",
  colorOutline: "var(--color-outline)",
  colorOutlineVariant: "var(--color-outline-variant)",
  colorSurface: "var(--color-surface)",
} as const

// ── Badge component ───────────────────────────────────────────────
type BadgeVariant = "active" | "partial" | "unavailable"

function Badge({ variant }: { variant: BadgeVariant }) {
  const styles: Record<BadgeVariant, CSSProperties> = {
    active: {
      background: "#111",
      color: "#fff",
      border: "2px solid #111",
    },
    partial: {
      background: "transparent",
      color: "#111",
      border: "2px dashed #111",
    },
    unavailable: {
      background: "transparent",
      color: css.colorOutline,
      border: "2px solid var(--color-outline-variant)",
      textDecoration: "line-through",
    },
  }

  const labels: Record<BadgeVariant, string> = {
    active: "ACTIVE",
    partial: "PARTIAL",
    unavailable: "UNAVAILABLE",
  }

  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: css.fontBody,
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        padding: "0.2rem 0.55rem",
        borderRadius: "2px",
        whiteSpace: "nowrap",
        ...styles[variant],
      }}
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

// ── ShadowButton component ────────────────────────────────────────
interface ShadowButtonProps {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  ghost?: boolean
  children: React.ReactNode
}

function ShadowButton({
  onClick,
  disabled,
  loading,
  ghost,
  children,
}: ShadowButtonProps) {
  const shadowColor = ghost ? css.colorSecondary : "#000"
  const isDisabled = disabled || loading

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.6 : 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: shadowColor,
          translate: "5px 5px",
          transition: "translate 120ms ease",
        }}
        aria-hidden='true'
      />
      <button
        onClick={onClick}
        disabled={isDisabled}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: ghost ? "0.6rem 1.2rem" : "0.75rem 1.5rem",
          border: "2px solid #000",
          background: css.colorSurface,
          color: "#000",
          fontFamily: css.fontBody,
          fontSize: ghost ? "0.9rem" : "1rem",
          fontWeight: 600,
          cursor: isDisabled ? "not-allowed" : "pointer",
          transition: "transform 120ms ease, translate 120ms ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          if (!isDisabled)
            (e.currentTarget as HTMLButtonElement).style.transform =
              "rotate(-1.5deg)"
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.transform = ""
        }}
        onMouseDown={(e) => {
          if (!isDisabled)
            (e.currentTarget as HTMLButtonElement).style.translate = "3px 3px"
        }}
        onMouseUp={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.translate = ""
        }}
      >
        {loading ? "Requesting…" : children}
      </button>
    </div>
  )
}

// ── PermissionRow component ───────────────────────────────────────
interface PermissionRowProps {
  status: ExplicitApiStatus
  isAuthorizing: boolean
  onAuthorize: () => void
}

function PermissionRow({ status, isAuthorizing, onAuthorize }: PermissionRowProps) {
  const badge = getBadgeVariant(status)
  const canAuthorize = status.support && status.permission === "prompt"

  return (
    <DoodleCard innerClassName='relative w-full flex flex-wrap items-center justify-between gap-4 border-2 border-black bg-(--color-surface) py-[1.1rem] px-5'>
      {/* Left: label + description */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: css.fontBody,
              fontSize: "1rem",
              fontWeight: 700,
              color: "#111",
            }}
          >
            {status.label}
          </span>
          <Badge variant={badge} />
        </div>
        <span
          style={{
            fontFamily: css.fontBody,
            fontSize: "0.82rem",
            color: css.colorSecondary,
            lineHeight: 1.4,
          }}
        >
          {status.description}
        </span>
      </div>

      {canAuthorize && (
        <ShadowButton onClick={onAuthorize} loading={isAuthorizing}>
          Authorize now
        </ShadowButton>
      )}

      {status.permission === "granted" && (
        <span
          style={{
            fontFamily: css.fontBody,
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#111",
          }}
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
      if (!hasPendingPermissions(results)) {
        window.location.href = "/demo"
        return
      }
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "40vh",
        }}
      >
        <span
          style={{
            fontFamily: css.fontBody,
            fontSize: "1rem",
            color: css.colorSecondary,
          }}
        >
          Checking permissions…
        </span>
      </div>
    )
  }

  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "3rem 1.5rem 5rem",
      }}
    >
      {/* Mascot */}
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}
      >
        <MascotEyes size='mascot--md' expression='annoyed' />
      </div>

      {/* Heading */}
      <h1
        style={{
          fontFamily: css.fontDisplay,
          fontSize: "clamp(2rem,5vw,3rem)",
          fontWeight: 700,
          textAlign: "center",
          color: "#000",
          margin: "0 0 0.75rem",
          lineHeight: 1.1,
        }}
      >
        Something’s missing here…
      </h1>

      <p
        style={{
          fontFamily: css.fontBody,
          fontSize: "1rem",
          textAlign: "center",
          color: css.colorSecondary,
          lineHeight: 1.55,
          margin: "0 0 2.5rem",
        }}
      >
        These signals need explicit permission. You can grant them now or
        continue without them.
      </p>

      {/* Permission list */}
      <div
        style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}
      >
        {statuses.map((status) => (
          <PermissionRow
            key={status.key}
            status={status}
            isAuthorizing={authorizing === status.key}
            onAuthorize={() => handleAuthorize(status.key)}
          />
        ))}
      </div>

      {/* Global CTA */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <ShadowButton ghost onClick={() => (window.location.href = "/demo")}>
          Continue anyway
        </ShadowButton>
      </div>

      {/* Disclaimer */}
      <p
        style={{
          fontFamily: css.fontBody,
          fontSize: "0.75rem",
          textAlign: "center",
          color: css.colorOutline,
          lineHeight: 1.6,
          margin: 0,
          borderTop: "1px dashed var(--color-outline-variant)",
          paddingTop: "1.5rem",
        }}
      >
        This demo detects browser signals; actions outside the browser may not
        be visible.
      </p>
    </main>
  )
}
