# Changelog Archive (2.11.x and below)

This file contains the full changelog entries for versions **2.11.1** through **1.0.0**. For the current changelog see **CHANGELOG.md**. For file lists per version see **docs/context/RELEASE_FILES.md**.

---

## [2.11.1] - 2026-01-22

### Added
- **Token Mapping Roadmap Documentation** - Comprehensive guide for conducting token mapping sessions
  - New "Theme Engine - Token Mapping Roadmap" documentation (`docs/en/#09 Theme Engine - Token Mapping Roadmap.md`)
  - Complete guide covering:
    - Introduction and context for token mapping
    - Preparation for work sessions with Design and Marketing teams
    - How to conduct conversations and workshops
    - Complete brand properties checklist
    - Mapping guides for all systems (colors, typography, shadows, spacing, borders, opacity)
    - Customizations and overrides handling
    - Configuration decisions
    - Data collection and documentation templates
    - Complete examples by theme
    - Validation and discussion process
    - Next steps and implementation
  - Includes conversation guides, example dialogues, practical checklists, and templates
  - Focused on extracting brand information, documenting decisions, and handling customizations

---

## [2.11.0] - 2026-01-22

### Added
- **Designer Documentation** - Comprehensive guide for designers to understand and create themes
  - New "Theme Engine - Designer Guide" documentation (`docs/en/#08 Theme Engine - Designer Guide.md`)
  - Complete guide covering:
    - Introduction and overview of the Theme Engine
    - Understanding the 5-layer architecture with visual diagrams
    - Configuring colors (brand, action, feedback, product colors)
    - Configuring typography (font families, weights, variants)
    - Step-by-step guide for creating new themes
    - Understanding generated output files and formats
    - Best practices for designers
  - Includes practical examples, Mermaid diagrams, and complete theme configuration examples
  - Focused on designer-friendly language, avoiding excessive technical jargon

---

## [2.10.1] - 2026-01-22

### Fixed
- **Foundation Build Reference Errors** - Fixed build failure with "Reference Errors: Some token references (2120) could not be found"
  - Updated `createFoundationThemeConfig` to load all surfaces (positive and negative) instead of just one
  - Improved error handling in `buildFoundation` to allow build to continue even with missing references
  - Foundation build now successfully completes by loading all necessary semantic tokens
  - Build process now handles reference errors gracefully and generates available platforms

### Changed
- **Foundation Configuration** - Enhanced source loading for foundation builds
  - Foundation builds now load all mode and surface combinations to resolve all token references
  - Improved error messages and warnings for better debugging experience

---

## [2.10.0] - 2026-01-21

### Added
- **Typography Weight System Refactor** - New mandatory semantic weight configuration system
  - All themes now require explicit declaration of 5 semantic weights (light, regular, semibold, bold, black) per font family
  - Each weight must declare both `normal` and `italic` variants with Figma string names and numeric CSS values
  - System validates that all 5 semantic weights are present before generation
  - Supports manual weight mapping for fonts that don't have exact semantic weights (e.g., Sansita using Regular for light, Bold for semibold)
  - Generated `_typography.json` files now contain only the 5 semantic weights, removing unnecessary weight variations
  - Improved error messages guide users to declare missing weights in configuration files

### Changed
- **Typography Generator** - Refactored to use explicit weight configuration
  - Removed dependency on `DEFAULT_WEIGHT_MAP` for semantic weights
  - `getWeights()` now validates and returns only weights from config
  - `generateFontFamilyTokens()` generates only the 5 semantic weights
  - `generateTypographyJson()` generates only semantic weights in both `fontFamilies.style` and `fontWeights` sections
  - Validation ensures all 5 semantic weights are declared for each font family
- **Theme Configurations** - Updated all theme configs with explicit weight declarations
  - `aplica-joy.config.mjs`: Updated fonts (Segoe UI, Segoe UI, Poppins, IBM Plex Mono) with full weight declarations
  - `aplica-grinch.config.mjs`: Updated fonts (Roboto, Roboto, Sansita, IBM Plex Mono) with weight mappings including Sansita special cases
  - `aplica-tangerine.config.mjs`: Updated fonts (Roboto, Roboto, Sansita, IBM Plex Mono) with weight mappings
  - `theme-engine.config.mjs`: Updated fonts (Roboto, Roboto, Sansita, IBM Plex Mono) with weight mappings

