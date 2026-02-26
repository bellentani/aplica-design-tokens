# Dynamic Themes System - AI Context

> Last updated: 2026-01-26 (v2.13.3)

## What it is

Dynamic theme generation system that creates design tokens from JavaScript configuration files.

## Main Flow

```
*.config.mjs → generate-all-themes.mjs → data/brand/{theme}/
```

## Architecture Schema (CRITICAL)

> ⚠️ **The schema is the SINGLE SOURCE OF TRUTH for token structure.**
> All architecture files (`mode`, `surface`, `semantic`, `foundation`) are generated from this schema.

**File:** `dynamic-themes/schemas/architecture-schema.mjs`

### Why the Schema Matters

1. **Configuration Hub**: Theme configs (`*.config.mjs`) must align with schema definitions
2. **Layer Generation**: All upper layers derive their structure from the schema
3. **Consistency**: Ensures all themes have identical token structure
4. **Automation**: `sync-architecture.mjs` uses schema to generate architecture files

### Schema Contents

| Export | Purpose |
|--------|---------|
| `FEEDBACK_SCHEMA` | Defines feedback types and variants |
| `PRODUCT_SCHEMA` | Defines product types and variants |
| `BRAND_SCHEMA` | Defines brand color levels |
| `INTENSITY_LEVELS` | Simplified levels for architecture (`lowest`, `default`, `highest`) |
| `BEHAVIOR_LEVELS` | Full behavior states for theme layer (`lowest`, `action`, `normal`, `active`, `highest`) |
| `COLOR_PROPERTIES` | Architecture properties (`background`, `txtOn`, `border`) |
| `THEME_COLOR_PROPERTIES` | Theme properties (`surface`, `txtOn`, `border`) |
| `SURFACE_TYPES` | Surface contexts (`positive`, `negative`) |

### Current Schema

| Category | Items | Variants |
|----------|-------|----------|
| Feedback | `info`, `success`, `warning`, `danger` | `default`, `secondary` |
| Product | `promo`, `cashback`, `premium` | `default`, `secondary` |

### Schema Commands

```bash
npm run sync:architecture         # Update architecture files
npm run sync:architecture:test    # Verify without changes
npm run sync:architecture:schema  # Display current schema
```

### Adding New Token Types

1. **Edit schema**: Add items/variants to `FEEDBACK_SCHEMA` or `PRODUCT_SCHEMA`
2. **Sync architecture**: `npm run sync:architecture`
3. **Update theme configs**: Add colors and mappings to `*.config.mjs`
4. **Regenerate themes**: `npm run themes:generate`
5. **Rebuild**: `npm run build`

## Key Files

### Scripts (in `dynamic-themes/scripts/`)

| File | Function |
|------|----------|
| `generate-all-themes.mjs` | Main CLI - processes configs and generates themes |
| `theme-generator.mjs` | Orchestrator - coordinates decomposition and generation |
| `color-decomposer.mjs` | Decomposes colors into palettes (palette, neutrals, behavior) |
| `typography-generator.mjs` | Generates typography tokens |
| `sync-architecture.mjs` | Syncs mode/surface/semantic/foundation with schema |

### Schemas

| Location | File | Function |
|----------|------|----------|
| `dynamic-themes/schemas/` | `architecture-schema.mjs` | **SSOT** for token structure (feedback, product, brand colors) |
| `transformers/schemas/` | `foundation-styles-schema.mjs` | **SSOT** for CSS style structure (typography, elevation) |

**Important**: These are **distinct schemas** with different purposes:
- **Architecture Schema**: Defines token structure used by `sync-architecture.mjs` to generate architecture layer files
- **Foundation Styles Schema**: Defines CSS style structure used by `generate-css-classes.mjs` to generate CSS classes

Both follow the same organizational pattern but serve different contexts.

### Configurations (in `dynamic-themes/configs/`)

Naming pattern: `{name}.config.mjs`

Active themes:
- `theme-engine.config.mjs` - Base/neutral template
- `aplica-joy.config.mjs` - Joy (pink/blue)
- `aplica-grinch.config.mjs` - Grinch (green)
- `aplica-tangerine.config.mjs` - Tangerine (orange)

### Output (in `data/brand/{theme}/`)

Each theme generates:
- `_primitive_theme.json` - Decomposed palettes
- `_grayscale.json` - Grayscale scale
- `_brand.json` - Semantic tokens
- `_typography.json` - Typography
- `_borders.json` - Border radius
- `_ui.json` - UI component tokens (sizing, states, variants)

### Architecture Files (in `data/`)

Synced by `sync-architecture.mjs`:
- `mode/light.json`, `mode/dark.json`
- `surface/positive.json`, `surface/negative.json`
- `semantic/default.json`
- `foundation/engine/default.json`

