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
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUserLogin, upDateToken } from '../../utils/Redux/AppSlice';
import { AppDispatch } from '../../utils/Redux/Store';
import { API_URL, ENDPOINTS } from '../../utils/userUtils';
import { APP_ROUTES } from '../App/App';
import { Loader } from '../Loader/Loader';
import { TokenUserType } from './SignUpForm';

const theme = createTheme();

export const LogInForm = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const [login, setLogin] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');

  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);
  const [passErrorText, setPassErrorText] = useState('');

  const [isLoading, setLoadingState] = useState<boolean>(false);
  const [BEndError, setBEndError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const loginHandler = (event: React.SyntheticEvent) => {
    const inputLogin = (event.target as HTMLInputElement).value;
    setLogin(inputLogin);
    loginValidation(inputLogin);
    setBEndError(null);
  };
  const loginValidation = (inputLogin: string) => {
    if (inputLogin && inputLogin.length > 3) {
      setLoginError(false);
      setLoginErrorText('');
    } else {
      setLoginError(true);
      setLoginErrorText('Логин должен содержать более 3х символов');
    }
  };

  const passValidation = (inputPass: string) => {
    if (inputPass && inputPass.length > 7) {
      setPassError(false);
      setPassErrorText('');
    } else {
      setPassError(true);
      setPassErrorText('Пароль должен содержать минимум 8 символов');
    }
  };

  const passHandler = (event: React.SyntheticEvent) => {
    const inputPass = (event.target as HTMLInputElement).value;
    setPassword(inputPass);
    passValidation(inputPass);
    setBEndError(null);
  };

  const getCurUserToken = async (user: TokenUserType) => {
    const rawResponse = await fetch(`${API_URL}${ENDPOINTS.CREATE_TOKEN}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        setLoadingState(false);
        if (response.status === 403) {
          throw new Error('Пользователь с таким логином/паролем не найден');
        } else if (response.status === 400) {
          throw new Error('Заполните поля, чтобы авторизироваться');
        } else if (response.status === 201) {
          return response.json();
        }
      })
      .catch((error: Error) => {
        console.log('Error happened', error.message);
        setBEndError(error.message);
      });

    console.log('rawToken', rawResponse);
    return rawResponse;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const curUser = {
      login: data.get('login') as string,
      password: data.get('password') as string,
    };

    const tokenData = await getCurUserToken(curUser);
    if (tokenData) {
      setSuccess(true);
      dispatch(upDateToken(tokenData.token));
      dispatch(setUserLogin(curUser.login));
      setTimeout(() => navigate(APP_ROUTES.MAIN), 700);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 0,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            Авторизация
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              error={loginError}
              helperText={loginErrorText}
              onChange={loginHandler}
              value={login}
              margin="normal"
              required
              fullWidth
              id="login"
              name="login"
              label="Логин"
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
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {success ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: '#19d219' }}
                disabled={Boolean(BEndError) || passError || loginError}
              >
                Вход выполнен
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={Boolean(BEndError) || passError || loginError}
                onClick={() => setLoadingState(true)}
              >
                Войти
              </Button>
            )}
            <Grid container>
              <Grid item>
                <span>Впервые на сайте? </span>
                <Link to={APP_ROUTES.SIGNUP}>
                  <span>Создать аккаунт</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {isLoading ? <Loader /> : null}
        {BEndError ? <div className="errorMessageCont">{BEndError}</div> : null}
      </Container>
    </ThemeProvider>
  );
};
