import { useTitle } from 'hooks';
import { routes } from 'routes';
//import { setPageTitle } from 'utils/setPageTitle';

export const Main = () => {
  useTitle(routes.main.title);
  return <div>Main page</div>;
};
