import Alert from '@mui/material/Alert/Alert';
import Snackbar from '@mui/material/Snackbar/Snackbar';

export type CustomSnackBarProps = {
  open: boolean;
  setOpen: (arg: boolean) => void;
  onClose: () => void;
  snackText: string;
};

export const CustomSnackBar = (props: CustomSnackBarProps) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={1000}
      onClose={props.onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ width: '50vw' }}
    >
      <Alert
        onClose={props.onClose}
        severity="success"
        sx={{ width: '100%', backgroundColor: '#009688', color: '#fff' }}
      >
        {props.snackText}
      </Alert>
    </Snackbar>
  );
};
