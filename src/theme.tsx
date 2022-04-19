import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

const theme: ThemeConfig = extendTheme({
  colors: {
    black: "#16161D",
  },
  fonts,
  breakpoints,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export default theme;
