# Implementation Plan - Radix UI Component Library with Design Tokens

## 🎯 **Project Overview**

Create a modern React component library that integrates the existing **functional design tokens system** with **Radix UI primitives** and **Shadcn/ui patterns**, complete with **Storybook documentation**.

## 📋 **Phase 1: Foundation Setup (Week 1-2)**

### **1.1 Project Structure Setup**
```bash
# Create new project structure
mkdir aplica-radix-components
cd aplica-radix-components

# Initialize monorepo
npm init -y
npm install -D @changesets/cli turbo

# Create packages structure
mkdir -p packages/{ui,tokens} apps/{playground,storybook}
```

### **1.2 Package Configuration**

#### **Root package.json**
```json
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
    "storybook": "turbo run storybook",
    "test": "turbo run test"
  },
  "devDependencies": {
    "@changesets/cli": "^2.26.0",
    "turbo": "^1.10.0",
    "typescript": "^5.0.0"
  }
}
```

#### **packages/ui/package.json**
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
  "files": ["dist"],
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch",
    "test": "vitest"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@radix-ui/react-button": "^1.0.0",
    "@radix-ui/react-checkbox": "^1.0.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0",
    "@radix-ui/react-form": "^0.0.3",
    "@radix-ui/react-select": "^1.2.0",
    "@radix-ui/react-switch": "^1.0.0",
    "@radix-ui/react-tabs": "^1.0.0",
    "@radix-ui/react-toast": "^1.1.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@aplica/tokens": "workspace:*",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "vite": "^4.4.0",
    "vitest": "^0.34.0"
  }
}
```

### **1.3 Build System Configuration**

#### **Vite Configuration (packages/ui/vite.config.ts)**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AplicaUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

### **1.4 Token Integration Setup**

#### **Link Existing Tokens**
```bash
# Create symlink to existing tokens
cd packages
ln -s ../../tokens tokens

# Or use git submodule if tokens are in separate repo
git submodule add <tokens-repo-url> packages/tokens
```

#### **Token CSS Variables Generator**
```typescript
// packages/ui/scripts/generate-css-vars.ts
import { tokens } from '@aplica/tokens';

function generateCSSVariables() {
  const cssVars = Object.entries(tokens.semantic)
    .map(([key, value]) => `  --semantic-${key}: ${value};`)
    .join('\n');
  
  const css = `:root {\n${cssVars}\n}`;
  
  return css;
}

// Generate CSS file
const css = generateCSSVariables();
fs.writeFileSync('src/styles/tokens.css', css);
```

## 📋 **Phase 2: Core Components (Week 3-4)**

### **2.1 Component Architecture**

#### **Base Component Pattern**
```typescript
// packages/ui/src/components/Button/Button.tsx
import * as React from 'react';
import * as ButtonPrimitive from '@radix-ui/react-button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  // Base styles using CSS variables from tokens
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-[var(--semantic-color-brand-primary)] text-[var(--semantic-color-text-inverse)] hover:bg-[var(--semantic-color-brand-primary-hover)]',
        destructive: 'bg-[var(--semantic-color-error)] text-[var(--semantic-color-text-inverse)] hover:bg-[var(--semantic-color-error-hover)]',
        outline: 'border border-[var(--semantic-color-border)] hover:bg-[var(--semantic-color-surface-hover)]',
        secondary: 'bg-[var(--semantic-color-surface-secondary)] text-[var(--semantic-color-text-secondary)] hover:bg-[var(--semantic-color-surface-secondary-hover)]',
        ghost: 'hover:bg-[var(--semantic-color-surface-hover)]',
        link: 'underline-offset-4 hover:underline text-[var(--semantic-color-brand-primary)]',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? ButtonPrimitive.Root : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
```

### **2.2 Component Implementation Priority**

#### **Week 3: Form Components**
1. **Button** (primary, secondary, destructive, outline, ghost, link)
2. **Input** (text, email, password, number)
3. **Textarea**
4. **Select** (using Radix Select)
5. **Checkbox**
6. **Radio Group**
7. **Switch/Toggle**

#### **Week 4: Layout & Feedback**
1. **Card** (header, content, footer)
2. **Badge/Tag**
3. **Alert** (info, warning, error, success)
4. **Loading** (spinner, skeleton)
5. **Toast** (using Radix Toast)

### **2.3 Utility Functions**

#### **Class Name Utility**
```typescript
// packages/ui/src/utils/cn.ts
import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

#### **Token Utilities**
```typescript
// packages/ui/src/utils/tokens.ts
import { tokens } from '@aplica/tokens';

export function getTokenValue(path: string): string {
  return `var(--${path.replace(/\./g, '-')})`;
}

export function createTokenVar(category: string, name: string): string {
  return `var(--semantic-${category}-${name})`;
}

// Usage: createTokenVar('color', 'brand-primary') -> 'var(--semantic-color-brand-primary)'
```

## 📋 **Phase 3: Storybook Setup (Week 3-4)**

### **3.1 Storybook Configuration**

#### **Installation & Setup**
```bash
cd apps
npx storybook@latest init
cd storybook
```

#### **Storybook Configuration (.storybook/main.ts)**
```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-design-tokens',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

export default config;
```

