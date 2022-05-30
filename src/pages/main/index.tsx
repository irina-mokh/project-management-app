import { BoardList } from 'components/BoardList';
import { SearchBar } from 'components/Search';
import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { searchBoards, clearBoardsSearch } from 'store/boardList/reducer';
import { useTranslation } from 'react-i18next';

export const Main = () => {
  const { t } = useTranslation();
  //useTitle(routes.main.title);
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <h2 className="visually-hidden">Main page</h2>
      <Container>
        <SearchBar
          placeholder={t('searchBoardPlaceholder')}
          searchClear={() => dispatch(clearBoardsSearch())}
          searchHandler={(value) => dispatch(searchBoards(value))}
        />
        <BoardList />
      </Container>
    </>
  );
};
