# Release Files – Modified Files per Version

> **Purpose**: Single source of truth for **which files changed in each version**. Use this when:
> - **Forks** need to merge upstream or update from a specific version.
> - **Other teams** consume this repo and need to know what to re-apply or update.
> - **IA agents** help with updates: read this file to know exactly which paths to touch when upgrading from version X to Y.

**Relationship with CHANGELOG**:  
- **CHANGELOG.md** = *what* changed (narrative, fixes, features).  
- **RELEASE_FILES.md** = *which files* changed (paths). Use both together.

**Creating update bundles for other projects**: See **`UPDATE_BUNDLES_GUIDE.md`** for full instructions (file list, change summary, apply steps, how to avoid breakage). The short steps below are a quick reference; the guide defines bundle format and consumer workflow.

---

## Upgrading another project (quick reference)

When you need to **update a fork, another repo, or a consuming project** to a given version:

1. **Pick the version range** (e.g. from your current tag to `v2.15.1`).
2. **Collect all modified paths**: under each version from your current+1 up to the target, list every path from "Files modified" (and "Added"/"Removed" if present). That set is the **full list of files** that changed.
3. **Per version**: read the short summary (patch/minor description) and "Features" / "Scripts changed" / "Configurations that MUST be updated" so you know what to re-apply (configs, scripts, docs).
4. **Diff/merge**: use the file list to `git diff`, copy files, or merge only those paths. Then run build/tests as in AGENT_GUIDE.

For **v2.15.1** only documentation and version metadata changed; no build scripts, no schema, no theme configs. So updating another project to 2.15.1 is: sync the listed files (or merge doc/version changes) and bump version in that project if it mirrors this one.

---

## How to use (for humans and IA)

- **Updating a fork from vX to vY**: List files under each version from X+1 to Y; those are the paths you need to review, merge, or re-apply.
- **Helping another team upgrade**: Point them to this file and the version range; they can diff/merge only the listed paths.
- **IA doing automated updates**: For a target version, read the "Files modified" list below that version; suggest or apply changes only to those paths, then re-run build/tests as in AGENT_GUIDE.

---

## Format

For each version we list:

- **Files modified**: Paths (relative to repo root) that were added, changed, or removed in that release.
- Optionally **Features / summary**, **Configurations that MUST be updated**, **Complete list of files modified** (copy-paste block), and **Added** / **Removed** when it helps.

**To get ALL files that changed between two versions** (e.g. for updating another project): collect every path from "Files modified" (and "Complete list" if present) for each version from *your current + 1* through *target version*. Merge into one set (no duplicates). Those paths are exactly what you need to diff, merge, or re-apply.

When **you release a new version**, add a new `## [X.Y.Z]` section at the top with the list of modified files (e.g. from `git diff --name-only <previous-tag>..HEAD` or your release process).

---

## [2.15.2] - 2026-02-20

**Patch:** UPDATE_BUNDLES_GUIDE (scope: dynamic-themes vs transformers, step-by-step). RELEASE_FILES: added [2.14.0] to fill gap; "Upgrading another project" and format. Version 2.15.1 → 2.15.2.

### Scope for this version

- **Docs/context only** – No dynamic-themes or transformers code changes. Relevant for **both** (shared docs) when applying bundles.

### Files modified

- `package.json` (version 2.15.2)
- `CHANGELOG.md` (2.15.2 entry)
- `docs/context/UPDATE_BUNDLES_GUIDE.md` (new)
- `docs/context/RELEASE_FILES.md` (2.14.0 entry; upgrade section; format)
- `docs/context/INDEX.md` (UPDATE_BUNDLES_GUIDE link; version 2.15.2)
- `docs/context/SUMMARY.md` (version 2.15.2)
- `README.MD` (version highlight 2.15.2)

### Complete list of files modified (copy-paste for diff/merge)

```
package.json
CHANGELOG.md
docs/context/UPDATE_BUNDLES_GUIDE.md
docs/context/RELEASE_FILES.md
docs/context/INDEX.md
docs/context/SUMMARY.md
README.MD
```

---

## [2.15.1] - 2026-02-20

