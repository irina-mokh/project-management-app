import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AppDispatch } from 'store';
import { toggleMode } from 'store/theme/reducer';
import { selectTheme } from 'store/theme/selectors';

export const ThemeSwitcher = () => {
  const themeMode = useSelector(selectTheme);
  const dispatch: AppDispatch = useDispatch();
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>Dark</Typography>
      <Switch
        defaultChecked
        checked={themeMode === 'light'}
        inputProps={{ 'aria-label': 'theme' }}
        onChange={() => {
          dispatch(toggleMode());
        }}
      />
      <Typography>Light</Typography>
    </Stack>
  );
};
