import { setPageTitle } from 'utils/setPageTitle';
import { BoardList } from 'components/BoardList';
import { Search } from 'components/Search';
import { Container } from '@mui/material';

export const Main = () => {
  setPageTitle();
  return (
    <>
      <h2 className="visually-hidden">Main page</h2>
      <Container>
        <Search />
        <BoardList></BoardList>
      </Container>
    </>
  );
};
