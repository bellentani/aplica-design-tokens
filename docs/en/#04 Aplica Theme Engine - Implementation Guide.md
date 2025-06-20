# Aplica Theme Engine - Implementation Guide

## How to Add New Brand

### 1. **Base Files Preparation**

#### Create directory structure:
```bash
brand/theme/new-brand/
├── _brand.json
├── _grayscale.json
├── _theme-typography.json
├── _theme-borders.json
├── _theme-depth.json
├── _components.json
└── _new-brand-generated.json
```

#### Define colors in `_brand.json`:
```json
{
  "theme": {
    "light": {
      "brand": {
        "branding": {
          "first": {
            "lowest": { "background": "#FFF3E0", "txtOn": "#333333", "border": "#FFE0B2" },
            "default": { "background": "#FF9800", "txtOn": "#FFFFFF", "border": "#F57C00" },
            "highest": { "background": "#E65100", "txtOn": "#FFFFFF", "border": "#BF360C" }
          }
        },
        "ambient": {
          "contrast": {
            "base": {
              "positive": { "background": "#FFFFFF", "txtOn": "#000000", "border": "#E0E0E0" },
              "negative": { "background": "#000000", "txtOn": "#FFFFFF", "border": "#333333" }
            },
            "deep": {
              "positive": { "background": "#FFFFFF", "txtOn": "#000000", "border": "#E0E0E0" },
              "negative": { "background": "#000000", "txtOn": "#FFFFFF", "border": "#333333" }
            }
          },
          "neutral": {
            "lowest": { "background": "#FAFAFA", "txtOn": "#333333", "border": "#E0E0E0" },
            "lower": { "background": "#F5F5F5", "txtOn": "#333333", "border": "#CCCCCC" },
            "low": { "background": "#EEEEEE", "txtOn": "#333333", "border": "#BDBDBD" },
            "mid": { "background": "#E0E0E0", "txtOn": "#333333", "border": "#9E9E9E" },
            "high": { "background": "#BDBDBD", "txtOn": "#FFFFFF", "border": "#757575" },
            "higher": { "background": "#9E9E9E", "txtOn": "#FFFFFF", "border": "#616161" },
            "highest": { "background": "#757575", "txtOn": "#FFFFFF", "border": "#424242" }
          },
          "grayscale": {
            "lowest": { "background": "#FFFFFF", "txtOn": "#000000", "border": "#E0E0E0" },
            "lower": { "background": "#F5F5F5", "txtOn": "#000000", "border": "#CCCCCC" },
            "low": { "background": "#EEEEEE", "txtOn": "#000000", "border": "#BDBDBD" },
            "mid": { "background": "#E0E0E0", "txtOn": "#000000", "border": "#9E9E9E" },
            "high": { "background": "#BDBDBD", "txtOn": "#FFFFFF", "border": "#757575" },
            "higher": { "background": "#9E9E9E", "txtOn": "#FFFFFF", "border": "#616161" },
            "highest": { "background": "#757575", "txtOn": "#FFFFFF", "border": "#424242" }
          }
        },
        "interface": {
          "function": {
            "primary": { "background": "#FF9800", "txtOn": "#FFFFFF", "border": "#F57C00" },
            "secondary": { "background": "#E0E0E0", "txtOn": "#333333", "border": "#BDBDBD" },
            "link": { "background": "transparent", "txtOn": "#1976D2", "border": "transparent" },
            "disabled": { "background": "#F5F5F5", "txtOn": "#9E9E9E", "border": "#E0E0E0" }
          },
          "feedback": {
            "info": { "background": "#E3F2FD", "txtOn": "#1976D2", "border": "#BBDEFB" },
            "success": { "background": "#E8F5E8", "txtOn": "#2E7D32", "border": "#C8E6C9" },
            "warning": { "background": "#FFF3E0", "txtOn": "#F57C00", "border": "#FFCC02" },
            "danger": { "background": "#FFEBEE", "txtOn": "#D32F2F", "border": "#FFCDD2" }
          }
        },
        "product": {
          "cold": {
            "lowest": { "background": "#E3F2FD", "txtOn": "#1976D2", "border": "#BBDEFB" },
            "default": { "background": "#2196F3", "txtOn": "#FFFFFF", "border": "#1976D2" },
            "highest": { "background": "#1565C0", "txtOn": "#FFFFFF", "border": "#0D47A1" }
          }
        },
        "text": {
          "positive": {
            "title": "#000000",
            "body": "#333333",
            "highlight": "#FF9800",
            "muted": "#757575",
            "label": "#616161"
          },
          "negative": {
            "title": "#FFFFFF",
            "body": "#E0E0E0",
            "highlight": "#FF9800",
            "muted": "#BDBDBD",
            "label": "#9E9E9E"
          }
        }
      }
    },
    "dark": {
      // Similar structure with colors adjusted for dark mode
    }
  }
}
```

### 2. **Accessibility Validation**

- **For brands using our API:** Run accessibility API to generate `_primitive-theme-default.json`
- **For brands using Tokens Studio (like Joy):** Use native Tokens Studio mathematics
- Verify surface/txtOn contrasts (minimum WCAG AA)
- Adjust colors if necessary

### 3. **Tokens Studio Configuration**

