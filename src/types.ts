import type Color from 'colorjs.io';

type ColorsList = {
  [index: string]: { value: Color, neutral: Color };
}

export type { ColorsList };