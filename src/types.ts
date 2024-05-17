import type Color from 'colorjs.io';

type ColorsList = {
  [K in "first" | "second" | "third"]: { value: Color, neutral: Color };
}

type ThemeDefault = {
  [K in "dark" | "light"]: {
    brand: ColorsList,
    interface?: {
      function: {
        [index: string]: string
      },
      feedback: {
        [index: string]: string
      },
    },
  }
}

export type { ColorsList, ThemeDefault };