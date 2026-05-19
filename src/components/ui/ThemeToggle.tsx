import { useEffect, useState, useCallback } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  const applyTheme = useCallback((dark: boolean) => {
    const root = document.documentElement
    if (dark) {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
    setIsDark(dark)
  }, [])

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDarkActive = stored === "dark" || (!stored && prefersDark)
    setIsDark(isDarkActive)
  }, [])

  const toggle = useCallback(() => {
    applyTheme(!isDark)
  }, [isDark, applyTheme])

  // Prevent flash of wrong icon during hydration
  if (!mounted) {
    return (
      <button
        aria-label="Toggle dark mode"
        className="inline-flex items-center justify-center w-9 h-9 rounded-md border-transparent bg-transparent text-(--color-on-card) opacity-0"
        disabled
      >
        <Sun size={20} />
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Let there be light" : "Dim the lights"}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md border-(--color-border) bg-(--color-card) text-(--color-on-card) transition-[transform,opacity] duration-150 ease-in-out hover:-rotate-3 hover:scale-110 active:scale-95"
    >
      {isDark ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
    </button>
  )
}
