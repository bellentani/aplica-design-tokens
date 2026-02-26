# Design Tokens Build Process

## 🔧 Build System Overview

The design tokens build system uses **Style Dictionary v5** with **@tokens-studio/sd-transforms** to transform JSON token definitions into multiple output formats.

## 📁 Source Structure

### **Token Files Organization**
```
data/                          # Renamed from 'tokens/' for better clarity and portability
├── brand/                     # Brand-specific tokens
│   ├── aplica_joy/                    # Primary brand
│   │   ├── _brand.json
│   │   ├── _grayscale.json
│   │   └── _other_elements.json
│   └── theme_engine/          # Alternative brand
│       ├── _brand.json
│       ├── _grayscale.json
│       └── _other_elements.json
├── mode/
│   ├── light.json             # Light color mode
│   └── dark.json              # Dark color mode
├── surface/
│   ├── positive.json          # Positive surface states
│   └── negative.json          # Negative surface states
├── semantic/
│   └── default.json           # Semantic token definitions
├── foundation/
│   └── engine/
│       ├── default.json
│       └── styles/
├── dimension/
│   └── normal.json            # Dimension tokens
├── components/                # Component-specific tokens (22 files)
├── $themes.json               # Theme configuration
└── $metadata.json             # Build metadata
```

## 🏗️ Build Architecture

### **5-Layer Token Hierarchy**
```
1. Brand Theme → 2. Mode → 3. Surface → 4. Semantic → 5. Foundation
```

Each layer builds upon the previous ones:
- **Brand**: Base brand identity tokens (6 brands: aplica_yellow, theme_engine, aplica_purple, aplica_joy, aplica_tangerine, aplica_yellow_custom)
- **Mode**: Color scheme variations (light/dark) - both use consistent structure (positive/negative)
- **Surface**: Contextual surface states (positive/negative)
- **Semantic**: Semantic meaning tokens (colors, spacing, typography)
- **Foundation**: Component-ready tokens with aliases

### **Theme Configuration**
Themes are defined in `$themes.json` as combinations of token sets:

```json
{
  "ze-light-positive": {
    "selectedTokenSets": {
      "brand/ze/_brand": "enabled",
      "mode/light": "enabled",
      "surface/positive": "enabled",
      "semantic/default": "enabled",
      "foundation/ze/default": "enabled",
      "dimension/normal": "source"
    }
  }
}
```

## 🚀 Build Commands

### **Available Build Types**
```bash
# Development build (semantic + foundation)
npm run build:dev

# Complete foundation build (includes semantic automatically)
npm run build:foundation

# Theme engine build
npm run build:theme-engine

# Both themes + components
npm run build:both

# Custom builds with platform selection
cd transformers && node build.mjs output:foundation "platform:[json,esm,dts]"

# Brand-specific builds
cd transformers && node build.mjs brand:ze "platform:[json,esm]"

# Raw values mode (no aliases)
cd transformers && node build.mjs foundation mode:raw
```

### **Build Parameters**
- **output**: `semantic`, `foundation`, `dev`, `all`
- **platform**: `json`, `js`, `esm`, `dts`, `dtsESM`
- **brand**: `ze`, `theme_engine`
- **surface**: `positive`, `negative`
- **mode**: `aliases` (default), `raw`

## 📤 Output Formats

### **Generated File Structure**
```
dist/                          # Generated in project root (relative to transformers/)
├── json/                      # JSON token files
│   ├── ze-light-positive-semantic.json
│   ├── ze-light-positive-foundation.json
│   └── [other theme combinations]
├── semantic/                  # Semantic tokens (organized)
│   ├── index.js
│   ├── index.mjs
│   ├── index.d.ts
│   └── [theme-specific files]
├── foundation/                # Foundation tokens (organized)
│   ├── index.js
│   ├── index.mjs
│   ├── index.d.ts
│   └── [brand-specific files]
└── components/                # Component tokens (future)
```

### **Platform Formats**
- **json**: Structured JSON files for direct consumption
- **js**: CommonJS modules for Node.js environments
- **esm**: ES modules (.mjs) for modern JavaScript
- **dts**: TypeScript declarations (.d.ts) for type safety
- **dtsESM**: TypeScript ES module declarations (.d.mts)

## 🔄 Build Modes

### **Aliases Mode (Default)**
Foundation tokens reference semantic tokens:
```json
{
  "foundation": {
    "button": {
      "background": {
        "primary": "{semantic.color.brand.primary}"
      }
    }
  }
}
```

### **Raw Mode**
All tokens resolved to final values:
```json
{
  "foundation": {
    "button": {
      "background": {
        "primary": "#FF6B00"
      }
    }
  }
}
```

## 🎨 Token Types & Categories

### **Semantic Token Categories**
- **Colors**: brand, text, background, border, error, warning, success, info
- **Spacing**: xs, sm, md, lg, xl, xxl (4px to 64px scale)
- **Typography**: font families, sizes, weights, line heights
- **Border Radius**: sm, md, lg, full
- **Elevation**: shadow definitions for different levels
- **Transitions**: duration and easing definitions

