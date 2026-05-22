import { useTranslations, getRelativeLocaleUrl } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

type SiteFooterProps = {
  lang: Lang
  withPageSpacing?: boolean
}

const SiteFooter = ({
  lang,
  withPageSpacing = true,
}: SiteFooterProps) => {
  const t = useTranslations(lang)
  return (
    <footer
      className={[
        "flex shrink-0 flex-wrap items-center justify-between gap-4 border-2 border-b-0 border-l-0 border-r-0 border-t-4 border-(--color-border) bg-(--color-card) px-6 py-3",
        withPageSpacing ? "mt-12" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className='text-[clamp(0.75rem,1vw,1rem)] font-bold text-(--color-on-card)'>
        {t('footer.copy')}
      </span>
      <nav aria-label={t('nav.footer')}>
        <ul className='m-0 flex list-none gap-6 p-0'>
          <li>
            <a
              href={getRelativeLocaleUrl(lang, '/privacy')}
              className='font-mono text-[0.75rem] uppercase tracking-widest text-(--color-secondary) hover:italic'
            >
              {t('nav.privacy')}
            </a>
          </li>
          <li>
            <a
              href={getRelativeLocaleUrl(lang, '/manual')}
              className='font-mono text-[0.75rem] uppercase tracking-widest text-(--color-secondary) hover:italic'
            >
              {t('nav.manual')}
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default SiteFooter
