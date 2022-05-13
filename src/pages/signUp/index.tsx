import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, ENDPOINTS, getUserToken } from '../../utils/userUtils';
import { routes } from 'routes';
import { theme } from 'theme';
import { Loader } from 'components/Loader';
import { useTitle } from 'hooks';

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
  useTitle(routes.signUp.title);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

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
    setBEndError(null);
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

  const [isLoading, setLoadingState] = useState<boolean>(false);
  const [BEndError, setBEndError] = useState<string | null>(null);

  const checkSignUp = async (user: NewUserType) => {
    const resp = await fetch(`${API_URL}${ENDPOINTS.SINGUP}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        setLoadingState(false);
        if (res.status === 409) {
          throw new Error('User with such a login is already exist');
        } else if (res.status === 400) {
          throw new Error('Fill fields to sign up');
        } else if (res.status === 201) {
          return res.json();
        }
      })
      .catch((error: Error) => {
        console.log('Error happened', error.message);
        setBEndError(error.message);
      });

    return resp;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newUser = {
      name: data.get('userName') as string,
      login: data.get('login') as string,
      password: data.get('password') as string,
    };

    const newData: void | Response | undefined = await checkSignUp(newUser);

    if (newData) {
      setSuccess(true);
      const dataUser = {
        login: data.get('login') as string,
        password: data.get('password') as string,
      };
      const tokenData = await getUserToken(dataUser);
      if (tokenData) {
        navigate(routes.main.path);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ mt: 5, color: 'primary.contrastText' }}>
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
            {success ? (
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
                //disabled={passError || nameError || loginError}
                style={{ backgroundColor: '#9c27b0' }}
                disabled={false || passError || nameError || loginError}
                onClick={() => setLoadingState(true)}
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
        {isLoading ? <Loader /> : null}
        {BEndError ? <div className="errorMessageCont">{BEndError}</div> : null}
      </Container>
    </ThemeProvider>
  );
};