### Breaking Changes
- **Typography Configuration** - Weight declaration is now mandatory
  - All theme configs must include `typography.weights` section with all 5 semantic weights for each font family
  - Missing weights will cause generation to fail with descriptive error messages
  - Old configs using automatic weight fallback will no longer work

---

## [2.9.0] - 2026-01-20

### Fixed
- **Theme Generation with Primitives** - Fixed validation error when generating themes with `includePrimitives: true`
  - Fixed `validateAACompliance` to skip validation when `_brand.json` contains references (primitives mode)
  - Validation now only runs on final output when `includePrimitives: false` (direct HEX values)
  - When using primitives, validation happens during color generation, not on final output
  - All themes now generate successfully regardless of `includePrimitives` setting
- **AAA Level Fallback Logic** - Improved handling of AAA accessibility level failures
  - Themes configured for AAA that pass AA (but not AAA) are now handled correctly
  - Added logic to distinguish between actual AA failures and AAA-only failures
  - Improved error messages and fallback handling for AAA level themes

### Changed
- **Accessibility Validation** - Enhanced validation logic for different theme configurations
  - Validation now respects `includePrimitives` setting to avoid false errors
  - Better handling of AAA level themes with automatic AA fallback
  - Improved error messages for accessibility validation failures

---

## [2.8.2] - 2026-01-20

### Fixed
- **GitHub Actions CI/CD Workflows** - Fixed failing tests in CI pipeline
  - Fixed `test-build.yml`: Dependencies now install from root `package.json` instead of non-existent `transformers/package.json`
  - Fixed `build.yml`: Updated file validation to check correct theme file name (`theme_engine-light-positive.json` instead of `ze-light-positive-semantic.json`)
  - Improved test execution: Tests now run with proper working directory context
  - All workflows now correctly install dependencies and validate build outputs

### Changed
- **CI/CD Pipeline** - Improved reliability and correctness
  - Test workflows now use `npm ci` from project root
  - Build validation checks actual generated theme files
  - Test execution uses proper working directory for relative paths

---

## [2.8.1] - 2026-01-20

### Documentation
- **Language Guidelines** - Comprehensive documentation added
  - Added language rules section to `dynamic-themes/.cursorrules`
  - Expanded language guidelines in `dynamic-themes/README.md`
  - Added language guidelines section to `transformers/TESTING.md`
  - Updated `.cursor/README.md` with language standards
  - All documentation now clearly states English-only requirement
- **Accessibility Configuration Documentation** - Complete guide added
  - Added "Accessibility Configuration" section to `dynamic-themes/.cursorrules`
  - Documented `accessibilityLevel` option (AA/AAA)
  - Documented `strictValidation` mode
  - Included validation output examples
  - Added references to related documentation

### Changed
- **Documentation Structure** - Improved organization and discoverability
  - Language guidelines now visible in multiple key files
  - Accessibility features fully documented in `.cursorrules`
  - Better cross-referencing between documentation files

---

## [2.8.0] - 2026-01-20

### Added
- **Override System Validation Tests** - Comprehensive test suite for accessibility validation
  - New test file: `dynamic-themes/scripts/test-override-validation.mjs`
  - Tests for contrast ratio calculation
  - Tests for WCAG AA/AAA validation
  - Tests for accessibility level configuration (AA/AAA)
  - Tests for valid and invalid override scenarios
  - Tests for strictValidation mode
  - All 8 tests passing ✅
  - New NPM script: `test:override-validation`

### Changed
- **Test Coverage** - Override system now has dedicated test suite
  - Validates all aspects of accessibility validation
  - Ensures backward compatibility
  - Verifies error handling and warnings

---

## [2.7.0] - 2026-01-20

