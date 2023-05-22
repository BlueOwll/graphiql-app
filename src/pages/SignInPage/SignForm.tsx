import { Box, Grid, TextField, Button } from '@mui/material';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type SignFormProps = {
  handleSign: (email: string, password: string) => Promise<void>;
  formSubmitName: string;
};

const SignForm = (props: SignFormProps) => {
  const { t } = useTranslation();

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

  const handleSignClick: SubmitHandler<FieldValues> = async (data) => {
    await props.handleSign(data.email, data.password);
  };

  const validatePassword = (value: string) => {
    const res =
      value.search(/\w/i) !== -1 && value.search(/\d/i) !== -1 && value.search(/[$%_+!-]/i) !== -1;
    return (
      res ||
      t(
        'Password should contain minimum 8 symbols, at least one letter, one digit, one special character',
      ) ||
      'Valid password required.'
    );
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(handleSignClick)} sx={{ mt: 3 }}>
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
              validate: validatePassword,
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {props.formSubmitName.toUpperCase()}
      </Button>
    </Box>
  );
};
export default SignForm;
