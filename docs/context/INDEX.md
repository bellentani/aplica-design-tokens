# Context Index — AI & developer reference

**Project**: Aplica Design Tokens (reference repository)  
**Purpose**: Quick reference for AI agents and developers to find project knowledge.

---

## Essential context (root)

- **[AI_CONTEXT.md](../../AI_CONTEXT.md)**: Master entry point. Read first.
- **[docs/context/AGENT_GUIDE.md](AGENT_GUIDE.md)**: Operational rules for agents.
- **[docs/context/RULES.md](RULES.md)**: Project constitution and constraints.

## Project state (docs/context/)

- **[SUMMARY.md](SUMMARY.md)**: What this repo is and what it contains.
- **[LLM_WORKFLOW.md](LLM_WORKFLOW.md)**: How to prompt and work with AI in this repo.

## Theme and data

- **Theme structure (file tree and conventions):** [docs/pt-br/#07 Aplica Theme - Estrutura do Tema](../../pt-br/#07%20Aplica%20Theme%20-%20Estrutura%20do%20Tema.md), [docs/en/#07 Theme Structure](../../en/#07%20Aplica%20Theme%20-%20Theme%20Structure.md).
- **Token usage (Semantic vs Foundation, Figma):** [docs/context/tokens/token-usage-for-components-and-figma.md](tokens/token-usage-for-components-and-figma.md).

## Technical documentation (docs/)

- **Architecture:** docs/pt-br/#01, #03, #05 (and docs/en equivalents).
- **Implementation and Figma:** docs/pt-br/#04, docs/en/#04.
- **Technical reference:** docs/pt-br/#05, docs/en/#05.

---

## Common questions

**What is in data/?**  
`data/aplica-theme/` = resolved tokens (all values pre-calculated) for Tokens Studio. `data/aplica-theme-with-extensions/` = same structure with Tokens Studio Extensions (e.g. dark mode via modify) and figma-generators. No generation step in this repo.

**Where is the theme structure documented?**  
[docs/pt-br/#07](../../pt-br/#07%20Aplica%20Theme%20-%20Estrutura%20do%20Tema.md) and [docs/en/#07](../../en/#07%20Aplica%20Theme%20-%20Theme%20Structure.md) (file tree and conventions).

**Where are the tokens?**  
In `data/aplica-theme/` (resolved) and `data/aplica-theme-with-extensions/` (with Extensions). No build or theme generator here.

**Is there a build or theme generator?**  
No. This repo has no `dynamic-themes/`, `transformers/`, or `npm run build:themes`. Data is source of truth as-is.

**Which layer do components use?**  
**Semantic** is the exposed layer; **Foundation** is aliases. See [token-usage-for-components-and-figma.md](tokens/token-usage-for-components-and-figma.md).

**How do I use this in Figma?**  
Connect Tokens Studio to `data/aplica-theme` or `data/aplica-theme-with-extensions`. See [README](../../README.md) and docs/#04.

---

## Notes for agents

- New rule or constraint → update [RULES.md](RULES.md).
- High-level status or scope → update [SUMMARY.md](SUMMARY.md).
- Use [AI_CONTEXT.md](../../AI_CONTEXT.md) as the map; it links to the rest.
