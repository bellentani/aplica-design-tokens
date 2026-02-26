# Aplica Tokens Theme Engine - Token Semantics

## Color System

### Brand Color Hierarchy

The color structure follows an ordinal hierarchy:

```
brand.branding.first    → Primary brand color
brand.branding.second   → Secondary color
brand.branding.third    → Tertiary color
brand.branding.fourth   → Quaternary color (optional; extend schema/config when using)
```

### Intensity Levels

Each brand color has 7 intensity levels:

| Level | Description | Usage |
|-------|-------------|-------|
| `lowest` | Lightest possible | Subtle backgrounds |
| `lower` | Very light | Hover states |
| `low` | Light | Soft borders |
| `default` | Brand default | Main elements |
| `high` | Dark | Text on light |
| `higher` | Very dark | Emphasis |
| `highest` | Darkest possible | Maximum contrast |

### Color Properties

Each level has 3 properties:

```
background  → Background color
txtOn       → Text color on the background
border      → Border color
```

---

## Feedback Colors

System feedback colors with default/secondary structure:

### Structure

| Feedback | Default | Secondary | Usage |
|----------|---------|-----------|-------|
| `info` | Light blue | Saturated blue | Information, tips, help |
| `success` | Light green | Saturated green | Confirmation, success |
| `warning` | Light amber | Saturated orange | Warnings, attention |
| `danger` | Light red | Saturated red | Errors, danger |

### Usage Example

```css
/* Subtle info background */
.info-banner {
  background: var(--semantic-color-interface-feedback-info_default-background);
}

/* Strong info background */
.info-badge {
  background: var(--semantic-color-interface-feedback-info_secondary-background);
}
```

---

## Product Colors

Product/business semantic colors:

### Structure

| Product | Default | Secondary | Usage |
|---------|---------|-----------|-------|
| `promo` | Promotional color | Saturated version | Promotions, offers, discounts |
| `cashback` | Gold/yellow | Saturated version | Cashback, rewards |
| `premium` | Purple/elegant | Saturated version | Premium, VIP, exclusive |

### Usage Example

```css
/* Promo tag */
.promo-tag {
  background: var(--semantic-color-product-promo_default-background);
  color: var(--semantic-color-product-promo_default-txtOn);
}

/* Cashback badge */
.cashback-badge {
  background: var(--semantic-color-product-cashback_secondary-background);
}
```

---

## Ambient Colors

### Contrast

Interface base colors:

```
ambient.contrast.base.positive    → Light base
ambient.contrast.base.negative    → Dark base
ambient.contrast.deep.positive    → Absolute white (#fff)
ambient.contrast.deep.negative    → Absolute black (#000)
```

### Neutral

Neutrals derived from primary color (7 levels):

```
ambient.neutral.lowest   → Lightest
ambient.neutral.lower
ambient.neutral.low
ambient.neutral.mid      → Medium
ambient.neutral.high
ambient.neutral.higher
ambient.neutral.highest  → Darkest
```

### Grayscale

Standard grayscale (7 levels):

```
ambient.grayscale.lowest   → White/off-white
ambient.grayscale.lower
ambient.grayscale.low
ambient.grayscale.mid      → Medium gray
ambient.grayscale.high
ambient.grayscale.higher
ambient.grayscale.highest  → Black/near-black
```

---

## Interface Function

Functional interface colors:

### States

| State | Description |
|-------|-------------|
| `normal` | Default state |
| `action` | Action/CTA state |
| `active` | Active/hover state |

### Example

```css
.button-primary {
  /* Normal state */
  background: var(--semantic-color-interface-function-primary-normal-surface);
  color: var(--semantic-color-interface-function-primary-normal-txtOn);
}

.button-primary:hover {
  /* Active state */
  background: var(--semantic-color-interface-function-primary-active-surface);
}
```

---

## Text Colors

Simplified text colors:

| Token | Usage |
|-------|-------|
| `text.title` | Titles, headings |
| `text.body` | Body text |
| `text.highlight` | Highlighted text |
| `text.muted` | Secondary text |
| `text.label` | Labels, captions |

---

## Opacity System

Transparency system:

| Token | Value | Usage |
|-------|-------|-------|
| `transparent` | 0% | Completely transparent |
| `superTransparent` | 10% | Nearly invisible |
| `semiTranslucid` | 20% | Subtle |
| `translucid` | 50% | Middle ground |
| `superTranslucid` | 80% | Nearly opaque |
| `semiOpaque` | 90% | Slightly transparent |
| `opaque` | 100% | Completely opaque |

---

## CSS Variable Naming

### Semantic Pattern

```
--semantic-color-{category}-{subcategory}-{property}
```

### Foundation Pattern

```
--foundation-{group}-{variant}
```

### Examples

```css
/* Semantic */
--semantic-color-brand-branding-first-default-background
--semantic-color-interface-feedback-success_default-background
--semantic-color-product-promo_secondary-txtOn

/* Foundation */
--foundation-bg-primary
--foundation-txt-secondary
--foundation-border-brand-first
```

---

*Use these semantics to ensure visual consistency throughout your application.*