**Patch:** Documentation and release. All project documentation in English; Aplica architecture only (no external project references). Version bump 2.15.0 → 2.15.1. CHANGELOG: all version entries use "Changed" / "Files modified" in English; pt-br doc references removed.

### Features / summary (for other projects)

| Area | What changed |
|------|----------------|
| **Language** | All project docs in English; no Portuguese-only references in CHANGELOG/RELEASE_FILES. |
| **Scope** | References are Aplica architecture only (no external project names). |
| **CHANGELOG** | Intro and every version entry use "Changed" / "Files modified"; pt-br doc links removed. |
| **Version** | package.json version set to 2.15.1. |
| **README** | Top highlight set to "Version 2.15.1 - Documentation in English, Aplica-only". |
| **Override spec** | docs/override-interface-active.md fully in English. |
| **Context docs** | INDEX, RELEASE_FILES, SUMMARY, WORK_PLAN aligned to English and Aplica-only. |

No code, schema, or theme config changes. Safe to merge doc/version only.

### Configurations that MUST be updated

- **None.** No config or build changes in 2.15.1.

### Complete list of files modified (copy-paste for diff/merge)

```
package.json
CHANGELOG.md
README.MD
docs/override-interface-active.md
docs/context/INDEX.md
docs/context/RELEASE_FILES.md
docs/context/SUMMARY.md
docs/context/WORK_PLAN.md
```

### Files modified (with notes)

- `package.json` — version set to 2.15.1
- `CHANGELOG.md` — intro in English; 2.15.1 entry; all older entries translated (Changed / Files modified); pt-br references removed
- `README.MD` — version 2.15.1 highlighted; gradient/test summary
- `docs/override-interface-active.md` — full translation to English
- `docs/context/INDEX.md` — version 2.15.1; English, Aplica-only where relevant
- `docs/context/RELEASE_FILES.md` — this entry; "Upgrading another project" section added
- `docs/context/SUMMARY.md` — status v2.15.1; English, Aplica-only
- `docs/context/WORK_PLAN.md` — English, Aplica-only where relevant

---

## [2.14.0] - 2026-02-14

**Minor:** Override `interface.function.active` – when the theme config sets `overrides.interface.function.active` as a **string (hex)** or **object** `{ surface, txtOn?, border? }`, the generator sets surface, txtOn (WCAG contrast), and border (surface darkened ~20%). New helpers: `rgbToHex`, `darkenHex`; constant `ThemeGenerator.ACTIVE_BORDER_DARKEN_AMOUNT`. Documentation updates for override and Theme Engine Gradients. Non-breaking: config schema unchanged.

### Features / summary (for other projects)

| Area | What changed |
|------|----------------|
| **theme-generator.mjs** | `rgbToHex`, `darkenHex`; `ACTIVE_BORDER_DARKEN_AMOUNT`; override active logic in `generateBehaviorBlock`. |
| **Theme config** | Optional `overrides.interface.function.active` (hex string or object). Example in `theme-engine.config.mjs`. |
| **Docs** | override-interface-active.md, README, DYNAMIC_THEMES, OVERRIDE-BEST-PRACTICES, #04, #09, #11, GRADIENT_PLAN_REFERENCE, AI_CONTEXT, INDEX, SUMMARY. |

### Configurations that MUST be updated

- **None.** Optional: add `overrides.interface.function.active` in theme configs if you want custom active state colors.

### Complete list of files modified (copy-paste for diff/merge)

```
package.json
CHANGELOG.md
dynamic-themes/scripts/theme-generator.mjs
dynamic-themes/configs/theme-engine.config.mjs
docs/override-interface-active.md
dynamic-themes/README.md
docs/context/DYNAMIC_THEMES.md
docs/context/WORK_PLAN.md
docs/context/SUMMARY.md
docs/context/RELEASE_FILES.md
docs/context/INDEX.md
docs/en/#09
docs/en/#04
dynamic-themes/reference/OVERRIDE-BEST-PRACTICES.md
AI_CONTEXT.md
docs/context/GRADIENT_PLAN_REFERENCE.md
docs/en/#11
```

### Files modified (with notes)

