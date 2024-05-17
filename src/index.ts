import ColorJS from 'colorjs.io';
import fs from 'fs';
import { ColorsList, ThemeDefault } from './types';

// nome do tema no arquivo gerado
const THEME_NAME = 'padrao'; // nome do tema no arquivo gerado

const WRITE_FILE = true; // alterar para não gerar arquivo toda hora em modo dev

const colorWhite = '#FFFFFF';

const mixColor = (color1: ColorJS, color2: ColorJS, amount: number) => {
  const newColor = new ColorJS(color1);
  newColor.mix(color2, amount);
  return newColor.to("srgb").toString({ format: "hex" });
}

const themeDefault: ThemeDefault = {
  light: {
    brand: {
      first: {
        value: new ColorJS('#FE1B6A'),
        neutral: new ColorJS('#2A0E18')
      },
      second: {
        value: new ColorJS('#2D9FE1'),
        neutral: new ColorJS('#111D25')
      },
      third: {
        value: new ColorJS('#955EA6'),
        neutral: new ColorJS('#1C171E')
      }
    },
    interface: {
      function: {
        primary: "#C40145",
        secondary: "#1872A6",
        link: "#0026D1",
      },
      feedback: {
        info: "#00B8F0",
        success: "#008A1E",
        warning: "#F6AC3C",
        danger: "#DF0707",
      }
    }
  },
  dark: {
    brand: {
      first: {
        value: new ColorJS('#FE1B6A'),
        neutral: new ColorJS('#F3DDE5')
      },
      second: {
        value: new ColorJS('#2D9FE1'),
        neutral: new ColorJS('#D5ECF9')
      },
      third: {
        value: new ColorJS('#955EA6'),
        neutral: new ColorJS('#EADFED')
      }
    },
    interface: {
      function: {
        primary: mixColor(new ColorJS("#C40145"),new ColorJS('#000'), 0.3),
        secondary: mixColor(new ColorJS("#1872A6"),new ColorJS('#000'), 0.2),
        link: mixColor(new ColorJS("#0026D1"),new ColorJS('#000'), 0.2),
      },
      feedback: {
        info: mixColor(new ColorJS("#00B8F0"),new ColorJS('#000'), 0.2),
        success: mixColor(new ColorJS("#008A1E"),new ColorJS('#000'), 0.2),
        warning: mixColor(new ColorJS("#F6AC3C"),new ColorJS('#000'), 0.2),
        danger: mixColor(new ColorJS("#DF0707"),new ColorJS('#000'), 0.2),
      }
    }
  }
}

const themeTangerine = {
  light: {
    first: {
      value: new ColorJS('#FF8719'),
      neutral: new ColorJS('#291B0E')
    },
    second: {
      value: new ColorJS('#005AE1'),
      neutral: new ColorJS('#00122D')
    },
    third: {
      value: new ColorJS('#8d2251'),
      neutral: new ColorJS('#8d2251')
    }
  },
  dark: {
    first: {
      value: new ColorJS('#FE8719'),
      neutral: new ColorJS('#F3E7DD')
    },
    second: {
      value: new ColorJS('#005AE1'),
      neutral: new ColorJS('#C6DDFF')
    },
    third: {
      value: new ColorJS('#8d2251'),
      neutral: new ColorJS('#E8D3DC')
    }
  }
}

//  só alterar para o tema desejado e rodar o script
const themeChoosed = themeDefault;

function toDarken(color: ColorJS, amount: number) {
  const newColor = new ColorJS(color);
  newColor.darken(amount);
  return newColor.toString({ format: "hex" });
}
function toLighten(color: ColorJS, amount: number) {
  const newColor = new ColorJS(color);
  newColor.lighten(amount);
  return newColor.toString({ format: "hex" });
}

const fixAmount = (amount: number) => Number(parseFloat(amount.toFixed(2)));

const validateContrast = (color: ColorJS, baseColor: ColorJS, fun: typeof toDarken | typeof toLighten, amount: number, testDarker = false): any => {
  const colorTest = new ColorJS(fun(color, amount));
  let contrast = baseColor.contrastWCAG21(colorTest);

  if (contrast > 4.5) {
    return colorTest.toString({ format: "hex" });
  }

  if (colorTest.equals(new ColorJS('#000'))) {
    return validateContrast(color, new ColorJS('#FFF'), fun, fixAmount(amount + 0.1));
  }
  if (colorTest.equals(new ColorJS('#FFF'))) {
    return validateContrast(color, new ColorJS('#000'), fun, fixAmount(amount - 0.1));
  }
  if (fun === toDarken) {
    return validateContrast(color, colorTest, fun, fixAmount(amount + 0.1));
  }
  return validateContrast(color, colorTest, fun, fixAmount(amount - 0.1));
}

