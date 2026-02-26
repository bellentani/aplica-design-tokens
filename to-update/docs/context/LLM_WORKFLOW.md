# LLM & Human Collaboration Workflow

> **Purpose**: Guide for developers on how to leverage AI/LLMs effectively within this agnostic project structure.
> **Philosophy**: The AI is a junior developer with infinite energy but zero long-term memory. You must point it to the "Brain" (`AI_CONTEXT.md`) every time.

## 🚀 Standard Operating Procedures

### 1. Starting a Session
Whenever you open a chat (Cursor, Copilot, ChatGPT, Claude):

**Prompt**:
> "I am working on the Aplica Tokens project. Please read `AI_CONTEXT.md` and load the `docs/context/RULES.md` into your immediate context. Confirm when you are ready."

### 2. Developing a New Feature (and any non-trivial change)
**Workflow**:
1.  **Plan**: Ask the AI to read `docs/context/SUMMARY.md` and `docs/context/WORK_PLAN.md`.
2.  **Propose & Confirm**: The AI must propose the **solution** and **implementation strategy** *before* coding. You confirm before it implements.
    > "Based on `dynamic-themes/schemas/architecture-schema.mjs`, create a plan to add a new token category. Do not implement yet—wait for my confirmation."
    > "Propose the solution and which files you will change; I will confirm before you edit anything."
3.  **Confirm**: Explicitly say that the approach is approved (e.g. "ok", "pode implementar", "proceed").
4.  **Execute**: Only after your confirmation, the AI implements step-by-step.
5.  **Verify**: "Does this implementation violate any rule in `RULES.md`?"

**Rule for the AI**: For any feature, fix, or refactor, the AI must not write code or edit files until you have confirmed the proposed solution and strategy. See `docs/context/AGENT_GUIDE.md` → "Confirm Before Implementing".

### 3. Creating a New Theme
**Workflow**:
1.  **Context**: Point the AI to `docs/context/DYNAMIC_THEMES.md`.
2.  **Command**:
    > "I need a new theme called 'aplica_x'. Use `dynamic-themes/configs/theme-engine.config.mjs` as a template. Follow the naming conventions in `RULES.md`."

### 4. Refactoring & Code Reviews
**Workflow**:
1.  **Context**: "Read `transformers/SIMPLIFIED-ARCHITECTURE.md`."
2.  **Command**:
    > "Review the code in `transformers/build.mjs`. proposing a refactor to improve [X]. Ensure you maintain the 5-layer architecture described in the documentation."

## 🤖 Effective Prompting Cheat Sheet

| Goal | Recommended Prompt Structure |
| :--- | :--- |
| **Fix a Bug** | "Read `docs/context/RULES.md` and `transformers/TESTING.md`. Here is the error: [ERROR]. Analyze the root cause and propose a fix." |
| **Write Docs** | "Read `docs/context/RULES.md` to understand our language requirements (English). Write documentation for [FEATURE]." |
| **Architecture** | "Do not hallucinate patterns. Read `transformers/SIMPLIFIED-ARCHITECTURE.md` first. How does [FILE] fit into the simplified build?" |

## ⚠️ Common Pitfalls to Avoid

*   **Implementing Without Confirmation**: If the AI starts coding or editing files before you approved the approach, stop it: "Read AGENT_GUIDE → Confirm Before Implementing. Propose the solution and strategy first; I will confirm before you implement."
*   **Assuming Context**: Do not assume the AI remembers the project structure from training data. Force it to read `AI_CONTEXT.md`.
*   **Ignoring Rules**: If the AI suggests code in Portuguese or uses `var`, remind it: "Read `RULES.md` again."
*   **Manual Edits**: If the AI tries to edit files in `data/brand/` manually, stop it. Remind it that those are auto-generated.
