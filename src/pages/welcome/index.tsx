import { useTitle } from 'hooks';
import { routes } from 'routes';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export const Welcome = () => {
  useTitle(routes.welcome.title);
  return (
    <div>
      <h2>Welcome page</h2>
      {/* временно добавила ссылку на /boards для удобства */}
      <Button variant="outlined">
        <Link to="/boards">Boards</Link>
      </Button>
    </div>
  );
};
