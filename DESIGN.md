# Design System: I Can See You

**Project ID:** — (code-native design system; no Stitch project)
**Source of truth:** `src/styles/global.css` (tokens, utilities, notebook grid), `src/styles/mascot.css` (mascot), `src/components/ui/*` (components).
**Product:** icanseeyou.dev — a browser-signal distraction demo. Playful, witty, slightly passive-aggressive notebook doodle, never hostile.

---

## 1. Visual Theme & Atmosphere

The **"I Can See You"** experience is designed to feel like **a page torn from a mischievous student's notebook**: hand-drawn doodles in the margins, everything inked in pure black and graphite gray on lined paper, with a pair of cartoon eyes watching your every move.

The mood is **playfully suspicious**. The interface is monochrome (single deliberate exception: the header wordmark, see §2), flat, and resolutely anti-SaaS. There are no blurs, no gradients, no colored status pills. Depth is simulated the way a sketch artist would: **solid offset "marker" shadows** — a hard black block displaced a few pixels behind every button, card, and panel, as if the element were cut out of cardboard and laid over the page. Cards sit **slightly rotated** (like taped-in notes) and **straighten themselves when you hover**, as if you were adjusting the paper to read it.

Every surface originates from the same sheet: a **notebook-paper background** built from a 40×40px grid of hairline graphite lines. The **mascot — a pair of doodle eyes — is the hero element** on the landing page. Its pupils follow your cursor, it blinks, it gets suspicious, it gets annoyed. It is the product's personality made of two ellipses and a dot.

**Key characteristics:**
- Strict monochrome ink palette; chromatic color is a banned resource (one documented exception).
- Hand-drawn geometry: uneven eye outlines, organic note-card radii, hand-placed rotations.
- Hard offset shadows, zero blur. No elevation blur vocabulary exists.
- Handwritten display type (Nanum Pen Script) paired with a warm monospace body face (LXGW WenKai Mono TC).
- Generous, `clamp()`-driven breathing room that scales with viewport *height*, not just width.
- Micro-rotations and wobbles give every interaction a human, hand-placed feel.

---

## 2. Color Palette & Roles

All colors are defined as CSS custom properties in `:root` (light) and `.dark` (dark) in `src/styles/global.css`. Both themes are first-class.

### Light Mode — "Ink on Paper"

| Descriptive name | Hex | Token | Role |
|---|---|---|---|
| **Ink Black** | `#000000` | `--color-primary`, `--color-border`, `--color-shadow`, `--color-on-card` | Headlines, 2px borders, offset shadows, primary text. The workhorse ink. |
| **Paper White** | `#FFFFFF` | `--color-on-primary`, `--color-card` | Card faces, header/footer surfaces, text on black. |
| **Notebook Paper** | `#F9F9F9` | `--color-surface` | Page background and inner faces (buttons, card panels). |
| **Pencil Graphite** | `#1A1C1C` | `--color-on-surface` | Default body text — softer than ink black for long reading. |
| **Soft Graphite** | `#444748` | `--color-on-surface-variant` | Supporting copy, secondary descriptions. |
| **Grid Gray** | `#E2E2E2` | `--color-surface-variant` | The 1px notebook grid lines behind everything. |
| **Mid Graphite** | `#5F5E5E` | `--color-secondary` | Secondary text, nav links, **gray button shadow block**. |
| **Pencil Outline** | `#747878` | `--color-outline` | Structural outlines of lesser importance. |
| **Dashed Pencil** | `#C4C7C7` | `--color-outline-variant` | Dashed inset borders, dashed hero underlines, dividers. |
| **Faded Graphite** | `#8A8A8A` | `--color-muted` | Muted/de-emphasized content. |
| **Mascot Eye Ink** | `#111111` | `--mascot-eye-border` | The mascot's eye outline, pupils, brows. |

### Dark Mode — "Chalk on Charcoal"

Dark mode **inverts the ink**, it does not merely dim it. The paper turns charcoal, the ink turns chalk — and crucially, **the offset shadows turn white** (`--color-shadow: #E2E2E2`), preserving the cardboard-cutout depth metaphor.

