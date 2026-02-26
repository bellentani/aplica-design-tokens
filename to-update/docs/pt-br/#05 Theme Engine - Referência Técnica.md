# Aplica Tokens Theme Engine - Referência Técnica

## Comandos NPM

### Build

```bash
# Build completo (semantic + foundation + components)
npm run build

# Pipeline completo de temas (ensure:data, themes, dimension, sync, foundations, build)
npm run build:themes

# Build por camada
npm run build:semantic
npm run build:foundation
npm run build:components
```

### Geração de Temas

```bash
# Gerar todos os temas
npm run themes:generate

# Gerar tema específico (use o nome do arquivo sem .config.mjs, ex.: aplica-joy para aplica-joy.config.mjs)
node dynamic-themes/scripts/generate-all-themes.mjs --config=aplica-joy
```

### Arquitetura e Data

```bash
# Garantir estrutura de data (ex.: após clone)
npm run ensure:data

# Gerar escala de dimensão
npm run dimension:generate

# Sincronizar arquivos de arquitetura
npm run sync:architecture

# Modo teste (não altera arquivos)
npm run sync:architecture:test

# Ver schema atual
npm run sync:architecture:schema
```

### Foundations

```bash
# Gerar todas as foundations
npm run foundations:generate

# Validar uma foundation contra tokens semânticos
npm run foundations:validate data/foundation/engine/default.json
```

---

## Estrutura de Arquivos

### Diretório data/

```
data/
├── brand/                    # Tokens por marca
│   ├── theme_engine/
│   ├── aplica_joy/
│   ├── aplica_tangerine/
│   └── aplica_grinch/
├── mode/                     # Modos visuais
│   ├── light.json
│   └── dark.json
├── surface/                  # Superfícies
│   ├── positive.json
│   └── negative.json
├── semantic/                 # Tokens semânticos
│   └── default.json
├── foundation/               # Foundation
│   └── engine/
│       └── default.json
├── dimension/                # Dimensões
│   └── normal.json
└── components/               # Opcional; o build ignora se não existir
```

### Diretório dynamic-themes/

```
dynamic-themes/
├── configs/                  # Configurações de temas
│   ├── theme-engine.config.mjs
│   ├── aplica-joy.config.mjs
│   ├── aplica-tangerine.config.mjs
│   └── aplica-grinch.config.mjs
├── scripts/                  # Scripts de geração
│   ├── generate-all-themes.mjs
│   ├── theme-generator.mjs
│   ├── color-decomposer.mjs
│   ├── typography-generator.mjs
│   └── sync-architecture.mjs
├── schemas/                  # Schema de arquitetura
│   └── architecture-schema.mjs
└── templates/                # Templates
```

---

## Nomenclatura de Tokens

### Padrão Semântico

```
semantic.{categoria}.{subcategoria}.{propriedade}
```

Exemplos:
```
semantic.color.brand.branding.first.default.background
semantic.color.interface.function.primary.normal.surface
semantic.typography.fontSizes.medium
semantic.dimension.spacing.large
```

### Padrão Foundation

```
foundation.{grupo}.{variante}
```

Exemplos:
```
foundation.bg.primary
foundation.txt.secondary
foundation.border.brand.first.default
```

---

## Schema de Cores

### Feedback Colors

```javascript
{
  items: ['info', 'success', 'warning', 'danger'],
  variants: ['default', 'secondary']
}
```

### Product Colors

```javascript
{
  items: ['promo', 'cashback', 'premium'],
  variants: ['default', 'secondary']
}
```

### Níveis de Intensidade

```javascript
['lowest', 'lower', 'low', 'default', 'high', 'higher', 'highest']
```

### Propriedades de Cor

```javascript
['background', 'txtOn', 'border']
```

---

## Decomposição de Cores

### Níveis de Paleta (19)

```
10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190
```

### Níveis de Neutrals (15)

```
5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140
```

### Estados de Behavior

| Estado | Nível | Uso |
|--------|-------|-----|
| `lightest` | 10 | Backgrounds sutis |
| `active` | 50 | Estado hover/active |
| `normal` | 100 | Estado padrão |
| `action` | 120 | CTAs |
| `darkest` | 170 | Máximo contraste |

---

## Escala de Dimensões

```javascript
{
  zero: 0,
  pico: 1,
  nano: 2,
  micro: 4,
  extraSmall: 8,
  small: 12,
  medium: 16,  // base
  large: 20,
  extraLarge: 24,
  mega: 28,
  giga: 44,
  tera: 72,
  peta: 116
}
```

---

## Border Radius

```javascript
{
  straight: 0,
  micro: 2,
  extraSmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  extraLarge: 20,
  mega: 24,
  circular: 9999
}
```

---

## Tipografia

### Famílias

```javascript
{
  main: 'Roboto Flex',      // UI principal
  content: 'Roboto Flex',   // Corpo de texto
  display: 'Roboto Flex',   // Títulos/display
  code: 'Source Code Pro'   // Código
}
```

### Tamanhos

```javascript
{
  micro: 10,
  extraSmall: 12,
  small: 14,
  medium: 16,  // base
  large: 20,
  extraLarge: 24,
  mega: 28,
  giga: 36,
  tera: 40,
  peta: 48,
  exa: 60
}
```

### Line Heights

```javascript
{
  tight: 100%,    // Compacto
  close: 120%,    // Próximo
  regular: 140%,  // Regular
  wild: 180%      // Espaçado
}
```

---

## Plataformas de Output

| Formato | Extensão | Uso |
|---------|----------|-----|
| JSON | `.json` | Tokens estruturados |
| JavaScript | `.cjs` | CommonJS |
| ES Modules | `.mjs` | Modern JavaScript |
| TypeScript | `.d.ts` | Type declarations |
| CSS | `.css` | CSS Variables |

---

## Arquivos de Configuração

### themes.config.mjs

Define marcas e configurações de build.

### base-config.mjs

Configurações base do Style Dictionary.

### architecture-schema.mjs

Schema centralizado para estrutura de tokens.

---

**Ver também:** [#10 Theme Engine - Configurando Temas e Foundations](#10-theme-engine---configurando-temas-e-foundations) para configuração passo a passo de temas e foundations.

*Use esta referência para consulta rápida de valores e padrões do sistema.*
