import { PaletteMode } from '@mui/material';
import { teal, amber } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
  typography: {
    fontFamily: 'PT Sans',
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
