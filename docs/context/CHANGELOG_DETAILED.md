# Changelog (detailed) — AI context and feature verification

This file provides a **detailed**, AI-oriented record of what was implemented per version, for future verification and context. When adding a new feature or release, update both the root **CHANGELOG.md** (short narrative) and this file (implementation detail).

---

## 2.1.0

**Summary:** Minor release. Tokens-free generation now outputs one file per **theme × mode × surface** (e.g. aplica_joy-light-positive, aplica_joy-dark-negative). Script and docs updated; AI_CONTEXT and INDEX reference the new structure and TOKENS_FREE_GENERATION.md.

### Features / changes

- **Tokens-free output structure**
  - **Before:** One JSON per theme (e.g. `tokens-free-aplica_joy.json`, `tokens-free-theme-engine.json`).
  - **After:** One JSON per theme × mode × surface: `tokens-free-{themeName}-{mode}-{surface}.json` (e.g. `tokens-free-aplica_joy-light-positive.json`, `tokens-free-aplica_grinch-dark-negative.json`). No `tokens-aplica-default.json` in aplica-theme-free.
  - **Script:** `scripts/make-tokens-free.mjs` — Phase 1: per-theme base (primitive_theme, grayscale, dimension, borders, typography, gradients, _brand). Phase 2: per combination (mode, surface, semantic, foundation/engine). Clean build (output dir cleared each run). DTCG notation in output.

- **Documentation**
  - **docs/context/TOKENS_FREE_GENERATION.md:** Merge order, base file resolution (tokens-aplica-default vs boilerplate), output naming, clean build. Reference for the script and for AI.
  - **AI_CONTEXT.md:** Data structure table row for `data/aplica-theme-free/`; Key files row for `scripts/make-tokens-free.mjs` with link to TOKENS_FREE_GENERATION.
  - **docs/context/INDEX.md:** Link to TOKENS_FREE_GENERATION.md under "Theme and data".
  - **README.md:** aplica-theme-free and Figma Free usage updated to reflect new output.

### Files / areas touched

- **Created:** docs/context/TOKENS_FREE_GENERATION.md.
- **Edited:** package.json (version 2.1.0), CHANGELOG.md (2.1.0 entry), docs/context/CHANGELOG_DETAILED.md (this entry), scripts/make-tokens-free.mjs, AI_CONTEXT.md, docs/context/INDEX.md, README.md.
- **data/aplica-theme-free/:** New generated files (tokens-free-*-{mode}-{surface}.json) only; old one-per-theme and tokens-aplica-default.json no longer generated here.

### Decisions / notes

- Clean build keeps aplica-theme-free output predictable; no incremental merge.
- Base file for merge is read from `data/tokens-aplica-default.json` or `data/tokens-aplica-boilerplate.json`, not from aplica-theme-free (since that dir is cleared).

---

## 2.0.0

**Summary:** First versioned release (2.0.0) of the Aplica Design Tokens reference repo. Theme data lives in `data/aplica-theme` and `data/aplica-theme-with-extensions`; docs/context was trimmed to match this repo only (no builder, no tokens-studio-model).

### Features / changes

- **Changelog and versioning**
  - Root **CHANGELOG.md**: Keep a Changelog format (Added, Changed, Removed, etc.); intro states this repo only; [Unreleased] and [2.0.0] sections.
  - **docs/context/CHANGELOG_DETAILED.md**: This file; per-version summary, features, files/areas touched, decisions. Agents must update it when implementing features or releasing.

- **Commit convention**
  - Conventional Commits; commitlint with subject min length 15, max 72, header max 90; scope optional (warning when provided and not in enum).
  - COMMIT_CONVENTION.md in English; .vscode/settings.json for git input validation (subject/body length); .vscode/commit-template.txt for optional git commit template.
  - Commit script in package.json echoes format reminder (no Commitizen).

- **Data structure**
  - **data/aplica-theme/**: Resolved tokens; foundation (engine/default, engine/styles, sample), semantic, surface, mode, dimension, brand (aplica_joy, aplica_tangerine, aplica_grinch, theme_engine).
  - **data/aplica-theme-with-extensions/**: Same structure with Tokens Studio Extensions (e.g. dark mode); figma-generators; example in brand/aplica_joy.

- **docs/context cleanup**
  - Removed builder-only docs: UPDATE_BUNDLES_GUIDE, DYNAMIC_THEMES, BUILD_SYSTEM_UPDATE, DIST_STRUCTURE_FIX, WORK_PLAN, RELEASE_FILES, THEME_CONFIG_REFERENCE, GRADIENT_PLAN_REFERENCE, TOKENS_REPO_AND_COMPONENT_LIBRARIES_PLAN.
  - Removed legacy folder: docs/context/legacy/ (DIAGNOSTIC-REPORT, PORTABILITY-GUIDE, REORGANIZATION-SUMMARY, work-plan-typography-weight, tokens-project/*).
  - Removed or replaced build-specific tokens docs: build-process.md, integration-guide.md, system-overview.md. Kept token-usage-for-components-and-figma.md.

- **tokens-studio-model removed**
  - Entire folder deleted. Single source of truth: data/aplica-theme and data/aplica-theme-with-extensions. All references removed from AI_CONTEXT, README, RULES, SUMMARY, INDEX.

### Files / areas touched

- **Created:** CHANGELOG.md, docs/context/CHANGELOG_DETAILED.md.
- **Edited:** AI_CONTEXT.md (changelog policy, Key files, Navigation; tokens-studio-model removed), docs/context/RULES.md (release & versioning; RELEASE_FILES removed; tokens-studio-model removed), docs/context/AGENT_GUIDE.md (version task: both changelogs; refs to removed docs removed), docs/context/INDEX.md (CHANGELOG links; removed links to deleted docs), docs/context/SUMMARY.md (builder refs and tokens-studio-model removed), README.md (tokens-studio-model removed).
- **Deleted:** docs/context (builder + legacy + tokens build docs as above), tokens-studio-model/ (entire folder).

### Decisions / notes

- Scope in commits is optional (scope-enum is warning only when provided).
- Subject min 15 chars, max 72; header max 90.
- No RELEASE_FILES.md in this repo; file lists can live in CHANGELOG_DETAILED under "Files / areas touched" per version if needed.
- Version 2.0.0 reflects a clean reference repo (data + docs only); package.json version bump to 2.0.0 is optional at release time.
