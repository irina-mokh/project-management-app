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
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createNewUser, getUserToken } from "../../utils/userUtils";
import { APP_ROUTES } from "../App/App";

const theme = createTheme();

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
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");

  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState("");

  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);
  const [passErrorText, setPassErrorText] = useState("");

  function nameValidation(inputName: string) {
    if (inputName && inputName.length > 3) {
      setNameError(false);
      setNameErrorText("");
    } else {
      setNameError(true);
      setNameErrorText("Имя должно содержать более 3х символов");
    }
  }

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
  function loginValidation(inputLogin: string) {
    if (inputLogin && inputLogin.length > 3) {
      setLoginError(false);
      setLoginErrorText("");
    } else {
      setLoginError(true);
      setLoginErrorText("Логин должен содержать более 3х символов");
    }
  }

  function passValidation(inputPass: string) {
    if (inputPass && inputPass.length > 7) {
      setPassError(false);
      setPassErrorText("");
    } else {
      setPassError(true);
      setPassErrorText("Пароль должен содержать минимум 8 символов");
    }
  }

  const passHandler = (event: React.SyntheticEvent) => {
    const inputPass = (event.target as HTMLInputElement).value;
    setPassword(inputPass);
    passValidation(inputPass);
  };

  const [alreadyRegError, setAlreadyRegError] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newUser = {
      name: data.get("userName") as string,
      login: data.get("login") as string,
      password: data.get("password") as string,
    };

    const dataUser = {
      login: data.get("login") as string,
      password: data.get("password") as string,
    };
    const newData: void | Response | undefined = await createNewUser(newUser);
    setLoadingState(true);
    console.log("new data", newData);
    /*
    if (newData) {
      const token = await getUserToken(dataUser);
      //userContext.dispatchUserEvent("UPDATE_USER", user);

      setAlreadyRegError(false);
      setSuccess(true);
      setLoadingState(true);
    } else {
      setLoadingState(true);
      setAlreadyRegError(true);
      console.log("Aккаунт уже существует. Попробуйте войти");
    }*/
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 0,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
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
              label="Имя"
              name="userName"
              autoFocus
            />
            <TextField
              error={loginError}
              helperText={loginErrorText}
              onChange={loginHandler}
              value={login}
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="email"
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
                style={{ backgroundColor: "#19d219" }}
                disabled={passError || nameError || loginError}
              >
                Регистрация завершена
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={passError || nameError || loginError}
              >
                Создать аккаунт
              </Button>
            )}

            <Grid container>
              <Grid item>
                <span>Уже есть аккаунт?</span>
                <Link to={APP_ROUTES.LOGIN}>
                  <span>Войти</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
