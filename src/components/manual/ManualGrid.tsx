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

export default function ManualGrid() {
  return (
    <>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-6 w-[min(1000px,calc(100%-3rem))] mx-auto pt-4 pb-8'>
        {/* How It Works */}
        <div
          className='animate-in fade-in slide-in-from-bottom-4'
          style={{ animationDelay: "100ms" }}
        >
          <ManualCard rotation={-1} icon={Eye} title='How It Works'>
            <p className='mb-4 text-(--color-secondary)'>
              No magic, just standard browser APIs doing their job. Here's what
              the sketchbook actually listens to.
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
                    Page Visibility API
                  </span>
                  <p className='text-(--color-secondary) text-[0.88rem] leading-relaxed mt-0.5'>
                    Detects when you switch tabs or minimize the browser. If the
                    document is hidden, we know you looked away.
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
                  <span className='font-semibold text-black'>Focus Events</span>
                  <p className='text-(--color-secondary) text-[0.88rem] leading-relaxed mt-0.5'>
                    Monitors when the window loses or gains focus. Clicking on
                    another application or monitor triggers this.
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
                    Fullscreen API
                  </span>
                  <p className='text-(--color-secondary) text-[0.88rem] leading-relaxed mt-0.5'>
                    Notices when you exit fullscreen mode during the session.
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
                  <span className='font-semibold text-black'>Mouse Events</span>
                  <p className='text-(--color-secondary) text-[0.88rem] leading-relaxed mt-0.5'>
                    Tracks when your cursor leaves the browser viewport.
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
                  <span className='font-semibold text-black'>Paste Events</span>
                  <p className='text-(--color-secondary) text-[0.88rem] leading-relaxed mt-0.5'>
                    Registers paste actions while the session is running.
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
                    DevTools Heuristic
                  </span>
                  <p className='text-(--color-secondary) text-[0.88rem] leading-relaxed mt-0.5'>
                    A best-effort size-based check to guess if developer tools
                    are open. Low confidence, high curiosity.
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
            title='Tips to Not Get Caught'
          >
            <p className='mb-4 text-(--color-secondary)'>
              If you're trying to ace the demo without raising any flags, here's
              your cheat sheet.
            </p>
            <ul className='list-none m-0 p-0 flex flex-col gap-3'>
              <li className='flex items-start gap-3'>
                <CheckSquare
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <span>Keep the browser window focused at all times.</span>
              </li>
              <li className='flex items-start gap-3'>
                <CheckSquare
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <span>Do not switch tabs while the session is active.</span>
              </li>
              <li className='flex items-start gap-3'>
                <CheckSquare
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <span>
                  Use a separate device if you need to look something up.
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <CheckSquare
                  size={18}
                  strokeWidth={2}
                  className='shrink-0 mt-[0.1rem] text-black'
                  aria-hidden='true'
                />
                <span>
                  Enter fullscreen before the session starts if you want fewer
                  edge cases.
                </span>
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
                    Close your eyes.
                  </span>{" "}
                  <span className='text-(--color-secondary) text-[0.88rem]'>
                    (Does not work. We still see the browser state.)
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
        <Button href='/' variant='gray' size='lg'>
          Back to Home <House size={18} strokeWidth={2} />
        </Button>
      </div>
    </>
  )
}
