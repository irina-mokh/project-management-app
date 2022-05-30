import { TextField, Box, IconButton } from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { toggleSearchFocus } from 'store/board/reducer';

interface SearchProps {
  searchHandler: (value: string) => void;
  searchClear: () => void;
  placeholder: string;
}
export const SearchBar = (props: SearchProps) => {
  const [value, setValue] = useState('');
  const dispatch: AppDispatch = useDispatch();

  return (
    <Box minWidth="300px">
      <TextField
        variant="standard"
        type="text"
        placeholder={props.placeholder}
        aria-label={props.placeholder}
        size="medium"
        color="primary"
        fullWidth
        value={value}
        onChange={(e) => {
          if (e.target.value) {
            setValue(e.target.value);
          } else {
            setValue(e.target.value);
            props.searchHandler(value);
          }
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            props.searchHandler(value);
          }
        }}
        onFocus={() => {
          dispatch(toggleSearchFocus(true));
        }}
        onBlur={() => dispatch(toggleSearchFocus(false))}
        sx={{ mb: 1, mt: 1, ml: 'auto' }}
        InputProps={{
          startAdornment: (
            <IconButton aria-label="search" onClick={() => props.searchHandler(value)}>
              <Search />
            </IconButton>
          ),
          endAdornment: value && (
            <IconButton
              aria-label="clear search"
              onClick={() => {
                setValue('');
                props.searchClear();
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