| Descriptive name | Hex | Token | Role |
|---|---|---|---|
| **Chalk White** | `#FFFFFF` | `--color-primary` | Primary text/headlines in dark. |
| **Charcoal Sheet** | `#1A1C1C` | `--color-surface` | Dark page background. |
| **Charcoal Card** | `#2A2C2C` | `--color-card` | Header/footer/card surfaces on dark. |
| **Chalk Border** | `#E2E2E2` | `--color-border`, `--color-shadow`, `--color-on-card` | Borders and offset shadows (yes, white shadows). |
| **Ash Text** | `#C4C7C7` | `--color-on-surface-variant` | Secondary text on dark. |
| **Slate Grid** | `#333333` | `--notebook-grid-line` | Notebook grid lines on dark. |
| **Smoke Graphite** | `#A0A0A0` | `--color-secondary` | Secondary UI text on dark. |
| **Softened Eye Ink** | `#555555` | `--mascot-eye-border` | The mascot's eye border softens in the dark. |

### Chromatic Exception (only one)

- **Wordmark Blue** (`#3B82F6`, Tailwind `blue-500`) — used **exclusively** on the "I can see you" brand wordmark in the sticky header. It is the single spot of color in the entire system, functioning like a blue pen signature on an otherwise graphite page. Do not propagate it anywhere else.

### Banned
- Gradients of any kind.
- Colored status states (success/error/warning as green/red/amber). State is communicated by icons (✓/✕ doodle stickers), opacity, strikethrough, and copy — never hue.

---

## 3. Typography Rules

Two fonts, two jobs. Both are loaded locally via `@fontsource` and preloaded in `Layout.astro`.

### Display — Nanum Pen Script (`--font-display`)
A casual handwritten marker face. Used for **h1/h2, card titles, the brand wordmark, and big numbers**. It carries all the "voice" of the product.

- **Hero h1:** `clamp(2.5rem, 6vw, 4rem)`, bold, `line-height: 1.05`, `letter-spacing: -0.02em` — big, confident marker strokes.
- **Card titles:** `1.35rem`, semibold, tight leading, sitting above a 2px ink underline rule.
- **Header wordmark:** `1.4rem`, black weight, **italic**, `letter-spacing: -0.04em`, in Wordmark Blue.
- **Sub-headers in cards:** `font-display` at the same `1.35rem` scale for visual consistency across all pages.

### Body — LXGW WenKai Mono TC (`--font-body`)
A monospace-flavored print face with handwriting warmth. Default body text on `body`, buttons, nav, everything that isn't display.

- **Body copy:** `1rem`–`1.05rem`, `line-height: 1.5–1.7`.
- **Nav links (header):** `0.875rem`, bold, **uppercase**, `tracking-wider`, underlined with a 2px decoration that reads like a pen stroke.
- **Footer links & micro-meta:** `font-mono`, `0.75rem`, uppercase, `letter-spacing: 0.1em` (widest), color Mid Graphite; **hover switches to italic** — a small "nudge" that mimics tilting the paper.
- **Button labels:** semibold, `1.2rem` (primary) / `1rem` (secondary), `line-height: 1.2`.

### Voice in Typography
Tone is short, playful, one message at a time, slightly passive-aggressive ("60 seconds. That's all it takes. Try not to get distracted."). Text styling supports this: keep labels terse, sentence case for human voice, uppercase reserved for machine-ish meta (nav, footer, terminals).

---

## 4. Component Stylings

The three signature moves shared by **every** component: **(1) 2px ink borders, (2) hard offset shadow blocks with zero blur, (3) a small rotation that relaxes on hover or press.**

### 4.1 Buttons (`Button.tsx`)

The doodle button is a **paper cutout with a shadow block underneath** — not a pill, not a gradient.

- **Shape:** Sharp, squared-off edges. No border radius, ever.
- **Face:** Notebook Paper (`#F9F9F9`) background, `2px` solid ink border (`--color-border`), body font semibold.
- **Shadow block:** An absolutely-positioned solid rectangle behind the face, translated on rest and collapsing on press. Primary = Ink Black; secondary (`variant="gray"`) = Mid Graphite (`#5F5E5E`).
- **Motion:** All translate/rotate transitions run at `120ms ease-in-out` — snappy, physical.

