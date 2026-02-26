# Theme Engine – Gradient Configuration

This guide explains how to **enable, configure, and generate** gradient tokens in the theme engine. Gradients are defined once in a central config and then flow through brand themes, mode/surface layers, and semantic tokens.

---

## 1. What are gradients in this system?

Gradients are **linear gradient tokens** used for backgrounds (brand, interface, product). The system:

- Defines **angles** (e.g. horizontal, diagonal) and **steps** (0–100) in a single config.
- Builds **composites** (e.g. `first`, `second`, `third`) from brand colors and angle/stop definitions.
- Exposes them as **semantic tokens** (`semantic.color.gradient.config`, `semantic.color.gradient.composites`) and in **brand** files (`theme.color.{mode}.gradient`, `_gradients.json`).

**Categories:**

| Category   | Description | Example names |
|-----------|-------------|----------------|
| **Brand** | One gradient per brand color | `first`, `second`, `third` (from `defaultComposites`) |
| **Interface** | Per surface (positive/negative) | `primary`, `secondary`, `link` |
| **Product**   | Per product/surface | e.g. `cfc_primary`, `bancaria_primary` |

The **structure** (which gradient names exist, angles, steps) is **canonical** and shared by all themes. Per-theme configs only allow **overrides** (e.g. different colors), not new gradient shapes or names.

---

## 2. Where to configure gradients

All gradient **structure** and **default behaviour** is configured in:

```
config/themes.config.json
```

Under the **`global`** key you need:

1. **`gradients`** – enable or disable gradient generation.
2. **`gradientConfig`** – angles (degrees), steps, and default composite definitions.

Per-theme configs (`dynamic-themes/configs/*.config.mjs`) **must not** define new gradient structure; they can only override colors or behaviour via `overrides.*`.

---

## 3. Step-by-step configuration

### 3.1 Enable gradients

In `config/themes.config.json`, inside `global`:

```json
{
  "global": {
    "gradients": true
  }
}
```

- **`true`** – theme generator and sync will produce gradient tokens in `_brand.json`, semantic, mode, surface, and `_gradients.json`.
- **`false`** – no gradient sections are generated; existing gradient blocks may be removed by sync.

---

### 3.2 Define angles (degrees)

Gradient direction is controlled by **angle names** and their numeric degree values. In `global.gradientConfig.degrees`:

```json
"gradientConfig": {
  "degrees": {
    "horizontal": 180,
    "vertical": 270,
    "toBottom": 90,
    "diagonalLeft": -45,
    "diagonalRight": 45,
    "diagonalBrand": 135,
    "diagonalBrandAlt": 141
  }
}
```

- Keys (e.g. `horizontal`, `diagonalBrand`) are **names** you reference in composite definitions.
- Values are **degrees** for `linear-gradient(… deg, …)` (0 = to top, 90 = to bottom, 180 = to right, etc.).

You can add or rename keys; then reference them in `defaultComposites` (see below).

---

### 3.3 Define steps (positions)

Stops define **positions** along the gradient (0–100). In `global.gradientConfig.steps`:

```json
"gradientConfig": {
  "steps": [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}
```

These values are used when building composite gradient strings (e.g. `color 0%`, `color 50%`, `color 100%`). The steps are also written to `_gradients.json` for tools (e.g. Figma) that consume numeric tokens.

---

### 3.4 Define default composites (brand gradients)

**Composites** are the actual gradient definitions: angle + list of stops (position + color key). They are defined in `global.gradientConfig.defaultComposites`:

```json
"gradientConfig": {
  "defaultComposites": {
    "first": {
      "angleKey": "horizontal",
      "stops": [
        { "position": 0, "colorKey": "lowest" },
        { "position": 100, "colorKey": "default" }
      ]
    },
    "second": {
      "angleKey": "diagonalBrandAlt",
      "stops": [
        { "position": 0, "colorKey": "lowest" },
        { "position": 50, "colorKey": "default" },
        { "position": 100, "colorKey": "highest" }
      ]
    },
    "third": {
      "angleKey": "diagonalBrand",
      "stops": [
        { "position": 0, "colorKey": "lowest" },
        { "position": 100, "colorKey": "default" }
      ]
    }
  }
}
```

- **Key** (e.g. `first`, `second`, `third`) – name of the composite; usually one per brand color.
- **`angleKey`** – must match a key in `gradientConfig.degrees` (e.g. `horizontal` → 180).
- **`stops`** – array of `{ position, colorKey }`:
  - **`position`** – should be one of the values in `gradientConfig.steps` (0–100).
  - **`colorKey`** – one of `lowest`, `default`, `highest` (repertoire levels). These map to theme colors (e.g. `theme.color.{mode}.brand.branding.first.lowest.background`).

The generator builds `linear-gradient({angle}deg, {colorLowest} 0%, {colorDefault} 50%, …)` from this config and the theme's brand colors.

---

### 3.5 Include `_gradients.json` in brand files

So that gradient config (degrees, steps) is emitted per theme and consumed by the build/Figma, `global.brandFiles.default` must include `_gradients.json`:

```json
"global": {
  "brandFiles": {
    "default": [
      "_primitive_theme.json",
      "_grayscale.json",
      "_brand.json",
      "_typography.json",
      "_borders.json",
      "_gradients.json"
    ]
  }
}
```

