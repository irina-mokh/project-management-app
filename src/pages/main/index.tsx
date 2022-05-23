import { BoardList } from 'components/BoardList';
import { SearchBar } from 'components/Search';
import { Container } from '@mui/material';
import { routes } from 'routes';
import { useTitle } from 'hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { searchBoards, clearBoardsSearch } from 'store/boardList/reducer';

export const Main = () => {
  useTitle(routes.main.title);
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <h2 className="visually-hidden">Main page</h2>
      <Container>
        <SearchBar
          placeholder="Search board by title or description"
          searchClear={() => dispatch(clearBoardsSearch())}
          searchHandler={(value) => dispatch(searchBoards(value))}
        />
        <BoardList />
      </Container>
    </>
  );
};
