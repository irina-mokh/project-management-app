import { useTitle } from 'hooks';
import { routes } from 'routes';

import { Button } from '@mui/material';
import { DevCardIrina } from './devCardIrina';
import { DevCardMary } from './devCardMary ';
import { DevCardIvan } from './devCardIvan';

export const Welcome = () => {
  useTitle(routes.welcome.title);
  return (
    <div className="welcomeContainer">
      <div className="mainTextContainer">
        <div className="aboutAppContainer">
          <h1 className="mainTitle">Project managment app</h1>
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
        <h3 className="h3">Team of developers</h3>
        <div className="devCardsContainer">
          <DevCardIrina />
          <DevCardIvan />
          <DevCardMary />
        </div>
      </section>
    </div>
  );
};