If `_gradients.json` is missing from this list, the build may not include the gradient config tokens for that theme.

---

## 4. How gradients flow (pipeline)

Understanding the order of steps helps avoid "missing gradients" in semantic or brand files.

1. **Config** – You edit `config/themes.config.json` (`global.gradients`, `global.gradientConfig`).
2. **Theme generation** – Running **`npm run themes:generate`** (or `generate-all-themes.mjs`) generates for each theme:
   - **`data/brand/{theme}/_brand.json`** – includes `theme.color.light.gradient` and `theme.color.dark.gradient` (configColor, interface, product).
   - **`data/brand/{theme}/_gradients.json`** – numeric degrees and steps from `gradientConfig` (for Figma/tooling).
3. **Sync architecture** – Running **`npm run sync:architecture`** reads the generated `_brand.json` files, discovers gradient names and structure, and updates:
   - **`data/mode/light.json`** and **`data/mode/dark.json`** – `mode.gradient.{light|dark}.*`
   - **`data/surface/positive.json`** and **`data/surface/negative.json`** – `surface.color.gradient.*` (including configColor refs to theme).
   - **`data/semantic/default.json`** – **`semantic.color.gradient.config`** (degrees, steps, colors) and **`semantic.color.gradient.composites`** (linear-gradient strings built from config).

**Important:** Run **themes:generate** first so that `_brand.json` contains gradient sections; then run **sync:architecture** so that semantic (and mode/surface) get the gradient blocks. If you run sync before generating themes, discovery may find no gradients; run sync again after themes:generate.

**Recommended:** Use the full pipeline so order is always correct:

```bash
npm run build:themes
```

This runs `ensure:data` → `themes:generate` → `dimension:generate` → **`sync:architecture`** → `foundations:generate` → `build:all`.

---

## 5. Summary checklist

| Step | Action |
|------|--------|
| 1 | Set **`global.gradients`** to `true` in `config/themes.config.json`. |
| 2 | Define **`global.gradientConfig`**: `degrees`, `steps`, `defaultComposites`. |
| 3 | Ensure **`global.brandFiles.default`** includes **`_gradients.json`**. |
| 4 | Run **`npm run themes:generate`** to generate `_brand.json` and `_gradients.json` per theme. |
| 5 | Run **`npm run sync:architecture`** to propagate gradients to mode, surface, and **semantic** (`semantic.color.gradient`). |
| 6 | (Optional) In **`data/$themes.json`**, add **`brand/{theme}/_gradients`** to `selectedTokenSets` for each theme so Figma/consumers load gradient tokens. |

---

## 6. Disabling gradients

To turn gradients off:

1. Set **`global.gradients`** to **`false`** in `config/themes.config.json`.
2. Run **`npm run themes:generate`** and then **`npm run sync:architecture`**.

Sync will remove gradient sections from semantic, mode, and surface when `gradients` is false.

---

## 7. Per-theme overrides (no structure changes)

Theme configs (`dynamic-themes/configs/*.config.mjs`) **must not** define new gradient structure (new composite names or new angle keys). They can only:

- Override **colors** or behaviour via **`overrides.*`** (e.g. override a specific semantic or brand color that is then used by the gradient refs).

The canonical gradient **structure** (names, angles, steps) is defined only in **`config/themes.config.json`** and in **`dynamic-themes/schemas/architecture-schema.mjs`** (e.g. `GRADIENT_SCHEMA.defaultBrandNames`, default interface/product names).

---

## 8. Related files and references

| File or path | Role |
|--------------|------|
| **`config/themes.config.json`** | Single place for `global.gradients` and `global.gradientConfig` (degrees, steps, defaultComposites). |
| **`data/brand/{theme}/_brand.json`** | Contains `theme.color.{light,dark}.gradient` (configColor, interface, product). Generated; do not edit by hand. |
| **`data/brand/{theme}/_gradients.json`** | Numeric degrees and steps per theme (Figma/tooling). Generated by sync. |
| **`data/semantic/default.json`** | Contains `semantic.color.gradient.config` and `semantic.color.gradient.composites`. Updated by sync. |
| **`data/mode/*.json`**, **`data/surface/*.json`** | Gradient refs to theme; updated by sync. |
| **`dynamic-themes/schemas/architecture-schema.mjs`** | `GRADIENT_SCHEMA`: default names, repertoire levels, etc. |
| **`dynamic-themes/scripts/sync-architecture.mjs`** | Discovers gradients from `_brand.json`, writes semantic/mode/surface and `_gradients.json`. |
| **`dynamic-themes/scripts/theme-generator.mjs`** | Builds `theme.color.{mode}.gradient` in `_brand.json` from config and theme colors. |

- **Portuguese version:** **`docs/pt-br/#11 Theme Engine - Configuração de Gradientes.md`**
- **Context (agents / technical overview):** **`docs/context/DYNAMIC_THEMES.md`** (Gradients section), **`docs/context/GRADIENT_PLAN_REFERENCE.md`** (canonical config + reference folder). **`AI_CONTEXT.md`** points to this guide (#11) and to DYNAMIC_THEMES.
- For comparison with the Aplica upstream and branch strategy, see **`docs/comparacao-remotes-aplica-gradiente.md`** (if present).
