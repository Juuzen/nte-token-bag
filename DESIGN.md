---
name: NtE Token Bag
description: Real-time token bag simulator for the Not the End TTRPG
colors:
  void-black: "#050510"
  glass-surface: "#070a1c"
  arc-blue: "#00d4ff"
  control-indigo: "#7c3aed"
  outcome-positive: "#00ff88"
  outcome-negative: "#ff4466"
  outcome-random: "#ff9a00"
  frost-white: "#dde6f0"
  muted-static: "#7a8ba0"
typography:
  display:
    fontFamily: "'Orbitron', 'Courier New', monospace"
    fontSize: "clamp(2rem, 6vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "0.12em"
  title:
    fontFamily: "'Orbitron', 'Courier New', monospace"
    fontSize: "1.1rem"
    fontWeight: 700
    letterSpacing: "0.1em"
  body:
    fontFamily: "'Exo 2', system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Exo 2', system-ui, -apple-system, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    letterSpacing: "0.14em"
  caption:
    fontFamily: "'Orbitron', 'Courier New', monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    letterSpacing: "0.1em"
rounded:
  xs: "4px"
  sm: "6px"
  md: "10px"
  lg: "12px"
spacing:
  xs: "0.3rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.arc-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1.25rem"
  button-primary-hover:
    backgroundColor: "#44e0ff"
    textColor: "#ffffff"
  button-danger:
    backgroundColor: "{colors.outcome-negative}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1.25rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.arc-blue}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1.25rem"
  button-secondary:
    backgroundColor: "#261060"
    textColor: "#c4a8ff"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1.25rem"
  card-glass:
    backgroundColor: "{colors.glass-surface}"
    rounded: "{rounded.md}"
    padding: "1.25rem"
  input-field:
    backgroundColor: "#000a1e"
    textColor: "{colors.frost-white}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.75rem"
  token-counter-positive:
    backgroundColor: "#001a0d"
    textColor: "{colors.outcome-positive}"
    rounded: "{rounded.md}"
    padding: "0.875rem 1rem"
  token-counter-negative:
    backgroundColor: "#1a0005"
    textColor: "{colors.outcome-negative}"
    rounded: "{rounded.md}"
    padding: "0.875rem 1rem"
  token-counter-random:
    backgroundColor: "#1a0d00"
    textColor: "{colors.outcome-random}"
    rounded: "{rounded.md}"
    padding: "0.875rem 1rem"
---

# Design System: NtE Token Bag

## 1. Overview

**Creative North Star: "The Signal in the Dark"**

The NtE Token Bag design system is built for a single, recurring moment: a player draws from the bag. Everything else — the layout, the typography, the color choices — serves that moment without competing with it. The interface runs dark not as an aesthetic preference but as a necessity: players sit around a table in dim ambient light, eyes on each other and the GM, glancing at the screen only when they must. Anything that demands attention when it shouldn't demands too much.

Color in this system is not decoration. It is assignment. Arc Blue marks interactive surfaces — the things you touch. Control Indigo marks Narrator authority — the things only the GM can touch. Green, red, and amber mark outcomes — the only things that matter after the draw fires. Nothing glows unless it is trying to tell you something specific.

This system explicitly refuses two failure modes. The first: the generic SaaS tool — white cards, metric grids, enterprise chrome, dashboards that look borrowed from a project management suite. The second: the fantasy RPG aesthetic — parchment, warm amber light, medieval serifs, the candlelit warmth of a dungeon-crawl game. *Not the End* is a near-future dystopian world. The interface should feel like equipment from that world: cold, functional, precise, and quietly alive.

**Key Characteristics:**
- Dark-canonical: the dark theme is the primary; light is an available option, not the default
- Role-indexed color: every hue has exactly one semantic role; reassignment is a violation
- Glow-not-shadow: depth comes from neon emission, not simulated overhead light
- Glass surfaces: panels float as translucent layers over the generative hex background
- Orbitron as atmosphere: the display font is low-frequency punctuation, never workhorse copy

## 2. Colors: The Cold Signal Palette

A near-black field with a cold blue shift, broken by precisely-placed neon emissions. Each accent color has exactly one semantic role and must not be repurposed.

