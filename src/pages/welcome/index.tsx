import { useTitle } from 'hooks';
import { routes } from 'routes';
//import { setPageTitle } from 'utils/setPageTitle';

export const Welcome = () => {
  useTitle(routes.welcome.title);
  return <div>Welcome page</div>;
};
