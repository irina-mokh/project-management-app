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
import { Loading } from 'components/Loading';

import { useTitle } from 'hooks';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { AppDispatch, RootState } from 'store';
import { signInUser } from 'store/auth/actions';
import { selectTheme } from 'store/theme/selectors';
import { getDesignTokens } from 'theme';

export const SignInForm = () => {
  useTitle(routes.signIn.title);
  const mode = useSelector(selectTheme);
  const theme = createTheme(getDesignTokens(mode));
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const [loginInput, setLogin] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');

  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);
  const [passErrorText, setPassErrorText] = useState('');

  const loginHandler = (event: React.SyntheticEvent) => {
    const inputLogin = (event.target as HTMLInputElement).value;
    setLogin(inputLogin);
    loginValidation(inputLogin);
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
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const curUser = {
      login: data.get('login') as string,
      password: data.get('password') as string,
    };
    const createdToken = await dispatch(signInUser(curUser));

    if (createdToken) {
      setSuccess(true);
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
                //disabled={Boolean(BEndError) || passError || loginError}
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
                //disabled={Boolean(BEndError) || passError || loginError}
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
        {isLoading ? <Loading /> : null}
        {error ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        ) : null}
      </Container>
    </ThemeProvider>
  );
};