# Project Summary — Aplica Design Tokens (reference repository)

## Project context

This repository is a **public reference** for the Aplica Theme token architecture. It provides:

- **Token data** consumable by [Tokens Studio](https://www.tokens.studio/) in Figma (no Aplica Theme Engine or builder scripts).
- **Documentation** for learning and training: multidimensional themes, scale, centralized design decisions.
- **MIT, open source** — suitable for courses and for others to use as a base for their own Design Systems.

## What this repo contains

| Area | Content |
|------|---------|
| **data/aplica-theme/** | Resolved tokens; full structure (foundation, semantic, surface, mode, dimension, brand). Use as boilerplate in Figma. |
| **data/aplica-theme-with-extensions/** | Same structure with Tokens Studio Extensions (e.g. dark mode via `$extensions.studio.tokens.modify`); includes figma-generators. |
| **data/aplica-theme-free/** | Generated single-file JSONs: one per theme × mode × surface (`tokens-free-{theme}-{mode}-{surface}.json`). Built by `npm run make:tokens-free`; see [TOKENS_FREE_GENERATION.md](TOKENS_FREE_GENERATION.md). DTCG notation; directory cleared on each run. |
| **docs/pt-br/, docs/en/** | Architecture (#01, #03, #05), implementation (#04), theme structure (#07), semantics (#06). |
| **docs/context/** | Agent rules (AGENT_GUIDE, RULES), index (INDEX), summary (this file), LLM workflow, changelogs (CHANGELOG_DETAILED), [TOKENS_FREE_GENERATION.md](TOKENS_FREE_GENERATION.md). |
| **data/tokens-aplica-*.json** | Unified token outputs; documented separately. |

## Current status

- **Theme structure** is documented (docs/#07). Two data variants: resolved (`aplica-theme`) and with-extensions (`aplica-theme-with-extensions`).
- **Tokens-free generation:** `npm run make:tokens-free` generates `data/aplica-theme-free/` (one file per theme×mode×surface; DTCG output). See [TOKENS_FREE_GENERATION.md](TOKENS_FREE_GENERATION.md). No other build or theme engine in this repo.
- **Human docs** exist in Portuguese (pt-br) and English (en). **Agent-facing context** is in English.

## Ready for use

- **Figma**: Point Tokens Studio at `data/aplica-theme` or `data/aplica-theme-with-extensions` (see [README](../../README.md)).
- **Study / training**: Use docs for concepts (layers, semantic vs foundation, surface, mode, dimension).
- **Extend**: Use this structure as a starting point for your own DS; no dependency on Aplica Theme Engine.
