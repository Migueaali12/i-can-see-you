import { useState, useEffect, useRef, useCallback } from "react"
import { useTranslatedPath } from "@/i18n/utils"
import { languages, type Lang } from "@/i18n/ui"
import { Globe, Check } from "lucide-react"

interface LanguagePickerProps {
  lang: Lang
}

const LanguagePicker = ({ lang }: LanguagePickerProps) => {
  const translatePath = useTranslatedPath(lang)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, close])

  return (
    <div className='relative flex' ref={containerRef}>
      <button
        type='button'
        onClick={toggle}
        aria-label='Select language'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        className={`inline-flex items-center justify-center bg-(--color-card) text-(--color-on-card) transition-[transform,opacity] duration-150 ease-in-out hover:-rotate-3 hover:scale-110 active:scale-95 ${isOpen ? "-rotate-3 scale-110" : ""}`}
      >
        <Globe size={20} />
      </button>

      {isOpen && (
        <div className='absolute right-0 top-full mt-2 z-50 min-w-[150px] animate-in fade-in slide-in-from-bottom-2'>
          {/* Offset shadow (doodle card style) */}
          <div
            className='absolute inset-0 bg-(--color-shadow) translate-x-1.5 translate-y-1.5 -z-10'
            aria-hidden='true'
          />
          <div className='relative bg-(--color-card) border-2 border-(--color-border)  p-2'>
            {/* Dashed inset border for notebook feel */}
            <div
              className='absolute inset-[6px] border border-dashed border-(--color-outline-variant) pointer-events-none rounded-sm'
              aria-hidden='true'
            />
            <ul role='listbox' className='relative z-10 flex flex-col gap-1'>
              {Object.entries(languages).map(([code, label]) => {
                const isActive = code === lang
                return (
                  <li key={code} role='option' aria-selected={isActive}>
                    <a
                      href={translatePath("/", code as Lang)}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-colors duration-150 font-body ${
                        isActive
                          ? "bg-(--color-primary) text-(--color-on-primary)! font-semibold"
                          : "text-(--color-secondary) hover:text-(--color-on-surface) hover:bg-(--color-surface-variant)"
                      }`}
                    >
                      {isActive && (
                        <Check size={14} strokeWidth={3} className='shrink-0' />
                      )}
                      <span>{label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguagePicker
