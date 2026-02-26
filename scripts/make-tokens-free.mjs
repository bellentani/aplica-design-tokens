#!/usr/bin/env node
/**
 * Generates single-file "tokens-free" JSON per theme × mode × surface.
 * Output: data/aplica-theme-free/tokens-free-{themeName}-{mode}-{surface}.json
 * Merge order Phase 1: _primitive_theme, _grayscale, dimension, _borders, _typography, _gradients, _brand.
 * Merge order Phase 2 (per file): mode, surface, semantic, foundation/engine.
 * Preserves DTCG (W3C) notation ($type, $value) in output.
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
const MODE_DIR = path.join(ROOT, 'data/aplica-theme/mode');
const SURFACE_DIR = path.join(ROOT, 'data/aplica-theme/surface');
const SEMANTIC_DIR = path.join(ROOT, 'data/aplica-theme/semantic');
const FOUNDATION_ENGINE_DIR = path.join(ROOT, 'data/aplica-theme/foundation/engine');

const BASE_PATH_DEFAULT = path.join(ROOT, 'data/tokens-aplica-default.json');
const BASE_PATH_BOILERPLATE = path.join(ROOT, 'data/tokens-aplica-boilerplate.json');

const BRAND_KEYS = ['first', 'second', 'third'];

/** Deep merge source into target (objects merged recursively; arrays/values replaced). */
function deepMerge(target, source) {
  if (source === null || typeof source !== 'object' || Array.isArray(source)) {
    return source;
  }
  for (const [k, v] of Object.entries(source)) {
    if (k.startsWith('$') && k !== '$type' && k !== '$value' && k !== '$description') continue;
    if (target[k] != null && typeof target[k] === 'object' && !Array.isArray(target[k]) && typeof v === 'object' && !Array.isArray(v)) {
      deepMerge(target[k], v);
    } else {
      target[k] = v;
    }
  }
  return target;
}

/** Ensure output uses DTCG notation: copy type -> $type, value -> $value, description -> $description (then remove type/value/description). */
function ensureDtcgNotation(obj) {
  if (obj === null || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    obj.forEach(ensureDtcgNotation);
    return;
  }
  if ('type' in obj && !('$type' in obj)) obj.$type = obj.type;
  if ('value' in obj && !('$value' in obj)) obj.$value = obj.value;
  if ('description' in obj && !('$description' in obj)) obj.$description = obj.description;
  if ('$type' in obj) { delete obj.type; }
  if ('$value' in obj) { delete obj.value; }
  if ('$description' in obj) { delete obj.description; }
  for (const v of Object.values(obj)) {
    if (v != null && typeof v === 'object') ensureDtcgNotation(v);
  }
}

/** Normalize refs: paths under global must be prefixed with global. Supports both .value and .$value. */
function getValueAt(obj, pathStr) {
  const parts = pathStr.split('.');
  let cur = obj;
  for (const part of parts) {
    cur = cur?.[part];
  }
  return cur;
}

function normalizeRefs(content) {
  const replaceRefsInString = (str) => {
    if (typeof str !== 'string' || !str.includes('{')) return str;
    return str.replace(/\{([a-zA-Z0-9_.]+)\}/g, (_, refPath) => {
      if (refPath.startsWith('global.') || refPath.startsWith('_color-palette') || refPath.startsWith('dimension.') || refPath.startsWith('theme.') || refPath.startsWith('mode.') || refPath.startsWith('surface.') || refPath.startsWith('semantic.')) return `{${refPath}}`;
      if (content.global && getValueAt(content.global, refPath) !== undefined) return `{global.${refPath}}`;
      return `{${refPath}}`;
    });
  };

  const walkAndReplace = (obj) => {
    if (obj === null) return;
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      for (const [k, v] of Object.entries(obj)) {
        const val = v?.$value ?? v?.value;
        if (typeof val === 'string') {
          const replaced = replaceRefsInString(val);
          if (v.$value !== undefined) v.$value = replaced;
          else if (v.value !== undefined) v.value = replaced;
        }
        walkAndReplace(v);
      }
    }
  };
  walkAndReplace(content);
}

// --- Phase 1: build from primitive/grayscale/dimension/borders/typography/gradients/_brand (DTCG-preserving where source is DTCG)

function extractPaletteFlat(brandNode) {
  const surface = brandNode?.palette?.surface;
  if (!surface) return {};
  const out = {};
  for (const [k, v] of Object.entries(surface)) {
    out[k] = v && typeof v === 'object' && ('$value' in v || '$type' in v) ? { ...v } : v;
  }
  return out;
}

