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

async function queryPermission(name: string): Promise<PermissionState> {
  try {
    const result = await navigator.permissions.query({
      name: name as PermissionName,
    })
    return result.state as PermissionState
  } catch {
    return "prompt"
  }
}

export async function checkClipboardPermission(): Promise<ExplicitApiStatus> {
  const supported =
    typeof navigator !== "undefined" &&
    "clipboard" in navigator &&
    "permissions" in navigator

  if (!supported) {
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
