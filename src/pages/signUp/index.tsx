import {
  Alert,
  AlertTitle,
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
import { Link } from 'react-router-dom';
import { getDesignTokens } from 'theme';
import { useSelector } from 'react-redux';
import { selectTheme } from 'store/theme/selectors';
import { useDispatch } from 'react-redux';
import { Loading } from 'components/Loading';
import { createUser, signInUser } from 'store/auth/actions';
import { AppDispatch, RootState } from 'store';

export interface NewUserType {
  name: string;
  login: string;
  password: string;
}
export interface TokenUserType {
  login: string;
  password: string;
}

export const SignUpForm = () => {
  const mode = useSelector(selectTheme);
  const theme = createTheme(getDesignTokens(mode));
  const dispatch = useDispatch<AppDispatch>();
  const { token, error, isLoading } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState('');

  const [login, setLogin] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');

  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);
  const [passErrorText, setPassErrorText] = useState('');

  const nameValidation = (inputName: string) => {
    if (inputName && inputName.length > 3) {
      setNameError(false);
      setNameErrorText('');
    } else {
      setNameError(true);
      setNameErrorText('Name should contain more then 3 symbols');
    }
  };

  const nameHandler = (event: React.SyntheticEvent) => {
    const inputName = (event.target as HTMLInputElement).value;
    setName(inputName);
    nameValidation(inputName);
  };

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
      setLoginErrorText('Name should contain more then 3 symbols');
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

    const newUser = {
      name: data.get('userName') as string,
      login: data.get('login') as string,
      password: data.get('password') as string,
    };
    dispatch(createUser(newUser))
      .unwrap()
      .then((newUser) => {
        dispatch(signInUser({ password: newUser.password, login: newUser.login }));
      })
      .catch((e) => {
        // error in case of rejection inside createAsyncThunk second argument
        console.log('e', e);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ mt: 5 }}>
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate id="formBox">
            <TextField
              error={nameError}
              helperText={nameErrorText}
              onChange={nameHandler}
              value={name}
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Name"
              name="userName"
              autoFocus
            />
            <TextField
              error={loginError}
              helperText={loginErrorText}
              onChange={loginHandler}
              type="text"
              value={login}
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="userlogin"
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
                disabled={passError || nameError || loginError}
              >
                Registration complete!
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={false || passError || nameError || loginError}
              >
                Create an account
              </Button>
            )}

            <Grid container>
              <Grid item>
                <span>Already have an account? </span>
                <Link to={'/signin'}>
                  <span>Sign In</span>
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
