import { useCallback } from 'react';

export interface EmailValues {
  email: string;
}

export default function useValidators() {
  const isEmailValid = useCallback((email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email), []);

  const validateEmail = useCallback(
    (values: EmailValues) => {
      const errors: Partial<EmailValues> = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!isEmailValid(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    [isEmailValid]
  );

  return { isEmailValid, validateEmail };
}
