import { createTheme } from '@mui/material/styles';
import PTSansWoff2 from 'assets/fonts/ptsans.woff2';
import PTSansWoff from 'assets/fonts/ptsans.woff';

export const theme = createTheme({
  palette: {
    background: {
      default: '#1f1f1f',
    },
    primary: {
      light: '#272727',
      main: '#1f1f1f',
      dark: '#141414',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto',
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
  },
});
