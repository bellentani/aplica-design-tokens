# Token Integration Guide

## 🎯 Integration Overview

This guide explains how to integrate the existing design tokens system with the React component library, ensuring seamless token consumption and theme switching capabilities.

## 📦 Token Package Integration

### **Package Dependency Setup**
```json
// packages/ui/package.json
{
  "dependencies": {
    "@aplica/tokens": "workspace:*"
  }
}
```

### **Token Import Patterns**
```typescript
// Import semantic tokens
import { tokens } from '@aplica/tokens/semantic';

// Import foundation tokens
import { foundationTokens } from '@aplica/tokens/foundation';

// Import specific theme
import zeTokens from '@aplica/tokens/semantic/ze-light-positive-semantic.json';

// Import CSS variables
import '@aplica/tokens/css';
```

## 🎨 CSS Variables Integration

### **CSS Variable Generation**
Generate CSS custom properties from tokens for component styling:

```typescript
// packages/ui/scripts/generate-css-vars.ts
import { tokens } from '@aplica/tokens';

function generateCSSVariables(tokenObj: any, prefix = ''): string {
  const cssVars: string[] = [];
  
  function processTokens(obj: any, currentPrefix: string) {
    for (const [key, value] of Object.entries(obj)) {
      const varName = `--${currentPrefix}${currentPrefix ? '-' : ''}${key.replace(/\./g, '-')}`;
      
      if (typeof value === 'object' && value !== null && !value.$value) {
        processTokens(value, `${currentPrefix}${currentPrefix ? '-' : ''}${key}`);
      } else {
        const tokenValue = value.$value || value;
        cssVars.push(`  ${varName}: ${tokenValue};`);
      }
    }
  }
  
  processTokens(tokenObj, prefix);
  return `:root {\n${cssVars.join('\n')}\n}`;
}

// Generate CSS for each theme
const themes = ['ze-light-positive', 'ze-light-negative', 'theme_engine-light-positive', 'theme_engine-light-negative'];

themes.forEach(theme => {
  const themeTokens = require(`@aplica/tokens/semantic/${theme}-semantic.json`);
  const css = generateCSSVariables(themeTokens.semantic, 'semantic');
  
  fs.writeFileSync(`src/styles/${theme}.css`, css);
});
```

### **Generated CSS Structure**
```css
/* ze-light-positive.css */
:root {
  /* Color tokens */
  --semantic-color-brand-primary: #FF6B00;
  --semantic-color-brand-secondary: #FF8533;
  --semantic-color-text-body: #333333;
  --semantic-color-text-inverse: #FFFFFF;
  --semantic-color-background: #FFFFFF;
  --semantic-color-surface-primary: #F8F9FA;
  
  /* Spacing tokens */
  --semantic-spacing-xs: 4px;
  --semantic-spacing-sm: 8px;
  --semantic-spacing-md: 16px;
  --semantic-spacing-lg: 24px;
  --semantic-spacing-xl: 32px;
  
  /* Typography tokens */
  --semantic-typography-font-family-body: 'Inter', sans-serif;
  --semantic-typography-font-size-body: 16px;
  --semantic-typography-font-weight-normal: 400;
  --semantic-typography-line-height-body: 1.5;
  
  /* Border radius tokens */
  --semantic-border-radius-sm: 4px;
  --semantic-border-radius-md: 6px;
  --semantic-border-radius-lg: 8px;
  
  /* Foundation tokens (aliases) */
  --foundation-button-bg-primary: var(--semantic-color-brand-primary);
  --foundation-button-text-primary: var(--semantic-color-text-inverse);
  --foundation-button-padding-x: var(--semantic-spacing-md);
  --foundation-button-padding-y: var(--semantic-spacing-sm);
}
```

## 🧩 Component Integration Patterns

### **CSS Variables in Components**
Use CSS variables directly in component styles:

```typescript
// Button.tsx
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  // Base styles using CSS variables
  'inline-flex items-center justify-center rounded-[var(--semantic-border-radius-md)] font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[var(--foundation-button-bg-primary)] text-[var(--foundation-button-text-primary)] hover:bg-[var(--semantic-color-brand-secondary)]',
        outline: 'border border-[var(--semantic-color-border)] bg-transparent hover:bg-[var(--semantic-color-surface-primary)]',
        ghost: 'hover:bg-[var(--semantic-color-surface-primary)]'
      },
      size: {
        sm: 'h-8 px-[var(--semantic-spacing-sm)] text-sm',
        default: 'h-10 px-[var(--foundation-button-padding-x)] py-[var(--foundation-button-padding-y)]',
        lg: 'h-12 px-[var(--semantic-spacing-lg)] text-lg'
      }
    }
  }
);
```

