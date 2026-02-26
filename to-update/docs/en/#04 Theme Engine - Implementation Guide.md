# Aplica Tokens Theme Engine - Implementation Guide

## Creating a New Brand

### Step 1: Create Configuration File

Copy the template and create your configuration file:

```bash
cp dynamic-themes/configs/theme-engine.config.mjs dynamic-themes/configs/my-brand.config.mjs
```

### Step 2: Configure Colors

Edit the configuration file:

```javascript
// dynamic-themes/configs/my-brand.config.mjs
export default {
  name: 'my_brand',
  
  colors: {
    // Brand colors
    brand_primary: '#0066CC',
    brand_secondary: '#2E2E2E',
    brand_tertiary: '#666666',
    
    // Action colors
    action_primary: '#0066CC',
    action_secondary: '#2E2E2E',
    action_link: '#0066CC',
    
    // Feedback (default = light, secondary = saturated)
    feedback_info: '#047AF1',
    feedback_info_dark: '#0356B0',
    feedback_success: '#00A838',
    feedback_success_dark: '#007A28',
    feedback_warning: '#F28E01',
    feedback_warning_dark: '#C47100',
    feedback_error: '#E82727',
    feedback_error_dark: '#B81C1C',
    
    // Product
    promo_red: '#e91935',
    promo_red_dark: '#c41228',
    cashback_gold: '#ffcc00',
    cashback_gold_dark: '#d4a800',
    premium_purple: '#6e3ce4',
    premium_purple_dark: '#5424c9'
  },
  
  mapping: {
    brand: {
      first: 'brand_primary',
      second: 'brand_secondary',
      third: 'brand_tertiary'
    },
    interface: {
      function: {
        primary: 'action_primary',
        secondary: 'action_secondary',
        link: 'action_link'
      },
      feedback: {
        info_default: 'feedback_info',
        info_secondary: 'feedback_info_dark',
        success_default: 'feedback_success',
        success_secondary: 'feedback_success_dark',
        warning_default: 'feedback_warning',
        warning_secondary: 'feedback_warning_dark',
        danger_default: 'feedback_error',
        danger_secondary: 'feedback_error_dark'
      }
    },
    product: {
      promo_default: 'promo_red',
      promo_secondary: 'promo_red_dark',
      cashback_default: 'cashback_gold',
      cashback_secondary: 'cashback_gold_dark',
      premium_default: 'premium_purple',
      premium_secondary: 'premium_purple_dark'
    }
  },
  
  options: {
    txtOnStrategy: 'high-contrast',
    darkModeChroma: 0.85,
    includePrimitives: true
  },
  
  typography: {
    fontFamilies: {
      main: 'Roboto Flex',
      content: 'Roboto Flex',
      display: 'Roboto Flex',
      code: 'Source Code Pro'
    }
  }
};
```

### Step 3: Register the theme for the build

Add the theme to `config/themes.config.json` under `themes` with the same key as `name` (e.g. `my_brand`), and set `foundation.brand` and `foundation.files`. The build only includes themes listed there. See [Configuring Themes and Foundations](#10-theme-engine---configuring-themes-and-foundations) for the full pipeline.

### Step 4: Generate theme

```bash
# Generate only this brand (use the config file stem: my-brand for my-brand.config.mjs)
node dynamic-themes/scripts/generate-all-themes.mjs --config=my-brand

# Or generate all brands
npm run themes:generate

# Or run the full pipeline (ensure:data, themes, dimension, sync, foundations, build)
npm run build:themes
```

### Step 5: Build

```bash
# Complete build
npm run build
```

### Result

After `npm run build`, the system generates outputs such as:
- `my_brand-light-positive`
- `my_brand-light-negative`
- `my_brand-dark-positive`
- `my_brand-dark-negative`

---

## Configuration Options

### txtOnStrategy

Defines how to calculate text colors on surfaces:

| Option | Description |
|--------|-------------|
| `high-contrast` | Always black or white (maximum contrast) |
| `brand-tint` | Uses palette color that passes WCAG AA |

### darkModeChroma

Adjusts saturation in dark mode:

| Value | Effect |
|-------|--------|
| `1.0` | Same saturation as light mode |
| `0.85` | 15% less saturated (recommended) |
| `0.7` | 30% less saturated |

### includePrimitives

Controls generation of `_primitive_theme.json`:

| Option | Result |
|--------|--------|
| `true` (default) | Generates file with decomposed palettes |
| `false` | Direct HEX values in `_brand.json` |

---

## Customizing Typography

```javascript
typography: {
  fontFamilies: {
    main: 'Inter',           // Main UI
    content: 'Georgia',      // Body text
    display: 'Playfair Display', // Headlines
    code: 'Fira Code'        // Code
  },
  weights: {
    display: {
      'Regular': 400,
      'Bold': 700
    }
  }
}
```

### Weight Fallback

If a weight doesn't exist, the system uses the closest:
- `light` (300) → regular → bold
- `semibold` (600) → bold → regular
- `black` (900) → bold → regular

---

## Overrides

### Custom Neutrals

```javascript
overrides: {
  neutrals: {
    brand_primary: {
      // Option B: Automatic decomposition
      baseColor: '#AFAFB8',
      referenceLevel: 100,
      
      // Option C: Manual override
      surface: { '100': '#AFAFB8' },
      txtOn: { '100': '#000000' },
      border: { '100': '#9999A3' }
    }
  }
}
```

### Custom Grayscale

```javascript
overrides: {
  grayscale: {
    surface: { '5': '#faf8f5', '140': '#1a1814' }
  }
}
```

### Interface function active state

To set a single color for the **active** state of all buttons/links (primary, secondary, link), use `overrides.interface.function.active`. When a hex string: generator sets surface = hex, txtOn by WCAG contrast, and derived border. See `docs/override-interface-active.md`.

```javascript
overrides: {
  interface: { function: { active: '#0067FF' } }
}
```

---

## Architecture Synchronization

After modifying the schema, synchronize the files:

```bash
# Update architecture files
npm run sync:architecture

# Verify without changing
npm run sync:architecture:test
```

---

## Troubleshooting

### Error: Color not found

Verify if the color is defined in `colors` and mapped in `mapping`.

### Error: Build failed

```bash
# Ensure data structure (e.g. after fresh clone)
npm run ensure:data

# Clean and full rebuild
rm -rf dist/
npm run build:themes
```

### Check Structure

```bash
# View current schema
npm run sync:architecture:schema
```

---

**See also:** [Configuring Themes and Foundations](#10-theme-engine---configuring-themes-and-foundations) for the full pipeline, foundations, and `config/themes.config.json`.

*Follow this guide to create new brands while maintaining consistency with the system.*
