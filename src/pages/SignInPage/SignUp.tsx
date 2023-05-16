import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import style from './SignPage.module.scss';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export default function SignUp() {
  const { t } = useTranslation();
  const { user, loading, error, signup } = useAuth();
  const history = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignUp: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // const data = new FormData(event.currentTarget);
    try {
      await signup(data.email, data.password);
      history('/main');
    } catch (e) {
      alert(`${t('Authentification error')}: ${(e as Error).message}`);
    }
  };

  // const validatePassword = (value: string) => {
  //   value.toUpperCase().includes()
  // }

  useEffect(() => {
    if (loading) return;
    if (user) history('/main');
    if (error) alert(t('Auth error when checking'));
  }, [user, loading]);

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
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(handleSignUp)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    fullWidth
                    required
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    {...field}
                  />
                )}
                rules={{
                  required: t('Valid email required.') || true,
                  pattern: {
                    value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                    message: t('Valid email required.') || 'Valid email required.',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    fullWidth
                    required
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...field}
                  />
                )}
                rules={{
                  required: t('Valid password required.') || true,
                  minLength: {
                    value: 8,
                    message: t('Min length of password is 8 symbols'),
                  },
                  pattern: {
                    value: /^[\w\d$%_+!-]{8,}$/i,
                    message:
                      t(
                        'Password should contain minimum 8 symbols, at least one letter, one digit, one special character',
                      ) || 'Valid password required.',
                  },
                }}
              />
            </Grid>
          </Grid>
          {/* <button style={{ margin: '10px' }} onClick={signInWithGoogle}>
            Register with Google
          </button> */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link color="secondary" to="/signIn">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