- `package.json` — version 2.14.0
- `CHANGELOG.md` — 2.14.0 entry
- `dynamic-themes/scripts/theme-generator.mjs` — rgbToHex, darkenHex; ACTIVE_BORDER_DARKEN_AMOUNT; override active in generateBehaviorBlock
- `dynamic-themes/configs/theme-engine.config.mjs` — example overrides.interface.function.active
- `docs/override-interface-active.md` — implementation status
- `dynamic-themes/README.md` — overrides + Interface function active; Gradients + links #11
- `docs/context/DYNAMIC_THEMES.md` — override active; Gradients see-also #11
- `docs/context/WORK_PLAN.md`, `SUMMARY.md`, `RELEASE_FILES.md`, `INDEX.md`
- `docs/en/#09`, `docs/en/#04` — override interface.function.active
- `dynamic-themes/reference/OVERRIDE-BEST-PRACTICES.md` — section 2.2 Interface function active
- `AI_CONTEXT.md` — override-interface-active + Theme Engine Gradients #11
- `docs/context/GRADIENT_PLAN_REFERENCE.md`, `docs/en/#11` — gradient refs

---

## [2.13.8] - 2026-02-15

**Patch:** Surface opacity fix – `surface.opacity.color.light` now uses white base (`rgba(255,255,255,α)`), `surface.opacity.color.dark` uses black base (`rgba(0,0,0,α)`). Regenerate surface via `sync:architecture` or `build:themes`. No config changes.

### Scripts changed (summary for other projects)

| File | What changed |
|------|--------------|
| **dynamic-themes/scripts/sync-architecture.mjs** | `generateSurfaceOpacity()`: `stubColorDark(alpha)` → `rgba(0,0,0,α)`, `stubColorLight(alpha)` → `rgba(255,255,255,α)`. Dark uses dark stub, light uses light stub. |

### Configurations that MUST be updated

- **None.** Run `npm run sync:architecture` (or `build:themes`) to regenerate surface JSONs.

### Files modified

- `package.json` (version 2.13.8)
- `CHANGELOG.md` (2.13.8 entry; scripts + no config changes)
- `dynamic-themes/scripts/sync-architecture.mjs` (generateSurfaceOpacity: stubColorDark / stubColorLight)
- `docs/context/RELEASE_FILES.md` (this entry)
- `docs/context/INDEX.md` (version 2.13.8)

### Data (regenerated by sync:architecture)

- `data/surface/positive.json` (opacity.color.light = white base, opacity.color.dark = black base)
- `data/surface/negative.json` (idem)

---

## [2.13.7] - 2026-02-15

**Patch:** foundation.neutralsSource (choose which brand color is the base for neutrals per theme); optional per-theme product color overrides. Documentation: scripts changed + configurations that must be updated.

### Scripts changed (summary for other projects)

| File | What changed |
|------|--------------|
| **dynamic-themes/scripts/theme-generator.mjs** | `generateBrandAmbient(mode)`: resolves `neutralsSource` from `config.foundation?.neutralsSource ?? 'first'`; uses `neutralsColor = mapping.brand?.[source]` for contrast and neutral. Grayscale unchanged. |

### Configurations that MUST be updated

- **Optional** – To choose the brand color used as the base for neutrals in brand.ambient: add to the theme config `foundation: { neutralsSource: 'first' }` (or `'second'`, `'third'`, `'fourth'`). Omit = default `'first'`.
- **Optional** – For different product colors per theme: define the full set of product_* colors inline in `colors` and mapping.product.
- **No mandatory changes** for existing themes that do not use these options.

### Files modified

- `package.json` (version 2.13.7)
- `CHANGELOG.md` (2.13.7 entry; scripts + configs that must be updated)
- `dynamic-themes/scripts/theme-generator.mjs` (generateBrandAmbient: foundation.neutralsSource; neutralsColor)
- Theme configs (foundation.neutralsSource; optional product overrides)
- `docs/context/RELEASE_FILES.md` (this entry)
- `docs/context/INDEX.md` (version 2.13.7)

### Data (regenerated by themes:generate)

- `data/brand/*/_brand.json` (regenerate with themes:generate)

---

## [2.13.6] - 2026-02-15

**Scripts:** (1) Palette level 100 = declared hex (no OKLCH). (2) Brand mapping = same keys as config.colors (brand_first, …) so cache lookup matches. **Goal:** declared colors and overrides preserved; brand.ambient without #000000. Documentation focused on **script changes** and **features for upgrading other projects** (theme configs do not require additional doc).

