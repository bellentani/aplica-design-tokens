# Aplica Theme Engine - Tokens Semantics (W3C Standard)

## Visão Geral

Esta documentação define os tokens Semantics do Aplica Theme Engine seguindo o padrão [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/). Os tokens Semantics representam a camada de consolidação final onde todas as transformações (Brand Theme → Mode → Surface) são unificadas com finalidade específica de interface.

## Estrutura Base W3C

Todos os tokens seguem a especificação W3C Design Tokens:

```json
{
  "$type": "color|dimension|fontFamily|fontWeight|duration|...",
  "$value": "valor_do_token",
  "$description": "descrição opcional",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "transformation": "brand-theme → mode → surface → semantic"
    }
  }
}
```

## 1. Color Tokens

### 1.1 Brand Colors

#### `semantic.color.brand.branding.first.default.background`

```json
{
  "$type": "color",
  "$value": "#FF9800",
  "$description": "Cor primária da marca (first) no estado default para background",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "brand": "tangerine",
      "category": "branding",
      "ordinal": "first",
      "intensity": "default",
      "surface": "background"
    }
  }
}
```

#### `semantic.color.brand.branding.first.default.txtOn`

```json
{
  "$type": "color",
  "$value": "#FFFFFF",
  "$description": "Cor de texto sobre a cor primária da marca (first) no estado default",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "brand": "tangerine",
      "category": "branding",
      "ordinal": "first",
      "intensity": "default",
      "surface": "txtOn"
    }
  }
}
```

### 1.2 Ambient Colors

#### `semantic.color.brand.ambient.contrast.base.positive.background`

```json
{
  "$type": "color",
  "$value": "#FFFFFF",
  "$description": "Cor base positiva para backgrounds (base clara)",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "ambient",
      "subcategory": "contrast",
      "type": "base",
      "context": "positive",
      "surface": "background"
    }
  }
}
```

#### `semantic.color.brand.ambient.contrast.base.negative.background`

```json
{
  "$type": "color",
  "$value": "#000000",
  "$description": "Cor base negativa para backgrounds (base escura)",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "ambient",
      "subcategory": "contrast",
      "type": "base",
      "context": "negative",
      "surface": "background"
    }
  }
}
```

### 1.3 Neutral Colors

#### `semantic.color.brand.ambient.neutral.lowest.background`

```json
{
  "$type": "color",
  "$value": "#FAFAFA",
  "$description": "Cor neutra mais clara para backgrounds",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "ambient",
      "subcategory": "neutral",
      "intensity": "lowest",
      "surface": "background"
    }
  }
}
```

### 1.4 Interface Colors

#### `semantic.color.interface.function.primary.normal.background`

```json
{
  "$type": "color",
  "$value": "#FF9800",
  "$description": "Cor primária de interface para estado normal",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "interface",
      "subcategory": "function",
      "type": "primary",
      "state": "normal",
      "surface": "background"
    }
  }
}
```

#### `semantic.color.interface.feedback.success.main.normal.background`

```json
{
  "$type": "color",
  "$value": "#4CAF50",
  "$description": "Cor de feedback de sucesso principal para estado normal",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "interface",
      "subcategory": "feedback",
      "type": "success",
      "variant": "main",
      "state": "normal",
      "surface": "background"
    }
  }
}
```

### 1.5 Text Colors

#### `semantic.color.text.title`

```json
{
  "$type": "color",
  "$value": "#000000",
  "$description": "Cor para títulos de texto",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "text",
      "hierarchy": "title"
    }
  }
}
```

#### `semantic.color.text.body`

```json
{
  "$type": "color",
  "$value": "#333333",
  "$description": "Cor para texto do corpo",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "text",
      "hierarchy": "body"
    }
  }
}
```

## 2. Typography Tokens

### 2.1 Font Families

#### `semantic.typography.fontFamilies.main`

```json
{
  "$type": "fontFamily",
  "$value": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  "$description": "Família de fonte principal do sistema",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "typography",
      "subcategory": "fontFamilies",
      "type": "main"
    }
  }
}
```

#### `semantic.typography.fontFamilies.content`

```json
{
  "$type": "fontFamily",
  "$value": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  "$description": "Família de fonte para conteúdo",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "typography",
      "subcategory": "fontFamilies",
      "type": "content"
    }
  }
}
```

