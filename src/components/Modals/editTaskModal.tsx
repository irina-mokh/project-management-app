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
import { updateTask } from 'store/board/actions';
import { selectBoard } from 'store/board/selectors';
import { useSearchParams } from 'react-router-dom';

export function EditTaskModal({ boardId }: { boardId: string | undefined }) {
  const dispatch: AppDispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const hasModal = searchParams.has('taskId');
  const taskId = searchParams.get('taskId');
  const columnId = searchParams.get('columnId');

  const boardDetails = useSelector(selectBoard);

  // список пользователей для возможности назначить таск
  const useresListElement = boardDetails.usersList.map(function (user, idx) {
    return (
      <MenuItem value={user.id} key={idx}>
        {user.name}
      </MenuItem>
    );
  });

  const column = boardDetails.data.columns.find((col) => col.id === columnId);
  const taskDetails = column?.tasks.find((task) => task.id == taskId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');

  useEffect(() => {
    if (!taskDetails) return;

    setTitle(taskDetails.title);
    setDescription(taskDetails.description);
    setResponsible(taskDetails.userId);
  }, [taskDetails]);

  const [hasErrors, setHasErrors] = useState({
    title: true,
    description: true,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasErrors.title || hasErrors.description) return;

    //отправляем PUT запрос с обновлением таска
    dispatch(
      updateTask([
        {
          title: title,
          order: taskDetails?.order || 1,
          description: description,
          userId: responsible,
          boardId: boardId || '',
          columnId: columnId || '',
        },
        taskId || '',
        columnId || '',
      ])
    );

    // обнуляем строку с именем и закрываем окошко
    handleClose();
  };

  // для закрытия обнуляем значения в values и удаляем query param из строки
  const handleClose = () => {
    setTitle('');
    setDescription('');
    setResponsible('');

    searchParams.delete('columnId');
    searchParams.delete('taskId');
    setSearchParams(searchParams);
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
    <Dialog open={hasModal} onClose={handleClose} maxWidth="sm" fullWidth={true}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit task</DialogTitle>

        <DialogContent>
          <DialogContentText>Title</DialogContentText>
          <TextField
            name="title"
            required
            autoComplete="off"
            value={title}
            onChange={handleChange}
            margin="dense"
            fullWidth
            variant="standard"
            error={title.length > 0 && hasErrors.title}
          ></TextField>

          <DialogContentText sx={{ mt: 2 }}>Description</DialogContentText>
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

          <DialogContentText sx={{ mt: 2, mb: 2 }}>Responsible</DialogContentText>
          <Select
            sx={{ minWidth: 120 }}
            value={responsible}
            variant="standard"
            onChange={(event: SelectChangeEvent) => {
              setResponsible(event.target.value as string);
            }}
          >
            {useresListElement}
          </Select>
        </DialogContent>

        <DialogActions>
          <Button type="submit" size="medium" variant="contained">
            Confirm changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
