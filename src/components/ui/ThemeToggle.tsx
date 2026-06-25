import { useEffect, useState, useCallback } from "react"
import { Moon, Sun } from "lucide-react"
import { useTranslations } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

interface ThemeToggleProps {
  lang?: Lang
}

export default function ThemeToggle({ lang = 'en' }: ThemeToggleProps) {
  const t = useTranslations(lang)
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
        aria-label={t('nav.toggleDark')}
        className="inline-flex items-center justify-center rounded-md border-transparent bg-transparent text-(--color-on-card) opacity-0"
        disabled
      >
        <Sun size={21} />
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? t('nav.switchToLight') : t('nav.switchToDark')}
      title={isDark ? t('nav.switchToLight') : t('nav.switchToDark')}
      className="inline-flex items-center justify-center rounded-md border-(--color-border) bg-(--color-card) text-(--color-on-card) transition-[transform,opacity] duration-150 ease-in-out hover:-rotate-3 hover:scale-110 active:scale-95"
    >
      {isDark ? <Sun size={21} strokeWidth={2} /> : <Moon size={21} strokeWidth={2} />}
    </button>
  )
}
