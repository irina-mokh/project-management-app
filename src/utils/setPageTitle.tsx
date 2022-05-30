import { routes } from 'routes';

export const setPageTitle = () => {
  const curLoc = location.pathname.slice(1);
  const curRoute = Object.values(routes).find((item) => {
    if (item.path === curLoc) {
      return item;
    } else if (item.path.startsWith('boards')) {
      return item;
    }
  });
  if (curRoute) {
    document.title = curRoute.title;
  }
};
