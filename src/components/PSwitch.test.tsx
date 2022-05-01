/**
 * @jest-environment jsdom
 */

import { Formik } from 'formik';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PSwitch } from './PSwitch';

describe('Togggling the switch', () => {
  it('Changes the value correctly when toggling and submitting form', async () => {
    const handleSubmitMock = jest.fn();
    const initialValue = true;
    render(
      <Formik initialValues={{ active: initialValue }} onSubmit={handleSubmitMock}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <PSwitch name="active" />
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>,
    );

    const checkbox: HTMLElement = screen.getAllByRole('checkbox')[0];
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
    userEvent.click(checkbox);
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
      expect(handleSubmitMock).toHaveBeenCalledTimes(1);
      const values = handleSubmitMock.mock.calls[0][0]; // forst argument of the first call
      expect(values).toEqual({ active: !initialValue });
    });
  });
});