### Scripts changed (summary for other projects)

| File | What changed |
|------|--------------|
| **dynamic-themes/scripts/color-decomposer.mjs** | `generatePalette()`: for `level === 100`, `surface[100] = baseHex` (skip `generateColorWithLightness`). Other levels unchanged. |
| **dynamic-themes/schemas/architecture-schema.mjs** | `getBrandMapping()` returns `first: 'brand_first'`, `second: 'brand_second'`, `third: 'brand_third'`, `fourth: 'brand_fourth'` (previously: brand_primary, …). Aligns cache read key with write key (config.colors). |

### Features compared / upgrade

- **Declared colors**: `config.colors` (brand, action, etc.) and overrides are no longer altered by the OKLCH pipeline at default level (100). Regenerate themes after upgrading.
- **Brand ambient / neutrals**: Cache and mapping use the same keys (`brand_first`, …). Configs must use these keys in `colors` and in `mapping.brand` (via `getBrandMapping()`). No config changes if already correct.
- **Full detail**: See `CHANGELOG.md` [2.13.6] (Scripts changed table + Features compared).

### Files modified

- `package.json` (version 2.13.6)
- `CHANGELOG.md` (2.13.6 entry; script changes + features for other projects)
- `dynamic-themes/scripts/color-decomposer.mjs` (generatePalette: surface[100] = baseHex for level 100)
- `dynamic-themes/schemas/architecture-schema.mjs` (getBrandMapping: brand_first, brand_second, brand_third, brand_fourth)
- `docs/context/RELEASE_FILES.md` (this entry)
- `docs/context/INDEX.md` (version 2.13.6)

### Data (regenerated by themes:generate)

- `data/brand/*/_brand.json` (brand.branding.*.default.background = declared hex; brand.ambient neutrals correct when mapping aligned)

---

## [2.13.5] - 2026-01-26

Typography styles: schema in dynamic-themes/schemas; content in config/foundationTypography.config.json. Generator uses schema; reference/typography_styles.json superseded by config.

### Files modified

- `package.json` (version 2.13.5)
- `CHANGELOG.md` (2.13.5 entry)
- `config/foundationTypography.config.json` (Added – typography styles content; schema loads it)
- `dynamic-themes/schemas/typography-styles-schema.mjs` (canonical path → config/foundationTypography.config.json)
- `dynamic-themes/scripts/generate-foundation-styles.mjs` (typography from schema; loads config)
- `dynamic-themes/configs/foundations/foundation-styles.shared.mjs` (comments: typography from schema + config)
- `dynamic-themes/reference/FOUNDATION-SPEC.md` (typography: schema + config)
- `transformers/schemas/foundation-styles-schema.mjs` (typography validation recursive; categories)
- `docs/context/INDEX.md` (version 2.13.5; typography content in config)
- `docs/context/SUMMARY.md` (v2.13.5; typography schema + config)
- `docs/context/WORK_PLAN.md` (v2.13.5 recent release)
- `docs/context/RELEASE_FILES.md` (this entry)
- `AI_CONTEXT.md` (Key Files: foundationTypography.config.json, typography-styles-schema)

### Data (regenerated)

- `data/foundation/engine/styles/typography_styles.json` (from config via schema)

---

## [2.13.4] - 2026-01-26

Test suite: paths and structure aligned with current `dist/` layout; tests run from project root; no re-run of full build in tests (avoids OOM). All 20 tests pass.

### Files modified

- `package.json` (version 2.13.4)
- `CHANGELOG.md` (2.13.4 entry)
- `transformers/test-build.js` (PROJECT_ROOT, DIST_DIR, distPath(); cwd PROJECT_ROOT; paths dist/json, dist/esm, dist/css, foundation/engine; MJS semantic wrapper; consistency JSON vs MJS; Foundation CSS refs; index paths; Build tests verify files only)
- `docs/context/INDEX.md` (version 2.13.4)
- `docs/context/SUMMARY.md` (v2.13.4; test suite)
- `docs/context/WORK_PLAN.md` (v2.13.4 recent release)
- `docs/context/RELEASE_FILES.md` (this entry)

---

