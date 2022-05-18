import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, createTheme, Grid, TextField, ThemeProvider } from '@mui/material';
import { getDesignTokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from 'store/theme/selectors';
import { AppDispatch, RootState } from 'store';
import { ChangeEvent, useState } from 'react';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { deleteUser } from 'store/auth/actions';

export const EditProfile = () => {
  const mode = useSelector(selectTheme);
  const theme = createTheme(getDesignTokens(mode));
  const { userName, login, userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const [curName, setCurName] = useState<string | null>(userName);
  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState('');

  const [curLogin, setCurLogin] = useState<string | null>(login);
  const [loginError, setLoginError] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('dataForm', curName);
  };

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
          <Typography
            sx={{
              textAlign: 'right',
            }}
          >
            User Name:
          </Typography>
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

          <Grid item></Grid>
          <Grid item xs>
            <Typography
              sx={{
                textAlign: 'right',
              }}
            >
              User Login:
            </Typography>
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
                disabled={nameError || loginError}
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
        onConfirm={() => dispatch(deleteUser(userId))}
      />
    </ThemeProvider>
  );
};
