import { TextField, Box } from '@mui/material';

export const Search = () => {
  return (
    <Box ml="auto" mb="1em" width="300px">
      <TextField
        variant="standard"
        type="search"
        label="Search"
        size="medium"
        color="primary"
        fullWidth
        sx={{ mb: 1, mt: 1, ml: 'auto' }}
      />
    </Box>
  );
};
