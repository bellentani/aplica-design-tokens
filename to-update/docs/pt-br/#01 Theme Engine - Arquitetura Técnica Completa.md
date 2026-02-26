# Aplica Tokens Theme Engine - Arquitetura Técnica Completa

## 📋 Visão Geral

O **Aplica Tokens Theme Engine** é uma arquitetura multidimensional de Design Tokens que permite a criação e gestão escalável de temas visuais através de transformações hierárquicas. Este é um **projeto open-source** criado para trazer melhorias e aprendizados para sistemas de design.

A arquitetura suporta múltiplas marcas, modos visuais (light/dark) e contextos de superfície, gerando temas finais de forma programática através do **Dynamic Theme Generator**.

### Marcas Disponíveis
- `theme_engine` - Tema base/neutro (template)
- `aplica_joy` - Tema rosa/azul
- `aplica_tangerine` - Tema laranja
- `aplica_grinch` - Tema verde

---

## 📐 Architecture Schema (Single Source of Truth)

> ⚠️ **CRÍTICO**: O Architecture Schema é o **ponto de partida** para configurar temas e garantir consistência em todas as camadas de arquitetura.

### Arquivo do Schema
```
dynamic-themes/schemas/architecture-schema.mjs
```

### O que o Schema Controla

| Export | Propósito |
|--------|-----------|
| `FEEDBACK_SCHEMA` | Define tipos de feedback (`info`, `success`, `warning`, `danger`) e variantes (`default`, `secondary`) |
| `PRODUCT_SCHEMA` | Define tipos de produto (`promo`, `cashback`, `premium`) e variantes (`default`, `secondary`) |
| `INTENSITY_LEVELS` | Níveis simplificados para arquitetura (`lowest`, `default`, `highest`) |
| `BEHAVIOR_LEVELS` | Estados comportamentais completos para camada de tema (`lowest`, `action`, `normal`, `active`, `highest`) |
| `COLOR_PROPERTIES` | Propriedades da camada de arquitetura (`background`, `txtOn`, `border`) |
| `THEME_COLOR_PROPERTIES` | Propriedades da camada de tema (`surface`, `txtOn`, `border`) |
| `SURFACE_TYPES` | Contextos de superfície (`positive`, `negative`) |

### Workflow do Schema

```
1. Editar Schema (architecture-schema.mjs)
           ↓
2. Sincronizar Arquitetura (npm run sync:architecture)
           ↓
3. Atualizar Configs de Tema (*.config.mjs)
           ↓
4. Gerar Temas (npm run themes:generate)
           ↓
5. Build (npm run build)
```

### Por que o Schema é Importante

1. **Todos os arquivos de arquitetura dependem dele** - `mode`, `surface`, `semantic`, `foundation` são gerados a partir do schema
2. **Configs de tema devem alinhar** - Mapeamentos em `*.config.mjs` devem seguir estrutura do schema
3. **Consistência garantida** - Todos os temas compartilham estrutura idêntica de tokens
4. **Sem edições manuais** - Arquivos de arquitetura nunca devem ser editados manualmente

### Comandos do Schema

```bash
npm run sync:architecture         # Atualiza arquivos de arquitetura
npm run sync:architecture:test    # Verifica sem alterar
npm run sync:architecture:schema  # Exibe schema atual
```

---

## 🏗️ Arquitetura de 5 Camadas

### **Single Source of Truth (SSoT)**

```
Brand → Mode → Surface → Semantic → Foundation
```

