// import original module declarations
import 'styled-components';

import { Theme } from './theme';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Theme['colors'],
    fonts: Theme['fonts'],
    fontWeights: Theme['fontWeights'],
    sizes: Theme['sizes']
  }
}
