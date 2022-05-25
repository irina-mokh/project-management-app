import { useSelector } from 'react-redux';
import { Box, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { selectTheme } from 'store/theme/selectors';
import { getDesignTokens } from 'theme';
import { AppRouter } from 'routes';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

export const MainLayout = () => {
  const mode = useSelector(selectTheme);
  const theme = createTheme(getDesignTokens(mode));

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
        </Box>
      </DndProvider>
    </ThemeProvider>
  );
};
