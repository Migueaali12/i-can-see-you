import { GitHub } from "@/components/ui/Github"

const SiteHeader = () => {
  return (
    <header className='sticky top-0 z-50 flex shrink-0 items-center justify-between border-2 border-b-4 border-l-0 border-r-0 border-t-0 border-black bg-white px-6 py-4 shadow-[0_4px_0_rgba(0,0,0,0.08)]'>
      <a
        href='/'
        className='font-display text-[1.4rem] font-black italic tracking-[-0.04em] text-black transition-[opacity,transform] duration-150 ease-in-out hover:opacity-75 hover:scale-[1.03]'
      >
        I can see you
      </a>
      <nav aria-label='Navegacion principal'>
        <ul className='m-0 flex list-none items-center gap-8 p-0'>
          <li>
            <a
              href='/signals'
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
          <li className='flex'>
            <a
              href='https://github.com/Migueaali12/i-can-see-you'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Ver repositorio en GitHub'
              className='inline-flex items-center text-(--color-secondary) transition-[color,transform] duration-150 ease-in-out hover:scale-[1.15] hover:text-black'
            >
              <GitHub width={20} height={20} fill='currentColor' />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default SiteHeader
