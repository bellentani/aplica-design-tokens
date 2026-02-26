# Tokens-free generation (make-tokens-free)

This document describes how the **tokens-free** single-file JSON outputs are built: merge order, naming, and conventions. It is the reference for the script `scripts/make-tokens-free.mjs` and for AI agents working on this repo.

## Purpose

- **Input:** Token sources under `data/aplica-theme/` (brand folders, dimension, mode, surface, semantic, foundation/engine).
- **Output:** One JSON file per combination **theme × mode × surface** in `data/aplica-theme-free/`, plus a default file. Output uses **DTCG (W3C Design Tokens)** notation (`$type`, `$value`, `$description`).

## Command

```bash
npm run make:tokens-free
```

## Clean build

Before writing any file, the script **clears the entire output directory** `data/aplica-theme-free/`. Only the newly generated files (and the default) remain. There is no incremental build.

## Base file

The script needs a base JSON (global tokens, structure). It is resolved in this order:

1. `data/tokens-aplica-default.json` (if present)
2. `data/tokens-aplica-boilerplate.json` (fallback)

Because the output dir is cleared first, the base is always read from `data/`, not from `data/aplica-theme-free/`.

## Merge order

### Phase 1 — Per theme (brand folder)

For each folder in `data/aplica-theme/brand/{themeName}/`, the script builds a **theme base** by merging in this **strict order** (missing files are skipped; `$meta` and meta files are never merged):

1. **\_primitive_theme.json** (when present)
2. **\_grayscale.json**
3. **dimension/normal.json** (`data/aplica-theme/dimension/normal.json`)
4. **\_borders.json**
5. **\_typography.json**
6. **\_gradients.json**
7. **\_brand.json**

### Phase 2 — Per combination (mode × surface)

For each pair `(mode, surface)`, the theme base is cloned and the following are merged in order:

8. **mode** — content from `data/aplica-theme/mode/{mode}.json` (e.g. `light.json`, `dark.json`)
9. **surface** — content from `data/aplica-theme/surface/{surface}.json` (e.g. `positive.json`, `negative.json`)
10. **semantic** — `data/aplica-theme/semantic/default.json` → `content.semantic`
11. **foundation/engine** — `data/aplica-theme/foundation/engine/default.json` plus all JSON files in `foundation/engine/styles/` (e.g. `elevation_styles.json`, `typography_styles.json`) merged into `content.foundation`

Then references are normalized and the result is written.

## Output file names

- **Pattern:** `tokens-free-{themeName}-{mode}-{surface}.json`
- **Examples:**
  - `tokens-free-aplica_grinch-light-positive.json`
  - `tokens-free-aplica_grinch-light-negative.json`
  - `tokens-free-aplica_grinch-dark-positive.json`
  - `tokens-free-aplica_grinch-dark-negative.json`
  - (and the same for `aplica_joy`, `aplica_tangerine`, `theme_engine`)

Modes and surfaces are derived from the JSON file names in `data/aplica-theme/mode/` and `data/aplica-theme/surface/` (without `.json`).

## Conventions

- **Mood:** The base may contain `global.color.mood`; the script **removes** it from the output so that generated files match the actual system (interfaces de produto), not the legacy mood concept.
- **DTCG notation:** The output keeps W3C Design Tokens format: `$type`, `$value`, `$description`. The script does not convert these to `type`/`value` in the written JSON.
- **Meta:** `$meta` and meta-only files are never merged into the output.

## Files touched

| Path | Role |
|------|------|
| **scripts/make-tokens-free.mjs** | Single script that performs clean, Phase 1, Phase 2, and write. |
| **data/aplica-theme-free/** | Output directory; cleared at each run, then filled with `tokens-free-*-*-*.json` only. |

## Reference (plan)

This behavior was defined in the plan *Mood removal + surface/mode/semantic/foundation + clean build* and implemented so that:

1. Only the desired themes (from `brand/`) and mode/surface combinations are present after each run.
2. Output is aligned with `data/aplica-theme/brand/` (no mood; DTCG).
3. Each file is self-contained with global, dimension, _color-palette, theme, mode, surface, semantic, and foundation.
