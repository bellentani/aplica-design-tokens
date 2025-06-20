# Theme Engine - Arquitetura Técnica Completa

## 📋 Visão Geral

O **Theme Engine** é uma arquitetura multidimensional de Design Tokens que permite a criação e gestão escalável de temas visuais através de transformações hierárquicas. A arquitetura suporta múltiplas marcas, modos visuais e contextos de superfície, gerando temas finais de forma programática.

## 🏗️ Arquitetura de 5 Camadas

### **Single Source of Truth (SSoT)**
```
Git Repository (JSON files)
├── theme/ze/
│   ├── _brand.json
│   ├── _grayscale.json  
│   ├── _primitive_theme.json (gerado por API de acessibilidade)
│   └── _other_elements.json
├── dimension/
│   └── normal.json
├── mode (WIP)/
│   ├── light.json
│   └── dark.json
├── surface/
│   ├── positive.json
│   └── negative.json
├── semantic/
│   └── default.json
├── foundation/ze/
│   ├── default.json
│   └── styles/
└── components/
    ├── buttons.json
    ├── inputs.json
    └── ...
```

**Nota sobre arquivos com underscore (_):**
- São tokens estruturais e indicativos
- Não fazem parte da cadeia principal de transformação
- Facilitam organização de theme sets no Tokens Studio
- Ex: `_primitive_theme.json` é gerado por API de acessibilidade

---

## 🔄 Fluxo de Transformações

### **Fluxo Principal**
```
Theme → Mode → Surface → Semantic → Foundation
```

### **Fluxo Dimensional** 
```
Dimension → Semantic → Foundation
```

### **Fluxo de Componentes**
```
Semantic → Components (direto)
```

---

## 📊 Camadas Detalhadas

### **1. CORE - Espinha Dorsal**

#### **Theme**
- **Responsabilidade:** Define aspectos visuais específicos de cada tema (onde brand é uma característica)
- **Conteúdo:** Color palettes, tipografia, elementos visuais do tema
- **Exemplo:** `theme/ze/_brand.json`

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
- Marcas podem "quebrar" o `_primitive_theme` quando necessário
- Permite valores específicos que não seguem decomposição padrão
- Usado em marcas evoluídas com personalizações específicas
- **Restrição Crítica:** Acessibilidade surface vs txtOn deve sempre ser mantida

#### **Dimension**
- **Responsabilidade:** Define valores dimensionais (spacing, sizing, typography)
- **Exemplo:** `dimension/normal.json`
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
A SEMANTIC é onde as cores ganham **finalidade de interface**. É o resultado final de todas as transformações (Theme → Mode → Surface) consolidado em uma estrutura única e coerente que será distribuída para as camadas superiores.

#### **Estrutura Completa do Semantic:**

**1. Color - Sistema completo de cores:**
```json
"semantic": {
  "color": {
    "theme": { // cores do tema com finalidade
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
  "textCase": { 
    normal, uppercase, lowercase, capitalize 
  },
  "textDecoration": { 
    default: none, underline, lineThrough 
  }
}
```

**4. Dimension - Sistema de medidas:**
```json
"dimension": {
  "sizing": { // inclui pico e nano para bordas/linhas
    zero: 0, pico: 1, nano: 2, micro: 4, 
    extraSmall: 8, small: 12, medium: 16, large: 20,
    extraLarge: 24, mega: 28, giga: 44, tera: 72, peta: 116
  },
  "spacing": { // sem pico/nano (mínimo é micro: 4)
    zero: 0, micro: 4, extraSmall: 8, small: 12, 
    medium: 16, large: 20, extraLarge: 24, 
    mega: 28, giga: 44, tera: 72, peta: 116
  }
}
```

**5. Depth - Sistema de profundidade:**
```json
"depth": {
  "spread": { // valores de espalhamento de sombra
    close: 0,     // colado (muito próximo ao fundo)
    next: -2,     // próximo
    near: -4,     // perto
    distant: -8,  // distante
    far: -12      // longe
  }
}
```
**Nota:** Valores em pontos/pixels/em conforme aplicação

