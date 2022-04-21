import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { colors } from './theme/colors';

const fonts = {
  mono: `'Fira Code', ui-monospace, SFMono-Regular`,
  sans: `'Fira code', ui-sans-serif, system-ui`,
  serif: `'Fira Code', ui-serfi, Georgia`,
  body: `'Fira Code', ui-serif, SFMono-Regular`,
};

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});

const theme: ThemeConfig = extendTheme({
  components: {
    Button: {
      baseStyle: {
        background: 'red',
      },
      variants: {
        solid: {
          bg: 'dark.900',
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white',
      },
    },
  },
  colors,
  fonts,
  breakpoints,
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default theme;