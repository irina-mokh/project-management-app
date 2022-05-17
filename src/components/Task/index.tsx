import { Paper, Typography } from '@mui/material';
import { DeleteButton } from 'components/DeleteButton';
import { ITask } from 'types';
import { useDispatch } from 'react-redux';
import { deleteTask } from 'store/board/actions';
import { AppDispatch } from 'store';

interface ITaskProps {
  columnId: string;
  boardId: string;
  task: ITask;
}
export const Task = (props: ITaskProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { task, columnId, boardId } = props;
  return (
    <Paper
      component="li"
      sx={{
        margin: '10px 0',
        padding: '10px',
        position: 'relative',
      }}
    >
      <Typography variant="h5">{task.title}</Typography>
      <Typography>{task.description}</Typography>
      <DeleteButton
        confirmText="Delete a task?"
        deleteHandler={() => dispatch(deleteTask([boardId, columnId, task.id]))}
      />
    </Paper>
  );
};
