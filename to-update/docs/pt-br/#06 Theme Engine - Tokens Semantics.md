# Aplica Tokens Theme Engine - Token Semantics

## Sistema de Cores

### Hierarquia de Cores da Marca

A estrutura de cores segue uma hierarquia ordinal:

```
brand.branding.first    → Cor primária da marca
brand.branding.second   → Cor secundária
brand.branding.third    → Cor terciária
brand.branding.fourth   → Cor quaternária (opcional; estender schema/config ao usar)
```

### Níveis de Intensidade

Cada cor da marca possui 7 níveis de intensidade:

| Nível | Descrição | Uso |
|-------|-----------|-----|
| `lowest` | Mais claro possível | Backgrounds sutis |
| `lower` | Muito claro | Hover states |
| `low` | Claro | Bordas suaves |
| `default` | Padrão da marca | Elementos principais |
| `high` | Escuro | Texto sobre claro |
| `higher` | Muito escuro | Ênfase |
| `highest` | Mais escuro possível | Máximo contraste |

### Propriedades de Cor

Cada nível possui 3 propriedades:

```
background  → Cor de fundo
txtOn       → Cor de texto sobre o fundo
border      → Cor de borda
```

---

## Feedback Colors

Cores de feedback do sistema com estrutura default/secondary:

### Estrutura

| Feedback | Default | Secondary | Uso |
|----------|---------|-----------|-----|
| `info` | Azul claro | Azul saturado | Informações, dicas, ajuda |
| `success` | Verde claro | Verde saturado | Confirmação, sucesso |
| `warning` | Âmbar claro | Laranja saturado | Avisos, atenção |
| `danger` | Vermelho claro | Vermelho saturado | Erros, perigo |

### Exemplo de Uso

```css
/* Background informativo sutil */
.info-banner {
  background: var(--semantic-color-interface-feedback-info_default-background);
}

/* Background informativo forte */
.info-badge {
  background: var(--semantic-color-interface-feedback-info_secondary-background);
}
```

---

## Product Colors

Cores de semântica de produto/negócio:

### Estrutura

| Produto | Default | Secondary | Uso |
|---------|---------|-----------|-----|
| `promo` | Cor promocional | Versão saturada | Promoções, ofertas, descontos |
| `cashback` | Dourado/amarelo | Versão saturada | Cashback, recompensas |
| `premium` | Roxo/elegante | Versão saturada | Premium, VIP, exclusivo |

### Exemplo de Uso

```css
/* Tag de promoção */
.promo-tag {
  background: var(--semantic-color-product-promo_default-background);
  color: var(--semantic-color-product-promo_default-txtOn);
}

/* Badge de cashback */
.cashback-badge {
  background: var(--semantic-color-product-cashback_secondary-background);
}
```

---

## Ambient Colors

### Contrast

Cores base da interface:

```
ambient.contrast.base.positive    → Base clara
ambient.contrast.base.negative    → Base escura
ambient.contrast.deep.positive    → Branco absoluto (#fff)
ambient.contrast.deep.negative    → Preto absoluto (#000)
```

### Neutral

Neutros derivados da cor primária (7 níveis):

```
ambient.neutral.lowest   → Mais claro
ambient.neutral.lower
ambient.neutral.low
ambient.neutral.mid      → Médio
ambient.neutral.high
ambient.neutral.higher
ambient.neutral.highest  → Mais escuro
```

### Grayscale

Escala de cinza padrão (7 níveis):

```
ambient.grayscale.lowest   → Branco/off-white
ambient.grayscale.lower
ambient.grayscale.low
ambient.grayscale.mid      → Cinza médio
ambient.grayscale.high
ambient.grayscale.higher
ambient.grayscale.highest  → Preto/near-black
```

---

## Interface Function

Cores funcionais de interface:

### Estados

| Estado | Descrição |
|--------|-----------|
| `normal` | Estado padrão |
| `action` | Estado de ação/CTA |
| `active` | Estado ativo/hover |

### Exemplo

```css
.button-primary {
  /* Estado normal */
  background: var(--semantic-color-interface-function-primary-normal-surface);
  color: var(--semantic-color-interface-function-primary-normal-txtOn);
}

.button-primary:hover {
  /* Estado active */
  background: var(--semantic-color-interface-function-primary-active-surface);
}
```

---

## Text Colors

Cores de texto simplificadas:

| Token | Uso |
|-------|-----|
| `text.title` | Títulos, headings |
| `text.body` | Corpo de texto |
| `text.highlight` | Texto destacado |
| `text.muted` | Texto secundário |
| `text.label` | Labels, captions |

---

## Opacity System

Sistema de transparências:

| Token | Valor | Uso |
|-------|-------|-----|
| `transparent` | 0% | Completamente transparente |
| `superTransparent` | 10% | Quase invisível |
| `semiTranslucid` | 20% | Sutil |
| `translucid` | 50% | Meio termo |
| `superTranslucid` | 80% | Quase opaco |
| `semiOpaque` | 90% | Levemente transparente |
| `opaque` | 100% | Completamente opaco |

---

## Nomenclatura CSS Variables

### Padrão Semântico

```
--semantic-color-{categoria}-{subcategoria}-{propriedade}
```

### Padrão Foundation

```
--foundation-{grupo}-{variante}
```

### Exemplos

```css
/* Semantic */
--semantic-color-brand-branding-first-default-background
--semantic-color-interface-feedback-success_default-background
--semantic-color-product-promo_secondary-txtOn

/* Foundation */
--foundation-bg-primary
--foundation-txt-secondary
--foundation-border-brand-first
```

---

*Use estas semânticas para garantir consistência visual em toda a aplicação.*
