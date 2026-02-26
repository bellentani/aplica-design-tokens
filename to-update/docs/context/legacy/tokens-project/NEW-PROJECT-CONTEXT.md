# New Project Context - Radix UI Component Library with Design Tokens

## 🎯 **Project Overview**

This new project will create a **React component library** using **Radix UI** and **Shadcn/ui** as the foundation, integrated with the existing **design tokens system** that is already functional and generating outputs in multiple formats.

## 📋 **Current Tokens System Status**

### ✅ **Fully Functional Token System**
- **Engine**: Style Dictionary v5 + @tokens-studio/sd-transforms
- **Architecture**: 5-layer hierarchy (Brand → Mode → Surface → Semantic → Foundation)
- **Brands**: `ze` (primary), `theme_engine` (alternative)
- **Output Formats**: JSON, JavaScript (CommonJS/ESM), TypeScript declarations
- **Build System**: Complete with 8 functional themes generated automatically

### ✅ **Token Architecture**
```
Brand Theme → Mode → Surface → Semantic → Foundation
```

- **2 Brands**: ze, theme_engine
- **1 Mode**: light (dark mode ready for future)
- **2 Surfaces**: positive, negative
- **Components**: 22 component token files
- **Total Output**: ~30-40 files per build (JSON + JS + TS)

### ✅ **Build Commands Available**
```bash
# Development build (semantic + foundation)
node transformers/build.js dev

# Complete foundation build
node transformers/build.js foundation

# Custom builds with specific platforms
node transformers/build.js output:foundation "platform:[json,esm,dts]"

# Brand-specific builds
node transformers/build.js brand:ze "platform:[json,esm]"
```

## 🚀 **New Project Goals**

### **Primary Objectives**
1. **Component Library**: Create a React component library using Radix UI + Shadcn/ui
2. **Token Integration**: Seamlessly integrate the existing design tokens
3. **Storybook**: Set up Storybook for component documentation and testing
4. **Developer Experience**: Provide excellent DX for consuming the library

### **Technical Requirements**
- **Base**: Radix UI primitives + Shadcn/ui patterns
- **Styling**: CSS-in-JS or CSS Variables approach using design tokens
- **TypeScript**: Full TypeScript support with proper token typing
- **Build System**: Modern build system (Vite/Rollup) for library distribution
- **Documentation**: Storybook with comprehensive component examples

## 🏗️ **Proposed Project Structure**

```
aplica-radix-components/
├── packages/
│   ├── tokens/                    # Existing tokens (symlink or submodule)
│   ├── ui/                        # Main component library
│   │   ├── src/
│   │   │   ├── components/        # Radix + Shadcn components
│   │   │   ├── hooks/             # Custom hooks
│   │   │   ├── utils/             # Utility functions
│   │   │   ├── styles/            # Token integration & base styles
│   │   │   └── index.ts           # Main exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── storybook/                 # Storybook configuration
├── apps/
│   └── playground/                # Development playground app
├── docs/                          # Documentation
├── tools/                         # Build tools and scripts
├── package.json                   # Root package.json (monorepo)
└── README.md
```

## 🎨 **Token Integration Strategy**

### **CSS Variables Approach**
```css
/* Generated from tokens */
:root {
  --semantic-color-brand-primary: #FF6B00;
  --semantic-color-text-body: #333333;
  --semantic-spacing-medium: 16px;
  
  --foundation-bg-primary: var(--semantic-color-brand-primary);
  --foundation-text-body: var(--semantic-color-text-body);
}
```

### **Component Integration**
```tsx
// Button component using tokens
const Button = styled.button`
  background-color: var(--foundation-bg-primary);
  color: var(--foundation-text-body);
  padding: var(--semantic-spacing-medium);
`;
```

### **TypeScript Integration**
```typescript
// Type-safe token access
import { tokens } from '@aplica/tokens';

const buttonStyles = {
  backgroundColor: tokens.semantic.color.brand.primary,
  color: tokens.semantic.color.text.body,
  padding: tokens.semantic.spacing.medium
};
```

## 📦 **Component Library Scope**

### **Phase 1: Core Components**
Based on existing token components:
- **Button** (buttonMain, buttonIcon)
- **Input** (inputField, inputSingle, inputTextarea, inputSelect)
- **Card** 
- **Checkbox** & **Radio**
- **Toggle**
- **Tag** & **CompoundTag**

