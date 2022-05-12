import { getDesignTokens } from 'theme';
import { ThemeProvider } from '@mui/material/styles';
import { Box, createTheme, PaletteMode } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'routes';
import { Provider } from 'react-redux';
import { store } from 'store';

function App() {
  // can't use store value of mode outside Provider
  const LSmode = localStorage.getItem('mode');
  let mode: PaletteMode = 'light';
  if (LSmode === 'dark') {
    mode = LSmode;
  }
  const theme = createTheme(getDesignTokens(mode));

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            <AppRouter />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
