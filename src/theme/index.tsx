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
          '&.Mui-focused': {
            color: '#fff',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#fff',

          backgroundColor: '#282933',

          '-webkit-autofill:focus': {
            transition: 'background-color 600000s 0s, color 600000s 0s',
          },
          '& fieldset': {
            border: 'none',
          },
          '& .MuiInputBase-input:hover + fieldset': {
            border: `2px solid #ced4da`,
          },
          '& .MuiInputBase-input:focus + fieldset': {
            border: `2px solid #ced4da`,
          },
        },
      },
    },
  },
});
