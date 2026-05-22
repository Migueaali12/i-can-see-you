import type { ReactNode } from "react"
import SiteHeader from "./SiteHeader"
import SiteFooter from "./SiteFooter"
import type { Lang } from "@/i18n/ui"

export type SiteShellProps = {
  children: ReactNode
  lang: Lang
  /** Clases del contenedor exterior (p. ej. flex min-h-screen). */
  className?: string
  /** Clases del <main>. */
  mainClassName?: string
  /** Contenido entre main y footer (p. ej. mascota flotante). */
  afterMain?: ReactNode
  footerWithPageSpacing?: boolean
}

export default function SiteShell({
  children,
  lang,
  className,
  mainClassName,
  afterMain,
  footerWithPageSpacing = true,
}: SiteShellProps) {
  return (
    <div className={className}>
      <SiteHeader lang={lang} />
      <main className={mainClassName}>{children}</main>
      {afterMain}
      <SiteFooter
        lang={lang}
        withPageSpacing={footerWithPageSpacing}
      />
    </div>
  )
}
