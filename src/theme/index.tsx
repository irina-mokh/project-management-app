import { PaletteMode } from '@mui/material';
import { teal, amber } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: 'PT Sans',
    h1: { color: '#fff' },
  },
  components: {
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