const gerarCoresClaras = (color: ColorJS, keys?: number[]) => {
  const colorParsed: {[index: number]: any} = {}; // Initialize the constant with an empty object
  let counter = 100;
  const newColor = new ColorJS(color);
  newColor.steps("white", {
    space: "lch",
    outputSpace: "srgb",
    steps: 101 // min number of steps
  }).map(c => {
    if (keys) {
      if (keys.includes(counter)) {
        colorParsed[counter] = c.toString({ format: "hex" });
      }
    } else {
      if (counter % 10 === 0 && counter > 0) {
        colorParsed[counter] = c.toString({ format: "hex" });
      }
    }
    --counter;
  });
  return colorParsed;
}

const generateNeutralColors = (neutral: ColorJS) => {
  const neutralKeys = () => {
    const lista = [96,92,85,77,69,62,54,46,38,31,23,15,8];
    return lista.map((item) => {
      return 100 - item;
    });
  }
  const neutralLightenColors = gerarCoresClaras(neutral, neutralKeys());
  const neutralLightenKeys = [5,10,20,30,40,50,60,70,80,90,100,110,120,130];
  let neutralLightenCounter = 0;
  const neutralColors : {[index: number]: string}= {};
  for (const key in neutralLightenColors) {
    neutralColors[neutralLightenKeys[neutralLightenCounter]] = neutralLightenColors[key];
    neutralLightenCounter++;
  }
  return neutralColors;
}

