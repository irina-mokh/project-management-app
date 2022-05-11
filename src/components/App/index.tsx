import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'routes';
import './app.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App" data-testid="app">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};

export default App;