## Gradients (v2.13.3 – canonical config + semantic composites)

**Structure**: Gradient structure is defined in **`config/themes.config.json`** (`global.gradientConfig`: degrees, steps, defaultComposites). All themes get the same gradient fields. **Per-theme configs** (`dynamic-themes/configs/*.config.mjs`) must **not** define gradients; they only allow raw overrides (`overrides.*`).

**Flow**: Brand layer only passes **configColor** (variables) in `_brand.json`. Gradients are **built in the semantic layer**: `data/semantic/default.json` has `semantic.color.gradient.config` (degrees, steps, colors from themes.config + surface refs) and `semantic.color.gradient.composites` (first, second, third = `linear-gradient({config.degrees.X}deg, {config.colors...} {config.steps.Y}%, ...)` using config variables). Mode has no gradient.configColor; surface refs theme directly for configColor. Composites use refs to `semantic.color.gradient.config.degrees.*` and `config.steps.*`.

**Build order (CRITICAL)**: Gradients appear in the build output only when `data/semantic/default.json` has `semantic.color.gradient`. That section is created by **`sync:architecture`** (which reads `themes.config.json` and brand configColor from `_brand.json`). **Order**: `themes:generate` → **`sync:architecture`** → `build`; or **`npm run build:themes`**.

### Correct order when using gradients (`global.gradients: true`)

1. **`npm run themes:generate`** – Generates/updates `_brand.json` with `theme.color.light.gradient` and `theme.color.dark.gradient`.
2. **`npm run sync:architecture`** – Propagates gradient structure to mode, surface, and **semantic** (so `semantic.color.gradient` exists).
3. **`npm run build`** (or `build:all`) – Build reads semantic and emits gradient variables (e.g. `--semantic-color-gradient-brand-first`, `-second`, `-third`) in CSS/JS.

**Or run the full pipeline in one go:**

```bash
npm run build:themes
```

`build:themes` = `ensure:data` + `themes:generate` + `dimension:generate` + **`sync:architecture`** + `foundations:generate` + `build:all`. That way gradients are always propagated before the build.

### If gradients don't appear in the output

- **Cause**: `data/semantic/default.json` has no `semantic.color.gradient` (sync was not run after enabling gradients).
- **Fix**: Run `npm run sync:architecture` (or `npm run build:themes`), then run `npm run build` again.
- **Build behavior**: When `global.gradients` is `true` and semantic has no gradient, the build logs a **warning** (does not fail) and gradients are not emitted. Fix by running sync (or build:themes) and rebuilding.
- **Full configuration guide**: See **`docs/en/#11 Theme Engine - Gradient Configuration.md`** (EN) or **`docs/pt-br/#11 Theme Engine - Configuração de Gradientes.md`** (PT-BR) for step-by-step setup, pipeline, and checklist.

## Config Structure

```javascript
export default {
  name: 'theme_name',  // IMPORTANT: used as folder name
  
  colors: {
    // alias: '#hexcolor'
  },
  
  mapping: {
    brand: { first, second, third },
    interface: {
      function: { primary, secondary, link },
      feedback: {
        info_default: 'color_name',
        info_secondary: 'color_name_dark',
        success_default: 'color_name',
        success_secondary: 'color_name_dark',
        warning_default: 'color_name',
        warning_secondary: 'color_name_dark',
        danger_default: 'color_name',
        danger_secondary: 'color_name_dark'
      }
    },
    product: {
      promo_default: 'color_name',
      promo_secondary: 'color_name_dark',
      cashback_default: 'color_name',
      cashback_secondary: 'color_name_dark',
      premium_default: 'color_name',
      premium_secondary: 'color_name_dark'
    }
  },

  // Gradients (only when config/themes.config.json global.gradients === true; optional – omit to use default solid gradient)
  gradients: {
    brand: {
      first: { angle: number, stops: [{ position, colorRef }] },
      second: { angle: number, stops: [...] },
      third: { angle: number, stops: [...] }
      // ... other names optional
    }
  },
  
  options: {
    txtOnStrategy: 'high-contrast' | 'brand-tint',
    darkModeChroma: 0.85  // 1.0 = full, 0.5 = muted
  },
  
  overrides: {
    neutrals: { /* per-color neutral overrides */ },
    grayscale: { /* grayscale overrides */ },
    brand: { /* semantic token overrides */ }
  },
  
  typography: {
    fontFamilies: { main, content, display, code },
    // ⚠️ REQUIRED (v2.10.0+): All 5 semantic weights must be declared
    weights: {
      main: {
        light: { normal: 'Light', italic: 'Light Italic', numeric: 300 },
        regular: { normal: 'Regular', italic: 'Regular Italic', numeric: 400 },
        semibold: { normal: 'SemiBold', italic: 'SemiBold Italic', numeric: 600 },
        bold: { normal: 'Bold', italic: 'Bold Italic', numeric: 700 },
        black: { normal: 'Black', italic: 'Black Italic', numeric: 900 }
      },
      // ... same for content, display, code
    }
  },
  
  borders: {
    radii: { small, medium, large }
  }
}
```