### Primary
- **Arc Blue** (`#00d4ff`): Electric cyan. The interactive signal — interactive controls, panel titles, focus rings, connection status, and the player role badge. The most-used non-black color on any screen. In production CSS it also drives the primary button gradient (linear-gradient 135deg, `#0088cc` → `#00d4ff`). The frontmatter entry is the endpoint color for tooling reference.

### Secondary
- **Control Indigo** (`#7c3aed`): Reserved exclusively for Narrator-scoped UI. The GM's color — the narrator role badge, secondary button style, and the random-probability slider. Never applied to interactive elements a player (non-narrator) can touch.

### Tertiary
- **Positive Pulse** (`#00ff88`): Positive token outcomes only. Bag counters, draw log entries, probability display positive side. Never repurposed for general success/confirmation states outside the outcome context.
- **Threat Red** (`#ff4466`): Negative token outcomes. Same usage pattern as Positive Pulse, opposite valence. Also drives the danger-state button (bag reset).
- **Fate Amber** (`#ff9a00`): Random token outcomes — the draw whose resolution is unknown until the system resolves it. The color of uncertainty, not of error.

### Neutral
- **Void Black** (`#050510`): Page background. Near-black with a barely perceptible cold blue shift — not pure black, not flat.
- **Glass Veil** (`#070a1c`, production: `rgba(8,12,35,0.65)`): Panel surface, composited over Void Black with `backdrop-filter: blur(14px)`. The hex entry `#070a1c` is the composited approximation for tooling; the production CSS uses the rgba form to preserve glass transparency.
- **Frost White** (`#dde6f0`): All body text. Cool off-white with a faint blue shift; never pure `#ffffff`.
- **Muted Static** (`#7a8ba0`): Secondary text, section labels, timestamps, disabled states, and any informational copy that should not command attention.

### Named Rules
**The One Role Rule.** Each color has exactly one semantic role. Arc Blue belongs to universal interaction. Control Indigo belongs to the Narrator. The Outcome Spectrum belongs to draws. Using Arc Blue for a non-interactive label, or Control Indigo for a player button, is a system violation — not a style choice.

**The Outcome Spectrum Rule.** Green, red, and amber are reserved for drawn token outcomes. Prohibited as navigation colors, general success/error states, branding accents, or any surface where they would appear without a draw in context.

## 3. Typography

**Display Font:** Orbitron (Google Fonts; fallback: `'Courier New', monospace`)
**Body Font:** Exo 2 (Google Fonts; fallback: `system-ui, -apple-system, sans-serif`)

**Character:** Orbitron is used as atmospheric punctuation — wide-tracked, bold, geometric, unmistakably sci-fi. Exo 2 is the workhorse: humanist geometric sans with strong weight variation, readable at small sizes and clearly distinct from Orbitron's display role. The pairing works because they occupy different registers entirely; Orbitron reads as the system speaking, Exo 2 reads as information.

### Hierarchy
- **Display** (Orbitron 900, `clamp(2rem, 6vw, 3.5rem)`, lh 1.1, ls 0.12em): Join-screen hero title. One instance per screen, maximum.
- **Title** (Orbitron 700, 1.1rem, ls 0.1em): Room header, role badges, panel section headings. Colored Arc Blue with a text-shadow glow in dark mode.
- **Label** (Exo 2 700, 0.78rem, ls 0.14em, uppercase): Form field labels, subsection headings in panels. Uses Arc Blue when introducing an interactive group; Muted Static when purely informational.
- **Body** (Exo 2 400, 1rem, lh 1.5): Draw log entries, descriptions, form hints. Frost White.
- **Caption** (Orbitron 400, 0.72rem, ls 0.1em): Timestamps in the draw log, room codes, credential display values. Feels like a system readout.

### Named Rules
**The Orbitron Ceiling Rule.** Orbitron appears only in titles, role badges, room codes, timestamps, and token counts. Prohibited in button labels, paragraph text, form field labels, and any string longer than approximately six words. When Orbitron is running a sentence, it has been misused.

## 4. Elevation

