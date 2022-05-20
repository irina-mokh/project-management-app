import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, createTheme, Grid, TextField, ThemeProvider } from '@mui/material';
import { getDesignTokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from 'store/theme/selectors';
import { AppDispatch, RootState } from 'store';
import { ChangeEvent, useEffect, useState } from 'react';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { deleteUser, editUser } from 'store/auth/actions';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { CustomSnackBar } from 'components/CustomSnackBar';
import { authSlice } from 'store/auth/reducer';

export const EditProfile = () => {
  const mode = useSelector(selectTheme);
  const theme = createTheme(getDesignTokens(mode));
  const { userName, login, userId, userPassword, editSuccess, deleteSuccess } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const { remSnackState } = authSlice.actions;

  const navigate = useNavigate();

  const [curName, setCurName] = useState<string | null>(userName);
  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState('');

  const [curLogin, setCurLogin] = useState<string | null>(login);
  const [loginError, setLoginError] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');

  const [curPassword, setPassword] = useState('');
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
  const handleNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurName(event.target.value);
    nameValidation(event.target.value);
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

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurLogin(event.target.value);
    loginValidation(event.target.value);
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

  const handlePasswordChange = (event: React.SyntheticEvent) => {
    const inputPass = (event.target as HTMLInputElement).value;
    setPassword(inputPass);
    passValidation(inputPass);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newData = {
      name: curName,
      login: curLogin,
      password: curPassword && curPassword.length ? curPassword : userPassword,
    };
    dispatch(editUser({ userId, newData }));
  };

  useEffect(() => {
    editSuccess || deleteSuccess ? setSnackOpen(true) : setSnackOpen(false);
  }, [editSuccess, deleteSuccess]);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 0,
          marginTop: '20px',
        }}
      >
        <Typography component="h1" variant="h5">
          Edit account information
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Typography>User Name:</Typography>
          <TextField
            error={nameError}
            helperText={nameErrorText}
            onChange={(e) => {
              handleNameChange(e);
            }}
            value={curName}
            margin="normal"
            required
            fullWidth
            id="name"
            name="Name"
            label="Name"
            autoComplete="name"
            autoFocus
          />
          <Grid item xs>
            <Typography>User Login:</Typography>
          </Grid>
          <Grid item>
            <TextField
              error={loginError}
              helperText={loginErrorText}
              onChange={(e) => {
                handleLoginChange(e);
              }}
              value={curLogin}
              margin="normal"
              required
              fullWidth
              id="login"
              name="login"
              label="Login"
              autoComplete="login"
              autoFocus
            />
          </Grid>
          <Grid item xs>
            <Typography>User Password:</Typography>
          </Grid>
          <Grid item>
            <TextField
              error={passError}
              helperText={passErrorText}
              onChange={(e) => {
                handlePasswordChange(e);
              }}
              value={curPassword}
              margin="normal"
              fullWidth
              id="password"
              name="password"
              label="New password"
              autoComplete="password"
              autoFocus
            />
          </Grid>

          <Grid
            container
            sx={{
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={nameError || loginError || passError}
              >
                Submit changes
              </Button>
            </Grid>
            <Grid>
              <Button fullWidth variant="contained" onClick={() => setConfirmOpen(true)}>
                Delete account
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ConfirmDialog
        confirmText={'Delete this account?'}
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => {
          dispatch(deleteUser(userId));
          setTimeout(() => navigate(`${routes.welcome.path}`), 1000);
        }}
      />
      <CustomSnackBar
        open={snackOpen}
        snackText={
          editSuccess ? 'Account data was changed successfully' : 'Account was deleted successfully'
        }
        setOpen={setSnackOpen}
        onClose={() => dispatch(remSnackState())}
      />
    </ThemeProvider>
  );
};