function extractNeutralsFlat(brandNode) {
  const surface = brandNode?.neutrals?.surface;
  if (!surface) return {};
  const out = {};
  for (const [k, v] of Object.entries(surface)) {
    out[k] = v && typeof v === 'object' && ('$value' in v || '$type' in v) ? { ...v } : v;
  }
  return out;
}

function buildBehavior(refPrefix) {
  return {
    darkest: { $value: `{${refPrefix}.palette.180}`, $type: 'color' },
    action: { $value: `{${refPrefix}.palette.130}`, $type: 'color' },
    default: { $value: `{${refPrefix}.palette.100}`, $type: 'color' },
    active: { $value: `{${refPrefix}.palette.60}`, $type: 'color' },
    lightest: { $value: `{${refPrefix}.palette.10}`, $type: 'color' }
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
  const dim = raw.dimension || raw;
  return JSON.parse(JSON.stringify(dim));
}

function mergePrimitiveTheme(content, themeDir) {
  const p = path.join(themeDir, '_primitive_theme.json');
  if (!fs.existsSync(p)) return;
  const primitive = JSON.parse(fs.readFileSync(p, 'utf8'));
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
    content.global.color.ambient.grayscale[k] = v && typeof v === 'object' ? { ...v } : v;
  }
}

function mergeDimension(content, dimensionData) {
  if (!dimensionData) return;
  content.dimension = JSON.parse(JSON.stringify(dimensionData));
}