This system uses glow-based depth, not shadow-based depth. There are no drop shadows anywhere in the interface. The metaphor is emission, not illumination from above — light comes from the elements themselves, not from a simulated overhead source.

Depth is conveyed through three mechanisms:
1. **Backdrop blur** (`blur(14px)` + semi-transparent surface) — panels float visually in front of the Three.js hex background
2. **Neon halos** (two-layer `box-shadow`: tight inner glow + wider outer bloom) — interactive and outcome elements emit at rest; intensity increases on hover or focus
3. **Border opacity** — resting elements have very dim borders (`rgba(0,212,255,0.18)`); focused or active elements show full-opacity Arc Blue borders

### Shadow Vocabulary
- **Arc Glow** (`0 0 12px rgba(0,212,255,0.4), 0 0 30px rgba(0,212,255,0.15)`): Arc Blue interactive elements at rest. Applied to primary buttons, the player role badge, focused inputs. Hover state intensifies to `0 0 20px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.25)`.
- **Control Glow** (`0 0 12px rgba(124,58,237,0.4), 0 0 30px rgba(124,58,237,0.15)`): Control Indigo elements — the narrator role badge, the secondary button variant.
- **Outcome Glow** (`0 0 12px rgba(color,0.1)`): Subtle ambient glow on token counters. Dim — readable at a glance, not demanding attention.
- **Glass Surface** (`backdrop-filter: blur(14px)` + `border: 1px solid rgba(0,212,255,0.18)`): All panel containers. Not a shadow; the blur and border together create the sense of a floating pane.

### Named Rules
**The Glow-Not-Shadow Rule.** Drop shadows (`box-shadow` with positive Y offset, dark color) are prohibited. They simulate light from above; this system has no overhead light source. Depth is expressed only through neon emission (symmetric glows) and glass transparency (backdrop-filter). If an element needs to feel elevated, it should glow, not cast a shadow.

## 5. Components

### Buttons
The button family drives all primary actions. Shape is consistent (6px radius); distinction comes from color and glow, not shape variation.

- **Shape:** Gently rounded (6px)
- **Primary:** Arc Blue gradient (`linear-gradient(135deg, #0088cc, #00d4ff)`), white text, Arc Glow at rest. Hover intensifies gradient to `#00aaee → #44e0ff` and expands glow. The frontmatter `button-primary.backgroundColor` references Arc Blue as the endpoint value; the actual production CSS uses the gradient.
- **Danger:** Threat Red gradient (`linear-gradient(135deg, #991133, #ff4466)`), white text, matching red glow. Used exclusively for destructive narrator actions (bag reset).
- **Ghost / Outlined:** Transparent background, Arc Blue 1px border, Arc Blue text. Hover fills with `rgba(0,212,255,0.1)`. Used for secondary actions where a ghost button is semantically appropriate.
- **Secondary:** Control Indigo tint (`rgba(124,58,237,0.2)`) background, Control Indigo 1px border, `#c4a8ff` text. Used within the Narrator panel for paired operations.
- **Padding:** 0.5rem vertical, 1.25rem horizontal. Button labels use Exo 2 600, 0.04em letter-spacing.

### Cards / Glass Panels
All content containers in the room view use the glass panel treatment.

- **Corner Style:** Rounded (10px for panels and the bag view; 12px for PrimeReact card overrides)
- **Background:** Glass Veil (`rgba(8,12,35,0.65)`) with `backdrop-filter: blur(14px)` — mandatory for panels over the hex background
- **Border:** `1px solid rgba(0,212,255,0.18)` — dim Arc Blue border unifies all panels
- **Internal Padding:** `1–1.25rem`
- **Panel Title:** Orbitron 700, 0.78rem, uppercase, 0.14em tracking, colored Muted Static

### Inputs / Fields
- **Style:** Dark fill (`rgba(0,10,30,0.6)`) — noticeably darker than the panel surface behind it; dim Arc Blue border at rest
- **Focus:** Full Arc Blue border + `box-shadow: 0 0 0 2px rgba(0,212,255,0.2)` glow ring. Not a standard focus outline — a contained emission ring.
- **Radius:** 6px — matches button radius for consistent form-element language
- **Text:** Frost White; Muted Static for placeholder

