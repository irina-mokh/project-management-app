import { Paper, Typography } from '@mui/material';
import { DeleteButton } from 'components/DeleteButton';
import { ITask } from 'types';
import { useDispatch } from 'react-redux';
import { deleteTask } from 'store/board/actions';
import { AppDispatch } from 'store';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

interface ITaskProps {
  columnId: string;
  boardId: string;
  task: ITask;
}
export const Task = (props: ITaskProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { task, columnId, boardId } = props;
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const editTaskHandler = () => {
    // добавляем в url id колонки и таска
    searchParams.set('columnId', columnId);
    searchParams.set('taskId', task.id);
    setSearchParams(searchParams);
  };

  return (
    <Paper
      component="li"
      onClick={editTaskHandler}
      sx={{
        margin: '10px 0',
        padding: '10px',
        position: 'relative',
      }}
    >
      <Typography variant="h5">{task.title}</Typography>
      <Typography>{task.description}</Typography>
      <DeleteButton
        confirmText={t('deleteTask')}
        deleteHandler={() => dispatch(deleteTask([boardId, columnId, task.id]))}
      />
    </Paper>
  );
};
