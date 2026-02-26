# Changelog

All notable changes to **this repository** (Aplica Design Tokens reference) are documented here. This changelog covers documentation and data structure only, not the Aplica Theme Engine or builder project. Versioning follows [Semantic Versioning](https://semver.org/) (major.minor.patch).

---

## [Unreleased]

(Work in progress; add items here before releasing.)

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
