import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { createBoard } from 'store/boardList/actions';
import { ICreateBoardFields } from 'types/index';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const defaultRequestValues: ICreateBoardFields = {
  title: '',
  description: '',
};

const defaultErrorsValues = {
  title: false,
  description: false,
};

export function CreateBoardModal() {
  // показ зависит от состояния глобального стора
  const dispatch: AppDispatch = useDispatch();

  const [boardRequestFields, setBoardRequestFields] = useState(defaultRequestValues);
  const [hasErrors, setHasErrors] = useState(defaultErrorsValues);
  const [searchParams, setSearchParams] = useSearchParams();

  const { t } = useTranslation();

  // показ зависит от queryParams. Если есть create-modal - показываем
  const hasModal = searchParams.has('create-board');

  // для закрытия удаляем query param из строки
  const handleClose = () => {
    searchParams.delete('create-board');
    setSearchParams(searchParams);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasErrors.title || hasErrors.description) return;

    const { title, description } = boardRequestFields;

    //отправляем POST запрос с созданием доски
    dispatch(
      createBoard({
        title: title.trim(),
        description: description.trim(),
      })
    );

    // возвращаем дефолтные значения (reset)
    setBoardRequestFields(defaultRequestValues);

    // закрываем окошко
    handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { value, name } = target;

    // смотрим, откуда получили значения и выставляем значения
    setBoardRequestFields({
      title: name == 'title' ? value : boardRequestFields.title,
      description: name == 'description' ? value : boardRequestFields.description,
    });
  };

  // валидация значений
  useEffect(() => {
    // в самих компонентах ошибки показываем только если пользователь что-то ввёл в это поле
    setHasErrors({
      title: boardRequestFields.title.trim().length < 3,
      description: boardRequestFields.description.trim().length < 3,
    });
  }, [boardRequestFields]);

  return (
    <Dialog open={hasModal} onClose={handleClose} maxWidth="sm" fullWidth={true}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{t('createNewBoard')}</DialogTitle>

        <DialogContent>
          <DialogContentText>{t('addBoardName')}</DialogContentText>
          <TextField
            name="title"
            autoFocus
            required
            autoComplete="off"
            value={boardRequestFields.title}
            onChange={handleChange}
            margin="dense"
            fullWidth
            variant="standard"
            error={hasErrors.title && boardRequestFields.title.length > 0}
          ></TextField>

          <DialogContentText>{t('addBoarddescription')}</DialogContentText>
          <TextField
            name="description"
            required
            multiline
            autoComplete="off"
            rows="3"
            value={boardRequestFields.description}
            onChange={handleChange}
            margin="dense"
            fullWidth
            variant="standard"
            error={hasErrors.description && boardRequestFields.description.length > 0}
          ></TextField>
        </DialogContent>

        <DialogActions>
          <Button type="submit" size="medium" variant="contained">
            {t('createNewBoard')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
