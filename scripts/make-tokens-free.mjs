#!/usr/bin/env node
/**
 * Generates single-file "tokens-free" JSON for each theme in data/aplica-theme/brand/.
 * Output: data/aplica-theme-free/tokens-free-{themeName}.json (themeName = folder name as-is).
 * Merges: _primitive_theme (brand), _grayscale, _typography, _borders, _gradients; injects dimension/normal.json.
 * Run: npm run make:tokens-free
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const THEMES_DIR = path.join(ROOT, 'data/aplica-theme/brand');
const OUT_DIR = path.join(ROOT, 'data/aplica-theme-free');
const DIMENSION_PATH = path.join(ROOT, 'data/aplica-theme/dimension/normal.json');
const BASE_PATH_DEFAULT = path.join(ROOT, 'data/tokens-aplica-default.json');
const BASE_PATH_FREE = path.join(OUT_DIR, 'tokens-aplica-default.json');

const BRAND_KEYS = ['first', 'second', 'third'];

function dtcgToToken(node) {
  if (node && typeof node === 'object' && ('$value' in node || '$type' in node)) {
    const out = {};
    if (node.$type != null) out.type = node.$type;
    if (node.$value != null) out.value = node.$value;
    if (node.$description != null) out.description = node.$description;
    return out;
  }
  return node;
}

/** Recursively convert $type/$value to type/value (for dimension and nested tokens). */
function dtcgToTokenRecursive(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(dtcgToTokenRecursive);
  if ('$value' in obj || '$type' in obj) return dtcgToToken(obj);
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue;
    out[k] = dtcgToTokenRecursive(v);
  }
  return out;
}

function extractPaletteFlat(brandNode) {
  const surface = brandNode?.palette?.surface;
  if (!surface) return {};
  const out = {};
  for (const [k, v] of Object.entries(surface)) {
    out[k] = dtcgToToken(v);
  }
  return out;
}

function extractNeutralsFlat(brandNode) {
  const surface = brandNode?.neutrals?.surface;
  if (!surface) return {};
  const out = {};
  for (const [k, v] of Object.entries(surface)) {
    out[k] = dtcgToToken(v);
  }
  return out;
}

function buildBehavior(refPrefix) {
  return {
    darkest: { value: `{${refPrefix}.palette.180}`, type: 'color' },
    action: { value: `{${refPrefix}.palette.130}`, type: 'color' },
    default: { value: `{${refPrefix}.palette.100}`, type: 'color' },
    active: { value: `{${refPrefix}.palette.60}`, type: 'color' },
    lightest: { value: `{${refPrefix}.palette.10}`, type: 'color' }
  };
}

function getPaletteKeys(modeNode) {
  if (!modeNode || typeof modeNode !== 'object') return [];
  return Object.keys(modeNode).filter(
    (k) => modeNode[k]?.palette?.surface && !k.startsWith('_')
  );
}

function buildBrandFromPrimitive(primitiveMode, modeName, paletteKeyOrder) {
  const brand = {};
  for (let i = 0; i < BRAND_KEYS.length; i++) {
    const brandKey = BRAND_KEYS[i];
    const primitiveKey = paletteKeyOrder[i];
    const primitiveBrand = primitiveMode?.[primitiveKey];
    const palette = extractPaletteFlat(primitiveBrand);
    const neutrals = extractNeutralsFlat(primitiveBrand);
    const refPrefix = `_color-palette.mode.${modeName}.brand.${brandKey}`;
    brand[brandKey] = {
      palette,
      neutrals,
      behavior: buildBehavior(refPrefix)
    };
  }
  return brand;
}

function loadDimension() {
  if (!fs.existsSync(DIMENSION_PATH)) return null;
  const raw = JSON.parse(fs.readFileSync(DIMENSION_PATH, 'utf8'));
  return dtcgToTokenRecursive(raw.dimension || raw);
}

