# Theme Engine - Arquitetura Core

## Diagrama Visual do Fluxo

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Single Source of Truth                        │
│                         Git Repository (JSON)                        │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ THEME Layer                                                         │
│ ├── _brand.json        (cores e elementos visuais)                 │
│ ├── _typography.json   (famílias e pesos)                         │
│ ├── _borders.json      (raios de borda)                           │
│ └── _components.json   (tokens globais)                           │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ MODE Layer                                                          │
│ ├── light.json         (contexto claro)                           │
│ └── dark.json          (contexto escuro)                          │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ SURFACE Layer                                                       │
│ ├── positive.json      (hierarquia normal)                        │
│ └── negative.json      (hierarquia invertida)                     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ SEMANTIC Layer                                                      │
│ └── default.json       (consolidação com finalidade)              │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
┌─────────────────────────────┐   ┌─────────────────────────────┐
│ FOUNDATION Layer            │   │ COMPONENTS Layer            │
│ └── Tokens simplificados    │   │ └── Tokens específicos      │
└─────────────────────────────┘   └─────────────────────────────┘
```

## Responsabilidades por Camada

### 1. **THEME - Identidade Visual**
**Responsabilidade:** Define características visuais únicas de cada tema

**Estruturas principais:**
- **Colors:** `theme.light/dark` com brand, ambient, interface, product, text
- **Typography:** Famílias (main, content, display, code) e pesos
- **Borders:** Sistema de raios (straight → circular)
- **Components:** Tokens globais customizáveis por marca

**Conceitos-chave:**
- `ambient.contrast.base`: Cores próximas ao preto/branco
- `ambient.contrast.deep`: Preto (#000) e branco (#fff) absolutos
- Intensidades: `lowest` → `default` → `highest`

### 2. **MODE - Contextos Visuais**
**Responsabilidade:** Adapta tokens para light/dark mode

**Transformações:**
- Referencia tokens específicos de `theme.light` ou `theme.dark`
- Adiciona estados de interface: `negative`, `action`, `normal`, `active`, `positive`
- Define estrutura `main/secondary` para feedback

**Conceito-chave:** Estados só existem aqui porque cores de marca são estáticas

### 3. **SURFACE - Hierarquia Visual**
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

### 4. **SEMANTIC - Consolidação Final**
**Responsabilidade:** Unifica tudo com finalidade de interface

**Estrutura completa:**
```
semantic: {
  color: { theme, interface, text, product },
  opacity: { grayscale, light, raw },
  typography: { families, weights, sizes, heights },
  dimension: { sizing, spacing },
  depth: { spread },
  border: { width, radii },
  components: { global }
}
```

**Simplificações:**
- Contrast: pega sempre `.light` (base/deep)
- Text: unifica positive/negative conforme surface

### 5. **FOUNDATION/COMPONENTS - Consumo**
**Responsabilidade:** Interface simplificada para uso final

- **Foundation:** Aliases amigáveis (`bg.primary`, `txt.title`)
- **Components:** Tokens específicos por componente
- **Referência:** Sempre `{semantic.*}`

## Exemplo: Token Atravessando Camadas

Vamos acompanhar a cor primária da marca:

### 1. **Theme Layer**
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
- **1 marca** (Zé)
- **2 modes** (light, dark)
- **2 surfaces** (positive, negative)
- **1 density** (normal)
- **= 4 temas gerados**

### Nomenclatura Resultante
- `theme_ze_light_positive`
- `theme_ze_light_negative`
- `theme_ze_dark_positive`
- `theme_ze_dark_negative`

## Arquivos Estruturais (_underscore)

### Características:
- Não fazem parte da cadeia principal
- Facilitam organização no Tokens Studio
- São referenciados mas não transformados

### Exemplos:
- `_primitive_theme.json`: Gerado por API de acessibilidade
- `_color_palette.json`: Factory de cores
- `_theme_dimensions.json`: Sistema dimensional base

## Pontos de Extensão

### 1. **Nova Marca**
- Criar `theme/nova-marca/` com arquivos base
- Automaticamente gera 4 novos temas

### 2. **Novo Mode**
- Adicionar arquivo em `mode/`
- Multiplica temas por 1.5x

### 3. **Nova Surface**
- Adicionar arquivo em `surface/`
- Multiplica temas por 1.5x

### 4. **Nova Density**
- Adicionar em `dimension/`
- Multiplica todos os temas

---

*Esta arquitetura transforma complexidade multiplicativa em processo linear e previsível.*