import Button from "@/components/ui/Button"
import { Play } from "lucide-react"
import { useEffect, useState } from "react"
import {
  checkAllExplicitPermissions,
  hasPendingPermissions,
} from "@/core/permissions"
import { useTranslations, getRelativeLocaleUrl } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"

interface HeroCtaButtonProps {
  lang?: Lang
}

export default function HeroCtaButton({ lang = 'en' }: HeroCtaButtonProps) {
  const t = useTranslations(lang)
  const [hasPendingPermissionsFlag, setHasPendingPermissionsFlag] = useState(false)

  useEffect(() => {
    checkAllExplicitPermissions(lang).then((results) => {
      setHasPendingPermissionsFlag(hasPendingPermissions(results))
    }).catch(() => {
      setHasPendingPermissionsFlag(false)
    })
  }, [lang])

  const href = hasPendingPermissionsFlag
    ? getRelativeLocaleUrl(lang, '/signals')
    : getRelativeLocaleUrl(lang, '/demo')

  return (
    <div className='flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-2'>
      <Button size='lg' variant='gray' href={href}>
        {t('landing.cta')}
        <Play size={20} />
      </Button>
    </div>
  )
}
