# Changelog

All notable changes to **this repository** (Aplica Design Tokens reference) are documented here. This changelog covers documentation and data structure only, not the Aplica Theme Engine or builder project. Versioning follows [Semantic Versioning](https://semver.org/) (major.minor.patch).

---

## [Unreleased]

(Work in progress; add items here before releasing.)

---

## [2.1.0] - 2025-02-25

### Added

- **Tokens-free generation (theme × mode × surface):** `npm run make:tokens-free` now outputs one JSON file per combination **theme × mode × surface** (e.g. `tokens-free-aplica_joy-light-positive.json`, `tokens-free-aplica_joy-dark-negative.json`) in `data/aplica-theme-free/`. Output uses DTCG (W3C) notation (`$type`, `$value`).
- **docs/context/TOKENS_FREE_GENERATION.md:** Reference for merge order, output naming, clean-build behavior, and base file resolution. Linked from AI_CONTEXT and INDEX.

### Changed

- **scripts/make-tokens-free.mjs:** Rewritten to build per-theme base (primitive_theme → grayscale → dimension → borders → typography → gradients → _brand), then per combination (mode → surface → semantic → foundation/engine). Output directory is cleared on each run.
- **data/aplica-theme-free/:** Output structure is now one file per theme-mode-surface (16 files for 4 themes × 2 modes × 2 surfaces) instead of one file per theme.
- **AI_CONTEXT.md:** Data structure table includes `data/aplica-theme-free/`; Key files include `scripts/make-tokens-free.mjs` and link to TOKENS_FREE_GENERATION.md.
- **docs/context/INDEX.md:** Added link to TOKENS_FREE_GENERATION.md under Theme and data.
- **README.md:** aplica-theme-free described as built single-file sets (theme × mode × surface); Figma Free usage points to aplica-theme-free or data/tokens-aplica-default.json.

### Removed

- Previous one-file-per-theme outputs from aplica-theme-free (e.g. `tokens-free-aplica_joy.json`, `tokens-free-theme-engine.json`) in favor of theme-mode-surface files.

---

## [2.0.0] - 2025-02-25

### Added

- Root **CHANGELOG.md** (this file) and **docs/context/CHANGELOG_DETAILED.md** for version history and AI verification.
- Conventional Commits and commitlint (subject min/max length, optional scope); COMMIT_CONVENTION.md and IDE settings in `.vscode/`.
- Theme structure in **data/aplica-theme/** and **data/aplica-theme-with-extensions/** (foundation, semantic, surface, mode, dimension, brand: aplica_joy, aplica_tangerine, aplica_grinch, theme_engine).

### Changed

- Project context and docs/context aligned to this reference repo only (no builder scripts, no dynamic-themes, no dist/).
- Documentation and agent-facing context in English; commit messages and changelog in English.

### Removed

- Builder-only and legacy docs from docs/context (UPDATE_BUNDLES_GUIDE, DYNAMIC_THEMES, BUILD_SYSTEM_UPDATE, DIST_STRUCTURE_FIX, WORK_PLAN, RELEASE_FILES, THEME_CONFIG_REFERENCE, GRADIENT_PLAN_REFERENCE, TOKENS_REPO_AND_COMPONENT_LIBRARIES_PLAN, legacy/ folder, tokens/build-process, integration-guide, system-overview).
- **tokens-studio-model/** folder; consumption is **data/aplica-theme** and **data/aplica-theme-with-extensions** only.

### Fixed

- N/A (first versioned entry for 2.0.)

---

For detailed implementation notes and file-level context per version, see **docs/context/CHANGELOG_DETAILED.md**.
