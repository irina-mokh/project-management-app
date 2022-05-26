import { useTitle } from 'hooks';
import { routes } from 'routes';

import { Button, Typography } from '@mui/material';
import { DevCardIrina } from './devCardIrina';
import { DevCardMary } from './devCardMary ';
import { DevCardIvan } from './devCardIvan';

export const Welcome = () => {
  useTitle(routes.welcome.title);
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
          <h3>Manage your team&apos;s work, projects and tasks online</h3>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#ff8c32', marginTop: '20%', width: '40%', height: '15%' }}
          >
            Get started
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
          Team of developers
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