## [2.13.3] - 2026-01-26

Gradient architecture: canonical config in **config/themes.config.json** (`global.gradientConfig`: degrees, steps, defaultComposites). Per-theme configs only overrides; gradients built in semantic (config + composites using config vars). Mode no configColor; surface refs theme directly; composites use refs to config.degrees and config.steps.

### Files modified

- `package.json` (version 2.13.3)
- `CHANGELOG.md` (2.13.3 entry)
- `config/themes.config.json` (_comment_gradient; gradientConfig.defaultComposites)
- `AI_CONTEXT.md` (Key Files: gradientConfig reference)
- `dynamic-themes/schemas/architecture-schema.mjs` (GRADIENT_SCHEMA comment: structure from schema + themes.config; configs only overrides)
- `dynamic-themes/scripts/theme-generator.mjs` (generateGradients from themes.config defaultComposites; no config.gradients; interface/product color refs; stub without brand gradient)
- `dynamic-themes/scripts/sync-architecture.mjs` (generateModeGradient no configColor; generateSurfaceGradient configColor refs theme; generateSemanticGradientComposites uses config.degrees/steps refs; semantic gradient = config + composites only)
- `dynamic-themes/configs/aplica-joy.config.mjs` (removed gradients block; comment)
- `dynamic-themes/configs/aplica-grinch.config.mjs` (removed gradients block; comment)
- `dynamic-themes/configs/aplica-tangerine.config.mjs` (removed gradients block; comment)
- `dynamic-themes/configs/theme-engine.config.mjs` (removed gradients block; comment)
- `docs/context/DYNAMIC_THEMES.md` (v2.13.3; gradient structure from themes.config; per-theme only overrides; semantic composites)
- `docs/context/SUMMARY.md` (v2.13.3; gradient architecture)
- `docs/context/INDEX.md` (version 2.13.3)
- `docs/context/GRADIENT_PLAN_REFERENCE.md` (canonical config themes.config.json; composites use config vars)
- `docs/context/WORK_PLAN.md` (v2.13.3 achievements)
- `docs/context/RELEASE_FILES.md` (this entry)
- **Gradient configuration guides (later):** `docs/en/#11 Theme Engine - Gradient Configuration.md` (EN), `docs/pt-br/#11 Theme Engine - Configuração de Gradientes.md` (PT-BR) – full step-by-step setup; INDEX, SUMMARY, DYNAMIC_THEMES, GRADIENT_PLAN_REFERENCE, README reference these.

### Data (regenerated by themes:generate + sync:architecture)

- `data/brand/*/_brand.json` (gradient.configColor only; no gradient.brand; interface/product color refs)
- `data/mode/light.json`, `data/mode/dark.json` (gradient without configColor; interface/product only)
- `data/surface/positive.json`, `data/surface/negative.json` (configColor refs theme; interface/product refs mode)
- `data/semantic/default.json` (gradient.config + gradient.composites; composites use config.degrees/steps refs)
- `data/foundation/engine/default.json`

---

## [2.13.2] - 2026-01-26

Gradient schema: brand gradients are now **first**, **second**, **third** (one per brand color). Schema, theme generator stub, and all theme configs updated; docs and reference aligned.

### Files modified

- `dynamic-themes/schemas/architecture-schema.mjs` (GRADIENT_SCHEMA.defaultBrandNames: ['first', 'second', 'third'])
- `dynamic-themes/scripts/theme-generator.mjs` (generateStubGradients: first, second, third)
- `dynamic-themes/configs/aplica-joy.config.mjs` (gradients.brand.first, .second, .third)
- `dynamic-themes/configs/aplica-grinch.config.mjs` (gradients.brand.first, .second, .third)
- `dynamic-themes/configs/aplica-tangerine.config.mjs` (gradients.brand.first, .second, .third)
- `dynamic-themes/configs/theme-engine.config.mjs` (gradients.brand.first, .second, .third)
- `dynamic-themes/reference/gradient-tokens/README.md` (added – schema standard first/second/third)
- `docs/context/GRADIENT_PLAN_REFERENCE.md` (standard model first/second/third)
- `docs/context/DYNAMIC_THEMES.md` (hero → first, second, third)
- `docs/en/#10 Theme Engine - Configuring Themes and Foundations.md` (gradients.brand.first/second/third)
- `docs/pt-br/#10 Theme Engine - Configurando Temas e Foundations.md` (gradients.brand.first/second/third)
- `README.MD` (gradient variables example: -first, -second, -third)
- `package.json` (version 2.13.2)
- `CHANGELOG.md` (2.13.2 entry)
- `docs/context/RELEASE_FILES.md` (this entry)