function mergeBorders(content, themeDir) {
  const p = path.join(themeDir, '_borders.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const radii = data._theme_borders?.radii;
  if (!radii) return;
  if (!content.global) content.global = {};
  if (!content.global.border) content.global.border = {};
  if (!content.global.border.radii) content.global.border.radii = {};
  for (const [key, token] of Object.entries(radii)) {
    content.global.border.radii[key] = dtcgToToken(token);
  }
}

function mergeGrayscale(content, themeDir) {
  const p = path.join(themeDir, '_grayscale.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const surface = data._color_palette?.mode?.light?.grayscale?.surface;
  if (!surface) return;
  if (!content.global) content.global = {};
  if (!content.global.color) content.global.color = {};
  if (!content.global.color.ambient) content.global.color.ambient = {};
  content.global.color.ambient.grayscale = {};
  for (const [k, v] of Object.entries(surface)) {
    content.global.color.ambient.grayscale[k] = dtcgToToken(v);
  }
}

function mergeGradients(content, themeDir) {
  const p = path.join(themeDir, '_gradients.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const config = data._theme_gradients?.config;
  if (!config) return;
  if (!content.global) content.global = {};
  content.global.gradientConfig = {
    degrees: {},
    steps: {}
  };
  if (config.degrees) {
    for (const [k, v] of Object.entries(config.degrees)) {
      content.global.gradientConfig.degrees[k] = dtcgToToken(v);
    }
  }
  if (config.steps) {
    for (const [k, v] of Object.entries(config.steps)) {
      content.global.gradientConfig.steps[k] = dtcgToToken(v);
    }
  }
}

function mergeTypography(content, themeDir) {
  const p = path.join(themeDir, '_typography.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const fontFamilies = data._theme_typography?.fontFamilies;
  if (!fontFamilies) return;
  if (!content.global) content.global = {};
  if (!content.global.text) content.global.text = {};
  if (!content.global.text.fontFamilies) content.global.text.fontFamilies = {};
  for (const [name, node] of Object.entries(fontFamilies)) {
    const face = node?.face;
    if (face && (face.$value != null || face.$type != null)) {
      content.global.text.fontFamilies[name] = dtcgToToken(face);
    }
  }
}

function getValueAt(obj, pathStr) {
  const parts = pathStr.split('.');
  let cur = obj;
  for (const part of parts) {
    cur = cur?.[part];
  }
  return cur;
}

/** Normalize refs: paths under global must be prefixed with global. */
function normalizeRefs(content) {
  const replaceRefsInString = (str) => {
    if (typeof str !== 'string' || !str.includes('{')) return str;
    return str.replace(/\{([a-zA-Z0-9_.]+)\}/g, (_, refPath) => {
      if (refPath.startsWith('global.') || refPath.startsWith('_color-palette') || refPath.startsWith('dimension.')) return `{${refPath}}`;
      if (content.global && getValueAt(content.global, refPath) !== undefined) return `{global.${refPath}}`;
      return `{${refPath}}`;
    });
  };

  const walkAndReplace = (obj) => {
    if (obj === null) return;
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      for (const [k, v] of Object.entries(obj)) {
        if (v && typeof v === 'object' && typeof v.value === 'string') {
          v.value = replaceRefsInString(v.value);
        }
        walkAndReplace(v);
      }
    }
  };
  walkAndReplace(content);
}

function buildThemeTokens(themeDir, themeName, baseContent, dimensionConverted) {
  const content = JSON.parse(JSON.stringify(baseContent));
  delete content['_helper-color-scheme'];

  if (dimensionConverted) {
    content.dimension = dimensionConverted;
  }

  const primitivePath = path.join(themeDir, '_primitive_theme.json');
  if (fs.existsSync(primitivePath)) {
    const primitive = JSON.parse(fs.readFileSync(primitivePath, 'utf8'));
    const cp = primitive._color_palette;
    const light = cp?.mode?.light;
    const dark = cp?.mode?.dark;
    const lightKeys = getPaletteKeys(light);
    const darkKeys = getPaletteKeys(dark);
    if (lightKeys.length > 0) {
      if (!content['_color-palette']) content['_color-palette'] = { mode: {} };
      if (!content['_color-palette'].mode) content['_color-palette'].mode = {};
      if (!content['_color-palette'].mode.light) content['_color-palette'].mode.light = {};
      if (!content['_color-palette'].mode.dark) content['_color-palette'].mode.dark = {};
      content['_color-palette'].mode.light.brand = buildBrandFromPrimitive(light, 'light', lightKeys);
      content['_color-palette'].mode.dark.brand = buildBrandFromPrimitive(dark, 'dark', darkKeys.length ? darkKeys : lightKeys);
    }
  }

  mergeBorders(content, themeDir);
  mergeGrayscale(content, themeDir);
  mergeGradients(content, themeDir);
  mergeTypography(content, themeDir);
  normalizeRefs(content);

  return content;
}

function main() {
  if (!fs.existsSync(THEMES_DIR)) {
    console.error('Themes dir not found:', THEMES_DIR);
    process.exit(1);
  }
  const basePath = fs.existsSync(BASE_PATH_FREE) ? BASE_PATH_FREE : BASE_PATH_DEFAULT;
  if (!fs.existsSync(basePath)) {
    console.error('Base file not found. Put tokens-aplica-default.json in data/ or data/aplica-theme-free/:', basePath);
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const baseContent = JSON.parse(fs.readFileSync(basePath, 'utf8'));
  const dimensionConverted = loadDimension();
  if (dimensionConverted) console.log('Loaded dimension/normal.json');

  const dirs = fs.readdirSync(THEMES_DIR, { withFileTypes: true });
  const themeDirs = dirs.filter((d) => d.isDirectory()).map((d) => d.name);

  let generated = 0;
  for (const themeName of themeDirs) {
    const themeDir = path.join(THEMES_DIR, themeName);
    const content = buildThemeTokens(themeDir, themeName, baseContent, dimensionConverted);
    const outPath = path.join(OUT_DIR, `tokens-free-${themeName}.json`);
    fs.writeFileSync(outPath, JSON.stringify(content, null, 2), 'utf8');
    console.log('Generated', outPath);
    if (themeName === 'aplica_joy') {
      const defaultPath = path.join(OUT_DIR, 'tokens-aplica-default.json');
      fs.writeFileSync(defaultPath, JSON.stringify(content, null, 2), 'utf8');
      console.log('Generated', defaultPath, '(default = aplica_joy)');
    }
    generated++;
  }

  console.log('Done.', generated, 'theme(s) written.');
}

main();
