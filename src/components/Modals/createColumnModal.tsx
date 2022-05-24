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
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { createColumn } from 'store/board/actions';

interface ICreateColumn {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: string | undefined;
  orderIdx: number;
}

export function CreateColumnModal({ isVisible, setVisible, boardId, orderIdx }: ICreateColumn) {
  const dispatch: AppDispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [hasErrors, setHasErrors] = useState(false);

  const { t } = useTranslation();

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasErrors) return;

    //отправляем POST запрос с созданием колонки
    dispatch(
      createColumn({
        boardId: boardId || '', // ругается что в useParams может быть undefined, из-за этого приходится использовать так
        requestBody: {
          title: title,
          order: orderIdx,
        },
      })
    );

    // обнуляем строку с именем и закрываем окошко
    setTitle('');
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
        <DialogTitle>{t('addNewColumn')}</DialogTitle>

        <DialogContent>
          <DialogContentText>{t('addTitleColumn')}</DialogContentText>
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
            {t('submit')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