### Data (regenerated by themes:generate + sync:architecture)

- `data/brand/*/_brand.json` (gradient.brand.first, .second, .third)
- `data/mode/light.json`, `data/mode/dark.json`
- `data/surface/positive.json`, `data/surface/negative.json`
- `data/semantic/default.json`
- `data/foundation/engine/default.json`

---

## [2.13.1] - 2026-01-26

Gradients only appear in the build output when `data/semantic/default.json` has `semantic.color.gradient`; that section is created by **`sync:architecture`**, not by `build`. This release adds a build-time warning when gradients are enabled but semantic has no gradient, and documents the correct order (themes:generate → sync:architecture → build, or build:themes) in README and context docs.

### Files modified

- `package.json` (version 2.13.1)
- `CHANGELOG.md` (2.13.1 entry)
- `transformers/build.mjs` (checkGradientsBeforeBuild(); warn when global.gradients true and semantic.color.gradient missing)
- `README.MD` (Gradients and build order section; version 2.13.1 note)
- `docs/context/DYNAMIC_THEMES.md` (Gradients and build order (CRITICAL) section; version 2.13.1)
- `docs/context/INDEX.md` (version 2.13.1; "Why don't gradients appear in the build output?" Q&A)
- `docs/context/SUMMARY.md` (current status v2.13.1; gradient flow note)
- `docs/en/#10 Theme Engine - Configuring Themes and Foundations.md` (gradients in build output – order; sync when gradients enabled; quick ref row)
- `docs/pt-br/#10 Theme Engine - Configurando Temas e Foundations.md` (gradients in build output – order; sync when gradients enabled; quick ref row)
- `docs/context/RELEASE_FILES.md` (this entry)

---

## [2.13.0] - 2026-01-30

Gradients are **optional** at two levels:
- **Project-wide**: In `config/themes.config.json`, set `global.gradients: false` to **remove gradients from the whole architecture** (not generated in `/data/`, not in mode/surface/semantic, not in build). Flow: set `global.gradients: false` → `themes:generate` → `sync:architecture` → build.
- **Per-theme** (when `global.gradients` is true): Omit `gradients` in theme config to use a default solid gradient so mode/surface/semantic refs resolve.

### Files modified

- `package.json` (version 2.13.0)
- `CHANGELOG.md` (2.13.0 entry)
- `docs/context/RELEASE_FILES.md` (this entry)
- `config/themes.config.json` (added `global.gradients`, default true)
- `dynamic-themes/schemas/architecture-schema.mjs`
- `dynamic-themes/scripts/theme-generator.mjs` (gradientsEnabled option)
- `dynamic-themes/scripts/generate-all-themes.mjs` (reads global.gradients, passes to generator)
- `dynamic-themes/configs/aplica-joy.config.mjs`
- `dynamic-themes/scripts/sync-architecture.mjs` (empty gradientMap removes gradient from architecture)
- `transformers/base-config.mjs`
- `docs/en/#10 Theme Engine - Configuring Themes and Foundations.md`
- `docs/pt-br/#10 Theme Engine - Configurando Temas e Foundations.md`
- `docs/context/DYNAMIC_THEMES.md`
- `docs/context/GRADIENT_PLAN_REFERENCE.md` (added)
- `dynamic-themes/reference/gradient-tokens/` (added)
- `data/brand/aplica_joy/_brand.json`
- `data/mode/light.json`
- `data/mode/dark.json`
- `data/surface/positive.json`
- `data/surface/negative.json`
- `data/semantic/default.json`

---

## [2.12.7] - 2026-01-30

### Files modified