### Token Counters (Signature Component)
The bag view's central data display. Three variants — positive, negative, random — each with its own outcome color.

- **Structure:** Vertical stack — Orbitron 700 2.2rem count on top, Exo 2 700 0.7rem uppercase label below
- **Container:** 10px radius, 2px solid border with outcome color at 0.4 opacity, outcome-tinted background at 0.06 opacity, matching `0 0 12px rgba(outcome,0.1)` glow
- **Hover:** `translateY(-2px)` with `transition: transform 0.2s` — the only layout-space transform in the system; it signals interactivity without introducing layout shift risk
- **Min-width:** 90px; wraps naturally in a flex-wrap container

### Role Badges
Binary role indicator — narrator or player — displayed in the room header.

- **Shape:** 4px radius, `0.2rem 0.6rem` padding
- **Narrator:** Control Indigo background tint, 1px Control Indigo border, `#c4a8ff` text, Control Glow
- **Player:** Arc Blue background tint, 1px Arc Blue border, Arc Blue text, Arc Glow
- **Typography:** Orbitron 700, 0.65rem, uppercase, 0.12em tracking

### Draw Log Entries
The session history list at the bottom of the room view.

- **Background:** `rgba(0,10,30,0.4)` — darker than the panel surface; entries recede into the background
- **Border:** `1px solid rgba(0,212,255,0.07)` at rest; `rgba(0,212,255,0.2)` on hover
- **Outcome coloring:** The drawn kind (positive/negative/random) and the resolved outcome are colored with their respective Outcome Spectrum colors and bold weight
- **Timestamp:** Orbitron 400, 0.75rem, Muted Static — pushed right with `margin-left: auto`

## 6. Do's and Don'ts

### Do:
- **Do** use Arc Blue (`#00d4ff`) for every interactive element — buttons, links, inputs, focus rings — that a player can touch.
- **Do** use Control Indigo (`#7c3aed`) exclusively for Narrator-scoped UI: the narrator badge, narrator-only controls, and the random-probability slider.
- **Do** color draw outcomes with the Outcome Spectrum and nothing else: green for positive, red for negative, amber for random. These colors are outcome-indexed, not status-indexed.
- **Do** apply `backdrop-filter: blur(14px)` to all panel containers. The glass treatment is structural, not decorative — it distinguishes floating interactive surfaces from the background.
- **Do** restrict Orbitron to titles, role badges, room codes, timestamps, and token counts. Six words or fewer per instance.
- **Do** use two-layer neon box-shadows (tight glow + outer bloom) as the elevation system. Match the hue to the element's semantic color role.
- **Do** test and design in dark mode first. The dark theme is canonical; light mode is an option.

### Don't:
- **Don't** apply generic SaaS or dashboard conventions: white or light-gray cards, metric grids, sidebar navigation, enterprise-chrome button treatments, or any layout pattern borrowed from a productivity tool.
- **Don't** use fantasy TTRPG aesthetics: parchment backgrounds, warm amber tints, medieval or calligraphic serif fonts, candlelight warmth, or anything that reads as a dungeon-crawl game rather than a near-future sci-fi system.
- **Don't** use drop shadows (`box-shadow` with positive Y offset and a dark color) anywhere in the interface. Only symmetric emission glows.
- **Don't** run Orbitron through body copy, button labels, paragraph text, or any continuous reading surface.
- **Don't** repurpose the Outcome Spectrum colors (green/red/amber) for non-outcome UI states like navigation, success toasts, or generic error messages. Their meaning comes from their exclusivity.
- **Don't** use gradient text (`background-clip: text` combined with a gradient `background`). Emphasis through weight or Arc Blue solid color.
- **Don't** apply Control Indigo to any UI element a player (non-narrator role) would interact with. Its restriction to narrator surfaces is what makes it legible as a role marker.
- **Don't** use the glass-surface token as a solid color. It only makes visual sense as `rgba(8,12,35,0.65)` with `backdrop-filter: blur(14px)` — transparency to the hex background behind it is load-bearing.
