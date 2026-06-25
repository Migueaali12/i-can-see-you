import { useState, useCallback } from "react"
import { Menu } from "lucide-react"
import { GitHub } from "@/components/ui/Github"
import ThemeToggle from "@/components/ui/ThemeToggle"
import LanguagePicker from "@/components/ui/LanguagePicker"
import MobileMenu from "./MobileMenu"
import { useTranslations, getRelativeLocaleUrl } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

interface SiteHeaderProps {
  lang: Lang
}

const SiteHeader = ({ lang }: SiteHeaderProps) => {
  const t = useTranslations(lang)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openMenu = useCallback(() => setIsMenuOpen(true), [])
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  return (
    <header className='sticky top-0 z-50 flex flex-row items-center justify-between gap-y-0 border-2 border-b-4 border-l-0 border-r-0 border-t-0 border-(--color-border) bg-(--color-card) px-6 py-3 shadow-[0_4px_0_rgba(0,0,0,var(--shadow-opacity))] md:py-2'>
      <div className='flex items-center justify-start'>
        <a
          href={getRelativeLocaleUrl(lang, '/')}
          className='font-display text-[1.4rem] font-black italic tracking-[-0.04em] text-blue-500 transition-[opacity,transform] duration-150 ease-in-out hover:opacity-75 hover:scale-[1.03]'
        >
          {t('common.brand')}
        </a>
      </div>

      <div className='flex items-center justify-end gap-2 md:hidden'>
        <button
          type='button'
          onClick={openMenu}
          aria-label={t('nav.openMenu')}
          aria-expanded={isMenuOpen}
          aria-controls='mobile-menu'
          className='inline-flex h-10 w-10 items-center justify-center rounded-md bg-(--color-card) text-(--color-on-card) transition-[transform,opacity] duration-150 ease-in-out hover:-rotate-3 hover:scale-110 active:scale-95'
        >
          <Menu size={22} strokeWidth={2} />
        </button>
      </div>

      <div className='hidden items-center justify-end md:flex'>
        <nav aria-label={t('nav.main')}>
          <ul className='m-0 flex list-none items-center gap-4 p-0 md:gap-8'>
            <li>
              <a
                href={getRelativeLocaleUrl(lang, '/signals')}
              className='inline-block text-sm font-bold uppercase tracking-wider text-(--color-secondary) underline decoration-2 transition-[color,transform] duration-150 ease-in-out hover:-rotate-1 hover:scale-[1.05] hover:text-(--color-on-card)'
              >
                {t('nav.signals')}
              </a>
            </li>
            <li>
              <a
                href={getRelativeLocaleUrl(lang, '/demo')}
              className='inline-block text-sm font-bold uppercase tracking-wider text-(--color-secondary) underline decoration-2 transition-[color,transform] duration-150 ease-in-out hover:-rotate-1 hover:scale-[1.05] hover:text-(--color-on-card)'
              >
                {t('nav.demo')}
              </a>
            </li>
            <li className='flex'>
              <LanguagePicker lang={lang} />
            </li>
            <li className='flex'>
              <ThemeToggle lang={lang} />
            </li>
            <li className='flex'>
              <a
                href='https://github.com/Migueaali12/i-can-see-you'
                target='_blank'
                rel='noopener noreferrer'
                aria-label={t('nav.githubAria')}
              className='inline-flex items-center text-(--color-secondary) transition-[color,transform] duration-150 ease-in-out hover:scale-[1.15] hover:text-(--color-on-card)'
              >
              <GitHub
                width={19}
                height={19}
              />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <MobileMenu lang={lang} isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  )
}

export default SiteHeader