| State | Face | Shadow offset | Rotation | Notes |
|---|---|---|---|---|
| **Rest** | `#F9F9F9` + 2px ink border | 3px→8px by size (see below) | `0deg` | — |
| **Hover** | unchanged | unchanged | **`-2deg`** | The button tilts like a sticker being peeled. |
| **Active (press)** | unchanged | **collapses to 2–3px** | `0deg` | Face translates down/right onto its shadow. |
| **Disabled / loading** | unchanged, **60% opacity** | frozen | `0deg` | `cursor: not-allowed`, no motion. |

**Size scale** (padding / label / shadow offset):

| Size | Padding | Text | Shadow | Use |
|---|---|---|---|---|
| `xs` | `px-2.5 py-1.5` | `0.75rem` | `3px` | Inline/compact actions |
| `sm` | `px-3 py-2` | `0.875rem` | `4px` | Dense toolbars |
| `md` | `px-5 py-2.5` | `1rem` | `5px` | Default compact |
| `lg` | `px-6 py-3` | `1.125rem` | `6px` | **Most common** — page CTAs |
| `xl` | `px-8 py-3.5` | `1.25rem` | `8px` | Hero CTA ("Let's try it out!") |

Legacy (no size prop): primary `1.2rem / px-8 / py-0.9rem` with `6px` shadow; gray `1rem / 1.4rem / 0.7rem`. Prefer explicit sizes in new work.

### 4.2 DoodleCard (`DoodleCard.tsx`) — the universal container

**Use this for every card/panel.** Variants: `default`, `inverted`, `note`.

- **Panel:** Notebook Paper face, `2px` ink border, padding `clamp(1.25rem, 4vh, 2rem)`, `h-full` flex column.
- **Offset shadow:** Solid `--color-shadow` block offset `translate(6px, 6px)` — the "cardboard behind paper" look.
- **Card title:** Display font, `1.35rem`, semibold, with a `2px` bottom rule (ink on light, white on inverted).
- **List items:** Custom bullet dot (Lucide `Dot`, `2.5` stroke) instead of standard markers; `1.05rem`, relaxed leading, `clamp(0.5rem,1.5vh,1rem)` row gap.
- **Corner stickers:** Optional floating badge on the top-left corner, rotated `-12deg`: a hand-drawn check (`corner="scan"`) or cross (`corner="eye-off"`) — the ✓/✕ vocabulary that replaces colored status indicators.
- **Dashed inset border:** Optional `inset-[10px]` 1px dashed line in Dashed Pencil (`#C4C7C7`), like a dotted cut-line drawn with a ruler.
- **Rotation prop:** Cards are hand-placed at `-1.2deg` to `+1.2deg`; **hover straightens to `0deg` over `400ms cubic-bezier(0.22,1,0.36,1)`**. Used everywhere (coverage blocks, privacy/manual grids).
- **Inverted variant:** Solid black panel with white text (dark mode flips automatically). Used for emphasis cards and "zero servers" style statements.
- **Note variant:** The organic paper note. Irregular hand-torn radius: `border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px` applied to both panel and shadow. This is the most "doodle" surface in the kit.

### 4.3 ContractCard (`ContractCard.tsx`)

A **clipboard** metaphor for consent/permission content — same ink/paper/shadow language, plus:

- **Clip hardware** at top center: a black (or white when inverted) rounded bar with two circular rivets, overlapping the panel edge.
- Generous `pt-12` top padding to clear the clip; bullet marker is a bold `•`.
- Optional **signature line**: dashed top rule, an italic `X`, a `2px` underline, and "sign here" hint in 60% opacity italic.
- Use only for consent/permission-themed content; prefer DoodleCard otherwise.

### 4.4 Mascot — Doodle Eyes (`MascotEyes`, `mascot.css`)

The brand's hero element and the only place with its own physics.

