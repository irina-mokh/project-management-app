import { BoardList } from 'components/BoardList';
import { Search } from 'components/Search';
import { Container } from '@mui/material';
import { routes } from 'routes';
import { useTitle } from 'hooks';

export const Main = () => {
  useTitle(routes.main.title);

  return (
    <>
      <h2 className="visually-hidden">Main page</h2>
      <Container>
        <Search />
        <BoardList />
      </Container>
    </>
  );
};
