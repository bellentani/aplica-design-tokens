# Aplica Tokens Theme Engine - Complete Technical Architecture

## 📋 Overview

**Aplica Tokens Theme Engine** is a multidimensional Design Token architecture that enables scalable creation and management of visual themes through hierarchical transformations. This is an **open-source project** created to bring improvements and learnings to design systems.

The architecture supports multiple brands, visual modes (light/dark), and surface contexts, generating final themes programmatically through the **Dynamic Theme Generator**.

### Available Brands
- `theme_engine` - Base/neutral theme (template)
- `aplica_joy` - Pink/blue theme
- `aplica_tangerine` - Orange theme
- `aplica_grinch` - Green theme

---

## 📐 Architecture Schema (Single Source of Truth)

> ⚠️ **CRITICAL**: The Architecture Schema is the **starting point** for configuring themes and ensuring consistency across all architecture layers.

### Schema File
```
dynamic-themes/schemas/architecture-schema.mjs
```

### What the Schema Controls

| Export | Purpose |
|--------|---------|
| `FEEDBACK_SCHEMA` | Defines feedback types (`info`, `success`, `warning`, `danger`) and variants (`default`, `secondary`) |
| `PRODUCT_SCHEMA` | Defines product types (`promo`, `cashback`, `premium`) and variants (`default`, `secondary`) |
| `INTENSITY_LEVELS` | Simplified levels for architecture (`lowest`, `default`, `highest`) |
| `BEHAVIOR_LEVELS` | Full behavior states for theme layer (`lowest`, `action`, `normal`, `active`, `highest`) |
| `COLOR_PROPERTIES` | Architecture layer properties (`background`, `txtOn`, `border`) |
| `THEME_COLOR_PROPERTIES` | Theme layer properties (`surface`, `txtOn`, `border`) |
| `SURFACE_TYPES` | Surface contexts (`positive`, `negative`) |

### Schema Workflow

```
1. Edit Schema (architecture-schema.mjs)
           ↓
2. Sync Architecture (npm run sync:architecture)
           ↓
3. Update Theme Configs (*.config.mjs)
           ↓
4. Generate Themes (npm run themes:generate)
           ↓
5. Build (npm run build)
```

### Why the Schema Matters

1. **All architecture files depend on it** - `mode`, `surface`, `semantic`, `foundation` are generated from schema
2. **Theme configs must align** - Mappings in `*.config.mjs` must match schema structure
3. **Consistency guaranteed** - All themes share identical token structure
4. **No manual edits** - Architecture files should never be edited manually

### Schema Commands

```bash
npm run sync:architecture         # Update architecture files
npm run sync:architecture:test    # Verify without changes
npm run sync:architecture:schema  # Display current schema
```

---

## 🏗️ 5-Layer Architecture

### **Single Source of Truth (SSoT)**

```
Brand → Mode → Surface → Semantic → Foundation
```

```
aplica-tokens-theme-engine/
├── data/                           # Design tokens (Tokens Studio)
│   ├── brand/                      # Brand-specific tokens
│   │   ├── theme_engine/           # Base theme
│   │   │   ├── _brand.json         # Semantic color mapping
│   │   │   ├── _grayscale.json     # Grayscale scale
│   │   │   ├── _primitive_theme.json # Decomposed color palettes
│   │   │   ├── _typography.json    # Typography tokens
│   │   │   ├── _borders.json       # Border tokens
│   │   │   ├── _ui.json            # UI component tokens
│   │   │   └── $meta.json          # Theme metadata
│   │   ├── aplica_joy/
│   │   ├── aplica_tangerine/
│   │   └── aplica_grinch/
│   ├── mode/                       # Visual modes
│   │   ├── light.json              # Light mode
│   │   └── dark.json               # Dark mode
│   ├── surface/                    # Surface contexts
│   │   ├── positive.json           # Default surface
│   │   └── negative.json           # Inverted surface
│   ├── semantic/                   # Semantic tokens
│   │   └── default.json
│   ├── foundation/                 # Foundation (aliases)
│   │   └── engine/
│   │       └── default.json
│   ├── dimension/                  # Dimensions (spacing, sizing)
│   │   └── normal.json
│   └── components/                 # Optional; build skips if missing
├── dynamic-themes/                 # Dynamic generation system
│   ├── configs/                    # Theme configurations
│   ├── scripts/                    # Generation scripts
│   ├── schemas/                    # Architecture schema
│   └── templates/                  # Generation templates
├── transformers/                   # Build system
└── dist/                          # Generated files
```

---

## 🔄 Transformation Flow

### **Main Color Flow**
```
Brand Theme → Mode → Surface → Semantic → Foundation
```

### **Dimensional Flow** 
```
Dimensions → Semantic → Foundation
```

### **Component Flow**
```
Semantic → Components (direct)
```

---

## 📊 Detailed Layers

### **1. BRAND - Visual Identity**

#### Generated Files per Theme

