# Prompt para Cursor: Theme Engine - Build System Implementation

## 🎯 Context & Objective

I'm working on the **Theme Engine**, a 5-layer Design Token architecture that transforms tokens through hierarchical layers. I need to implement a build system using **Tokens Studio + Style Dictionary** to generate framework-specific outputs.

**Project Path**: `D:/workspace/ab-inbev/zeta-tokens/`

## 📋 Current Status

### ✅ What's Already Done
- **Documentation**: Complete architecture docs in `docs/pt-br/` and `docs/en/`
- **Token Structure**: 5-layer hierarchy implemented in `tokens/`
- **2 Brands**: ze (primary theme), engine (alternative theme)
- **Theme Configuration**: `$themes.json` and `$metadata.json` configured

### 🎯 What We Need to Build
**PHASE 1 ONLY**: Global CSS transformer for visual validation

## 🔧 Technical Requirements

### Token Architecture (5 Layers)
```
Brand Theme → Mode → Surface → Semantic → Foundation
Dimensions → Semantic → Foundation
```

### Key Rules
1. **Theme Configuration**: Each theme = combination of token sets following hierarchy
2. **Final Output**: Only `semantic.*` and `foundation.*` tokens in output
3. **Values**: Semantic = raw values (hex, px), Foundation = aliases to semantic
4. **Transforms**: Use Tokens Studio transforms for Style Dictionary

### Integration Stack
- **Tokens Studio**: Token management in Figma
- **Style Dictionary**: Build engine with [Tokens Studio transforms](https://docs.tokens.studio/transform-tokens/style-dictionary)
- **Custom Transformers**: Our specific output logic

## 📁 Required Structure

```
transformers/
├── global/
│   ├── base-config.js          # Style Dictionary + Tokens Studio config
│   ├── theme-resolver.js       # Resolves theme combinations from $themes.json
│   ├── semantic-extractor.js   # Filters only semantic + foundation tokens
│   └── css-transformer.js      # Generates CSS custom properties
├── outputs/
│   └── css/                    # Generated CSS files per theme
└── README.md                   # Documentation
```

## 🎯 PHASE 1 - Specific Tasks

### Task 1: Base Configuration
Create `transformers/global/base-config.js`:
```javascript
const StyleDictionary = require('style-dictionary');

// Use Tokens Studio transforms
const baseConfig = {
  source: ['tokens/**/*.json'],
  exclude: ['**/_*.json'], // Structural files
  
  transforms: [
    'ts/descriptionToComment',
    'ts/size/px', 
    'ts/opacity/percent',
    'ts/size/letterspacing',
    'ts/typography/fontWeight',
    'ts/resolveMath',
    'ts/size/lineheight',
    'ts/color/css/hexrgba',
    'ts/shadow/css/shorthand'
  ]
};
```

### Task 2: Theme Resolver
Create `transformers/global/theme-resolver.js`:
- Read `tokens/$themes.json`
- For each theme, apply `selectedTokenSets` configuration
- Return Style Dictionary config for specific theme

### Task 3: Semantic Extractor
Create `transformers/global/semantic-extractor.js`:
- Filter tokens to include only paths starting with `semantic.` or `foundation.`
- Ensure foundation tokens reference semantic tokens
- Exclude all intermediate layers (theme, mode, surface)

### Task 4: CSS Transformer
Create `transformers/global/css-transformer.js`:
- Register custom Style Dictionary format
- Generate CSS custom properties
- Format: `--semantic-*` for raw values, `--foundation-*` for aliases

### Expected Output Example
```css
/* ze-light-positive.css */
:root {
  /* Semantic - raw values */
  --semantic-color-brand-primary: #FF6B00;
  --semantic-color-text-body: #333333;
  --semantic-spacing-medium: 16px;
  
  /* Foundation - aliases */
  --foundation-bg-primary: var(--semantic-color-brand-primary);
  --foundation-text-body: var(--semantic-color-text-body);
}
```

## ✅ Success Criteria

### Functional
- [ ] Generates 4 CSS files (2 brands × 1 mode × 2 surfaces)
- [ ] Contains only `semantic.*` and `foundation.*` tokens
- [ ] Semantic tokens have raw values (hex, px)
- [ ] Foundation tokens reference semantic with `var(--semantic-*)`

### Technical
- [ ] Uses Tokens Studio transforms correctly
- [ ] No circular references
- [ ] Valid CSS output
- [ ] Build completes without errors

## ⚠️ Important Rules

1. **ONLY implement what's requested** - no extra features
2. **Ask before making changes** - confirm any modifications
3. **Work in phases** - complete Phase 1 before moving forward
4. **Always confirm before executing** commands or installations

## 📚 Key References

- **Project summary**: Read `PROJETO-RESUMO-EXECUTIVO.md` for complete context
- **Token data**: `tokens/` contains all source tokens
- **Theme config**: `tokens/$themes.json` 
- **Tokens Studio transforms**: https://docs.tokens.studio/transform-tokens/style-dictionary

## 🚀 Start Here

**Begin with creating the folder structure and implementing `base-config.js`**

**Please confirm before:**
- Installing any dependencies
- Creating files/folders
- Running build commands
- Making any modifications to existing structure

---

*Focus on PHASE 1 only: CSS transformer for visual validation. We'll tackle other outputs in subsequent phases.*