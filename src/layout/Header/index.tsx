import { useEffect, useRef, useState } from 'react';
import { WelcomeHeader } from './WelcomeHeader';
import './Header.scss';
import Typography from '@mui/material/Typography/Typography';
import { ThemeSwitcher } from 'components/ThemeSwitcher';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { UserHeader } from './UserHeader';
import { CreateBoardModal } from 'components/Modals';
import { getUserPersData } from 'store/auth/actions';
import { useTranslation } from 'react-i18next';
import i18n from 'utils/translation/i18n';
import { langSlice } from 'store/lang/reducer';

export const Header = () => {
  const { t } = useTranslation();
  const [isSticky, setSticky] = useState(false);
  const headerLine = useRef<HTMLElement>(null);
  const { token, login } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { lang } = useSelector((state: RootState) => state.lang);
  const { toggleLang } = langSlice.actions;

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

  const checkLang = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
    dispatch(toggleLang());
  };

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
          checked={lang === 'en'}
          onChange={(event) => {
            console.log('event', event.target.checked);
            checkLang(event);
          }}
        />
        <label htmlFor="language-toggle"></label>
        <span className="on">{t('ruSwitcher')}</span>
        <span className="off">{t('enSwitcher')}</span>
      </div>
      <ThemeSwitcher />
      {token && token.length ? <UserHeader /> : <WelcomeHeader />}
      <CreateBoardModal />
    </header>
  );
};
