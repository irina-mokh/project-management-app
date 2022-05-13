import { setPageTitle } from 'utils/setPageTitle';
import { BoardList } from 'components/BoardList';
import { Search } from 'components/Search';
import { Container } from '@mui/material';
import { ThemeSwitcher } from 'components/ThemeSwitcher';

export const Main = () => {
  setPageTitle();
  return (
    <>
      <h2 className="visually-hidden">Main page</h2>
      <Container>
        <Search />
        <ThemeSwitcher />
        <BoardList></BoardList>
      </Container>
    </>
  );
};
