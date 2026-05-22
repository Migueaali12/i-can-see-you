import { ManualCard } from "@/components/manual/ManualCard"
import {
  Eye,
  Focus,
  Maximize,
  MousePointer,
  ClipboardPaste,
  Wrench,
  CheckSquare,
  XSquare,
  House,
} from "lucide-react"
import Button from "@/components/ui/Button"
import { useTranslations, getRelativeLocaleUrl } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

interface ManualGridProps {
  lang?: Lang
}

export default function ManualGrid({ lang = 'en' }: ManualGridProps) {
  const t = useTranslations(lang)

  return (
    <>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-6 w-[min(1000px,calc(100%-3rem))] mx-auto pt-4 pb-8'>
        {/* How It Works */}
        <div
          className='animate-in fade-in slide-in-from-bottom-4'
          style={{ animationDelay: "100ms" }}
        >
          <ManualCard rotation={-1} icon={Eye} title={t('manual.howWorksTitle')}>
            <p className='mb-4 text-(--color-secondary)'>
              {t('manual.howWorksDesc')}
            </p>
            <ul className='list-none m-0 p-0 flex flex-col gap-3'>
              <li className='flex items-start gap-3'>
                <Eye
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <div>
                  <span className='font-semibold text-black'>
                    {t('manual.apiVisibility')}
                  </span>
                  <p className='text-(--color-secondary) text-[0.88rem] leading-relaxed mt-0.5'>
                    {t('manual.apiVisibilityDesc')}
                  </p>
                </div>
              </li>
              <li className='flex items-start gap-3'>
                <Focus
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <div>
                  <span className='font-semibold text-black'>{t('manual.apiFocus')}</span>
                  <p className='text-(--color-secondary) text-[0.88rem] leading-relaxed mt-0.5'>
                    {t('manual.apiFocusDesc')}
                  </p>
                </div>
              </li>
              <li className='flex items-start gap-3'>
                <Maximize
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <div>
                  <span className='font-semibold text-black'>
                    {t('manual.apiFullscreen')}
                  </span>
                  <p className='text-(--color-secondary) text-[0.88rem] leading-relaxed mt-0.5'>
                    {t('manual.apiFullscreenDesc')}
                  </p>
                </div>
              </li>
              <li className='flex items-start gap-3'>
                <MousePointer
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <div>
                  <span className='font-semibold text-black'>{t('manual.apiMouse')}</span>
                  <p className='text-(--color-secondary) text-[0.88rem] leading-relaxed mt-0.5'>
                    {t('manual.apiMouseDesc')}
                  </p>
                </div>
              </li>
              <li className='flex items-start gap-3'>
                <ClipboardPaste
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <div>
                  <span className='font-semibold text-black'>{t('manual.apiPaste')}</span>
                  <p className='text-(--color-secondary) text-[0.88rem] leading-relaxed mt-0.5'>
                    {t('manual.apiPasteDesc')}
                  </p>
                </div>
              </li>
              <li className='flex items-start gap-3'>
                <Wrench
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <div>
                  <span className='font-semibold text-black'>
                    {t('manual.apiDevtools')}
                  </span>
                  <p className='text-(--color-secondary) text-[0.88rem] leading-relaxed mt-0.5'>
                    {t('manual.apiDevtoolsDesc')}
                  </p>
                </div>
              </li>
            </ul>
          </ManualCard>
        </div>

        {/* Tips to Not Get Caught */}
        <div
          className='animate-in fade-in slide-in-from-bottom-4'
          style={{ animationDelay: "200ms" }}
        >
          <ManualCard
            rotation={0.8}
            icon={CheckSquare}
            title={t('manual.tipsTitle')}
          >
            <p className='mb-4 text-(--color-secondary)'>
              {t('manual.tipsDesc')}
            </p>
            <ul className='list-none m-0 p-0 flex flex-col gap-3'>
              <li className='flex items-start gap-3'>
                <CheckSquare
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <span>{t('manual.tip1')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <CheckSquare
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <span>{t('manual.tip2')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <CheckSquare
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <span>{t('manual.tip3')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <CheckSquare
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <span>{t('manual.tip4')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <XSquare
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <span>
                  <span className='line-through text-(--color-secondary)'>
                    {t('manual.tip5')}
                  </span>{" "}
                  <span className='text-(--color-secondary) text-[0.88rem]'>
                    {t('manual.tip5Sub')}
                  </span>
                </span>
              </li>
            </ul>
          </ManualCard>
        </div>
      </section>

      <div
        className='flex justify-center mt-12 mb-8 animate-in fade-in slide-in-from-bottom-4'
        style={{ animationDelay: "300ms" }}
      >
        <Button href={getRelativeLocaleUrl(lang, '/')} variant='gray' size='lg'>
          {t('common.backToHome')} <House size={18} strokeWidth={2} />
        </Button>
      </div>
    </>
  )
}