function mergeBorders(content, themeDir) {
  const p = path.join(themeDir, '_borders.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const themeBorders = data._theme_borders;
  if (!themeBorders?.radii) return;
  const radii = themeBorders.radii;
  if (!content.global) content.global = {};
  if (!content.global.border) content.global.border = {};
  if (!content.global.border.radii) content.global.border.radii = {};
  for (const [key, token] of Object.entries(radii)) {
    content.global.border.radii[key] = token && typeof token === 'object' ? { ...token } : token;
  }
  content._theme_borders = JSON.parse(JSON.stringify(themeBorders));
}

function mergeTypography(content, themeDir) {
  const p = path.join(themeDir, '_typography.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const themeTypography = data._theme_typography;
  if (!themeTypography) return;
  if (!content.global) content.global = {};
  if (!content.global.text) content.global.text = {};
  if (!content.global.text.fontFamilies) content.global.text.fontFamilies = {};
  const fontFamilies = themeTypography.fontFamilies;
  if (fontFamilies) {
    for (const [name, node] of Object.entries(fontFamilies)) {
      const face = node?.face;
      if (face && typeof face === 'object') {
        content.global.text.fontFamilies[name] = { ...face };
      }
    }
  }
  content._theme_typography = JSON.parse(JSON.stringify(themeTypography));
}

function mergeGradients(content, themeDir) {
  const p = path.join(themeDir, '_gradients.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const config = data._theme_gradients?.config;
  if (!config) return;
  if (!content.global) content.global = {};
  content.global.gradientConfig = { degrees: {}, steps: {} };
  if (config.degrees) {
    for (const [k, v] of Object.entries(config.degrees)) {
      content.global.gradientConfig.degrees[k] = v && typeof v === 'object' ? { ...v } : v;
    }
  }
  if (config.steps) {
    for (const [k, v] of Object.entries(config.steps)) {
      content.global.gradientConfig.steps[k] = v && typeof v === 'object' ? { ...v } : v;
    }
  }
}

function mergeBrandFile(content, themeDir) {
  const p = path.join(themeDir, '_brand.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  if (data.theme) {
    if (!content.theme) content.theme = {};
    deepMerge(content.theme, data.theme);
  }
}

/** Build theme base (Phase 1 only): base without mood + merge order 1–7. */
function buildThemeBase(themeDir, baseContent, dimensionData) {
  const content = JSON.parse(JSON.stringify(baseContent));
  delete content['_helper-color-scheme'];
  if (content.global?.color?.mood) delete content.global.color.mood;

  mergePrimitiveTheme(content, themeDir);
  mergeGrayscale(content, themeDir);
  mergeDimension(content, dimensionData);
  mergeBorders(content, themeDir);
  mergeTypography(content, themeDir);
  mergeGradients(content, themeDir);
  mergeBrandFile(content, themeDir);

  return content;
}

// --- Phase 2: load mode, surface, semantic, foundation (DTCG as-is)

function listJsonNames(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith('.json'))
    .map((d) => path.basename(d.name, '.json'));
}

function loadMode(modeName) {
  const p = path.join(MODE_DIR, `${modeName}.json`);
  if (!fs.existsSync(p)) return null;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  return data.mode ? JSON.parse(JSON.stringify(data.mode)) : null;
}

function loadSurface(surfaceName) {
  const p = path.join(SURFACE_DIR, `${surfaceName}.json`);
  if (!fs.existsSync(p)) return null;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  return data.surface ? JSON.parse(JSON.stringify(data.surface)) : null;
}

function loadSemantic() {
  const defaultPath = path.join(SEMANTIC_DIR, 'default.json');
  if (!fs.existsSync(defaultPath)) return null;
  const data = JSON.parse(fs.readFileSync(defaultPath, 'utf8'));
  return data.semantic ? JSON.parse(JSON.stringify(data.semantic)) : null;
}

function loadFoundationEngine() {
  const out = {};
  const defaultPath = path.join(FOUNDATION_ENGINE_DIR, 'default.json');
  if (fs.existsSync(defaultPath)) {
    const data = JSON.parse(fs.readFileSync(defaultPath, 'utf8'));
    if (data.foundation) deepMerge(out, data.foundation);
  }
  const stylesDir = path.join(FOUNDATION_ENGINE_DIR, 'styles');
  if (fs.existsSync(stylesDir)) {
    const files = fs.readdirSync(stylesDir, { withFileTypes: true }).filter((d) => d.isFile() && d.name.endsWith('.json'));
    for (const f of files) {
      const data = JSON.parse(fs.readFileSync(path.join(stylesDir, f.name), 'utf8'));
      deepMerge(out, data);
    }
  }
  return Object.keys(out).length ? out : null;
}

/** Apply Phase 2 for one (mode, surface) and return content. */
function applyPhase2(themeBase, modeName, surfaceName, semanticData, foundationData) {
  const content = JSON.parse(JSON.stringify(themeBase));
  const modeData = loadMode(modeName);
  if (modeData) content.mode = modeData;
  const surfaceData = loadSurface(surfaceName);
  if (surfaceData) content.surface = surfaceData;
  if (semanticData) content.semantic = semanticData;
  if (foundationData) content.foundation = foundationData;
  normalizeRefs(content);
  ensureDtcgNotation(content);
  return content;
}

function main() {
  if (!fs.existsSync(THEMES_DIR)) {
    console.error('Themes dir not found:', THEMES_DIR);
    process.exit(1);
  }

  // Clean build: clear OUT_DIR first (so base must come from data/, not from OUT_DIR)
  if (fs.existsSync(OUT_DIR)) {
    const entries = fs.readdirSync(OUT_DIR, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(OUT_DIR, e.name);
      if (e.isFile()) fs.unlinkSync(full);
      else if (e.isDirectory()) fs.rmSync(full, { recursive: true });
    }
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let basePath = fs.existsSync(BASE_PATH_DEFAULT) ? BASE_PATH_DEFAULT : BASE_PATH_BOILERPLATE;
  if (!fs.existsSync(basePath)) {
    console.error('Base file not found. Put tokens-aplica-default.json or tokens-aplica-boilerplate.json in data/:', basePath);
    process.exit(1);
  }

  const baseContent = JSON.parse(fs.readFileSync(basePath, 'utf8'));
  const dimensionData = loadDimension();
  if (dimensionData) console.log('Loaded dimension/normal.json');

  const modeNames = listJsonNames(MODE_DIR);
  const surfaceNames = listJsonNames(SURFACE_DIR);
  const semanticData = loadSemantic();
  const foundationData = loadFoundationEngine();

  const dirs = fs.readdirSync(THEMES_DIR, { withFileTypes: true });
  const themeDirs = dirs.filter((d) => d.isDirectory()).map((d) => d.name);

  let generated = 0;
  for (const themeName of themeDirs) {
    const themeDir = path.join(THEMES_DIR, themeName);
    const themeBase = buildThemeBase(themeDir, baseContent, dimensionData);

    for (const modeName of modeNames) {
      for (const surfaceName of surfaceNames) {
        const content = applyPhase2(themeBase, modeName, surfaceName, semanticData, foundationData);
        const outPath = path.join(OUT_DIR, `tokens-free-${themeName}-${modeName}-${surfaceName}.json`);
        fs.writeFileSync(outPath, JSON.stringify(content, null, 2), 'utf8');
        console.log('Generated', outPath);
        generated++;
      }
    }
  }

  console.log('Done.', generated, 'file(s) written.');
}

main();