## Important Concepts

### Color Decomposition

Each base color → 3 components:
1. **palette** (19 levels: 10-190) - main colors
2. **neutrals** (15 levels: 5-140) - derived neutrals
3. **behavior** (5 states) - semantic references

### Feedback Structure (NEW in v2.3.0)

Each feedback type has two variants:
- **default**: Lighter/softer color (e.g., `#A5E7D9` for info)
- **secondary**: More saturated/intense color (e.g., `#2B9E8C` for info)

This ensures accessibility and brand control.

### Product Structure (NEW in v2.3.0)

Simplified to 3 categories:
- **promo**: Promotions and sales (typically red)
- **cashback**: Rewards and cashback (typically gold)
- **premium**: Premium and exclusive (typically purple)

Each with default and secondary variants.

### Neutrals Override

Two options:
- **Option B**: `baseColor` + `referenceLevel` → automatic decomposition
- **Option C**: `surface`, `txtOn`, `border` → manual values

### Dark Mode Chroma

`darkModeChroma` controls dark mode saturation:
- `1.0` = same as light
- `0.85` = 15% less (recommended)
- `0.7` = 30% less

### Include Primitives

`includePrimitives` controls primitive generation:
- `true` (default) = generates `_primitive_theme.json` (~20k tokens)
- `false` = no primitives, raw HEX in `_brand.json` (~1k tokens)

Use `false` for reduced Figma memory. See `aplica-tangerine.config.mjs`.

### Semantic Token Structure

```
theme.color.{mode}.{category}.{subcategory}.{variant}.{state}.{property}
```

Example:
```
theme.color.light.brand.branding.first.default.background
theme.color.dark.interface.positive.function.primary.surface.normal
theme.color.light.interface.feedback.info_default.lowest.background
theme.color.light.product.positive.promo_secondary.default.txtOn
```

## Commands

```bash
# Generate all themes
npm run themes:generate

# Generate specific theme
node dynamic-themes/scripts/generate-all-themes.mjs --config=aplica_joy

# Sync architecture files
npm run sync:architecture

# Verify architecture (test mode)
npm run sync:architecture:test

# Show current schema
npm run sync:architecture:schema

# Full build with themes
npm run build:themes
```

## Gradients: Flow to semantic and build

- **When `global.gradients` is true** (in `config/themes.config.json`): The gradient structure must exist in every layer up to **semantic** so the build can resolve refs and emit gradients in CSS/JS:
  - `data/brand/*/_brand.json` → `theme.color.{light|dark}.gradient`
  - `data/mode/*.json` → `mode.gradient.{light|dark}`
  - `data/surface/*.json` → `surface.color.gradient`
  - `data/semantic/default.json` → `semantic.color.gradient`
- **When `global.gradients` is false**: Gradients are not created anywhere (themes:generate omits or stubs; sync:architecture removes gradient from mode/surface/semantic).

**After changing `global.gradients` or gradient definitions in theme configs**, run the full pipeline so gradients propagate to semantic and appear in the build:

- **Recommended**: `npm run build:themes` (ensure:data + themes:generate + dimension:generate + **sync:architecture** + foundations:generate + build:all), or
- **Minimum**: `npm run themes:generate` → `npm run sync:architecture` → `npm run build:all`

If you only run `npm run build` (or `build:all`) without running `sync:architecture` after enabling gradients, mode/surface/semantic will not have the `gradient` section and the build will not output gradient tokens.

## Modifying the Schema

When you need to add/remove feedback or product types:

1. Edit `dynamic-themes/schemas/architecture-schema.mjs`
2. Run `npm run sync:architecture` to update architecture files
3. Update theme configs (`*.config.mjs`) with new mappings
4. Run `npm run themes:generate` to regenerate themes
5. Run `npm run build` to compile

## Maintenance Rules