### **TypeScript Token Access**
For dynamic styling and JavaScript calculations:

```typescript
// useTokens.ts
import { tokens } from '@aplica/tokens';

export function useTokens() {
  return {
    // Direct token access
    getSemanticToken: (path: string) => {
      return path.split('.').reduce((obj, key) => obj?.[key], tokens.semantic);
    },
    
    // Spacing calculations
    getSpacing: (multiplier: number) => {
      const baseSpacing = parseInt(tokens.semantic.spacing.md);
      return `${baseSpacing * multiplier}px`;
    },
    
    // Color utilities
    getBrandColor: (variant: 'primary' | 'secondary') => {
      return tokens.semantic.color.brand[variant];
    }
  };
}

// Usage in component
const MyComponent = () => {
  const { getSpacing, getBrandColor } = useTokens();
  
  const dynamicStyles = {
    padding: getSpacing(2), // 32px (16px * 2)
    backgroundColor: getBrandColor('primary'),
    marginBottom: getSpacing(0.5) // 8px (16px * 0.5)
  };
  
  return <div style={dynamicStyles}>Content</div>;
};
```

### **Utility Functions for Token Access**
```typescript
// utils/tokens.ts
import { tokens } from '@aplica/tokens';

/**
 * Get CSS variable string for a token path
 */
export function getTokenVar(path: string): string {
  return `var(--${path.replace(/\./g, '-')})`;
}

/**
 * Get semantic token CSS variable
 */
export function getSemanticVar(category: string, name: string): string {
  return `var(--semantic-${category}-${name})`;
}

/**
 * Get foundation token CSS variable
 */
export function getFoundationVar(component: string, property: string): string {
  return `var(--foundation-${component}-${property})`;
}

/**
 * Get token value directly from token object
 */
export function getTokenValue(path: string): any {
  return path.split('.').reduce((obj, key) => obj?.[key], tokens);
}

// Usage examples
const buttonStyles = {
  backgroundColor: getSemanticVar('color', 'brand-primary'),
  padding: getFoundationVar('button', 'padding-x'),
  borderRadius: getTokenVar('semantic.border.radius.md')
};
```

## 🎭 Theme Switching Implementation

### **Theme Context Provider**
```typescript
// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'ze-light-positive' | 'ze-light-negative' | 'theme_engine-light-positive' | 'theme_engine-light-negative';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('ze-light-positive');
  
  const availableThemes: Theme[] = [
    'ze-light-positive',
    'ze-light-negative', 
    'theme_engine-light-positive',
    'theme_engine-light-negative'
  ];
  
  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Load theme-specific CSS
    const themeLink = document.getElementById('theme-css') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `/themes/${theme}.css`;
    }
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### **Theme-Specific CSS Loading**
```css
/* Theme-specific CSS files */

/* themes/ze-light-positive.css */
[data-theme="ze-light-positive"] {
  --semantic-color-brand-primary: #FF6B00;
  --semantic-color-surface-primary: #FFFFFF;
  /* ... other ze-light-positive tokens */
}

/* themes/ze-light-negative.css */
[data-theme="ze-light-negative"] {
  --semantic-color-brand-primary: #FF6B00;
  --semantic-color-surface-primary: #FFF5F5;
  /* ... other ze-light-negative tokens */
}
```

### **Theme Switcher Component**
```typescript
// components/ThemeSwitcher.tsx
import { useTheme } from '../contexts/ThemeContext';
import { Select } from './Select';

export function ThemeSwitcher() {
  const { theme, setTheme, availableThemes } = useTheme();
  
  const themeLabels = {
    'ze-light-positive': 'Ze Light (Positive)',
    'ze-light-negative': 'Ze Light (Negative)',
    'theme_engine-light-positive': 'Theme Engine Light (Positive)',
    'theme_engine-light-negative': 'Theme Engine Light (Negative)'
  };
  
  return (
    <Select
      value={theme}
      onValueChange={setTheme}
      placeholder="Select theme..."
    >
      {availableThemes.map(themeOption => (
        <Select.Item key={themeOption} value={themeOption}>
          {themeLabels[themeOption]}
        </Select.Item>
      ))}
    </Select>
  );
}
```

## 🔄 Build Integration Workflow

### **Token Build Integration**
```json
// packages/ui/package.json
{
  "scripts": {
    "prebuild": "npm run tokens:build && npm run tokens:css",
    "tokens:build": "cd ../tokens && npm run build:dev",
    "tokens:css": "node scripts/generate-css-vars.js",
    "build": "vite build",
    "dev": "npm run tokens:css && vite build --watch"
  }
}
```

### **Automated CSS Generation Script**
```javascript
// packages/ui/scripts/generate-css-vars.js
const fs = require('fs');
const path = require('path');