### Added
- **Accessibility Level Configuration** - Choose between WCAG AA or AAA per theme
  - New `accessibilityLevel` option in theme configuration: `'AA'` (default) or `'AAA'`
  - `'AA'`: Industry standard minimum (4.5:1 contrast ratio)
  - `'AAA'`: Enhanced accessibility (7:1 contrast ratio)
  - Validation messages now show the configured level (AA or AAA)
  - `aplica-joy` theme configured with `'AAA'` for testing
- **Color Decomposition Method Selection** - Planned feature documented
  - Added to Priority 2 in work plan
  - Future support for Linear, LCH, and OKLCH decomposition methods

### Changed
- **Override System Enhancement** - Marked as complete
  - All objectives and tasks completed
  - Validation system fully functional with AA/AAA support
  - Documentation comprehensive and up-to-date

### Documentation
- Updated work plan with completed Priority 1 status
- Added Color Decomposition Method Selection as Priority 2
- Updated all context files with new priorities and completed features

---

## [2.6.0] - 2026-01-20

### Added
- **Override System Accessibility Validation** - Automatic WCAG AA contrast validation for manual txtOn overrides
  - New `validateTxtOnContrast()` function for contrast ratio calculation and validation
  - Automatic validation when manual txtOn overrides are applied in `generateNeutrals()`
  - WCAG AA (4.5:1) and AAA (7:1) compliance checking
  - Automatic suggestions for accessible alternatives (black/white) when contrast fails
  - Enhanced error messages with contrast ratios, requirements, and actionable suggestions
  - `strictValidation` option in ColorDecomposer for CI/CD pipelines (throws error on failures)
- **Override Best Practices Documentation** - Comprehensive guide for using override system
  - New file: `dynamic-themes/reference/OVERRIDE-BEST-PRACTICES.md`
  - Best practices, common patterns, troubleshooting guide
  - Examples and validation API documentation

### Changed
- **Override System Enhancement** - Improved accessibility validation workflow
  - Validation warnings now show formatted output with visual hierarchy
  - Better error messages with specific contrast ratios and suggestions
  - Updated `dynamic-themes/README.md` with accessibility validation information

### Fixed
- **Accessibility Compliance** - Manual txtOn overrides now validated to prevent accessibility issues
  - Prevents generation of tokens that fail WCAG AA contrast requirements
  - Provides clear feedback and suggestions when overrides cause accessibility problems

---

## [2.5.2] - 2026-01-20

### Changed
- **Version bump** - Patch update for documentation and reference updates
- Updated package.json version to 2.5.2
- Updated changelog with version 2.5.2 entry

---

## [2.5.1] - 2026-01-20

### Changed
- **Version bump** - Patch update for documentation and reference updates
- Updated package.json version to 2.5.1
- Updated changelog with version 2.5.1 entry

---

## [2.5.0] - 2026-01-20

### Added
- **Dynamic Foundation Generator System** - Generate foundation tokens from configuration files
  - New script: `dynamic-themes/scripts/generate-foundation.mjs`
  - New script: `dynamic-themes/scripts/generate-all-foundations.mjs`
  - Foundation configs: `dynamic-themes/configs/foundations/engine.config.mjs`, `sample.config.mjs`
  - NPM commands: `foundations:generate`, `foundations:validate`
- **Foundation Validation System** - Validate foundation mappings against semantic tokens
  - Generates validation reports in `.validation/` folder
  - Reports missing tokens, invalid references, and coverage statistics
- **Enhanced Build Pipeline** - `build:themes` now includes foundation generation
  - Workflow: themes:generate → sync:architecture → foundations:generate → build:all
- **Foundation Configs Documentation** - New README at `dynamic-themes/configs/foundations/README.md`

### Changed
- **Semantic Default Structure** - Enhanced with new token categories
- **Foundation Default Structure** - Updated to match new semantic structure
- **Architecture Schema** - Added foundation-related exports

---

## [2.4.0] - 2026-01-20

### Added
- Removed legacy theme configurations ('aplica_purple', 'aplica_yellow', 'aplica_yellow_custom')

---

## [2.3.1] - 2026-01-20

