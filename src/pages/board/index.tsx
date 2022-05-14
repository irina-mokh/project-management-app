import { useTitle } from 'hooks';
import { routes } from 'routes';
//import { setPageTitle } from 'utils/setPageTitle';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { boardsSlice } from 'store/boards/reducer';

import { CreateBoardModal } from 'components/CreateBoardModal';
import { BoardList } from 'components/BoardList';

export const Board = () => {
  //setPageTitle();
  useTitle(routes.board.title);

  // по клику на кнопку переключаем состояние показа модального окна
  const { toggleModal } = boardsSlice.actions;
  const dispatch: AppDispatch = useDispatch();

  const clickHandler = () => {
    dispatch(toggleModal());
  };

  return (
    <>
      <button onClick={clickHandler}>Add new board!</button>
      <CreateBoardModal />
      <BoardList />
    </>
  );
};