- **Eye shell:** `1em × 1.25em`, uneven organic radius `50% 50% 48% 52% / 55% 55% 45% 45%`, Paper White (`#fafafa`) fill, `0.07em` ink border, **hard offset micro-shadow** `0.04em 0.04em 0` (no blur, consistent with the system).
- **Pupil:** `0.46em` ink dot with a tiny white glint (`0.14em` highlight). Tracks the cursor with a snappy `90ms cubic-bezier(0.22,1,0.36,1)`; when idle it wanders lazily (`550ms`, easing with slight overshoot `cubic-bezier(0.34,1.2,0.64,1)`).
- **Blink:** phase-based (close `120ms` ease-in → hold `55ms` → open `150ms` ease-out), with occasional double-blinks.
- **Expressions:** `neutral` → `suspicious` (brows angled inward `±12deg`) → `annoyed` (eyelids lowered to 45%, brows flattened at `±5deg`, auto-returns after ~1.8s).
- **Idle wobble:** the whole mascot rotates `±0.4deg` on a `4s ease-in-out` loop — barely perceptible, keeps it "alive".
- **Sizes:** `mascot--hero` (`clamp(4.5rem, 10vh, 7.5rem)`), `mascot--md` (`4.5rem`), `mascot--md-small` (`3rem`), `mascot--sm` (`2.5rem`), `mascot--corner` (fluid `clamp(2rem, 2vw + 1.5rem, 3rem)` for floating corner cameo).
- **Reduced motion:** wobble and blinks disabled; brief `100–150ms linear` transitions remain so state changes don't snap teleport-style.
- **Never recreate the eyes in SVG/CSS elsewhere** — always use the component. Static contexts use `MascotEyesStatic`.

### 4.5 Header (`SiteHeader`)

- **Sticky, full-width strip:** Paper White background, `2px` ink border on the sides, a **heavier `4px` bottom border** (like a double-ruled notebook header line), and a hard shadow `0 4px 0 rgba(0,0,0,var(--shadow-opacity))` — offset, not blurred.
- **Wordmark:** display font, black italic, in the Wordmark Blue exception color. Hover: `opacity 75%` + `scale 1.03`.
- **Nav links:** body font, `0.875rem`, bold uppercase, Mid Graphite, 2px underline; hover tilts `-1deg`, scales `1.05`, and darkens toward Ink.
- **Icon buttons (theme, language, GitHub, menu):** plain, transparent, `150ms` transitions; hover `-rotate-3` + `scale-110`; active `scale-95`. Icons are Lucide, `2px` stroke — matching the ink-line weight.

### 4.6 Footer (`SiteFooter`)

Mirror of the header: Paper White surface, `4px` top rule (no shadow), row layout with the copyright in bold `0.75–1rem` and two micro-links (`font-mono`, `0.75rem`, uppercase, widest tracking). **Hover = italic.** That's the whole interaction — a paper tilt, not a color change.

### 4.7 Inputs & Forms

No form-heavy patterns exist yet; the gate/session UI is action-driven. If inputs are introduced, follow: `2px` ink border, squared corners, Notebook Paper face, and an Ink Black focus ring/underline — no glows, no colored focus states.

---

## 5. Layout Principles

### The Notebook Canvas
- The whole app sits on a **notebook grid**: `1px` Grid Gray lines every `40px` in both axes (`background-size: 40px 40px`), via the `.notebook-bg` utility on `<body>` or full-screen overlays (demo session).
- The grid is **texture, not structure** — content cards sit on top and hide it beneath their paper faces, exactly like taped notes on a ruled page.

### Content Widths
- **Hero:** `max-w-195` (`780px`), centered, `px-6`.
- **Two-column grids** (manual/privacy): `w-[min(1000px, calc(100%-3rem))]`, centered.
- **Demo session:** `max-w-180` (`720px`) with a `2fr / 1fr` split (stage vs. live log).
- **Coverage blocks:** container `max-w-350` (`1400px`), each block `flex-1 min-w-70 max-w-140` — wraps naturally from 2 columns to 1.

### Fluid Spacing (signature technique)
Spacing is mostly **`clamp()`-based and viewport-height-aware**, so the demo UI always fits the screen without scroll:
- Card padding: `clamp(1.25rem, 4vh, 2rem)`
- Section bottom padding: `clamp(2.5rem, 5rem, 7rem)`
- Hero paddings: `clamp(1rem, 4vh, 3rem)` / `clamp(1rem, 3vh, 2rem)`
- Inter-card gaps: `clamp(1rem, 3vh, 2.5rem)` (wide) or a flat `1.5rem` (dense grids)
- Title margins: `clamp(0.75rem, 2vh, 1.5rem)`

Use `rem`-scale Tailwind defaults for **structured gaps inside components** (e.g. `gap-3`, `gap-6`) and `clamp()` for **page rhythm and section scale**.

