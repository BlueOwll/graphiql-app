import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
type ErrorDialogProps = {
  openErrorDialog: boolean;
  errorMessage: string | null;
  setOpenErrorDialog: (arg: boolean) => void;
  setErrorMessage: (arg: null | string) => void;
};
export default function ErrorDialog(props: ErrorDialogProps) {
  const handleClose = () => {
    props.setOpenErrorDialog(false);
    props.setErrorMessage(null);
  };

  return (
    <div>
      <Dialog open={props.openErrorDialog} onClose={handleClose} aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title">{'Something went wrong'}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
