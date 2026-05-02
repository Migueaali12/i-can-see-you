const NAV_ITEMS = ["Privacy", "Manual", "Opt-out"] as const

export default function DemoFooter() {
  return (
    <footer className="site-footer shrink-0">
      <span className="site-footer__claim uppercase">
        This demo detects browser signals... The sketchbook is watching.
      </span>
      <nav aria-label="Demo links">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}