```
aplica-tokens-theme-engine/
├── data/                           # Design tokens (Tokens Studio)
│   ├── brand/                      # Tokens específicos de cada marca
│   │   ├── theme_engine/           # Tema base
│   │   │   ├── _brand.json         # Mapeamento semântico de cores
│   │   │   ├── _grayscale.json     # Escala de cinzas
│   │   │   ├── _primitive_theme.json # Paletas de cores decompostas
│   │   │   ├── _typography.json    # Tokens de tipografia
│   │   │   ├── _borders.json       # Tokens de borda
│   │   │   ├── _ui.json            # Tokens de UI components
│   │   │   └── $meta.json          # Metadados do tema
│   │   ├── aplica_joy/
│   │   ├── aplica_tangerine/
│   │   └── aplica_grinch/
│   ├── mode/                       # Modos visuais
│   │   ├── light.json              # Modo claro
│   │   └── dark.json               # Modo escuro
│   ├── surface/                    # Contextos de superfície
│   │   ├── positive.json           # Superfície padrão
│   │   └── negative.json           # Superfície invertida
│   ├── semantic/                   # Tokens semânticos
│   │   └── default.json
│   ├── foundation/                 # Foundation (aliases)
│   │   └── engine/
│   │       └── default.json
│   ├── dimension/                  # Dimensões (spacing, sizing)
│   │   └── normal.json
│   └── components/                 # Opcional; o build ignora se não existir
│       ├── buttonMain.json
│       ├── inputField.json
│       └── [outros componentes...]
├── dynamic-themes/                 # Sistema de geração dinâmica
│   ├── configs/                    # Configurações de temas
│   ├── scripts/                    # Scripts de geração
│   ├── schemas/                    # Schema de arquitetura
│   └── templates/                  # Templates de geração
├── transformers/                   # Sistema de build
└── dist/                          # Arquivos gerados
```

---

## 🔄 Fluxo de Transformações

### **Fluxo Principal de Cores**
```
Brand Theme → Mode → Surface → Semantic → Foundation
```

### **Fluxo Dimensional** 
```
Dimensions → Semantic → Foundation
```

### **Fluxo de Componentes**
```
Semantic → Components (direto)
```

---

## 📊 Camadas Detalhadas

### **1. BRAND - Identidade Visual**

#### Arquivos Gerados por Tema

| Arquivo | Descrição |
|---------|-----------|
| `_primitive_theme.json` | Paletas de cores (19 níveis cada) + neutrals (15 níveis) + behavior |
| `_grayscale.json` | Escala de cinzas fixa |
| `_brand.json` | Mapeamento semântico de cores |
| `_typography.json` | Famílias, tamanhos e pesos de fontes |
| `_borders.json` | Tokens de border radius |
| `_ui.json` | Tokens de componentes UI |

> ⚠️ **IMPORTANTE:** Todos os arquivos contêm um header `_meta` indicando que são auto-gerados. Não edite manualmente - modifique o arquivo de configuração.

#### Estrutura de Cores (`_brand.json`)

**`theme.color.{mode}.brand.branding`:**
- **first, second, third** (fourth ou mais opcional quando configurado) - Hierarquia ordinal de cores da marca
- Cada cor tem variações de intensidade:
  - `lowest` → `lower` → `low` → `default` → `high` → `higher` → `highest`
- Propriedades: `background`, `txtOn`, `border`

**`theme.color.{mode}.brand.ambient`:**
- **contrast.base** - Cores próximas ao preto/branco
  - `positive` - cores claras
  - `negative` - cores escuras
