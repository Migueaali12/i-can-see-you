type SiteFooterProps = {
  navAriaLabel?: string
  withPageSpacing?: boolean
}

const SiteFooter = ({
  navAriaLabel = "Footer navigation",
  withPageSpacing = true,
}: SiteFooterProps) => {
  return (
    <footer
      className={[
        "flex shrink-0 flex-wrap items-center justify-between gap-4 border-2 border-b-0 border-l-0 border-r-0 border-t-4 border-black bg-white px-6 py-3",
        withPageSpacing ? "mt-12" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className='text-[clamp(0.75rem,1vw,1rem)] font-bold text-black'>
        This site detects browser signals... The sketchbook is watching.
      </span>
      <nav aria-label={navAriaLabel}>
        <ul className='m-0 flex list-none gap-6 p-0'>
          <li>
            <a
              href='/privacy'
              className='font-mono text-[0.75rem] uppercase tracking-widest text-(--color-secondary) hover:italic'
            >
              Privacy
            </a>
          </li>
          <li>
            <a
              href='/manual'
              className='font-mono text-[0.75rem] uppercase tracking-widest text-(--color-secondary) hover:italic'
            >
              Manual
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default SiteFooter