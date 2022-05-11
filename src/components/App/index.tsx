import { theme } from 'theme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'routes';

import { NewBoardModal } from 'components/NewBoardModal';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div data-testid="app">
          <AppRouter />
          <NewBoardModal />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
