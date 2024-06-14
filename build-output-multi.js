import { registerTransforms, permutateThemes } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { promises } from 'fs';

registerTransforms(StyleDictionary, {
  /* options here if needed */
});

async function run() {
  const $themes = JSON.parse(await promises.readFile('data/aplica-theme-sd/default/$themes.json', 'utf-8'));
  const themes = permutateThemes($themes, { separator: '_' });
  const configs = Object.entries(themes).map(([name, tokensets]) => ({
    source: tokensets.map(tokenset => `${tokenset}.json`),
    preprocessors: ['tokens-studio'], // <-- since 0.16.0 this must be explicit
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        files: [
          {
            destination: `dist/vars-${name}.css`,
            format: 'css/variables',
          },
        ],
      },
    },
  }));

  async function cleanAndBuild(cfg) {
    const sd = new StyleDictionary(cfg);
    await sd.cleanAllPlatforms(); // optionally, cleanup files first..
    await sd.buildAllPlatforms();
  }
  await Promise.all(configs.map(cleanAndBuild));
}

run();