### 2.2 Font Weights

#### `semantic.typography.fontWeights.main.regular.normal`

```json
{
  "$type": "fontWeight",
  "$value": "400",
  "$description": "Peso regular normal para fonte principal",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "typography",
      "subcategory": "fontWeights",
      "family": "main",
      "weight": "regular",
      "style": "normal"
    }
  }
}
```

#### `semantic.typography.fontWeights.main.bold.normal`

```json
{
  "$type": "fontWeight",
  "$value": "700",
  "$description": "Peso bold normal para fonte principal",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "typography",
      "subcategory": "fontWeights",
      "family": "main",
      "weight": "bold",
      "style": "normal"
    }
  }
}
```

### 2.3 Font Sizes

#### `semantic.typography.fontSizes.medium`

```json
{
  "$type": "dimension",
  "$value": "16px",
  "$description": "Tamanho de fonte médio (base)",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "typography",
      "subcategory": "fontSizes",
      "size": "medium",
      "unit": "px"
    }
  }
}
```

#### `semantic.typography.fontSizes.large`

```json
{
  "$type": "dimension",
  "$value": "20px",
  "$description": "Tamanho de fonte grande",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "typography",
      "subcategory": "fontSizes",
      "size": "large",
      "unit": "px"
    }
  }
}
```

### 2.4 Line Heights

#### `semantic.typography.lineHeights.tight.medium`

```json
{
  "$type": "dimension",
  "$value": "16px",
  "$description": "Altura de linha tight para fonte médio (100%)",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "typography",
      "subcategory": "lineHeights",
      "type": "tight",
      "fontSize": "medium",
      "percentage": "100%"
    }
  }
}
```

#### `semantic.typography.lineHeights.regular.medium`

```json
{
  "$type": "dimension",
  "$value": "20px",
  "$description": "Altura de linha regular para fonte médio (140%)",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "typography",
      "subcategory": "lineHeights",
      "type": "regular",
      "fontSize": "medium",
      "percentage": "140%"
    }
  }
}
```

## 3. Spacing Tokens

### 3.1 Base Spacing

#### `semantic.spacing.zero`

```json
{
  "$type": "dimension",
  "$value": "0px",
  "$description": "Espaçamento zero",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "spacing",
      "size": "zero",
      "unit": "px"
    }
  }
}
```

#### `semantic.spacing.medium`

```json
{
  "$type": "dimension",
  "$value": "16px",
  "$description": "Espaçamento médio (base)",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "spacing",
      "size": "medium",
      "unit": "px"
    }
  }
}
```

#### `semantic.spacing.large`

```json
{
  "$type": "dimension",
  "$value": "20px",
  "$description": "Espaçamento grande",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "spacing",
      "size": "large",
      "unit": "px"
    }
  }
}
```

## 4. Border Radius Tokens

### 4.1 Border Radius

#### `semantic.borderRadius.straight`

```json
{
  "$type": "dimension",
  "$value": "0px",
  "$description": "Raio de borda reto (sem arredondamento)",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "borderRadius",
      "type": "straight",
      "unit": "px"
    }
  }
}
```

#### `semantic.borderRadius.small`

```json
{
  "$type": "dimension",
  "$value": "8px",
  "$description": "Raio de borda pequeno",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "borderRadius",
      "type": "small",
      "unit": "px"
    }
  }
}
```

#### `semantic.borderRadius.medium`

```json
{
  "$type": "dimension",
  "$value": "12px",
  "$description": "Raio de borda médio",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "borderRadius",
      "type": "medium",
      "unit": "px"
    }
  }
}
```

## 5. Shadow Tokens

### 5.1 Shadow Depth

#### `semantic.shadows.depth.level1`

```json
{
  "$type": "shadow",
  "$value": {
    "color": "#000000",
    "type": "dropShadow",
    "x": "0px",
    "y": "2px",
    "blur": "4px",
    "spread": "0px"
  },
  "$description": "Sombra de profundidade nível 1",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "shadows",
      "subcategory": "depth",
      "level": "1"
    }
  }
}
```

#### `semantic.shadows.depth.level2`

