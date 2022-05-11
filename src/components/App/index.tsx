import { theme } from 'theme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div data-testid="app">
          <AppRouter />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
