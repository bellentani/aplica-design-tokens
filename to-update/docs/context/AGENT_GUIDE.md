# AI Agent Guide

**Welcome, Agent.**
This repository is structured to provide you with "Context-as-Code". Your behavior should be grounded in the files within this directory.

## 🚀 Activation Protocol

Whenever you start a task in this repository, follow this sequence:

1.  **Load Context**: Read `docs/context/SUMMARY.md` to understand the high-level goals and current status.
2.  **Load Constitution**: Read `docs/context/RULES.md`. These are valid constraints. Do not violate them.
3.  **Check Work Plan**: Read `docs/context/WORK_PLAN.md` to see active tracks of work.
4.  **Explore**: Use `AI_CONTEXT.md` in the root to find specific technical documentation.

## ✅ Confirm Before Implementing (Mandatory)

**Before writing code or editing files**, you MUST:

1.  **Propose the solution**: State clearly what you understand as the goal and what outcome you will deliver.
2.  **Propose the implementation strategy**: List the steps, the files you will touch, and any alternatives considered (and why you chose this approach).
3.  **Wait for confirmation**: Do not implement until the user explicitly confirms the solution and strategy (e.g. "ok", "pode implementar", "proceed", "confirmado"). If the user only described the problem, ask: "Posso confirmar: a solução X com a estratégia Y está alinhada? Devo prosseguir com a implementação?"

**Exceptions**: You may implement immediately only when the user has already approved the approach in the same message (e.g. "implementa isso" after a prior agreement) or when the request is clearly a tiny, reversible edit (e.g. fix typo, add a single line the user specified). When in doubt, confirm first.

## 🧠 Mental Model

*   **The Repo is the Database**: detailed context is in `docs/context/`.
*   **Agnosticism**: We do not rely on tool-specific features (like pinned files in a specific IDE). We rely on you reading these files.
*   **State Awareness**: The `data/` folder is the state. The `dynamic-themes/` and `transformers/` folders are the logic that mutates that state.

## 🛠 Common Tasks & Workflows

### Task: "Build components" or "Read tokens from Figma / design files"
1.  Read **`docs/context/tokens/token-usage-for-components-and-figma.md`**. Use **Semantic** as the main token layer; use **Foundation** only when an alias exists and fits. When reading design files (e.g. Figma MCP), identify tokens by prefix: `semantic.*` or `foundation.*`.

### Task: "Create a new Theme"
1.  Read `docs/context/DYNAMIC_THEMES.md`.
2.  Create a config file in `dynamic-themes/configs/`.
3.  Run `npm run build:themes`.

### What `npm run build:themes` generates (all theme structures, including Foundations)
1.  **ensure:data** – Creates `data/` and subdirs; minimal `data/dimension/normal.json` if missing.
2.  **themes:generate** – Generates `data/brand/{theme}/` (_brand.json, _typography.json, _borders.json, etc.) for each theme config.
3.  **dimension:generate** – Generates `data/dimension/normal.json` from `config/dimension.config.mjs`.
4.  **sync:architecture** – Updates `data/mode/`, `data/surface/`, `data/semantic/`, `data/foundation/engine/default.json` from schema.
5.  **foundations:generate** – Generates all Foundations in `data/foundation/{brand}/`: default.json from config, then **styles/typography_styles.json** and **styles/elevation_styles.json** via `generate-foundation-styles.mjs` (so each foundation has the `styles/` folder required by themes.config.json and generate-css-classes).
6.  **build:all** – Builds semantic, foundation, and components into `dist/` (JSON, ESM, JS, CSS). So **all theme structures, including Foundations**, are generated and built in one command.

### Task: "Modify Token Architecture"
1.  Read `docs/context/RULES.md` (SSOT section).
2.  Edit `dynamic-themes/schemas/architecture-schema.mjs` (for token structure).
3.  Run sync scripts.

### Task: "Modify CSS Style Structure"
1.  Read `docs/context/RULES.md` (SSOT section).
2.  Edit `transformers/schemas/foundation-styles-schema.mjs` (for CSS styles).
3.  Regenerate CSS: `npm run build:themes`.

### Task: "Modify dimension scale or semantic aliases"
1.  Edit `config/dimension.config.mjs` (scale and/or semantic).
2.  Run `npm run dimension:generate` (or `npm run build:themes`). Do not edit `data/dimension/normal.json` manually.

### Task: "Fix a Bug in Build"
1.  Read `transformers/SIMPLIFIED-ARCHITECTURE.md`.
2.  Create a reproduction case or run `npm run test:quick`.
3.  Fix the code.
4.  Verify with tests.

### Task: "Version / Release" (when creating a new version)
1.  Update **CHANGELOG.md** with the narrative (*what* changed: Added, Fixed, Changed). **Keep it compact**: do not paste long file lists; end the entry with "**Files:** **docs/context/RELEASE_FILES.md**". New versions go only in the main CHANGELOG (not in CHANGELOG-ARCHIVE).
2.  Update **docs/context/RELEASE_FILES.md** with the list of **modified files** for that version (paths relative to repo root). Use `git diff --name-only <previous-tag>..HEAD` or your release process to get the list.
3.  This helps forks, other teams, and IA to know exactly which files to update when merging or upgrading.

### Task: "Help update a fork or team from version X to Y" or "Create / apply an update bundle"
1.  Read **docs/context/UPDATE_BUNDLES_GUIDE.md** and **docs/context/RELEASE_FILES.md**.
2.  **Always ask the user:** "Update **dynamic-themes** only, **transformers** only, or **both**?" You do not always need to update both; apply only the file lists and steps for the chosen scope(s).
3.  Collect all modified paths from RELEASE_FILES for each version from X+1 to Y; split by scope (dynamic-themes / transformers / shared) when creating a bundle.
4.  Apply in order: config → schemas/scripts → regenerate data (build:themes for dynamic-themes; build + test for transformers). Resolve "Configurations that MUST be updated" per version.
5.  Remind to run build/tests as in other tasks (e.g. `npm run build:themes`, `npm run test:quick`).

## ⚠️ Warning Zones

*   **Do not edit `dist/`**: This is output.
*   **Do not edit `data/brand/`**: This is output of the generator.
*   **English Only**: Output all thoughts and code in English (unless conversing with a user who specifically engaged in another language, but code remains English).
