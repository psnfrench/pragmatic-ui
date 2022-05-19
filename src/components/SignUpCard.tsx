import React from 'react';
import { Box, Button, styled, Grid } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import useValidators from '../hooks/useValidators';
import { PTextField } from './PTextField';
import PasswordInput from './PasswordInput';
import RightLink from './RightLink';

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const SignUpCard = ({
  onSubmit,
  onGoToLogin,
}: {
  onSubmit: (values: SignUpFormValues, formikHelpers: FormikHelpers<SignUpFormValues>) => void;
  onGoToLogin: () => void;
}) => {
  const { validateEmail } = useValidators();
  const initialValues: SignUpFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const validate = (values: SignUpFormValues) => {
    // eslint-disable-next-line no-unused-vars
    const errors: Partial<{ [key in keyof SignUpFormValues]: string }> = validateEmail(values);
    (Object.keys(initialValues) as (keyof typeof initialValues)[]).forEach((k) => {
      if (!values[k]) {
        errors[k] = 'Required';
      }
    });
    if (values.password !== values.passwordConfirm) {
      errors.passwordConfirm = 'Passwords do not match';
    }
    return errors;
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} validateOnMount={true}>
      {({ handleSubmit, isSubmitting, isValid }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs>
                <PTextField label="First Name" name="firstName" fullWidth />
              </Grid>
              <Grid item xs>
                <PTextField label="Last Name" name="lastName" fullWidth />
              </Grid>
            </Grid>
            <PTextField label="Email Address" type="email" name="email" fullWidth />
            <PasswordInput label="Password" name="password" fullWidth />
            <PasswordInput label="Confirm Password" name="passwordConfirm" fullWidth />

            <Button
              sx={{ mt: 11, mb: 0.5 }}
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Create New Account
            </Button>
            <Box mb={3.5}>
              <RightLink label="Already Have an account?" onClick={onGoToLogin} />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

const Form = styled('form')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderTopLeftRadius: theme.spacing(1.5),
  borderTopRightRadius: theme.spacing(1.5),
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  paddingLeft: theme.spacing(10),
  paddingRight: theme.spacing(10),
  flex: 1,
}));