### **Foundation Token Structure**
Foundation tokens are organized by component and provide aliases to semantic tokens:
```json
{
  "foundation": {
    "button": {
      "background": {
        "primary": "{semantic.color.brand.primary}",
        "secondary": "{semantic.color.surface.secondary}"
      },
      "text": {
        "primary": "{semantic.color.text.inverse}",
        "secondary": "{semantic.color.text.body}"
      },
      "padding": {
        "horizontal": "{semantic.spacing.medium}",
        "vertical": "{semantic.spacing.small}"
      }
    }
  }
}
```

## 🔧 Style Dictionary Configuration

### **Base Configuration**
```javascript
// transformers/base-config.mjs
const baseConfig = {
  source: ['../data/**/*.json'],  // Updated: now uses 'data/' instead of 'tokens/'
  exclude: ['**/_*.json'], // Exclude structural files
  
  // Use Tokens Studio transforms
  transforms: [
    'ts/descriptionToComment',
    'ts/size/px',
    'ts/opacity/percent',
    'ts/size/letterspacing',
    'ts/typography/fontWeight',
    'ts/resolveMath',
    'ts/size/lineheight',
    'ts/color/modifiers',
    'ts/color/css/hexrgba',
    'ts/shadow/css/shorthand'
  ]
};
```

### **Platform Configurations**
Each platform has specific format and transform configurations:

```javascript
// JSON Platform
{
  transformGroup: 'tokens-studio',
  buildPath: 'dist/json/',
  files: [{
    destination: `${themeName}.json`,
    format: 'json/nested'
  }]
}

// JavaScript Platform
{
  transformGroup: 'tokens-studio',
  buildPath: 'dist/',
  files: [{
    destination: `${themeName}.js`,
    format: 'javascript/module-flat'
  }]
}

// TypeScript Platform
{
  transformGroup: 'tokens-studio',
  buildPath: 'dist/',
  files: [{
    destination: `${themeName}.d.ts`,
    format: 'typescript/module-declarations'
  }]
}
```

## 🎯 CSS Variables Generation

### **CSS Variable Output**
Tokens can be converted to CSS custom properties for component consumption:

```css
/* Generated CSS variables */
:root {
  /* Semantic tokens */
  --semantic-color-brand-primary: #FF6B00;
  --semantic-color-text-body: #333333;
  --semantic-spacing-medium: 16px;
  --semantic-border-radius-md: 6px;
  
  /* Foundation tokens (aliases) */
  --foundation-button-bg-primary: var(--semantic-color-brand-primary);
  --foundation-button-text-primary: var(--semantic-color-text-inverse);
  --foundation-button-padding-x: var(--semantic-spacing-medium);
}
```

### **CSS Generation Script**
```javascript
// Generate CSS variables from tokens
function generateCSSVariables(tokens) {
  const cssVars = [];
  
  function processTokens(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const varName = `--${prefix}${prefix ? '-' : ''}${key}`;
      
      if (typeof value === 'object' && value !== null && !value.$value) {
        processTokens(value, `${prefix}${prefix ? '-' : ''}${key}`);
      } else {
        const tokenValue = value.$value || value;
        cssVars.push(`  ${varName}: ${tokenValue};`);
      }
    }
  }
  
  processTokens(tokens);
  return `:root {\n${cssVars.join('\n')}\n}`;
}
```

## 🧪 Build Validation

### **Token Validation**
The build system includes validation to ensure token integrity:

- **Reference Validation**: Ensures all token references resolve correctly
- **Type Validation**: Validates token value types (color, dimension, etc.)
- **Naming Validation**: Ensures consistent naming conventions
- **Circular Reference Detection**: Prevents infinite reference loops

### **Build Verification**
After each build, the system verifies:
- All expected files are generated
- JSON files are valid
- TypeScript files compile without errors
- No missing token references

## 📋 Integration with Component Library

### **Token Consumption Patterns**

#### **CSS Variables (Recommended)**
```css
.button {
  background-color: var(--foundation-button-bg-primary);
  color: var(--foundation-button-text-primary);
  padding: var(--foundation-button-padding-y) var(--foundation-button-padding-x);
}
```

#### **JavaScript Objects**
```javascript
import { tokens } from '@aplica/tokens';

const buttonStyles = {
  backgroundColor: tokens.foundation.button.background.primary,
  color: tokens.foundation.button.text.primary,
  padding: `${tokens.foundation.button.padding.vertical} ${tokens.foundation.button.padding.horizontal}`
};
```

#### **TypeScript Integration**
```typescript
import type { SemanticTokens } from '@aplica/tokens';

function getTokenValue(path: keyof SemanticTokens['color']): string {
  return tokens.semantic.color[path];
}
```

## 🔄 Development Workflow

### **Token Development Process**
1. **Edit Source Tokens**: Modify JSON files in `data/` directory
2. **Run Build**: Execute appropriate build command
3. **Verify Output**: Check generated files in `dist/` (project root)
4. **Test Integration**: Verify tokens work in component library
5. **Commit Changes**: Include both source and generated files

### **Adding New Tokens**
1. Add tokens to appropriate semantic category
2. Update foundation tokens if needed for components
3. Run build to generate outputs
4. Update TypeScript types if necessary
5. Document new tokens in Storybook

### **Modifying Existing Tokens**
1. Update source token values
2. Run build to regenerate outputs
3. Test impact on existing components
4. Update documentation if token usage changes
5. Consider semantic versioning for breaking changes

---

*This build process ensures consistent, scalable token generation that integrates seamlessly with the component library development workflow.*