// Import token files
const themes = [
  'ze-light-positive',
  'ze-light-negative',
  'theme_engine-light-positive',
  'theme_engine-light-negative'
];

function generateCSSFromTokens(themeName) {
  try {
    const semanticPath = `../tokens/dist/json/${themeName}-semantic.json`;
    const foundationPath = `../tokens/dist/json/${themeName.split('-')[0]}-foundation.json`;
    
    const semanticTokens = require(semanticPath);
    const foundationTokens = fs.existsSync(foundationPath) ? require(foundationPath) : {};
    
    let css = `/* ${themeName} theme */\n`;
    css += `[data-theme="${themeName}"] {\n`;
    
    // Generate semantic CSS variables
    css += generateCSSVars(semanticTokens.semantic, 'semantic');
    
    // Generate foundation CSS variables
    if (foundationTokens.foundation) {
      css += generateCSSVars(foundationTokens.foundation, 'foundation');
    }
    
    css += '}\n';
    
    // Write theme CSS file
    const outputPath = path.join(__dirname, '../src/styles/themes', `${themeName}.css`);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, css);
    
    console.log(`✅ Generated CSS for theme: ${themeName}`);
  } catch (error) {
    console.error(`❌ Error generating CSS for theme ${themeName}:`, error.message);
  }
}

function generateCSSVars(obj, prefix, currentPath = '') {
  let css = '';
  
  for (const [key, value] of Object.entries(obj)) {
    const varName = `--${prefix}${currentPath ? '-' + currentPath : ''}-${key}`;
    
    if (typeof value === 'object' && value !== null && !value.$value) {
      css += generateCSSVars(value, prefix, currentPath ? `${currentPath}-${key}` : key);
    } else {
      const tokenValue = value.$value || value;
      css += `  ${varName}: ${tokenValue};\n`;
    }
  }
  
  return css;
}

// Generate CSS for all themes
themes.forEach(generateCSSFromTokens);

// Generate main tokens CSS file
const mainCSS = themes.map(theme => `@import './themes/${theme}.css';`).join('\n');
fs.writeFileSync(path.join(__dirname, '../src/styles/tokens.css'), mainCSS);

console.log('✅ Token CSS generation complete');
```

## 📋 Integration Checklist

### **Setup Checklist**
- [ ] Token package dependency added to UI package
- [ ] CSS variable generation script created
- [ ] Theme context provider implemented
- [ ] Theme-specific CSS files generated
- [ ] Build scripts updated to include token processing
- [ ] TypeScript types for tokens available

### **Component Integration Checklist**
- [ ] Components use CSS variables instead of hardcoded values
- [ ] Token utility functions created and documented
- [ ] Theme switching works across all components
- [ ] TypeScript IntelliSense works for token access
- [ ] Storybook stories show token usage
- [ ] No console errors related to missing tokens

### **Testing Integration**
- [ ] Token CSS variables load correctly
- [ ] Theme switching updates component styles
- [ ] All token references resolve properly
- [ ] Build process includes token generation
- [ ] Generated CSS is valid and optimized

## 🎯 Best Practices

### **Token Usage Guidelines**
1. **Always use tokens**: Never hardcode values that exist as tokens
2. **Prefer CSS variables**: Use CSS variables for static styling
3. **Use token objects**: Use JavaScript token objects for dynamic styling
4. **Document dependencies**: Clearly document which tokens components use
5. **Test theme switching**: Ensure components work with all available themes

### **Performance Considerations**
- **CSS Variable Efficiency**: CSS variables are more performant than JavaScript calculations
- **Bundle Size**: Import only needed tokens to minimize bundle size
- **Caching**: Cache token CSS files for better loading performance
- **Tree Shaking**: Use named imports to enable tree shaking

### **Maintenance Guidelines**
- **Automated Generation**: Always generate CSS from tokens, never write manually
- **Version Sync**: Keep token and UI package versions in sync
- **Breaking Changes**: Follow semantic versioning for token changes
- **Documentation**: Update integration docs when token structure changes

---

*This integration guide ensures seamless connection between the design tokens system and the React component library, enabling consistent theming and excellent developer experience.*
