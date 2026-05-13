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
## 3) MVP Scope (Approved)
### In scope
1. **Landing** (`/`) with hero mascot preview, coverage section, and CTA.
2. **Guided session** (`/demo`) — 60-second auto-starting detection with live event tracking.
3. **Final dashboard** (`/results`) with metrics:
   - total incidents
   - total distracted time
   - attention score
4. **Permissions gate** (`/signals`) — optional explicit permission requests (clipboard read, multi-screen) before entering demo.
5. **Transparency block** — technical explanation of what signals were detected.
6. **Graceful fallback** when APIs are unavailable.
### Out of scope (for now)
- Real proctoring guarantees
- Account system / login
- Persistent history per user
- Admin panel
- Complex analytics backend
- "Strict mode" or free sandbox mode (future phases)
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
**Why this stack:**
- Great performance and SEO for landing.
- Keeps interactive complexity isolated in React islands.
- Ideal for portfolio-quality presentation.
---
## 8) Frontend Architecture (MVP)
### Core modules
- **`DetectionEngine`** — subscribes to browser events and normalizes open/close incidents.
- **`EventStore`** — stores open and closed incidents; computes counts, durations, current signal.
- **`MascotController`** — maps detection signals to rotating playful messages; enforces cooldown.
- **`ResultsBuilder`** — computes summary metrics (incident count, distracted time, attention score) and persists to `sessionStorage`.
- **`permissions.ts`** — checks and requests explicit browser permissions (`clipboard-read`, `window-management`).
### Session lifecycle (`useActiveSession` hook)
- `idle` → `running` (auto-started on mount) → `finished` (auto-redirect to `/results` after 900ms)
- Manual stop available via timer button hover → click.
### Severity / expression logic
- `neutral` — no active signals
- `suspicious` — non-focus events active (fullscreen, mouseleave, paste, devtools)
- `annoyed` — blur or visibility events active
---
## 9) UI Components (Implemented)
### Landing
- `HeroSection` — brand name, tagline, mascot, CTA (`HeroCtaButton`)
- `CoverageSection` — two-column "What I can detect / What I can't detect"
### Demo / Active Session
- `ActiveSessionView` — full-screen session overlay
- `StatusCard` — live badge (IN FOCUS / OUT OF FOCUS / EVENT DETECTED) + current signal
- `IncidentsCard` — incident counter
- `TimerHero` — large countdown timer (clickable to stop early)
- `MascotCorner` — floating mascot + `DialogBubble` with rotating messages
### Results
- `ResultsView` — hero header with score-based expression, metrics row, timeline, transparency block, CTAs
- `MetricsRow` — 3 metric cards (Distractions, Duration, Attention Score)
- `SessionTimeline` — horizontal timeline strip with incident markers and legend
- `TransparencyBlock` — list of detected signals with technical descriptions
### Permissions
- `SupportView` — permission rows with status badges (ACTIVE / PARTIAL / UNAVAILABLE), authorize buttons, fallback info
### Layout / Shared
- `SiteShell` — wraps header + main + optional after-main slot + footer
- `SiteHeader` — brand link + nav (Signals, Demo, GitHub)
- `SiteFooter` — tagline + footer links (Privacy, Manual, Opt-out)
- `MascotEyes` — interactive SVG eyes with cursor tracking, blink, expression states
- `Button` — primary CTA with variants (`black`, `gray`)
- `DoodleCard` — reusable card with doodle-style borders and optional dashed inset
- `DialogBubble` — speech bubble tail pointing to mascot
---
## 10) Error Handling & Fallbacks
- If an API is unsupported, mark detector as **UNAVAILABLE** and continue.
- If detector initialization fails, mark as **PARTIAL** and continue.
- Never block the whole experience because one signal is unavailable.
- Show coverage status and fallback explanations in UI (e.g. Firefox/Safari compatibility note on `/signals`).
---
## 11) Testing Strategy (MVP)
1. **Unit tests**
   - event normalization
   - duration calculation
   - metrics aggregation
   - attention score formula
2. **Integration tests**
   - full flow from session start to results
3. **Manual browser checks**
   - Chrome, Edge, Safari baseline behavior
4. **Responsive checks**
   - desktop + mobile visual integrity
5. **Acceptance criteria**
   - no crashes in core flow
   - coherent metrics
   - clear disclaimer
   - fast loading and readable UI
---
## 12) Agent Working Rules
All agents operating on this project must:
1. Preserve the approved MVP scope (YAGNI).
2. Keep the doodle monochrome visual identity.
3. Avoid claiming impossible detections.
4. Prioritize user clarity and honesty over "hype".
5. Default to frontend-only unless explicitly asked to add backend.
6. Maintain consistency with this document before introducing new features.
7. Propose phased evolution instead of scope jumps.
8. Avoid using emojis in UI; prefer Lucide icons (already installed).
---
## 13) Planned Evolution (Post-MVP)
- Free mode (unguided sandbox)
- Rich timeline with confidence breakdown per event
- Exportable event log (JSON)
- Session comparison / history
- Optional stricter mode profiles
- Optional backend for persistence / analytics
---
## 14) Definition of Done (MVP)
MVP is done when:
- all 4 core views are functional and visually coherent,
- session detection runs end-to-end with stable metrics,
- mascot behavior is present and expressive,
- disclaimer is visible and explicit,
- unsupported APIs degrade gracefully,
- mobile layout remains clear and on-brand.
