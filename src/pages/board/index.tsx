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
import { useTranslation } from 'react-i18next';

export const Board = () => {
  useTitle(routes.board.title);
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, error } = useSelector(selectBoard);
  const columns: IColumn[] = data ? data.columns : [];

  const dispatch: AppDispatch = useDispatch();

  const { t } = useTranslation();

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
      <h2 className="visually-hidden">Board page</h2>
      <Breadcrumbs aria-label="breadcrumb" sx={{ margin: '5px 0' }}>
        <Link underline="hover" color="inherit" href="/">
          {t('homePage')}
        </Link>
        <Link underline="hover" color="inherit" href="/boards">
          {t('boardsPage')}
        </Link>
        <Typography color="text.primary">{`${t('board')}: ${data?.title}`}</Typography>
      </Breadcrumbs>
      <Typography variant="h3" color="primary" fontSize="1.8em" sx={{ margin: '10px 0 5px 0' }}>
        {data?.title}
      </Typography>
      <List sx={{ width: '100%', height: '90%', display: 'flex' }}>
        {columns.map((column: IColumn) => (
          <Column column={column} boardId={String(id)} key={column.id} />
        ))}
        <Card sx={{ minWidth: '300px', padding: '10px' }}>
          <AddButton text={t('addNewColumn')} addHandler={() => setShowModal(true)} />
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
