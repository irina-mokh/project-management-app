import { Link } from 'react-router-dom';
import { routes } from 'routes';
import './Header.scss';

export const WelcomeHeader = () => {
  return (
    <div>
      <Link to={routes.signUp.path} className="headerBtn">
        Sign Up
      </Link>
      <Link to={routes.signIn.path} className="headerBtn">
        Sign In
      </Link>
    </div>
  );
};