**6. Border - Sistema de bordas:**
```json
"border": {
  "width": { // espessuras mapeadas de sizing
    none: 0 (zero),
    small: 1 (pico),
    medium: 2 (nano),
    large: 4 (micro),
    extraLarge: 8 (extraSmall)
  },
  "radii": { // raios de borda
    straight: 0,      // reto
    micro: 2,         // quase reto
    extraSmall: 4,    // sutil
    small: 8,         // pequeno
    medium: 16,       // médio
    large: 24,        // grande
    extraLarge: 32,   // extra grande
    mega: 48,         // mega
    circular: 999     // circular/pill
  }
}
```

**7. Components - Tokens base de componentes:**
```json
"components": {
  "global": {
    "button": {
      "icon": { // tamanhos de ícone
        small: 16,
        medium: 20
      },
      "border": {
        "radii": { // raios customizados por canto
          topLeft: { small: 8, medium: 16 },
          topRight: { small: 8, medium: 16 },
          bottomLeft: { small: 8, medium: 16 },
          bottomRight: { small: 8, medium: 16 }
        }
      }
    }
  }
}
```
**Nota:** Arquitetura exemplificativa. Tokens globais de componentes permitem customização por marca sem adicionar complexidade nas camadas superiores. Mantido em Semantic para facilitar gestão do time de DS.

#### **Observações Importantes:**

1. **Sizing vs Spacing:**
   - **Sizing:** tem pico (1) e nano (2) para elementos mínimos
   - **Spacing:** começa em micro (4) pois é para distâncias

2. **Depth Spread:**
   - Valores negativos indicam direção da sombra
   - Quanto mais negativo, mais "longe" a sombra

3. **Border Width:**
   - Mapeia semanticamente os valores de sizing
   - none=0, small=1, medium=2, large=4, extraLarge=8

4. **Components Global:**
   - Define padrões base reutilizáveis
   - Outros componentes podem estender esses valores

#### **Referências no Semantic:**
- Colors: apontam para `{surface.color.*}`
- Typography: apontam para `{_theme_typography.*}`
- Dimensions: apontam para `{_theme_dimensions.*}`
- Borders: apontam para `{_theme_borders.*}`
- Components: apontam para `{_components.*}`

Este é o contrato final que Foundation e Components consomem!

### **5. CONTEXTO DE USO**

#### **Foundation**
- **Responsabilidade:** Simplifica tokens de cada tema semantic para facilitar decisões de design
- **Fonte:** Consome tokens dos temas semantic gerados
- **Estrutura:** Collection separada com tokens próprios + styles
- **Conteúdo:**
  - `default.json`: Valores simplificados para designers (aliases dos temas semantic)
  - `styles/`: Typography styles, Elevation styles (compositions)

```json
{
  "foundation": {
    "bg": {
      "primary": {
        "$type": "color",
        "$value": "{semantic.color.brand.ambient.contrast.deep.background}"
      }
    }
  }
}
```

#### **Components**
- **Responsabilidade:** Tokens específicos para componentes
- **Fonte:** Consome diretamente dos temas semantic gerados
- **Estrutura:** JSONs separados por componente
- **Referência:** Sempre usa `{semantic.color...}` - o nome do tema é definido no carregamento da UI

---

## 🎛️ Geração de Temas

### **Composição de Temas**
Para gerar um tema completo, é necessário combinar múltiplos arquivos JSON:

**Estratégia de Repetição de Estruturas:**
- **`_color_palette`** aparece em vários arquivos mas mantém mesma estrutura
- **`_theme_typography`** aparece em Theme e Dimension com propósitos diferentes:
  - **Theme:** atributos que mudam por marca (famílias, pesos)
  - **Dimension:** atributos que mudam por tamanho (fontSizes, lineHeights)
- **Separação por estabilidade:** Ex: grayscale separado pois quase nunca muda
- **Clareza de propósito:** Cada arquivo tem objetivo bem definido

### **Fórmula de Temas Semantic**
```
Total de Temas = N marcas × M modes × S surfaces
```

**Exemplo Atual:**
- Marcas: 1 (Zé)
- Modes: 2 (Light, Dark) 
- Surfaces: 2 (Positive, Negative)
- **Temas Gerados:** 4 temas semantic

