import { useEffect, useState } from 'react';
import { AppDispatch } from 'store';
import { getBoard, getAllUsers } from 'store/board/actions';
import { useParams, useNavigate } from 'react-router-dom';
import { searchTasks, clearTasksSearch, toggleSearchFocus } from 'store/board/reducer';
import { Loading } from 'components/Loading';
import { selectBoard } from 'store/board/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { List, Card, Typography, Container, Breadcrumbs, Link, Box } from '@mui/material';
import { IColumn } from 'types';
import { AddButton } from 'components/AddButton';
import { CreateColumnModal, CreateTaskModal, EditTaskModal } from 'components/Modals';

import { useTitle } from 'hooks';
import { routes } from 'routes';
import { Column } from 'components/Column';
import { useTranslation } from 'react-i18next';
import { SearchBar } from 'components/Search';
// import { Box } from '@mui/system';

export const Board = () => {
  const { t } = useTranslation();
  useTitle(routes.board.title);
  const { id } = useParams();

  const { searchResults, data, isLoading, error, isSearchFocus } = useSelector(selectBoard);
  const [showModal, setShowModal] = useState(false);
  const columns: IColumn[] = data.columns;

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  // обновляем список доступных пользователей при загрузке доски
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getBoard(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(toggleSearchFocus(false));
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: '84vh',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 className="visually-hidden">Board page</h2>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',

          '@media(max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
          },
        }}
      >
        <Breadcrumbs aria-label="breadcrumbs" sx={{ margin: '5px 0' }}>
          <Link underline="hover" color="inherit" href="/">
            {t('homePage')}
          </Link>
          <Link underline="hover" color="inherit" href="/boards">
            {t('boardsPage')}
          </Link>
          <Typography color="text.primary">{`${t('board')}: ${data?.title}`}</Typography>
        </Breadcrumbs>
        <Box
          sx={{
            '@media(max-width: 600px)': {
              width: '100%',
            },
          }}
        >
          <SearchBar
            placeholder={t('searchTaskPlaceholder')}
            searchClear={() => dispatch(clearTasksSearch())}
            searchHandler={(value) => dispatch(searchTasks(value))}
          />
          {searchResults?.length > 0 && isSearchFocus && (
            <List
              sx={{
                position: 'absolute',
                width: '300px',
                // height: '100%',
                zIndex: '10',
                padding: '10px',
                backgroundColor: 'background.paper',
                border: '1px solid primary',
              }}
            >
              {searchResults.map((task) => (
                <Card
                  key={task.id}
                  onMouseDown={() =>
                    navigate(`/boards/${id}/?columnId=${task.columnId}&taskId=${task.id}`)
                  }
                  sx={{
                    cursor: 'pointer',
                    padding: '7px',
                  }}
                >
                  <Typography variant="h5" fontSize="1.2em" marginBottom="0.5em">
                    {task.title}
                  </Typography>
                  <Typography fontSize="0.9em" fontStyle="italic">
                    {task.description}
                  </Typography>
                </Card>
              ))}
            </List>
          )}
        </Box>
      </Box>
      <Typography variant="h3" color="primary" fontSize="1.8em" sx={{ margin: '0 0 5px 0' }}>
        {data?.title}
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflowX: 'scroll',
          overflowY: 'hidden',
          '&::-webkit-scrollbar': {
            height: 7,
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
        <List sx={{ display: 'flex', height: '100%' }}>
          {columns.map((column: IColumn) => (
            <Column column={column} boardId={String(id)} key={column.id} />
          ))}
          <Card sx={{ order: `${columns.length + 1}`, minWidth: '250px', padding: '10px' }}>
            <AddButton text={t('addNewColumn')} addHandler={() => setShowModal(true)} />
          </Card>
        </List>
      </Box>

      <CreateColumnModal boardId={id} isVisible={showModal} setVisible={setShowModal} />
      <CreateTaskModal boardId={id} />
      <EditTaskModal boardId={id} />
    </Container>
  );
};
