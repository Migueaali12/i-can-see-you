import type { ReactNode } from "react"
import SiteHeader from "./SiteHeader"
import SiteFooter from "./SiteFooter"

export type SiteShellProps = {
  children: ReactNode
  /** Clases del contenedor exterior (p. ej. flex min-h-screen). */
  className?: string
  /** Clases del <main>. */
  mainClassName?: string
  /** Contenido entre main y footer (p. ej. mascota flotante). */
  afterMain?: ReactNode
  footerNavAriaLabel?: string
  footerWithPageSpacing?: boolean
}

export default function SiteShell({
  children,
  className,
  mainClassName,
  afterMain,
  footerNavAriaLabel,
  footerWithPageSpacing = true,
}: SiteShellProps) {
  return (
    <div className={className}>
      <SiteHeader />
      <main className={mainClassName}>{children}</main>
      {afterMain}
      <SiteFooter
        navAriaLabel={footerNavAriaLabel}
        withPageSpacing={footerWithPageSpacing}
      />
    </div>
  )
}