### Grids
- Mobile-first: `grid-cols-1` → `md:grid-cols-2` for content pairs; `md:grid-cols-3` for metrics rows; `md:grid-cols-2` inside cards for split lists.
- `gap-6` (`1.5rem`) is the default grid gutter at `md+`.

### Motion & Entry Choreography
- **Entry system:** compose `animate-in` + `fade-in` + `slide-in-from-bottom-4`; duration `500ms`, easing `cubic-bezier(0.22, 1, 0.36, 1)` (the system's signature "organic deceleration" curve), `fill-mode: both`.
- **Stagger:** siblings enter with `style="animation-delay: 100ms / 200ms / 300ms"` (step ≈ `100ms`, up to `~500ms`).
- **Chart draw-in:** SVG line paths draw themselves via `stroke-dashoffset` over `900ms`, then fills/markers fade in `500ms` after a `700ms` delay.
- **The curve is law:** `cubic-bezier(0.22, 1, 0.36, 1)` for anything organic (entrances, card straightening, pupil tracking). Fast UI feedback (buttons, toggles) uses `120–150ms ease-in-out`.
- **Reduced motion:** decorative animation (wobble, blinks, entries) is removed; functional transitions are shortened to `~100–150ms linear` to avoid teleporting states.

### Accessibility Baseline
- All interactive elements are real `<a>`/`<button>` with visible focus behavior, `aria-label`s on icon-only controls, `aria-hidden` on decorative doodles (shadows, stickers, glints).
- Text contrast is designed in: Ink/Paper and Chalk/Charcoal pairs are near-maximal contrast; Mid Graphite is reserved for large or secondary text.
- Touch targets ≥ `40px` (icon buttons are `40×40`).

---

## 6. Generation Guide (for new screens)

When generating or extending screens, translate intent into the system's visual language — never into generic SaaS patterns.

### Vocabulary to use
- **Shadows:** "hard offset shadow block, no blur" (not "soft drop shadow", never `shadow-lg`).
- **Borders:** "2px hand-inked border" (not "hairline border").
- **Corners:** "sharp squared corners" for controls; "hand-torn organic radius" only for note-variant cards.
- **Rotation:** "placed at a slight hand-drawn tilt that straightens on hover" (`±1–2deg`).
- **Depth:** "paper cutout laid over the notebook page" — flat, never blurred.
- **Motion:** "gentle organic deceleration" (`cubic-bezier(0.22,1,0.36,1)`); "snappy 120ms press" for buttons.

### Color references
- Ink & borders & shadows: **Ink Black (`#000000`)**
- Page & faces: **Notebook Paper (`#F9F9F9`)**; cards: **Paper White (`#FFFFFF`)**
- Secondary text: **Mid Graphite (`#5F5E5E`)**; muted: **Faded Graphite (`#8A8A8A`)**
- Dashed lines: **Dashed Pencil (`#C4C7C7`)**
- Dark mode: **Chalk White (`#FFFFFF`)** ink on **Charcoal Sheet (`#1A1C1C`)**, white shadow blocks (`#E2E2E2`)
- The only allowed color: **Wordmark Blue (`#3B82F6`)** on the header brand — nowhere else.

### Component recipes
- "A card with a 2px black border, hard black offset shadow block, sharp corners, padding that flexes with viewport height, a handwritten title with a 2px underline, and a `-1deg` tilt that straightens on hover."
- "A primary CTA following the doodle button: flat paper face, 2px ink border, solid black shadow block 6px behind, hover tilts -2deg, press collapses the shadow to 2px."
- "A status card communicating success/failure with a check or cross doodle sticker rotated -12deg in the corner — no color."
- "A dark mode section: chalk-white text and borders on charcoal, with the offset shadows also flipping to white."

### Hard rules
1. **Monochrome only.** No gradients, no colored states, no new hues (Wordmark Blue is taken).
2. **Blur is banned.** Every shadow is a solid offset block.
3. **Reuse before creating:** `Button`, `DoodleCard`, `ContractCard`, `MascotEyes`, `SiteShell` cover nearly every need (see `AGENTS.md` §9).
4. **Both themes must work.** Any new surface must be defined through the CSS custom properties, never hardcoded hex values in components.
5. **Keep the mascot alive.** If a screen is primary (landing, demo, results), it should carry a `MascotEyes` presence with an appropriate expression.