```json
{
  "$type": "shadow",
  "$value": {
    "color": "#000000",
    "type": "dropShadow",
    "x": "0px",
    "y": "4px",
    "blur": "8px",
    "spread": "0px"
  },
  "$description": "Sombra de profundidade nível 2",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "shadows",
      "subcategory": "depth",
      "level": "2"
    }
  }
}
```

## 6. Opacity Tokens

### 6.1 Opacity Values

#### `semantic.opacity.raw.transparent`

```json
{
  "$type": "number",
  "$value": 0,
  "$description": "Valor de opacidade transparente (0%)",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "opacity",
      "subcategory": "raw",
      "type": "transparent",
      "percentage": "0%"
    }
  }
}
```

#### `semantic.opacity.raw.translucid`

```json
{
  "$type": "number",
  "$value": 50,
  "$description": "Valor de opacidade translúcida (50%)",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "opacity",
      "subcategory": "raw",
      "type": "translucid",
      "percentage": "50%"
    }
  }
}
```

## 7. Composite Tokens (W3C Standard)

### 7.1 Typography Composite

#### `semantic.typography.heading1`

```json
{
  "$type": "typography",
  "$value": {
    "fontFamily": "{semantic.typography.fontFamilies.main}",
    "fontWeight": "{semantic.typography.fontWeights.main.bold.normal}",
    "fontSize": "{semantic.typography.fontSizes.giga}",
    "lineHeight": "{semantic.typography.lineHeights.tight.giga}",
    "letterSpacing": "{semantic.typography.letterSpacings.regular}"
  },
  "$description": "Tipografia para heading nível 1",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "typography",
      "type": "composite",
      "style": "heading1"
    }
  }
}
```

### 7.2 Border Composite

#### `semantic.border.primary`

```json
{
  "$type": "border",
  "$value": {
    "color": "{semantic.color.brand.ambient.contrast.base.border}",
    "width": "1px",
    "style": "solid"
  },
  "$description": "Borda primária do sistema",
  "$extensions": {
    "com.aplica.theme": {
      "layer": "semantic",
      "category": "border",
      "type": "composite",
      "style": "primary"
    }
  }
}
```

## 8. Extensões Aplica Theme Engine

### 8.1 Estrutura de Extensões

Todos os tokens incluem extensões específicas do Aplica Theme Engine:

```json
"$extensions": {
  "com.aplica.theme": {
    "layer": "semantic",
    "transformation": "brand-theme → mode → surface → semantic",
    "brand": "tangerine|joy|grinch",
    "category": "color|typography|spacing|borderRadius|shadows|opacity",
    "subcategory": "branding|ambient|interface|text|fontFamilies|fontWeights|...",
    "context": "positive|negative",
    "state": "normal|action|active|disabled",
    "intensity": "lowest|lower|low|mid|high|higher|highest",
    "ordinal": "first|second|third"
  }
}
```

### 8.2 Propriedades de Extensão

- **`layer`**: Sempre "semantic" para tokens desta camada
- **`transformation`**: Fluxo de transformação aplicado
- **`brand`**: Marca específica (quando aplicável)
- **`category`**: Categoria principal do token
- **`subcategory`**: Subcategoria específica
- **`context`**: Contexto de superfície (positive/negative)
- **`state`**: Estado de interface (quando aplicável)
- **`intensity`**: Intensidade da cor (quando aplicável)
- **`ordinal`**: Ordem da cor de marca (quando aplicável)

## 9. Conformidade W3C

### 9.1 Tipos Suportados

O Aplica Theme Engine suporta todos os tipos definidos pela especificação W3C:

- ✅ `color`
- ✅ `dimension`
- ✅ `fontFamily`
- ✅ `fontWeight`
- ✅ `duration`
- ✅ `cubicBezier`
- ✅ `number`
- ✅ `string`
- ✅ `typography` (composite)
- ✅ `border` (composite)
- ✅ `shadow` (composite)
- ✅ `gradient` (composite)
- ✅ `strokeStyle` (composite)
- ✅ `transition` (composite)

### 9.2 Propriedades Obrigatórias

Todos os tokens seguem a especificação W3C:

- ✅ `$type`: Tipo do token
- ✅ `$value`: Valor do token
- ✅ `$description`: Descrição opcional
- ✅ `$extensions`: Extensões específicas do Aplica Theme Engine

---

*Esta documentação segue o padrão [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/) e define a estrutura completa dos tokens Semantics do Aplica Theme Engine.* 