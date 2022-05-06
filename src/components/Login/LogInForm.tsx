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
import { APP_ROUTES } from "../App/App";

const theme = createTheme();

export const LogInForm = () => {
  const navigate = useNavigate();
  function checkLocation() {
    navigate(-2);
  }

  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");

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

  function emailValidation(inputEmail: string) {
    const regEm = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regEm.test(inputEmail)) {
      setEmailError(false);
      setEmailErrorText("");
    } else {
      setEmailError(true);
      setEmailErrorText("Введите корректный адрес почты");
    }
  }

  const emailHandler = (event: React.SyntheticEvent) => {
    const inputEmail = (event.target as HTMLInputElement).value;
    setEmail(inputEmail);
    emailValidation(inputEmail);
  };

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
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
  };
  /* const user: CurUser = {};

    const newData: void | Response | undefined = await createUser(newUser);
    setLoadingState(true);
    

    if (newData) {
      //const dataUser = await loginUser(newUser);

      if (dataUser) {
        const currentUser = await dataUser.json();
        console.log("newUser", currentUser);
        user.message = currentUser.message;
        user.userId = currentUser.userId;
        user.token = currentUser.token;
        user.refreshToken = currentUser.refreshToken;
        user.name = currentUser.name;
        localStorage.setItem("CurrentUser", JSON.stringify(user));
        //userContext.dispatchUserEvent("UPDATE_USER", user);
      }
      setAlreadyRegError(false);
      setSuccess(true);
      setLoadingState(true);
      setTimeout(checkLocation, 1500);
    } else {
      setLoadingState(true);
      setAlreadyRegError(true);
      console.log("Aккаунт уже существует. Попробуйте войти");
    }
  };
*/
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
            Авторизация
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              error={emailError}
              helperText={emailErrorText}
              onChange={emailHandler}
              value={email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Эл.почта"
              name="email"
              autoComplete="email"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={passError || emailError}
            >
              Войти
            </Button>
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
      </Container>
    </ThemeProvider>
  );
};