### Documentation
- **Architecture Schema as SSOT** - Emphasized schema as the starting point for all theme configuration
  - Updated `README.MD` with dedicated Architecture Schema section
  - Updated `dynamic-themes/README.md` (fully translated to English)
  - Enhanced `.cursor/dynamic-themes-context.md` with detailed schema exports
  - Updated `docs/en/#01` with schema workflow and importance
- **Schema Workflow Documentation** - Clear step-by-step guide for modifying token structure
  - Edit schema → Sync architecture → Update configs → Generate themes → Build
  - Warning against manual architecture file edits
- **Schema Exports Reference** - Documented all schema exports and their purposes
  - `FEEDBACK_SCHEMA`, `PRODUCT_SCHEMA`, `BRAND_SCHEMA`
  - `INTENSITY_LEVELS`, `BEHAVIOR_LEVELS`
  - `COLOR_PROPERTIES`, `THEME_COLOR_PROPERTIES`
  - `SURFACE_TYPES`

---

## [2.3.0] - 2026-01-16

### Added
- **Architecture Schema System** - Centralized schema for token structure
  - New file: `dynamic-themes/schemas/architecture-schema.mjs`
  - Single source of truth for feedback and product token structure
  - Helper functions: `generateMappingKeys()`, `validateMapping()`, `generateMappingTemplate()`
  - Schema version tracking and metadata
- **Sync Architecture Script** - Automated synchronization of architecture files
  - New script: `dynamic-themes/scripts/sync-architecture.mjs`
  - Updates mode, surface, semantic, and foundation files
  - Test mode for verification without changes (`--test`)
  - Schema display mode (`--schema`)
  - NPM commands: `sync:architecture`, `sync:architecture:test`, `sync:architecture:schema`

### Changed
- **Feedback Schema** - Restructured with default/secondary variants
  - Old: `info`, `success`, `warning`, `danger` (single variant)
  - New: `info_default`, `info_secondary`, `success_default`, `success_secondary`, etc.
  - Each feedback type now has lighter (default) and saturated (secondary) variants
- **Product Schema** - Simplified to 3 main categories
  - Old: `rewards`, `cold`, `promo`, `time_bomb`, `rgb` (5 categories)
  - New: `promo`, `cashback`, `premium` (3 categories)
  - Each product type has default and secondary variants
- **Theme Configurations** - All configs updated with new semantic structure
  - Updated: `aplica-joy`, `aplica-grinch`, `aplica-tangerine`, `theme-engine`

### Documentation
- Updated `dynamic-themes/README.md` with schema documentation
- Updated `dynamic-themes/.cursorrules` with new file structure
- Added schema modification workflow documentation

---

## [2.2.0] - 2026-01-04

### Added
- **Complete Dark Mode Support** - Full dark mode generation for all themes
  - Both light and dark modes now generate themes for all brand/surface combinations
  - Dark mode themes: `{brand}-dark-positive` and `{brand}-dark-negative`
  - All 6 brands support both light and dark modes
- **Consistent Structure Between Modes** - Light and dark modes use same structure
  - Both modes use `positive` and `negative` for `ambient.contrast.base` and `ambient.contrast.deep`
  - Ensures compatibility and consistent references across modes
  - Resolves reference errors in `mode/dark.json`

### Fixed
- **Theme Generator Structure Consistency** - Fixed inconsistent structure between light/dark modes
  - Light mode was using `base.positive`/`base.negative`
  - Dark mode was incorrectly using `base.highest`/`base.lowest`
  - Now both modes use `base.positive`/`base.negative` for consistency
- **Reference Resolution** - All token references in dark mode now resolve correctly
  - Updated `mode/dark.json` to reference `positive`/`negative` instead of `highest`/`lowest`
  - All builds (semantic, foundation, all) now work correctly with dark mode

### Changed
- **Theme Names Updated** - Updated from old theme names to current structure
  - Old: legacy theme names
  - New: `theme_engine`, `aplica_joy`, `aplica_tangerine`, `aplica_grinch`
- **Build System** - Enhanced to support both light and dark modes
  - Sequential mode processing to avoid conflicts
  - All themes generate for both modes automatically
  - Foundation builds load all modes correctly

