import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography/Typography';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { AppDispatch } from 'store';
import { removeError } from 'store/auth/reducer';
import './Header.scss';

export const WelcomeHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

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
        <Typography>{t('signUp')}</Typography>
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate(routes.signIn.path);
          dispatch(removeError);
        }}
        sx={{ marginLeft: '5px' }}
      >
        <Typography>{t('signIn')}</Typography>
      </Button>
    </div>
  );
};
