# Aplica Tokens Theme Engine - Core Architecture

## Transformation Flow

The system uses a 5-layer architecture with hierarchical transformations:

```
Brand Theme → Mode → Surface → Semantic → Foundation
```

### Responsibilities by Layer

| Layer | Responsibility | Files |
|-------|---------------|-------|
| **Brand** | Brand visual identity | `data/brand/{brand}/*.json` |
| **Mode** | Visual context (light/dark) | `data/mode/*.json` |
| **Surface** | Surface context | `data/surface/*.json` |
| **Semantic** | Consolidation with purpose | `data/semantic/default.json` |
| **Foundation** | Simplified interface | `data/foundation/engine/default.json` |

---

## 1. Brand Layer

Defines brand-specific visual aspects through the **Dynamic Theme Generator**.

### Generated Files

| File | Description |
|------|-------------|
| `_primitive_theme.json` | Decomposed palettes (19 levels) + neutrals (15 levels) |
| `_grayscale.json` | Fixed grayscale scale |
| `_brand.json` | Semantic color mapping |
| `_typography.json` | Families, sizes, and weights |
| `_borders.json` | Border radius |
| `_ui.json` | UI component tokens |

### Color Structure

```
theme.color.{mode}
├── brand
│   ├── branding (first, second, third; fourth or more optional)
│   │   └── {lowest..highest} → background, txtOn, border
│   └── ambient
│       ├── contrast.base (positive, negative)
│       ├── contrast.deep (positive, negative)
│       ├── neutral (lowest..highest)
│       └── grayscale (lowest..highest)
├── interface
│   ├── function (primary, secondary, link, disabled)
│   │   └── {normal, action, active} → surface, txtOn, border
│   └── feedback
│       ├── info_default, info_secondary
│       ├── success_default, success_secondary
│       ├── warning_default, warning_secondary
│       └── danger_default, danger_secondary
├── product
│   ├── promo_default, promo_secondary
│   ├── cashback_default, cashback_secondary
│   └── premium_default, premium_secondary
└── text
    └── title, body, highlight, muted, label
```

---

## 2. Mode Layer

Defines how colors behave in different visual contexts.

### Files

- `data/mode/light.json` - Light mode
- `data/mode/dark.json` - Dark mode

### Characteristics

- **Consistent Structure:** Both modes use the same structure (`positive`/`negative`)
- **References:** Points to `theme.{mode}.*` from brand
- **Interface States:** `normal`, `action`, `active`

### Transformation Example

```json
// Brand (_brand.json)
"theme.light.brand.branding.first.default.background": "#FFCC00"

// Mode (light.json)
"mode.brand.branding.first.default.background": {
  "$value": "{theme.light.brand.branding.first.default.background}"
}
```

---

## 3. Surface Layer

Applies inversion logic inspired by photography.

### Files

- `data/surface/positive.json` - Default surface
- `data/surface/negative.json` - Inverted surface

### Inversion Logic

```
POSITIVE → NEGATIVE:
lowest  → highest
lower   → higher
low     → high
default → default (maintains)
high    → low
higher  → lower
highest → lowest
```

### Contrast Inversion

```
Positive Surface:
  base.positive → uses mode...positive
  base.negative → uses mode...negative

Negative Surface:
  base.positive → uses mode...negative (inverts)
  base.negative → uses mode...positive (inverts)
```

---

## 4. Semantic Layer

Consolidates all transformations into interface-purpose structure.

### File

- `data/semantic/default.json`

### Structure

```
semantic
├── color
│   ├── brand (branding, ambient)
│   ├── interface (function, feedback)
│   ├── product (promo, cashback, premium)
│   └── text
├── typography
│   ├── fontFamilies (main, content, display, code)
│   ├── fontWeights
│   ├── fontSizes (micro..exa)
│   └── lineHeights (tight, close, regular, wild)
├── dimension
│   ├── spacing (zero..peta)
│   └── sizing (zero..peta)
├── border
│   ├── radii (straight..circular)
│   └── width
└── opacity
```

---

## 5. Foundation Layer

Creates simplified interface for direct component usage.

### File

- `data/foundation/engine/default.json`

### Simplified Structure

```
foundation
├── bg (primary, secondary, disabled, brand.*, feedback.*)
├── border (primary, secondary, tertiary, disabled, brand.*, feedback.*)
├── txt (primary, secondary, muted, disabled, brand.*, feedback.*)
├── typography (references to semantic)
├── spacing (references to semantic)
├── sizing (references to semantic)
└── shadows (depth levels)
```

---

## Dimensional Flow

Separate from color flow:

```
Dimensions → Semantic → Foundation
```

### File

- `data/dimension/normal.json`

### Dimension Scale

```
zero: 0      pico: 1      nano: 2      micro: 4
extraSmall: 8    small: 12    medium: 16 (base)
large: 20    extraLarge: 24    mega: 28
giga: 44     tera: 72     peta: 116
```

---

## Feedback and Product Colors

### Feedback (System)

| Category | Default | Secondary | Usage |
|----------|---------|-----------|-------|
| info | Light blue | Saturated blue | Information, tips |
| success | Light green | Saturated green | Confirmations, success |
| warning | Light amber | Saturated orange | Warnings, attention |
| danger | Light red | Saturated red | Errors, danger |

### Product (Business)

| Category | Default | Secondary | Usage |
|----------|---------|-----------|-------|
| promo | Promotional color | Saturated version | Promotions, offers |
| cashback | Gold/yellow | Saturated version | Cashback, rewards |
| premium | Purple/elegant | Saturated version | Premium, exclusive |

---

## Architecture Synchronization

The `sync-architecture.mjs` maintains structural consistency:

```bash
# Update files
npm run sync:architecture

# Test mode
npm run sync:architecture:test

# View schema
npm run sync:architecture:schema
```

### Centralized Schema

Defined in `dynamic-themes/schemas/architecture-schema.mjs`:

```javascript
export const FEEDBACK_SCHEMA = {
  items: ['info', 'success', 'warning', 'danger'],
  variants: ['default', 'secondary']
};

export const PRODUCT_SCHEMA = {
  items: ['promo', 'cashback', 'premium'],
  variants: ['default', 'secondary']
};
```

---

*This architecture ensures that changes in any layer correctly propagate to upper layers.*
