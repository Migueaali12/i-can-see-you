import { GitHub } from "@/components/ui/Github"
import ThemeToggle from "@/components/ui/ThemeToggle"
import LanguagePicker from "@/components/ui/LanguagePicker"
import { useTranslations, getRelativeLocaleUrl } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

interface SiteHeaderProps {
  lang: Lang
}

const SiteHeader = ({ lang }: SiteHeaderProps) => {
  const t = useTranslations(lang)
  return (
    <header className='sticky top-0 z-50 flex flex-col items-center gap-y-2 border-2 border-b-4 border-l-0 border-r-0 border-t-0 border-(--color-border) bg-(--color-card) px-6 py-3 shadow-[0_4px_0_rgba(0,0,0,var(--shadow-opacity))] md:flex-row md:justify-between md:gap-y-0 md:py-2'>
      <div className='flex w-full items-center justify-center md:w-auto md:justify-start'>
        <a
          href={getRelativeLocaleUrl(lang, '/')}
          className='font-display text-[1.4rem] font-black italic tracking-[-0.04em] text-(--color-on-card) transition-[opacity,transform] duration-150 ease-in-out hover:opacity-75 hover:scale-[1.03]'
        >
          {t('common.brand')}
        </a>
      </div>
      <div className='flex w-full items-center justify-center md:w-auto md:justify-end'>
        <nav aria-label={t('nav.main')}
        >
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
            <ThemeToggle />
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
    </header>
  )
}

export default SiteHeader