#### **Preview Configuration (.storybook/preview.ts)**
```typescript
import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';
import '../../packages/ui/src/styles/tokens.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: 'var(--semantic-color-background)',
        },
        {
          name: 'dark',
          value: 'var(--semantic-color-background-inverse)',
        },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'ze-light-positive',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'ze-light-positive', title: 'Ze Light Positive' },
          { value: 'ze-light-negative', title: 'Ze Light Negative' },
          { value: 'theme_engine-light-positive', title: 'Theme Engine Light Positive' },
          { value: 'theme_engine-light-negative', title: 'Theme Engine Light Negative' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

### **3.2 Story Templates**

#### **Button Stories**
```typescript
// apps/storybook/stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@aplica/ui';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🚀</Button>
    </div>
  ),
};
```

#### **Design Tokens Stories**
```typescript
// apps/storybook/stories/DesignTokens.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { tokens } from '@aplica/tokens';

const meta: Meta = {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const Colors: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Brand Colors</h2>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(tokens.semantic.color.brand).map(([name, value]) => (
            <div key={name} className="text-center">
              <div
                className="w-16 h-16 rounded-lg mb-2 mx-auto border"
                style={{ backgroundColor: value }}
              />
              <div className="text-sm font-medium">{name}</div>
              <div className="text-xs text-gray-500">{value}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Text Colors</h2>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(tokens.semantic.color.text).map(([name, value]) => (
            <div key={name} className="text-center">
              <div
                className="w-16 h-16 rounded-lg mb-2 mx-auto border flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: value }}
              >
                Aa
              </div>
              <div className="text-sm font-medium">{name}</div>
              <div className="text-xs text-gray-500">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Spacing: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Spacing Scale</h2>
      {Object.entries(tokens.semantic.spacing).map(([name, value]) => (
        <div key={name} className="flex items-center gap-4">
          <div className="w-20 text-sm font-medium">{name}</div>
          <div className="w-16 text-xs text-gray-500">{value}</div>
          <div
            className="bg-blue-500 h-4"
            style={{ width: value }}
          />
        </div>
      ))}
    </div>
  ),
};
```

## 📋 **Phase 4: Advanced Components (Week 5-6)**

### **4.1 Complex Components**

#### **Dialog/Modal Component**
```typescript
// packages/ui/src/components/Dialog/Dialog.tsx
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-[var(--semantic-color-overlay)] backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-[var(--semantic-color-background)] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Export all components
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogPortal,
};
```

### **4.2 Form Components with Validation**

#### **Form Context & Validation**
```typescript
// packages/ui/src/components/Form/Form.tsx
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../utils/cn';

type FormContextValue = {
  errors: Record<string, string>;
  setError: (name: string, error: string) => void;
  clearError: (name: string) => void;
};

const FormContext = React.createContext<FormContextValue | null>(null);

export function useFormContext() {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Form');
  }
  return context;
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (data: FormData) => void;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, onSubmit, ...props }, ref) => {
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const setError = React.useCallback((name: string, error: string) => {
      setErrors(prev => ({ ...prev, [name]: error }));
    }, []);

    const clearError = React.useCallback((name: string) => {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }, []);

    const handleSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (onSubmit) {
        const formData = new FormData(event.currentTarget);
        onSubmit(formData);
      }
    }, [onSubmit]);

    const contextValue = React.useMemo(() => ({
      errors,
      setError,
      clearError,
    }), [errors, setError, clearError]);

    return (
      <FormContext.Provider value={contextValue}>
        <form
          ref={ref}
          className={cn('space-y-6', className)}
          onSubmit={handleSubmit}
          {...props}
        />
      </FormContext.Provider>
    );
  }
);
Form.displayName = 'Form';

export { Form };
```

## 📋 **Phase 5: Testing & Documentation (Week 7-8)**

### **5.1 Testing Setup**

#### **Vitest Configuration**
```typescript
// packages/ui/vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

#### **Test Utilities**
```typescript
// packages/ui/src/test/utils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-theme="ze-light-positive">
      {children}
    </div>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

#### **Component Tests**
```typescript
// packages/ui/src/components/Button/Button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[var(--semantic-color-error)]');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### **5.2 Documentation**

#### **Component Documentation Template**
```markdown
# Button

A versatile button component built on Radix UI primitives with design token integration.

## Usage

```tsx
import { Button } from '@aplica/ui';

function MyComponent() {
  return (
    <Button variant="default" size="default">
      Click me
    </Button>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | The visual style variant |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | The size of the button |
| `asChild` | `boolean` | `false` | Change the default rendered element |

### Design Tokens Used

- `--semantic-color-brand-primary`
- `--semantic-color-text-inverse`
- `--semantic-spacing-medium`

## Examples

### All Variants
[Storybook link to examples]

### With Icons
[Storybook link to icon examples]
```

## 🎯 **Success Metrics**

### **Technical Metrics**
- [ ] **Bundle Size**: < 100KB gzipped for full library
- [ ] **Build Time**: < 30 seconds for complete build
- [ ] **Test Coverage**: > 80% for all components
- [ ] **Accessibility**: 100% WCAG AA compliance
- [ ] **Performance**: Lighthouse score > 95

### **Developer Experience Metrics**
- [ ] **Setup Time**: < 5 minutes from npm install to first component
- [ ] **Documentation**: Complete API docs for all components
- [ ] **TypeScript**: 100% type coverage with IntelliSense
- [ ] **Storybook**: All components documented with examples
- [ ] **Token Integration**: Seamless design token usage

### **Quality Metrics**
- [ ] **Visual Regression**: Automated visual testing setup
- [ ] **Cross-browser**: Testing on Chrome, Firefox, Safari, Edge
- [ ] **Mobile**: Responsive design on all components
- [ ] **Dark Mode**: Ready for future dark theme implementation
- [ ] **Internationalization**: RTL support where applicable

---

**Next Action**: Begin Phase 1 implementation with project structure setup and token integration.