const interfaceLight = (interfaceLight: any) => {
  const functionKeys = Object.keys(interfaceLight.function);
  const feedbackKeys = Object.keys(interfaceLight.feedback);
  const functionColors: { [index: string]: any } = {};
  const feedbackColors: { [index: string]: any } = {};

  for (const key of functionKeys) {
    const color = new ColorJS(interfaceLight.function[key]);

    const colorHex = color.toString({ format: "hex" });

    const colorLighten = gerarCoresClaras(color);

    const colorNeutral = generateNeutralColors(color);
    const colorNeutralHex = toDarken(color, 0.8);

    functionColors[key] = {
      palette: {
        surface: {
          10: { type: 'color', value: colorLighten[10] },
          20: { type: 'color', value: colorLighten[20] },
          30: { type: 'color', value: colorLighten[30] },
          40: { type: 'color', value: colorLighten[40] },
          50: { type: 'color', value: colorLighten[50] },
          60: { type: 'color', value: colorLighten[60] },
          70: { type: 'color', value: colorLighten[70] },
          80: { type: 'color', value: colorLighten[80] },
          90: { type: 'color', value: colorLighten[90] },
          100: { type: 'color', value: colorHex },
          110: { type: 'color', value: toDarken(color, 0.1) },
          120: { type: 'color', value: toDarken(color, 0.2) },
          130: { type: 'color', value: toDarken(color, 0.3) },
          140: { type: 'color', value: toDarken(color, 0.4) },
          150: { type: 'color', value: toDarken(color, 0.5) },
          160: { type: 'color', value: toDarken(color, 0.6) },
          170: { type: 'color', value: toDarken(color, 0.7) },
          180: { type: 'color', value: toDarken(color, 0.8) },
          190: { type: 'color', value: toDarken(color, 0.9) },
        },
        txtOn: {
          10: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          20: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          30: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          40: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          50: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          60: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          70: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          80: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          90: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          100: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) }, // TODO
          110: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) }, // TODO
          120: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) }, // TODO
          130: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          140: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          150: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          160: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          170: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          180: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          190: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
        }
      },
      neutrals: {
        surface: {
          5: { type: 'color', value: colorNeutral[5] },
          10: { type: 'color', value: colorNeutral[10] },
          20: { type: 'color', value: colorNeutral[20] },
          30: { type: 'color', value: colorNeutral[30] },
          40: { type: 'color', value: colorNeutral[40] },
          50: { type: 'color', value: colorNeutral[50] },
          60: { type: 'color', value: colorNeutral[60] },
          70: { type: 'color', value: colorNeutral[70] },
          80: { type: 'color', value: colorNeutral[80] },
          90: { type: 'color', value: colorNeutral[90] },
          100: { type: 'color', value: colorNeutral[100] },
          110: { type: 'color', value: colorNeutral[110] },
          120: { type: 'color', value: colorNeutral[120] },
          130: { type: 'color', value: colorNeutralHex },
          140: { type: 'color', value: toDarken(new ColorJS(colorNeutralHex), 0.5) }
        },
        txtOn: {
          5: { type: 'color', value: colorNeutralHex },
          10: { type: 'color', value: colorNeutralHex },
          20: { type: 'color', value: colorNeutralHex },
          30: { type: 'color', value: colorNeutralHex },
          40: { type: 'color', value: colorNeutralHex },
          50: { type: 'color', value: colorNeutralHex },
          60: { type: 'color', value: colorNeutralHex },
          70: { type: 'color', value: colorWhite },
          80: { type: 'color', value: colorNeutral[5] },
          90: { type: 'color', value: colorNeutral[10] },
          100: { type: 'color', value: colorNeutral[10] },
          110: { type: 'color', value: colorNeutral[10] },
          120: { type: 'color', value: colorNeutral[10] },
          130: { type: 'color', value: colorNeutral[10] },
          140: { type: 'color', value: colorNeutral[10] }
        }
      },
      behavior: {
        surface: {
          darkest: { type: 'color', value: toDarken(color, 0.8) },
          action: { type: 'color', value: toDarken(color, 0.3) },
          normal: { type: 'color', value: colorHex },
          active: { type: 'color', value: colorLighten[60] },
          lightest: { type: 'color', value: colorLighten[10] },
        },
        txtOn: {
          darkest: { type: 'color', value: validateContrast(color, color, toLighten, 0.9) },
          action: { type: 'color', value: validateContrast(color, color, toLighten, 0.9) },
          normal: { type: 'color', value: validateContrast(color, color, toDarken, 0.9) },
          active: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          lightest: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
        }
      }
    }
  }

  for (const key of feedbackKeys) {
    const color = new ColorJS(interfaceLight.feedback[key]);

    const colorHex = color.toString({ format: "hex" });

    const colorLighten = gerarCoresClaras(color);

    const colorNeutral = generateNeutralColors(color);
    const colorNeutralHex = toDarken(color, 0.8);

    feedbackColors[key] = {
      palette: {
        surface: {
          10: { type: 'color', value: colorLighten[10] },
          20: { type: 'color', value: colorLighten[20] },
          30: { type: 'color', value: colorLighten[30] },
          40: { type: 'color', value: colorLighten[40] },
          50: { type: 'color', value: colorLighten[50] },
          60: { type: 'color', value: colorLighten[60] },
          70: { type: 'color', value: colorLighten[70] },
          80: { type: 'color', value: colorLighten[80] },
          90: { type: 'color', value: colorLighten[90] },
          100: { type: 'color', value: colorHex },
          110: { type: 'color', value: toDarken(color, 0.1) },
          120: { type: 'color', value: toDarken(color, 0.2) },
          130: { type: 'color', value: toDarken(color, 0.3) },
          140: { type: 'color', value: toDarken(color, 0.4) },
          150: { type: 'color', value: toDarken(color, 0.5) },
          160: { type: 'color', value: toDarken(color, 0.6) },
          170: { type: 'color', value: toDarken(color, 0.7) },
          180: { type: 'color', value: toDarken(color, 0.8) },
          190: { type: 'color', value: toDarken(color, 0.9) },
        },
        txtOn: {
          10: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          20: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          30: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          40: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          50: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          60: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          70: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          80: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          90: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          100: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) }, // TODO
          110: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) }, // TODO
          120: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) }, // TODO
          130: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          140: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          150: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          160: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          170: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          180: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          190: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
        }
      },
      neutrals: {
        surface: {
          5: { type: 'color', value: colorNeutral[5] },
          10: { type: 'color', value: colorNeutral[10] },
          20: { type: 'color', value: colorNeutral[20] },
          30: { type: 'color', value: colorNeutral[30] },
          40: { type: 'color', value: colorNeutral[40] },
          50: { type: 'color', value: colorNeutral[50] },
          60: { type: 'color', value: colorNeutral[60] },
          70: { type: 'color', value: colorNeutral[70] },
          80: { type: 'color', value: colorNeutral[80] },
          90: { type: 'color', value: colorNeutral[90] },
          100: { type: 'color', value: colorNeutral[100] },
          110: { type: 'color', value: colorNeutral[110] },
          120: { type: 'color', value: colorNeutral[120] },
          130: { type: 'color', value: colorNeutralHex },
          140: { type: 'color', value: toDarken(new ColorJS(colorNeutralHex), 0.5) }
        },
        txtOn: {
          5: { type: 'color', value: colorNeutralHex },
          10: { type: 'color', value: colorNeutralHex },
          20: { type: 'color', value: colorNeutralHex },
          30: { type: 'color', value: colorNeutralHex },
          40: { type: 'color', value: colorNeutralHex },
          50: { type: 'color', value: colorNeutralHex },
          60: { type: 'color', value: colorNeutralHex },
          70: { type: 'color', value: colorWhite },
          80: { type: 'color', value: colorNeutral[5] },
          90: { type: 'color', value: colorNeutral[10] },
          100: { type: 'color', value: colorNeutral[10] },
          110: { type: 'color', value: colorNeutral[10] },
          120: { type: 'color', value: colorNeutral[10] },
          130: { type: 'color', value: colorNeutral[10] },
          140: { type: 'color', value: colorNeutral[10] }
        }
      },
      behavior: {
        surface: {
          darkest: { type: 'color', value: toDarken(color, 0.8) },
          action: { type: 'color', value: toDarken(color, 0.3) },
          normal: { type: 'color', value: colorHex },
          active: { type: 'color', value: colorLighten[60] },
          lightest: { type: 'color', value: colorLighten[10] },
        },
        txtOn: {
          darkest: { type: 'color', value: validateContrast(color, color, toLighten, 0.9) },
          action: { type: 'color', value: validateContrast(color, color, toLighten, 0.9) },
          normal: { type: 'color', value: validateContrast(color, color, toDarken, 0.9) },
          active: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          lightest: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
        }
      }
    }
  }

  return {
    function: functionColors,
    feedback: feedbackColors
  };
}

