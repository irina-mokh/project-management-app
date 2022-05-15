import {
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  List,
  useTheme,
  Typography,
} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { getBoards, deleteBoard } from 'store/boardList/actions';
import { toggleModal } from 'store/boardList/reducer';
import { selectBoardList } from 'store/boardList/selectors';
import { Loading } from 'components/Loading';
import { axiosClient } from 'utils/axios';
import { AddButton } from 'components/AddButton';

// temp sign in
const signin = () => {
  axiosClient.post('/signin', {
    login: 'mokh-user',
    password: '07007pswrd',
  });
};

// interface IAddBoard {
//   addBoard?: () => void;
// }

export const BoardList = () => {
  signin();
  const { data, isLoading, error } = useSelector(selectBoardList);
  const dispatch: AppDispatch = useDispatch();
  let boards = null;

  const addBoardHandler = () => {
    dispatch(toggleModal());
  };

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);
  const { palette } = useTheme();

  if (data?.length) {
    boards = data?.map((item) => {
      const { id, title, description } = item;
      return (
        <Card
          variant="outlined"
          component="li"
          key={id}
          sx={{
            backgroundColor: palette.background.paper,
            minHeight: 70,
            position: 'relative',
          }}
        >
          <CardActionArea component={Link} to={`${id}`}>
            <CardHeader title={title} />
            <CardContent>
              <Typography variant="body2">{description}</Typography>
            </CardContent>
          </CardActionArea>
          <IconButton
            aria-label="delete"
            sx={{ position: 'absolute', right: 0, bottom: 0 }}
            onClick={() => dispatch(deleteBoard(id))}
          >
            <DeleteOutlined color="error" sx={{ height: 20, width: 20, zIndex: 5 }} />
          </IconButton>
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
      <AddButton text="add board" addHandler={addBoardHandler} />
    </List>
  );
};
