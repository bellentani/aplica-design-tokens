# Aplica Theme Engine - Core Architecture

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Single Source of Truth                        │
│                         Git Repository (JSON)                        │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ BRAND THEME Layer                                                   │
│ ├── brand/theme/tangerine/                                          │
│ │   ├── _brand.json        (colors and visual elements)             │
│ │   ├── _grayscale.json    (gray scale)                             │
│ │   ├── _theme-typography.json (families and weights)               │
│ │   ├── _theme-borders.json (border radius)                         │
│ │   ├── _theme-depth.json  (shadow system)                          │
│ │   ├── _components.json   (global tokens)                          │
│ │   └── _tangerine-generated.json (auto-generated)                  │
│ ├── brand/theme/joy/                                                │
│ └── brand/theme/grinch/                                             │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ DIMENSIONS Layer                                                    │
│ └── dimensions/dimension.json      (spacing, sizing, typography)    │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ MODE Layer                                                          │
│ ├── mode/light.json         (light context)                        │
│ └── mode/dark.json          (dark context)                         │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ SURFACE Layer                                                       │
│ ├── surface/positive.json   (normal hierarchy)                     │
│ └── surface/negative.json   (inverted hierarchy)                   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ SEMANTIC Layer                                                      │
│ └── semantic/default.json   (consolidation with purpose)            │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
┌─────────────────────────────┐   ┌─────────────────────────────┐
│ FOUNDATION Layer            │   │ FIGMA GENERATORS            │
│ ├── foundation/default.json │   │ └── figma-generators/       │
│ └── foundation/styles/      │   │     └── _generator-dimension.json
│     ├── typography-styles.json │
│     └── depth-styles.json   │
└─────────────────────────────┘   └─────────────────────────────┘
```

## Layer Responsibilities

### 1. **BRAND THEME - Visual Identity**
**Responsibility:** Defines unique visual characteristics of each brand

**Main structures:**
- **Colors:** `theme.light/dark` with brand, ambient, interface, product, text
- **Typography:** Families (main, content, display, code) and weights
- **Borders:** Radius system (straight → circular)
- **Components:** Customizable global tokens per brand

**Current Brands:**
- **joy:** Brand that uses Tokens Studio with native mathematics and calculations
- **tangerine:** Brand that uses our token generation API
- **grinch:** Brand that uses our token generation API

**Key concepts:**
- `ambient.contrast.base`: Colors close to black/white
- `ambient.contrast.deep`: Absolute black (#000) and white (#fff)
- Intensities: `lowest` → `default` → `highest`

### 2. **DIMENSIONS - Dimensional System**
**Responsibility:** Defines dimensional values (spacing, sizing, typography)

**Main structures:**
- **`_theme_dimensions`:** Size scale (zero → peta)
- **`_theme_typography`:** Font sizes, line heights, letter spacings

**Key concepts:**
- Base: Adapted Fibonacci Progression
- Unit: 1ud = 16px, 1un = 4px
- Scale: 13 size levels

### 3. **MODE - Visual Contexts**
**Responsibility:** Adapts tokens for light/dark mode

**Transformations:**
- References specific tokens from `theme.light` or `theme.dark`
- Adds interface states: `negative`, `action`, `normal`, `active`, `positive`
- Defines `main/secondary` structure for feedback

**Key concept:** States only exist here because brand colors are static

### 4. **SURFACE - Visual Hierarchy**
**Responsibility:** Applies positive/negative photographic logic

**Main transformations:**
```
POSITIVE → NEGATIVE:
- lowest → highest (inverts intensities)
- light → dark (inverts contrasts)
- 7-level scale: inverts symmetrically around mid
```

**Additions:**
- Opacity system with hexadecimal values
- Feedback reorganization with main/secondary

### 5. **SEMANTIC - Final Consolidation**
**Responsibility:** Unifies everything with interface purpose

**Complete structure:**
```
semantic: {
  color: { brand, interface, text, product },
  opacity: { grayscale, light, raw },
  typography: { families, weights, sizes, heights },
  spacing: { zero → peta },
  sizing: { zero → peta },
  borderRadius: { straight → circular },
  shadows: { depth: level1-4 }
}
```

**Simplifications:**
- Contrast: always takes `.light` (base/deep)
- Text: unifies positive/negative according to surface

### 6. **FOUNDATION - Simplified Interface**
**Responsibility:** Creates simplified interface for direct use

**Structure:**
- **`bg`:** Backgrounds (primary, secondary, brand, feedback)
- **`border`:** Borders (primary, secondary, brand, feedback)
- **`text`:** Text colors (primary, secondary, brand, feedback)
- **`typography`:** Direct references to semantic
- **`spacing`:** Direct references to semantic
- **`sizing`:** Direct references to semantic
- **`borderRadius`:** Direct references to semantic
- **`shadows`:** Direct references to semantic

**Styles:**
- **`typography-styles.json`:** Pre-defined combinations
- **`depth-styles.json`:** Shadow combinations

### 7. **FIGMA GENERATORS - Automation**
**Responsibility:** Generates specific tokens for Figma

**Functionality:**
- Transforms tokens into Tokens Studio compatible format
- Automates creation of collections and modes in Figma

## Example: Token Crossing Layers

Let's follow tangerine brand's primary color:

### 1. **Brand Theme Layer**
```json
"theme.light.brand.branding.first.default.background": "#FF6B00"
```

### 2. **Mode Layer (light)**
```json
"mode.brand.branding.first.default.background": 
  "{theme.light.brand.branding.first.default.background}"
