# Aplica Theme Engine - Arquitetura Técnica Completa

## 📋 Visão Geral

O **Aplica Theme Engine** é uma arquitetura multidimensional de Design Tokens que permite a criação e gestão escalável de temas visuais através de transformações hierárquicas. A arquitetura suporta múltiplas marcas, modos visuais e contextos de superfície, gerando temas finais de forma programática.

## 🏗️ Arquitetura de 5 Camadas

### **Single Source of Truth (SSoT)**
```
Git Repository (JSON files)
├── brand/theme/
│   ├── tangerine/
│   │   ├── _brand.json
│   │   ├── _grayscale.json
│   │   ├── _theme-typography.json
│   │   ├── _theme-borders.json
│   │   ├── _theme-depth.json
│   │   ├── _components.json
│   │   └── _tangerine-generated.json
│   ├── joy/
│   │   ├── _brand.json
│   │   ├── _grayscale.json
│   │   ├── _theme-typography.json
│   │   ├── _theme-borders.json
│   │   ├── _theme-depth.json
│   │   ├── _components.json
│   │   ├── _primitive-theme-default.json
│   │   └── _primitive-theme-default-config.json
│   └── grinch/
│       ├── _brand.json
│       ├── _grayscale.json
│       ├── _theme-typography.json
│       ├── _theme-borders.json
│       ├── _theme-depth.json
│       ├── _components.json
│       └── _grinch-generated.json
├── dimensions/
│   └── dimension.json
├── mode/
│   ├── light.json
│   └── dark.json
├── surface/
│   ├── positive.json
│   └── negative.json
├── semantic/
│   └── default.json
├── foundation/
│   ├── default.json
│   └── styles/
│       ├── typography-styles.json
│       └── depth-styles.json
├── figma-generators/
│   └── _generator-dimension.json
├── $themes.json
└── $metadata.json
```

**Nota sobre arquivos com underscore (_):**
- São tokens estruturais e indicativos
- Não fazem parte da cadeia principal de transformação
- Facilitam organização de theme sets no Tokens Studio
- Ex: `_primitive-theme-default.json` é gerado por API de acessibilidade

---

## 🔄 Fluxo de Transformações

### **Fluxo Principal**
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

### **1. CORE - Espinha Dorsal**

#### **Brand Theme**
- **Responsabilidade:** Define aspectos visuais específicos de cada marca/tema
- **Localização:** `brand/theme/[marca]/`
- **Marcas Atuais:**
  - **joy:** Marca que utiliza Tokens Studio com matemática e cálculos nativos
  - **tangerine:** Marca que utiliza nossa API de geração de tokens
  - **grinch:** Marca que utiliza nossa API de geração de tokens
- **Conteúdo:** Color palettes, tipografia, elementos visuais do tema

##### **Estrutura de Objetos:**

**`theme.light` vs `theme.dark`:**
- **Propósito:** Gerar light e dark modes com cores específicas
- **Diferenciação:** Cores podem parecer similares mas são diferentes
- **Dark Mode:** Saturação ajustada para mudança de contexto
- **Resultado:** Cada mode tem palette otimizada para seu contexto visual

**`brand.branding` (first, second, third):**
- **Categoria:** Cores diretas da marca que impactam "temperatura" das UIs
- **Hierarquia:** Nomeação ordinal (first, second, third, fourth...)
- **Origem:** Baseado no guia de marca e cores disponíveis
- **Uso:** Cores que passam sensação da marca nas camadas semantic/foundation
- **Estrutura:** Cada ordinal tem variações de intensidade:
  - **`lowest`:** Valor mais claro possível dentro do contexto
  - **`default`:** Cor padrão da marca
  - **`highest`:** Valor mais escuro possível
