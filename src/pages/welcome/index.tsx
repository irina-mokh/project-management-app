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

export const Welcome = () => {
  useTitle(routes.welcome.title);
  const { token } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();

  return (
    <div className="welcomeContainer">
      <div className="mainTextContainer">
        <div className="aboutAppContainer">
          <Typography
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
            variant="h5"
            sx={{
              textAlign: 'center',
            }}
          >
            {t('aboutApp')}
          </Typography>

          <Button
            variant="contained"
            sx={{ backgroundColor: '#ff8c32', marginTop: '20%', width: '40%', height: '15%' }}
          >
            {token?.length ? (
              <Link to={routes.main.path}> {t('goToBoards')} </Link>
            ) : (
              <Link to={routes.signUp.path}>{t('getStarted')}</Link>
            )}
          </Button>
        </div>
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
