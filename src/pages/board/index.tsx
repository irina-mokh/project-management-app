import { useEffect } from 'react';
import { AppDispatch } from 'store';
import { setPageTitle } from 'utils/setPageTitle';
import { useParams } from 'react-router-dom';
import { getBoard } from 'store/board/actions';
import { Loading } from 'components/Loading';
import { selectBoard } from 'store/board/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { List, Card, Paper, Typography, Box } from '@mui/material';
import { Column, Task } from 'types';
import { AddButton } from 'components/AddButton';

export const Board = () => {
  setPageTitle();
  const { id } = useParams();

  const { data, isLoading, error } = useSelector(selectBoard);
  let columns: Column[] = [];
  if (data) {
    columns = data.columns;
  }
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getBoard(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <>{error}</>;
  }
  return (
    <Box sx={{ width: '100%', height: '83vh', padding: '5px' }}>
      <Typography variant="h3" color="primary" fontSize="1.8em">
        {data?.title}
      </Typography>
      <List sx={{ width: '100%', height: '100%', display: 'flex' }}>
        {columns.map((column: Column) => (
          <Card
            component="li"
            key={column.id}
            sx={{ marginRight: '10px', height: '100%', minWidth: '300px' }}
          >
            <Typography
              variant="h4"
              sx={{
                borderBottom: 2,
                borderColor: 'palette.primary',
                fontSize: '1.5em',
                marginBottom: '10px',
              }}
            >
              {column.title}
            </Typography>
            <List
              sx={{
                width: 300,
                height: '90%',
                overflowY: 'scroll',
              }}
            >
              {column.tasks.map((task: Task) => (
                <Paper component="li" key={task.id} sx={{ margin: '10px 0', padding: '10px' }}>
                  <Typography variant="h5">{task.title}</Typography>
                  <Typography>{task.description}</Typography>
                </Paper>
              ))}
              <AddButton text="add task" />
            </List>
          </Card>
        ))}
        <Card sx={{ minWidth: '300px', padding: '10px' }}>
          <AddButton text="add column" />
        </Card>
      </List>
    </Box>
  );
};