| File | Description |
|------|-------------|
| `_primitive_theme.json` | Color palettes (19 levels each) + neutrals (15 levels) + behavior |
| `_grayscale.json` | Fixed grayscale scale |
| `_brand.json` | Semantic color mapping |
| `_typography.json` | Font families, sizes, and weights |
| `_borders.json` | Border radius tokens |
| `_ui.json` | UI component tokens |

> ⚠️ **IMPORTANT:** All files contain a `_meta` header indicating they are auto-generated. Do not edit manually - modify the configuration file instead.

#### Color Structure (`_brand.json`)

**`theme.color.{mode}.brand.branding`:**
- **first, second, third** (fourth or more optional when configured) - Ordinal hierarchy of brand colors
- Each color has intensity variations:
  - `lowest` → `lower` → `low` → `default` → `high` → `higher` → `highest`
- Properties: `background`, `txtOn`, `border`

**`theme.color.{mode}.brand.ambient`:**
- **contrast.base** - Colors close to black/white
  - `positive` - light colors
  - `negative` - dark colors
- **contrast.deep** - Absolute black (#000) and white (#fff)
- **neutral** - Neutral colors derived from primary color (7 levels)
- **grayscale** - Standard grayscale (7 levels)

**`theme.color.{mode}.interface`:**
- **function** - Functional UI colors
  - `primary`, `secondary`, `link`, `disabled`
  - States: `normal`, `action`, `active`
- **feedback** - System feedback colors
  - `info_default`, `info_secondary`
  - `success_default`, `success_secondary`
  - `warning_default`, `warning_secondary`
  - `danger_default`, `danger_secondary`

**`theme.color.{mode}.product`:**
- **promo** - Promotions (`promo_default`, `promo_secondary`)
- **cashback** - Cashback (`cashback_default`, `cashback_secondary`)
- **premium** - Premium (`premium_default`, `premium_secondary`)

**`theme.color.{mode}.text`:**
- `title`, `body`, `highlight`, `muted`, `label`
- Feedback colors: `info`, `success`, `warning`, `danger`

### **2. MODE - Visual Contexts**

Defines how colors behave in different visual contexts.

| File | Description |
|------|-------------|
| `mode/light.json` | Light mode |
| `mode/dark.json` | Dark mode |

**Structure Consistency:**
- Both modes use the same structure (`positive`/`negative`)
- Enables compatibility between modes
- References work consistently

**Interface States (MODE exclusive):**
- `negative`, `action`, `normal`, `active`, `positive`
- Applied to: `surface`, `txtOn`, `border`

### **3. SURFACE - Photographic Logic**

Applies visual hierarchy concept inspired by photography.

| File | Description |
|------|-------------|
| `surface/positive.json` | Default surface (like positive film) |
| `surface/negative.json` | Inverted surface (like negative film) |

**Inversion Logic:**
```
POSITIVE → NEGATIVE:
- lowest → highest
- lower → higher
- low → high
- default → default (maintains)
- high → low
- higher → lower
- highest → lowest
```

### **4. SEMANTIC - Final Consolidation**

Consolidates all transformations into a unified theme.

**Semantic Structure:**
- `semantic.color` - Complete color system
- `semantic.typography` - Typography system
- `semantic.dimension` - Spacing and sizing
- `semantic.border` - Border radius and width
- `semantic.opacity` - Transparency system

### **5. FOUNDATION - Simplified Interface**

Creates simplified interface for direct component usage.

**Foundation Structure:**
- `foundation.bg` - Backgrounds
- `foundation.border` - Borders
- `foundation.txt` - Text
- `foundation.typography` - Typography
- `foundation.spacing` - Spacing
- `foundation.sizing` - Sizing

---

## 🎨 Color System

### Color Decomposition

Each base color is automatically decomposed into:

| Component | Levels | Description |
|-----------|--------|-------------|
| `palette.surface` | 10-190 (19 levels) | Surface colors |
| `palette.txtOn` | 10-190 | Text colors on each surface |
| `palette.border` | 10-190 | Border colors |
| `neutrals.surface` | 5-140 (15 levels) | Neutrals derived from color |
| `neutrals.txtOn` | 5-140 | Text on neutrals |
| `neutrals.border` | 5-140 | Borders for neutrals |
| `behavior` | 5 states | Semantic references |

### Behavior States

| State | Level | Usage |
|-------|-------|-------|
| `lightest` | 10 | Subtle backgrounds |
| `active` | 50 | Active/hover state |
| `normal` | 100 | Default state |
| `action` | 120 | CTAs |
| `darkest` | 170 | Maximum contrast |

### Feedback Colors

New structure with default/secondary variants:

| Feedback | Default | Secondary |
|----------|---------|-----------|
| info | Light blue | Saturated blue |
| success | Light green | Saturated green |
| warning | Light amber | Saturated orange |
| danger | Light red | Saturated red |

### Product Colors

Simplified structure:

| Product | Default | Secondary |
|---------|---------|-----------|
| promo | Promotional color | Saturated version |
| cashback | Gold/yellow | Saturated version |
| premium | Purple/elegant | Saturated version |

---

## 🔧 Dynamic Theme Generator

### Generating Themes

```bash
# Generate all themes
npm run themes:generate

# Generate specific theme
node dynamic-themes/scripts/generate-all-themes.mjs --config=aplica_joy
```

### Configuration Structure

```javascript
// dynamic-themes/configs/my-brand.config.mjs
export default {
  name: 'my_brand',
  
  colors: {
    brand_primary: '#0066CC',
    brand_secondary: '#2E2E2E',
    
    // Feedback colors (default = lighter, secondary = saturated)
    feedback_info: '#047AF1',
    feedback_info_dark: '#0356B0',
    feedback_success: '#00A838',
    feedback_success_dark: '#007A28',
    feedback_warning: '#F28E01',
    feedback_warning_dark: '#C47100',
    feedback_error: '#E82727',
    feedback_error_dark: '#B81C1C',
    
    // Product colors
    promo_red: '#e91935',
    promo_red_dark: '#c41228',
    cashback_gold: '#ffcc00',
    cashback_gold_dark: '#d4a800',
    premium_purple: '#6e3ce4',
    premium_purple_dark: '#5424c9'
  },
  
  mapping: {
    brand: {
      first: 'brand_primary',
      second: 'brand_secondary'
    },
    interface: {
      function: {
        primary: 'action_primary',
        secondary: 'action_secondary'
      },
      feedback: {
        info_default: 'feedback_info',
        info_secondary: 'feedback_info_dark',
        success_default: 'feedback_success',
        success_secondary: 'feedback_success_dark',
        warning_default: 'feedback_warning',
        warning_secondary: 'feedback_warning_dark',
        danger_default: 'feedback_error',
        danger_secondary: 'feedback_error_dark'
      }
    },
    product: {
      promo_default: 'promo_red',
      promo_secondary: 'promo_red_dark',
      cashback_default: 'cashback_gold',
      cashback_secondary: 'cashback_gold_dark',
      premium_default: 'premium_purple',
      premium_secondary: 'premium_purple_dark'
    }
  },
  
  options: {
    txtOnStrategy: 'high-contrast',
    darkModeChroma: 0.85,
    includePrimitives: true
  },
  
  typography: {
    fontFamilies: {
      main: 'Roboto Flex',
      content: 'Roboto Flex',
      display: 'Roboto Flex',
      code: 'Source Code Pro'
    }
  }
};
```

---

## 🔄 Sync Architecture Script

Synchronizes architecture files with the defined schema.

### Commands

```bash
# Update architecture files
npm run sync:architecture

# Test mode (doesn't modify files)
npm run sync:architecture:test

# View current schema
npm run sync:architecture:schema
```

### Updated Files

- `data/mode/light.json` and `data/mode/dark.json`
- `data/surface/positive.json` and `data/surface/negative.json`
- `data/semantic/default.json`
- `data/foundation/engine/default.json`

### Schema

Defined in `dynamic-themes/schemas/architecture-schema.mjs`:

| Category | Items | Variants |
|----------|-------|----------|
| Feedback | `info`, `success`, `warning`, `danger` | `default`, `secondary` |
| Product | `promo`, `cashback`, `premium` | `default`, `secondary` |

---

## 🚀 Build System

### Technologies

- **Style Dictionary v5** - Transformation engine
- **@tokens-studio/sd-transforms** - Tokens Studio integration
- **Node.js** - Runtime

### Main Commands

```bash
# Complete build
npm run build

# Build by layer
npm run build:semantic
npm run build:foundation
npm run build:components

# Theme generation
npm run themes:generate
```

### Output Platforms

- **JSON** - Structured tokens (`.json`)
- **JavaScript** - CommonJS (`.cjs`)
- **ES Modules** - Modern JavaScript (`.mjs`)
- **TypeScript** - Declarations (`.d.ts`, `.d.mts`)
- **CSS** - CSS Variables (`.css`)

### Generated Files

```
dist/
├── json/                              # JSON tokens
│   ├── theme_engine-light-positive.json
│   ├── theme_engine-dark-positive.json
│   ├── aplica_joy-light-positive.json
│   └── foundation/foundation.json
├── esm/                               # ES Modules
│   └── theme_engine-light-positive.mjs
├── js/                                # CommonJS
│   └── theme_engine-light-positive.cjs
└── css/                               # CSS Variables
    └── theme_engine-light-positive.css
```

---

## 📈 Scalability

### Automatic Combinations

```
6 brands × 2 modes × 2 surfaces = 24 semantic themes
+ 6 foundation themes
= 30 total themes
```

### Adding a New Brand

1. Create `dynamic-themes/configs/new-brand.config.mjs`
2. Run `npm run themes:generate`
3. Run `npm run build`
4. System automatically generates 4 themes (light/dark × positive/negative)

---

## 🎯 Benefits

### Exponential Scalability
- Adding 1 brand generates 4+ themes automatically
- New modes/surfaces multiply possibilities

### Guaranteed Consistency
- Standardized mathematical transformations
- Visual hierarchy preserved
- Accessibility automatically validated

### Simplified Maintenance
- Changes in 1 file propagate to all themes
- Responsibilities isolated by layer
- Centralized schema for token structure

---

*This architecture transforms the complexity of multiple themes into an automated, scalable, and reliable process.* 
