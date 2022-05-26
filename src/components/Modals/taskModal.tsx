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
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

interface ICreateTask {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  columnId: string | undefined;
}

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
  const { t } = useTranslation();

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
        <DialogTitle>{t('createTask')}</DialogTitle>

        <DialogContent>
          <DialogContentText>{t('setTitle')}</DialogContentText>
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

          <DialogContentText sx={{ mt: 2 }}>{t('setDescription')}</DialogContentText>
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

          <DialogContentText sx={{ mt: 2, mb: 2 }}>{t('setResponsible')}</DialogContentText>
          <Select
            sx={{ minWidth: 120 }}
            error={hasSelectError}
            value={responsible}
            displayEmpty
            variant="standard"
            renderValue={responsible !== '' ? undefined : () => <MenuItem>{t('select')}</MenuItem>}
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
            {t('createTask')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
