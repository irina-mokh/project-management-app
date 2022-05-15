import { useEffect, useRef, useState } from 'react';
import { WelcomeHeader } from './WelcomeHeader';
import './Header.scss';
import Typography from '@mui/material/Typography/Typography';
import { ThemeSwitcher } from 'components/ThemeSwitcher';
import { useTheme } from '@mui/material';

export const Header = () => {
  const [isSticky, setSticky] = useState(false);
  const headerLine = useRef<HTMLElement>(null);

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
      {/*{userToken ? <UserHeader /> : <WelcomeHeader />}*/}
      <WelcomeHeader />
    </header>
  );
};
