# Design Brief: KLAY HILLS Convention Centre Management

**Purpose** | Professional convention centre booking and pending fee management. Rapid payment status scanning. Red highlights for urgent balances.
**Tone** | Refined minimalist. Clean utility. Business-focused clarity over decoration.
**Aesthetic** | Premium business management. Accessibility-first. Tabular data hierarchy.

## Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary | Navy `0.32 0.08 263` | Navy `0.68 0.12 263` | Header, CTAs, active states |
| Secondary | Slate `0.5 0.04 263` | Slate `0.55 0.08 263` | Secondary actions, badges |
| Accent | Teal `0.55 0.12 185` | Teal `0.68 0.14 185` | Focus states, highlights |
| Destructive | Red `0.55 0.24 25` | Red `0.65 0.28 25` | **Pending balance, alerts** |
| Neutral | Greys `0.98–0.2` | Greys `0.12–0.95` | Backgrounds, text, borders |

## Typography

| Layer | Font | Usage |
|-------|------|-------|
| Display | Figtree 700 | Page titles, headers |
| Body | General Sans 400/500 | Body copy, labels, form fields |
| Mono | Geist Mono 400 | Numbers, amounts, data fields, tables |

## Elevation & Depth

| Zone | Style | Purpose |
|------|-------|---------|
| Header | Solid border-bottom, `border-border` | Navigation context |
| Cards | `bg-card`, `border border-border` | Grouped data, sections |
| Tables | Row separator `border-b border-border/50` | Row differentiation |
| Buttons | Flat primary, outlined secondary | Clear hierarchy |
| Forms | `bg-input`, `border border-input` | Distinct input fields |

## Structural Zones

| Area | Treatment |
|------|-----------|
| Header/Nav | `bg-card border-b` with primary text |
| Sidebar | `bg-sidebar`, `border-r border-sidebar-border` (if used) |
| Main Content | `bg-background`, padding-consistent |
| Data Cards | `bg-card border` with row separators |
| Footer | `bg-muted/20 border-t` |

## Component Patterns

- **Buttons**: Primary (navy bg, white text), Secondary (border, navy text), Danger (red bg)
- **Inputs**: Light grey backgrounds, navy borders on focus, mono font for amounts
- **Tables**: Mono font for numbers, row striping via `bg-muted/20` every other row
- **Badges**: Inline, small. Red for pending/overdue, teal for active
- **Alerts**: Red destructive color for pending balance callouts

## Spacing & Rhythm

- Base: 4px grid
- Section gaps: 24px, 32px for major sections
- Card padding: 16px, 20px for detailed cards
- Density: Tight (business focus)

## Motion

- Transitions: 0.3s ease smooth (hover states, focus)
- No decorative animations
- State changes only

## Signature Detail

**Red "Balance Receivable" amounts** appear throughout as calculated red text. This is the core visual alert system — anywhere pending balance appears, it is red, bold, and prominent. No other color carries this signal.

## Constraints

- Light mode primary
- No gradients, no blur effects
- Max two font families (Figtree + General Sans)
- Mono font reserved for numerical data only
- Mobile-first responsive (`sm:`, `md:`, `lg:`)
- Min contrast AA+ verified
- No arbitrary colors; all OKLCH tokens