const paletteLight = (colorsLight: ColorsList): any => {
  const palettes: { [char: string]: any } = {};

  for (const key in colorsLight) {

    type chave = keyof typeof colorsLight;

    const { value, neutral } : { value: ColorJS, neutral: ColorJS } = colorsLight[key as chave];

    const colorHex = value.toString({ format: "hex" });
    const neutralHex = neutral.toString({ format: "hex" });

    const colorLighten = gerarCoresClaras(value);
    
    const neutralColors = generateNeutralColors(neutral);

    const valor = {
      palette: {
        surface: {
          10: { type: 'color', value: colorLighten[10] },
          20: { type: 'color', value: colorLighten[20] },
          30: { type: 'color', value: colorLighten[30] },
          40: { type: 'color', value: colorLighten[40] },
          50: { type: 'color', value: colorLighten[50] },
          60: { type: 'color', value: colorLighten[60] },
          70: { type: 'color', value: colorLighten[70] },
          80: { type: 'color', value: colorLighten[80] },
          90: { type: 'color', value: colorLighten[90] },
          100: { type: 'color', value: colorHex },
          110: { type: 'color', value: toDarken(value, 0.1) },
          120: { type: 'color', value: toDarken(value, 0.2) },
          130: { type: 'color', value: toDarken(value, 0.3) },
          140: { type: 'color', value: toDarken(value, 0.4) },
          150: { type: 'color', value: toDarken(value, 0.5) },
          160: { type: 'color', value: toDarken(value, 0.6) },
          170: { type: 'color', value: toDarken(value, 0.7) },
          180: { type: 'color', value: toDarken(value, 0.8) },
          190: { type: 'color', value: toDarken(value, 0.9) },
        },
        txtOn: {
          10: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) },
          20: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) },
          30: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) },
          40: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) },
          50: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) },
          60: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) },
          70: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) },
          80: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) },
          90: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) },
          100: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) }, // TODO
          110: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) }, // TODO
          120: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) }, // TODO
          130: { type: 'color', value: validateContrast(value, value, toLighten, 0.1) },
          140: { type: 'color', value: validateContrast(value, value, toLighten, 0.1) },
          150: { type: 'color', value: validateContrast(value, value, toLighten, 0.1) },
          160: { type: 'color', value: validateContrast(value, value, toLighten, 0.1) },
          170: { type: 'color', value: validateContrast(value, value, toLighten, 0.1) },
          180: { type: 'color', value: validateContrast(value, value, toLighten, 0.1) },
          190: { type: 'color', value: validateContrast(value, value, toLighten, 0.1) },
        }
      },
      neutrals: {
        surface: {
          5: { type: 'color', value: neutralColors[5] },
          10: { type: 'color', value: neutralColors[10] },
          20: { type: 'color', value: neutralColors[20] },
          30: { type: 'color', value: neutralColors[30] },
          40: { type: 'color', value: neutralColors[40] },
          50: { type: 'color', value: neutralColors[50] },
          60: { type: 'color', value: neutralColors[60] },
          70: { type: 'color', value: neutralColors[70] },
          80: { type: 'color', value: neutralColors[80] },
          90: { type: 'color', value: neutralColors[90] },
          100: { type: 'color', value: neutralColors[100] },
          110: { type: 'color', value: neutralColors[110] },
          120: { type: 'color', value: neutralColors[120] },
          130: { type: 'color', value: neutralHex },
          140: { type: 'color', value: toDarken(neutral, 0.5) }
        },
        txtOn: {
          5: { type: 'color', value: neutralHex },
          10: { type: 'color', value: neutralHex },
          20: { type: 'color', value: neutralHex },
          30: { type: 'color', value: neutralHex },
          40: { type: 'color', value: neutralHex },
          50: { type: 'color', value: neutralHex },
          60: { type: 'color', value: neutralHex },
          70: { type: 'color', value: colorWhite },
          80: { type: 'color', value: neutralColors[5] },
          90: { type: 'color', value: neutralColors[10] },
          100: { type: 'color', value: neutralColors[10] },
          110: { type: 'color', value: neutralColors[10] },
          120: { type: 'color', value: neutralColors[10] },
          130: { type: 'color', value: neutralColors[10] },
          140: { type: 'color', value: neutralColors[10] }
        }
      },
      behavior: {
        surface: {
          darkest: { type: 'color', value: toDarken(value, 0.8) },
          action: { type: 'color', value: toDarken(value, 0.3) },
          normal: { type: 'color', value: colorHex },
          active: { type: 'color', value: colorLighten[60] },
          lightest: { type: 'color', value: colorLighten[10] },
        },
        txtOn: {
          darkest: { type: 'color', value: validateContrast(value, value, toLighten, 0.9) },
          action: { type: 'color', value: validateContrast(value, value, toLighten, 0.9) },
          normal: { type: 'color', value: validateContrast(value, value, toDarken, 0.9) },
          active: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) },
          lightest: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) },
        }
      }
    }
    palettes[key] = valor;
  }
  return {
    brand: palettes,
  };
}

