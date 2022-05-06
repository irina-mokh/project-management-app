import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../App/App";
import "./Header.scss";

export const WelcomeHeader = () => {
  return (
    <div>
      <Link to={APP_ROUTES.SIGNUP} className="headerBtn">
        Sign Up
      </Link>
      <Link to={APP_ROUTES.LOGIN} className="headerBtn">
        Log In
      </Link>
    </div>
  );
};
