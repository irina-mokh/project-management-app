import { useTitle } from 'hooks';
import { routes } from 'routes';

import { Button, Typography } from '@mui/material';
import { DevCardIrina } from './devCardIrina';
import { DevCardMary } from './devCardMary ';
import { DevCardIvan } from './devCardIvan';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import welcomeBanner from '../../assets/images/svg/welcomeBanner.svg';

export const Welcome = () => {
  useTitle(routes.welcome.title);
  const { token } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();

  return (
    <div className="welcomeContainer">
      <div className="mainTextContainer">
        <img className="startBanner" src={welcomeBanner} alt="start page banner" />
        <Typography
          className="appTitle"
          variant="h3"
          sx={{
            marginTop: '20px',
            marginBottom: '20px',
            textAlign: 'center',
            color: '#FF7000',
            fontWeight: '600',
          }}
        >
          Project Manegment App
        </Typography>
        <Typography
          className="appText"
          variant="h5"
          sx={{
            textAlign: 'center',
          }}
        >
          {t('aboutApp')}
        </Typography>

        <Button
          className="appBtn"
          variant="contained"
          sx={{ backgroundColor: '#ff8c32', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {token?.length ? (
            <Link to={routes.main.path} className="mainBtnLink">
              <span>{t('goToBoards')}</span>
            </Link>
          ) : (
            <Link to={routes.signUp.path} className="mainBtnLink">
              <span>{t('getStarted')}</span>
            </Link>
          )}
        </Button>
      </div>
      <section>
        <Typography
          variant="h3"
          sx={{
            marginBottom: '20px',
            textAlign: 'center',
            color: '#FF7000',
          }}
        >
          {t('teamOfDevs')}
        </Typography>
        <div className="devCardsContainer">
          <DevCardIrina />
          <DevCardIvan />
          <DevCardMary />
        </div>
      </section>
    </div>
  );
};
