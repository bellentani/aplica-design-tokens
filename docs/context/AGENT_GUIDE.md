# AI Agent Guide

**Welcome, Agent.**
This repository is a **reference** for Design Tokens architecture (Aplica Theme). Context and rules are in this directory.

## Activation Protocol

When you start a task in this repository:

1. **Load context**: Read [docs/context/SUMMARY.md](SUMMARY.md) for high-level goals and what this repo contains.
2. **Load rules**: Read [docs/context/RULES.md](RULES.md). Do not violate them.
3. **Navigate**: Use [AI_CONTEXT.md](../../AI_CONTEXT.md) in the root to find theme structure, data layout, and links to docs.

## Confirm Before Implementing (Mandatory)

**Before writing code or editing files**, you MUST:

1. **Propose the solution**: State the goal and the outcome you will deliver.
2. **Propose the implementation strategy**: List steps, files you will touch, and alternatives considered.
3. **Wait for confirmation**: Do not implement until the user explicitly confirms (e.g. "ok", "proceed", "confirmado").

**Exceptions**: You may implement immediately only when the user has already approved the approach in the same message, or when the request is clearly a tiny, reversible edit (e.g. fix typo). When in doubt, confirm first.

## Mental Model

- **This repo is reference-only**: There are no theme generators, build scripts, or `dynamic-themes/` / `transformers/`. The `data/` folder is the source of truth for tokens (consumable by Tokens Studio in Figma).
- **Documentation**: `docs/pt-br/` and `docs/en/` contain architecture and guides. `docs/context/` contains agent-facing rules and index.
- **Agnosticism**: We rely on you reading these files; no IDE-specific pinned context.

## Common Tasks

### Task: "Explain or document the theme structure"
1. Read [docs/pt-br/#07 Aplica Theme - Estrutura do Tema.md](../../pt-br/#07%20Aplica%20Theme%20-%20Estrutura%20do%20Tema.md) (or [docs/en/#07 Theme Structure](../../en/#07%20Aplica%20Theme%20-%20Theme%20Structure.md)). It has the real file tree and conventions for `data/aplica-theme/`.

### Task: "Use tokens in Figma / design files"
1. Read [docs/context/tokens/token-usage-for-components-and-figma.md](tokens/token-usage-for-components-and-figma.md). Use **Semantic** as the main layer; **Foundation** when an alias exists and fits. In design files, identify tokens by prefix: `semantic.*` or `foundation.*`.

### Task: "Update or add documentation"
1. Follow [RULES.md](RULES.md) (language: English for docs in context and code). Do not invent builder concepts (e.g. `npm run build:themes`, `sync:architecture`) — they do not exist in this repo.

### Task: "Version / release" or "Write commit message"
1. Any CHANGELOG here refers to **this** repo (documentation and data structure). Update CHANGELOG with a compact narrative; put file lists in `docs/context/RELEASE_FILES.md` if that file exists.
2. **Commit messages**: Follow [COMMIT_CONVENTION.md](../../COMMIT_CONVENTION.md) (Conventional Commits). Use the correct type (`feat`, `fix`, `docs`, `style`, `refactor`, etc.) and format when proposing or writing commits.

## Warning Zones

- **Do not assume a build pipeline**: There is no `dist/`, no `npm run build:themes`, no generator that writes `data/brand/`. The token data in `data/` is the source; it may be maintained by hand or by an external process.
- **English only**: Output all thoughts and code in English (unless the user explicitly uses another language; code and technical terms remain in English). See [RULES.md](RULES.md).
