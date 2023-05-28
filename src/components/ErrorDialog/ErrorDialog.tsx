import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../hocs/AppProvider';

export default function ErrorDialog() {
  const { t } = useTranslation();
  const { openErrorDialog, errorMessage, closeErrorDialog } = useContext(AppContext);
  const handleClose = () => {
    closeErrorDialog();
  };
  const buttonStyle = {
    color: 'rgba(0, 0, 0, 0.87)',
    '&:focus': {
      outline: 'none',
    },
  };
  return (
    <div>
      <Dialog open={openErrorDialog} onClose={handleClose} aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title">{t('Something went wrong')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={buttonStyle} autoFocus onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