const interfaceDark = (interfaceLight: any) => {
  const functionKeys = Object.keys(interfaceLight.function);
  const feedbackKeys = Object.keys(interfaceLight.feedback);
  const functionColors: { [index: string]: any } = {};
  const feedbackColors: { [index: string]: any } = {};

  for (const key of functionKeys) {
    const color = new ColorJS(interfaceLight.function[key]);

    const colorHex = color.toString({ format: "hex" });

    const colorLighten = gerarCoresClaras(color);

    const colorNeutral = generateNeutralColors(color);
    const colorNeutralHex = toDarken(color, 0.8);

    functionColors[key] = {
      palette: {
        surface: {
          10: { type: 'color', value: colorLighten[10] },
          20: { type: 'color', value: colorLighten[20] },
          30: { type: 'color', value: colorLighten[30] },
          40: { type: 'color', value: colorLighten[40] },
          50: { type: 'color', value: colorLighten[50] },
          60: { type: 'color', value: colorLighten[60] },
          70: { type: 'color', value: colorLighten[70] },
          80: { type: 'color', value: colorLighten[80] },
          90: { type: 'color', value: colorLighten[90] },
          100: { type: 'color', value: colorHex },
          110: { type: 'color', value: toDarken(color, 0.1) },
          120: { type: 'color', value: toDarken(color, 0.2) },
          130: { type: 'color', value: toDarken(color, 0.3) },
          140: { type: 'color', value: toDarken(color, 0.4) },
          150: { type: 'color', value: toDarken(color, 0.5) },
          160: { type: 'color', value: toDarken(color, 0.6) },
          170: { type: 'color', value: toDarken(color, 0.7) },
          180: { type: 'color', value: toDarken(color, 0.8) },
          190: { type: 'color', value: toDarken(color, 0.9) },
        },
        txtOn: {
          10: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          20: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          30: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          40: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          50: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          60: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          70: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          80: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          90: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          100: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) }, // TODO
          110: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) }, // TODO
          120: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) }, // TODO
          130: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          140: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          150: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          160: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          170: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          180: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          190: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
        }
      },
      neutrals: {
        surface: {
          5: { type: 'color', value: colorNeutral[5] },
          10: { type: 'color', value: colorNeutral[10] },
          20: { type: 'color', value: colorNeutral[20] },
          30: { type: 'color', value: colorNeutral[30] },
          40: { type: 'color', value: colorNeutral[40] },
          50: { type: 'color', value: colorNeutral[50] },
          60: { type: 'color', value: colorNeutral[60] },
          70: { type: 'color', value: colorNeutral[70] },
          80: { type: 'color', value: colorNeutral[80] },
          90: { type: 'color', value: colorNeutral[90] },
          100: { type: 'color', value: colorNeutral[100] },
          110: { type: 'color', value: colorNeutral[110] },
          120: { type: 'color', value: colorNeutral[120] },
          130: { type: 'color', value: colorNeutralHex },
          140: { type: 'color', value: toDarken(new ColorJS(colorNeutralHex), 0.5) }
        },
        txtOn: {
          5: { type: 'color', value: colorNeutralHex },
          10: { type: 'color', value: colorNeutralHex },
          20: { type: 'color', value: colorNeutralHex },
          30: { type: 'color', value: colorNeutralHex },
          40: { type: 'color', value: colorNeutralHex },
          50: { type: 'color', value: colorNeutralHex },
          60: { type: 'color', value: colorNeutralHex },
          70: { type: 'color', value: colorWhite },
          80: { type: 'color', value: colorNeutral[5] },
          90: { type: 'color', value: colorNeutral[10] },
          100: { type: 'color', value: colorNeutral[10] },
          110: { type: 'color', value: colorNeutral[10] },
          120: { type: 'color', value: colorNeutral[10] },
          130: { type: 'color', value: colorNeutral[10] },
          140: { type: 'color', value: colorNeutral[10] }
        }
      },
      behavior: {
        surface: {
          darkest: { type: 'color', value: toDarken(color, 0.8) },
          action: { type: 'color', value: toDarken(color, 0.3) },
          normal: { type: 'color', value: colorHex },
          active: { type: 'color', value: colorLighten[60] },
          lightest: { type: 'color', value: colorLighten[10] },
        },
        txtOn: {
          darkest: { type: 'color', value: validateContrast(color, color, toLighten, 0.9) },
          action: { type: 'color', value: validateContrast(color, color, toLighten, 0.9) },
          normal: { type: 'color', value: validateContrast(color, color, toDarken, 0.9) },
          active: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          lightest: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
        }
      }
    }
  }

  for (const key of feedbackKeys) {
    const color = new ColorJS(interfaceLight.feedback[key]);

    const colorHex = color.toString({ format: "hex" });

    const colorLighten = gerarCoresClaras(color);

    const colorNeutral = generateNeutralColors(color);
    const colorNeutralHex = toDarken(color, 0.8);

    feedbackColors[key] = {
      palette: {
        surface: {
          10: { type: 'color', value: colorLighten[10] },
          20: { type: 'color', value: colorLighten[20] },
          30: { type: 'color', value: colorLighten[30] },
          40: { type: 'color', value: colorLighten[40] },
          50: { type: 'color', value: colorLighten[50] },
          60: { type: 'color', value: colorLighten[60] },
          70: { type: 'color', value: colorLighten[70] },
          80: { type: 'color', value: colorLighten[80] },
          90: { type: 'color', value: colorLighten[90] },
          100: { type: 'color', value: colorHex },
          110: { type: 'color', value: toDarken(color, 0.1) },
          120: { type: 'color', value: toDarken(color, 0.2) },
          130: { type: 'color', value: toDarken(color, 0.3) },
          140: { type: 'color', value: toDarken(color, 0.4) },
          150: { type: 'color', value: toDarken(color, 0.5) },
          160: { type: 'color', value: toDarken(color, 0.6) },
          170: { type: 'color', value: toDarken(color, 0.7) },
          180: { type: 'color', value: toDarken(color, 0.8) },
          190: { type: 'color', value: toDarken(color, 0.9) },
        },
        txtOn: {
          10: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          20: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          30: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          40: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          50: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          60: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          70: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          80: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          90: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          100: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) }, // TODO
          110: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) }, // TODO
          120: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) }, // TODO
          130: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          140: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          150: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          160: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          170: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          180: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
          190: { type: 'color', value: validateContrast(color, color, toLighten, 0.1) },
        }
      },
      neutrals: {
        surface: {
          5: { type: 'color', value: colorNeutral[5] },
          10: { type: 'color', value: colorNeutral[10] },
          20: { type: 'color', value: colorNeutral[20] },
          30: { type: 'color', value: colorNeutral[30] },
          40: { type: 'color', value: colorNeutral[40] },
          50: { type: 'color', value: colorNeutral[50] },
          60: { type: 'color', value: colorNeutral[60] },
          70: { type: 'color', value: colorNeutral[70] },
          80: { type: 'color', value: colorNeutral[80] },
          90: { type: 'color', value: colorNeutral[90] },
          100: { type: 'color', value: colorNeutral[100] },
          110: { type: 'color', value: colorNeutral[110] },
          120: { type: 'color', value: colorNeutral[120] },
          130: { type: 'color', value: colorNeutralHex },
          140: { type: 'color', value: toDarken(new ColorJS(colorNeutralHex), 0.5) }
        },
        txtOn: {
          5: { type: 'color', value: colorNeutralHex },
          10: { type: 'color', value: colorNeutralHex },
          20: { type: 'color', value: colorNeutralHex },
          30: { type: 'color', value: colorNeutralHex },
          40: { type: 'color', value: colorNeutralHex },
          50: { type: 'color', value: colorNeutralHex },
          60: { type: 'color', value: colorNeutralHex },
          70: { type: 'color', value: colorWhite },
          80: { type: 'color', value: colorNeutral[5] },
          90: { type: 'color', value: colorNeutral[10] },
          100: { type: 'color', value: colorNeutral[10] },
          110: { type: 'color', value: colorNeutral[10] },
          120: { type: 'color', value: colorNeutral[10] },
          130: { type: 'color', value: colorNeutral[10] },
          140: { type: 'color', value: colorNeutral[10] }
        }
      },
      behavior: {
        surface: {
          darkest: { type: 'color', value: toDarken(color, 0.8) },
          action: { type: 'color', value: toDarken(color, 0.3) },
          normal: { type: 'color', value: colorHex },
          active: { type: 'color', value: colorLighten[60] },
          lightest: { type: 'color', value: colorLighten[10] },
        },
        txtOn: {
          darkest: { type: 'color', value: validateContrast(color, color, toLighten, 0.9) },
          action: { type: 'color', value: validateContrast(color, color, toLighten, 0.9) },
          normal: { type: 'color', value: validateContrast(color, color, toDarken, 0.9) },
          active: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
          lightest: { type: 'color', value: validateContrast(color, color, toDarken, 0.8) },
        }
      }
    }
  }

  return {
    function: functionColors,
    feedback: feedbackColors
  };
}

