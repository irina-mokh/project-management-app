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
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from 'store';
import { signInUser } from 'store/auth/actions';
import { authSlice } from 'store/auth/reducer';
import { selectTheme } from 'store/theme/selectors';
import { getDesignTokens } from 'theme';

export const SignInForm = () => {
  const mode = useSelector(selectTheme);
  const theme = createTheme(getDesignTokens(mode));
  const dispatch = useDispatch<AppDispatch>();
  const { error, isLoading, token } = useSelector((state: RootState) => state.auth);
  const { remError } = authSlice.actions;

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
    dispatch(remError());
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
    dispatch(remError());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const curUser = {
      login: data.get('login') as string,
      password: data.get('password') as string,
    };
    dispatch(signInUser(curUser));
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
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
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
            {token ? (
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
