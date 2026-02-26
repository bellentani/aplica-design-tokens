#!/usr/bin/env node
/**
 * Generates single-file "tokens-free" JSON for each theme in data/aplica-theme/brand/
 * that has _primitive_theme.json. Output: data/tokens-free-{theme}.json
 *
 * Run: npm run make tokens-free
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const THEMES_DIR = path.join(ROOT, 'data/aplica-theme/brand');
const BASE_PATH = path.join(ROOT, 'data/tokens-aplica-default.json');
const OUT_DIR = path.join(ROOT, 'data');

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

function buildThemeTokens(themeDir, themeName, baseContent) {
  const primitivePath = path.join(themeDir, '_primitive_theme.json');
  if (!fs.existsSync(primitivePath)) {
    return null;
  }
  const primitive = JSON.parse(fs.readFileSync(primitivePath, 'utf8'));
  const cp = primitive._color_palette;
  const light = cp?.mode?.light;
  const dark = cp?.mode?.dark;

  const lightKeys = getPaletteKeys(light);
  const darkKeys = getPaletteKeys(dark);
  if (lightKeys.length === 0) return null;

  const content = JSON.parse(JSON.stringify(baseContent));
  delete content['_helper-color-scheme'];
  if (!content['_color-palette']) content['_color-palette'] = { mode: {} };
  if (!content['_color-palette'].mode) content['_color-palette'].mode = {};
  if (!content['_color-palette'].mode.light) content['_color-palette'].mode.light = {};
  if (!content['_color-palette'].mode.dark) content['_color-palette'].mode.dark = {};

  content['_color-palette'].mode.light.brand = buildBrandFromPrimitive(
    light,
    'light',
    lightKeys
  );
  content['_color-palette'].mode.dark.brand = buildBrandFromPrimitive(
    dark,
    'dark',
    darkKeys.length ? darkKeys : lightKeys
  );

  return content;
}

function main() {
  if (!fs.existsSync(THEMES_DIR)) {
    console.error('Themes dir not found:', THEMES_DIR);
    process.exit(1);
  }
  if (!fs.existsSync(BASE_PATH)) {
    console.error('Base file not found:', BASE_PATH);
    process.exit(1);
  }

  const baseContent = JSON.parse(fs.readFileSync(BASE_PATH, 'utf8'));
  const dirs = fs.readdirSync(THEMES_DIR, { withFileTypes: true });
  const themeDirs = dirs.filter((d) => d.isDirectory()).map((d) => d.name);

  let generated = 0;
  for (const themeName of themeDirs) {
    const themeDir = path.join(THEMES_DIR, themeName);
    const content = buildThemeTokens(themeDir, themeName, baseContent);
    if (!content) {
      console.log('Skip', themeName, '(no _primitive_theme.json or no palette keys)');
      continue;
    }
    const slug = themeName.replace(/_/g, '-');
    const outPath = path.join(OUT_DIR, `tokens-free-${slug}.json`);
    fs.writeFileSync(outPath, JSON.stringify(content, null, 2), 'utf8');
    console.log('Generated', outPath);
    if (themeName === 'aplica_joy') {
      const defaultPath = path.join(OUT_DIR, 'tokens-aplica-default.json');
      fs.writeFileSync(defaultPath, JSON.stringify(content, null, 2), 'utf8');
      console.log('Updated', defaultPath, '(default = aplica_joy)');
    }
    generated++;
  }

  console.log('Done.', generated, 'theme(s) written.');
}

main();
