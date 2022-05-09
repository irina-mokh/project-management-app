import { Link } from "react-router-dom";
import { APP_ROUTES } from "../App/App";
import "./Header.scss";

export const WelcomeHeader = () => {
  return (
    <div>
      <Link to={APP_ROUTES.SIGNUP} className="headerBtn">
        Зарегистрироваться
      </Link>
      <Link to={APP_ROUTES.LOGIN} className="headerBtn">
        Войти
      </Link>
    </div>
  );
};
