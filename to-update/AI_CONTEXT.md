# AI Context Map

> **For AI Agents**: This file is your entry point to understanding this project. Start here.

## 📍 Navigation Center

### 1. 🛑 START HERE
*   **[Agent Guide](docs/context/AGENT_GUIDE.md)**: Your operational manual. **Read this first.**
*   **[Human/LLM Workflow](docs/context/LLM_WORKFLOW.md)**: How to prompt and work with this project.
*   **[Project Rules](docs/context/RULES.md)**: The Constitution. Non-negotiable constraints.
*   **[Project Summary](docs/context/SUMMARY.md)**: High-level overview and status.

### 2. 🧠 Knowledge Base (`docs/context/`)
*   **[Index](docs/context/INDEX.md)**: Detailed index of the context folder.
*   **[Token Usage for Components and Figma](docs/context/tokens/token-usage-for-components-and-figma.md)**: How tokens work (Semantic = exposed layer, Foundation = aliases). Use when building components or reading Figma/MCP to identify which tokens are in use.
*   **[Tokens Repo and Component Libraries Plan](docs/context/TOKENS_REPO_AND_COMPONENT_LIBRARIES_PLAN.md)**: **Future work** – Strategy for publishing tokens as a consumable package and integrating with component libraries (React, Vue, Flutter); CONSUMER.md, contract, Component As Data.
*   **[Work Plan](docs/context/WORK_PLAN.md)**: Current roadmap and changelog.
*   **[Release Files](docs/context/RELEASE_FILES.md)**: **Modified files per version** – use when updating forks, helping other teams, or doing automated upgrades. **CHANGELOG.md** = *what* changed (compact; no long file lists). **RELEASE_FILES.md** = *which files* changed. **docs/CHANGELOG-ARCHIVE.md** = full entries for 2.11.x and below.
*   **[Update Bundles Guide](docs/context/UPDATE_BUNDLES_GUIDE.md)**: How to create and apply update bundles. **Always ask scope:** update **dynamic-themes** only, **transformers** only, or **both**? You do not always need to touch both. Step-by-step bundle creation and application by scope.
*   **[Dynamic Themes](docs/context/DYNAMIC_THEMES.md)**: Context specific to the Theme Generator.
*   **[Build System](docs/context/BUILD_SYSTEM_UPDATE.md)**: Context on the build/transform pipeline.
*   **[Dist Structure](docs/context/DIST_STRUCTURE_FIX.md)**: Context on output organization.

### 3. 📚 Human Documentation
The `docs/` folder contains standard documentation for developers.
*   **[Transformer Architecture](transformers/SIMPLIFIED-ARCHITECTURE.md)**: Best tech doc for the build system.
*   **[Dynamic Themes Readme](dynamic-themes/README.md)**: Best tech doc for the generator.
*   **[Main Readme](README.MD)**: Public-facing overview.

## 🛠 Key Files Map

| file | Purpose |
| :--- | :--- |
| `config/themes.config.json` | General config (themes, global, **gradientConfig** canonical: degrees, steps, defaultComposites; **dimension** reference). Per-theme configs only overrides. |
| `config/dimension.config.mjs` | **SSOT** for dimension scale and semantic aliases → generates `data/dimension/normal.json`. |
| `config/foundationTypography.config.json` | Foundation typography styles content (refs + $description); schema loads it. |
| `dynamic-themes/schemas/architecture-schema.mjs` | **SSOT** for token structure (feedback, product, brand). |
| `dynamic-themes/schemas/typography-styles-schema.mjs` | **SSOT** for typography_styles structure; loads content from config/foundationTypography.config.json. |
| `transformers/schemas/foundation-styles-schema.mjs` | **SSOT** for CSS style structure (typography, elevation). |
| `transformers/build.mjs` | Main entry point for the build system. |
| `dynamic-themes/scripts/theme-generator.mjs` | Core logic for theme generation. |
| `package.json` | Project scripts and dependencies. |

## 📋 Changelog & upgrades (recommendations for IA)

*   **CHANGELOG.md** is **compact**: it describes *what* changed per version; it does **not** list every modified file. Keep it that way when adding new entries: narrative only; put "**Files:** **docs/context/RELEASE_FILES.md**" instead of long file lists.
*   **docs/context/RELEASE_FILES.md** is the **single source** for *which files* changed per version. When helping with upgrades or creating bundles, use RELEASE_FILES for the file list.
*   **docs/CHANGELOG-ARCHIVE.md** holds the full changelog text for versions 2.11.x and below. Do not move new entries there; only the main CHANGELOG gets new versions (in compact form).
*   **Update bundles**: When creating or applying an update bundle for another project, follow **docs/context/UPDATE_BUNDLES_GUIDE.md**. **Always ask** (or state in the bundle): "Update **dynamic-themes**? Update **transformers**? **Both**?" Apply only the files and steps for the chosen scope(s).
