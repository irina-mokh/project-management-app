import { BoardList } from 'components/BoardList';
import { Search } from 'components/Search';
import { Container } from '@mui/material';
import { ThemeSwitcher } from 'components/ThemeSwitcher';
import { CreateBoardModal } from 'components/Modals';
import { routes } from 'routes';
import { useTitle } from 'hooks';

export const Main = () => {
  //setPageTitle();
  useTitle(routes.main.title);
  return (
    <>
      <h2 className="visually-hidden">Main page</h2>
      <Container>
        <Search />
        <ThemeSwitcher />
        <CreateBoardModal />
        <BoardList />
      </Container>
    </>
  );
};
