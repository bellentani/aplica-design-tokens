# Design Tokens System Overview

## 🎨 Current Token System Status

### ✅ Fully Functional System
The design tokens system is **production-ready** and actively generating outputs:

- **Engine**: Style Dictionary v5 + @tokens-studio/sd-transforms
- **Architecture**: 5-layer hierarchy with semantic naming
- **Output Formats**: JSON, JavaScript (CommonJS/ESM), TypeScript declarations
- **Build Commands**: Multiple build configurations available
- **Total Themes**: 8 functional themes generated automatically

## 🏗️ Token Architecture

### **5-Layer Hierarchy**
```
1. Brand Theme → 2. Mode → 3. Surface → 4. Semantic → 5. Foundation
```

#### **Layer Details**
- **Brand (Layer 1)**: Brand-specific tokens
  - `ze` (primary brand)
  - `theme_engine` (alternative brand)

- **Mode (Layer 2)**: Color mode variations
  - `light` (currently implemented)
  - `dark` (architecture ready, not implemented)

- **Surface (Layer 3)**: Surface context variations
  - `positive` (default/success states)
  - `negative` (error/warning states)

- **Semantic (Layer 4)**: Semantic token definitions
  - Colors (brand, text, background, border, etc.)
  - Spacing (margins, padding, gaps)
  - Typography (font sizes, weights, line heights)
  - Elevation (shadows, z-index)

- **Foundation (Layer 5)**: Component-level tokens
  - Component-specific token aliases
  - References semantic tokens (`{semantic.color.brand.primary}`)
  - Ready for component consumption

### **Token Combinations**
Each theme is a specific combination:
```
ze + light + positive + semantic = ze-light-positive-semantic.json
ze + light + positive + foundation = ze-light-positive-foundation.json
```

**Total Generated Themes**: 8 themes (2 brands × 1 mode × 2 surfaces × 2 types)

## 📁 File Structure

### **Source Tokens**
```
data/                           # Renamed from 'tokens/' for better clarity
├── brand/
│   ├── ze/                    # Primary brand tokens
│   └── theme_engine/          # Alternative brand tokens
├── mode/
│   └── light.json             # Light mode definitions
├── surface/
│   ├── positive.json          # Positive surface states
│   └── negative.json          # Negative surface states
├── semantic/
│   └── default.json           # Semantic token definitions
├── foundation/
│   └── ze/                    # Foundation tokens with styles
├── dimension/
│   └── normal.json            # Dimension tokens
├── components/                # 22 component token files
├── $themes.json               # Theme configuration
└── $metadata.json             # Build metadata
```

### **Generated Outputs**
```
dist/                          # Generated in project root (relative to transformers/)
├── json/                      # JSON token files
│   ├── ze-light-positive-semantic.json
│   ├── ze-light-positive-foundation.json
│   └── [other theme combinations]
├── semantic/                  # Semantic tokens (JS/TS)
│   ├── index.js
│   ├── index.mjs
│   ├── index.d.ts
│   └── [theme-specific files]
├── foundation/                # Foundation tokens (JS/TS)
│   ├── index.js
│   ├── index.mjs
│   ├── index.d.ts
│   └── [brand-specific files]
└── components/                # Component tokens (future)
```

## 🔧 Build System

### **Available Commands**
```bash
# Development build (semantic + foundation)
npm run build:dev

# Complete foundation build
npm run build:foundation

# Theme engine build
npm run build:theme-engine

# Both themes + components
npm run build:both

# Custom builds with platform selection
cd transformers && node build.mjs output:foundation "platform:[json,esm,dts]"

# Brand-specific builds
cd transformers && node build.mjs brand:ze "platform:[json,esm]"

# Raw values (no aliases)
cd transformers && node build.mjs foundation mode:raw
```

### **Build Modes**
- **Aliases Mode** (default): Foundation tokens reference semantic (`{semantic.color.brand.primary}`)
- **Raw Mode**: All tokens resolved to final values (`#FF6B00`, `16px`, etc.)

### **Platform Outputs**
- **json**: Structured JSON files
- **js**: CommonJS modules
- **esm**: ES modules (.mjs)
- **dts**: TypeScript declarations (.d.ts)
- **dtsESM**: TypeScript ES module declarations (.d.mts)

## 📊 Token Categories

### **Semantic Tokens Available**
- **Colors**: brand, text, background, border, error, warning, success, info
- **Spacing**: xs, sm, md, lg, xl, xxl (4px to 64px scale)
- **Typography**: font families, sizes, weights, line heights
- **Border Radius**: sm, md, lg, full
- **Elevation**: shadow definitions for different levels
- **Transitions**: duration and easing definitions

### **Component Tokens Available**
22 component token files including:
- Button variants (main, icon)
- Input components (field, select, textarea, single)
- Form elements (checkbox, radio, toggle)
- Layout (card, bottomSheet)
- Navigation (listMenu, listMenuItem)
- Feedback (loading, tag, compoundTag)
- Interactive (drag, dropdownButton, linkAction)

## 🎯 Integration Points

### **CSS Variables Generation**
Tokens can be converted to CSS custom properties:
```css
:root {
  --semantic-color-brand-primary: #FF6B00;
  --semantic-color-text-body: #333333;
  --semantic-spacing-medium: 16px;
  --foundation-bg-primary: var(--semantic-color-brand-primary);
}
```

### **TypeScript Integration**
Type-safe token access:
```typescript
import { tokens } from '@aplica/tokens';

const buttonStyles = {
  backgroundColor: tokens.semantic.color.brand.primary,
  color: tokens.semantic.color.text.inverse,
  padding: tokens.semantic.spacing.medium
};
```

### **JavaScript/JSON Integration**
Direct token consumption:
```javascript
import zeTokens from '@aplica/tokens/semantic/ze-light-positive-semantic.json';
```

## 🔄 Maintenance

### **Adding New Tokens**
1. Add to appropriate semantic category in `tokens/semantic/default.json`
2. Run build to generate outputs
3. New tokens automatically available in all themes

### **Adding New Themes**
1. Create new brand folder in `tokens/brand/`
2. Update `$themes.json` with new combinations
3. Run build to generate new theme outputs

### **Updating Existing Tokens**
1. Modify source token files
2. Run build to regenerate all outputs
3. Semantic versioning for breaking changes

---

*This system is production-ready and serves as the foundation for the component library integration.*
