# Override `interface.function.active`: accessibility and border

> **Status:** ✅ Implemented in theme-generator. Example config: `dynamic-themes/configs/theme-engine.config.mjs`.

This document describes in detail the changes made in the theme-generator: **what** changed, **where** (script and lines), and **why**, so you can apply the same in the project or replicate elsewhere.

---

## 1. Context and problem

### Affected config

In theme configs (e.g. `dynamic-themes/configs/theme-engine.config.mjs`, `aplica-joy.config.mjs`) you can set:

```js
overrides: {
  interface: { function: { active: '#0067FF' } }  // or '#E41E95', etc.
}
```

### Previous behavior (before the change)

When `active` was **a string (hex)**:

- **surface** = given hex ✅
- **txtOn** = always `#FFFFFF` ❌ (no WCAG contrast check)
- **border** = same hex as surface ❌ (border same as background)

Consequences:

1. On light surfaces, white text fails contrast (accessibility).
2. Border same as surface gives no visual definition for the "active" state.

### Desired behavior (after the change)

When `active` is **a string (hex)**:

- **surface** = given hex (unchanged).
- **txtOn** = computed by **WCAG contrast** (black or white according to AA/AAA level in config).
- **border** = **derived from surface** (surface darkened by ~20%) for a visible border.

When `active` is an **object** `{ surface, txtOn?, border? }`, behavior is unchanged: the given values and current fallbacks are used.

---

## 2. Script and location of changes

**File:** `dynamic-themes/scripts/theme-generator.mjs`

All changes are in this single file.

---

## 3. Change 1: New color helpers (after `hexToRgb`)

**Where:** right after the `hexToRgb` function, at the top of the file (before `relativeLuminance`).

**Lines (reference):** approximately **67–91** (right after the closing of `hexToRgb` around line 65).

### Why it changed

- `hexToRgb` already existed; we needed to **convert back from RGB to HEX** to build the darkened color.
- We needed a function that **darkens** a hex (blend with black) to derive the border from the surface.

### What was added

**1) Function `rgbToHex(r, g, b)`**

- Converts RGB values (0–255) to a `#RRGGBB` string.
- Rounds and clamps each channel to `[0, 255]` before converting.
- Used by `darkenHex` to return the darkened hex.

**2) Function `darkenHex(hex, amount)`**

- **Parameters:** `hex` (string `#RRGGBB`), `amount` (0..1, default `0.2`).
- **Behavior:** blends the hex with black: each RGB channel is multiplied by `(1 - amount)` then converted back to hex.
- **Use:** generate the **border** color from the surface (border = darkened surface).

Code added (for reference):

```js
/**
 * Converts RGB to HEX
 */
function rgbToHex(r, g, b) {
  const toHex = (c) => {
    const n = Math.max(0, Math.min(255, Math.round(c)));
    return n.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Darkens a hex color by blending with black.
 * @param {string} hex - Hex color (#RGB or #RRGGBB)
 * @param {number} amount - 0..1, how much to darken (0 = no change, 1 = black)
 * @returns {string} Darkened hex
 */
function darkenHex(hex, amount = 0.2) {
  const rgb = hexToRgb(hex);
  const r = rgb.r * (1 - amount);
  const g = rgb.g * (1 - amount);
  const b = rgb.b * (1 - amount);
  return rgbToHex(r, g, b);
}
```

Place these two functions **in the same file** as `hexToRgb`, **before** `relativeLuminance` (or at the top of the file with the other color helpers).

---

## 4. Change 2: Border darkening constant (ThemeGenerator class)

**Where:** inside the `ThemeGenerator` class, **immediately before** the `generateBehaviorBlock` method.

**Lines (reference):** approximately **601–606**.

### Why it changed

- Centralize the darkening factor (20%) in a static constant.
- Makes future adjustment easier (e.g. 15% or 25%) or, in another codebase, reading the value from config.

### What was added

```js
  /**
   * Amount to darken the border relative to surface when active override is a single hex (0..1).
   * Used so border is derived from surface instead of reusing the same hex.
   */
  static ACTIVE_BORDER_DARKEN_AMOUNT = 0.2;
```

That is: a static property of the class, documentation plus value `0.2`.

---

## 5. Change 3: Override logic in `generateBehaviorBlock` when override is a string

**Where:** inside the `generateBehaviorBlock` method, in the branch `if (state === 'active' && activeOverride)` when `typeof activeOverride === 'string'`.

