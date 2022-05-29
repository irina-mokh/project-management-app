import React from 'react';
import Button from '@mui/material/Button/Button';
import Dialog from '@mui/material/Dialog/Dialog';
import DialogActions from '@mui/material/DialogActions/DialogActions';
import DialogContent from '@mui/material/DialogContent/DialogContent';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';
import { useTranslation } from 'react-i18next';

export type ConfirmDialogPropsType = {
  confirmText: string;
  open: boolean;
  setOpen: (arg: boolean) => void;
  onConfirm: () => void;
};

export const ConfirmDialog = (props: ConfirmDialogPropsType) => {
  const { confirmText, open, setOpen, onConfirm } = props;
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
      sx={{ justifyContent: 'center' }}
    >
      <DialogTitle id="confirm-dialog">{t('confirmTitle')}</DialogTitle>
      <DialogContent>{confirmText}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          {t('confirmCancel')}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          {t('confirmAgree')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
