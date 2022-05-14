import { useEffect } from 'react';
import { AppDispatch } from 'store';
import { setPageTitle } from 'utils/setPageTitle';
import { useParams } from 'react-router-dom';
import { getBoard } from 'store/board/actions';
// import { Loading } from 'components/Loading';
// import { selectBoard } from 'store/board/selectors';
import { useDispatch } from 'react-redux';
import { List, Card, Paper } from '@mui/material';
import { axiosClient } from 'utils/axios';

// temp adding column
const addColumn = async (title: string, order: number) => {
  const boardId = localStorage.getItem('boardId');
  const response = await axiosClient.post(`boards/${boardId}/column`, {
    title: title,
    order: order,
  });
  console.log(response);
  localStorage.setItem('columnId', response.data.id);
};

// temp adding task
const addTask = async (title: string, order: number, description: string) => {
  const boardId = localStorage.getItem('boardId');
  const columnId = localStorage.getItem('columnId');
  const userId = localStorage.getItem('userId');
  const response = await axiosClient.post(`boards/${boardId}/columns/${columnId}`, {
    title: title,
    order: order,
    description: description,
    userId: userId,
  });
  console.log(response);
  localStorage.setItem('taskId', response.data.id);
};

export const Board = () => {
  setPageTitle();
  const { id } = useParams();
  addColumn('Board component', 1);
  addTask('Basic layout', 1, 'create basic structure of page');
  addTask('Fetching board data', 2, 'get and render board info');

  addColumn('Column component', 2);
  addTask('Render data', 1, 'get and render column info');

  addColumn('Task component', 3);
  addTask('Render data', 1, 'get and render task info');
  addTask('Drag&Droop', 1, 'implement changing order or column for task');
  addTask('Make task Done', 1, 'add button for mark Done');
  // const { data, isLoading, error } = useSelector(selectBoard);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getBoard(id));
    }
  }, [id, dispatch]);

  // const { palette } = useTheme();
  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (error) {
  //   return <>{error}</>;
  // }
  return (
    <Paper sx={{ width: '100%', height: '100%' }}>
      {/* COLUMNS */}
      <List sx={{ width: '100%', height: '100%', overflow: 'scroll', display: 'flex' }}>
        {/* TASKS */}
        <List sx={{ width: 300, height: '100%', overflow: 'scroll' }}>
          <Card>Task</Card>
          <Card>Task</Card>
        </List>
        <List sx={{ width: 300, height: '100%', overflow: 'scroll' }}>
          <Card>Task</Card>
          <Card>Task</Card>
        </List>
      </List>
    </Paper>
  );
};
