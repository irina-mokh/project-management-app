import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  List,
  useTheme,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { getBoards, deleteBoard } from 'store/boardList/actions';
import { selectBoardList } from 'store/boardList/selectors';
import { Loading } from 'components/Loading';
import { AddButton } from 'components/AddButton';
import { DeleteButton } from 'components/DeleteButton';
import { IBoard } from 'types';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const BoardList = () => {
  const { t } = useTranslation();
  const { isLoading, error, boardsOnClient } = useSelector(selectBoardList);

  const dispatch: AppDispatch = useDispatch();
  let boards = null;

  const [searchParams, setSearchParams] = useSearchParams();

  const addBoardHandler = () => {
    // добавляем в url search параметр create-modal
    searchParams.set('create-board', 'true');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);
  const { palette } = useTheme();

  if (boardsOnClient?.length) {
    boards = boardsOnClient?.map((item: IBoard) => {
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
          <DeleteButton
            confirmText={t('confirmTextButton')}
            deleteHandler={() => dispatch(deleteBoard(id))}
          />
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
      {boardsOnClient?.length > 0 && boards}
      <AddButton text={t('addBoard')} addHandler={addBoardHandler} />
    </List>
  );
};
