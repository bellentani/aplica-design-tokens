# Project Rules & Constitution

> **Status**: Active
> **Applicability**: All Contributors (Human & AI)

## 1. Language Rules (Non-Negotiable)

**CRITICAL:** All code and documentation must be in **English** for better LLM compatibility and international collaboration.

1.  **All code comments MUST be in English**
    *   Inline comments, block comments, JSDoc comments
    *   Error messages and console output
    *   Test descriptions and assertions
    *   **Reason**: Ensures any AI model can fully understand the intent.

2.  **All documentation files MUST be in English**
    *   README files, markdown documentation
    *   Technical specifications
    *   Commit messages and PR descriptions

3.  **Variable and Function Names**
    *   Must be descriptive and in English.

## 2. Code Style & Standards

*   **Module System**: Use ES Modules (`.mjs` extension) strictly.
*   **Documentation**: Use JSDoc for all function documentation.
*   **Variables**: Prefer `const` over `let`. Avoid `var`.
*   **Naming**: Use descriptive variable names. no single-letter variables except in obvious loops.

## 3. Architecture & Single Source of Truth (SSOT)

The project relies on a strict Single Source of Truth architecture for tokens.

*   **Schemas**: There are two distinct schemas serving as SSOT:
    *   `dynamic-themes/schemas/architecture-schema.mjs` - Token structure (feedback, product, brand)
    *   `transformers/schemas/foundation-styles-schema.mjs` - CSS style structure (typography, elevation)
    *   **Constraint**: Do not manually edit `mode/`, `surface/`, `semantic/`, or `dimension/` JSON files.
    *   **Process**: Edit Schema / config -> Run Sync or dimension:generate -> Generate Themes -> Build.
    *   **Dimension**: `data/dimension/normal.json` is generated from `config/dimension.config.mjs` (referenced in `config/themes.config.json` → `global.dimension.config`). Run `npm run dimension:generate` or use `build:themes`.

*   **Generated Files**:
    *   Files in `data/brand/` starting with `_` (e.g., `_brand.json`) are auto-generated.
    *   **Constraint**: NEVER edit these files manually. Edit the configuration or the generator script.

## 4. File Structure & Boundaries

*   **`dynamic-themes/`**: Contains the logic for *generating* themes.
*   **`transformers/`**: Contains the logic for *distributing* tokens (Style Dictionary).
*   **`data/`**: The data warehouse. Should be treated as read-only by most manual processes.

*   **Protected data files (do not delete or overwrite automatically)**  
    These files in `data/` have **no auto-generation feature yet**. Scripts and build must **never** delete or overwrite them:
    *   `data/$metadata.json`
    *   `data/$themes.engine.json.template`
    *   `data/$themes.json`  
    Any future "clean data" or "regenerate data" logic must explicitly exclude these paths until a generation feature exists.

## 5. Release & Versioning

*   **When releasing a version**: Document the list of modified files in `docs/context/RELEASE_FILES.md` (paths relative to repo root). CHANGELOG.md describes *what* changed; RELEASE_FILES.md describes *which files* changed, so forks, other teams, and IA can target updates correctly.

## 6. Agent Behavior Protocols

*   **Confirm Before Implementing**: Before any implementation (code or file edits), present the **solution** (goal and outcome) and **implementation strategy** (steps, files to touch, alternatives considered). Do not write code or edit files until the user explicitly confirms. When in doubt, ask for confirmation.
*   **No Hallucinations**: Do not invent new architectural patterns. Follow existing patterns found in `transformers/SIMPLIFIED-ARCHITECTURE.md`.
*   **Context First**: Before suggesting changes, always verify the current state of the architecture.
*   **Test-Driven**: When modifying build logic, usually run `npm run test:quick` to verify no regressions.

## 7. Accessibility Standards

*   **Validation**: This project strictly enforces accessibility validation.
*   **Constraint**: Do not bypass accessibility warnings unless explicitly instructed.
*   **Level**: Default to WCAG AA, strive for AAA where possible.
