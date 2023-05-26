import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import style from './SignPage.module.scss';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SignForm from './SignForm';
import { useContext, useEffect, useState } from 'react';
import { CircularProgress, Snackbar } from '@mui/material';
import { AppContext } from '../../hocs/AppProvider';

const SignIn = () => {
  const { t } = useTranslation();
  const { user, signin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { showErrorDialog } = useContext(AppContext);

  useEffect(() => {
    if (user) navigate('/main');
  }, [user]);

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signin(email, password);
      navigate('/main');
    } catch (e) {
      setLoading(false);
      showErrorDialog(t((e as Error).message) || t('Unknown error') || 'Unknown error');
    }
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
          <SignForm handleSign={handleSignIn} formSubmitName={t('sign in')} />
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
