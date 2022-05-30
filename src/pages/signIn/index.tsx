import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AxiosError } from 'axios';
import { Loading } from 'components/Loading';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { AppDispatch, RootState } from 'store';
import { getUserPersData, signInUser } from 'store/auth/actions';
import { authSlice } from 'store/auth/reducer';
import { selectTheme } from 'store/theme/selectors';
import { getDesignTokens } from 'theme';

export const SignInForm = () => {
  const mode = useSelector(selectTheme);
  const theme = createTheme(getDesignTokens(mode));
  const dispatch = useDispatch<AppDispatch>();
  const { error, isLoading, token } = useSelector((state: RootState) => state.auth);
  const { removeError } = authSlice.actions;

  const navigate = useNavigate();

  const [loginInput, setLogin] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');

  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);
  const [passErrorText, setPassErrorText] = useState('');

  const { t } = useTranslation();

  const loginHandler = (event: React.SyntheticEvent) => {
    const inputLogin = (event.target as HTMLInputElement).value;
    setLogin(inputLogin);
    loginValidation(inputLogin);
    dispatch(removeError());
  };
  const loginValidation = (inputLogin: string) => {
    if (inputLogin && inputLogin.length > 3) {
      setLoginError(false);
      setLoginErrorText('');
    } else {
      setLoginError(true);
      setLoginErrorText(`${t('loginErrorText')}`);
    }
  };

  const passValidation = (inputPass: string) => {
    if (inputPass && inputPass.length > 7) {
      setPassError(false);
      setPassErrorText('');
    } else {
      setPassError(true);
      setPassErrorText(`${t('passwordErrorText')}`);
    }
  };

  const passHandler = (event: React.SyntheticEvent) => {
    const inputPass = (event.target as HTMLInputElement).value;
    setPassword(inputPass);
    passValidation(inputPass);
    dispatch(removeError());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const curUser = {
      login: data.get('login') as string,
      password: data.get('password') as string,
    };
    dispatch(signInUser(curUser))
      .unwrap()
      .then(() => {
        navigate(`/${routes.main.path}`);
        dispatch(getUserPersData(curUser.login));
      })
      .catch((e) => {
        // error in case of rejection inside createAsyncThunk second argument
        console.log('e', e as AxiosError);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        data-testid="signIn"
        component="main"
        maxWidth="xs"
        sx={{ mt: 5, backgroundColor: theme.palette.background.default }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 0,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            {t('signIn')}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              error={loginError}
              helperText={loginErrorText}
              onChange={loginHandler}
              value={loginInput}
              margin="normal"
              required
              fullWidth
              id="login"
              name="login"
              label={t('userLogin')}
              autoComplete="login"
              autoFocus
            />
            <TextField
              error={passError}
              helperText={passErrorText}
              onChange={passHandler}
              value={password}
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('userPassword')}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {token ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: '#69D882' }}
                //disabled={Boolean(BEndError) || passError || loginError}
              >
                {t('successfully')}
              </Button>
            ) : (
              <Button
                data-testid="submit-signin"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('signIn')}
              </Button>
            )}
            <Grid container>
              <Grid item>
                <span style={{ marginRight: '10px' }}> {t('firstVisit')}</span>
                <Link
                  to={'/signup'}
                  onClick={() => dispatch(removeError)}
                  style={{ color: '#009688', textDecoration: 'underline' }}
                >
                  <span>{t('signUp')}</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {isLoading ? <Loading /> : null}
        {error ? (
          <Alert severity="error">
            <AlertTitle>{t('error')}</AlertTitle>
            {error}
          </Alert>
        ) : null}
      </Container>
    </ThemeProvider>
  );
};
