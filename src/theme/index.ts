import colors from './colors';
import fonts from './fonts';
import fontWeights from './fontWeights';
import sizes from './sizes';

const theme = {
  colors,
  fonts,
  fontWeights,
  sizes,
} as const;

export type Theme = typeof theme;

export default theme;
