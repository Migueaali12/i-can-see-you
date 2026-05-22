import { useTranslations } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

export type PermissionState = "granted" | "denied" | "prompt" | "unsupported"
export type ExplicitApiKey = "clipboardRead" | "screenDetails"

export interface ExplicitApiStatus {
  key: ExplicitApiKey
  label: string
  description: string
  support: boolean
  permission: PermissionState
  active: boolean
}

/**
 * Returns the current PermissionState for a given permission name.
 *
 * Firefox and Safari throw a TypeError (not a DOMException) when the
 * permission name is unrecognised (e.g. "clipboard-read", "window-management").
 * We detect that specific case and return "unsupported" so callers can
 * degrade gracefully instead of showing a broken "Authorize now" button.
 */
async function queryPermission(
  name: string,
): Promise<PermissionState | "unsupported"> {
  try {
    const result = await navigator.permissions.query({
      name: name as PermissionName,
    })
    return result.state as PermissionState
  } catch (err) {
    if (err instanceof TypeError) return "unsupported"
    return "prompt"
  }
}

export async function checkClipboardPermission(lang: Lang): Promise<ExplicitApiStatus> {
  const t = useTranslations(lang)
  const apiPresent =
    typeof navigator !== "undefined" &&
    "clipboard" in navigator &&
    "permissions" in navigator

  if (!apiPresent) {
    return {
      key: "clipboardRead",
      label: t('signals.clipboardLabel'),
      description: t('signals.clipboardDesc'),
      support: false,
      permission: "unsupported",
      active: false,
    }
  }

  const permission = await queryPermission("clipboard-read")

  if (permission === "unsupported") {
    return {
      key: "clipboardRead",
      label: t('signals.clipboardLabel'),
      description: t('signals.clipboardDesc'),
      support: false,
      permission: "unsupported",
      active: false,
    }
  }

  return {
    key: "clipboardRead",
    label: t('signals.clipboardLabel'),
    description: t('signals.clipboardDesc'),
    support: true,
    permission,
    active: permission === "granted",
  }
}

export async function checkScreenDetailsPermission(lang: Lang): Promise<ExplicitApiStatus> {
  const t = useTranslations(lang)
  const supported =
    typeof window !== "undefined" && "getScreenDetails" in window

  if (!supported) {
    return {
      key: "screenDetails",
      label: t('signals.multiScreenLabel'),
      description: t('signals.multiScreenDesc'),
      support: false,
      permission: "unsupported",
      active: false,
    }
  }

  const permission = await queryPermission("window-management")

  if (permission === "unsupported") {
    return {
      key: "screenDetails",
      label: t('signals.multiScreenLabel'),
      description: t('signals.multiScreenDesc'),
      support: false,
      permission: "unsupported",
      active: false,
    }
  }

  return {
    key: "screenDetails",
    label: t('signals.multiScreenLabel'),
    description: t('signals.multiScreenDesc'),
    support: true,
    permission,
    active: permission === "granted",
  }
}

export async function checkAllExplicitPermissions(lang: Lang): Promise<ExplicitApiStatus[]> {
  return Promise.all([
    checkClipboardPermission(lang),
    checkScreenDetailsPermission(lang),
  ])
}

export function hasPendingPermissions(statuses: ExplicitApiStatus[]): boolean {
  return statuses.some((s) => s.support && s.permission === "prompt")
}

export async function requestPermission(key: ExplicitApiKey): Promise<void> {
  if (key === "clipboardRead") {
    await navigator.clipboard.readText()
  } else if (key === "screenDetails") {
    await (window as unknown as { getScreenDetails: () => Promise<unknown> })
      .getScreenDetails()
  }
}
