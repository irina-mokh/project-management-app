import { TextField, Box, IconButton } from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { searchBoards, clearSearch } from 'store/boardList/reducer';

export const SearchBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const [value, setValue] = useState('');
  return (
    <Box ml="auto" mb="1em" width="300px">
      <TextField
        variant="standard"
        type="text"
        placeholder="Search board"
        size="medium"
        color="primary"
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            dispatch(searchBoards(value));
          }
        }}
        sx={{ mb: 1, mt: 1, ml: 'auto' }}
        InputProps={{
          startAdornment: (
            <IconButton aria-label="search" onClick={() => dispatch(searchBoards(value))}>
              <Search />
            </IconButton>
          ),
          endAdornment: value && (
            <IconButton
              aria-label="clear search"
              onClick={() => {
                setValue('');
                dispatch(clearSearch());
              }}
            >
              <Clear />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};
