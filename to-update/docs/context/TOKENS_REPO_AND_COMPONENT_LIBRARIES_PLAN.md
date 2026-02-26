# Plan: Tokens in a Separate Repository and Integration with Component Libraries

**Status:** Planned (future work)  
**Last updated:** February 2026

This document describes the strategy for publishing the theme engine as a consumable token package, the context to provide to component libraries (React, Vue, Flutter, etc.), and how to connect the theme engine (one repo) with component libraries (other repos) in a framework-agnostic way, including the Component As Data approach.

---

## Context

- **Theme Engine** (this repo): generates tokens (Semantic + Foundation), builds to `dist/` (JSON, ESM, JS, CSS). Lives in **one repository** and is the single source of tokens.
- **Component Libraries**: separate repositories (React, Vue, Flutter, etc.) that **consume** the tokens and implement components.
- **Component As Data**: a framework-agnostic approach where “what a component uses” is described in **data** (e.g. JSON/YAML)—token paths per role (background, text, border, etc.). This will be explored in the component repo(s); the theme engine does not implement components, it only delivers tokens and a contract.

**Goal:** Define (1) what the token repo publishes and what context to carry, (2) how libs consume it, (3) how to “join” theme engine + component libs in an agnostic way.

---

## 1. What the Token Repository (Theme Engine) Should Publish

### 1.1 Build Artifacts (already in `dist/`)

As per [DIST_STRUCTURE_FIX.md](DIST_STRUCTURE_FIX.md):

- **JSON**: `dist/json/` — semantic per theme (e.g. `{theme}-semantic.json`), foundation, components.
- **ESM/JS**: `dist/esm/`, `dist/js/` — same data as JS modules for bundler consumption.
- **CSS**: `dist/css/` — CSS variables `--semantic-*`, `--foundation-*`, and typography/elevation classes.

Each **consumer** chooses the format that fits their stack (web: CSS or ESM; Flutter: JSON or Dart generator, etc.).

### 1.2 Publishable npm Package

- **Name**: keep or align (e.g. `@aplica/tokens-theme-engine` or `@gran/tokens` per org convention).
- **Published content**: only what is needed for consumption (not the full generator):
  - `dist/` (or `package.json` `files` pointing to `dist/`, `json/`, `esm/`, `js/`, `css/`).
  - Consumer documentation (see 1.3).
- **Entry points**: `package.json` `main` / `exports` should expose:
  - A main entry (e.g. `dist/esm/index.mjs` or `dist/json/`) and
  - Stable subpaths for semantic per theme, foundation, and CSS (e.g. `@gran/tokens/json`, `@gran/tokens/css`) so each lib imports only what it needs.

### 1.3 Context to “Carry” for Component Authors

Goal: any lib (React, Vue, Flutter) or AI building components has the same rules and references.

**Include in the package (or in repo documentation that is always accessible):**

| Item | Where / Format | Purpose |
|------|----------------|---------|
| **Usage rule** | Doc in package (e.g. `CONSUMER.md` or short version of [token-usage-for-components-and-figma.md](tokens/token-usage-for-components-and-figma.md)) | Components **always** use Semantic; **sometimes** Foundation when an alias exists; never mode/surface/brand. |
| **Name contract** | Same doc | Recognize tokens: `semantic.*` and `foundation.*`; example paths. |
| **Artifact structure** | List in CONSUMER.md or package README | What exists in `dist/`: JSON per theme, foundation, CSS, ESM/JS; how to import per platform. |
| **Versioning** | Semver on npm | Libs pin version (e.g. `@gran/tokens@^2.0.0`); breaking changes on major. |

Recommendation: a single **CONSUMER.md** (or **INTEGRATION.md**) at the **repo root** (and included in the npm tarball) containing:

- Summary of the hierarchy (Brand → … → Semantic → Foundation).
- Rule: “Components: Semantic always; Foundation when an alias exists.”
- Contract: prefixes `semantic.*` and `foundation.*`; where they appear (JSON, CSS, ESM).
- Artifact table: `dist/json/*.json`, `dist/css/*.css`, `dist/esm/`, `dist/js/` and import examples per platform (web CSS/ESM, Flutter JSON).
- Link or full text of “token usage for components and Figma” for AI/design.

That way, “context for components” lives **inside the token package**, framework-agnostic.

---

## 2. Consumption Strategy by Component Libraries

### 2.1 How Libs Get the Tokens

- **Primary option**: npm dependency on the theme engine package (`@gran/tokens` or equivalent).
  - Each lib (React, Vue, Flutter) adds the package and uses only the artifacts it needs (CSS, JSON, ESM, etc.).
- **Alternatives**: git submodule, copy published to a private registry, or build pipeline that fetches the repo and copies `dist/` — as long as the **interface** (paths, names, Semantic/Foundation rule) matches the contract.

### 2.2 What Each Lib Does With the Tokens

- **React / Vue (web)**:
  - Load CSS from the package (`dist/css/*.css`) for `--semantic-*` and `--foundation-*` variables, and/or
  - Import JSON/ESM and apply at runtime (CSS-in-JS, Tailwind theme, etc.).
  - Implement components using **only** Semantic tokens (and Foundation when an alias exists), per CONSUMER.md.
