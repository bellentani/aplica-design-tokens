# Project Structure Recommendation - Aplica Radix Components

## 🏗️ **Recommended Folder Organization**

Based on the current tokens project and the new component library goals, here's the optimal folder structure:

```
aplica-radix/
├── 📁 packages/
│   ├── 📁 tokens/                     # Existing tokens system (symlink or copy)
│   │   ├── tokens/                    # Current token files
│   │   ├── transformers/              # Current build system
│   │   ├── dist/                      # Generated token outputs
│   │   └── package.json
│   │
│   ├── 📁 ui/                         # Main component library
│   │   ├── 📁 src/
│   │   │   ├── 📁 components/         # React components
│   │   │   │   ├── 📁 Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.stories.tsx
│   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 Input/
│   │   │   │   ├── 📁 Card/
│   │   │   │   ├── 📁 Dialog/
│   │   │   │   └── index.ts           # Export all components
│   │   │   │
│   │   │   ├── 📁 hooks/              # Custom React hooks
│   │   │   │   ├── useTheme.ts
│   │   │   │   ├── useTokens.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── 📁 utils/              # Utility functions
│   │   │   │   ├── cn.ts              # Class name utility
│   │   │   │   ├── tokens.ts          # Token utilities
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── 📁 styles/             # CSS and styling
│   │   │   │   ├── globals.css        # Global styles
│   │   │   │   ├── tokens.css         # Generated token CSS vars
│   │   │   │   ├── components.css     # Component-specific styles
│   │   │   │   └── animations.css     # Animation utilities
│   │   │   │
│   │   │   ├── 📁 types/              # TypeScript type definitions
│   │   │   │   ├── tokens.ts          # Token type definitions
│   │   │   │   ├── components.ts      # Component prop types
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── index.ts               # Main library export
│   │   │
│   │   ├── 📁 scripts/                # Build and utility scripts
│   │   │   ├── generate-css-vars.ts   # Generate CSS from tokens
│   │   │   ├── build-components.ts    # Component build script
│   │   │   └── sync-tokens.ts         # Sync with tokens package
│   │   │
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   └── 📁 icons/                      # Icon library (optional)
│       ├── 📁 src/
│       │   ├── 📁 components/         # Icon components
│       │   └── index.ts
│       └── package.json
│
├── 📁 apps/
│   ├── 📁 storybook/                  # Storybook documentation
│   │   ├── 📁 .storybook/
│   │   │   ├── main.ts
│   │   │   ├── preview.ts
│   │   │   └── theme.ts
│   │   │
│   │   ├── 📁 stories/                # Story files
│   │   │   ├── 📁 foundations/        # Design system stories
│   │   │   │   ├── Colors.stories.tsx
│   │   │   │   ├── Typography.stories.tsx
│   │   │   │   ├── Spacing.stories.tsx
│   │   │   │   └── Tokens.stories.tsx
│   │   │   │
│   │   │   ├── 📁 components/         # Component stories
│   │   │   │   ├── Button.stories.tsx
│   │   │   │   ├── Input.stories.tsx
│   │   │   │   └── [other components]
│   │   │   │
│   │   │   └── 📁 examples/           # Complex examples
│   │   │       ├── Forms.stories.tsx
│   │   │       ├── Layouts.stories.tsx
│   │   │       └── Dashboard.stories.tsx
│   │   │
│   │   ├── 📁 public/                 # Static assets
│   │   └── package.json
│   │
│   ├── 📁 playground/                 # Development playground
│   │   ├── 📁 src/
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   └── 📁 examples/           # Component usage examples
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── index.html
│   │
│   └── 📁 docs/                       # Documentation website (optional)
│       ├── 📁 src/
│       ├── package.json
│       └── docusaurus.config.js
│
├── 📁 tools/                          # Build tools and configurations
│   ├── 📁 eslint-config/              # Shared ESLint config
│   ├── 📁 typescript-config/          # Shared TypeScript config
│   ├── 📁 build-utils/                # Build utilities
│   └── 📁 scripts/                    # Monorepo scripts
│
├── 📁 docs/                           # Project documentation
│   ├── README.md
│   ├── CONTRIBUTING.md
│   ├── CHANGELOG.md
│   └── 📁 guides/
│       ├── getting-started.md
│       ├── component-development.md
│       ├── token-integration.md
│       └── theming.md
│
├── 📁 .github/                        # GitHub workflows and templates
│   ├── 📁 workflows/
│   │   ├── ci.yml
│   │   ├── release.yml
│   │   └── storybook-deploy.yml
│   └── 📁 ISSUE_TEMPLATE/
│
├── package.json                       # Root package.json (monorepo)
├── turbo.json                         # Turborepo configuration
├── .changeset/                        # Changesets for versioning
├── tsconfig.json                      # Root TypeScript config
├── .eslintrc.js                       # Root ESLint config
├── .gitignore
└── README.md
```

## 📋 **Detailed Package Structure**

### **1. packages/tokens/ - Token System**
```
packages/tokens/
├── tokens/                    # Current token JSON files
├── transformers/              # Current Style Dictionary build system
├── dist/                      # Generated outputs (JSON, JS, TS)
├── package.json              # @aplica/tokens
└── README.md
```

**Purpose**: Maintain the existing functional token system as-is, just reorganized as a package.

