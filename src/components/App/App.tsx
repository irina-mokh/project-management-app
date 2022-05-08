import Button from "@mui/material/Button";
import { useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContext } from "../../utils/State/Context";
import { TokenReducer } from "../../utils/State/Reducers";
import { initialAppState } from "../../utils/State/State";
import { Header } from "../Header/Header";
import { LogInForm } from "../Login/LogInForm";
import { SignUpForm } from "../Login/SignUpForm";
import { MainPage } from "../MainPage/MainPage";
import { WelcomePage } from "../WelcomePage/WelcomePage";
import "./app.scss";

export const APP_ROUTES = {
  WELCOME: "/",
  MAIN: "/boards",
  SIGNUP: "/signUp",
  LOGIN: "/logIn",
  NOTFOUND: "/404",
  WRONGPATH: "*",
};

export const App = () => {
  const [state, dispatch] = useReducer(TokenReducer, initialAppState);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ state, dispatch }}>
        <div className="App" data-testid="app">
          <Header />
          {/*<Button variant="outlined">Hello World</Button>*/}
          <div>
            <Routes>
              <Route path={APP_ROUTES.WELCOME} element={<WelcomePage />} />
              <Route path={APP_ROUTES.MAIN} element={<MainPage />} />
              <Route path={APP_ROUTES.SIGNUP} element={<SignUpForm />} />
              <Route path={APP_ROUTES.LOGIN} element={<LogInForm />} />
            </Routes>
          </div>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default App;
