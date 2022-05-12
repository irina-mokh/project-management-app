import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { MainLayout } from 'components/MainLayout';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
