# Aplica Tokens Theme Engine

## Overview
**Aplica Tokens Theme Engine** is a comprehensive multi-brand design token system that serves as the Single Source of Truth (SSoT) for engineering teams. Built on **Style Dictionary v5** and **Tokens Studio**, it provides a scalable 5-layer architecture that generates themes programmatically across multiple platforms (JSON, JavaScript, TypeScript).

This is an **open-source project** developed to bring improvements and learnings to design systems. The system supports multiple brands with **dynamic theme generation** from JavaScript configuration files.

### 🆕 Version 2.15.2 - Update bundles guide & release files

**v2.15.2** – **UPDATE_BUNDLES_GUIDE.md**: create and apply update bundles with scope (dynamic-themes vs transformers; always ask). RELEASE_FILES: version gap filled (2.14.0); upgrade section. See [Build System → Gradients and build order](#️-gradients-and-build-order-important) for theme/build pipeline.

**v2.13.4 – Test suite**: `npm run test` runs 20 tests; layout aligned to `dist/`. **v2.13.3 – Gradients**: Gradient structure in **`config/themes.config.json`**; per-theme configs only allow overrides. **Order**: `themes:generate` → **`sync:architecture`** → `build`; or **`npm run build:themes`**.

### Version 2.12.1 - CSS Generation Fixes & Schema Organization

**Fixed**: CSS class generation for typography and elevation styles
- Fixed incorrect token structure access (`$value` property)
- Fixed duplicate `semantic.` prefix in CSS variables
- Added conditional processing for components CSS

**Changed**: Schema organization unified structure
- Created `transformers/schemas/` to match `dynamic-themes/schemas/` pattern
- Foundation styles schema now follows same structure as architecture schema
- Clear separation: Architecture Schema (tokens) vs Foundation Styles Schema (CSS)

### 🆕 Version 2.12.0 - Build System Fixes & Configuration Improvements
The latest release fixes critical build issues and improves configuration management:
- **Fixed Empty Primitive Theme Files**: Resolved issue where `_primitive_theme.json` files were generated empty during build pipeline
- **Removed DTC Brand References**: Cleaned up all references to deprecated "dtc" foundation brand, now using "engine" consistently
- **Improved Build Consistency**: `buildThemes()` now uses same generation method as standalone generation for consistency
- **Centralized Configuration**: Foundation configuration now properly uses centralized `config/themes.config.json`

### Version 2.11.1 - Token Mapping Roadmap Documentation
Previous release added comprehensive token mapping documentation:
- **Token Mapping Roadmap**: Complete guide for conducting token mapping sessions with Design and Marketing teams
- **Conversation Guides**: Example dialogues and practical checklists for extracting brand information
- **Configuration Templates**: Data collection and documentation templates for token mapping

## 🤖 AI Context
If you are an AI Agent (Cursor, Windsurf, AntiGravity, etc.), please start by reading **[AI_CONTEXT.md](./AI_CONTEXT.md)**. This file contains the complete context map, rules, and "brain" of the project to ensure consistent behavior.

### Version 2.8.0 - Override System Validation Tests
Previous release added comprehensive test suite for accessibility validation:
- **Test Suite**: `test-override-validation.mjs` with 8 passing tests
- **WCAG Validation Tests**: Tests for AA/AAA contrast ratio validation
- **NPM Script**: `test:override-validation` for running validation tests

### Version 2.7.0 - Accessibility Level Configuration
Previous release added configurable accessibility levels:
- **Accessibility Level Option**: Choose between WCAG AA (default) or AAA per theme
- **AA**: Industry standard minimum (4.5:1 contrast ratio)
- **AAA**: Enhanced accessibility (7:1 contrast ratio)
- **Per-Theme Configuration**: Each theme can have its own accessibility level

### Version 2.6.0 - Override System Accessibility Validation
Previous release added automatic WCAG contrast validation:
- **Automatic Validation**: WCAG AA/AAA compliance checking for manual txtOn overrides
- **Contrast Ratio Calculation**: Automatic validation with actionable suggestions
- **Strict Validation Mode**: CI/CD-friendly option that throws errors on failures
- **Best Practices Guide**: Comprehensive documentation in `OVERRIDE-BEST-PRACTICES.md`

### Version 2.5.0 - Dynamic Foundation Generator
Previous release added foundation token generation system:
- **Foundation Generator**: Generate foundation tokens from configuration files
- **Foundation Validation**: Validation system with coverage reports
- **Enhanced Build Pipeline**: Integrated foundation generation workflow

### Version 2.3 - Architecture Schema System
Previous release added a **centralized architecture schema** as the Single Source of Truth:
- **Architecture Schema**: `dynamic-themes/schemas/architecture-schema.mjs` defines token structure
- **Automated Sync**: `sync-architecture.mjs` keeps all architecture layers aligned
- **Simplified Semantics**: Feedback (info, success, warning, danger) and Product (promo, cashback, premium) with default/secondary variants
- **No Manual Edits**: Architecture files (`mode`, `surface`, `semantic`, `foundation`) are auto-generated

### Version 2.2 - Dark Mode Support
Previous release added **complete dark mode support** with consistent structure across all themes.

### Version 2.1 - Dynamic Theme Generation
Previous releases introduced a powerful **Dynamic Theme Generator**:
- **Color Decomposition**: Each color automatically generates palette (19 levels), neutrals (15 levels), and behavior states
- **Custom Typography**: Per-brand font families with automatic weight mapping and fallbacks
- **Dark Mode Optimization**: Configurable saturation reduction for better dark mode aesthetics
- **Override System**: Fine-tune any generated value without modifying the core logic
- **Include Primitives Option**: Reduce token count by ~78% for Figma optimization
- **Typography Fallbacks**: Automatic fallback for missing weights and italic styles

See [Dynamic Themes Documentation](dynamic-themes/README.md) for details.

## 🏗️ Architecture

### 5-Layer Hierarchical System
```
Brand → Mode → Surface → Semantic → Foundation
```

- **Brand**: Brand-specific visual identity (theme_engine, aplica_joy, aplica_tangerine, aplica_grinch)
- **Mode**: Visual modes (light, dark) - both use consistent structure
- **Surface**: Context variations (positive, negative)
- **Semantic**: Interface-purpose tokens
- **Foundation**: Complete design system with styles

### Repository Structure
```
aplica-tokens/
├── data/                 # Design tokens (Tokens Studio)
│   ├── brand/              # Brand-specific tokens
│   │   ├── theme_engine/   # Base/neutral template
│   │   ├── aplica_joy/     # Joy brand (pink/blue)
│   │   ├── aplica_tangerine/ # Tangerine brand
│   │   └── aplica_grinch/  # Grinch brand (green)
│   ├── mode/               # Visual modes
│   │   ├── light.json      # Light mode tokens
│   │   └── dark.json       # Dark mode tokens
│   ├── surface/            # Surface contexts
│   │   ├── positive.json
│   │   └── negative.json
│   ├── semantic/           # Semantic tokens
│   │   └── default.json
│   ├── foundation/         # Foundation + styles
│   │   └── engine/         # Foundation tokens (shared across brands)
│   ├── dimension/          # Sizing and spacing
│   │   └── normal.json
│   └── components/         # 22 UI components
│       ├── buttonMain.json
│       ├── inputField.json
│       └── [20 other components...]
├── config/                 # Central configuration
│   ├── themes.config.json  # Themes, global, gradientConfig (canonical)
│   └── dimension.config.mjs # Dimension scale (SSOT)
├── transformers/           # Build system
│   ├── build.mjs           # Main build entry (semantic, foundation, components, all)
│   ├── base-config.mjs     # Style Dictionary base config
│   └── test-build.js      # Automated test suite (20 tests)
├── docs/                   # Technical documentation
└── scripts/                # Utilities
```

## Color System
The color system is comprehensive and includes:

### Brand Colors
- **Branding hierarchy**: first, second, third, fourth (ordinal naming)
- **Intensity variations**: lowest, lower, low, mid, high, higher, highest
- **Context properties**: background, txtOn (text-on-color), border

### Interface Colors
- **Ambient contrast**: positive/negative base and deep variations
- **Ambient neutral**: 7-step grayscale (lowest to highest)
- **Ambient grayscale**: High-contrast black/white system

### Functional Colors
- **Feedback colors**: info, success, warning, danger
- **Interactive states**: hover, active, disabled
- **Light and dark mode**: Optimized palettes for each context

### Surface System
- **Positive**: Default interface context
- **Negative**: Inverted/dark interface context
- **Automatic inversion**: Surfaces automatically adapt brand colors

## Typography
The typography system uses:
- **Roboto Flex**: Main font family for interface text
- **Source Code Pro**: Monospace font for code elements
- **Comprehensive scales**: font-size, line-height, letter-spacing
- **Semantic naming**: display, heading, body, caption, overline
- **Weight variations**: 300, 400, 500, 600, 700, 800

## ♿ Accessibility (v2.6.0+)

### WCAG Compliance
The system includes automatic accessibility validation for color contrast:
- **WCAG AA** (default): Industry standard minimum (4.5:1 contrast ratio)
- **WCAG AAA**: Enhanced accessibility (7:1 contrast ratio)
- **Per-Theme Configuration**: Each theme can configure its own accessibility level
- **Automatic Validation**: Manual txtOn overrides are automatically validated
- **Actionable Suggestions**: System suggests accessible alternatives when contrast fails

### Configuration
```javascript
// Theme configuration with accessibility options
export default {
  name: 'my_theme',
  options: {
    accessibilityLevel: 'AAA',  // 'AA' (default) or 'AAA'
    strictValidation: false      // true for CI/CD (throws errors)
  }
};
```

### Override Validation
When using manual txtOn overrides, the system automatically:
- Calculates contrast ratios
- Validates against configured accessibility level
- Provides warnings with specific contrast ratios
- Suggests accessible alternatives (black/white)
- Supports strict mode for CI/CD pipelines

See [Override Best Practices](dynamic-themes/reference/OVERRIDE-BEST-PRACTICES.md) for complete guide.

## 📐 Schemas (Single Source of Truth)

The project uses **two distinct schemas** that serve as Single Source of Truth for different purposes:

### 1. Architecture Schema (Token Structure)
Defines the **token structure** for all upper layers. To configure themes and ensure consistency across `mode`, `surface`, `semantic`, and `foundation` layers, you **must configure the schema first**.

**File**: `dynamic-themes/schemas/architecture-schema.mjs`

**Used by**: `sync-architecture.mjs` to generate architecture layer files

### 2. Foundation Styles Schema (CSS Style Structure)
Defines the **CSS style structure** for typography and elevation tokens. Used to generate CSS classes from foundation style tokens.

**File**: `transformers/schemas/foundation-styles-schema.mjs`

**Used by**: `generate-css-classes.mjs` to generate CSS classes

**Important**: These schemas are **distinct** and serve different purposes. Do not confuse them.

### What the Schema Defines

| Category | Items | Variants | Description |
|----------|-------|----------|-------------|
| **Feedback** | `info`, `success`, `warning`, `danger` | `default`, `secondary` | System status colors |
| **Product** | `promo`, `cashback`, `premium` | `default`, `secondary` | Product feature colors |
| **Levels** | `lowest`, `default`, `highest` | - | Intensity levels |
| **Behavior** | `lowest`, `action`, `normal`, `active`, `highest` | - | Theme behavior states |

### Schema Commands

```bash
# Sync architecture files with schema
npm run sync:architecture

# Verify without changes (test mode)
npm run sync:architecture:test

# Display current schema
npm run sync:architecture:schema
```

### Modifying Token Structure

When you need to add/remove feedback types, product categories, or change variants:

1. **Edit the schema**: `dynamic-themes/schemas/architecture-schema.mjs`
2. **Sync architecture**: `npm run sync:architecture`
3. **Update theme configs**: Add new mappings to `*.config.mjs` files
4. **Regenerate themes**: `npm run themes:generate`
5. **Rebuild**: `npm run build`

> ⚠️ **IMPORTANT**: Never edit architecture files (`mode/*.json`, `surface/*.json`, `semantic/*.json`, `foundation/*.json`) manually. Always modify the schema and run sync.

## 🚀 Build System

### Technologies
- **Style Dictionary v5**: Transformation engine
- **@tokens-studio/sd-transforms**: Tokens Studio integration
- **Node.js**: Runtime environment
- **Native formats**: 100% Style Dictionary native outputs

### ⚠️ Gradients and build order (IMPORTANT)

**Gradient structure** is defined in **`config/themes.config.json`** (`global.gradientConfig`: degrees, steps, defaultComposites). Per-theme configs (`*.config.mjs`) must **not** define gradients; they only allow overrides. Gradients are **built in the semantic layer** (`data/semantic/default.json` → `semantic.color.gradient.config` + `composites`).

**Gradients only appear in the build output (CSS/JS) when the semantic layer has the `gradient` section.** That section is created by **`sync:architecture`** (not by `npm run build` alone), which reads from `themes.config.json` and `data/brand/*/_brand.json` and writes to `data/mode/`, `data/surface/`, and **`data/semantic/default.json`**.

**Correct order when using gradients** (`config/themes.config.json` → `global.gradients: true`):

1. **`npm run themes:generate`** – Generates/updates `_brand.json` with `theme.color.light.gradient` and `theme.color.dark.gradient`.
2. **`npm run sync:architecture`** – Propagates gradient structure to mode, surface, and **semantic** (so `semantic.color.gradient` exists).
3. **`npm run build`** – Build reads semantic and emits gradient variables (e.g. `--semantic-color-gradient-brand-first`, `-second`, `-third`) in CSS/JS.

**Or run the full pipeline in one go:**

```bash
npm run build:themes
```

`build:themes` = `ensure:data` + `themes:generate` + `dimension:generate` + **`sync:architecture`** + `foundations:generate` + `build:all`. That way gradients are always propagated before the build.

If you run only `npm run build` and gradients are enabled but semantic has no `gradient`, the build will **warn** (and not fail) and gradients will not appear in the output. Fix: run `npm run sync:architecture` (or `npm run build:themes`), then build again.

### Quick Start
```bash
# Complete build (all themes: semantic + foundation + components)
npm run build

# Or from transformers folder:
cd transformers && node build.mjs all

# Build semantic tokens (all brands, modes, surfaces)
cd transformers && node build.mjs semantic

# Build foundation tokens (aliases to semantic)
cd transformers && node build.mjs foundation

# Build specific brand with all platforms
cd transformers && node build.mjs brand:theme_engine type:foundation "platform:[json,js,esm,dts,dtsESM]" mode:aliases
cd transformers && node build.mjs brand:aplica_joy type:foundation "platform:[json,js,esm,dts,dtsESM]" mode:aliases
```

### Advanced Usage
```bash
# Multi-platform output (recommended syntax)
cd transformers && node build.mjs foundation

# Brand-specific builds (use multiple platforms for best results)
cd transformers && node build.mjs brand:aplica_joy "platform:[json,esm,dts]"
cd transformers && node build.mjs brand:theme_engine type:semantic "platform:[json,esm]"

# Custom combinations
cd transformers && node build.mjs brand:aplica_tangerine surface:negative type:foundation "platform:[json,dts]"

# Important: Use multiple platforms syntax for reliable builds
# ✅ Recommended: "platform:[json,js,esm]"  
# ⚠️  May fail: platform:json
```

### Output Platforms
- **JSON**: Structured token files (`.json`)
- **JavaScript**: CommonJS modules (`.js`)
- **ES Modules**: Modern JavaScript (`.mjs`)
- **TypeScript**: Type declarations (`.d.ts`, `.d.mts`)

## Generated Themes

### Automatic Theme Generation
The system automatically generates themes for all brand/mode/surface combinations:

| Brand | Mode | Surface | Type | Generated File |
|-------|------|---------|------|----------------|
| theme_engine | light | positive | semantic | theme_engine-light-positive.json |
| theme_engine | light | negative | semantic | theme_engine-light-negative.json |
| theme_engine | dark | positive | semantic | theme_engine-dark-positive.json |
| theme_engine | dark | negative | semantic | theme_engine-dark-negative.json |
| aplica_joy | light | positive | semantic | aplica_joy-light-positive.json |
| aplica_joy | light | negative | semantic | aplica_joy-light-negative.json |
| theme_engine | dark | positive | semantic | theme_engine-dark-positive.json |
| theme_engine | dark | negative | semantic | theme_engine-dark-negative.json |
| ... | ... | ... | ... | ... (all 6 brands × 2 modes × 2 surfaces) |

**Note**: Foundation is a **shared interpolation layer** that creates aliases to semantic tokens. Each brand has one foundation file that references all semantic tokens via `{semantic.*}` aliases. Both light and dark modes use the same structure (`positive`/`negative`) for consistency.

### Output Structure
```
dist/
├── json/                   # JSON token files
│   ├── theme_engine-light-positive.json
│   ├── theme_engine-light-negative.json
│   ├── theme_engine-dark-positive.json
│   ├── theme_engine-dark-negative.json
│   ├── aplica_joy-light-positive.json
│   ├── aplica_joy-light-negative.json
│   ├── theme_engine-dark-positive.json
│   ├── theme_engine-dark-negative.json
│   ├── foundation/foundation.json
│   └── ... (all brands × modes × surfaces)
├── esm/                    # ES Modules
│   ├── theme_engine-light-positive.mjs
│   ├── aplica_joy-light-positive.mjs
│   └── ... (all themes)
├── js/                     # CommonJS
│   ├── theme_engine-light-positive.cjs
│   └── ... (all themes)
└── css/                    # CSS Variables
    ├── theme_engine-light-positive.css
    ├── aplica_joy-dark-positive.css
    └── ... (all themes)
```

## Component System

### Available Components (22 total)
The system includes comprehensive component tokens:
- **Buttons**: buttonMain, buttonIcon, dismissButton, dropdownButton
- **Inputs**: inputField, inputSelect, inputSingle, inputTextarea
- **Interactive**: checkboxes, radioButtons, toggle
- **Navigation**: listMenu, listMenuItem, linkAction
- **Feedback**: loading, tag, compoundTag
- **Layout**: card, bottomSheet, dimmer, drag
- **Visual**: icons

Each component includes complete styling definitions with semantic token references.

## Scripts & Utilities

### Component Management
```bash
# Split large component files into individual files
npm run split

# Show available scripts
npm run help
```

### Build Commands
```bash
# Complete builds
npm run build              # Complete build (all themes: semantic + foundation + components)
npm run build:semantic     # Build semantic tokens only
npm run build:foundation   # Build foundation tokens only
npm run build:components   # Build component tokens only

# Dynamic Theme Generation (v2.0+)
npm run build:themes       # Generate all dynamic themes
node dynamic-themes/scripts/generate-all-themes.mjs --config=aplica_joy  # Single theme
```

### Test Commands
```bash
# Test suites
npm run test               # Build test suite (20 tests; verifies dist/ output)
npm run test:quick         # Essential tests (~45s)
npm run test:override-validation  # Override system accessibility validation tests (v2.8.0+)
```

## Usage for Engineering Teams

### Framework Integration
Theme Engine DTC serves as a centralized repository for design tokens that can be consumed by engineering teams to create **framework-agnostic** implementations:

- **React**: Import semantic/foundation themes as JavaScript modules
- **Flutter**: Consume JSON tokens for cross-platform consistency
- **Stencil**: Use CSS Variables for Web Components (see [README-STENCIL.md](README-STENCIL.md))
- **Web**: Use TypeScript declarations for type safety
- **Native**: Transform tokens to platform-specific formats

### Stencil Web Components ⚡

Aplica Tokens provides **first-class support for Stencil** web components through CSS Variables that work seamlessly with Shadow DOM:

```typescript
// Stencil component with design tokens
@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: true
})
export class MyButton {
  render() {
    return <button class="btn"><slot /></button>;
  }
}
```

```css
/* my-button.css */
@import url('path/to/dist/css/theme_engine-light-positive.css');
@import url('path/to/dist/css/theme_engine-dark-positive.css');

.btn {
  background: var(--semantic-color-interface-function-primary-normal-background);
  color: var(--semantic-color-interface-function-primary-normal-txtOn);
  padding: var(--semantic-dimension-spacing-small) var(--semantic-dimension-spacing-medium);
  border-radius: var(--semantic-border-radii-small);
}
```

**Quick Links**:
- 📖 [Stencil Quick Start](README-STENCIL.md)
- 📚 [Complete Stencil Guide (EN)](docs/en/#07%20Theme%20Engine%20-%20Stencil%20Implementation%20Guide.md)
- 📚 [Guia Completo Stencil (PT-BR)](docs/pt-br/#07%20Theme%20Engine%20-%20Guia%20de%20Implementação%20Stencil.md)

### Implementation Example
```javascript
// Import semantic theme (light mode)
import tokensLight from './dist/esm/theme_engine-light-positive.mjs';

// Import semantic theme (dark mode)
import tokensDark from './dist/esm/theme_engine-dark-positive.mjs';

// Use in component
const Button = styled.button`
  background-color: ${tokensLight.color.interactive.primary.default.background};
  color: ${tokensLight.color.interactive.primary.default.txtOn};
  border: 1px solid ${tokensLight.color.interactive.primary.default.border};
  border-radius: ${tokensLight.dimension.radius.medium};
  padding: ${tokensLight.dimension.spacing.small} ${tokensLight.dimension.spacing.medium};
`;
```

## Documentation

### Complete Technical Documentation
- **English**: `/docs/en/` - Complete technical architecture and implementation guides
- **Portuguese**: `/docs/pt-br/` - Documentação técnica completa
- **Build System**: `/transformers/README.md` - Build system documentation

### Key Documents
1. **Complete Technical Architecture**: 5-layer system overview
2. **Implementation Guide**: How to add brands, modes, and surfaces
3. **Technical Reference**: API and configuration details
4. **Token Semantics**: Color system and naming conventions
5. **Dynamic Themes**: `/dynamic-themes/README.md` - Theme generation system

## Benefits

### For Design Teams
- **Single Source of Truth**: Centralized token management
- **Figma Integration**: Direct integration with Tokens Studio plugin
- **Automatic Consistency**: Brand guidelines enforced programmatically
- **Scalable System**: Easy addition of new brands and themes

### For Engineering Teams
- **Framework Agnostic**: Supports React, Flutter, Web, Native
- **Type Safety**: TypeScript declarations included
- **Multi-Platform**: JSON, JavaScript, TypeScript outputs
- **Build Automation**: Automated theme generation and validation

### For Product Teams
- **Brand Consistency**: Unified visual language across products
- **Rapid Prototyping**: Quick theme variations and testing
- **Scalable Growth**: System grows with product portfolio
- **Quality Assurance**: Consistent implementation across platforms

## Development

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Getting Started
```bash
# Install dependencies
npm install

# Full build (semantic + foundation + components)
npm run build

# Or generate themes first, then build (recommended when using gradients)
npm run build:themes

# Generate all themes only (then run sync:architecture + build)
npm run themes:generate
node transformers/build.mjs all

# View generated files
ls dist/json/
ls dist/esm/
ls dist/css/
```

### Adding New Brands
1. Create configuration file in `dynamic-themes/configs/new-brand.config.mjs`
2. Define colors, mapping, and options
3. Run `npm run build:themes` to generate theme files
4. Run `npm run build` to generate all semantic and foundation tokens
5. Themes will automatically generate for both light and dark modes

## Dynamic Theme Generation (v2.0+)

### Quick Start
Create a new theme in 3 steps:
1. Copy `dynamic-themes/configs/theme-engine.config.mjs`
2. Edit colors and mapping
3. Run `npm run build:themes`

### Configuration Example
```javascript
// dynamic-themes/configs/my-brand.config.mjs
export default {
  name: 'my_brand',
  colors: {
    brand_primary: '#0066CC',
    brand_secondary: '#2E2E2E',
    // ... more colors
  },
  mapping: {
    brand: { first: 'brand_primary', second: 'brand_secondary' },
    // ... semantic mapping
  },
  options: {
    txtOnStrategy: 'high-contrast',  // or 'brand-tint'
    darkModeChroma: 0.85             // 15% less saturation in dark mode
  }
};
```

### Generated Files
For each theme, the system generates:
| File | Description |
|------|-------------|
| `_primitive_theme.json` | Color palettes with 19 levels each |
| `_grayscale.json` | Fixed grayscale scale |
| `_brand.json` | Semantic color mapping |
| `_typography.json` | Font families, sizes, weights |
| `_borders.json` | Border radius tokens |

See [Dynamic Themes Documentation](dynamic-themes/README.md) for complete details.

---

## Architecture Benefits

### Exponential Scalability
- **Current**: 6 brands × 2 modes × 2 surfaces = 24 semantic theme combinations + 6 foundation themes
- **Future**: N brands × M modes × S surfaces = exponential growth
- **Automatic**: Adding 1 brand generates 4+ themes automatically (light/dark × positive/negative)

### Maintainability
- **Hierarchical**: Clear layer separation and dependencies
- **Configurable**: Central configuration management
- **Validated**: Built-in validation and error checking
- **Documented**: Comprehensive documentation at every level

---

**🎉 Aplica Tokens Theme Engine**: Production-ready open-source design token system with complete automation, multi-platform support, and infinite scalability.

## About This Project

**Aplica Tokens Theme Engine** is an open-source project created outside of work hours to bring improvements and learnings to design systems. It demonstrates best practices in design token architecture and serves as a reference implementation for multi-brand theming systems.

### Contributing
This project welcomes contributions from the design systems community. Whether you're interested in adding new features, improving documentation, or sharing your implementation experiences, your input is valued.

### License
ISC License - See LICENSE file for details.