### **Estrutura de Cada Tema Semantic**
```json
{
  "semantic": {
    "color": { /* todos os tokens de cor resolvidos */ },
    "dimension": { /* todos os tokens dimensionais */ },
    "typography": { /* todas as definições tipográficas */ },
    "border": { /* todos os tokens de borda */ }
  }
}
```

---

## 🔄 Sincronização Multi-Plataforma

### **Fluxo de Updates**
```
Git Repository (SSoT)
    ├─── CI/CD Trigger ───→ Figma Collections/Modes
    └─── Style Dictionary ───→ Code Artifacts (CSS, JSON, etc.)
```

### **Figma Integration**
- **Collections:** Cada camada vira uma Collection no Figma
- **Modes:** Combinações multidimensionais viram Modes do Figma
- **Sincronização:** Automática via CI/CD quando JSONs mudam

### **Code Integration**
- **Style Dictionary:** Base para transformação dos JSONs
- **Custom Transformers:** Cada squad de tech implementa conforme stack
- **Outputs Exemplo:**
  - **Web:** CSS custom properties
  - **React Native:** JSON objects
  - **iOS:** Swift color sets
  - **Android:** XML resources

---

## 🛡️ Validação e Qualidade

### **Acessibilidade**
- **API de Contraste:** Valida automaticamente na Color Palette
- **Garantias:** Todos os pares surface/txtOn passam por validação WCAG
- **Factory:** `_color_palette` serve como fonte para geração de cores acessíveis

### **Style Dictionary Resolution**
- **Raw Values:** Semantic layer resolve todas as referências
- **No Circularity:** Transformações seguem fluxo hierárquico estrito
- **Error Handling:** Tokens Studio valida dependências durante build

---

## 📦 Build Strategy

### **On-Demand Building**
- **Trigger:** Mudanças nos JSONs do Git
- **Scope:** Apenas temas afetados são reconstruídos
- **Distribuição:** Cada projeto recebe seu subset necessário

### **Project Configuration**
```json
{
  "themes": ["ze-light-positive", "ze-dark-positive"],
  "outputFormat": ["css", "json"],
  "components": ["buttons", "inputs"]
}
```

---

## 🔧 Extensibilidade

### **Adicionando Nova Marca**
1. Criar `theme/nova-marca/_brand.json`
2. Configurar Color Palette com API de acessibilidade
3. Definir visual elements específicos da marca
4. Build automático gera novos temas

### **Adicionando Novo Mode**
1. Criar `mode/novo-mode.json`
2. Definir transformações dos tokens de Brand
3. Multiplicar possibilidades: N × 3 × 2 temas

### **Adicionando Nova Surface**
1. Criar `surface/nova-surface.json`
2. Definir lógica de mapeamento
3. Multiplicar possibilidades: N × 2 × 3 temas

---

## ⚠️ Considerações Técnicas

### **Performance**
- **Build Time:** Proporcional ao número de temas × complexidade
- **Bundle Size:** Projetos recebem apenas subset necessário
- **Runtime:** Theme switching dependente da arquitetura front-end

### **Governance**
- **Single Source:** Apenas JSONs no Git podem alterar tokens
- **Responsabilidades:** Cada camada tem ownership específico
- **Versionamento:** Git history mantém evolução completa

### **Escalabilidade**
- **Horizontal:** Novas marcas/modes aumentam combinações exponencialmente
- **Vertical:** Novas camadas requerem refatoração arquitetural
- **Density:** Novos arquivos dimension (compact/spacious) multiplicam temas
- **Limite Prático:** Monitorar tempo de build vs número de combinações

### **Notas Técnicas**
- **Unidades:** Valores numéricos podem ser pontos, pixels ou em conforme aplicação
- **Color Palette Factory:** `_primitive_theme.json` gerado por API com regras de acessibilidade
- **Arquivos underscore (_):** Tokens estruturais fora da cadeia principal de transformação

---

## 📚 Referências

- [Tokens Studio Transform Documentation](https://docs.tokens.studio/transform-tokens/style-dictionary)
- [W3C Design Tokens Specification](https://tr.designtokens.org/format/)
- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)

---

*Esta documentação serve como base técnica para discussões futuras sobre escalabilidade, implementação e evolução do Theme Engine.*