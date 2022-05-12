import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useState } from 'react';

export function AddBoardModal() {
  const [isOpen, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log('Hello world');
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md">
      <DialogTitle>Name your board</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          type="text"
          fullWidth
          variant="standard"
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button color="success" size="medium" variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
