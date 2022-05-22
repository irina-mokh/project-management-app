import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { createColumn } from 'store/board/actions';
import { useParams } from 'react-router-dom';

interface ICreateColumn {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  columnId: string | undefined;
}

/*
Что должно быть в таске? 
Пользователь(член команды) может ставить задачи, выполнять задачи, просматривать задачи, удалять собственные задачи, быть ответственным (виноватым) в чужих задачах.

Для создания таска используется форма отображаемая в модальном окне.
Для создания колонки / таска используются формы, отображаемые в модальных окнах. 3 балла
Реализован функционал просмотра, и редактирования всего содержимого таски. 3 балла

Таск не может быть НЕ привязан к колонке.

POST
{
  "title": "Task: pet the cat",
  "description": "Domestic cat needs to be stroked gently",
  "userId": "40af606c-c0bb-47d1-bc20-a2857242cde3"
}
*/

export function TaskModal({ isVisible, setVisible, columnId }: ICreateColumn) {
  const dispatch: AppDispatch = useDispatch();

  const { id } = useParams();

  console.log(id);

  const [title, setTitle] = useState('');
  const [hasErrors, setHasErrors] = useState(false);
  const [responsible, setResponsible] = useState('');

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasErrors) return;

    //отправляем POST запрос с созданием колонки
    dispatch(
      createColumn({
        boardId: columnId || '', // ругается что в useParams может быть undefined, из-за этого приходится использовать так
        title: title,
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
        <DialogTitle>Create task</DialogTitle>

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

          <DialogContentText>Add description</DialogContentText>
          <TextField
            name="description"
            required
            multiline
            autoComplete="off"
            rows="3"
            value={'description'}
            onChange={handleChange}
            margin="dense"
            fullWidth
            variant="standard"
            error={hasErrors}
          ></TextField>

          <DialogContent>Add responsible</DialogContent>

          <Select
            value={responsible}
            onChange={() => setResponsible((event?.target as HTMLSelectElement).value)}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </DialogContent>

        <DialogActions>
          <Button type="submit" size="medium" variant="contained">
            Create task
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
