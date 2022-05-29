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
import { useSearchParams } from 'react-router-dom';

export function CreateTaskModal({ boardId }: { boardId: string | undefined }) {
  const dispatch: AppDispatch = useDispatch();
  const usersList = useSelector(selectBoard).usersList;

  const useresListElement = usersList.map(function (user, idx) {
    return (
      <MenuItem value={user.id} key={idx}>
        {user.name}
      </MenuItem>
    );
  });

  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const hasModal = searchParams.has('columnId') && searchParams.has('create-task');
  const columnId = searchParams.get('columnId') || '';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');
  const [hasSelectError, setHasSelectError] = useState(false);
  const [hasErrors, setHasErrors] = useState({
    title: true,
    description: true,
  });

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
          boardId: boardId || '',
          columnId,
        },
        data: {
          title,
          description,
          userId: responsible,
        },
      })
    );

    handleClose();
  };

  const handleClose = () => {
    // обнуляем строку с именем и закрываем окошко
    setTitle('');
    setDescription('');
    setResponsible('');

    searchParams.delete('create-task');
    searchParams.delete('columnId');
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
