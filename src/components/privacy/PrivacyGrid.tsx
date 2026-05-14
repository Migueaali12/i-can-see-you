import { PrivacyCard } from "./PrivacyCard"
import { Eye, CloudOff, EyeOff, Settings, ShieldCheck, Dot } from "lucide-react"
import Button from "@/components/ui/Button"

export default function PrivacyGrid() {
  return (
    <>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-6 w-[min(1000px,calc(100%-3rem))] mx-auto pt-4 pb-8'>
        {/* Row 1 — What I Track */}
        <div
          className='animate-in fade-in slide-in-from-bottom-4'
          style={{ animationDelay: "100ms" }}
        >
          <PrivacyCard rotation={-1.2} icon={Eye} title='What I Track'>
            <p className='mb-4 text-(--color-secondary)'>
              Your browser tells me more than you think. Here are the signals I
              actually watch.
            </p>
            <ul className='list-none m-0 p-0 flex flex-col gap-2'>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>Tab switches via the Page Visibility API.</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>When you lose or regain window focus.</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>Exiting fullscreen mode.</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>Your cursor leaving the browser viewport.</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>Paste events during the session.</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>Developer tools (best effort heuristic).</span>
              </li>
            </ul>
          </PrivacyCard>
        </div>

        {/* Row 1 — Zero Servers */}
        <div
          className='animate-in fade-in slide-in-from-bottom-4'
          style={{ animationDelay: "200ms" }}
        >
          <PrivacyCard rotation={1} icon={CloudOff} title='Zero Servers'>
            <p className='mb-4 text-(--color-secondary)'>
              Everything stays between you and your browser. I don't have a
              server, a database, or a memory.
            </p>
            <ul className='list-none m-0 p-0 flex flex-col gap-2'>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>Nothing is sent to any server.</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>All detection happens locally in your browser.</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>Session data is cleared when you close the tab.</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>No tracking cookies whatsoever.</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>
                  I don't have a server. I don't even have a database.
                </span>
              </li>
            </ul>
          </PrivacyCard>
        </div>

        {/* Row 2 — What I Don't See (full width) */}
        <div
          className='animate-in fade-in slide-in-from-bottom-4 md:col-span-2'
          style={{ animationDelay: "300ms" }}
        >
          <PrivacyCard rotation={-0.5} icon={EyeOff} title="What I Don't See">
            <p className='mb-4 text-(--color-secondary)'>
              I'm not omniscient. There are hard limits to what a web page can
              observe, and I respect all of them.
            </p>
            <ul className='list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2'>
              <div className='flex flex-col gap-2'>
                <li className='flex items-start gap-2'>
                  <Dot
                    size={18}
                    strokeWidth={2.5}
                    className='shrink-0 mt-[0.15rem]'
                    aria-hidden='true'
                  />
                  <span>Applications running outside your browser.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <Dot
                    size={18}
                    strokeWidth={2.5}
                    className='shrink-0 mt-[0.15rem]'
                    aria-hidden='true'
                  />
                  <span>
                    Content of other windows, tabs, or your clipboard history.
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <Dot
                    size={18}
                    strokeWidth={2.5}
                    className='shrink-0 mt-[0.15rem]'
                    aria-hidden='true'
                  />
                  <span>
                    Your camera or microphone — I never ask for permission.
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <Dot
                    size={18}
                    strokeWidth={2.5}
                    className='shrink-0 mt-[0.15rem]'
                    aria-hidden='true'
                  />
                  <span>Keyboard input when you're typing in another app.</span>
                </li>
              </div>
              <div className='flex flex-col gap-2'>
                <li className='flex items-start '>
                  <Dot
                    size={18}
                    strokeWidth={2.5}
                    className='shrink-0 mt-[0.15rem]'
                    aria-hidden='true'
                  />
                  <span className='text-nowrap'>
                    Obviously, I can't see you when you are taking a bath.
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <Dot
                    size={18}
                    strokeWidth={2.5}
                    className='shrink-0 mt-[0.15rem]'
                    aria-hidden='true'
                  />
                  <span>
                    Whether you actually read the terms of service. (Nobody
                    does.)
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <Dot
                    size={18}
                    strokeWidth={2.5}
                    className='shrink-0 mt-[0.15rem]'
                    aria-hidden='true'
                  />
                  <span>Your inner monologue. Yet.</span>
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
          <PrivacyCard rotation={0.8} icon={Settings} title='How It Works'>
            <p className='mb-4 text-(--color-secondary)'>
              No magic, just standard browser APIs doing their job. Here's the
              technical breakdown.
            </p>
            <ul className='list-none m-0 p-0 flex flex-col gap-2'>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>Page Visibility API — detects when you switch tabs.</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>
                  Focus Events — registers when the window gains or loses focus.
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>Fullscreen API — notices when you exit fullscreen.</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>
                  Mouse Events — tracks when your cursor leaves the viewport.
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>
                  Paste Events — registers paste actions during the session.
                </span>
              </li>
              {/* <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>
                  DevTools Heuristic — estimates whether developer tools are
                  open (low confidence).
                </span>
              </li> */}
            </ul>
          </PrivacyCard>
        </div>

        {/* Row 3 — You Control It */}
        <div
          className='animate-in fade-in slide-in-from-bottom-4'
          style={{ animationDelay: "500ms" }}
        >
          <PrivacyCard
            rotation={-0.6}
            icon={ShieldCheck}
            title='You Control It'
          >
            <p className='mb-4 text-(--color-secondary)'>
              You're in charge. Close the tab and I'm amnesiac. Your privacy is
              literally one click away.
            </p>
            <ul className='list-none m-0 p-0 flex flex-col gap-2'>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>No camera or microphone access required.</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>
                  All detection is passive — no permissions needed to start.
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>
                  Optional explicit permissions available on the{" "}
                  <a
                    href='/signals'
                    className='underline decoration-2 hover:text-black transition-colors'
                  >
                    Signals page
                  </a>
                  .
                </span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>Close the tab and everything disappears instantly.</span>
              </li>
              <li className='flex items-start gap-2'>
                <Dot
                  size={18}
                  strokeWidth={2.5}
                  className='shrink-0 mt-[0.15rem]'
                  aria-hidden='true'
                />
                <span>You can stop the demo anytime with one click.</span>
              </li>
            </ul>
          </PrivacyCard>
        </div>
      </section>

      <div
        className='flex justify-center mt-12 mb-8 animate-in fade-in slide-in-from-bottom-4'
        style={{ animationDelay: "600ms" }}
      >
        <Button href='/' variant='gray' size='lg'>
          Back to Home
        </Button>
      </div>
    </>
  )
}
