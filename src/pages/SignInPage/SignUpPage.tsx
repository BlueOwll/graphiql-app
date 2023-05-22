import Avatar from '@mui/material/Avatar';
import style from './SignPage.module.scss';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import SignForm from './SignForm';
import { useEffect, useState } from 'react';
import { CircularProgress, Grid, Snackbar, Typography } from '@mui/material';

export default function SignUp() {
  const { t } = useTranslation();
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const handleSignUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signup(email, password);
      navigate('/main');
    } catch (e) {
      setLoading(false);
      setSnackbarMessage(t((e as Error).message) || t('Unknown error') || 'Unknown error');
      setOpenSnackbar(true);
    }
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      {loading && (
        <div className="center">
          <CircularProgress />
        </div>
      )}
      <Container className={style.signIn} maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <SignForm handleSign={handleSignUp} formSubmitName={t('sign up')} />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signIn">
                <Typography color="secondary">Already have an account? Sign in</Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
}
