import { TextField, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Search = () => {
  const { t } = useTranslation();
  return (
    <Box ml="auto" mb="1em" width="300px">
      <TextField
        variant="standard"
        type="search"
        label={t('search')}
        size="medium"
        color="primary"
        fullWidth
        sx={{ mb: 1, mt: 1, ml: 'auto' }}
      />
    </Box>
  );
};
