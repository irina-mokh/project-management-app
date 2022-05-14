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
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { createBoard } from 'store/boards/actions';
import { ICreateBoardRequestFields } from 'types/index';

import { selectBoards } from 'store/boards/selectors';
import { boardsSlice } from 'store/boards/reducer';

const defaultRequestValues: ICreateBoardRequestFields = {
  title: '',
  description: '',
};

const defaultErrorsValues = {
  title: false,
  description: false,
};

export function CreateBoardModal() {
  // показ зависит от состояния глобального стора
  const { hasModal } = useSelector(selectBoards);
  const { toggleModal } = boardsSlice.actions;
  const dispatch: AppDispatch = useDispatch();

  const [boardRequestFields, setBoardRequestFields] = useState(defaultRequestValues);
  const [hasErrors, setHasErrors] = useState(defaultErrorsValues);

  const handleClose = () => {
    dispatch(toggleModal());
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
        <DialogTitle>Create new board</DialogTitle>

        <DialogContent>
          <DialogContentText>Add name</DialogContentText>
          <TextField
            name="title"
            autoFocus
            required
            value={boardRequestFields.title}
            onChange={handleChange}
            margin="dense"
            fullWidth
            variant="standard"
            error={hasErrors.title && boardRequestFields.title.length > 0}
          ></TextField>

          <DialogContentText>Add description</DialogContentText>
          <TextField
            name="description"
            required
            multiline
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
          <Button type="submit" color="success" size="medium" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