- **Flutter (and others)**:
  - Consume JSON (e.g. `dist/json/{theme}-semantic.json` + foundation) or a generator that produces Dart classes from those JSONs.
  - Same rule: component styles reference only semantic (and foundation when applicable).

No lib should redefine token values; they only **reference** the names (paths) defined by the theme engine.

### 2.3 Context the Lib “Inherits” From the Token Package

- **Documentation**: CONSUMER.md (or INTEGRATION.md) + token-usage (for AI/design).
- **Data**: files in `dist/` (per theme, foundation, CSS).
- **Contract**: “Semantic always, Foundation when alias exists”; names `semantic.*` and `foundation.*`.

Each component repository can also have its own “AI context” (rules, examples) that **repeat or link** these rules so prompts and agents use the same strategy.

---

## 3. Connecting Theme Engine (One Repo) With Component Libraries (Other Repos)

### 3.1 Overview

- **Theme engine** publishes **tokens + contract** (artifacts + CONSUMER.md + Semantic/Foundation rule).
- **Each component library** depends on the package, reads the contract, and implements components that use only Semantic (and Foundation when an alias exists).

### 3.2 Stable Contract

- **Name format**: `semantic.*` and `foundation.*` (already defined in the theme engine).
- **File structure**: `dist/json/`, `dist/css/`, etc. — stable across minor versions; changes to paths or names = major or explicit migration doc.
- **Usage rule**: “Components always Semantic; Foundation when alias exists” — documented in the package and repeated (or linked) in lib repos.

### 3.3 Versioning and Evolution

- Theme engine follows Semver. Changes to:
  - Token values (new themes, new tokens) → minor or patch.
  - Removal/renaming of tokens or paths → major.
- Component libs pin version (e.g. `^2.x`) and upgrade when they want new tokens or fixes; on major, they check CHANGELOG and CONSUMER.md for migration.

---

## 4. Component As Data (Agnostic) — Where It Fits

- **Theme engine** does not define “components”; it only defines **tokens** (Semantic + Foundation) and the **contract** for use.
- **Component As Data** is the idea of describing “what a component uses” in **data** (e.g. JSON/YAML): list of token paths per role (background, text, border, etc.), agnostic of React/Vue/Flutter.
- This specification can live:
  - **In this repo**: as an optional directory (e.g. `specs/components/`) with files like `button.tokens.json` listing semantic/foundation paths per variant; or
  - **In another repository** (e.g. “design-system-specs” or the lib repo itself): specification of which tokens each component uses.

Suggested flow:

1. **Theme engine** publishes tokens + CONSUMER.md (rule + name contract).
2. **Optional**: a “spec” (in this repo or elsewhere) describes, in data, mappings like: `Button.primary.background` → `foundation.bg.brand.default`, etc.
3. **Each component library** (React, Vue, Flutter):
   - Consumes the **token package** and applies the **rule** (Semantic always, Foundation when alias).
   - If a “Component As Data” spec exists, the lib **interprets** that spec and applies the paths in its implementation (each in its own framework).

Thus the theme engine stays agnostic; “Component As Data” can evolve in the spec repo or in lib repos without tying the theme engine to a specific stack.

---

## 5. Implementation Summary (When Executed)

### In the Theme Engine Repository

1. **Prepare npm publication**
   - Ensure `package.json` `files` (e.g. `["dist", "CONSUMER.md"]`) and `exports` for stable subpaths (json, esm, js, css).
   - Build before publishing (`npm run build:themes` or equivalent) to generate `dist/`.

2. **Create CONSUMER.md (or INTEGRATION.md) at repo root**
   - Content: hierarchy, rule (Semantic always / Foundation when alias), name contract (`semantic.*`, `foundation.*`), artifact table in `dist/`, import examples per platform (web CSS/ESM, Flutter JSON).
   - Include or link the “token usage for components and Figma” content for AI and design.

3. **Optional — Component As Data in this repo**
   - Add a folder such as `specs/components/` with files that map component + variant → token paths (semantic/foundation). Keep format stable (JSON) and document that libs can consume this spec to implement components in a consistent way.

### In Component Library Repositories

1. Add dependency on the token package (npm).
2. Include in the repo’s AI context/docs: the rule “Semantic always, Foundation when alias” and a link or excerpt from the package’s CONSUMER.md.
3. Implement components using only tokens (CSS vars or JS/JSON) per the contract; optionally read the “Component As Data” spec if it exists and apply the paths in the implementation.

### Suggested Order

- First: CONSUMER.md + `package.json`/exports in the theme engine and one pilot lib (e.g. React) consuming the package and following the rule.
- Then: publish the package (npm or private registry) and repeat for Vue, Flutter, etc.
- Last: define and add the “Component As Data” spec (in this repo or another) and have libs consume that spec if desired.

---

## 6. Files to Create or Change (Theme Engine)

| Action | File / location |
|--------|------------------|
| Create | `CONSUMER.md` (or `INTEGRATION.md`) at root with rule, contract, artifacts, examples per platform |
| Change | `package.json`: `files`, `exports` (subpaths for dist/json, esm, js, css) |
| Optional | `specs/components/*.json` (Component As Data: component → token paths) and short doc in `specs/README.md` |

No mandatory changes to token generation (build already produces dist/); only packaging and documentation for consumption.
