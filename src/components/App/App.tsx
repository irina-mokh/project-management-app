import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { theme } from 'theme';
import { ProfileEditForm } from '../Forms/ProfileEditForm';
import { Header } from '../Header/Header';
import { LogInForm } from '../Login/LogInForm';
import { SignUpForm } from '../Login/SignUpForm';
import { MainPage } from '../MainPage/MainPage';
import { Page404 } from '../Page404';
import { WelcomePage } from '../WelcomePage/WelcomePage';
import './app.scss';

export const APP_ROUTES = {
  WELCOME: '/',
  MAIN: '/boards',
  SIGNUP: '/signUp',
  LOGIN: '/logIn',
  EDIT_PROFILE: '/editProfile',
  WRONGPATH: '*',
};

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App" data-testid="app">
          <Header />
          {/*<Button variant="outlined">Hello World</Button>*/}
          <div>
            <Routes>
              <Route path={APP_ROUTES.WELCOME} element={<WelcomePage />} />
              <Route path={APP_ROUTES.MAIN} element={<MainPage />} />
              <Route path={APP_ROUTES.SIGNUP} element={<SignUpForm />} />
              <Route path={APP_ROUTES.LOGIN} element={<LogInForm />} />
              <Route path={APP_ROUTES.WRONGPATH} element={<Page404 />} />
              <Route path={APP_ROUTES.EDIT_PROFILE} element={<ProfileEditForm />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
