import { useEffect, useState } from 'react';
import { AppDispatch } from 'store';
import { useParams } from 'react-router-dom';
import { getBoard } from 'store/board/actions';
import { Loading } from 'components/Loading';
import { selectBoard } from 'store/board/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { List, Card, Typography, Container } from '@mui/material';
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
  const columns: IColumn[] = data ? data.columns : [];

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

  console.log(`params id: ${id}`);

  return (
    <Container sx={{ width: '100%', height: '83vh', padding: '5px' }}>
      <Typography variant="h3" color="primary" fontSize="1.8em">
        {data?.title}
      </Typography>
      <List sx={{ width: '100%', height: '100%', display: 'flex' }}>
        {columns.map((column: IColumn) => (
          <Column column={column} boardId={String(id)} key={column.id} />
        ))}
        <Card sx={{ minWidth: '300px', padding: '10px' }}>
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