- `package.json` (version 2.12.7)
- `CHANGELOG.md` (2.12.7 entry)
- `docs/context/RELEASE_FILES.md` (this entry)
- `docs/context/SUMMARY.md` (current status v2.12.7)
- `docs/context/WORK_PLAN.md` (2.12.7 changelog line)
- `docs/en/#01 Theme Engine - Complete Technical Architecture.md`
- `docs/en/#02 Theme Engine - Executive Summary.md`
- `docs/en/#03 Theme Engine - Core Architecture.md`
- `docs/en/#04 Theme Engine - Implementation Guide.md`
- `docs/en/#05 Theme Engine - Technical Reference.md`
- `docs/en/#06 Theme Engine - Tokens Semantics.md`
- `docs/en/#08 Theme Engine - Designer Guide.md`
- `docs/en/#09 Theme Engine - Token Mapping Roadmap.md`
- `docs/en/#10 Theme Engine - Configuring Themes and Foundations.md`
- `docs/pt-br/#01 Theme Engine - Arquitetura Técnica Completa.md`
- `docs/pt-br/#02 Theme Engine - Executive Summary.md`
- `docs/pt-br/#03 Theme Engine - Arquitetura Core.md`
- `docs/pt-br/#04 Theme Engine - Guia de Implementação.md`
- `docs/pt-br/#05 Theme Engine - Referência Técnica.md`
- `docs/pt-br/#06 Theme Engine - Tokens Semantics.md`
- `docs/pt-br/#08 Theme Engine - Guia do Designer.md`
- `docs/pt-br/#09 Theme Engine - Roteiro de Mapeamento de Tokens.md`

### Files added

- `docs/pt-br/#10 Theme Engine - Configurando Temas e Foundations.md`

---

## [2.12.6] - 2026-01-30

### Files modified

- `package.json` (version 2.12.6)
- `CHANGELOG.md` (2.12.6 entry)
- `docs/context/RELEASE_FILES.md` (this entry)
- `docs/context/SUMMARY.md` (current status v2.12.6)
- `docs/context/WORK_PLAN.md` (2.12.6 changelog line)
- `dynamic-themes/scripts/sync-architecture.mjs` (disabled references theme instead of mode fallback)
- `data/surface/positive.json` (regenerated)
- `data/surface/negative.json` (regenerated)
- `data/semantic/default.json` (regenerated)
- `data/mode/light.json` (regenerated)
- `data/mode/dark.json` (regenerated)
- `data/foundation/engine/default.json` (regenerated)

---

## [2.12.5] - 2026-01-30

### Files modified

- `package.json` (version 2.12.5)
- `CHANGELOG.md` (2.12.5 entry)
- `docs/context/RELEASE_FILES.md` (this entry)
- `docs/context/SUMMARY.md` (current status v2.12.5)
- `docs/context/WORK_PLAN.md` (2.12.5 changelog line)
- `data/brand/aplica_grinch/$meta.json`
- `data/brand/aplica_joy/$meta.json`
- `data/brand/aplica_tangerine/$meta.json`
- `data/brand/theme_engine/$meta.json`
- `data/foundation/engine/.validation/engine.validation.json`
- `data/foundation/engine/.validation/engine.validation.txt`
- `data/foundation/sample/.validation/sample.validation.json`
- `data/foundation/sample/.validation/sample.validation.txt`

### Files removed

- `docs/context/FOUNDATION_MISSING_REFERENCES.md`
- `dynamic-themes/output/_brand.json`
- `dynamic-themes/output/_config.json`
- `dynamic-themes/output/_grayscale.json`
- `dynamic-themes/output/_primitive_theme.json`

---

## [2.12.4] - 2026-01-30

### Files modified

- `package.json` (version 2.12.4)
- `transformers/base-config.mjs` (foundation: load only one mode + one surface to avoid token collisions)
- `dynamic-themes/configs/foundations/foundation-styles.shared.mjs` (typography/elevation refs aligned to semantic paths that exist)
- `transformers/build.mjs` (hasComponentsData(); skip components build when data/components missing or has no JSON)
- `data/foundation/engine/styles/typography_styles.json` (regenerated)
- `data/foundation/engine/styles/elevation_styles.json` (regenerated)
- `data/foundation/sample/styles/typography_styles.json` (regenerated)
- `data/foundation/sample/styles/elevation_styles.json` (regenerated)
- `CHANGELOG.md` (2.12.4 entry)
- `docs/context/RELEASE_FILES.md` (this entry)
- `docs/context/SUMMARY.md` (current status v2.12.4)
- `docs/context/WORK_PLAN.md` (2.12.4 changelog line)

