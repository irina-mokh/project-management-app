import { useTitle } from 'hooks';
import { routes } from 'routes';
//import { setPageTitle } from 'utils/setPageTitle';

export const Board = () => {
  //setPageTitle();
  useTitle(routes.board.title);
  return <div>Board</div>;
};
