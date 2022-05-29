export function errorHandler(status?: string) {
  // добавляем информацию о наличии ошибки в query строку
  const urlParams = new URLSearchParams(window.location.search);
  const hasError = urlParams.get('fetch-failed');

  if (hasError) return;

  urlParams.set('fetch-failed', 'true');
  if (status) urlParams.set('status', status);

  window.location.search = urlParams.toString();
}
