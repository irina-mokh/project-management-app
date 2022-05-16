import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { createColumn } from 'store/board/actions';

interface ICreateColumn {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: string | undefined;
  orderIdx: number;
}

export function CreateColumn({ isVisible, setVisible, boardId, orderIdx }: ICreateColumn) {
  const dispatch: AppDispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [hasErrors, setHasErrors] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasErrors) return;

    //отправляем POST запрос с созданием колонки
    dispatch(
      createColumn({
        boardId: boardId || '',
        requestBody: {
          title: title,
          order: orderIdx,
        },
      })
    );

    // закрываем окошко
    handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;

    setTitle(value);
    setHasErrors(value.trim().length > 0 && value.trim().length < 3 ? true : false);
  };

  return (
    <Dialog open={isVisible} onClose={handleClose} maxWidth="sm" fullWidth={true}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add new column</DialogTitle>

        <DialogContent>
          <DialogContentText>Set title</DialogContentText>
          <TextField
            name="title"
            autoFocus
            required
            autoComplete="off"
            value={title}
            onChange={handleChange}
            margin="dense"
            fullWidth
            variant="standard"
            error={hasErrors}
          ></TextField>
        </DialogContent>

        <DialogActions>
          <Button type="submit" size="medium" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