Update `$metadata.json` with new order:
```json
{
  "tokenSetOrder": [
    "foundation/default",
    "foundation/styles/typography-styles",
    "foundation/styles/depth-styles",
    "semantic/default",
    "surface/positive",
    "surface/negative",
    "mode/light",
    "mode/dark",
    "dimensions/dimension",
    "brand/theme/new-brand/_brand",
    "brand/theme/new-brand/_grayscale",
    "brand/theme/new-brand/_theme-typography",
    "brand/theme/new-brand/_theme-borders",
    "brand/theme/new-brand/_theme-depth",
    "brand/theme/new-brand/_components",
    "brand/theme/new-brand/_new-brand-generated"
  ]
}
```

### 4. **Build and Distribution**

```bash
# Run build
npm run build:tokens new-brand

# Check output
dist/
├── aplica-new-brand-light-positive.css
├── aplica-new-brand-light-negative.css
├── aplica-new-brand-dark-positive.css
└── aplica-new-brand-dark-negative.css
```

## How to Create New Mode

### 1. **Analyze Visual Context**

Key questions:
- What is the purpose of the new mode? (ex: high-contrast, colorblind)
- How should colors behave?
- What transformations are needed?

### 2. **Create Mode File**

`mode/high-contrast.json`:
```json
{
  "mode": {
    "brand": {
      "branding": {
        "first": {
          "default": {
            "background": "{theme.light.brand.branding.first.highest.background}",
            "txtOn": "{theme.light.brand.branding.first.highest.txtOn}"
          }
        }
      }
    }
  }
}
```

### 3. **Test Combinations**

Verify all combinations:
- high-contrast + positive
- high-contrast + negative
- With all existing brands

## How to Add New Surface

### 1. **Define Inversion Logic**

`surface/neutral.json`:
```json
{
  "surface": {
    "color": {
      "brand": {
        "branding": {
          "first": {
            "lowest": "{mode.brand.branding.first.mid.background}",
            "default": "{mode.brand.branding.first.default.background}",
            "highest": "{mode.brand.branding.first.mid.background}"
          }
        }
      }
    }
  }
}
```

### 2. **Update Metadata**

Add new surface to `$metadata.json`:
```json
{
  "tokenSetOrder": [
    // ... other tokens
    "surface/positive",
    "surface/negative",
    "surface/neutral",  // new surface
    // ... rest
  ]
}
```

## Validation Checklist

### ✅ **Pre-launch**

#### Accessibility
- [ ] Minimum WCAG AA contrast in all surface/txtOn pairs
- [ ] WCAG AAA contrast for small texts
- [ ] Test with colorblind simulators

#### Visual Consistency
- [ ] Hierarchy preserved in all surfaces
- [ ] Smooth transitions between states (normal → action → active)
- [ ] Feedback colors distinguishable from each other

#### Technical
- [ ] No circular references
- [ ] All tokens resolve to raw values
- [ ] Build passes without warnings

### ✅ **Integration Tests**

#### Figma
- [ ] Sync with Figma Tokens Plugin functional
- [ ] Modes appear correctly in Figma
- [ ] Designers can switch themes

#### Code
- [ ] CSS Variables generated correctly
- [ ] Theme switching works at runtime
- [ ] No breaking changes in components

### ✅ **Performance**

- [ ] Build time < 30 seconds
- [ ] Bundle size per theme < 50KB
- [ ] Theme switch < 100ms

## Common Troubleshooting

### Problem: "Token doesn't resolve"
**Solution:** Check selectedTokenSets order - source must come before enabled

### Problem: "Inconsistent colors between Figma and code"
**Solution:** Re-sync in Figma Tokens and verify if CI/CD executed

### Problem: "Contrast fails in dark mode"
**Solution:** Adjust saturation/brightness in specific `theme.dark`

### Problem: "Build too slow"
**Solution:** 
- Check unnecessary references
- Use Style Dictionary cache
- Parallelize builds by brand

### Problem: "_generated file not found"
**Solution:** Verify if automatic generator is configured correctly

### Problem: "Conflicting metadata"
**Solution:** Check order in `$metadata.json` and resolve precedence conflicts

## Useful Scripts

```bash
# Validate tokens
npm run validate:tokens

# Theme preview
npm run preview:theme aplica-tangerine-light-positive

# Generate accessibility report
npm run a11y:report new-brand

# Sync with Figma
npm run sync:figma -- --brand new-brand

# Generate new brand
npm run generate:brand new-brand -- --colors "#FF9800,#E65100"

# Validate metadata
npm run validate:metadata
```

## Best Practices

1. **Choose between API and Tokens Studio**
   - **API:** For brands that need total control and advanced customizations
   - **Tokens Studio:** For brands that can use native mathematics (like Joy)
   - **Decision:** Based on complexity and specific brand requirements

2. **Always start with _brand.json**
   - Defines brand visual identity
   - Ensures consistency from the start

3. **Use standardized structure**
   - Follow `_theme-*.json` nomenclature
   - Maintain consistent hierarchy

4. **Test incrementally**
   - Add one surface at a time
   - Validate before proceeding

5. **Document decisions**
   - Why certain colors were chosen
   - Special customization cases
   - Choice between API and Tokens Studio

6. **Version changes**
   - Use semantic versioning
   - Document breaking changes

7. **Keep metadata updated**
   - Always update `$metadata.json`
   - Check precedence order

## Recommended File Structure

```
brand/theme/new-brand/
├── _brand.json              # Main brand colors
├── _grayscale.json          # Gray scale
├── _theme-typography.json   # Specific typography
├── _theme-borders.json      # Border system
├── _theme-depth.json        # Shadow system
├── _components.json         # Component tokens
└── _new-brand-generated.json # Auto-generated
```

---

*Following this guide, new themes are created consistently and validated.* 