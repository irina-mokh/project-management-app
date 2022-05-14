import PTSansWoff2 from 'assets/fonts/ptsans.woff2';
import PTSansWoff from 'assets/fonts/ptsans.woff';

import { PaletteMode } from '@mui/material';
import { teal, amber } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: 'PT Sans',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'PT Sans';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src:
            url(${PTSansWoff2}) format('woff2'), url(${PTSansWoff}) format('woff');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '0',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          backgroundColor: 'transparent',
          // border: '1',
          boxShadow: 'none',
        },
      },
    },
  },
  palette: {
    primary: teal,
    secondary: amber,
    mode,
    ...(mode === 'light'
      ? {
          type: 'light',
          background: {
            default: '#f1efef',
            paper: '#f9f9f9',
          },
        }
      : {
          type: 'dark',
          background: {
            default: '#1f1f1f',
            paper: '#272727',
          },
        }),
  },
});
