import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { MainLayout } from 'components/MainLayout';
import { Suspense } from 'react';
import { Loading } from 'components/Loading';

export const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
};

export default App;
