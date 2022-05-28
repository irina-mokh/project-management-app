import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function FetchFailedModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const isOpen = searchParams.has('fetch-failed');

  const handleClose = () => {
    searchParams.delete('fetch-failed');
    setSearchParams(searchParams);
  };

  const memoizedHandleClose = useCallback(handleClose, [searchParams, setSearchParams]);

  // если компонент открыт - ставим таймер на закрытие в 3 сек.
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(memoizedHandleClose, 3000);
    // При ручном закрытии компонента handleClose и так выполняется, таймер убираем
    return () => {
      clearTimeout(timer);
    };
  }),
    [memoizedHandleClose, isOpen];

  return (
    <Dialog open={isOpen} onClose={memoizedHandleClose}>
      <DialogTitle>{t('error')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('fetchFailedMessage')}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
