# Theme Engine – Configuring Themes and Foundations

This guide explains **step-by-step** how to configure new themes and foundations in the Aplica Tokens Theme Engine. It is intended for anyone working on projects that use this token system.

---

## Table of Contents

1. [Overview: Themes vs Foundations](#1-overview-themes-vs-foundations)
2. [Pipeline and Scripts](#2-pipeline-and-scripts)
3. [Configuration Files Reference](#3-configuration-files-reference)  
   - [Gradients (optional)](#34-gradients-optional)
4. [Step-by-Step: Adding a New Theme](#4-step-by-step-adding-a-new-theme)
5. [Step-by-Step: Changing or Adding a Foundation](#5-step-by-step-changing-or-adding-a-foundation)
6. [Step-by-Step: Full Build Pipeline](#6-step-by-step-full-build-pipeline)
7. [When to Run Sync Architecture](#7-when-to-run-sync-architecture)
8. [Quick Reference](#8-quick-reference)

---

## 1. Overview: Themes vs Foundations

### Themes (Brands)

- **What they are**: Color systems and semantic tokens for a **brand** (e.g. aplica_joy, aplica_grinch, theme_engine).
- **Where they are defined**: One **theme config** per theme in `dynamic-themes/configs/` (e.g. `aplica-joy.config.mjs`).
- **What they generate**: Files under `data/brand/{theme_name}/`:
  - `_primitive_theme.json`, `_grayscale.json`, `_brand.json`, `_typography.json`, `_borders.json`, optionally `_ui.json`.
- **Build output**: The build combines each theme with **mode** (light/dark) and **surface** (positive/negative) to produce final token files (e.g. `aplica_joy-light-positive.json`) in `dist/`.

### Foundations

- **What they are**: **Alias** tokens that point to semantic tokens. They define a stable API for consumers (e.g. `foundation.bg.primary`, `foundation.border.feedback.info.default`).
- **Where they are defined**: Foundation configs in `dynamic-themes/configs/foundations/` (e.g. `engine.config.mjs`, `sample.config.mjs`).
- **What they generate**: Files under `data/foundation/{foundation_name}/`:
  - `default.json` (foundation tokens)
  - `styles/typography_styles.json`, `styles/elevation_styles.json`
- **Relationship**: Each **theme** is linked to a **foundation** in `config/themes.config.json` (e.g. aplica_joy → engine). The build uses that foundation for that theme.

### Architecture (Mode, Surface, Semantic)

- **mode** (`data/mode/light.json`, `data/mode/dark.json`): References to theme colors for feedback, product, text per mode.
- **surface** (`data/surface/positive.json`, `data/surface/negative.json`): References to theme colors per surface (positive ≈ light context, negative ≈ dark context).
- **semantic** (`data/semantic/default.json`): Resolved semantic layer; references surface/mode and is the source for foundation references.

These files are **synchronized** from the **architecture schema** and reference structure by the script `sync-architecture.mjs`. You do not edit them by hand for structure; you run the sync script and/or change the schema.

---

## 2. Pipeline and Scripts

| Script / Command | Purpose |
|------------------|--------|
| `npm run ensure:data` | Creates `data/` and required subdirs; minimal `data/dimension/normal.json`; foundation styles for engine/sample if missing. Run on fresh clone. |
| `npm run dimension:generate` | Generates `data/dimension/normal.json` from `config/dimension.config.mjs` (referenced in `config/themes.config.json`). |
| `npm run themes:generate` | Reads all `*.config.mjs` in `dynamic-themes/configs/` (excluding subdirs like `foundations/`) and generates `data/brand/{theme}/` for each theme. |
| `npm run themes:single` | Generates a single theme (e.g. `node dynamic-themes/scripts/generate-theme.mjs --config=aplica_joy`). |
| `npm run sync:architecture` | Updates `data/mode/`, `data/surface/`, `data/semantic/`, and `data/foundation/engine/` from the architecture schema and reference rules. **Run after changing schema or when you need reference structure refreshed.** |
| `npm run sync:architecture:test` | Same as sync but does not write files (verify only). |
| `npm run sync:architecture:schema` | Prints current schema (feedback/product items, variants, etc.). |
| `npm run foundations:generate` | Generates all foundations from `dynamic-themes/configs/foundations/*.config.mjs` and their styles (typography_styles, elevation_styles). |
| `npm run foundations:validate` | Validates a foundation file against semantic tokens (e.g. `npm run foundations:validate data/foundation/engine/default.json`). |
| `npm run build:themes` | Full theme pipeline: ensure:data → themes:generate → dimension:generate → sync:architecture → foundations:generate → build:all. |
| `npm run build` or `npm run build:all` | Style Dictionary build: reads `data/` + `config/themes.config.json` and writes `dist/` (JSON, JS, ESM, CSS, etc.). |

**Important**: Theme configs live in `dynamic-themes/configs/` (e.g. `aplica-joy.config.mjs`). The **build** learns **which themes exist** from `config/themes.config.json` (keys of `themes`). So: **add the theme config** in `configs/`, and **add the theme entry** in `config/themes.config.json` if you want it built.

---

## 3. Configuration Files Reference

### 3.1 Theme config (`dynamic-themes/configs/{name}.config.mjs`)

- **Location**: Theme configs must be in the **root** of `dynamic-themes/configs/` (not in subfolders like `foundations/` or `legacy_reference/`). The theme generator only picks up `*.config.mjs` files in that root.
- **Naming**: `{name}.config.mjs` → theme name used in data and build is the **`name`** property (e.g. `name: 'aplica_joy'`). The file name is usually the same as the theme name with hyphens (e.g. `aplica-joy.config.mjs`).
- **Required structure** (see existing configs like `aplica-joy.config.mjs`, `theme-engine.config.mjs`):
  - `name`: string (e.g. `'aplica_joy'`) – must match the key you use in `config/themes.config.json` if you register the theme there.
  - `colors`: object – all hex colors used by this theme (brand, action, feedback, product).
  - `mapping`: object – maps semantic concepts to color keys:
    - `brand`: `first`, `second`, `third` → color keys
    - `interface.function`: `primary`, `secondary`, `link` → color keys
    - `interface.feedback`: `info_default`, `info_secondary`, `success_default`, … → color keys
    - `product`: `promo_default`, `promo_secondary`, … → color keys
  - `options` (optional): `txtOnStrategy`, `uiTokens`, `darkModeChroma`, `accessibilityLevel`, etc.
  - `typography` (optional): font families and weights.
   - `gradients` (optional): gradient definitions per category; part of the token schema. When omitted, a default (solid) gradient is used so mode/surface/semantic refs resolve. See [Gradients (optional)](#gradients-optional) below.

The **architecture schema** (`dynamic-themes/schemas/architecture-schema.mjs`) defines feedback/product **items and variants**. Your theme `colors` and `mapping` must align with that schema (e.g. feedback: info, success, warning, danger; variants: default, secondary).

### 3.2 Build theme list (`config/themes.config.json`)

- **Purpose**: Central list of themes that the **build** uses. Defines which brands are built and which foundation each theme uses.
- **Structure**:
  - `themes`: object – each key is a **theme name** (must match `name` in the theme config and the folder name under `data/brand/`).
    - For each theme you can set:
      - `includePrimitives`: boolean (default true) – whether to include `_primitive_theme.json` in the build.
      - `foundation`: which foundation to use and which files:
        - `brand`: foundation name (e.g. `"engine"`) – folder under `data/foundation/{brand}/`.
        - `files`: e.g. `["default.json", "styles/typography_styles.json", "styles/elevation_styles.json"]`.
  - `global`: `modes`, `surfaces`, `dimension.config`, `brandFiles.default`, **`gradients`** (boolean, default `true`). Set `gradients: false` to disable gradients project-wide (not generated in `/data/`, not in architecture, not in build).

**To add a new theme to the build**: Add an entry under `themes` with the same key as the theme `name` (e.g. `"my_theme"`) and set `foundation` and optionally `includePrimitives`.

### 3.3 Foundation config (`dynamic-themes/configs/foundations/{name}.config.mjs`)

- **Purpose**: Defines the **structure** and **semantic references** of one foundation (e.g. engine, sample).
- **Key fields**:
  - `name`: foundation name (e.g. `'engine'`) – output goes to `data/foundation/{name}/`.
  - `outputPath`: e.g. `'data/foundation/engine/default.json'`.
  - `structure`: sections (bg, border, txt, opacity, sizing, spacing, typography) and items/variants/levels.
  - `references`: maps each foundation token path to a semantic token path (direct mapping or patterns).

See `dynamic-themes/configs/foundations/README.md` and `engine.config.mjs` / `sample.config.mjs` for detailed examples. Foundation **styles** (typography_styles, elevation_styles) are defined in `foundation-styles.shared.mjs` and can be overridden per foundation in the config.

### 3.4 Gradients (optional)

- **Enable/disable project-wide**: In `config/themes.config.json`, set **`global.gradients: false`** to **remove gradients from the whole architecture**. When `false`:
  - Gradients are **not generated** in `data/brand/{theme}/_brand.json`.
  - Sync-architecture **does not add** gradient to `data/mode/`, `data/surface/`, `data/semantic/` (and removes them if present).
  - The build **does not consider** gradient tokens. No gradient in `/data/`, no gradient in the build.
  - **Flow**: Set `global.gradients: false` → run `themes:generate` → run `sync:architecture` → run build.
- **When `global.gradients` is true** (default): Gradients are generated. You can **omit** `gradients` in the theme config; when omitted, a default (solid) gradient is used so mode/surface/semantic refs resolve.
- **Where gradients live in the SSoT** (when enabled): `theme.color.light.gradient` and `theme.color.dark.gradient` in `data/brand/{theme}/_brand.json`. Structure: `theme.color.{mode}.gradient.brand.{name}`, etc.
- **How to configure** (when gradients enabled and you want custom gradients): In the theme config, add a `gradients` object:
  - `gradients.brand`: `{ [name]: { angle: number, stops: [ { position: 0|1|number, colorRef: string } ] } }`. **Standard model**: `first`, `second`, `third` (one per brand color). Example: `gradients.brand.first`, `gradients.brand.second`, `gradients.brand.third`. Each theme defines angle and stops (2 or 3) per gradient. `colorRef` is a path **relative to** `theme.color.{mode}` (e.g. `'brand.branding.first.lowest.background'`).
  - `gradients.interface`: `{ positive: { [name]: { angle, stops } }, negative: { ... } }` (optional).
  - `gradients.product`: `{ positive: { [name]: { angle, stops } }, negative: { ... } }` (optional).
- **Build output** (when enabled): Gradient tokens use W3C-style `$type: "gradient"` and `$value` (array of stops). The Style Dictionary CSS build converts them to `linear-gradient({angle}deg, ...)` in CSS variables. Mode, surface, and semantic layers reference theme gradients and are propagated by `sync:architecture`.

- **⚠️ Gradients in the build output – order matters**: Gradients **only appear** in the build output (CSS/JS) when **`data/semantic/default.json`** has the section **`semantic.color.gradient`**. That section is **not** created by `npm run build`; it is created by **`npm run sync:architecture`**, which reads gradients from `data/brand/*/_brand.json` and writes them to mode, surface, and semantic.  
  **Correct order when using gradients** (`global.gradients: true`):  
  1) `npm run themes:generate` (generates `_brand.json` with gradient).  
  2) **`npm run sync:architecture`** (propagates gradient to semantic).  
  3) `npm run build` (emits gradient variables in dist).  
  Or run **`npm run build:themes`** once (full pipeline including sync).  
  If you only run `npm run build` and gradients are enabled but semantic has no gradient, the build will **warn** (and not fail) and gradients will **not** appear in the output. Fix: run `npm run sync:architecture` (or `npm run build:themes`), then build again.

---

## 4. Step-by-Step: Adding a New Theme

1. **Create the theme config**
   - Add a new file in `dynamic-themes/configs/` named `{theme-name}.config.mjs` (e.g. `my-brand.config.mjs`). The **config file stem** (e.g. `my-brand`) is what you pass to `--config=my-brand` when generating a single theme.
   - Copy an existing config (e.g. `aplica-joy.config.mjs`) and set:
     - `name: 'my_brand'` (use underscores; this will be the folder name under `data/brand/`).
     - `colors`: your hex palette (all keys used in `mapping`).
     - `mapping`: brand, interface.function, interface.feedback, product – must match the architecture schema (see `sync:architecture:schema` or `architecture-schema.mjs`).
   - Adjust `options` and `typography` if needed.

2. **Register the theme for the build**
   - Open `config/themes.config.json`.
   - Under `themes`, add an entry with key equal to your theme `name` (e.g. `"my_brand"`):
     - Set `includePrimitives` (true/false).
     - Set `foundation.brand` (e.g. `"engine"`) and `foundation.files` (same as other themes: default.json + styles).

3. **Run the theme pipeline**
   - From project root:
     - `npm run ensure:data`
     - `npm run dimension:generate`   (if you changed dimension config)
     - `npm run themes:generate`       (generates `data/brand/my_brand/`)
     - `npm run sync:architecture`    (if you changed schema or want refs refreshed)
     - `npm run foundations:generate` (if foundations changed)
     - `npm run build`                 (produces dist files for all themes in themes.config.json)

   Or run the full pipeline once:  
   `npm run build:themes`

4. **Verify**
   - Check `data/brand/my_brand/` for `_brand.json`, `_grayscale.json`, etc.
   - Run `npm run build` and check `dist/` for outputs like `my_brand-light-positive.json` (or the pattern defined in themes.config).

---

## 5. Step-by-Step: Changing or Adding a Foundation

### Changing an existing foundation (e.g. engine)

1. Edit `dynamic-themes/configs/foundations/engine.config.mjs` (structure and/or references).
2. Run:
   - `npm run foundations:generate`  
   This regenerates `data/foundation/engine/default.json` and `data/foundation/engine/styles/*`.
3. Optionally validate:  
   `npm run foundations:validate data/foundation/engine/default.json`
4. Run `npm run build` to regenerate dist.

### Adding a new foundation (e.g. my_foundation)

1. **Create the foundation config**
   - Add `dynamic-themes/configs/foundations/my-foundation.config.mjs`.
   - Copy `engine.config.mjs` or `sample.config.mjs` and set `name`, `outputPath` (e.g. `data/foundation/my_foundation/default.json`), `structure`, and `references`.

2. **Generate the foundation**
   - `npm run foundations:generate`  
   This creates `data/foundation/my_foundation/` and styles (typography_styles, elevation_styles).

3. **Use it for a theme**
   - In `config/themes.config.json`, set the theme’s `foundation.brand` to `"my_foundation"` and keep `foundation.files` consistent (default.json + styles files).

4. **Ensure data and build**
   - If `ensure-data-structure.mjs` only creates styles for `engine` and `sample`, you may need to run `foundations:generate` after adding a new foundation so that `data/foundation/my_foundation/styles/` exists. Then run `npm run build`.

---

## 6. Step-by-Step: Full Build Pipeline

Use this when you want to refresh **everything** from configs (e.g. after clone or after broad changes).

1. **Ensure data structure**  
   `npm run ensure:data`

2. **Dimension**  
   `npm run dimension:generate`

3. **Generate all themes**  
   `npm run themes:generate`

4. **Sync architecture**  
   `npm run sync:architecture`

5. **Generate all foundations**  
   `npm run foundations:generate`

6. **Build**  
   `npm run build`

Or in one go:

```bash
npm run build:themes
```

This runs steps 1–5 and then `build:all`. After that, `dist/` contains the final token outputs (JSON, JS, ESM, CSS, etc.) for every theme in `config/themes.config.json`.

---

## 7. When to Run Sync Architecture

Run `npm run sync:architecture` when:

- You have **changed the architecture schema** (`dynamic-themes/schemas/architecture-schema.mjs`) – e.g. added/removed feedback or product items/variants.
- You want to **refresh reference structure** in mode, surface, semantic, or foundation/engine (e.g. after pulling changes that touched the schema or sync logic).
- You are **adding a new theme** and have already run `themes:generate` – running sync ensures semantic/foundation references stay consistent (usually run as part of `build:themes`).
- **Gradients are enabled** (`global.gradients: true`) and you have run `themes:generate` – sync propagates gradient from `_brand.json` to mode, surface, and **semantic**; without sync, `semantic.color.gradient` does not exist and the build will not emit gradients (it will warn). Run sync (or `build:themes`) then build.

Do **not** edit `data/mode/*.json`, `data/surface/*.json`, `data/semantic/default.json`, or `data/foundation/engine/default.json` by hand for **structure or references**; the sync script overwrites them. Edit the **schema** or the **sync script** instead, then run sync.

---

## 8. Quick Reference

| Task | What to do |
|------|------------|
| Add a new theme | 1) Add `{name}.config.mjs` in `dynamic-themes/configs/`. 2) Add theme in `config/themes.config.json` under `themes`. 3) `npm run build:themes` (or ensure:data → themes:generate → sync:architecture → foundations:generate → build). |
| Change theme colors/mapping | Edit the theme config in `configs/`, then `npm run themes:generate` and `npm run build`. |
| Change foundation structure/refs | Edit foundation config in `configs/foundations/`, then `npm run foundations:generate` and `npm run build`. |
| Add a new foundation | Add `{name}.config.mjs` in `configs/foundations/`, run `npm run foundations:generate`, then point a theme to it in `themes.config.json` if desired. |
| Change feedback/product schema | Edit `dynamic-themes/schemas/architecture-schema.mjs`, then `npm run sync:architecture`, then regenerate themes and foundations and build. |
| Full refresh from configs | `npm run build:themes`. |
| **Gradients not in build output** | Gradients only appear when `data/semantic/default.json` has `semantic.color.gradient`; that section is created by **`sync:architecture`**, not by `build`. Run **`npm run sync:architecture`** (or `npm run build:themes`), then `npm run build`. |
| Verify sync without writing | `npm run sync:architecture:test`. |
| See schema | `npm run sync:architecture:schema`. |

---

## Related documentation

- **Architecture schema**: `dynamic-themes/schemas/architecture-schema.mjs`
- **Foundation configs**: `dynamic-themes/configs/foundations/README.md`
- **Dynamic themes (context)**: `docs/context/DYNAMIC_THEMES.md`
- **Build system**: `docs/context/BUILD_SYSTEM_UPDATE.md`, `docs/context/AGENT_GUIDE.md`
