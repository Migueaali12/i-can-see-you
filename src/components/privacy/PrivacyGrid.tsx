import { PrivacyCard } from "./PrivacyCard"
import {
  Eye,
  CloudOff,
  EyeOff,
  Settings,
  ShieldCheck,
  Dot,
  House,
} from "lucide-react"
import Button from "@/components/ui/Button"
import { useTranslations, getRelativeLocaleUrl } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

interface PrivacyGridProps {
  lang?: Lang
}

export default function PrivacyGrid({ lang = 'en' }: PrivacyGridProps) {
  const t = useTranslations(lang)

  return (
    <>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-6 w-[min(1000px,calc(100%-3rem))] mx-auto pt-4 pb-8'>
        {/* Row 1 — What I Track */}
        <div
          className='animate-in fade-in slide-in-from-bottom-4'
          style={{ animationDelay: "100ms" }}
        >
          <PrivacyCard rotation={-1.2} icon={Eye} title={t('privacy.trackTitle')}>
            <p className='mb-4 text-(--color-secondary)'>
              {t('privacy.trackDesc')}
            </p>
            <ul className='list-none m-0 p-0 flex flex-col gap-2'>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.track1')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.track2')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.track3')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.track4')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.track5')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.track6')}</span>
              </li>
            </ul>
          </PrivacyCard>
        </div>

        {/* Row 1 — Zero Servers */}
        <div
          className='animate-in fade-in slide-in-from-bottom-4'
          style={{ animationDelay: "200ms" }}
        >
          <PrivacyCard rotation={1} icon={CloudOff} title={t('privacy.zeroServersTitle')}>
            <p className='mb-4 text-(--color-secondary)'>
              {t('privacy.zeroServersDesc')}
            </p>
            <ul className='list-none m-0 p-0 flex flex-col gap-2'>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.zeroServers1')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.zeroServers2')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.zeroServers3')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.zeroServers4')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.zeroServers5')}</span>
              </li>
            </ul>
          </PrivacyCard>
        </div>

        {/* Row 2 — What I Don't See (full width) */}
        <div
          className='animate-in fade-in slide-in-from-bottom-4 md:col-span-2'
          style={{ animationDelay: "300ms" }}
        >
          <PrivacyCard rotation={-0.5} icon={EyeOff} title={t('privacy.dontSeeTitle')}>
            <p className='mb-4 text-(--color-secondary)'>
              {t('privacy.dontSeeDesc')}
            </p>
            <ul className='list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2'>
              <div className='flex flex-col gap-2'>
                <li className='flex items-start gap-2'>
                  <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                  <span>{t('privacy.dontSee1')}</span>
                </li>
                <li className='flex items-start gap-2'>
                  <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                  <span>{t('privacy.dontSee2')}</span>
                </li>
                <li className='flex items-start gap-2'>
                  <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                  <span>{t('privacy.dontSee3')}</span>
                </li>
                <li className='flex items-start gap-2'>
                  <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                  <span>{t('privacy.dontSee4')}</span>
                </li>
              </div>
              <div className='flex flex-col gap-2'>
                <li className='flex items-start '>
                  <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                  <span className='text-nowrap'>{t('privacy.dontSee5')}</span>
                </li>
                <li className='flex items-start gap-2'>
                  <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                  <span>{t('privacy.dontSee6')}</span>
                </li>
                <li className='flex items-start gap-2'>
                  <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                  <span>{t('privacy.dontSee7')}</span>
                </li>
              </div>
            </ul>
          </PrivacyCard>
        </div>

        {/* Row 3 — How It Works */}
        <div
          className='animate-in fade-in slide-in-from-bottom-4'
          style={{ animationDelay: "400ms" }}
        >
          <PrivacyCard rotation={0.8} icon={Settings} title={t('privacy.howWorksTitle')}>
            <p className='mb-4 text-(--color-secondary)'>
              {t('privacy.howWorksDesc')}
            </p>
            <ul className='list-none m-0 p-0 flex flex-col gap-2'>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.howWorks1')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.howWorks2')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.howWorks3')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.howWorks4')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.howWorks5')}</span>
              </li>
            </ul>
          </PrivacyCard>
        </div>

        {/* Row 3 — You Control It */}
        <div
          className='animate-in fade-in slide-in-from-bottom-4'
          style={{ animationDelay: "500ms" }}
        >
          <PrivacyCard rotation={-0.6} icon={ShieldCheck} title={t('privacy.controlTitle')}>
            <p className='mb-4 text-(--color-secondary)'>
              {t('privacy.controlDesc')}
            </p>
            <ul className='list-none m-0 p-0 flex flex-col gap-2'>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.control1')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.control2')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>
                  {t('privacy.control3').replace('{link}', '')}{" "}
                  <a
                    href={getRelativeLocaleUrl(lang, '/signals')}
                    className='underline decoration-2 hover:text-black transition-colors'
                  >
                    {t('privacy.controlSignalsLink')}
                  </a>
                  .
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.control4')}</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot size={18} strokeWidth={2.5} className='shrink-0 mt-[0.15rem]' aria-hidden='true' />
                <span>{t('privacy.control5')}</span>
              </li>
            </ul>
          </PrivacyCard>
        </div>
      </section>

      <div
        className='flex justify-center mt-12 mb-8 animate-in fade-in slide-in-from-bottom-4'
        style={{ animationDelay: "600ms" }}
      >
        <Button href={getRelativeLocaleUrl(lang, '/')} variant='gray' size='lg'>
          {t('common.backToHome')} <House size={18} strokeWidth={2} />
        </Button>
      </div>
    </>
  )
}
