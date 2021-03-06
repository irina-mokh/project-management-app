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
      autoHideDuration={2000}
      onClose={props.onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        width: '50vw',
        '@media (min-width: 320px)': {
          width: '70vw',
          top: '24px',
          left: '50%',
          right: 'auto',
          transform: 'translateX(-50%)',
        },
      }}
    >
      <Alert
        onClose={props.onClose}
        sx={{
          width: '100%',
          backgroundColor: '#009688',
          color: '#fff',
          '& .MuiAlert-icon': {
            color: '#fff',
          },
        }}
      >
        {props.snackText}
      </Alert>
    </Snackbar>
  );
};
