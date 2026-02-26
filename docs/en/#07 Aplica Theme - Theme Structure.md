# Aplica Theme - Theme Structure

This document describes the **actual folder and file structure** of the theme consumable by Tokens Studio in Figma, as found in `data/aplica-theme/` in this repository. A variant `data/aplica-theme-with-extensions/` exists with the same structure plus **Tokens Studio Extensions** (e.g. dark mode via `modify`/mix) in the aplica_joy brand and a **figma-generators/** folder with `_generator-dimension.json`. For layer concepts and architecture, see [#01 Complete Technical Architecture](%2301%20Aplica%20Theme%20Engine%20-%20Complete%20Technical%20Architecture.md) and [#05 Technical Reference](%2305%20Aplica%20Theme%20Engine%20-%20Technical%20Reference.md).

---

## File tree (data/aplica-theme)

```
data/aplica-theme/
├── $metadata.json
├── $themes.json
├── $themes.engine.json.template
│
├── foundation/
│   ├── engine/
│   │   ├── default.json
│   │   ├── styles/
│   │   │   ├── elevation_styles.json
│   │   │   └── typography_styles.json
│   │   └── .validation/
│   │       ├── engine.validation.json
│   │       └── engine.validation.txt
│   └── sample/
│       ├── default.json
│       ├── styles/
│       │   ├── elevation_styles.json
│       │   └── typography_styles.json
│       └── .validation/
│           ├── sample.validation.json
│           └── sample.validation.txt
│
├── semantic/
│   └── default.json
│
├── surface/
│   ├── positive.json
│   └── negative.json
│
├── mode/
│   ├── light.json
│   └── dark.json
│
├── dimension/
│   └── normal.json
│
└── brand/
    ├── aplica_joy/
    │   ├── _brand.json
    │   ├── _grayscale.json
    │   ├── _primitive_theme.json
    │   ├── _borders.json
    │   ├── _typography.json
    │   ├── _gradients.json
    │   └── $meta.json
    ├── aplica_tangerine/
    │   ├── _brand.json
    │   ├── _grayscale.json
    │   ├── _borders.json
    │   ├── _typography.json
    │   ├── _gradients.json
    │   └── $meta.json
    ├── aplica_grinch/
    │   ├── _brand.json
    │   ├── _grayscale.json
    │   ├── _borders.json
    │   ├── _typography.json
    │   ├── _gradients.json
    │   └── $meta.json
    └── theme_engine/
        ├── _brand.json
        ├── _grayscale.json
        ├── _primitive_theme.json
        ├── _borders.json
        ├── _typography.json
        ├── _gradients.json
        └── $meta.json
```

---

## Control files

### $metadata.json

- **tokenSetOrder:** Defines the order in which Tokens Studio loads token sets. This order affects how references between sets are resolved.
- Typical order: foundation (engine and sample) → semantic → surface → mode → brand (per brand) → dimension → validation sets.

### $themes.json

- List of **themes** (modes/combinations) shown in the plugin.
- Each entry has: `name`, `group`, `selectedTokenSets` (which sets are `enabled` or `source`), and optionally Figma collection/mode IDs.
- Example groups: `foundation`, `semantic`, `surface`, `mode`, `dimension`, `brand`. Brand themes (aplica_joy, aplica_tangerine, aplica_grinch, theme_engine) select the corresponding brand sets.

---

## Conventions

- **Files with `_` prefix:** Structural tokens (e.g. `_brand`, `_grayscale`, `_primitive_theme`, `_borders`, `_typography`, `_gradients`). They organize the theme in Tokens Studio; they are not part of an external build pipeline in this repo.
- **$meta.json (per brand):** Brand metadata (e.g. name, description). One per folder under `brand/`.
- **Foundation engine vs sample:** Two foundation sets: `engine` is the main set; `sample` is an example set. Both have `default.json`, `styles/` (elevation_styles, typography_styles), and optionally `.validation/`.

---

## Flow in Tokens Studio

1. **Set order:** The plugin loads files in the order defined in `$metadata.json` (`tokenSetOrder`). References such as `{theme.color.dark.interface...}` are resolved from the brand sets active in the selected theme.
2. **Themes:** In `$themes.json`, each theme defines which token sets are enabled. For example, the "aplica_joy" theme uses the sets under `brand/aplica_joy/` as source; "light" and "dark" use `mode/light` and `mode/dark`.
3. **Source vs enabled:** A set as `source` provides base values; sets as `enabled` override or extend. This is how light/dark and positive/negative combinations are built.

---

## Per-brand differences

| Brand            | _primitive_theme | Note                                                |
|------------------|------------------|-----------------------------------------------------|
| aplica_joy       | Yes              | Has primitive palettes (e.g. for dark mode)        |
| theme_engine     | Yes              | Template/base with primitive theme                  |
| aplica_tangerine | No               | Colors come from _brand and _grayscale              |
| aplica_grinch    | No               | Colors come from _brand and _grayscale              |

---

## Cross-references

- **Layers and concepts:** [#01 Complete Technical Architecture](%2301%20Aplica%20Theme%20Engine%20-%20Complete%20Technical%20Architecture.md), [#03 Core Architecture](%2303%20Aplica%20Theme%20Engine%20-%20Core%20Architecture.md).
- **Formulas, token types, surface inversion:** [#05 Technical Reference](%2305%20Aplica%20Theme%20Engine%20-%20Technical%20Reference.md).
- **Using in Figma and implementation:** [#04 Implementation Guide](%2304%20Aplica%20Theme%20Engine%20-%20Implementation%20Guide.md).

This document focuses on **what exists in which folder**; the technical docs cover the meaning of layers and tokens.
