type SiteFooterProps = {
  navAriaLabel?: string
  withPageSpacing?: boolean
}

const SiteFooter = ({
  navAriaLabel = "Links del pie de pagina",
  withPageSpacing = true,
}: SiteFooterProps) => {
  return (
    <footer
      className={[
        "flex shrink-0 flex-wrap items-center justify-between gap-4 border-2 border-b-0 border-l-0 border-r-0 border-t-4 border-black bg-white p-6",
        withPageSpacing ? "mt-16" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className='text-[0.95rem] font-bold uppercase text-black'>
        This demo detects browser signals... The sketchbook is watching.
      </span>
      <nav aria-label={navAriaLabel}>
        <ul className='m-0 flex list-none gap-6 p-0'>
          <li>
            <a
              href='#'
              className='font-mono text-[0.75rem] uppercase tracking-widest text-(--color-secondary) hover:italic'
            >
              Privacy
            </a>
          </li>
          <li>
            <a
              href='#'
              className='font-mono text-[0.75rem] uppercase tracking-widest text-(--color-secondary) hover:italic'
            >
              Manual
            </a>
          </li>
          <li>
            <a
              href='#'
              className='font-mono text-[0.75rem] uppercase tracking-widest text-(--color-secondary) hover:italic'
            >
              Opt-out
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default SiteFooter
