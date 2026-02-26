# Conventional Commits

This project follows [Conventional Commits](https://www.conventionalcommits.org/) to standardize commit messages.

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Commit Types

### `feat`
New features for the user.
```bash
feat: add new typography styles for mobile
feat(colors): add new primary color palette
```

### `fix`
Bug fixes.
```bash
fix: resolve typography line height issue
fix(spacing): correct spacing values in mobile theme
```

### `docs`
Documentation changes.
```bash
docs: update README with new installation steps
docs: add examples for typography usage
```

### `style`
Changes that do not affect code meaning (spacing, formatting, etc.).
```bash
style: format JSON files with consistent indentation
style: fix code formatting issues
```

### `refactor`
Code refactoring that does not fix bugs or add features.
```bash
refactor: reorganize typography structure
refactor(colors): simplify color token organization
```

### `perf`
Performance improvements.
```bash
perf: optimize typography rendering
perf: reduce bundle size by removing unused tokens
```

### `test`
Adding or updating tests.
```bash
test: add unit tests for typography styles
test: fix failing color validation tests
```

### `chore`
Maintenance tasks, dependencies, etc.
```bash
chore: update dependencies
chore: add commitizen configuration
```

### `ci`
CI/CD changes.
```bash
ci: add GitHub Actions workflow
ci: update deployment configuration
```

### `build`
Build system changes.
```bash
build: update webpack configuration
build: add new build scripts
```

### `revert`
Revert previous commits.
```bash
revert: revert "feat: add new typography styles"
```

## Scope (Optional)

Scope should be the name of the affected component (in parentheses):

```bash
feat(typography): add new display styles
fix(colors): resolve contrast issues
docs(spacing): update spacing documentation
```

## Description

- Use imperative, present tense: "add" not "added" or "adds"
- Do not capitalize the first letter
- Do not end with a period (.)

## Body (Optional)

Use the body to explain what and why vs. how:

```bash
feat: add new typography styles

- Add display1 through display4 styles for desktop
- Improve readability with optimized line heights
- Support both regular and bold font weights
```

## Footer (Optional)

Use the footer to reference issues:

```bash
feat: add new typography styles

Closes #123
Fixes #456
```

## How to Use

### Manual commit
```bash
git commit -m "feat: add new typography styles for mobile"
```

## Validation

The project uses commitlint to validate commit format automatically. Commits that do not follow the convention will be rejected.

### Length rules (commitlint)

- **Subject:** minimum 15 characters, maximum 72.
- **Header (type + scope + subject):** maximum 90 characters.

### IDE usage (Cursor / VS Code)

- **Maximum length** rules are in `.vscode/settings.json`: the commit box warns when the first line exceeds 90 characters.
- **Minimum length** is not validated by the IDE; commitlint enforces it on commit (minimum 15 characters in the subject).
- To use the commit template in the terminal (format reminder), configure once per project:
  ```bash
  git config commit.template .vscode/commit-template.txt
  ```

## Valid Commit Examples

```bash
feat: add new color palette
fix(typography): resolve line height issues
docs: update installation guide
style: format JSON files
refactor(colors): reorganize color structure
perf: optimize token generation
test: add typography validation tests
chore: update dependencies
ci: add GitHub Actions workflow
build: update build configuration
revert: revert "feat: add new colors"
```

## Invalid Commit Examples

```bash
# Missing type
update typography styles

# Invalid type
update: add new styles

# Description too long
feat: add a very long description that exceeds the maximum length allowed for commit messages

# Period at the end
feat: add new styles.

# Capitalized
feat: Add new styles
```
