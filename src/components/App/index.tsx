import { theme } from 'theme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'routes';

import { AddBoardModal } from 'components/AddBoardModal';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div data-testid="app">
          <AppRouter />
          <AddBoardModal />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
