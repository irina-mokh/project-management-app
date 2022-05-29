import { useDispatch, useSelector } from 'react-redux';
import { Box, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { selectTheme } from 'store/theme/selectors';
import { getDesignTokens } from 'theme';
import { AppRouter } from 'routes';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { AppDispatch, RootState } from 'store';
import { CustomSnackBar } from 'components/CustomSnackBar';
import { authSlice } from 'store/auth/reducer';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

export const MainLayout = () => {
  const mode = useSelector(selectTheme);
  const theme = createTheme(getDesignTokens(mode));
  const { isExpiredToken } = useSelector((state: RootState) => state.auth);
  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const { removeSnackState } = authSlice.actions;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isExpiredToken) {
      setSnackOpen(true);
    } else {
      setSnackOpen(false);
    }
  }, [isExpiredToken]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <Box
          data-testid="app"
          sx={{
            backgroundColor: theme.palette.background.default,
            fontFamily: theme.typography.fontFamily,
            display: 'grid',
            minHeight: '100vh',
            gridTemplateRows: 'auto 1fr auto',
            gridTemplateColumns: '100%',
            boxSizing: 'border-box',
          }}
        >
          <AppRouter />
          <CustomSnackBar
            open={snackOpen}
            snackText={`${t('errorTokenExpired')}`}
            setOpen={setSnackOpen}
            onClose={() => dispatch(removeSnackState())}
          />
        </Box>
      </DndProvider>
    </ThemeProvider>
  );
};
