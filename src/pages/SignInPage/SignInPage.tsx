import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import style from './SignPage.module.scss';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SignForm from './SignForm';
import { useEffect } from 'react';

const SignIn = () => {
  const { t } = useTranslation();
  const { user, signin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const handleSignUp = async (email: string, password: string) => {
    try {
      await signin(email, password);
      navigate('/main');
    } catch (e) {
      alert(`${t('Authentification error')}: ${(e as Error).message}`);
    }
  };

  return (
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
        <SignForm handleSign={handleSignUp} formSubmitName={t('sign in')} />
      </Box>
    </Container>
  );
};

export default SignIn;
