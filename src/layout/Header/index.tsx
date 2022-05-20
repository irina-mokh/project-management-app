import { useEffect, useRef, useState } from 'react';
import { WelcomeHeader } from './WelcomeHeader';
import './Header.scss';
import Typography from '@mui/material/Typography/Typography';
import { ThemeSwitcher } from 'components/ThemeSwitcher';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { UserHeader } from './UserHeader';
import { getUserPersData } from 'store/auth/actions';

export const Header = () => {
  const [isSticky, setSticky] = useState(false);
  const headerLine = useRef<HTMLElement>(null);
  const { token, login } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const checkSticky = () => {
    if (headerLine.current?.clientHeight && window.pageYOffset > headerLine.current?.clientHeight) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkSticky);
    return () => {
      window.removeEventListener('scroll', checkSticky);
    };
  });
  useEffect(() => {
    if (login && login.length) {
      dispatch(getUserPersData(login));
    }
  }, [dispatch, login]);

  const { palette } = useTheme();

  return (
    <header
      ref={headerLine}
      className={isSticky ? 'header sticky' : 'header'}
      style={{
        backgroundColor: palette.background.paper,
      }}
    >
      <Typography variant="h5" component="h1">
        Project Management App
      </Typography>
      <div className="switch">
        <input
          id="language-toggle"
          className="check-toggle check-toggle-round-flat"
          type="checkbox"
        />
        <label htmlFor="language-toggle"></label>
        <span className="on">RU</span>
        <span className="off">EN</span>
      </div>
      <ThemeSwitcher />
      {token && token.length ? <UserHeader /> : <WelcomeHeader />}
    </header>
  );
};
