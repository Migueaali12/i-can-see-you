# Agents.md — Project Context for All Agents

## 1) Project Identity
- **Name:** I can see you
- **Type:** Web app demo (portfolio/viral), not a production proctoring platform.
- **Core idea:** Simulate and visualize browser-detectable distraction signals during a timed session (60s).
- **Primary language:** English UI copy.
- **Product tone:** Playful, witty, slightly passive-aggressive, never hostile.
---
## 2) Product Goal
Build a memorable web experience where users can test whether typical exam-platform browser signals would detect that they got distracted (tab switch, focus loss, fullscreen exit, etc.), then receive a clear summary dashboard.
**Key principle:** Be transparent about technical limits.  
The app demonstrates **browser signals**, not full OS-level surveillance.
---
## 3) Current Scope
### Implemented routes
1. **Landing** (`/`) — hero mascot preview, coverage section, CTA, FAQ + WebApp structured data.
2. **Permissions gate** (`/signals`) — optional explicit permission requests (clipboard read, multi-screen) before entering demo.
3. **Guided session** (`/demo`) — 60-second auto-starting detection with live event tracking.
4. **Results dashboard** (`/results`) — metrics (incidents, distracted time, attention score), timeline, transparency block, CTAs.
5. **Privacy** (`/privacy`) — privacy policy with FAQ structured data.
6. **Manual** (`/manual`) — user manual page (How It Works, Tips to Not Get Caught).
7. **Shareable card preview** (`/shareable-card`) — dev-only OG card preview (noindex).

### In scope (future)
- Shareable results card (image export)
- Session comparison / history
- Free mode (unguided sandbox)
- Optional stricter mode profiles

### Out of scope (for now)
- Real proctoring guarantees
- Account system / login
- Persistent history per user
- Admin panel
- Complex analytics backend
---
## 4) UX & Visual Direction (Non-Negotiable)
- **Style:** Doodle / hand-drawn.
- **Background:** Notebook-paper feel (subtle texture + faint lines).
- **Palette:** Monochrome only.
  - `#111111` primary text
  - `#444444` secondary
  - `#8A8A8A` neutral
  - `#EAEAEA` borders / surfaces
  - `#FAFAFA` base background
- **Mascot:** Eyes as hero element.
  - Pupils follow cursor
  - Occasional blink
  - Expression states: neutral → suspicious → annoyed
- **Typography:**
  - Titles (`h1`, `h2`, brand name): `Nanum Pen Script` → `var(--font-display)`
  - Subtitles and body text: `LXGW WenKai Mono TC` → `var(--font-body)`
