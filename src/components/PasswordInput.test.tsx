/**
 * @jest-environment jsdom
 */

import { Formik } from 'formik';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordInput from './PasswordInput';

describe('Editing the text field', () => {
  it('Toggles the password visibility', async () => {
    const handleSubmitMock = jest.fn();
    const initialPassword = 'password123';
    const fieldLabel = 'password';
    render(
      <Formik initialValues={{ password: initialPassword }} onSubmit={handleSubmitMock}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <PasswordInput name="password" label={fieldLabel} />
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>,
    );

    const textField: HTMLInputElement = screen.getByLabelText(fieldLabel);
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveProperty('value', initialPassword);
    expect(textField).toHaveProperty('type', 'password');
    userEvent.click(screen.getByRole('button', { name: 'toggle visibility' }));
    await waitFor(() => {
      expect(textField).toHaveProperty('type', 'text');
    });
  });
});
