const SiteHeader = () => {
  return (
    <header className='sticky top-0 z-50 flex shrink-0 items-center justify-between border-2 border-b-4 border-l-0 border-r-0 border-t-0 border-black bg-white px-6 py-4 shadow-[0_4px_0_rgba(0,0,0,0.08)]'>
      <span className='font-display text-[1.4rem] font-black italic tracking-[-0.04em] text-black'>
        I can see you
      </span>
      <nav aria-label='Navegacion principal'>
        <ul className='m-0 flex list-none gap-8 p-0'>
          <li>
            <a
              href='/'
              className='inline-block text-[0.85rem] font-bold uppercase tracking-wider text-(--color-secondary) underline decoration-2 transition-[color,transform] duration-150 ease-in-out hover:-rotate-1 hover:scale-[1.05] hover:text-black'
            >
              Home
            </a>
          </li>
          <li>
            <a
              href='/#transparencia'
              className='inline-block text-[0.85rem] font-bold uppercase tracking-wider text-(--color-secondary) underline decoration-2 transition-[color,transform] duration-150 ease-in-out hover:-rotate-1 hover:scale-[1.05] hover:text-black'
            >
              Signals
            </a>
          </li>
          <li>
            <a
              href='/demo'
              className='inline-block text-[0.85rem] font-bold uppercase tracking-wider text-(--color-secondary) underline decoration-2 transition-[color,transform] duration-150 ease-in-out hover:-rotate-1 hover:scale-[1.05] hover:text-black'
            >
              Demo
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default SiteHeader
