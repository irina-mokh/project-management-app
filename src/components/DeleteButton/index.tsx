import { Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { useState } from 'react';

interface IDeleteButtonProps {
  // use in confirmation modal
  confirmText: string;

  deleteHandler: () => void;
}

export const DeleteButton = (props: IDeleteButtonProps) => {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const { deleteHandler, confirmText } = props;

  return (
    <>
      <IconButton
        name="delete"
        aria-label="delete"
        sx={{ position: 'absolute', right: 0, top: 0 }}
        //onClick={deleteHandler}
        onClick={() => setConfirmOpen(true)}
      >
        <Clear
          sx={{
            height: 14,
            width: 14,
            zIndex: 5,
            color: 'gray',
            '&:hover': {
              color: '#e84b1c',
            },
          }}
        />
      </IconButton>
      <ConfirmDialog
        open={confirmOpen}
        setOpen={setConfirmOpen}
        confirmText={confirmText}
        onConfirm={deleteHandler}
      ></ConfirmDialog>
    </>
  );
};
