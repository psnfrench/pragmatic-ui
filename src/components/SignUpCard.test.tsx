/**
 * @jest-environment jsdom
 */

import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpCard from './SignUpCard';

describe('Filling out the sign up form', () => {
  const fieldsToUpdate = [
    { labelText: 'First Name', newValue: 'Bob' },
    { labelText: 'Last Name', newValue: 'Smith' },
    { labelText: 'Email Address', newValue: 'bob@gmail.com' },
    { labelText: 'Password', newValue: 'password123' },
    { labelText: 'Confirm Password', newValue: 'password123' },
  ];
  it('Is invalid untill all fields filled out', async () => {
    const handleSubmitMock = jest.fn();
    const goToLoginMock = jest.fn();
    render(<SignUpCard onSubmit={handleSubmitMock} onGoToLogin={goToLoginMock} />);

    const submitButton = screen.getByRole('button', { name: 'Create New Account' });
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
    for (const field of fieldsToUpdate) {
      const textField: HTMLInputElement = screen.getByLabelText(field.labelText);
      userEvent.type(textField, field.newValue);
    }
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalledTimes(1);
      const values = handleSubmitMock.mock.calls[0][0]; // forst argument of the first call
      expect(values).toEqual({
        firstName: fieldsToUpdate[0].newValue,
        lastName: fieldsToUpdate[1].newValue,
        email: fieldsToUpdate[2].newValue,
        password: fieldsToUpdate[3].newValue,
        passwordConfirm: fieldsToUpdate[4].newValue,
      });
    });
  });
  it('Is invalid with an incorrect email', async () => {
    const handleSubmitMock = jest.fn();
    const goToLoginMock = jest.fn();
    render(<SignUpCard onSubmit={handleSubmitMock} onGoToLogin={goToLoginMock} />);
    const invalidEmailAddress = 'sometext';

    const submitButton = screen.getByRole('button', { name: 'Create New Account' });
    for (const field of fieldsToUpdate) {
      const textField: HTMLInputElement = screen.getByLabelText(field.labelText);
      userEvent.type(textField, field.newValue);
    }
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
    const emailField: HTMLInputElement = screen.getByLabelText('Email Address');
    userEvent.clear(emailField);
    userEvent.type(emailField, invalidEmailAddress);
    userEvent.tab();

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });
  it('Is invalid without matching passwords', async () => {
    const handleSubmitMock = jest.fn();
    const goToLoginMock = jest.fn();
    render(<SignUpCard onSubmit={handleSubmitMock} onGoToLogin={goToLoginMock} />);
    const invalidPassword = 'sometext';

    const submitButton = screen.getByRole('button', { name: 'Create New Account' });
    for (const field of fieldsToUpdate) {
      const textField: HTMLInputElement = screen.getByLabelText(field.labelText);
      userEvent.type(textField, field.newValue);
    }
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
    const confirmPasswordField: HTMLInputElement = screen.getByLabelText('Confirm Password');
    userEvent.clear(confirmPasswordField);
    userEvent.type(confirmPasswordField, invalidPassword);
    userEvent.tab();

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });
});
