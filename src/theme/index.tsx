import { createTheme } from '@mui/material/styles';

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
    fontFamily: 'PT Sans',
    h1: { color: '#fff' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#20212A',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#fff',
          border: '1px solid #ced4da',
          '&:onFocus': {
            border: '1px solid rgba(0, 0, 0, 0.42)',
            color: '#red',
          },
        },
      },
    },
  },
});
