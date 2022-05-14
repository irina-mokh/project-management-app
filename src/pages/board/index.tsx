import { useTitle } from 'hooks';
import { routes } from 'routes';
//import { setPageTitle } from 'utils/setPageTitle';
import { CreateBoardModal } from 'components/CreateBoardModal';
import { BoardList } from 'components/BoardList';

export const Board = () => {
  //setPageTitle();
  useTitle(routes.board.title);

  return (
    <>
      <CreateBoardModal />
      <BoardList />
    </>
  );
};