const paletteDark = (colorsDark: ColorsList): any => {
  const palettes: { [char: string]: any } = {};

  for (const key in colorsDark) {

    type chave = keyof typeof colorsDark;

    const { value, neutral }: { value: ColorJS, neutral: ColorJS } = colorsDark[key as chave];

    const valueHex = value.toString({ format: "hex" });
    const neutralHex = neutral.toString({ format: "hex" });

    const colorLighten = gerarCoresClaras(value);

    const valor = {
      palette: {
        surface: {
          10: { type: 'color', value: toDarken(value, 0.9) },
          20: { type: 'color', value: toDarken(value, 0.8) },
          30: { type: 'color', value: toDarken(value, 0.7) },
          40: { type: 'color', value: toDarken(value, 0.6) },
          50: { type: 'color', value: toDarken(value, 0.5) },
          60: { type: 'color', value: toDarken(value, 0.4) },
          70: { type: 'color', value: toDarken(value, 0.3) },
          80: { type: 'color', value: toDarken(value, 0.2) },
          90: { type: 'color', value: toDarken(value, 0.1) },
          100: { type: 'color', value: valueHex },
          110: { type: 'color', value: colorLighten[90] },
          120: { type: 'color', value: colorLighten[80] },
          130: { type: 'color', value: colorLighten[70] },
          140: { type: 'color', value: colorLighten[60] },
          150: { type: 'color', value: colorLighten[50] },
          160: { type: 'color', value: colorLighten[40] },
          170: { type: 'color', value: colorLighten[30] },
          180: { type: 'color', value: colorLighten[20] },
          190: { type: 'color', value: colorLighten[10] },
        },
        txtOn: {
          10: { type: 'color', value: validateContrast(value, value, toLighten, 0.8) }, // palette.180
          20: { type: 'color', value: validateContrast(value, value, toLighten, 0.8) },
          30: { type: 'color', value: validateContrast(value, value, toLighten, 0.8) },
          40: { type: 'color', value: validateContrast(value, value, toLighten, 0.8) },
          50: { type: 'color', value: validateContrast(value, value, toLighten, 0.8) },
          60: { type: 'color', value: validateContrast(value, value, toLighten, 0.8) },
          70: { type: 'color', value: validateContrast(value, value, toLighten, 0.9) },
          80: { type: 'color', value: validateContrast(value, value, toDarken, 0.8) },
          90: { type: 'color', value: validateContrast(value, value, toDarken, 0.1) },
          100: { type: 'color', value: validateContrast(value, value, toDarken, 0.2) },
          110: { type: 'color', value: validateContrast(value, value, toDarken, 0.2) },
          120: { type: 'color', value: validateContrast(value, value, toDarken, 0.2) },
          130: { type: 'color', value: validateContrast(value, value, toDarken, 0.2) },
          140: { type: 'color', value: validateContrast(value, value, toDarken, 0.2) },
          150: { type: 'color', value: validateContrast(value, value, toDarken, 0.2) },
          160: { type: 'color', value: validateContrast(value, value, toDarken, 0.2) },
          170: { type: 'color', value: validateContrast(value, value, toDarken, 0.2) },
          180: { type: 'color', value: validateContrast(value, value, toDarken, 0.2) },
          190: { type: 'color', value: validateContrast(value, value, toDarken, 0.2) },
        }
      },
      neutrals: {
        surface: {
          5: { type: 'color', value: toDarken(neutral, 0.96) },
          10: { type: 'color', value: toDarken(neutral, 0.92) },
          20: { type: 'color', value: toDarken(neutral, 0.85) },
          30: { type: 'color', value: toDarken(neutral, 0.77) },
          40: { type: 'color', value: toDarken(neutral, 0.69) },
          50: { type: 'color', value: toDarken(neutral, 0.62) },
          60: { type: 'color', value: toDarken(neutral, 0.54) },
          70: { type: 'color', value: toDarken(neutral, 0.46) },
          80: { type: 'color', value: toDarken(neutral, 0.38) },
          90: { type: 'color', value: toDarken(neutral, 0.31) },
          100: { type: 'color', value: toDarken(neutral, 0.23) },
          110: { type: 'color', value: toDarken(neutral, 0.15) },
          120: { type: 'color', value: toDarken(neutral, 0.08) },
          130: { type: 'color', value: neutralHex },
          140: { type: 'color', value: toLighten(neutral, 0.5) }
        },
        txtOn: {
          5: { type: 'color', value: neutralHex },
          10: { type: 'color', value: neutralHex },
          20: { type: 'color', value: neutralHex },
          30: { type: 'color', value: neutralHex },
          40: { type: 'color', value: neutralHex },
          50: { type: 'color', value: neutralHex },
          60: { type: 'color', value: neutralHex },
          70: { type: 'color', value: toLighten(neutral, 0.5) },
          80: { type: 'color', value: toDarken(neutral, 0.92) },
          90: { type: 'color', value: toDarken(neutral, 0.92) },
          100: { type: 'color', value: toDarken(neutral, 0.92) },
          110: { type: 'color', value: toDarken(neutral, 0.92) },
          120: { type: 'color', value: toDarken(neutral, 0.92) },
          130: { type: 'color', value: toDarken(neutral, 0.92) },
          140: { type: 'color', value: toDarken(neutral, 0.92) }
        }
      },
      behavior: {
        surface: {
          darkest: { type: 'color', value: colorLighten[20] },
          action: { type: 'color', value: colorLighten[70] },
          normal: { type: 'color', value: valueHex },
          active: { type: 'color', value: toDarken(value, 0.4) },
          lightest: { type: 'color', value: toDarken(value, 0.9) },
        },
        txtOn: {
          darkest: { type: 'color', value: validateContrast(value, value, toDarken, 0.9) },
          action: { type: 'color', value: validateContrast(value, value, toDarken, 0.9) },
          normal: { type: 'color', value: validateContrast(value, value, toDarken, 0.9) },
          active: { type: 'color', value: validateContrast(value, value, toLighten, 0.8) },
          lightest: { type: 'color', value: validateContrast(value, value, toLighten, 0.8) },
        }
      }
    }

    palettes[key] = valor;
  }
  return {
    brand: palettes
  };
}

const themeFactoryDefault = (theme: ThemeDefault) => {
  const colorsLight = theme.light.brand;
  const colorsDark = theme.dark.brand;

  const light = paletteLight(colorsLight);
  const dark = paletteDark(colorsDark);
  
  const lightInterface = interfaceLight(theme.light.interface);
  const darkInterface = interfaceDark(theme.dark.interface);

  return {
    "_color-palette": {
      mode: {
        light: {
          ...light,
          interface: lightInterface,
        },
        dark: {
          ...dark,
          interface: darkInterface,
        },
      }
    }
  }
};
if (WRITE_FILE) {

  if (!fs.existsSync('./temp')) {
    fs.mkdirSync('./temp');
  }

  fs.writeFileSync(
    `./temp/${+new Date()}_${THEME_NAME || `default`}.json`,
    JSON.stringify(
      themeFactoryDefault(themeChoosed),
      null,
      2
    )
  );

  console.log("Arquivo gerado...")
} else {
  themeFactoryDefault(themeChoosed)
  console.log("rodou...")
}
