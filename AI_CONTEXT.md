# AI Context — Aplica Design Tokens (this repository)

> **For AI Agents:** This file is the entry point to understand **this** project. Start here.

## What this repository is

- **Design Tokens architecture reference** (Aplica Theme): folder structure, conventions, and documentation for use with [Tokens Studio](https://www.tokens.studio/) in Figma.
- **Not the builder project.** There are no `dynamic-themes/scripts`, `transformers/build.mjs`, `config/*.config.mjs`, or theme-generation scripts. The file `to-update/AI_CONTEXT.md` (if present) describes another project (the builder); **this root AI_CONTEXT.md** describes only this repo.
- **Free and open source (MIT)** for learning, training, and use as a boilerplate; it does not depend on the Aplica Theme Engine.

---

## Data structure

| Path | Content |
|------|---------|
| **data/aplica-theme/** | **Resolved** tokens (all values pre-calculated). Structure consumable by Tokens Studio: foundation, semantic, surface, mode, dimension, brand (aplica_joy, aplica_tangerine, aplica_grinch, theme_engine). |
| **data/aplica-theme-with-extensions/** | Same structure as `aplica-theme`, but uses **Tokens Studio Extensions** (e.g. dark mode via `$extensions.studio.tokens.modify`). Includes `figma-generators/_generator-dimension` and an example config with extensions in `brand/aplica_joy`. |
| **data/aplica-theme-free/** | **Generated** single-file token JSONs: one per theme × mode × surface (e.g. `tokens-free-aplica_joy-light-positive.json`). Built by `npm run make:tokens-free`; see [docs/context/TOKENS_FREE_GENERATION.md](docs/context/TOKENS_FREE_GENERATION.md). Output uses DTCG notation (`$type`, `$value`). Directory is cleared on each run. |
| **docs/** | Architecture documentation in pt-br and en. Includes [Theme Structure (#07)](docs/pt-br/#07%20Aplica%20Theme%20-%20Estrutura%20do%20Tema.md) (file tree and conventions), architecture (#01, #03), implementation (#04), technical reference (#05). |
| **data/tokens-aplica-*.json** | Unified token outputs; documented separately. |

---

## Navigation for AI

- **Context folder (load first):** Agents should load [docs/context/AGENT_GUIDE.md](docs/context/AGENT_GUIDE.md) and [docs/context/RULES.md](docs/context/RULES.md) for operational rules; use [docs/context/INDEX.md](docs/context/INDEX.md) for quick lookup.
- **Changelog:** [CHANGELOG.md](CHANGELOG.md) (root; main changes per version) and [docs/context/CHANGELOG_DETAILED.md](docs/context/CHANGELOG_DETAILED.md) (detailed narrative for AI and feature verification). Update both when releasing or documenting features.
- **Commit messages:** [COMMIT_CONVENTION.md](COMMIT_CONVENTION.md) — project uses Conventional Commits; follow it when suggesting or writing commit messages.
- **Theme structure (what lives where):** [docs/pt-br/#07 Aplica Theme - Estrutura do Tema](docs/pt-br/#07%20Aplica%20Theme%20-%20Estrutura%20do%20Tema.md) and [docs/en/#07 Theme Structure](docs/en/#07%20Aplica%20Theme%20-%20Theme%20Structure.md).
- **Overview and Figma usage:** [README.md](README.md).
- **Architecture and layers:** docs/pt-br/#01, #03, #05 (and docs/en equivalents).

---

## Key files (this repository only)

| File | Role |
|------|------|
| **data/aplica-theme/$metadata.json** | Token set load order (`tokenSetOrder`) for Tokens Studio. |
| **data/aplica-theme/$themes.json** | List of themes (set combinations) exposed in the plugin. |
| **data/aplica-theme/foundation/** | engine/default, engine/styles (elevation_styles, typography_styles), sample/ (same structure). |
| **data/aplica-theme/semantic/default.json** | Semantic layer; references to surface, mode, and dimension. |
| **data/aplica-theme/surface/positive.json**, **negative.json** | Surface contexts (positive/negative). |
| **data/aplica-theme/mode/light.json**, **dark.json** | Light and dark modes; reference `theme.color.light` and `theme.color.dark` from brand sets. |
| **data/aplica-theme/dimension/normal.json** | Dimension scale (sizing, spacing, etc.). |
| **data/aplica-theme/brand/** | One folder per brand (aplica_joy, aplica_tangerine, aplica_grinch, theme_engine); each with _brand, _grayscale, _borders, _typography, _gradients, $meta; joy and theme_engine also have _primitive_theme. |
| **scripts/make-tokens-free.mjs** | Generates `data/aplica-theme-free/tokens-free-{theme}-{mode}-{surface}.json`. Merge order: Phase 1 (primitive_theme → grayscale → dimension → borders → typography → gradients → _brand), Phase 2 (mode → surface → semantic → foundation/engine). Clean build; DTCG output. See [TOKENS_FREE_GENERATION.md](docs/context/TOKENS_FREE_GENERATION.md). |
| **CHANGELOG.md** | Root changelog; main changes per version (Keep a Changelog format). |
| **docs/context/CHANGELOG_DETAILED.md** | Detailed changelog for AI; implementation notes and areas touched per version; update when releasing or documenting features. |
| **COMMIT_CONVENTION.md** | Commit message format (Conventional Commits); use when proposing or writing commits. |

There is no `theme-generator.mjs`, `build.mjs`, or build `config.json` in this repo.

---

## Short rules

- **Documentation:** Official docs are under `docs/` (pt-br and en). Prefer these for concepts and structure.
- **Data:** The source of truth for consumable tokens is `data/aplica-theme/` and `data/aplica-theme-with-extensions/`. Do not assume builder scripts (generation from configs) exist in this repository.
- **Changelog:** Keep a **clear, direct CHANGELOG** at repo root ([CHANGELOG.md](CHANGELOG.md)) with main changes per version. Keep a **detailed descriptive changelog** in [docs/context/CHANGELOG_DETAILED.md](docs/context/CHANGELOG_DETAILED.md) for AI context and future verification of implemented features.