- **Voice:** Short, playful messages; one at a time.
**Do not** introduce colorful gradients or generic "SaaS template" aesthetics.
---
## 5) Core User Flow
1. User lands on homepage and understands value in <5s.
2. Clicks **"Let's try it out!"**.
3. Routed to `/signals` if any explicit permissions are pending; otherwise straight to `/demo`.
4. Starts 60-second auto-starting timed session.
5. Triggers events naturally (or intentionally).
6. Sees final dashboard and disclaimer.
7. Optional retry (**"Retry demo"**) or share results.
**Routes (actual):**
- `/` landing
- `/signals` permission gate
- `/demo` live session
- `/results` dashboard
- `/privacy` privacy policy
- `/manual` user manual
---
## 6) Detection Model (Browser-Only)
### Event signals implemented
- `visibilitychange` — tab hidden / shown
- `window blur / focus` — window focus loss and recovery
- `fullscreenchange` — fullscreen exit (only after entering fullscreen)
- `mouseleave` / `mouseenter` — cursor leaving viewport
- `paste` — suspicious paste behavior (auto-closes after 2.5s)
- `devtools` heuristic — size-based best-effort check (low confidence)
### Explicit permission signals (optional)
- `clipboard-read` — checked via Permissions API; paste event works regardless
- `screenDetails` / `window-management` — multi-screen detection if API available
### Data model (normalized event)
```ts
type DetectionEvent = {
  id: string
  type: DetectionSignal
  startedAt: number
  endedAt?: number
  durationMs?: number
  confidence: "high" | "medium" | "low"
  source: "browser_api" | "heuristic"
}
```
### Transparency requirement
Always include:
> "This experiment uses native browser signals to determine your attention level, without turning on your camera or invading your actual privacy."
---
## 7) Technical Stack
- **Framework:** Astro + React islands
- **Styling:** Tailwind CSS v4
- **State:** Client-side only; no backend for MVP
- **Persistence:** `sessionStorage` for lightweight results transfer between `/demo` and `/results`
- **Package manager:** pnpm
- **Fonts:** `@fontsource/nanum-pen-script`, `@fontsource/lxgw-wenkai-mono-tc`
- **Icons:** Lucide React
- **Deployment:** Cloudflare Pages
- **Production URL:** https://icanseeyou.dev/
**Why this stack:**
- Great performance and SEO for landing.
- Keeps interactive complexity isolated in React islands.
- Ideal for portfolio-quality presentation.
---
## 8) Project Structure
```
src/
├── components/
│   ├── ui/              # Shared reusable components (Button, DoodleCard, ContractCard)
│   ├── layout/          # SiteShell, SiteHeader, SiteFooter
│   ├── mascot/          # MascotEyes (React), MascotEyesStatic (Astro and React)
│   ├── demo/            # ActiveSessionView + active-session/ subfolder
│   ├── results/         # ResultsView, MetricsRow, SessionTimeline, TransparencyBlock
│   ├── landing/         # HeroSection, HeroCtaButton, CoverageSection
│   ├── support/         # SupportView (permissions gate)
│   ├── manual/          # ManualCard, ManualGrid, ManualHero
│   └── privacy/         # PrivacyCard, PrivacyGrid, PrivacyHero, PrivacyContent
├── core/                # Business logic (detectionEngine, eventStore, mascotController, resultsBuilder, permissions)
├── layouts/             # Layout.astro (HTML shell with SEO)
├── pages/               # Astro page routes
└── styles/              # global.css (Tailwind, design tokens), mascot.css
```
---
## 9) Component Reuse Rules (MANDATORY)

**Always reuse existing components before creating new ones.** The project has a well-established component library. Check `src/components/ui/`, `src/components/layout/`, and `src/components/mascot/` first.

### Priority reuse order
1. **`Button`** (`src/components/ui/Button.tsx`) — All CTAs and action buttons.
   - Variants: `black` (default), `gray`
   - Sizes: `xs`, `sm`, `md`, `lg`, `xl`
   - Supports `href` (renders `<a>`), `icon` (Lucide), `loading`, `disabled`
   - **Use this for every button** — never create a new button component.

2. **`DoodleCard`** (`src/components/ui/DoodleCard.tsx`) — **Most reused component.**
   - Variants: `default`, `inverted`, `note`
   - Corners: `scan`, `eye-off`
   - Props: `title`, `listItems`, `dashedBorder`, `rotation`, `icon`, `shadowClassName`, `innerClassName`
   - Used by: StatusCard, IncidentsCard, MetricCard, SessionTimeline, TransparencyBlock, SupportView, CoverageSection, ManualCard, PrivacyCard
   - **Use this for every card/container** — never create a new card component unless it needs a completely different visual metaphor (like ContractCard).

3. **`ContractCard`** (`src/components/ui/ContractCard.tsx`) — Clipboard-themed card.
   - Variants: `default`, `inverted`
   - Use for consent/permission-themed content.

4. **`MascotEyes`** (`src/components/mascot/MascotEyes.tsx`) — Interactive mascot.
   - Sizes: `mascot--hero`, `mascot--md`, `mascot--md-small`, `mascot--sm`
   - Expressions: `neutral`, `suspicious`, `annoyed`
   - **Use this for all mascot instances** — never recreate the eyes SVG.

5. **`MascotEyesStatic`** (`src/components/mascot/MascotEyesStatic.astro`) — Static (SSR) mascot.
   - Use for OG images, non-interactive contexts, Astro-only components.

6. **`SiteShell`** (`src/components/layout/SiteShell.tsx`) — Page layout wrapper.
   - Wraps Header + Main + optional AfterMain + Footer.
   - **Use this for every page** that needs standard navigation.

7. **`DialogBubble`** (`src/components/demo/active-session/DialogBubble.tsx`) — Speech bubble.
   - Use with mascot for message display.

