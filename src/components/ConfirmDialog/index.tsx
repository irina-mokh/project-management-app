import React from 'react';
import Button from '@mui/material/Button/Button';
import Dialog from '@mui/material/Dialog/Dialog';
import DialogActions from '@mui/material/DialogActions/DialogActions';
import DialogContent from '@mui/material/DialogContent/DialogContent';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';

export type ConfirmDialogPropsType = {
  elemToDelete: string;
  open: boolean;
  setOpen: (arg: boolean) => void;
  onConfirm: () => void;
};
export const ConfirmDialog = (props: ConfirmDialogPropsType) => {
  const { elemToDelete, open, setOpen, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
      sx={{ justifyContent: 'center' }}
    >
      <DialogTitle id="confirm-dialog">
        <h4>Confirm your decision</h4>
      </DialogTitle>
      <DialogContent>
        {elemToDelete === 'signout' ? ' Sign out?' : `Delete this ${elemToDelete}?`}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          No, cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
