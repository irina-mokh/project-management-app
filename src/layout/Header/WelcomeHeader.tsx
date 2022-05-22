import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography/Typography';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { AppDispatch } from 'store';
import { removeError } from 'store/auth/reducer';
import './Header.scss';

export const WelcomeHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigate(routes.signUp.path);
          dispatch(removeError);
        }}
        sx={{ marginLeft: '5px' }}
      >
        <Typography>Sign Up</Typography>
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate(routes.signIn.path);
          dispatch(removeError);
        }}
        sx={{ marginLeft: '5px' }}
      >
        <Typography>Sign In</Typography>
      </Button>
    </div>
  );
};
