import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store';
import { createTask } from 'store/board/actions';
import { selectBoard } from 'store/board/selectors';
import { useParams } from 'react-router-dom';

interface ICreateTask {
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

export function TaskModal({ isVisible, setVisible, columnId }: ICreateTask) {
  const dispatch: AppDispatch = useDispatch();
  const usersList = useSelector(selectBoard).usersList;

  const useresListElement = usersList.map(function (user, idx) {
    return (
      <MenuItem value={user.id} key={idx}>
        {user.name}
      </MenuItem>
    );
  });

  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');
  const [hasSelectError, setHasSelectError] = useState(false);
  const [hasErrors, setHasErrors] = useState({
    title: true,
    description: true,
  });

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasErrors.title || hasErrors.description) return;

    if (responsible == '') {
      setHasSelectError(true);
      return;
    }

    //отправляем POST запрос с созданием колонки
    dispatch(
      createTask({
        url: {
          boardId: id || '',
          columnId: columnId || '',
        },
        data: {
          title: title,
          description: description,
          userId: responsible,
        },
      })
    );

    // обнуляем строку с именем и закрываем окошко
    setTitle('');
    setDescription('');
    setResponsible('');
    handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    target.name == 'title' ? setTitle(value) : setDescription(value);
  };

  useEffect(() => {
    setHasErrors({
      title: title.trim().length < 3 ? true : false,
      description: description.trim().length < 3 ? true : false,
    });
  }, [title, description]);

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
            error={title.length > 0 && hasErrors.title}
          ></TextField>

          <DialogContentText sx={{ mt: 2 }}>Add description</DialogContentText>
          <TextField
            name="description"
            required
            multiline
            autoComplete="off"
            rows="3"
            value={description}
            onChange={handleChange}
            margin="dense"
            fullWidth
            variant="standard"
            error={description.length > 0 && hasErrors.description}
          ></TextField>

          <DialogContentText sx={{ mt: 2, mb: 2 }}>Add responsible</DialogContentText>
          <Select
            sx={{ minWidth: 120 }}
            error={hasSelectError}
            value={responsible}
            displayEmpty
            variant="standard"
            renderValue={responsible !== '' ? undefined : () => <MenuItem>Select</MenuItem>}
            onChange={(event: SelectChangeEvent) => {
              setResponsible(event.target.value as string);
              setHasSelectError(false);
            }}
          >
            {useresListElement}
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
