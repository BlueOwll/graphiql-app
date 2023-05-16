import Avatar from '@mui/material/Avatar';
import style from './SignPage.module.scss';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import SignForm from './SignForm';
import { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';

export default function SignUp() {
  const { t } = useTranslation();
  const { user, signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const handleSignUp = async (email: string, password: string) => {
    try {
      await signup(email, password);
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
  );
}
