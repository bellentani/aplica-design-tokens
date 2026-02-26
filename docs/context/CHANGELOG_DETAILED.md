# Changelog (detailed) — AI context and feature verification

This file provides a **detailed**, AI-oriented record of what was implemented per version, for future verification and context. When adding a new feature or release, update both the root **CHANGELOG.md** (short narrative) and this file (implementation detail).

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
