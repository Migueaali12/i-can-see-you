# Agents.md — Project Context for All Agents
## 1) Project Identity
- **Name:** I can see you
- **Type:** Web app demo (portfolio/viral), not a production proctoring platform.
- **Core idea:** Simulate and visualize browser-detectable distraction signals during a timed session (60–90s).
- **Primary language:** Spanish UI copy (can support EN later).
- **UI language:** English.
- **Product tone:** Playful, witty, slightly passive-aggressive, never hostile.
---
## 2) Product Goal
Build a memorable web experience where users can test whether typical exam-platform browser signals would detect that they got distracted (tab switch, focus loss, fullscreen exit, etc.), then receive a clear summary dashboard.
**Key principle:** Be transparent about technical limits.  
The app demonstrates **browser signals**, not full OS-level surveillance.
---
## 3) MVP Scope (Approved)
### In scope
1. **Landing** with strong CTA (`Probar detección`) and mascot preview.
2. **Guided session** (60–90s) with live event detection.
3. **Final dashboard** with simple metrics:
   - total incidents
   - total distracted time
   - longest incident
   - attention score
4. **Transparency block** (“qué detectamos / qué no detectamos”).
5. **Graceful fallback** when APIs are unavailable.
### Out of scope (for now)
- Real proctoring guarantees
- Account system/login
- Persistent history per user
- Admin panel
- Complex analytics backend
- “Strict mode” or free sandbox mode (future phases)
---
## 4) UX & Visual Direction (Non-Negotiable)
- **Style:** Doodle / hand-drawn.
- **Background:** Notebook-paper feel (subtle texture + faint lines).
- **Palette:** Monochrome only.
  - `#111111` primary text
  - `#444444` secondary
  - `#8A8A8A` neutral
  - `#EAEAEA` borders/surfaces
  - `#FAFAFA` base background
- **Mascot:** Eyes (`👀`) as hero element.
  - Pupils follow cursor
  - Occasional blink
  - Expression states: neutral → suspicious → annoyed
- **Typography:**
  - Titles (`h1`, `h2`, brand name): `Nanum Pen Script` → `var(--font-display)`
  - Subtitles and body text: `LXGW WenKai Mono TC` → `var(--font-body)`
- **Voice:** Short, playful messages; one at a time.
**Do not** introduce colorful gradients or generic “SaaS template” aesthetics.
---
## 5) Core User Flow
1. User lands on homepage and understands value in <5s.
2. Clicks **Probar detección**.
3. Starts timed session (60–90s).
4. Triggers events naturally (or intentionally).
5. Sees final dashboard and disclaimer.
6. Optional retry (`Reintentar demo`).
Routes (proposed):
- `/` landing
- `/demo` session
- `/result` dashboard
- `/support` optional fallback/reference state
---
## 6) Detection Model (Browser-Only)
## Event signals to implement in MVP
- `visibilitychange`
- `window blur/focus`
- `fullscreenchange` (exit)
- mouse leaving viewport
- suspicious paste behavior (`paste`)
- tab hidden/minimized proxy signals
- devtools heuristic (best effort only)
- multi-screen indicators if available API support exists
## Data model (normalized event)
```ts
type DetectionEvent = {
  id: string
  type: string
  startedAt: number
  endedAt?: number
  durationMs?: number
  confidence: "high" | "medium" | "low"
  source: "browser_api" | "heuristic"
}
Transparency requirement
Always include:
> “Esta demo detecta señales del navegador; acciones externas al sistema pueden no ser visibles.”
---
## 7) Technical Stack Decision
**Chosen direction:** Astro + React islands
- Astro for fast marketing shell + clean routing.
- React island(s) for interactive detection engine/session UI.
- Tailwind CSS for styling.
- Client-side state only for MVP (no backend required).
- Optional localStorage for lightweight preferences only.
Why this stack:
- Great performance and SEO for landing.
- Keeps interactive complexity isolated.
- Ideal for portfolio-quality presentation.
---
8) Frontend Architecture (MVP)
Modules
- SessionController — manages lifecycle (idle/running/finished) + timer.
- DetectionEngine — subscribes to browser events and normalizes incidents.
- EventStore — stores open/closed incidents and durations.
- MascotController — maps severity to mascot behavior/messages.
- ResultsBuilder — computes summary metrics.
State phases
idle → running → finished
Severity logic
Computed from event frequency + duration in a recent time window.
---
9) UI Components (Minimum Set)
- Hero block with mascot
- Primary CTA button
- Live status badge (En foco, Fuera de foco, Evento detectado)
- Timer
- Incident counter
- Metric cards (4)
- Timeline strip (simple markers)
- Coverage table (activo/parcial/no disponible)
- Disclaimer block
---
10) Error Handling & Fallbacks
- If an API is unsupported, mark detector as no disponible and continue.
- If detector initialization fails, mark as parcial and continue.
- Never block the whole experience because one signal is unavailable.
- Show coverage status in final results.
---
11) Testing Strategy (MVP)
1. Unit tests
   - event normalization
   - duration calculation
   - metrics aggregation
2. Integration tests
   - full flow from session start to results
3. Manual browser checks
   - Chrome, Edge, Safari baseline behavior
4. Responsive checks
   - desktop + mobile visual integrity
5. Acceptance criteria
   - no crashes in core flow
   - coherent metrics
   - clear disclaimer
   - fast loading and readable UI
---
12) Agent Working Rules
All agents operating on this project must:
1. Preserve the approved MVP scope (YAGNI).
2. Keep the doodle monochrome visual identity.
3. Avoid claiming impossible detections.
4. Prioritize user clarity and honesty over “hype”.
5. Default to frontend-only unless explicitly asked to add backend.
6. Maintain consistency with this document before introducing new features.
7. Propose phased evolution instead of scope jumps.
---
13) Planned Evolution (Post-MVP)
- Free mode (modo libre)
- Rich timeline and confidence breakdown
- Exportable event log (JSON)
- Session comparison/history
- Optional stricter mode profiles
- Optional backend for persistence/analytics
---
14) Definition of Done (MVP)
MVP is done when:
- all 3 core views are functional and visually coherent,
- session detection runs end-to-end with stable metrics,
- mascot behavior is present and expressive,
- disclaimer is visible and explicit,
- unsupported APIs degrade gracefully,
- mobile layout remains clear and on-brand.
