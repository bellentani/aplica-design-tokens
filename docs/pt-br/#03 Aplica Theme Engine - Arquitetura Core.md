# Aplica Theme Engine - Arquitetura Core

## Diagrama Visual do Fluxo

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Single Source of Truth                        │
│                         Git Repository (JSON)                        │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ BRAND THEME Layer                                                   │
│ ├── brand/theme/tangerine/                                          │
│ │   ├── _brand.json        (cores e elementos visuais)             │
│ │   ├── _grayscale.json    (escala de cinzas)                      │
│ │   ├── _theme-typography.json (famílias e pesos)                  │
│ │   ├── _theme-borders.json (raios de borda)                       │
│ │   ├── _theme-depth.json  (sistema de sombras)                    │
│ │   ├── _components.json   (tokens globais)                        │
│ │   └── _tangerine-generated.json (gerado automaticamente)         │
│ ├── brand/theme/joy/                                                │
│ └── brand/theme/grinch/                                             │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ DIMENSIONS Layer                                                    │
│ └── dimensions/dimension.json      (spacing, sizing, typography)    │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ MODE Layer                                                          │
│ ├── mode/light.json         (contexto claro)                       │
│ └── mode/dark.json          (contexto escuro)                      │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ SURFACE Layer                                                       │
│ ├── surface/positive.json   (hierarquia normal)                    │
│ └── surface/negative.json   (hierarquia invertida)                 │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ SEMANTIC Layer                                                      │
│ └── semantic/default.json   (consolidação com finalidade)          │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
┌─────────────────────────────┐   ┌─────────────────────────────┐
│ FOUNDATION Layer            │   │ FIGMA GENERATORS            │
│ ├── foundation/default.json │   │ └── figma-generators/       │
│ └── foundation/styles/      │   │     └── _generator-dimension.json
│     ├── typography-styles.json │
│     └── depth-styles.json   │
└─────────────────────────────┘   └─────────────────────────────┘
```

## Responsabilidades por Camada

### 1. **BRAND THEME - Identidade Visual**
**Responsabilidade:** Define características visuais únicas de cada marca

**Estruturas principais:**
- **Colors:** `theme.light/dark` com brand, ambient, interface, product, text
- **Typography:** Famílias (main, content, display, code) e pesos
- **Borders:** Sistema de raios (straight → circular)
- **Components:** Tokens globais customizáveis por marca

**Marcas Atuais:**
- **joy:** Marca que utiliza Tokens Studio com matemática e cálculos nativos
- **tangerine:** Marca que utiliza nossa API de geração de tokens
- **grinch:** Marca que utiliza nossa API de geração de tokens

**Conceitos-chave:**
- `ambient.contrast.base`: Cores próximas ao preto/branco
- `ambient.contrast.deep`: Preto (#000) e branco (#fff) absolutos
- Intensidades: `lowest` → `default` → `highest`

### 2. **DIMENSIONS - Sistema Dimensional**
**Responsabilidade:** Define valores dimensionais (spacing, sizing, typography)

**Estruturas principais:**
- **`_theme_dimensions`:** Escala de tamanhos (zero → peta)
- **`_theme_typography`:** Font sizes, line heights, letter spacings

**Conceitos-chave:**
- Base: Progressão Fibonacci Adaptada
- Unidade: 1ud = 16px, 1un = 4px
- Escala: 13 níveis de tamanho

### 3. **MODE - Contextos Visuais**
**Responsabilidade:** Adapta tokens para light/dark mode

**Transformações:**
- Referencia tokens específicos de `theme.light` ou `theme.dark`
- Adiciona estados de interface: `negative`, `action`, `normal`, `active`, `positive`
- Define estrutura `main/secondary` para feedback

**Conceito-chave:** Estados só existem aqui porque cores de marca são estáticas

### 4. **SURFACE - Hierarquia Visual**
**Responsabilidade:** Aplica lógica fotográfica positive/negative

**Transformações principais:**
```
POSITIVE → NEGATIVE:
- lowest → highest (inverte intensidades)
- light → dark (inverte contrastes)
- Escala 7 níveis: inverte simetricamente ao redor do mid
```

**Adições:**
- Sistema de opacidade com valores hexadecimais
- Reorganização de feedback com main/secondary

### 5. **SEMANTIC - Consolidação Final**
**Responsabilidade:** Unifica tudo com finalidade de interface

**Estrutura completa:**
```
semantic: {
  color: { brand, interface, text, product },
  opacity: { grayscale, light, raw },
  typography: { families, weights, sizes, heights },
  spacing: { zero → peta },
  sizing: { zero → peta },
  borderRadius: { straight → circular },
  shadows: { depth: level1-4 }
}
```

**Simplificações:**
- Contrast: pega sempre `.light` (base/deep)
- Text: unifica positive/negative conforme surface

### 6. **FOUNDATION - Interface Simplificada**
**Responsabilidade:** Cria interface simplificada para uso direto

**Estrutura:**
- **`bg`:** Backgrounds (primary, secondary, brand, feedback)
- **`border`:** Borders (primary, secondary, brand, feedback)
- **`text`:** Text colors (primary, secondary, brand, feedback)
- **`typography`:** Referências diretas ao semantic
- **`spacing`:** Referências diretas ao semantic
- **`sizing`:** Referências diretas ao semantic
- **`borderRadius`:** Referências diretas ao semantic
- **`shadows`:** Referências diretas ao semantic

**Styles:**
- **`typography-styles.json`:** Combinações pré-definidas
- **`depth-styles.json`:** Combinações de sombras

### 7. **FIGMA GENERATORS - Automação**
**Responsabilidade:** Gera tokens específicos para Figma

**Funcionalidade:**
- Transforma tokens em formato compatível com Tokens Studio
- Automatiza criação de collections e modes no Figma

## Exemplo: Token Atravessando Camadas

Vamos acompanhar a cor primária da marca tangerine:

### 1. **Brand Theme Layer**
```json
"theme.light.brand.branding.first.default.background": "#FF6B00"
```

### 2. **Mode Layer (light)**
```json
"mode.brand.branding.first.default.background": 
  "{theme.light.brand.branding.first.default.background}"
