import { Link } from 'react-router-dom';
import './Header.scss';

export const WelcomeHeader = () => {
  return (
    <div>
      <Link to={'/signup'} className="headerBtn">
        Sign Up
      </Link>
      <Link to={'/signin'} className="headerBtn">
        Sign In
      </Link>
    </div>
  );
};
