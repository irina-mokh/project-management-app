import { TextField, useTheme } from '@mui/material';

export const Search = () => {
  const { palette } = useTheme();
  return (
    <TextField
      type="search"
      variant="outlined"
      label="Search"
      size="medium"
      sx={{ color: 'inherit', borderColor: palette.background.paper, mb: 1 }}
    />
  );
};
