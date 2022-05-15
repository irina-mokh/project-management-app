import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography/Typography';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import './Header.scss';

export const WelcomeHeader = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => navigate(routes.signUp.path)}
        sx={{ marginLeft: '5px' }}
      >
        <Typography>Sign Up</Typography>
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate(routes.signIn.path)}
        sx={{ marginLeft: '5px' }}
      >
        <Typography>Sign In</Typography>
      </Button>
    </div>
  );
};
