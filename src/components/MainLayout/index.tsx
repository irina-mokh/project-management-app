import { useSelector } from 'react-redux';
import { Box, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { selectTheme } from 'store/theme/selectors';
import { getDesignTokens } from 'theme';
import { AppRouter } from 'routes';

export const MainLayout = () => {
  const mode = useSelector(selectTheme);
  const theme = createTheme(getDesignTokens(mode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          fontFamily: theme.typography.fontFamily,
          display: 'grid',
          height: '100vh',
          gridTemplateRows: '10vh auto 7vh',
          boxSizing: 'border-box',
        }}
      >
        <AppRouter />
      </Box>
    </ThemeProvider>
  );
};
