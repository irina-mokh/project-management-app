import { useEffect, useState } from 'react';
import { WelcomeHeader } from './WelcomeHeader';
import './Header.scss';
import Typography from '@mui/material/Typography/Typography';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { UserHeader } from './UserHeader';
import { CreateBoardModal } from 'components/Modals';
import { getUserPersData } from 'store/auth/actions';
import { ReactComponent as MainLogo } from '../../assets/images/svg/logo.svg';
import { ThemeSwitcher1 } from 'components/Theme';
import { LangSwitcher } from 'components/LangSwitcher';

export const Header = () => {
  const [isSticky, setSticky] = useState(false);
  const { token, login } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const checkSticky = () => {
    if (window.pageYOffset > 0) {
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
      className={isSticky ? 'header sticky' : 'header'}
      style={{
        backgroundColor: palette.background.paper,
      }}
    >
      <MainLogo style={{ fill: '#FF7000', height: '100%', marginRight: '10px' }} />
      <Typography variant="h5" component="h1">
        PMA
      </Typography>
      <LangSwitcher />
      <ThemeSwitcher1 />
      {token && token.length ? <UserHeader /> : <WelcomeHeader />}
      <CreateBoardModal />
    </header>
  );
};