### When to create new components
- Only when the existing components cannot fulfill the visual or functional requirement.
- New components should still use `Button`, `DoodleCard`, or `MascotEyes` internally when applicable.
- Place new components in the appropriate domain folder (`demo/`, `results/`, etc.) or `ui/` if truly shared.
---
## 10) Frontend Architecture
### Core modules
- **`DetectionEngine`** (`src/core/detectionEngine.ts`) — subscribes to browser events and normalizes open/close incidents.
- **`EventStore`** (`src/core/eventStore.ts`) — stores open and closed incidents; computes counts, durations, current signal.
- **`MascotController`** (`src/core/mascotController.ts`) — maps detection signals to rotating playful messages; enforces cooldown.
- **`ResultsBuilder`** (`src/core/resultsBuilder.ts`) — computes summary metrics and persists to `sessionStorage`.
- **`permissions.ts`** (`src/core/permissions.ts`) — checks and requests explicit browser permissions.
### Session lifecycle (`useActiveSession` hook)
- `idle` → `running` (auto-started on mount) → `finished` (auto-redirect to `/results` after 900ms)
- Manual stop available via timer button hover → click.
### Severity / expression logic
- `neutral` — no active signals
- `suspicious` — non-focus events active (fullscreen, mouseleave, paste, devtools)
- `annoyed` — blur or visibility events active
---
## 11) Error Handling & Fallbacks
- If an API is unsupported, mark detector as **UNAVAILABLE** and continue.
- If detector initialization fails, mark as **PARTIAL** and continue.
- Never block the whole experience because one signal is unavailable.
- Show coverage status and fallback explanations in UI (e.g. Firefox/Safari compatibility note on `/signals`).
---
## 12) Verification Rules (MANDATORY)

**Always verify your changes compile correctly before declaring a task complete.**

### Required checks after code changes
1. **Type check:** Run `pnpm check` (equivalent to `astro sync && astro check`) to verify TypeScript types.
2. **Build:** Run `pnpm build` (equivalent to `astro build`) to verify the production build succeeds.
3. **Fix any errors** before considering the task done.

### Commands reference
```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm preview    # Preview production build locally
pnpm check      # Type checking (astro sync && astro check)
```

### When to run checks
- After modifying any `.tsx`, `.ts`, or `.astro` file.
- After adding new imports or dependencies.
- Before committing changes.
- When the user asks you to verify something works.
---
## 13) Testing Strategy
1. **Manual browser checks**
   - Chrome, Edge, Safari baseline behavior
2. **Responsive checks**
   - Desktop + mobile visual integrity
3. **Acceptance criteria**
   - no crashes in core flow
   - coherent metrics
   - clear disclaimer
   - fast loading and readable UI
   - `pnpm check` passes with no errors
   - `pnpm build` succeeds
---
## 14) Agent Working Rules
All agents operating on this project must:
1. Preserve the approved scope (YAGNI).
2. Keep the doodle monochrome visual identity.
3. Avoid claiming impossible detections.
4. Prioritize user clarity and honesty over "hype".
5. Default to frontend-only unless explicitly asked to add backend.
6. Maintain consistency with this document before introducing new features.
7. Propose phased evolution instead of scope jumps.
8. Avoid using emojis in UI; prefer Lucide icons (already installed).
9. **ALWAYS reuse existing components** (Button, DoodleCard, MascotEyes, SiteShell) before creating new ones.
10. **ALWAYS run `pnpm check` and `pnpm build`** after making code changes to verify correctness.
11. Check `src/components/ui/` and `src/components/mascot/` first when needing UI elements.
12. Follow the Astro + React island pattern — keep interactive logic in React, static content in Astro.
---
## 15) Planned Evolution (Post-MVP)
- Shareable results card (image export) — `ShareableCard` component is a TODO
- Rich timeline with confidence breakdown per event
- Exportable event log (JSON)
- Session comparison / history
- Optional stricter mode profiles
- Optional backend for persistence / analytics
---
## 16) Definition of Done
A feature or change is done when:
- all affected views are functional and visually coherent,
- session detection runs end-to-end with stable metrics (if modified),
- mascot behavior is present and expressive (if relevant),
- disclaimer is visible and explicit (if relevant),
- unsupported APIs degrade gracefully,
- mobile layout remains clear and on-brand,
- **`pnpm check` passes with no errors,**
- **`pnpm build` succeeds.**