### Documentation
- Updated all documentation to reflect dark mode support
- Added structure consistency notes in dynamic-themes/README.md
- Updated examples to use current theme names
- Enhanced build-process.md with dark mode information

---

## [2.1.1] - 2025-12-30

### Fixed
- **Typography fallbacks for custom fonts** - Fonts without italic variants (e.g., "Bebas Neue") now correctly fall back to normal style
- **Weight fallbacks** - Missing weights in custom fonts now find the closest available weight
- Resolved Style Dictionary reference errors for fonts with limited weight/style combinations

---

## [2.1.0] - 2025-12-30

### Added
- **`includePrimitives` option** - Control whether to generate `_primitive_theme.json`
  - `true` (default): Full color decomposition with references (~5k tokens per theme)
  - `false`: Raw HEX values in `_brand.json`, no primitives file (~1.2k tokens per theme)
  - Reduces Figma memory usage by ~78% when disabled
- Example configuration in `aplica-tangerine.config.mjs`

### Changed
- Theme generator now caches decomposed colors when `includePrimitives: false`
- Generation summary shows `(no primitives)` indicator for themes without primitives
- Updated documentation with `includePrimitives` section

---

## [2.0.0] - 2025-12-29

### Added - Dynamic Theme Generation System
- **Complete Dynamic Theme Generator** - Generate themes from JavaScript configuration files
- **Color Decomposition Engine** (`color-decomposer.mjs`) - Breaks base colors into:
  - Palette (19 levels: 10-190) with surface, txtOn, border
  - Neutrals (15 levels: 5-140) derived from each color
  - Behavior (5 semantic states: lightest, active, normal, action, darkest)
- **Typography Generator** (`typography-generator.mjs`) - Dynamic typography tokens:
  - Custom font families per brand (main, content, display, code)
  - Figma-to-CSS weight mapping (e.g., "Light Italic" → 300)
  - Automatic fallback for missing weights
- **Theme Generator** (`theme-generator.mjs`) - Orchestrates complete theme generation
- **New semantic token structure**: `theme.color.light` / `theme.color.dark` for better extensibility
- **Dark Mode Chroma** - Configurable saturation reduction for dark mode (e.g., 0.85 = 15% less)
- **Neutrals Override System** - Two options:
  - Option B: Automatic decomposition from `baseColor` + `referenceLevel`
  - Option C: Manual override for specific levels
- **Modular output files**:
  - `_primitive_theme.json` - Decomposed color palettes
  - `_grayscale.json` - Fixed grayscale scale
  - `_brand.json` - Semantic color mapping
  - `_typography.json` - Typography tokens
  - `_borders.json` - Border radius tokens
  - `_components.json` - Component tokens (placeholder)
- **Metadata headers** - All generated files include `_meta` with generator info and warnings
- **6 theme configurations**:
  - `theme-engine.config.mjs` - Base/neutral template
  - `aplica-yellow.config.mjs` - Yellow brand
  - `aplica-purple.config.mjs` - Purple brand
  - `aplica-yellow-custom.config.mjs` - Override examples
  - `aplica-joy.config.mjs` - Joy (pink/blue)
  - `aplica-tangerine.config.mjs` - Tangerine (orange)
- **txtOnStrategy options**:
  - `high-contrast`: Text is always pure black or white
  - `brand-tint`: Text uses closest accessible color from palette

### Changed
- **BREAKING**: Token structure changed from `theme.light` to `theme.color.light`
- **BREAKING**: Build output now goes to `data/brand/` instead of `dynamic-themes/output/`
- Build system integrated with dynamic theme generation (`npm run build:themes`)
- Complete documentation rewritten in English (per .cursorrules)

### Removed
- `_config.json` files from generated themes (redundant)
- `dynamic-themes/output/` folder (now uses `data/brand/`)
- Legacy `_other_elements.json` approach (replaced by modular files)

### Documentation
- `dynamic-themes/README.md` - Complete system documentation (English)
- `.cursor/dynamic-themes-context.md` - AI context for development
- `dynamic-themes/.cursorrules` - Updated coding rules
- `dynamic-themes/reference/` - Technical specifications

