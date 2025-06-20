# Conventional Commits

Este projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/) para padronizar as mensagens de commit.

## Formato

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Tipos de Commit

### `feat`
Novas funcionalidades para o usuário.
```bash
feat: add new typography styles for mobile
feat(colors): add new primary color palette
```

### `fix`
Correções de bugs.
```bash
fix: resolve typography line height issue
fix(spacing): correct spacing values in mobile theme
```

### `docs`
Mudanças na documentação.
```bash
docs: update README with new installation steps
docs: add examples for typography usage
```

### `style`
Mudanças que não afetam o significado do código (espaçamento, formatação, etc.).
```bash
style: format JSON files with consistent indentation
style: fix code formatting issues
```

### `refactor`
Refatoração de código que não corrige bugs nem adiciona funcionalidades.
```bash
refactor: reorganize typography structure
refactor(colors): simplify color token organization
```

### `perf`
Melhorias de performance.
```bash
perf: optimize typography rendering
perf: reduce bundle size by removing unused tokens
```

### `test`
Adicionando ou corrigindo testes.
```bash
test: add unit tests for typography styles
test: fix failing color validation tests
```

### `chore`
Tarefas de manutenção, dependências, etc.
```bash
chore: update dependencies
chore: add commitizen configuration
```

### `ci`
Mudanças em arquivos de CI/CD.
```bash
ci: add GitHub Actions workflow
ci: update deployment configuration
```

### `build`
Mudanças no sistema de build.
```bash
build: update webpack configuration
build: add new build scripts
```

### `revert`
Reverter commits anteriores.
```bash
revert: revert "feat: add new typography styles"
```

## Escopo (Opcional)

O escopo deve ser o nome do componente afetado (entre parênteses):

```bash
feat(typography): add new display styles
fix(colors): resolve contrast issues
docs(spacing): update spacing documentation
```

## Descrição

- Use o imperativo, tempo presente: "add" não "added" nem "adds"
- Não capitalize a primeira letra
- Não termine com ponto (.)

## Corpo (Opcional)

Use o corpo para explicar o que e por que vs. como:

```bash
feat: add new typography styles

- Add display1 through display4 styles for desktop
- Improve readability with optimized line heights
- Support both regular and bold font weights
```

## Rodapé (Opcional)

Use o rodapé para referenciar issues:

```bash
feat: add new typography styles

Closes #123
Fixes #456
```

## Como Usar

### Usando Commitizen (Recomendado)
```bash
npm run commit
```

### Commit Manual
```bash
git commit -m "feat: add new typography styles for mobile"
```

## Validação

O projeto usa commitlint para validar automaticamente o formato dos commits. Se o commit não seguir o padrão, ele será rejeitado.

## Exemplos de Commits Válidos

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

## Exemplos de Commits Inválidos

```bash
# Sem tipo
update typography styles

# Tipo inválido
update: add new styles

# Descrição muito longa
feat: add a very long description that exceeds the maximum length allowed for commit messages

# Com ponto no final
feat: add new styles.

# Capitalizado
feat: Add new styles
``` 