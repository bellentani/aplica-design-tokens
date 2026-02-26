# Aplica Tokens Theme Engine - Technical Reference

## NPM Commands

### Build

```bash
# Complete build (semantic + foundation + components)
npm run build

# Full theme pipeline (ensure:data, themes, dimension, sync, foundations, build)
npm run build:themes

# Build by layer
npm run build:semantic
npm run build:foundation
npm run build:components
```

### Theme Generation

```bash
# Generate all themes
npm run themes:generate

# Generate specific theme (use config file stem, e.g. aplica-joy for aplica-joy.config.mjs)
node dynamic-themes/scripts/generate-all-themes.mjs --config=aplica-joy
```

### Architecture and Data

```bash
# Ensure data structure (e.g. after fresh clone)
npm run ensure:data

# Generate dimension scale
npm run dimension:generate

# Sync architecture files
npm run sync:architecture

# Test mode (doesn't modify files)
npm run sync:architecture:test

# View current schema
npm run sync:architecture:schema
```

### Foundations

```bash
# Generate all foundations
npm run foundations:generate

# Validate a foundation against semantic tokens
npm run foundations:validate data/foundation/engine/default.json
```

---

## File Structure

### data/ Directory

```
data/
├── brand/                    # Tokens per brand
│   ├── theme_engine/
│   ├── aplica_joy/
│   ├── aplica_tangerine/
│   └── aplica_grinch/
├── mode/                     # Visual modes
│   ├── light.json
│   └── dark.json
├── surface/                  # Surfaces
│   ├── positive.json
│   └── negative.json
├── semantic/                 # Semantic tokens
│   └── default.json
├── foundation/               # Foundation
│   └── engine/
│       └── default.json
├── dimension/                # Dimensions
│   └── normal.json
└── components/               # Optional; build skips if missing
```

### dynamic-themes/ Directory

```
dynamic-themes/
├── configs/                  # Theme configurations
│   ├── theme-engine.config.mjs
│   ├── aplica-joy.config.mjs
│   ├── aplica-tangerine.config.mjs
│   └── aplica-grinch.config.mjs
├── scripts/                  # Generation scripts
│   ├── generate-all-themes.mjs
│   ├── theme-generator.mjs
│   ├── color-decomposer.mjs
│   ├── typography-generator.mjs
│   └── sync-architecture.mjs
├── schemas/                  # Architecture schema
│   └── architecture-schema.mjs
└── templates/                # Templates
```

---

## Token Naming Convention

### Semantic Pattern

```
semantic.{category}.{subcategory}.{property}
```

Examples:
```
semantic.color.brand.branding.first.default.background
semantic.color.interface.function.primary.normal.surface
semantic.typography.fontSizes.medium
semantic.dimension.spacing.large
```

### Foundation Pattern

```
foundation.{group}.{variant}
```

Examples:
```
foundation.bg.primary
foundation.txt.secondary
foundation.border.brand.first.default
```

---

## Color Schema

### Feedback Colors

```javascript
{
  items: ['info', 'success', 'warning', 'danger'],
  variants: ['default', 'secondary']
}
```

### Product Colors

```javascript
{
  items: ['promo', 'cashback', 'premium'],
  variants: ['default', 'secondary']
}
```

### Intensity Levels

```javascript
['lowest', 'lower', 'low', 'default', 'high', 'higher', 'highest']
```

### Color Properties

```javascript
['background', 'txtOn', 'border']
```

---

## Color Decomposition

### Palette Levels (19)

```
10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190
```

### Neutral Levels (15)

```
5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140
```

### Behavior States

| State | Level | Usage |
|-------|-------|-------|
| `lightest` | 10 | Subtle backgrounds |
| `active` | 50 | Hover/active state |
| `normal` | 100 | Default state |
| `action` | 120 | CTAs |
| `darkest` | 170 | Maximum contrast |

---

## Dimension Scale

```javascript
{
  zero: 0,
  pico: 1,
  nano: 2,
  micro: 4,
  extraSmall: 8,
  small: 12,
  medium: 16,  // base
  large: 20,
  extraLarge: 24,
  mega: 28,
  giga: 44,
  tera: 72,
  peta: 116
}
```

---

## Border Radius

```javascript
{
  straight: 0,
  micro: 2,
  extraSmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  extraLarge: 20,
  mega: 24,
  circular: 9999
}
```

---

## Typography

### Families

```javascript
{
  main: 'Roboto Flex',      // Main UI
  content: 'Roboto Flex',   // Body text
  display: 'Roboto Flex',   // Headlines/display
  code: 'Source Code Pro'   // Code
}
```

### Sizes

```javascript
{
  micro: 10,
  extraSmall: 12,
  small: 14,
  medium: 16,  // base
  large: 20,
  extraLarge: 24,
  mega: 28,
  giga: 36,
  tera: 40,
  peta: 48,
  exa: 60
}
```

### Line Heights

```javascript
{
  tight: 100%,    // Compact
  close: 120%,    // Close
  regular: 140%,  // Regular
  wild: 180%      // Spaced
}
```

---

## Output Platforms

| Format | Extension | Usage |
|--------|-----------|-------|
| JSON | `.json` | Structured tokens |
| JavaScript | `.cjs` | CommonJS |
| ES Modules | `.mjs` | Modern JavaScript |
| TypeScript | `.d.ts` | Type declarations |
| CSS | `.css` | CSS Variables |

---

## Configuration Files

### themes.config.mjs

Defines brands and build configurations.

### base-config.mjs

Style Dictionary base configurations.

### architecture-schema.mjs

Centralized schema for token structure.

---

**See also:** [#10 Theme Engine - Configuring Themes and Foundations](#10-theme-engine---configuring-themes-and-foundations) for step-by-step theme and foundation configuration.

*Use this reference for quick lookup of system values and patterns.*
