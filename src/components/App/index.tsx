import { theme } from 'theme';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'routes';
import { Provider } from 'react-redux';
import { store } from 'store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.primary.contrastText,
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
