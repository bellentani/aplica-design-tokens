# LLM & human collaboration workflow

> **Purpose**: Guide for working with AI/LLMs in this reference repository.  
> **Philosophy**: The AI has no long-term memory of this project. Point it to [AI_CONTEXT.md](../../AI_CONTEXT.md) and [docs/context/](.) at the start of each session.

## Starting a session

When you open a chat (Cursor, Copilot, etc.):

**Prompt:**
> "I am working on the Aplica Design Tokens reference repo. Please read `AI_CONTEXT.md` and load `docs/context/RULES.md`. Confirm when you are ready."

## Developing or changing something

1. **Plan**: Ask the AI to read [docs/context/SUMMARY.md](SUMMARY.md) and [docs/context/INDEX.md](INDEX.md).
2. **Propose & confirm**: The AI must propose the **solution** and **implementation strategy** before editing. You confirm before it implements.
   > "Based on the theme structure in docs/#07, propose how we would add a short section about figma-generators. Do not implement yet—wait for my confirmation."
3. **Confirm**: Explicitly approve (e.g. "ok", "proceed", "pode implementar").
4. **Execute**: Only after confirmation, the AI implements.
5. **Verify**: "Does this violate any rule in RULES.md?"

**Rule for the AI**: Do not write code or edit files until the user has confirmed. See [AGENT_GUIDE.md](AGENT_GUIDE.md) → "Confirm Before Implementing".

## Effective prompting

| Goal | Recommended prompt |
|------|---------------------|
| **Explain structure** | "Read `AI_CONTEXT.md` and docs/#07 (Theme Structure). Explain the difference between data/aplica-theme and data/aplica-theme-with-extensions." |
| **Update docs** | "Read `docs/context/RULES.md` (language: English). Add/update documentation for [topic]." |
| **Token usage** | "Read `docs/context/tokens/token-usage-for-components-and-figma.md`. How should components reference tokens (Semantic vs Foundation)?" |

## Pitfalls to avoid

- **Implementing without confirmation**: If the AI starts editing before you approved, stop it: "Read AGENT_GUIDE → Confirm Before Implementing. Propose solution and strategy first."
- **Assuming builder context**: This repo has no theme generator or build. Do not ask for `npm run build:themes` or edits to `dynamic-themes/`; they do not exist here.
- **Wrong language**: Context and agent-facing docs are in English. If the AI responds in another language for context docs, remind it: "Read RULES.md — context must be in English."