**Lines (reference):** approximately **628–633** (the block with 3 assignments: surface, txtOn, border).

### Why it changed

- **txtOn:** stop using fixed `#FFFFFF` and use the same contrast criterion (WCAG AA/AAA) as the rest of the theme, via `ColorDecomposer.generateTxtOn`.
- **border:** stop copying the surface and use surface darkened with `darkenHex` and the constant above.

### Previous code (removed)

```js
        if (typeof activeOverride === 'string') {
          surface[state] = this.formatColorValue(activeOverride);
          txtOn[state] = this.formatColorValue('#FFFFFF');
          border[state] = this.formatColorValue(activeOverride);
        }
```

### New code (current)

```js
        if (typeof activeOverride === 'string') {
          const surfaceHex = activeOverride;
          surface[state] = this.formatColorValue(surfaceHex);
          txtOn[state] = this.formatColorValue(this.decomposer.generateTxtOn(surfaceHex));
          border[state] = this.formatColorValue(darkenHex(surfaceHex, ThemeGenerator.ACTIVE_BORDER_DARKEN_AMOUNT));
        }
```

Summary:

| Line (approx.) | What it does |
|----------------|--------------|
| `const surfaceHex = activeOverride` | Stores the hex in a variable for use in txtOn and border. |
| `surface[state] = ... surfaceHex` | Same effect as before (surface = hex). |
| `txtOn[state] = ... this.decomposer.generateTxtOn(surfaceHex)` | **Change:** txtOn is now computed by contrast (black or white) according to accessibility config. |
| `border[state] = ... darkenHex(surfaceHex, ...)` | **Change:** border is now darkened surface (e.g. 20%). |

The comment for `generateBehaviorBlock` was also updated (around lines 609–611) to describe this behavior when the override is a string (txtOn by WCAG, border derived from surface).

---

## 6. Required dependencies

For the new behavior to work:

1. **`this.decomposer`**
   - Already exists on `ThemeGenerator`: it is an instance of `ColorDecomposer` created in the constructor (around line 214).
   - The theme (and generator) config defines `options.accessibilityLevel` (e.g. `'AA'`) and the decomposer uses it in `generateTxtOn`.

2. **`ColorDecomposer.generateTxtOn(surfaceHex)`**
   - In `dynamic-themes/scripts/color-decomposer.mjs` (method `generateHighContrastTxtOn` around lines 314–317).
   - Behavior: computes contrast of `surfaceHex` with `#000000` and `#FFFFFF`; uses `this.requiredRatio` (AA 4.5:1 or AAA 7:1); returns `#000000` if black passes, otherwise `#ffffff`.

3. **`hexToRgb`**
   - Already existed in `theme-generator.mjs` (lines 58–65). `darkenHex` only uses `hexToRgb` and `rgbToHex`; it does not use `relativeLuminance` or `contrastRatio` in the theme-generator (contrast is handled in the decomposer).

---

## 7. Checklist for applying in the project (or replicating)

- [ ] **File:** `dynamic-themes/scripts/theme-generator.mjs` (or the script that generates the "active" behavior block in your project).
- [ ] **Helpers:** Add `rgbToHex(r, g, b)` and `darkenHex(hex, amount)` after `hexToRgb` (lines ~67–91 in our file).
- [ ] **Constant (optional):** Add `static ACTIVE_BORDER_DARKEN_AMOUNT = 0.2` on the class, before `generateBehaviorBlock` (lines ~601–606).
- [ ] **generateBehaviorBlock:** In the branch `if (typeof activeOverride === 'string')`:
  - [ ] Store `activeOverride` in `surfaceHex`.
  - [ ] surface: `this.formatColorValue(surfaceHex)` (as before).
  - [ ] txtOn: `this.formatColorValue(this.decomposer.generateTxtOn(surfaceHex))` (replace fixed `'#FFFFFF'` with this).
  - [ ] border: `this.formatColorValue(darkenHex(surfaceHex, 0.2))` (or `ThemeGenerator.ACTIVE_BORDER_DARKEN_AMOUNT` if using the constant).
- [ ] **Ensure:** the generator has access to a decomposer (or equivalent) with `generateTxtOn(surfaceHex)` that respects the config accessibility level (AA/AAA).

With this, the string override in `overrides.interface.function.active` produces surface, accessible txtOn, and derived border in the same script at the indicated lines.
