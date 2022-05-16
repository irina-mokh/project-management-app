import { DeleteOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface IDeleteButtonProps {
  // use in confirmation modal
  confirmText: string;

  deleteHandler: () => void;
}
export const DeleteButton = (props: IDeleteButtonProps) => {
  const { deleteHandler } = props;
  return (
    <IconButton
      aria-label="delete"
      sx={{ position: 'absolute', right: 0, top: 0 }}
      onClick={deleteHandler}
      // onClick={ () => setConfirmOpen(true) }
    >
      <DeleteOutlined color="error" sx={{ height: 20, width: 20, zIndex: 5 }} />
    </IconButton>
    // <ConfirmationModal
    //   open={confirmOpen}
    //   setOpen={setConfirmOpen}
    //   title={confirmText} onConfirm={deleteHandler}
    // >
    // </ConfirmationModal>
  );
};
