# Style lock — Power Pole

Established: 2026-10-05. Source: existing site tokens in `app/globals.css` + Manrope in `app/layout.tsx`

## Palette
- Background: #f2f0ea (role: page paper)
- Surface: #f2f0ea (role: sections on paper; graphite sections use #17191b)
- Primary / graphite: #17191b (role: dark sections, text, nav scrolled)
- Accent: #d96a2b (role: CTAs, wordmark span, active markers — sparingly)
- Text primary: #17191b
- Text muted: #a5a7a6
- Line: rgba(23, 25, 27, 0.16)
- Button label on accent: #ffffff
- Dark mode: not needed for this project — single light marketing site (graphite sections are compositional, not a theme toggle)

## Color contract
- Text-safe: graphite on paper; white on graphite; white on orange
- UI-safe: orange accents/icons on paper or graphite; hairline `--line` decorative only
- Decorative: muted grey brand ticker labels on paper

## Typography
- Display/heading font: Manrope — geometric industrial sans already loaded
- Body font: Manrope
- Tracking: tighten large display (`letter-spacing` negative on big brand names); body near 0; UI chrome uppercase with wide tracking (~0.12–0.14em)

## Shape language
- Corner radius: near-zero / sharp industrial (avoid soft SaaS pills)
- Shadow depth: flat; separation via hairlines and material blur on nav
- Border usage: 1px hairlines (`--line` or white/25 on dark)

## Density & spacing
- Base unit: 4px
- Section padding: clamp(60–140px) vertical, clamp(24–120px) horizontal (existing `.section`)
- Overall density: generous whitespace, editorial industrial
- Section separation: alternating paper / graphite; hairline under brands

## Structure
- Macrostructure: Long-Scroll Narrative
- Narrative arc: hook(hero) → stakes(industries intro) → solution(products + wall) → how(industries visual) → proof(about + brands) → close(final CTA)
- Shared chrome: fixed wordmark nav + RFQ CTA; footer masthead with contact/location
- Build stamp / log: `.tastemaker/log.json`

## Reference intelligence
- Design read: B2B industrial supply marketing for procurement buyers, mode Persuade, lane technical/industrial premium
- Dials: variance 4, motion 6, density 5, art direction 7

## Motion
- Engine: GSAP + ScrollTrigger for scroll reveals; Base UI Drawer for interruptible mobile menu
- Prefer critically damped feel (power2/power3); no bounce on chrome
- Respect `prefers-reduced-motion: reduce`

## Assets
- Photography: `/industrial-hero.png`, `/control-panel.png`, `/product-components.png` (reuse with distinct section roles)
- Icons: Lucide only

## Avoid
- Purple/indigo gradients, glow cards, neon Aceternity defaults
- Generic three equal feature cards + testimonial template
- Stacking Magic UI effects; one accent max (Marquee brands)
- Runtime dark/light toggle
- Invented metrics / fake social proof
