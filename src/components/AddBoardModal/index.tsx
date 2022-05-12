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
  const [name, setName] = useState('');
  const [hasErrors, setErrors] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (hasErrors) return;
    console.log(name);
    // отправляем POST запрос с созданием доски

    // закрываем окошко
    handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;

    // записываем ввод в стейт и сразу делаем валидацию
    setName(value);
    setErrors(value.length < 2 ? true : false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md">
      <DialogTitle>Name your board</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          onChange={handleChange}
          margin="dense"
          id="title"
          fullWidth
          variant="standard"
          error={hasErrors}
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
