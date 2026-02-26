# Portability Guide - Design Tokens System

## 🚀 **System Portability Overview**

The design tokens system has been restructured for maximum portability and scalability. This guide explains the changes and how to use the system in other projects.

## 📁 **Key Structural Changes**

### **1. Pasta `tokens/` → `data/`**
- **Why**: Better clarity and semantic meaning
- **Impact**: All scripts now reference `../data/` instead of `../tokens/`
- **Benefit**: More intuitive for developers and AI assistants

### **2. Output Directory: `dist/` na Raiz do Projeto**
- **Why**: Standard convention and better integration
- **Impact**: All generated files go to project root `dist/` folder
- **Benefit**: Easier to consume by other tools and frameworks

### **3. Caminhos Relativos para Portabilidade**
- **Why**: Scripts work regardless of project location
- **Impact**: All paths use relative references (`../data/`, `../dist/`)
- **Benefit**: System can be moved to any project structure

## 🔧 **Technical Implementation**

### **Build System Architecture**

```
transformers/
├── build.mjs              # Main build script
├── build-components.js    # Component build script
├── base-config.mjs        # Shared configuration
└── test-*.js             # Test scripts
```

### **Data Structure**

```
data/
├── brand/                 # Brand-specific tokens
├── mode/                  # Color mode variations
├── surface/               # Surface context variations
├── semantic/              # Semantic token definitions
├── foundation/            # Foundation tokens with styles
└── components/            # Component-specific tokens
```

### **Output Structure**

```
dist/
├── json/                  # JSON format
│   ├── foundation/
│   └── components/
├── esm/                   # ES modules
│   ├── foundation/
│   └── components/
├── js/                    # CommonJS
│   ├── foundation/
│   └── components/
└── css/                   # CSS format
    ├── foundation/
    └── components/
```

## 🚀 **Integration Guide**

### **1. Copy System to New Project**

```bash
# Copy the entire system
cp -r zeta-tokens/ my-new-project/
cd my-new-project/

# Install dependencies
npm install
```

### **2. Update Package.json**

```json
{
  "name": "my-project-tokens",
  "scripts": {
    "build": "cd transformers && node build.mjs all",
    "build:semantic": "cd transformers && node build.mjs semantic",
    "build:foundation": "cd transformers && node build.mjs foundation",
    "test": "cd transformers && node test-daily.js"
  }
}
```

### **3. Customize Tokens**

Edit files in `data/` directory:
- `data/semantic/` - Your semantic tokens
- `data/foundation/` - Your foundation tokens
- `data/components/` - Your component tokens

### **4. Build and Use**

```bash
# Build all platforms
npm run build

# Use in your application
import tokens from './dist/esm/ze-light-positive.mjs';
```

## 🎨 **Frontend Framework Integration**

### **React**

```jsx
// Import CSS variables
import './dist/css/ze-light-positive.css';

// Use in components
const Button = styled.button`
  background-color: var(--semantic-color-brand-primary);
  font-size: var(--semantic-typography-fontSizes-medium);
`;
```

### **Vue**

```vue
<template>
  <button class="my-button">Click me</button>
</template>

<style>
@import './dist/css/ze-light-positive.css';

.my-button {
  background-color: var(--semantic-color-brand-primary);
  font-size: var(--semantic-typography-fontSizes-medium);
}
</style>
```

### **Angular**

```typescript
// angular.json
{
  "styles": [
    "dist/css/ze-light-positive.css"
  ]
}
```

### **Svelte**

```svelte
<script>
  import './dist/css/ze-light-positive.css';
</script>

<button class="my-button">Click me</button>

<style>
  .my-button {
    background-color: var(--semantic-color-brand-primary);
    font-size: var(--semantic-typography-fontSizes-medium);
  }
</style>
```

## 🔧 **Build Tool Integration**

### **Vite**

```javascript
// vite.config.js
export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./dist/css/ze-light-positive.css";`
      }
    }
  }
}
```

### **Webpack**

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                  require('postcss-import')({
                    path: ['./dist/css/']
                  })
                ]
              }
            }
          }
        ]
      }
    ]
  }
}
```

### **Rollup**

```javascript
// rollup.config.js
import postcss from 'rollup-plugin-postcss';

export default {
  plugins: [
    postcss({
      extract: true,
      minimize: true,
      sourceMap: true
    })
  ]
}
```

## 📦 **Package Management**

### **NPM**

```json
{
  "dependencies": {
    "style-dictionary": "^5.0.4",
    "sd-transforms": "^2.0.1"
  }
}
```

### **Yarn**

```bash
yarn add style-dictionary sd-transforms
```

### **PNPM**

```bash
pnpm add style-dictionary sd-transforms
```

## 🧪 **Testing Integration**

### **Jest**

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/transformers/test-*.js']
};
```

### **Vitest**

```javascript
// vitest.config.js
export default {
  test: {
    include: ['transformers/test-*.js']
  }
}
```

## 📊 **Performance Considerations**

### **Build Time**
- **Full Build**: ~5 seconds
- **Incremental**: ~1 second
- **Development**: ~2 seconds

### **Output Size**
- **CSS**: ~50KB (unminified)
- **JSON**: ~100KB
- **JavaScript**: ~150KB

### **Optimization Tips**
1. Use CSS minification in production
2. Tree-shake unused tokens
3. Use CSS custom properties for theming
4. Implement lazy loading for large token sets

## 🔍 **Troubleshooting**

### **Common Issues**

1. **Path Errors**: Ensure relative paths are correct
2. **Build Failures**: Check Node.js version (>=18)
3. **CSS Not Loading**: Verify import paths
4. **TypeScript Errors**: Update type definitions

### **Debug Commands**

```bash
# Check build status
cd transformers && node test-daily.js

# Debug specific platform
cd transformers && node build.mjs semantic --verbose

# Check file structure
ls -la dist/
```

## 📚 **Resources**

### **Documentation**
- [Style Dictionary Docs](https://amzn.github.io/style-dictionary/)
- [SD Transforms Docs](https://github.com/tokens-studio/sd-transforms)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

### **Examples**
- Check `dist/` folder for generated examples
- Review `transformers/test-*.js` for usage patterns
- See `data/` folder for token structure examples

---

**Status**: ✅ **PORTABLE AND READY**  
**Last Updated**: October 10, 2025  
**Compatibility**: Node.js 18+, All major frontend frameworks  
**Next Review**: After SCSS support implementation