### **2. packages/ui/ - Component Library**
```
packages/ui/src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx         # Main component
│   │   ├── Button.stories.tsx # Storybook stories
│   │   ├── Button.test.tsx    # Unit tests
│   │   ├── Button.module.css  # Component-specific styles (if needed)
│   │   └── index.ts           # Export
│   │
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── InputGroup.tsx     # Compound components
│   │   ├── InputLabel.tsx
│   │   └── index.ts
│   │
│   └── index.ts               # Export all components
│
├── hooks/
│   ├── useTheme.ts           # Theme switching
│   ├── useTokens.ts          # Token access
│   ├── useMediaQuery.ts      # Responsive utilities
│   └── index.ts
│
├── utils/
│   ├── cn.ts                 # Class name utility (clsx)
│   ├── tokens.ts             # Token helper functions
│   ├── variants.ts           # CVA variant utilities
│   └── index.ts
│
├── styles/
│   ├── globals.css           # Global reset and base styles
│   ├── tokens.css            # Generated CSS variables from tokens
│   ├── components.css        # Base component styles
│   └── animations.css        # Animation utilities
│
├── types/
│   ├── tokens.ts             # Token type definitions
│   ├── components.ts         # Component prop types
│   └── index.ts
│
└── index.ts                  # Main library export
```

### **3. apps/storybook/ - Documentation**
```
apps/storybook/
├── .storybook/
│   ├── main.ts               # Storybook configuration
│   ├── preview.ts            # Global decorators and parameters
│   └── theme.ts              # Custom Storybook theme
│
├── stories/
│   ├── foundations/          # Design system documentation
│   │   ├── Colors.stories.tsx
│   │   ├── Typography.stories.tsx
│   │   ├── Spacing.stories.tsx
│   │   └── Tokens.stories.tsx
│   │
│   ├── components/           # Component documentation
│   │   └── [component].stories.tsx
│   │
│   └── examples/             # Complex usage examples
│       ├── Forms.stories.tsx
│       └── Layouts.stories.tsx
│
└── package.json
```

## 🔧 **Configuration Files Strategy**

### **Root Level Configurations**
```json
// package.json (root)
{
  "name": "@aplica/components-monorepo",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "test": "turbo run test",
    "storybook": "turbo run storybook",
    "tokens:build": "turbo run build --filter=@aplica/tokens",
    "ui:build": "turbo run build --filter=@aplica/ui",
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "turbo run build --filter=@aplica/ui && changeset publish"
  }
}
```

### **Turborepo Configuration**
```json
// turbo.json
{
  "schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "storybook-static/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "storybook": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    }
  }
}
```

## 📦 **Package Dependencies Strategy**

### **packages/tokens/package.json**
```json
{
  "name": "@aplica/tokens",
  "version": "1.0.0",
  "main": "dist/index.cjs",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./semantic": "./dist/semantic/index.mjs",
    "./foundation": "./dist/foundation/index.mjs",
    "./css": "./dist/styles/tokens.css"
  },
  "devDependencies": {
    "@tokens-studio/sd-transforms": "^2.0.1",
    "style-dictionary": "^5.0.4"
  }
}
```

### **packages/ui/package.json**
```json
{
  "name": "@aplica/ui",
  "version": "0.1.0",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./styles": "./dist/styles.css"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@aplica/tokens": "workspace:*",
    "@radix-ui/react-button": "^1.0.0",
    "@radix-ui/react-checkbox": "^1.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0"
  }
}
```

## 🚀 **Development Workflow**

### **1. Token Development**
```bash
# Work on tokens
cd packages/tokens
npm run build:dev

# Tokens are automatically available to UI package
cd ../ui
npm run dev  # Uses latest tokens
```

### **2. Component Development**
```bash
# Start development environment
npm run dev  # Starts all packages in watch mode

# Or specific packages
turbo run dev --filter=@aplica/ui
turbo run storybook --filter=storybook
```

### **3. Testing Strategy**
```bash
# Run all tests
npm run test

# Test specific package
turbo run test --filter=@aplica/ui

# Visual regression testing
npm run test:visual
```

## 🎯 **Benefits of This Structure**

### **1. Separation of Concerns**
- **Tokens**: Independent, reusable across projects
- **UI**: Focused on component implementation
- **Storybook**: Pure documentation and testing
- **Playground**: Development and experimentation

### **2. Scalability**
- Easy to add new packages (icons, themes, etc.)
- Clear dependency management
- Independent versioning per package

### **3. Developer Experience**
- Fast builds with Turborepo caching
- Hot reload across packages
- Clear import paths
- Type safety across packages

### **4. Maintenance**
- Clear ownership of each package
- Independent testing and deployment
- Easy to onboard new developers
- Clear documentation structure

## 📋 **Migration Strategy**

### **Phase 1: Setup Structure**
1. Create monorepo structure
2. Move existing tokens to `packages/tokens/`
3. Set up build tools (Turborepo, TypeScript configs)

### **Phase 2: Token Integration**
1. Ensure tokens build system works in new structure
2. Create CSS variable generation
3. Set up token TypeScript types

### **Phase 3: Component Development**
1. Create first component (Button) with token integration
2. Set up Storybook
3. Create development playground

### **Phase 4: Scale Up**
1. Add remaining components
2. Complete Storybook documentation
3. Add testing and CI/CD

This structure provides a solid foundation for both the current token system and the new component library, with clear separation of concerns and excellent developer experience.
