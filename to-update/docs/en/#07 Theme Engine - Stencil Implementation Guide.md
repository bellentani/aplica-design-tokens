# Aplica Tokens Theme Engine - Stencil Implementation Guide

## Overview

Aplica Design Tokens work seamlessly with **Stencil** web components through CSS Variables that work with Shadow DOM.

---

## Quick Start

### 1. Import CSS Variables

```typescript
// my-component.tsx
@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: true
})
export class MyButton {
  render() {
    return <button class="btn"><slot /></button>;
  }
}
```

```css
/* my-button.css */
@import url('path/to/dist/css/theme_engine-light-positive.css');

.btn {
  background-color: var(--semantic-color-interface-function-primary-normal-background);
  color: var(--semantic-color-interface-function-primary-normal-txtOn);
  padding: var(--semantic-dimension-spacing-small) var(--semantic-dimension-spacing-medium);
  border-radius: var(--semantic-border-radii-small);
}
```

---

## Available Tokens

### Semantic Tokens

```css
/* Colors */
--semantic-color-brand-*
--semantic-color-interface-*
--semantic-color-product-*
--semantic-color-text-*
  
/* Dimensions */
--semantic-dimension-spacing-*
--semantic-dimension-sizing-*
  
  /* Typography */
--semantic-typography-fontFamilies-*
--semantic-typography-fontSizes-*
--semantic-typography-fontWeights-*

/* Borders */
--semantic-border-radii-*
--semantic-border-width-*
```

### Foundation Tokens

```css
/* Backgrounds */
--foundation-bg-primary
--foundation-bg-secondary
--foundation-bg-brand-*

/* Text */
--foundation-txt-primary
--foundation-txt-secondary
--foundation-txt-muted

/* Borders */
--foundation-border-primary
--foundation-border-secondary
```

---

## Dynamic Theme Switching

### Theme Provider

```typescript
@Component({
  tag: 'theme-provider',
  shadow: true
})
export class ThemeProvider {
  @Prop() theme: string = 'theme_engine-light-positive';

  @Method()
  async switchTheme(newTheme: string) {
    const existingLink = document.querySelector('link[data-theme]');
    if (existingLink) {
      existingLink.remove();
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/assets/tokens/${newTheme}.css`;
    link.setAttribute('data-theme', newTheme);
    document.head.appendChild(link);
  }

  render() {
    return <slot />;
  }
}
```

### Toggling Light/Dark

```typescript
@Component({
  tag: 'theme-toggle',
  shadow: true
})
export class ThemeToggle {
  @State() isDark: boolean = false;

  private toggleTheme() {
    this.isDark = !this.isDark;
    const theme = this.isDark 
      ? 'theme_engine-dark-positive' 
      : 'theme_engine-light-positive';
    
    // Dispatch event to provider
    this.el.dispatchEvent(new CustomEvent('themeChange', {
      detail: { theme },
      bubbles: true
    }));
  }

  render() {
    return (
      <button onClick={() => this.toggleTheme()}>
        {this.isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
    );
  }
}
```

---

## Component Examples

### Button

```css
/* button.css */
.button {
  background: var(--semantic-color-interface-function-primary-normal-surface);
  color: var(--semantic-color-interface-function-primary-normal-txtOn);
  border: 1px solid var(--semantic-color-interface-function-primary-normal-border);
  padding: var(--semantic-dimension-spacing-small) var(--semantic-dimension-spacing-medium);
  border-radius: var(--semantic-border-radii-small);
  font-family: var(--semantic-typography-fontFamilies-main);
  font-size: var(--semantic-typography-fontSizes-medium);
  cursor: pointer;
  transition: background 0.2s;
  }
  
.button:hover {
  background: var(--semantic-color-interface-function-primary-active-surface);
    }
    
.button--secondary {
  background: var(--semantic-color-interface-function-secondary-normal-surface);
  color: var(--semantic-color-interface-function-secondary-normal-txtOn);
}
```

### Card

```css
/* card.css */
.card {
  background: var(--foundation-bg-primary);
  border: 1px solid var(--foundation-border-secondary);
  border-radius: var(--semantic-border-radii-medium);
  padding: var(--semantic-dimension-spacing-large);
  box-shadow: var(--semantic-shadow-depth-level1);
  }
  
.card__title {
  color: var(--foundation-txt-primary);
  font-family: var(--semantic-typography-fontFamilies-display);
  font-size: var(--semantic-typography-fontSizes-large);
  margin-bottom: var(--semantic-dimension-spacing-small);
  }
  
.card__body {
  color: var(--foundation-txt-secondary);
  font-family: var(--semantic-typography-fontFamilies-content);
  font-size: var(--semantic-typography-fontSizes-medium);
}
```

### Feedback Banner

```css
/* banner.css */
.banner {
  padding: var(--semantic-dimension-spacing-medium);
  border-radius: var(--semantic-border-radii-small);
}

.banner--info {
  background: var(--semantic-color-interface-feedback-info_default-background);
  color: var(--semantic-color-interface-feedback-info_default-txtOn);
  border: 1px solid var(--semantic-color-interface-feedback-info_default-border);
}

.banner--success {
  background: var(--semantic-color-interface-feedback-success_default-background);
  color: var(--semantic-color-interface-feedback-success_default-txtOn);
}

.banner--warning {
  background: var(--semantic-color-interface-feedback-warning_default-background);
  color: var(--semantic-color-interface-feedback-warning_default-txtOn);
  }

.banner--danger {
  background: var(--semantic-color-interface-feedback-danger_default-background);
  color: var(--semantic-color-interface-feedback-danger_default-txtOn);
}
```

---

## Output Structure

```
dist/
├── css/
│   ├── theme_engine-light-positive.css
│   ├── theme_engine-light-negative.css
│   ├── theme_engine-dark-positive.css
│   ├── theme_engine-dark-negative.css
│   ├── theme_engine-light-positive.css
│   └── foundation/
│       ├── foundation.css
│       └── typography.css
├── json/
├── esm/
└── js/
```

---

## Benefits

- ✅ **CSS Variables** work with Shadow DOM
- ✅ **Type-safe** with TypeScript
- ✅ **Framework-agnostic** Web Components
- ✅ **Themeable** out of the box
- ✅ **Consistent** across the application

---

*Use this guide to implement Design Tokens in your Stencil components.*
