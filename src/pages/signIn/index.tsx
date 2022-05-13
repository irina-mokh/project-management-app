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
import { Loader } from 'components/Loader';

import { useTitle } from 'hooks';
import { TokenUserType } from 'pages/signUp';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from 'routes';

import { selectTheme } from 'store/theme/selectors';
import { getDesignTokens } from 'theme';
import { upDateToken } from 'utils/Redux/AppSlice';
import { AppDispatch } from 'utils/Redux/Store';
//import { setPageTitle } from 'utils/setPageTitle';

import { API_URL, ENDPOINTS } from '../../utils/userUtils';

export const SignInForm = () => {
  useTitle(routes.signIn.title);
  const mode = useSelector(selectTheme);
  const theme = createTheme(getDesignTokens(mode));
  //const { auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const [loginInput, setLogin] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');

  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);
  const [passErrorText, setPassErrorText] = useState('');

  const [isLoading, setLoadingState] = useState<boolean>(false);
  const [BEndError, setBEndError] = useState<string | null>(null);

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
      setLoginErrorText('Login must be longer than 3 symbols');
    }
  };

  const passValidation = (inputPass: string) => {
    if (inputPass && inputPass.length > 7) {
      setPassError(false);
      setPassErrorText('');
    } else {
      setPassError(true);
      setPassErrorText('Password should contain at least 8 symbols');
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
          throw new Error('User with such a login/password was not found');
        } else if (response.status === 400) {
          throw new Error('Fill fields to sign in');
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
      dispatch(upDateToken(tokenData));
      setTimeout(() => navigate('/main'), 700);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
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
            color: 'primary.contrastText',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5" sx={{ color: 'primary.contrastText' }}>
            Sign In
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
              label="Login"
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
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {success ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: '#69D882' }}
                disabled={Boolean(BEndError) || passError || loginError}
              >
                Successfully!
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: '#9D1C6A' }}
                disabled={Boolean(BEndError) || passError || loginError}
                onClick={() => setLoadingState(true)}
              >
                Sign In
              </Button>
            )}
            <Grid container>
              <Grid item>
                <span>For the first time on the site? </span>
                <Link to={'/signup'}>
                  <span>Create an account</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {isLoading ? <Loader /> : null}
        {BEndError ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {BEndError}
          </Alert>
        ) : null}
      </Container>
    </ThemeProvider>
  );
};