```

### 3. **Surface Layer (positive)**
```json
"surface.color.brand.branding.first.default.background":
  "{mode.brand.branding.first.default.background}"
```

### 4. **Semantic Layer**
```json
"semantic.color.brand.branding.first.default.background":
  "{surface.color.brand.branding.first.default.background}"
```

### 5. **Foundation Layer**
```json
"foundation.bg.primary": "{semantic.color.brand.branding.first.default.background}"
// Final result: #FF6B00
```

## Theme Multiplication

### Generation Formula
```
Total Themes = Brands × Modes × Surfaces × Densities
```

### Current Example
- **3 brands** (tangerine, joy, grinch)
- **2 modes** (light, dark)
- **2 surfaces** (positive, negative)
- **1 density** (normal)
- **= 12 generated themes**

### Resulting Nomenclature
- `aplica-tangerine-light-positive`
- `aplica-tangerine-light-negative`
- `aplica-tangerine-dark-positive`
- `aplica-tangerine-dark-negative`
- `aplica-joy-light-positive`
- `aplica-joy-light-negative`
- `aplica-joy-dark-positive`
- `aplica-joy-dark-negative`
- `aplica-grinch-light-positive`
- `aplica-grinch-light-negative`
- `aplica-grinch-dark-positive`
- `aplica-grinch-dark-negative`

## Structural Files (_underscore)

### Characteristics:
- Don't belong to main chain
- Facilitate organization in Tokens Studio
- Are referenced but not transformed

### Examples:
- `_primitive-theme-default.json`: Generated by accessibility API
- `_color-palette.json`: Color factory
- `_theme-dimensions.json`: Base dimensional system
- `_theme-typography.json`: Base typographic system
- `_theme-borders.json`: Base border system
- `_theme-depth.json`: Base shadow system
- `_components.json`: Global component tokens
- `_generator-dimension.json`: Figma generator

## Extension Points

### 1. **New Brand**
- Create `brand/theme/new-brand/` with base files
- Automatically generates 4 new themes

### 2. **New Mode**
- Add file in `mode/`
- Multiplies themes by 1.5x

### 3. **New Surface**
- Add file in `surface/`
- Multiplies themes by 1.5x

### 4. **New Density**
- Add in `dimensions/`
- Multiplies all themes

## Metadata and Configuration

### **`$metadata.json`:**
- Defines token set loading order
- Controls precedence and conflict resolution
- Hierarchical dependency structure

### **`$themes.json`:**
- Theme configurations in Tokens Studio
- References for Figma Collections and Modes
- Token mapping to Figma variables

---

*This core architecture provides the solid foundation for all Aplica Theme Engine transformations and extensions.* 