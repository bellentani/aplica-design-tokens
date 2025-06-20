# Aplica Theme Engine - Tokens Semantics (W3C Standard)

## Overview

This documentation defines the Aplica Theme Engine Semantics tokens following the [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/) standard. The Semantics tokens represent the final consolidation layer where all transformations (Brand Theme → Mode → Surface) are unified with specific interface purpose.

## W3C Base Structure

All tokens follow the W3C Design Tokens specification:

```json
{
  "$type": "color|dimension|fontFamily|fontWeight|duration|...",
  "$value": "token_value",
  "$description": "optional description",
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
  "$description": "Primary brand color (first) in default state for background",
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
  "$description": "Text color over primary brand color (first) in default state",
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
  "$description": "Positive base color for backgrounds (light base)",
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
  "$description": "Negative base color for backgrounds (dark base)",
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
  "$description": "Lightest neutral color for backgrounds",
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
  "$description": "Primary interface color for normal state",
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
  "$description": "Success feedback color main for normal state",
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
  "$description": "Color for text titles",
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
  "$description": "Color for body text",
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
  "$description": "Main system font family",
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
  "$description": "Font family for content",
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
  "$description": "Regular normal weight for main font",
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
  "$description": "Bold normal weight for main font",
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
  "$description": "Medium font size (base)",
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
  "$description": "Large font size",
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
  "$description": "Tight line height for medium font (100%)",
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
  "$description": "Regular line height for medium font (140%)",
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
  "$description": "Zero spacing",
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
  "$description": "Medium spacing (base)",
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
  "$description": "Large spacing",
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
  "$description": "Straight border radius (no rounding)",
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
  "$description": "Small border radius",
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
  "$description": "Medium border radius",
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
  "$description": "Depth shadow level 1",
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
  "$description": "Depth shadow level 2",
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
  "$description": "Transparent opacity value (0%)",
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
  "$description": "Translucid opacity value (50%)",
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
  "$description": "Typography for heading level 1",
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
  "$description": "Primary system border",
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

## 8. Aplica Theme Engine Extensions

### 8.1 Extension Structure

All tokens include Aplica Theme Engine specific extensions:

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

### 8.2 Extension Properties

- **`layer`**: Always "semantic" for tokens in this layer
- **`transformation`**: Applied transformation flow
- **`brand`**: Specific brand (when applicable)
- **`category`**: Main token category
- **`subcategory`**: Specific subcategory
- **`context`**: Surface context (positive/negative)
- **`state`**: Interface state (when applicable)
- **`intensity`**: Color intensity (when applicable)
- **`ordinal`**: Brand color order (when applicable)

## 9. W3C Compliance

### 9.1 Supported Types

Aplica Theme Engine supports all types defined by W3C specification:

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

### 9.2 Required Properties

All tokens follow W3C specification:

- ✅ `$type`: Token type
- ✅ `$value`: Token value
- ✅ `$description`: Optional description
- ✅ `$extensions`: Aplica Theme Engine specific extensions

---

*This documentation follows the [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/) standard and defines the complete structure of Aplica Theme Engine Semantics tokens.* 