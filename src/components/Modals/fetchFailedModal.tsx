import { Popover, Box } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function FetchFailedModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const isOpen = searchParams.has('fetch-failed');

  const handleClose = () => {
    searchParams.delete('status');
    searchParams.delete('fetch-failed');
    setSearchParams(searchParams);
  };

  const memoizedHandleClose = useCallback(handleClose, [searchParams, setSearchParams]);

  // если компонент открыт - ставим таймер на закрытие в 1.5 сек.
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(memoizedHandleClose, 1500);
    // При ручном закрытии компонента handleClose и так выполняется, таймер убираем
    return () => {
      clearTimeout(timer);
    };
  }),
    [memoizedHandleClose, isOpen];

  // выбираем сообщение для ошибки
  const setMessage = () => {
    if (!isOpen) return;

    const status = searchParams.get('status');

    if (status == null) return t('unknownErrorHappened');

    const statusCode = parseInt(status, 10);

    switch (true) {
      case status === 'undefined':
        return t('unknownErrorHappened');
      case statusCode == 400:
        return t('badRequest');
      case statusCode == 401:
        return t('authentificationError');
      case statusCode == 403:
        return t('authorizationError');
      case statusCode >= 402 && statusCode <= 499:
        return t('userError');
      case statusCode >= 500:
        return t('serverError');
      default:
        return t('fetchFailedMessage');
    }
  };

  const message = setMessage();

  return (
    <Popover
      open={isOpen}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 100, left: 100 }}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
    >
      <Box
        sx={{
          padding: 1.5,
        }}
      >
        {message}
      </Box>
    </Popover>
  );
}