---

## [1.8.1] - 2025-10-25

### Fixed
- Documentation errors in Stencil Implementation Guide (CSS variable names and @extend usage)
- Corrected CSS variable references to match generated tokens
- Removed SCSS @extend syntax from pure CSS examples

### Added
- README-STENCIL.md quick start guide for rapid Stencil integration
- Stencil section in main README with examples and links
- Practical examples for using typography classes in TSX/HTML

### Changed
- Updated Stencil documentation (EN and PT-BR) with correct examples
- Marked Stencil Support as completed in roadmap

## [1.8.0] - 2025-10-25

### Added
- **Complete Stencil Support** for web components
- CSS Variables working with Shadow DOM
- Typography classes integration with Stencil
- Theme switching examples for Stencil
- Comprehensive documentation (EN + PT-BR)

### Changed
- Updated technology roadmap with Stencil as completed
- Enhanced main README with Stencil support section

## [1.7.0] - 2025-10-10

### Added
- **Absolute Path System** for monorepo compatibility
- Dynamic project root detection with `findProjectRoot()`
- Monorepo-ready build system (Turbo, pnpm workspaces compatible)

### Changed
- **ESM/CJS Output Format**: Now generates nested structure with resolved values
- All build paths converted to absolute paths
- Created custom formats: `javascript/es6-nested-resolved` and `javascript/module-nested-resolved`

### Fixed
- Relative path issues causing incorrect dist/ creation in monorepos
- ESM/CJS files now generate with rasterized values instead of aliases

## [1.6.0] - 2025-10-10

### Added
- **Foundation CSS Variables** with semantic references
- **Typography CSS Classes** without -original suffix
- **Elevation CSS Classes** with correct semantic variable references

### Fixed
- Foundation tokens now generate semantic references instead of raw values
- Typography classes cleaned from Style Dictionary processing artifacts
- Elevation CSS with proper variable references (e.g., var(--semantic-dimension-sizing-zero))
- Semantic prefix duplication in CSS variables

## [1.5.0] - 2025-10-10

### Added
- **BREAKING CHANGE**: Major structural reorganization by technology/language
- New folder structure organized by technology:
  - `dist/semantic/` - Semantic tokens (root)
  - `dist/json/` - JSON format (foundation/, components/)
  - `dist/esm/` - ES modules (foundation/, components/)
  - `dist/js/` - JavaScript (foundation/, components/)
  - `dist/css/` - CSS format (semantic/, foundation/, components/)
- CSS components generation (`dist/css/components/components.css`)
- Build system improvements for new structure
- Enhanced argument parsing for multiple formats
- Tests updated for new organizational structure

### Changed
- **BREAKING**: All build paths reorganized by technology
- CSS generation now reads directly from source files
- Test system adapted for new structure
- Documentation updated with new organization

### Removed
- Old folder structure (all files in dist/ root)
- Dependency on generated files for CSS classes

## [1.4.1] - 2025-01-10

### Added
- Phase 2 completion documentation
- Status "Phase 2 Complete, Phase 3 Ready"
- Updated test system metrics (20 automated tests)
- CSS System marked as complete
- Phase 3 "Advanced Features & Optimization" prepared

### Changed
- CONTEXT-INDEX.md updated with Phase 2 complete status
- work-plan-tokens.md with Phase 2 achievements
- Technology Matrix updated (CSS Variables and Classes active)
- Roadmap updated for Phase 3

## [1.4.0] - 2025-01-10

### Added
- **Complete Test System** with 3 levels:
  - `test-daily.js` - Super fast verification (~20s)
  - `test-quick.js` - Essential tests (~45s) 
  - `test-build.js` - Complete validation (~3min)
- **20 automated tests** comprehensive
- **CSS-specific validation** at all levels
- **Complete CSS Build System**:
  - CSS Variables Semantic (`--semantic-` prefix)
  - CSS Variables Foundation (`--foundation-` prefix)
  - CSS Classes Typography (`.typography-` classes)
  - CSS Classes Elevation (`.elevation-` classes)