```

### 3. **Surface Layer (positive)**
```json
"surface.color.brand.branding.first.default.background":
  "{mode.brand.branding.first.default.background}"
```

### 4. **Semantic Layer**
```json
"semantic.color.brand.branding.first.default.background":
  "{surface.color.brand.branding.first.default.background}"
```

### 5. **Foundation Layer**
```json
"foundation.bg.primary": "{semantic.color.brand.branding.first.default.background}"
// Resultado final: #FF6B00
```

## Multiplicação de Temas

### Fórmula de Geração
```
Total de Temas = Marcas × Modes × Surfaces × Densities
```

### Exemplo Atual
- **3 marcas** (tangerine, joy, grinch)
- **2 modes** (light, dark)
- **2 surfaces** (positive, negative)
- **1 density** (normal)
- **= 12 temas gerados**

### Nomenclatura Resultante
- `aplica-tangerine-light-positive`
- `aplica-tangerine-light-negative`
- `aplica-tangerine-dark-positive`
- `aplica-tangerine-dark-negative`
- `aplica-joy-light-positive`
- `aplica-joy-light-negative`
- `aplica-joy-dark-positive`
- `aplica-joy-dark-negative`
- `aplica-grinch-light-positive`
- `aplica-grinch-light-negative`
- `aplica-grinch-dark-positive`
- `aplica-grinch-dark-negative`

## Arquivos Estruturais (_underscore)

### Características:
- Não fazem parte da cadeia principal
- Facilitam organização no Tokens Studio
- São referenciados mas não transformados

### Exemplos:
- `_primitive-theme-default.json`: Gerado por API de acessibilidade
- `_color-palette.json`: Factory de cores
- `_theme-dimensions.json`: Sistema dimensional base
- `_theme-typography.json`: Sistema tipográfico base
- `_theme-borders.json`: Sistema de bordas base
- `_theme-depth.json`: Sistema de sombras base
- `_components.json`: Tokens globais de componentes
- `_generator-dimension.json`: Gerador para Figma

## Pontos de Extensão

### 1. **Nova Marca**
- Criar `brand/theme/nova-marca/` com arquivos base
- Automaticamente gera 4 novos temas

### 2. **Novo Mode**
- Adicionar arquivo em `mode/`
- Multiplica temas por 1.5x

### 3. **Nova Surface**
- Adicionar arquivo em `surface/`
- Multiplica temas por 1.5x

### 4. **Nova Density**
- Adicionar em `dimensions/`
- Multiplica todos os temas

## Metadata e Configuração

### **`$metadata.json`:**
- Define ordem de carregamento dos token sets
- Controla precedência e resolução de conflitos
- Estrutura hierárquica de dependências

### **`$themes.json`:**
- Configurações dos temas no Tokens Studio
- Referências para Figma Collections e Modes
- Mapeamento de tokens para variáveis do Figma

---

*Esta arquitetura core fornece a base sólida para todas as transformações e extensões do Aplica Theme Engine.*