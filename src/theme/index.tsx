import { PaletteMode } from '@mui/material';
import { teal, amber } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: 'PT Sans',
  },
  components: {
    '@global': {
      '&::-webkit-scrollbar': {
        width: 7,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
        borderWidth: '1px',
        borderColor: 'primary',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'gray',
        borderRadius: 2,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '-webkit-autofill:focus': {
            transition: 'background-color 600000s 0s, color 600000s 0s',
          },
          '& fieldset': {
            border: 'none',
          },
          '& .MuiOutlinedInput-input + fieldset': {
            border: '2px solid #009688',
          },
          '& .MuiOutlinedInput-input:hover + fieldset': {
            border: `2px solid #ced4da`,
          },
          '& .MuiOutlinedInput-input:focus + fieldset': {
            border: `2px solid #ced4da`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          border: '1px solid #88888833',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          // backgroundColor: 'transparent',
          // border: '1',
          boxShadow: 'none',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          width: '1.2em',
          height: '1.2em',
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
