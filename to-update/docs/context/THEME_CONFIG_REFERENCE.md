# Quick reference – Theme config (*.config.mjs)

Summary of all properties supported in a theme config file. **Practical examples:** see `dynamic-themes/configs/theme-engine.config.mjs`.

---

## Required

| Property | Type | Description |
|----------|------|-------------|
| **name** | string | Theme ID; folder name in `data/brand/{name}/`. Must match the key in `config/themes.config.json` → `themes.{name}`. |
| **colors** | object | Keys = color names (e.g. brand_primary, feedback_info). Values = hex. All keys used in `mapping` must exist here. |
| **mapping** | object | Links semantic structure to `colors`: `brand` (first, second, third), `interface.function` (primary, secondary, link), `interface.feedback` (info_default, info_secondary, success_*, warning_*, danger_*), `product` (promo_default, promo_secondary, cashback_*, premium_*). |
| **typography** | object | `fontFamilies`: main, content, display, code. `weights`: for each family, the 5 weights (light, regular, semibold, bold, black) with { normal, italic, numeric }. |

---

## Optional

### foundation

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **foundation.neutralsSource** | 'first' \| 'second' \| 'third' | 'first' | Brand color used as base for neutrals/contrast in brand.ambient. |

### options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **options.txtOnStrategy** | 'high-contrast' \| 'brand-tint' | 'high-contrast' | Text color strategy on colored backgrounds. |
| **options.darkModeChroma** | number | 0.85 | Dark mode saturation factor (1.0 = same as light). |
| **options.uiTokens** | boolean | false | Generate `_ui.json` with UI tokens. |
| **options.includePrimitives** | boolean | true | Generate `_primitive_theme.json`; false = direct HEX in `_brand.json` (lower Figma memory). |
| **options.accessibilityLevel** | 'AA' \| 'AAA' | 'AA' | Minimum contrast (4.5:1 or 7:1). |
| **options.strictValidation** | boolean | false | Fail build when contrast does not meet level. |
| **options.acceptAALevelFallback** | boolean | false | With AAA active: accept AA automatically when AAA fails. |
| **options.interactiveFallback** | boolean | true | Prompt user when AAA fails (CLI). |
| **options.accessibilityBypass** | boolean | false | Bypass accessibility validation (documented in $meta.json). |

### overrides

| Property | Description |
|----------|-------------|
| **overrides.interface.function.active** | Override "active" state for primary/secondary/link. Value: hex (string) or object { surface, txtOn?, border? }. |
| **overrides.neutrals** | Object: key = color name in `colors`. Value: Option B = { baseColor, referenceLevel }; Option C = { surface: { '5': hex, … }, txtOn?, border? }. |
| **overrides.grayscale** | Override global grayscale scale: baseColor + referenceLevel, or manual surface/txtOn/border. |
| **overrides.brand** | Deep merge over generated `theme.color.*` object (Tokens Studio structure). |

### borders

| Property | Description |
|----------|-------------|
| **borders** | Border radius; uses references to `data/dimension`. Leave `{}` to use dimension defaults. |

---

## Gradients

Gradient structure is **global** in `config/themes.config.json`:

- `global.gradients`: true/false
- `global.gradientConfig`: degrees, steps, defaultComposites (first, second, third)

Theme files **do not define** gradient structure; only overrides in `overrides.*` if needed. See `docs/context/DYNAMIC_THEMES.md` and `docs/context/GRADIENT_PLAN_REFERENCE.md`.

---

## Registering the theme

After creating the `.config.mjs`, register it in **config/themes.config.json**:

```json
"themes": {
  "my_theme": {
    "includePrimitives": true,
    "foundation": {
      "brand": "engine",
      "files": ["default.json", "styles/typography_styles.json", "styles/elevation_styles.json"]
    }
  }
}
```

`includePrimitives` in themes.config may override the theme config value; the generator uses the theme config default.

---

## Commands

```bash
npm run themes:generate                    # Generate all themes
node dynamic-themes/scripts/generate-all-themes.mjs --config=my-theme   # Single theme
npm run build:themes                       # Full pipeline (ensure + themes + dimension + sync + foundations + build)
```

---

**Last updated:** 2026-02-20. Full template: `dynamic-themes/configs/theme-engine.config.mjs`.
