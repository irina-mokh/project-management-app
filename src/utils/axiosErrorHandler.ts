import { routes } from 'routes';
import { store } from 'store';
import { expiredToken } from 'store/auth/reducer';

export function errorHandler(status?: number) {
  // добавляем информацию о наличии ошибки в query строку
  const urlParams = new URLSearchParams(window.location.search);
  const hasError = urlParams.get('fetch-failed');

  if (hasError) return;

  if (status) {
    if (status == 401) {
      store.dispatch(expiredToken());
      window.location.href = routes.welcome.path.toString();
      return;
    }

    urlParams.set('status', status.toString());
  }

  urlParams.set('fetch-failed', 'true');

  window.location.search = urlParams.toString();
}
