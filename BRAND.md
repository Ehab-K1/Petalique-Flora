# Petalique Flora — Brand System

> Direction: **Romantic Blush & Gold** — soft, editorial, premium-feminine florals.
> Generated with the `ui-ux-pro-max` design skill and tuned for a floral boutique.
> Tokens below are a starting point; verify final color contrast (WCAG AA) before shipping.

---

## Brand Essence

Delicate, premium, hand-crafted florals. The name reads *petal + flora* — soft, romantic,
botanical, gift-worthy. Every touchpoint should feel **quietly luxurious, made with care.**

- **Personality:** romantic, gracious, refined, natural
- **Feeling to evoke:** receiving a beautifully wrapped bouquet
- **Not:** loud, neon, cartoonish, mass-produced

---

## 1. Color Palette

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `primary` | Petal Rose | `#C25B7C` | Brand color; large fills, UI accents (white text, large only) |
| `primaryDeep` | Rose Noir | `#A23759` | Buttons, links, small text on light (passes AA) |
| `secondary` | Sage Stem | `#7E9B79` | Botanical/greenery accents, fills (pair with dark text) |
| `accent` | Champagne Gold | `#BFA14A` | Dividers, highlights, premium touches (decorative / large) |
| `background` | Warm White | `#FFFBF9` | Page background |
| `surface` | White | `#FFFFFF` | Cards, sheets |
| `tint` | Blush | `#FCEEF2` | Section backgrounds, quote/testimonial cards |
| `foreground` | Aubergine Ink | `#3D2531` | Body text on light (AAA) |
| `muted` | Mauve Grey | `#8B6F79` | Secondary text, captions |
| `border` | Soft Blush | `#F1D9E0` | Dividers, card borders |
| `borderAccent` | Gold Hairline | `#E4CE97` | Premium hairline dividers |
| `success` | Garden Green | `#4F7150` | Success states (white text) |
| `error` | Rosewood | `#B23A48` | Error states (white text) |

### Contrast & usage rules
- **Body text:** Aubergine Ink on Warm White (high contrast, AAA).
- **Buttons / links / small text:** use **Rose Noir `#A23759`** (Petal Rose alone is ~4.1:1 —
  acceptable for large text and fills, just under AA for small text).
- **Gold and Sage are decorative / large-heading / fill colors.** Do not set small body text
  in gold or sage on a white background.
- Never convey meaning by color alone — pair status colors with an icon or label.

---

## 2. Typography

| Role | Font | Notes |
|------|------|-------|
| Display / signature | **Great Vibes** (script) | Logo wordmark, signature lines. Use sparingly — never body text. |
| Headings | **Playfair Display** (serif) | Elegant, high-contrast. Weight 600 for headings. |
| Body / UI | **Inter** (sans) | Clean and legible for paragraphs, labels, forms. |

```css
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
```

**Type scale (px):** `12 · 14 · 16 (body) · 20 · 24 · 32 · 48`
**Body line-height:** 1.6 · **Labels:** Inter 12, uppercase, letter-spacing 0.08em

---

## 3. Theme / Visual Style — "Soft Editorial Botanical"

- **Mood:** airy, romantic, premium. Generous whitespace; real flower photography in natural light.
- **Shape & depth:** soft corner radius **12–16px**; soft, low-opacity shadows (no harsh drop
  shadows); thin **gold hairline** dividers.
- **Icons:** thin-line botanical set (e.g. Lucide), one consistent stroke width. **No emoji as icons.**
- **Motion:** gentle 200–300ms ease; subtle fade / petal transitions. Respect `prefers-reduced-motion`.
- **Imagery:** photographed flowers in blush/sage tones, soft focus, lots of negative space.

### Avoid (anti-patterns)
- Neon or vibrant block colors; playful cartoon palettes
- Heavy glassmorphism or busy gradients
- Stock clip-art or emoji icons
- Pure-black (`#000`) text — use Aubergine Ink instead

---

## 4. Brand Voice

Warm, gracious, lightly poetic but always clear. Speak like a thoughtful florist, not a sales page.

- **Sample line:** *"Wrapped with love, just for you."*
- **Do:** gentle, personal, sincere ("we", "your", "handpicked")
- **Don't:** pushy CTAs, ALL-CAPS urgency, jargon

---

## 5. Applications

### Instagram grid
Rotate three tile types for a cohesive feed:
1. **Hero bloom** — single arrangement, natural light
2. **Blush quote / testimonial card** (see template below)
3. **Product / bouquet** with short caption

### Testimonial template (repeatable)
Blush `#FCEEF2` background → quote in Playfair Display → client name in Great Vibes →
thin gold (`#E4CE97`) underline. Consistent every time.

### Story highlight covers
Gold line-icons centered on blush circles.

### Packaging
Kraft or ivory wrap + blush tissue + **gold seal sticker** with the wordmark.

### Order / inquiry form (Google Form)
Blush background, Playfair section headers, **Rose Noir** submit button, gold divider lines.
Share the form link to get exact field-by-field styling.

---

## 6. Design Tokens (drop-in)

### CSS custom properties
```css
:root {
  --color-primary: #C25B7C;
  --color-primary-deep: #A23759;
  --color-secondary: #7E9B79;
  --color-accent: #BFA14A;
  --color-background: #FFFBF9;
  --color-surface: #FFFFFF;
  --color-tint: #FCEEF2;
  --color-foreground: #3D2531;
  --color-muted: #8B6F79;
  --color-border: #F1D9E0;
  --color-border-accent: #E4CE97;
  --color-success: #4F7150;
  --color-error: #B23A48;

  --font-script: 'Great Vibes', cursive;
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;

  --radius: 14px;
}
```

### JS / TS tokens (React Native friendly)
```ts
export const colors = {
  primary: '#C25B7C',
  primaryDeep: '#A23759',
  secondary: '#7E9B79',
  accent: '#BFA14A',
  background: '#FFFBF9',
  surface: '#FFFFFF',
  tint: '#FCEEF2',
  foreground: '#3D2531',
  muted: '#8B6F79',
  border: '#F1D9E0',
  borderAccent: '#E4CE97',
  success: '#4F7150',
  error: '#B23A48',
} as const;

export const fonts = {
  script: 'Great Vibes',
  heading: 'Playfair Display',
  body: 'Inter',
} as const;

export const radius = 14;
```
