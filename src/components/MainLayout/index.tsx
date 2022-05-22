import { useSelector } from 'react-redux';
import { Box, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { selectTheme } from 'store/theme/selectors';
import { getDesignTokens } from 'theme';
import { AppRouter } from 'routes';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const MainLayout = () => {
  const mode = useSelector(selectTheme);
  const theme = createTheme(getDesignTokens(mode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
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
      </DndProvider>
    </ThemeProvider>
  );
};
