import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from 'store/theme/selectors';
import { getDesignTokens } from 'theme';

export type PassFormPropsType = {
  password: string;
  showPassword: boolean;
};

export const PasswordFormField = () => {
  const mode = useSelector(selectTheme);
  const theme = createTheme(getDesignTokens(mode));
  const [values, setValues] = useState<PassFormPropsType>({
    password: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof PassFormPropsType) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
    </ThemeProvider>
  );
};
