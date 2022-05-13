import { useEffect } from 'react';
import { AppDispatch } from 'store';
import { setPageTitle } from 'utils/setPageTitle';
// import { Loading } from 'components/Loading';
// import { selectBoard } from 'store/board/selectors';
import { useDispatch } from 'react-redux';
import { List, Card, Paper } from '@mui/material';

export const Board = () => {
  setPageTitle();
  // const { data, isLoading, error } = useSelector(selectBoard);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    // dispatch(getBoard());
  }, [dispatch]);

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