1. **Config file** must end with `.config.mjs`
2. **`name`** in config must be valid as folder name (no spaces)
3. **Colors in mapping** must exist in `colors` object
4. **Typography weights** (v2.10.0+): All 5 semantic weights (light, regular, semibold, bold, black) must be declared for each font family
5. **Weight mapping**: If a font doesn't have an exact semantic weight, manually map to available weight (e.g., Sansita light → Regular, IBM Plex Mono black → Bold)
6. **Weight validation**: System validates all 5 weights are present before generation
7. **Generated files** have `_meta` header - do not edit manually
8. **All code comments must be in English**
9. **All documentation must be in English**
10. **Schema changes** require running `sync:architecture` first
11. **Build consistency** (v2.12.0+): `buildThemes()` uses `generator.generate()` complete method to ensure proper initialization - never call `generatePrimitiveTheme()` directly without initializing caches first
12. **Foundation configuration** (v2.12.0+): All foundation brands use centralized `config/themes.config.json` - deprecated "dtc" brand removed
13. **Foundation Styles Schema** (v2.12.1+): CSS style structure defined in `transformers/schemas/foundation-styles-schema.mjs` - distinct from architecture schema, used by `generate-css-classes.mjs` for CSS class generation
14. **Gradients optional**: Set **`config/themes.config.json` → `global.gradients: false`** to **remove gradients from the whole architecture** (not generated in `/data/`, not in mode/surface/semantic, not in build). When `global.gradients` is true (default), gradients are generated; theme configs can omit `gradients` and get a default solid stub, or define **`gradients.brand.first`**, **`.second`**, **`.third`** (one per brand color; composition and angle vary per theme). After changing gradients, run **build:themes** (or themes:generate + sync:architecture + build:all) so gradient structure propagates to semantic.
15. **Schema Organization** (v2.12.1+): Both schemas follow same folder structure pattern (`/schemas/`) but serve different purposes - architecture schema for tokens, foundation styles schema for CSS

## Dependencies

- Node.js ESM (type: module)
- No external dependencies (uses only Node.js built-in)

## References

- `dynamic-themes/README.md` - Full documentation
- `dynamic-themes/schemas/architecture-schema.mjs` - Schema definition
- `dynamic-themes/reference/COLOR-DECOMPOSITION-SPEC.md` - Color spec
- `dynamic-themes/reference/TYPOGRAPHY-SPEC.md` - Typography spec
- `dynamic-themes/.cursorrules` - AI coding rules

## Planned Features & Improvements

### Priority 1: Code Improvements 🔧

1. **Override System Enhancement** (Completed)
   - ✅ Automatic txtOn recalculation when surface overrides are applied (COMPLETED)
   - ✅ Validation of manual txtOn overrides for WCAG contrast compliance (COMPLETED)
   - ✅ Better error messages when overrides cause accessibility issues (COMPLETED)
   - ✅ Documentation for override best practices (COMPLETED)
   - ✅ Accessibility level selection (AA/AAA) (COMPLETED)

2. **Color Decomposition Method Selection** (Planned)
   - ⏳ Allow choosing color decomposition method per theme
   - ⏳ Support multiple color space options (Linear, LCH, OKLCH)
   - ⏳ Maintain backward compatibility with current linear method
   - ⏳ Provide better color interpolation for different use cases

3. **Foundation Validation Enhancement** (Planned)
   - ✅ Basic validation system exists (COMPLETED)
   - ⏳ Automatic contrast validation for txtOn tokens
   - ⏳ WCAG AA/AAA compliance checking
   - ⏳ Accessibility audit reports
   - ⏳ Validation warnings in generation output

4. **Typography Generation** (v2.10.0 - Completed)
   - ✅ Mandatory 5 semantic weights system (light, regular, semibold, bold, black)
   - ✅ Explicit weight configuration with normal/italic variants and numeric values
   - ✅ Validation ensures all weights are declared
   - ✅ Support for manual weight mapping when fonts don't have exact semantic weights
   - ✅ Generated typography files contain only semantic weights for consistency

5. **Quality & Testing** (Planned)
   - ⏳ Unit tests for token system
   - ⏳ Visual regression tests
   - ⏳ Accessibility audits
   - ⏳ Test coverage > 80%
   - ⏳ Automated accessibility testing in CI

### Priority 2: Platform Support 🚀

5. **Flutter Support** (Next Platform Priority)
   - Dart classes for design tokens
   - Flutter-optimized JSON format
   - Flutter theme data helpers
   - Flutter build pipeline

6. **Stencil Support** (After Flutter)
   - CSS custom properties for web components
   - Stencil build pipeline
   - Component examples

### Priority 3: Component Library 📦

7. **Component Library** (Future)
   - Form controls using design tokens
   - Layout components
   - Display components

### Priority 4: Advanced Features ⚡

8. **Animation System** (Future)
   - Motion tokens
   - Transition definitions
   - Animation timing functions

### ✅ Completed Features

- ✅ **Dark Mode Support** - Full dark mode generation with saturation control
- ✅ **Custom Theming** - Complete theme generation from configuration files
- ✅ **Override System** - Basic override system with automatic txtOn recalculation