- **generate-css-classes.mjs** - Independent script for CSS classes
- **TESTING.md** - Complete test system documentation

### Changed
- Build system integrated with CSS generation
- Tests converted to ES modules
- CSS validation at all test levels
- Documentation updated with test metrics

### Removed
- Dependency on generated files for validation
- Manual tests in favor of automation

## [1.3.0] - 2025-01-10

### Added
- **Complete CSS Build System**:
  - CSS Variables for semantic tokens (`--semantic-` prefix)
  - CSS Variables for foundation tokens (`--foundation-` prefix)
  - CSS Classes for typography (`.typography-` classes)
  - CSS Classes for elevation (`.elevation-` classes)
- **Custom Style Dictionary formats**:
  - `css/semantic-variables` - CSS variables for semantic
  - `css/foundation-variables` - CSS variables for foundation
  - `css/typography-classes` - CSS classes for typography
  - `css/elevation-classes` - CSS classes for elevation
- **generate-css-classes.mjs** - Script to generate CSS classes
- **CSS platforms** integrated into build system
- **Organized CSS structure** by layers (semantic/, foundation/)

### Changed
- Build system integrated with CSS generation
- `base-config.mjs` with new formats and platforms
- `build.mjs` with complete CSS pipeline
- Tests updated to validate CSS

## [1.2.1] - 2025-01-10

### Added
- **CSS Build Implementation Plan** in documentation
- Detailed strategy for CSS implementation
- Approach for CSS Typography and Elevation Styles
- CSS structure organized by layers
- Distinction between CSS variables and CSS classes

### Changed
- Phase 2 goals updated with CSS as priority
- Documentation expanded with implementation plan

## [1.2.0] - 2025-01-10

### Added
- **Complete TECHNOLOGY EXPORT MATRIX**
- Detailed documentation of active and configured technologies
- **6 active technologies**: JSON, ES Modules, CommonJS, TypeScript, CSS, CSS Classes
- **3 configured technologies**: SCSS Variables, TypeScript ESM, CSS Variables
- **File structure** visualized
- **Usage examples** for JavaScript/TypeScript and JSON
- **Technology Roadmap** with immediate and future priorities
- **Updated metrics** with technology coverage

### Changed
- Documentation significantly expanded
- Technology roadmap defined
- Project metrics updated

## [1.1.0] - 2025-01-10

### Added
- **Automatic index files generation**:
  - `index.d.ts` - TypeScript declarations for semantic and foundation
  - `index.mjs` - ES modules index for semantic and foundation
- **Complete TypeScript support** with IntelliSense
- **Automatic import/export** of all themes
- **Type safety** for semantic and foundation tokens

### Changed
- `build-components.js` converted to ES modules
- Removed generation of `index.js` (CommonJS) and `index.d.mts` (TypeScript ESM)
- Focus on ES modules for components

### Removed
- Unnecessary CommonJS file generation
- TypeScript ESM declarations dependencies

## [1.0.1] - 2025-01-10

### Added
- **Complete ES Modules support** (ESM)
- `package.json` with `"type": "module"`
- **Build system** with npm scripts
- **Dependencies** Style Dictionary and SD Transforms
- **Repository** and project metadata

### Changed
- `build-components.js` converted from CommonJS to ES modules
- Build system modernized for current Node.js
- Native `import`/`export` compatibility

### Removed
- CommonJS dependency (`require`/`module.exports`)
- Legacy build configurations

## [1.0.0] - 2025-01-10

### Added
- **Initial release** of design tokens system
- **Complete token architecture**:
  - Semantic tokens (raw values)
  - Foundation tokens (aliases for semantic)
  - Component tokens (22 components)
- **Multi-platform output**:
  - JSON format
  - ES Modules (.mjs)
  - CommonJS (.cjs)
  - TypeScript declarations (.d.ts)
- **Theme system**:
  - theme_engine-light-positive
  - theme_engine-light-negative
  - aplica_joy, aplica_tangerine, aplica_grinch variants
- **Build system** with Style Dictionary
- **Custom transformations** for font-weight
- **Organized folder structure**
- **Initial project documentation**