- **Exemplo:** Para marca laranja
  - `lowest`: laranja bem claro (#FFF3E0)
  - `default`: laranja padrão (#FF9800) 
  - `highest`: laranja escuro (#E65100)

**`brand.ambient`:**
- **Propósito:** Estruturas que criam sombras e luzes da plataforma
- **`contrast`:** Define as cores base da interface
  - **`base`:** Cores próximas ao preto e branco (mas não absolutas)
    - `positive`: cores mais claras (base clara)
    - `negative`: cores mais escuras (base escura)
  - **`deep`:** Preto (#000000) e branco (#ffffff) absolutos
    - `positive`: sempre branco
    - `negative`: sempre preto
  - **Semântica:** Mantém lógica de camadas mesmo nos extremos
- **`neutral`:** Cores neutras para backgrounds e design de interface
  - Normalmente decomposição da cor principal (first)
  - Dependente do design específico
  - **Escala Expandida:** 7 variações para maior granularidade
    - `lowest` (mais claro) → `lower` → `low` → `mid` → `high` → `higher` → `highest` (mais escuro)
  - **Uso:** Sombras, tons de design, backgrounds com sutilezas
- **`grayscale`:** Escala de cinza padrão
  - **Escala Expandida:** 7 variações para máxima flexibilidade
    - `lowest` (mais claro) → `lower` → `low` → `mid` → `high` → `higher` → `highest` (mais escuro)
  - **Uso:** Sistema de cinzas para interfaces, textos, bordas, divisores

**`interface`:**
- **Propósito:** Cores para interações de UI com semântica específica
- **Diferenciação:** Não necessariamente seguem cores da marca
  - Ex: Marca laranja pode ter botão primário preto
- **`function`:** Hierarquia e links de interface
- **`feedback`:** Cores padrão de feedback de sistemas (success, warning, danger, info)

**`product`:**
- **Propósito:** Cores de semântica relacionada ao produto
- **Exemplos:** `cold`, `promo`, `flash`, etc.
- **Variabilidade:** Depende do tipo de produto (algumas interfaces não usam)
- **Contexto:** Semântica específica do domínio do produto

**`text`:**
- **Propósito:** Estruturas de cores de texto
- **Conceitos:** Já trabalha positive/negative internamente
- **Aplicação:** Base para hierarquia tipográfica

```json
{
  "theme": {
    "light": {
      "brand": {
        "branding": {
          "first": { "lowest": {}, "default": {}, "highest": {} },
          "second": { "lowest": {}, "default": {}, "highest": {} },
          "third": { "lowest": {}, "default": {}, "highest": {} }
        },
        "ambient": {
          "contrast": { "base": {}, "deep": {} },
          "neutral": { "lowest": {}, "lower": {}, "low": {}, "mid": {}, "high": {}, "higher": {}, "highest": {} },
          "grayscale": { "lowest": {}, "lower": {}, "low": {}, "mid": {}, "high": {}, "higher": {}, "highest": {} }
        }
      },
      "interface": {
        "function": { "primary": {}, "secondary": {}, "link": {} },
        "feedback": { "info": {}, "success": {}, "warning": {}, "danger": {} }
      },
      "product": {
        "cold": { "lowest": {}, "default": {}, "highest": {} }
      },
      "text": {
        "positive": {}, "negative": {}
      }
    }
  }
}
```

**Customização Avançada:** 
- Marcas que usam nossa API podem "quebrar" o `_primitive-theme` quando necessário
- Permite valores específicos que não seguem decomposição padrão
- Usado em marcas evoluídas com personalizações específicas
- **Restrição Crítica:** Acessibilidade surface vs txtOn deve sempre ser mantida
- **Joy (Tokens Studio):** Utiliza matemática nativa do Tokens Studio para cálculos de acessibilidade

#### **Dimensions**
- **Responsabilidade:** Define valores dimensionais (spacing, sizing, typography)
- **Arquivo:** `dimensions/dimension.json`
- **Fluxo:** Impacta diretamente Semantic (bypass Mode/Surface)
- **Contexto:** "normal" permite futuras variações (compact, spacious)

##### **Estrutura de Objetos:**

**`_theme_dimensions`:**
- **Propósito:** Escala de tamanhos com fórmula matemática padrão
- **Base:** Progressão Fibonacci Adaptada
- **Unidades:**
  - **Unidade de Layout:** 1un = 4px
  - **Unidade Padrão:** 1ud = 16px
- **Escala Atual:**
  ```
  zero: 0
  pico: 1
  nano: 2
  micro: 4
  extraSmall: 8
  small: 12
  medium: 16 (base)
  large: 20
  extraLarge: 24
  mega: 28
  giga: 44
  tera: 72
  peta: 116
  ```

**`_theme_typography`:**
- **`fontSizes`:**
  - **Unidade Base:** medium = 16px (sempre a unidade padrão)
  - **Escala:** Baseada na Progressão Fibonacci Adaptada
  - **Valores:** 10, 12, 14, 16, 20, 24, 28, 36, 40, 48, 60
  
- **`lineHeights`:**
  - **Variações:** tight (100%), close (120%), regular (140%), wild (180%)
  - **Fórmula:** `ROUNDUP(fontSize × multiplicador / 4) × 4`
  - **Garantia:** Todos os valores são múltiplos de 4px
  - **Exemplo:** 14px × 1.2 = 16.8px → arredondado para 20px

**Densidade Futura:**
- **Atual:** Apenas `normal` por maturidade do DS
- **Futuro:** `compact`, `spacious` com diferentes escalas
- **Flexibilidade:** Sistema preparado para múltiplas densidades

### **2. MODE - Contextos Visuais**

- **Responsabilidade:** Define contextos visuais (light/dark) determinando como cores se comportam
- **Arquivos:** `mode/light.json`, `mode/dark.json`
- **Função:** Permite alternância entre temas claros e escuros

#### **Estrutura e Transformações:**

**Preservação de Hierarquia:**
```json
// Brand
"theme.light.brand.branding.first.default.background"

// Mode (light.json)
"mode.brand.branding.first.default.background": {
  "$value": "{theme.light.brand.branding.first.default.background}"
}
```

**Estados de Interface (exclusivos da MODE):**
- **Estados:** `negative`, `action`, `normal`, `active`, `positive`
- **Aplicados em:** `surface`, `txtOn`, `border`
- **Razão:** Cores de marca são estáticas, cores de interface têm comportamento

**Camada Text:**
- **Hierarquia:** `title`, `body`, `highlight`, `muted`, `label`
- **Feedback:** `info`, `success`, `warning`, `danger`
- **Conceito:** `positive/negative` se refere ao contexto de superfície

### **3. SURFACE - Lógica Fotográfica**

- **Responsabilidade:** Aplica conceito de hierarquia visual inspirado em fotografia
- **Arquivos:** `surface/positive.json`, `surface/negative.json`
- **Conceito Central:** Analogia com fotografia
  - **Positive:** Como um filme fotográfico positivo (cores normais)
  - **Negative:** Como um negativo fotográfico (cores invertidas)

#### **Lógica de Inversão:**

**Para Intensidades (lowest/default/highest):**
```
POSITIVE → NEGATIVE:
- lowest → highest (mais claro vira mais escuro)
- default → default (mantém)
- highest → lowest (mais escuro vira mais claro)
```

**Para Escalas de 7 níveis (neutral/grayscale):**
```
POSITIVE → NEGATIVE:
- lowest → highest
- lower → higher
- low → high
- mid → mid (mantém)
- high → low
- higher → lower
- highest → lowest
```

#### **Transformações Especiais:**

**1. Contrast (base/deep):**
- **Positive Surface:**
  - `base.light` → referencia `mode...positive`
  - `base.dark` → referencia `mode...negative`
- **Negative Surface:** 
  - `base.light` → referencia `mode...negative` (inverte)
  - `base.dark` → referencia `mode...positive` (inverte)

**2. Interface States:**
- Mantém estados mas inverte `positive/negative` em MODE
- Estados: `normal`, `action`, `active`
- Adiciona estrutura `main/secondary` para feedback

**3. Text Layer:**
- **Positive:** usa `mode.text.positive.*`
- **Negative:** usa `mode.text.negative.*`

#### **Nova Estrutura: Opacity**
Surface adiciona sistema de opacidade com valores hexadecimais hardcoded:
```json
"opacity": {
  "color": {
    "dark": { // cores escuras com transparência
      "transparent": "#33333300",     // 0% opacidade
      "superTransparent": "#3333331a", // 10% opacidade
      "semiTranslucid": "#33333333",  // 20% opacidade
      "translucid": "#33333380",      // 50% opacidade
      "superTranslucid": "#333333cc", // 80% opacidade
      "semiOpaque": "#333333e6",      // 90% opacidade
      "opaque": "#333333"             // 100% opacidade
    },
    "light": { // cores claras com transparência
      // mesma estrutura mas com #ffffff
    }
  }
}
```

**Observação:** Em positive.json, `opacity.dark` usa preto, `opacity.light` usa branco. Em negative.json, inverte.

### **4. SEMANTIC - Consolidação Final**

- **Responsabilidade:** Consolida todas as transformações anteriores em um tema unificado com finalidade específica
- **Arquivo:** `semantic/default.json`
- **Propósito:** Criar a interface final que será consumida por Foundation e Components

#### **Conceito Central:**
A SEMANTIC é onde as cores ganham **finalidade de interface**. É o resultado final de todas as transformações (Brand Theme → Mode → Surface) consolidado em uma estrutura única e coerente que será distribuída para as camadas superiores.

#### **Estrutura Completa do Semantic:**

**1. Color - Sistema completo de cores:**
```json
"semantic": {
  "color": {
    "brand": { // cores do tema com finalidade
      "branding": { first, second, third },
      "ambient": { contrast, neutral, grayscale }
    },
    "interface": { // cores funcionais de UI
      "function": { primary, secondary, link, disabled },
      "feedback": { info, success, warning, danger }
    },
    "text": { // cores de texto simplificadas
      title, body, highlight, muted, label,
      info, success, warning, danger, rewards, cold
    },
    "product": { // cores de produto específicas
      cold: { lowest, default, highest }
    }
  }
}
```

**2. Opacity - Sistema de transparências:**
```json
"opacity": {
  "color": {
    "grayscale": { // usa dark opacity de surface
      transparent: 0%, superTransparent: 10%, semiTranslucid: 20%,
      translucid: 50%, superTranslucid: 80%, semiOpaque: 90%, opaque: 100%
    },
    "light": { // usa light opacity de surface
      // mesma estrutura com valores light
    }
  },
  "raw": { // valores numéricos puros
    transparent: 0, superTransparent: 10, semiTranslucid: 20,
    translucid: 50, superTranslucid: 80, semiOpaque: 90, opaque: 100
  }
}
```

**3. Typography - Sistema tipográfico completo:**
```json
"typography": {
  "fontFamilies": { 
    code, content, display, main // 4 famílias
  },
  "fontWeights": { // estrutura completa
    [família]: {
      light: { normal, italic },
      regular: { normal, italic },
      semibold: { normal, italic },
      bold: { normal, italic },
      stronger: { normal, italic } // mapeia para black
    }
  },
  "fontSizes": { // 11 tamanhos
    micro: 10, extraSmall: 12, small: 14, medium: 16, 
    large: 20, extraLarge: 24, mega: 28, giga: 36, 
    tera: 40, peta: 48, exa: 60
  },
  "lineHeights": { // 4 variações × 11 tamanhos
    tight: { micro → exa }, // 100%
    close: { micro → exa }, // 120% 
    regular: { micro → exa }, // 140%
    wild: { micro → exa } // 180%
  },
  "letterSpacings": { 
    regular: 0%, tight: -2%, wild: 2% 
  },
  "textDecorations": {
    default: "none", underline: "underline", lineThrough: "line-through"
  },
  "textCases": {
    capitalize: "capitalize"
  }
}
```

**4. Spacing - Sistema de espaçamentos:**
```json
"spacing": {
  "zero": 0, "pico": 1, "nano": 2, "micro": 4,
  "extraSmall": 8, "small": 12, "medium": 16,
  "large": 20, "extraLarge": 24, "mega": 28,
  "giga": 44, "tera": 72, "peta": 116
}
```

**5. Sizing - Sistema de tamanhos:**
```json
"sizing": {
  // mesma estrutura do spacing
}
```

**6. Border Radius - Sistema de bordas:**
```json
"borderRadius": {
  "straight": 0, "micro": 2, "extraSmall": 4, "small": 8,
  "medium": 12, "large": 16, "extraLarge": 20, "mega": 24,
  "circular": 9999
}
```

**7. Shadows - Sistema de sombras:**
```json
"shadows": {
  "depth": {
    "level1": { x, y, blur, spread, color },
    "level2": { x, y, blur, spread, color },
    "level3": { x, y, blur, spread, color },
    "level4": { x, y, blur, spread, color }
  }
}
```

### **5. FOUNDATION - Interface Simplificada**

- **Responsabilidade:** Cria interface simplificada para uso direto em componentes
- **Arquivos:** `foundation/default.json`, `foundation/styles/`
- **Propósito:** Abstrair complexidade do Semantic para uso prático

#### **Estrutura Foundation:**

**1. Backgrounds (`bg`):**
```json
"foundation": {
  "bg": {
    "primary": "{semantic.color.brand.ambient.contrast.deep.background}",
    "secondary": "{semantic.color.brand.ambient.neutral.lowest.background}",
    "disabled": "{semantic.color.interface.function.disabled.normal.background}",
    "brand": {
      "first": { "lowest": {}, "default": {}, "highest": {} },
      "second": { "lowest": {}, "default": {}, "highest": {} },
      "third": { "lowest": {}, "default": {}, "highest": {} }
    },
    "feedback": {
      "info": { "primary": {}, "secondary": {} },
      "success": { "primary": {}, "secondary": {} },
      "warning": { "primary": {}, "secondary": {} },
      "danger": { "primary": {}, "secondary": {} }
    }
  }
}
```

**2. Borders (`border`):**
```json
"border": {
  "primary": "{semantic.color.brand.ambient.contrast.base.border}",
  "secondary": "{semantic.color.brand.ambient.grayscale.lower.border}",
  "tertiary": "{semantic.color.brand.ambient.grayscale.mid.border}",
  "disabled": "{semantic.color.interface.function.disabled.normal.border}",
  "brand": { /* mesma estrutura do bg.brand */ },
  "feedback": { /* mesma estrutura do bg.feedback */ }
}
```

**3. Text (`text`):**
```json
"text": {
  "primary": "{semantic.color.text.title}",
  "secondary": "{semantic.color.text.body}",
  "muted": "{semantic.color.text.muted}",
  "disabled": "{semantic.color.interface.function.disabled.normal.txtOn}",
  "brand": { /* mesma estrutura do bg.brand */ },
  "feedback": { /* mesma estrutura do bg.feedback */ }
}
```

**4. Typography (`typography`):**
```json
"typography": {
  "fontFamilies": { /* referência direta ao semantic */ },
  "fontWeights": { /* referência direta ao semantic */ },
  "fontSizes": { /* referência direta ao semantic */ },
  "lineHeights": { /* referência direta ao semantic */ },
  "letterSpacings": { /* referência direta ao semantic */ }
}
```

**5. Spacing (`spacing`):**
```json
"spacing": { /* referência direta ao semantic */ }
```

**6. Sizing (`sizing`):**
```json
"sizing": { /* referência direta ao semantic */ }
```

**7. Border Radius (`borderRadius`):**
```json
"borderRadius": { /* referência direta ao semantic */ }
```

**8. Shadows (`shadows`):**
```json
"shadows": { /* referência direta ao semantic */ }
```

#### **Foundation Styles:**

**`foundation/styles/typography-styles.json`:**
- Combinações pré-definidas de tipografia
- Ex: `heading1`, `body1`, `caption`, etc.

**`foundation/styles/depth-styles.json`:**
- Combinações pré-definidas de sombras
- Ex: `card`, `modal`, `tooltip`, etc.

---

## 🔧 Ferramentas e Automação

### **Figma Generators**
- **Localização:** `figma-generators/_generator-dimension.json`
- **Propósito:** Gerar tokens específicos para Figma
- **Funcionalidade:** Transforma tokens em formato compatível com Tokens Studio

### **Metadata e Configuração**
- **`$metadata.json`:** Define ordem de carregamento dos token sets
- **`$themes.json`:** Configurações dos temas no Tokens Studio
- **Token Set Order:** Controla precedência e resolução de conflitos

---

## 📈 Escalabilidade e Manutenção

### **Adicionando Novas Marcas:**
1. Criar pasta `brand/theme/[nova-marca]/`
2. Adicionar arquivos `_brand.json`, `_grayscale.json`, etc.
3. Atualizar `$metadata.json` com nova ordem
4. Sistema gera automaticamente todos os temas derivados

### **Adicionando Novos Modes:**
1. Criar arquivo `mode/[novo-mode].json`
2. Definir transformações específicas
3. Atualizar `$metadata.json`
4. Sistema propaga para todas as marcas

### **Adicionando Novas Surfaces:**
1. Criar arquivo `surface/[nova-surface].json`
2. Definir lógica de inversão
3. Atualizar `$metadata.json`
4. Sistema aplica a todas as combinações

---

## 🎯 Benefícios da Arquitetura

### **1. Escalabilidade Exponencial**
- 1 marca × 2 modes × 2 surfaces = 4 temas automáticos
- Adicionar 1 marca gera automaticamente 4+ temas
- Novos modes/surfaces multiplicam possibilidades

### **2. Consistência Garantida**
- Transformações matemáticas padronizadas
- Hierarquia visual preservada em todos contextos
- Acessibilidade validada automaticamente

### **3. Manutenção Simplificada**
- Mudanças em 1 arquivo propagam para todos temas
- Responsabilidades isoladas por camada
- Debugging facilitado por transformações claras

### **4. Flexibilidade Controlada**
- Marcas podem customizar mantendo estrutura
- Tokens globais de componentes por marca
- Extensível sem quebrar sistema existente

---

*Esta arquitetura transforma a complexidade de múltiplos temas em um processo automatizado, escalável e confiável.*