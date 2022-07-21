import React from 'react';
import { Button, ButtonProps, styled, SxProps } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import useValidators from '../hooks/useValidators';
import { PTextField } from '../components/PTextField';
import { PasswordInput } from '../components/PasswordInput';
import RightLink from './RightLink';

export interface LoginFormValues {
  email: string;
  password: string;
}

export const SignInCard = ({
  onSubmit,
  onForgotPassword,
  onCreateAccount,
  sx,
  signInButtonProps,
  createButtonProps,
}: {
  onSubmit: (values: LoginFormValues, formikHelpers: FormikHelpers<LoginFormValues>) => void;
  onForgotPassword?: (email: string) => void;
  onCreateAccount?: () => void;
  sx?: SxProps;
  signInButtonProps?: ButtonProps;
  createButtonProps?: ButtonProps;
}) => {
  const { validateEmail } = useValidators();
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const validate = (values: LoginFormValues) => {
    // eslint-disable-next-line no-unused-vars
    const errors: Partial<{ [key in keyof LoginFormValues]: string }> = validateEmail(values);
    (Object.keys(initialValues) as (keyof typeof initialValues)[]).forEach((k) => {
      if (!values[k]) {
        errors[k] = 'Required';
      }
    });
    return errors;
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} validateOnMount={true}>
      {({ values, handleSubmit, isSubmitting, isValid }) => {
        return (
          <Form onSubmit={handleSubmit} sx={sx}>
            <PTextField label="Email Address" type="email" name="email" fullWidth />
            <PasswordInput label="Password" name="password" fullWidth BoxProps={{ marginBottom: 0.5 }} />
            {onForgotPassword ? (
              <RightLink label="Forgot My password" onClick={() => onForgotPassword(values.email)} />
            ) : null}

            <Button
              sx={{ mb: 3.5, mt: 11 }}
              fullWidth
              variant="contained"
              type="submit"
              disabled={!isValid || isSubmitting}
              {...signInButtonProps}
            >
              Sign In
            </Button>
            {onCreateAccount ? (
              <Button fullWidth variant="contained" color="secondary" onClick={onCreateAccount} {...createButtonProps}>
                Create New Account
              </Button>
            ) : null}
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