- **contrast.deep** - Preto (#000) e branco (#fff) absolutos
- **neutral** - Cores neutras derivadas da cor principal (7 níveis)
- **grayscale** - Escala de cinza padrão (7 níveis)

**`theme.color.{mode}.interface`:**
- **function** - Cores funcionais de UI
  - `primary`, `secondary`, `link`, `disabled`
  - Estados: `normal`, `action`, `active`
- **feedback** - Cores de feedback do sistema
  - `info_default`, `info_secondary`
  - `success_default`, `success_secondary`
  - `warning_default`, `warning_secondary`
  - `danger_default`, `danger_secondary`

**`theme.color.{mode}.product`:**
- **promo** - Promoções (`promo_default`, `promo_secondary`)
- **cashback** - Cashback (`cashback_default`, `cashback_secondary`)
- **premium** - Premium (`premium_default`, `premium_secondary`)

**`theme.color.{mode}.text`:**
- `title`, `body`, `highlight`, `muted`, `label`
- Cores de feedback: `info`, `success`, `warning`, `danger`

### **2. MODE - Contextos Visuais**

Define como as cores se comportam em diferentes contextos visuais.

| Arquivo | Descrição |
|---------|-----------|
| `mode/light.json` | Modo claro |
| `mode/dark.json` | Modo escuro |

**Consistência de Estrutura:**
- Ambos os modos usam a mesma estrutura (`positive`/`negative`)
- Permite compatibilidade entre modos
- Referências funcionam consistentemente

**Estados de Interface (exclusivos do MODE):**
- `negative`, `action`, `normal`, `active`, `positive`
- Aplicados em: `surface`, `txtOn`, `border`

### **3. SURFACE - Lógica Fotográfica**

Aplica conceito de hierarquia visual inspirado em fotografia.

| Arquivo | Descrição |
|---------|-----------|
| `surface/positive.json` | Superfície padrão (como filme positivo) |
| `surface/negative.json` | Superfície invertida (como negativo) |

**Lógica de Inversão:**
```
POSITIVE → NEGATIVE:
- lowest → highest
- lower → higher
- low → high
- default → default (mantém)
- high → low
- higher → lower
- highest → lowest
```

### **4. SEMANTIC - Consolidação Final**

Consolida todas as transformações em um tema unificado.

**Estrutura do Semantic:**
- `semantic.color` - Sistema completo de cores
- `semantic.typography` - Sistema tipográfico
- `semantic.dimension` - Spacing e sizing
- `semantic.border` - Border radius e width
- `semantic.opacity` - Sistema de transparências

### **5. FOUNDATION - Interface Simplificada**

Cria interface simplificada para uso direto em componentes.

**Estrutura do Foundation:**
- `foundation.bg` - Backgrounds
- `foundation.border` - Bordas
- `foundation.txt` - Texto
- `foundation.typography` - Tipografia
- `foundation.spacing` - Espaçamentos
- `foundation.sizing` - Tamanhos

---

## 🎨 Sistema de Cores

### Decomposição de Cores

Cada cor base é decomposta automaticamente em:

| Componente | Níveis | Descrição |
|------------|--------|-----------|
| `palette.surface` | 10-190 (19 níveis) | Cores de superfície |
| `palette.txtOn` | 10-190 | Cores de texto em cada superfície |
| `palette.border` | 10-190 | Cores de borda |
| `neutrals.surface` | 5-140 (15 níveis) | Neutros derivados da cor |
| `neutrals.txtOn` | 5-140 | Texto em neutros |
| `neutrals.border` | 5-140 | Bordas para neutros |
| `behavior` | 5 estados | Referências semânticas |

### Estados de Behavior

| Estado | Nível | Uso |
|--------|-------|-----|
| `lightest` | 10 | Backgrounds sutis |
| `active` | 50 | Estado ativo/hover |
| `normal` | 100 | Estado padrão |
| `action` | 120 | CTAs |
| `darkest` | 170 | Máximo contraste |

### Feedback Colors

Nova estrutura com variantes default/secondary:

| Feedback | Default | Secondary |
|----------|---------|-----------|
| info | Azul claro | Azul saturado |
| success | Verde claro | Verde saturado |
| warning | Âmbar claro | Laranja saturado |
| danger | Vermelho claro | Vermelho saturado |

### Product Colors

Estrutura simplificada:

| Produto | Default | Secondary |
|---------|---------|-----------|
| promo | Cor promocional | Versão saturada |
| cashback | Dourado/amarelo | Versão saturada |
| premium | Roxo/elegante | Versão saturada |

---

## 🔧 Dynamic Theme Generator

### Gerando Temas

```bash
# Gerar todos os temas
npm run themes:generate

# Gerar tema específico
node dynamic-themes/scripts/generate-all-themes.mjs --config=aplica_joy
```

### Estrutura de Configuração

```javascript
// dynamic-themes/configs/my-brand.config.mjs
export default {
  name: 'my_brand',
  
  colors: {
    brand_primary: '#0066CC',
    brand_secondary: '#2E2E2E',
    
    // Feedback colors (default = lighter, secondary = saturated)
    feedback_info: '#047AF1',
    feedback_info_dark: '#0356B0',
    feedback_success: '#00A838',
    feedback_success_dark: '#007A28',
    feedback_warning: '#F28E01',
    feedback_warning_dark: '#C47100',
    feedback_error: '#E82727',
    feedback_error_dark: '#B81C1C',
    
    // Product colors
    promo_red: '#e91935',
    promo_red_dark: '#c41228',
    cashback_gold: '#ffcc00',
    cashback_gold_dark: '#d4a800',
    premium_purple: '#6e3ce4',
    premium_purple_dark: '#5424c9'
  },
  
  mapping: {
    brand: {
      first: 'brand_primary',
      second: 'brand_secondary'
    },
    interface: {
      function: {
        primary: 'action_primary',
        secondary: 'action_secondary'
      },
      feedback: {
        info_default: 'feedback_info',
        info_secondary: 'feedback_info_dark',
        success_default: 'feedback_success',
        success_secondary: 'feedback_success_dark',
        warning_default: 'feedback_warning',
        warning_secondary: 'feedback_warning_dark',
        danger_default: 'feedback_error',
        danger_secondary: 'feedback_error_dark'
      }
    },
    product: {
      promo_default: 'promo_red',
      promo_secondary: 'promo_red_dark',
      cashback_default: 'cashback_gold',
      cashback_secondary: 'cashback_gold_dark',
      premium_default: 'premium_purple',
      premium_secondary: 'premium_purple_dark'
    }
  },
  
  options: {
    txtOnStrategy: 'high-contrast',
    darkModeChroma: 0.85,
    includePrimitives: true
  },
  
  typography: {
    fontFamilies: {
      main: 'Roboto Flex',
      content: 'Roboto Flex',
      display: 'Roboto Flex',
      code: 'Source Code Pro'
    }
  }
};
```

---

## 🔄 Sync Architecture Script

Sincroniza arquivos de arquitetura com o schema definido.

### Comandos

```bash
# Atualizar arquivos de arquitetura
npm run sync:architecture

# Modo teste (não altera arquivos)
npm run sync:architecture:test

# Ver schema atual
npm run sync:architecture:schema
```

### Arquivos Atualizados

- `data/mode/light.json` e `data/mode/dark.json`
- `data/surface/positive.json` e `data/surface/negative.json`
- `data/semantic/default.json`
- `data/foundation/engine/default.json`

### Schema

Definido em `dynamic-themes/schemas/architecture-schema.mjs`:

| Categoria | Itens | Variantes |
|-----------|-------|-----------|
| Feedback | `info`, `success`, `warning`, `danger` | `default`, `secondary` |
| Product | `promo`, `cashback`, `premium` | `default`, `secondary` |

---

## 🚀 Sistema de Build

### Tecnologias

- **Style Dictionary v5** - Engine de transformação
- **@tokens-studio/sd-transforms** - Integração Tokens Studio
- **Node.js** - Runtime

### Comandos Principais

```bash
# Build completo
npm run build

# Build por camada
npm run build:semantic
npm run build:foundation
npm run build:components

# Geração de temas
npm run themes:generate
```

### Plataformas de Output

- **JSON** - Tokens estruturados (`.json`)
- **JavaScript** - CommonJS (`.cjs`)
- **ES Modules** - Modern JavaScript (`.mjs`)
- **TypeScript** - Declarations (`.d.ts`, `.d.mts`)
- **CSS** - CSS Variables (`.css`)

### Arquivos Gerados

```
dist/
├── json/                              # JSON tokens
│   ├── theme_engine-light-positive.json
│   ├── theme_engine-dark-positive.json
│   ├── aplica_joy-light-positive.json
│   └── foundation/foundation.json
├── esm/                               # ES Modules
│   └── theme_engine-light-positive.mjs
├── js/                                # CommonJS
│   └── theme_engine-light-positive.cjs
└── css/                               # CSS Variables
    └── theme_engine-light-positive.css
```

---

## 📈 Escalabilidade

### Combinações Automáticas

```
6 marcas × 2 modos × 2 superfícies = 24 temas semânticos
+ 6 temas foundation
= 30 temas totais
```

### Adicionando Nova Marca

1. Criar `dynamic-themes/configs/nova-marca.config.mjs`
2. Executar `npm run themes:generate`
3. Executar `npm run build`
4. Sistema gera automaticamente 4 temas (light/dark × positive/negative)

---

## 🎯 Benefícios

### Escalabilidade Exponencial
- Adicionar 1 marca gera 4+ temas automaticamente
- Novos modos/superfícies multiplicam possibilidades

### Consistência Garantida
- Transformações matemáticas padronizadas
- Hierarquia visual preservada
- Acessibilidade validada automaticamente

### Manutenção Simplificada
- Mudanças em 1 arquivo propagam para todos os temas
- Responsabilidades isoladas por camada
- Schema centralizado para estrutura de tokens

---

*Esta arquitetura transforma a complexidade de múltiplos temas em um processo automatizado, escalável e confiável.*
