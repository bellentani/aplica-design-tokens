#!/usr/bin/env node
/**
 * Builds _color-palette.mode.{light|dark}.brand (first, second, third)
 * from data/aplica-theme/brand/aplica_joy/_primitive_theme.json
 * and merges into tokens-aplica-default.json (removes _helper-color-scheme).
 *
 * Mapping: joy_pink → first, joy_blue → second, joy_purple → third.
 * Format: $type/$value → type/value.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const JOY_PRIMITIVE = path.join(ROOT, 'data/aplica-theme/brand/aplica_joy/_primitive_theme.json');
const DEFAULT_PATH = path.join(ROOT, 'data/tokens-aplica-default.json');

const BRAND_KEYS = ['first', 'second', 'third'];
const JOY_KEYS = ['joy_pink', 'joy_blue', 'joy_purple'];

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

function extractPaletteFlat(joyBrand) {
  const surface = joyBrand?.palette?.surface;
  if (!surface) return {};
  const out = {};
  for (const [k, v] of Object.entries(surface)) {
    out[k] = dtcgToToken(v);
  }
  return out;
}

function extractNeutralsFlat(joyBrand) {
  const surface = joyBrand?.neutrals?.surface;
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

function buildBrandFromJoy(joyBrand) {
  const palette = extractPaletteFlat(joyBrand);
  const neutrals = extractNeutralsFlat(joyBrand);
  return {
    palette,
    neutrals,
    behavior: null
  };
}

function buildModeBrand(primitiveMode, modeName) {
  const brand = {};
  for (let i = 0; i < BRAND_KEYS.length; i++) {
    const brandKey = BRAND_KEYS[i];
    const joyKey = JOY_KEYS[i];
    const joyBrand = primitiveMode?.[joyKey];
    const b = buildBrandFromJoy(joyBrand);
    const refPrefix = `_color-palette.mode.${modeName}.brand.${brandKey}`;
    b.behavior = buildBehavior(refPrefix);
    brand[brandKey] = b;
  }
  return brand;
}

const primitive = JSON.parse(fs.readFileSync(JOY_PRIMITIVE, 'utf8'));
const cp = primitive._color_palette;
const primitiveLight = cp?.mode?.light;
const primitiveDark = cp?.mode?.dark;

const newLightBrand = buildModeBrand(primitiveLight, 'light');
const newDarkBrand = buildModeBrand(primitiveDark, 'dark');

const defaultContent = JSON.parse(fs.readFileSync(DEFAULT_PATH, 'utf8'));

delete defaultContent['_helper-color-scheme'];

if (!defaultContent['_color-palette']) defaultContent['_color-palette'] = { mode: {} };
if (!defaultContent['_color-palette'].mode) defaultContent['_color-palette'].mode = {};
if (!defaultContent['_color-palette'].mode.light) defaultContent['_color-palette'].mode.light = {};
if (!defaultContent['_color-palette'].mode.dark) defaultContent['_color-palette'].mode.dark = {};

defaultContent['_color-palette'].mode.light.brand = newLightBrand;
defaultContent['_color-palette'].mode.dark.brand = newDarkBrand;

fs.writeFileSync(DEFAULT_PATH, JSON.stringify(defaultContent, null, 2), 'utf8');
console.log('Updated', DEFAULT_PATH, '- _color-palette.mode.light.brand, mode.dark.brand from aplica_joy; removed _helper-color-scheme.');
