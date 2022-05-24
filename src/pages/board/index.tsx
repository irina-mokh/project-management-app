import { useEffect, useState } from 'react';
import { AppDispatch } from 'store';
import { useParams } from 'react-router-dom';
import { getBoard } from 'store/board/actions';
import { Loading } from 'components/Loading';
import { selectBoard } from 'store/board/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { List, Card, Typography, Container, Breadcrumbs, Link } from '@mui/material';
import { IColumn } from 'types';
import { AddButton } from 'components/AddButton';
import { CreateColumnModal } from 'components/Modals';

import { useTitle } from 'hooks';
import { routes } from 'routes';
import { Column } from 'components/Column';

export const Board = () => {
  useTitle(routes.board.title);
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, error } = useSelector(selectBoard);
  const columns: IColumn[] = data.columns;
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

  // console.log(`params id: ${id}`);

  return (
    <Container sx={{ width: '98vw', height: '83vh', padding: '5px' }}>
      <h2 className="visually-hidden">Board page</h2>
      <Breadcrumbs aria-label="breadcrumb" sx={{ margin: '5px 0' }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/boards">
          Boards
        </Link>
        <Typography color="text.primary">{`Board: ${data?.title}`}</Typography>
      </Breadcrumbs>
      <Typography variant="h3" color="primary" fontSize="1.8em" sx={{ margin: '10px 0 5px 0' }}>
        {data?.title}
      </Typography>
      <List
        sx={{
          width: '100%',
          height: '90%',
          display: 'flex',
          overflowX: 'scroll',
          '&::-webkit-scrollbar': {
            width: 7,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
            border: '1px solid #bdbdbd4D',
            borderRadius: 2,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdbdbdCC',
            borderRadius: 2,
          },
        }}
      >
        {columns.map((column: IColumn) => (
          <Column column={column} boardId={String(id)} key={column.id} />
        ))}
        <Card sx={{ order: `${columns.length + 1}`, minWidth: '250px', padding: '10px' }}>
          <AddButton text="add column" addHandler={() => setShowModal(true)} />
        </Card>
      </List>
      <CreateColumnModal
        boardId={id}
        isVisible={showModal}
        setVisible={setShowModal}
        orderIdx={columns.length}
      />
    </Container>
  );
};
