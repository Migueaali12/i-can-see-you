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
    // A TypeError means the browser doesn't recognise the permission name
    // (Firefox, Safari). Any other error is treated as "prompt" (best-effort).
    if (err instanceof TypeError) return "unsupported"
    return "prompt"
  }
}

export async function checkClipboardPermission(): Promise<ExplicitApiStatus> {
  const apiPresent =
    typeof navigator !== "undefined" &&
    "clipboard" in navigator &&
    "permissions" in navigator

  if (!apiPresent) {
    return {
      key: "clipboardRead",
      label: "Clipboard read",
      description: "Detects whether you paste external content during the session.",
      support: false,
      permission: "unsupported",
      active: false,
    }
  }

  const permission = await queryPermission("clipboard-read")

  // Firefox and Safari don't implement the "clipboard-read" permission name.
  // When queryPermission returns "unsupported" we mark the whole feature as
  // unsupported so the UI never shows a button that can't trigger a toast.
  if (permission === "unsupported") {
    return {
      key: "clipboardRead",
      label: "Clipboard read",
      description: "Detects whether you paste external content during the session.",
      support: false,
      permission: "unsupported",
      active: false,
    }
  }

  return {
    key: "clipboardRead",
    label: "Clipboard read",
    description: "Detects whether you paste external content during the session.",
    support: true,
    permission,
    active: permission === "granted",
  }
}

export async function checkScreenDetailsPermission(): Promise<ExplicitApiStatus> {
  const supported =
    typeof window !== "undefined" && "getScreenDetails" in window

  if (!supported) {
    return {
      key: "screenDetails",
      label: "Multi-screen",
      description: "Detects whether you use more than one screen at once.",
      support: false,
      permission: "unsupported",
      active: false,
    }
  }

  const permission = await queryPermission("window-management")

  // Same fallback: if the browser doesn't recognise "window-management"
  // treat the feature as unsupported rather than showing a broken button.
  if (permission === "unsupported") {
    return {
      key: "screenDetails",
      label: "Multi-screen",
      description: "Detects whether you use more than one screen at once.",
      support: false,
      permission: "unsupported",
      active: false,
    }
  }

  return {
    key: "screenDetails",
    label: "Multi-screen",
    description: "Detects whether you use more than one screen at once.",
    support: true,
    permission,
    active: permission === "granted",
  }
}

export async function checkAllExplicitPermissions(): Promise<ExplicitApiStatus[]> {
  return Promise.all([
    checkClipboardPermission(),
    checkScreenDetailsPermission(),
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
