# Aplica Design Tokens v2.0.0

**Release date:** 2025-02-25  
**Tag:** v2.0.0

This is a **major release** of the Aplica Design Tokens reference repository. Version 2.0 establishes a clean, documentation-first reference for the token architecture used with Tokens Studio in Figma.

---

## Highlights

- **Single source of truth:** Token data lives in `data/aplica-theme/` and `data/aplica-theme-with-extensions/` only. The duplicate `tokens-studio-model/` folder was removed.
- **Changelog and versioning:** Root `CHANGELOG.md` (Keep a Changelog format) and `docs/context/CHANGELOG_DETAILED.md` for AI context and feature verification. Semantic versioning (2.0.0) is explicit in `package.json`.
- **Commit convention:** Conventional Commits with commitlint (subject min 15 / max 72 chars, header max 90, optional scope). IDE settings in `.vscode/` for validation.
- **Context cleanup:** Builder-only and legacy docs removed from `docs/context/`. Only reference-repo docs remain (AGENT_GUIDE, RULES, INDEX, SUMMARY, LLM_WORKFLOW, token-usage-for-components-and-figma, changelogs).
- **English:** All agent-facing context, commit messages, and changelog in English.

---

## What's in this release

| Area | Content |
|------|---------|
| **data/aplica-theme/** | Resolved tokens; foundation, semantic, surface, mode, dimension, brand (aplica_joy, aplica_tangerine, aplica_grinch, theme_engine). |
| **data/aplica-theme-with-extensions/** | Same structure with Tokens Studio Extensions (e.g. dark mode). |
| **CHANGELOG.md** | Main changes per version (root). |
| **docs/context/CHANGELOG_DETAILED.md** | Detailed changelog for AI and future verification. |
| **docs/context/** | Agent rules, index, summary, token usage for Figma. No builder or legacy docs. |

---

## Removed in 2.0

- **tokens-studio-model/** (entire folder).
- Builder docs: UPDATE_BUNDLES_GUIDE, DYNAMIC_THEMES, BUILD_SYSTEM_UPDATE, DIST_STRUCTURE_FIX, WORK_PLAN, RELEASE_FILES, THEME_CONFIG_REFERENCE, GRADIENT_PLAN_REFERENCE, TOKENS_REPO_AND_COMPONENT_LIBRARIES_PLAN.
- **docs/context/legacy/** (entire folder).
- **docs/context/tokens/** build-related docs (build-process, integration-guide, system-overview). Kept: token-usage-for-components-and-figma.

---

## How to use

- **Figma (Tokens Studio):** Point the plugin to `data/aplica-theme` or `data/aplica-theme-with-extensions`.
- **Single-file (Tokens Studio Free):** Use `data/tokens-aplica-default.json` or generate with `npm run make:tokens-free`.
- **Docs:** See `README.md`, `AI_CONTEXT.md`, and `docs/` (pt-br and en) for architecture and theme structure.

---

**Full changelog:** [CHANGELOG.md](CHANGELOG.md) · **Detailed (AI):** [docs/context/CHANGELOG_DETAILED.md](docs/context/CHANGELOG_DETAILED.md)