---

## [2.12.3] - 2026-01-30

### Files modified

- `package.json` (version 2.12.3)
- `dynamic-themes/scripts/sync-architecture.mjs` (preserve interface.function from template; overwrite only feedback; comments in English)
- `dynamic-themes/reference/semantic-default.full.json` (removed duplicate function block at wrong level)
- `docs/context/FOUNDATION_MISSING_REFERENCES.md` (updated to resolved state; all groups documented)
- `CHANGELOG.md` (2.12.3 entry)
- `docs/context/RELEASE_FILES.md` (this entry)
- `docs/context/SUMMARY.md` (current status v2.12.3)
- `docs/context/WORK_PLAN.md` (2.12.3 changelog line)

---

## [2.12.2] - 2026-01-30

### Files modified

- `package.json` (version 2.12.2; scripts: ensure:data, dimension:generate; build:themes order)
- `config/themes.config.json` (global.dimension.config)
- `config/dimension.config.mjs` (added)
- `dynamic-themes/scripts/generate-dimension.mjs` (added)
- `dynamic-themes/scripts/ensure-data-structure.mjs` (added; PROTECTED_DATA_FILES)
- `dynamic-themes/scripts/sync-architecture.mjs` (writeJsonFile mkdir; update* create full structure when file missing)
- `transformers/build.mjs` (ensure-data at start for all/themes/semantic/foundation/components)
- `docs/context/RULES.md` (protected data files §4; confirm before implementing §6)
- `docs/context/RELEASE_FILES.md` (added)
- `docs/context/AGENT_GUIDE.md` (confirm before implementing; dimension task; version/release task)
- `docs/context/INDEX.md` (RELEASE_FILES; dimension; protected files FAQ)
- `docs/context/LLM_WORKFLOW.md` (propose & confirm; pitfalls)
- `AI_CONTEXT.md` (Release Files link; config/dimension; config/themes.config.json)
- `CHANGELOG.md` (this entry)

---

## [2.12.1] - 2026-01-26

### Files modified

- `transformers/schemas/foundation-styles-schema.mjs` (added)
- `transformers/schemas/` (folder added; schema moved here)
- `transformers/generate-css-classes.mjs` (modified – schema-based extraction)
- `config/schemas.config.mjs` (removed – logic moved to `transformers/schemas/foundation-styles-schema.mjs`)

---

## [2.12.0] - 2026-01-27

### Files modified

- `transformers/build.mjs` (modified – `buildThemes()` uses `generator.generate()`)
- `config/themes.config.json` (modified – foundation "dtc" → "engine")
- Config/theme foundation paths (references updated to `data/foundation/engine/`)

---

## [2.11.1] - 2026-01-22

### Files modified

- `docs/en/#09 Theme Engine - Token Mapping Roadmap.md` (added)
- `docs/pt-br/#09 Theme Engine - Roteiro de Mapeamento de Tokens.md` (added)

---

## [2.11.0] - 2026-01-22

### Files modified

- `docs/en/#08 Theme Engine - Designer Guide.md` (added)
- `docs/pt-br/#08 Theme Engine - Guia do Designer.md` (added)

---

## [2.10.1] - 2026-01-22

### Files modified

- `transformers/build.mjs` (modified – `createFoundationThemeConfig`, `buildFoundation` loading and error handling)
- Foundation config/source loading (all mode/surface combinations)

---

## [2.10.0] - 2026-01-21

### Files modified

- `dynamic-themes/scripts/` (typography generator – explicit weight config)
- `dynamic-themes/configs/aplica-joy.config.mjs`
- `dynamic-themes/configs/aplica-grinch.config.mjs`
- `dynamic-themes/configs/aplica-tangerine.config.mjs`
- `dynamic-themes/configs/theme-engine.config.mjs`
- Generated `_typography.json` structure (semantic weights only)

---

## Older versions

For versions before 2.10.0, see **CHANGELOG.md** for narrative; file lists were not kept in this format. When backfilling is needed, use `git diff --name-only <tag-old>..<tag-new>` between release tags.