### **Phase 2: Layout & Navigation**
- **BottomSheet**
- **ListMenu** & **ListMenuItem**
- **DropdownButton**
- **Dimmer**

### **Phase 3: Advanced Components**
- **Loading**
- **Drag** components
- **LinkAction**
- **DismissButton**

## 🔧 **Technology Stack**

### **Core Dependencies**
- **React** 18+
- **Radix UI** (primitives)
- **Shadcn/ui** (component patterns)
- **TypeScript** (full type safety)
- **Tailwind CSS** or **Styled Components** (styling approach)

### **Build & Development**
- **Vite** (build tool)
- **Storybook** 7+ (documentation)
- **Vitest** (testing)
- **Changesets** (versioning)
- **Turborepo** or **Nx** (monorepo management)

### **Token Integration**
- **Existing Style Dictionary setup** (already functional)
- **CSS Variables** generation from tokens
- **TypeScript definitions** for tokens

## 📚 **Storybook Configuration**

### **Story Structure**
```
stories/
├── foundations/
│   ├── Colors.stories.tsx         # Token color palette
│   ├── Typography.stories.tsx     # Typography tokens
│   └── Spacing.stories.tsx        # Spacing tokens
├── components/
│   ├── Button.stories.tsx
│   ├── Input.stories.tsx
│   └── [other components]
└── examples/
    ├── Forms.stories.tsx          # Complex form examples
    └── Layouts.stories.tsx        # Layout examples
```

### **Token Documentation**
- **Interactive color palette** from semantic tokens
- **Typography scale** visualization
- **Spacing system** demonstration
- **Component variations** using different token combinations

## 🎯 **Success Criteria**

### **Functional Requirements**
- [ ] Component library builds successfully
- [ ] All components use design tokens consistently
- [ ] Storybook runs and displays all components
- [ ] TypeScript types work correctly
- [ ] Library can be consumed by external projects

### **Quality Requirements**
- [ ] Components follow Radix UI accessibility standards
- [ ] Design tokens are properly integrated
- [ ] Comprehensive Storybook documentation
- [ ] Unit tests for critical components
- [ ] Performance benchmarks meet standards

### **Developer Experience**
- [ ] Clear installation and usage documentation
- [ ] IntelliSense works for token autocomplete
- [ ] Hot reload works in development
- [ ] Build times are reasonable (<30s)
- [ ] Clear error messages and debugging

## 🚧 **Development Phases**

### **Phase 1: Foundation Setup** (Week 1-2)
1. **Project Structure**: Set up monorepo with packages
2. **Token Integration**: Connect existing token system
3. **Build System**: Configure Vite + TypeScript
4. **Storybook**: Basic Storybook setup

### **Phase 2: Core Components** (Week 3-4)
1. **Button Components**: Implement with Radix + tokens
2. **Input Components**: Form inputs with validation
3. **Basic Layout**: Card, spacing utilities
4. **Storybook Stories**: Document all components

### **Phase 3: Advanced Features** (Week 5-6)
1. **Complex Components**: BottomSheet, Dropdown, etc.
2. **Theme Switching**: Support for different token themes
3. **Testing**: Unit tests and visual regression tests
4. **Documentation**: Complete usage guides

### **Phase 4: Polish & Release** (Week 7-8)
1. **Performance**: Optimize bundle size and runtime
2. **Accessibility**: Comprehensive a11y testing
3. **Documentation**: Complete API documentation
4. **Release**: Prepare for npm publication

## 📋 **Next Steps**

### **Immediate Actions**
1. **Create project structure** with monorepo setup
2. **Configure build system** (Vite + TypeScript)
3. **Set up token integration** using existing system
4. **Initialize Storybook** with basic configuration
5. **Create first component** (Button) as proof of concept

### **Key Decisions Needed**
- **Styling approach**: CSS Variables vs CSS-in-JS vs Tailwind
- **Monorepo tool**: Turborepo vs Nx vs Lerna
- **Component API design**: How to expose token customization
- **Theme switching**: Runtime vs build-time theme selection

---

**Project Status**: Ready to begin implementation
**Estimated Timeline**: 6-8 weeks for full implementation
**Team Size**: 1-2 developers recommended
