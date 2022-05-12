import {
  Button,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  List,
  useTheme,
  Typography,
} from '@mui/material';
import { DeleteOutlined, AddCircleOutlineRounded } from '@mui/icons-material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from 'store';
import { getBoards } from 'store/boards/boardsSlice';
import { Loading } from 'components/Loading';
import { axios } from 'utils/axios';

// temp sign in
const signin = () => {
  axios.post('/signin', {
    login: 'user-007',
    password: 'pswrd123',
  });
};
// temp adding board
// const addBoard = () => {
//   axios.post('/boards', {
//     title: 'new board title',
//   });
// };

export const BoardList = () => {
  signin();
  // addBoard();
  const { data, isLoading, error } = useSelector((state: RootState) => state.boards);

  const dispatch: AppDispatch = useDispatch();
  let boards = null;

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);
  const theme = useTheme();

  if (data?.length) {
    boards = data?.map((item) => {
      const { id, title } = item;
      return (
        <Card
          variant="outlined"
          component="li"
          key={id}
          sx={{
            backgroundColor: theme.palette.primary.light,
            minHeight: 70,
          }}
        >
          <CardActionArea component={Link} to={`boards/${id}`}>
            <CardHeader
              title={title}
              // здесть стили не подтягиваются
              // sx={{ color: 'inherit' }}
              action={
                <IconButton aria-label="delete">
                  <DeleteOutlined sx={{ height: 24, width: 24 }} />
                </IconButton>
              }
            ></CardHeader>
            <CardContent>
              <Typography color={theme.palette.primary.contrastText} variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quas beatae esse
                quisquam ut soluta in, saepe suscipit sunt aliquid. Magni aliquam, similique a porro
                molestiae quia natus iusto inventore.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <List
      disablePadding
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1em',
      }}
    >
      {data?.length && boards}
      <Card>
        <Button
          startIcon={<AddCircleOutlineRounded />}
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          add board
        </Button>
      </Card>
    </List>
  );
};
