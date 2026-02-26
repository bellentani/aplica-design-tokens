# Aplica Tokens Theme Engine - Arquitetura Core

## Fluxo de Transformações

O sistema utiliza uma arquitetura de 5 camadas com transformações hierárquicas:

```
Brand Theme → Mode → Surface → Semantic → Foundation
```

### Responsabilidades por Camada

| Camada | Responsabilidade | Arquivos |
|--------|------------------|----------|
| **Brand** | Identidade visual da marca | `data/brand/{marca}/*.json` |
| **Mode** | Contexto visual (light/dark) | `data/mode/*.json` |
| **Surface** | Contexto de superfície | `data/surface/*.json` |
| **Semantic** | Consolidação com finalidade | `data/semantic/default.json` |
| **Foundation** | Interface simplificada | `data/foundation/engine/default.json` |

---

## 1. Brand Layer

Define aspectos visuais específicos de cada marca através do **Dynamic Theme Generator**.

### Arquivos Gerados

| Arquivo | Descrição |
|---------|-----------|
| `_primitive_theme.json` | Paletas decompostas (19 níveis) + neutrals (15 níveis) |
| `_grayscale.json` | Escala de cinzas fixa |
| `_brand.json` | Mapeamento semântico de cores |
| `_typography.json` | Famílias, tamanhos e pesos |
| `_borders.json` | Border radius |
| `_ui.json` | Tokens de componentes UI |

### Estrutura de Cores

```
theme.color.{mode}
├── brand
│   ├── branding (first, second, third; fourth ou mais opcional)
│   │   └── {lowest..highest} → background, txtOn, border
│   └── ambient
│       ├── contrast.base (positive, negative)
│       ├── contrast.deep (positive, negative)
│       ├── neutral (lowest..highest)
│       └── grayscale (lowest..highest)
├── interface
│   ├── function (primary, secondary, link, disabled)
│   │   └── {normal, action, active} → surface, txtOn, border
│   └── feedback
│       ├── info_default, info_secondary
│       ├── success_default, success_secondary
│       ├── warning_default, warning_secondary
│       └── danger_default, danger_secondary
├── product
│   ├── promo_default, promo_secondary
│   ├── cashback_default, cashback_secondary
│   └── premium_default, premium_secondary
└── text
    └── title, body, highlight, muted, label
```

---

## 2. Mode Layer

Define como as cores se comportam em diferentes contextos visuais.

### Arquivos

- `data/mode/light.json` - Modo claro
- `data/mode/dark.json` - Modo escuro

### Características

- **Estrutura Consistente:** Ambos os modos usam mesma estrutura (`positive`/`negative`)
- **Referências:** Aponta para `theme.{mode}.*` do brand
- **Estados de Interface:** `normal`, `action`, `active`

### Exemplo de Transformação

```json
// Brand (_brand.json)
"theme.light.brand.branding.first.default.background": "#FFCC00"

// Mode (light.json)
"mode.brand.branding.first.default.background": {
  "$value": "{theme.light.brand.branding.first.default.background}"
}
```

---

## 3. Surface Layer

Aplica lógica de inversão inspirada em fotografia.

### Arquivos

- `data/surface/positive.json` - Superfície padrão
- `data/surface/negative.json` - Superfície invertida

### Lógica de Inversão

```
POSITIVE → NEGATIVE:
lowest  → highest
lower   → higher
low     → high
default → default (mantém)
high    → low
higher  → lower
highest → lowest
```

### Inversão de Contrast

```
Positive Surface:
  base.positive → usa mode...positive
  base.negative → usa mode...negative

Negative Surface:
  base.positive → usa mode...negative (inverte)
  base.negative → usa mode...positive (inverte)
```

---

## 4. Semantic Layer

Consolida todas as transformações em estrutura com finalidade de interface.

### Arquivo

- `data/semantic/default.json`

### Estrutura

```
semantic
├── color
│   ├── brand (branding, ambient)
│   ├── interface (function, feedback)
│   ├── product (promo, cashback, premium)
│   └── text
├── typography
│   ├── fontFamilies (main, content, display, code)
│   ├── fontWeights
│   ├── fontSizes (micro..exa)
│   └── lineHeights (tight, close, regular, wild)
├── dimension
│   ├── spacing (zero..peta)
│   └── sizing (zero..peta)
├── border
│   ├── radii (straight..circular)
│   └── width
└── opacity
```

---

## 5. Foundation Layer

Cria interface simplificada para uso direto em componentes.

### Arquivo

- `data/foundation/engine/default.json`

### Estrutura Simplificada

```
foundation
├── bg (primary, secondary, disabled, brand.*, feedback.*)
├── border (primary, secondary, tertiary, disabled, brand.*, feedback.*)
├── txt (primary, secondary, muted, disabled, brand.*, feedback.*)
├── typography (referências ao semantic)
├── spacing (referências ao semantic)
├── sizing (referências ao semantic)
└── shadows (depth levels)
```

---

## Fluxo Dimensional

Separado do fluxo de cores:

```
Dimensions → Semantic → Foundation
```

### Arquivo

- `data/dimension/normal.json`

### Escala de Dimensões

```
zero: 0      pico: 1      nano: 2      micro: 4
extraSmall: 8    small: 12    medium: 16 (base)
large: 20    extraLarge: 24    mega: 28
giga: 44     tera: 72     peta: 116
```

---

## Feedback e Product Colors

### Feedback (Sistema)

| Categoria | Default | Secondary | Uso |
|-----------|---------|-----------|-----|
| info | Azul claro | Azul saturado | Informações, dicas |
| success | Verde claro | Verde saturado | Confirmações, sucesso |
| warning | Âmbar claro | Laranja saturado | Avisos, atenção |
| danger | Vermelho claro | Vermelho saturado | Erros, perigo |

### Product (Negócio)

| Categoria | Default | Secondary | Uso |
|-----------|---------|-----------|-----|
| promo | Cor promocional | Versão saturada | Promoções, ofertas |
| cashback | Dourado/amarelo | Versão saturada | Cashback, recompensas |
| premium | Roxo/elegante | Versão saturada | Premium, exclusivo |

---

## Sincronização de Arquitetura

O `sync-architecture.mjs` mantém consistência estrutural:

```bash
# Atualizar arquivos
npm run sync:architecture

# Modo teste
npm run sync:architecture:test

# Ver schema
npm run sync:architecture:schema
```

### Schema Centralizado

Definido em `dynamic-themes/schemas/architecture-schema.mjs`:

```javascript
export const FEEDBACK_SCHEMA = {
  items: ['info', 'success', 'warning', 'danger'],
  variants: ['default', 'secondary']
};

export const PRODUCT_SCHEMA = {
  items: ['promo', 'cashback', 'premium'],
  variants: ['default', 'secondary']
};
```

---

*Esta arquitetura garante que mudanças em qualquer camada propagam corretamente para as camadas superiores.*
