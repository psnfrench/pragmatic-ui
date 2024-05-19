/**
 * @jest-environment jsdom
 */
import React from 'react';
import { Formik } from 'formik';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PTextField } from './PTextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

describe('Editing the text field', () => {
  it('Changes the value correctly when typing and submitting form', async () => {
    const handleSubmitMock = jest.fn();
    const initialFirstName = 'Bobby';
    const updatedFirstName = 'Sue';
    const fieldLabel = 'First Name';
    render(
      <Formik initialValues={{ firstName: initialFirstName }} onSubmit={handleSubmitMock}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <PTextField name="firstName" label={fieldLabel} />
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>,
    );

    const textField: HTMLInputElement = screen.getByLabelText(fieldLabel);
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveProperty('value', initialFirstName);
    userEvent.clear(textField);
    userEvent.type(textField, updatedFirstName);
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => {
      expect(textField).toHaveDisplayValue(updatedFirstName);
      expect(handleSubmitMock).toHaveBeenCalledTimes(1);
      const values = handleSubmitMock.mock.calls[0][0]; // forst argument of the first call
      expect(values).toEqual({ firstName: updatedFirstName });
    });
  });

  it('Changes clear the value when pressing the clear button', async () => {
    const handleSubmit = jest.fn();
    const initialFirstName = 'Bobby';
    const fieldLabel = 'First Name';
    render(
      <Formik initialValues={{ firstName: initialFirstName }} onSubmit={handleSubmit}>
        {() => <PTextField name="firstName" label={fieldLabel} />}
      </Formik>,
    );
    const textField: HTMLInputElement = screen.getByLabelText(fieldLabel);
    expect(screen.queryByRole('button')).toBeNull(); // should be null until textfield clicked
    userEvent.click(textField);
    const clearButton = screen.getByRole('button');
    userEvent.click(clearButton);
    expect(textField).toHaveProperty('value', '');
  });

  it('Changes clear the value when pressing the clear button on a multiple select', async () => {
    const handleSubmit = jest.fn();
    const fieldLabel = 'Tags';
    const tags = ['music', 'movies', 'funny', 'action', 'comedy'];
    const { container } = render(
      <Formik initialValues={{ tags: ['music', 'movies'] } as { tags: string[] }} onSubmit={handleSubmit}>
        {({ values }) => (
          <PTextField
            name="tags"
            label="Tags"
            select
            sx={{ minWidth: 360 }}
            SelectProps={{ multiple: true, inputProps: { 'data-testid': fieldLabel } }}
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={values.tags.includes(tag)} />
                {tag}
              </MenuItem>
            ))}
          </PTextField>
        )}
      </Formik>,
    );
    const textField: HTMLInputElement = screen.getByTestId(fieldLabel);
    userEvent.click(screen.getByRole('combobox'));
    const clearButton = container.getElementsByClassName('MuiIconButton-root')[0];
    expect(textField).toHaveProperty('value', 'music,movies');
    userEvent.click(clearButton);
    expect(textField).toHaveProperty('value', '');
  });
});

describe('Showing errors', () => {
  it('Shows an error when field is invalid', async () => {
    const handleSubmit = jest.fn();
    const initialFirstName = 'Bobby';
    const fieldLabel = 'First Name';
    const errorText = 'First Name is Required';
    const validate = jest.fn();
    validate.mockReturnValue({ firstName: errorText });
    render(
      <Formik initialValues={{ firstName: initialFirstName }} onSubmit={handleSubmit} validate={validate}>
        {() => (
          <form onSubmit={handleSubmit}>
            <PTextField name="firstName" label={fieldLabel} />
          </form>
        )}
      </Formik>,
    );
    const textField: HTMLInputElement = screen.getByLabelText(fieldLabel);
    userEvent.type(textField, 'x');
    userEvent.tab(); // tab to trigger the blur event rquired for formik to set the touched values
    await waitFor(() => {
      expect(validate).toHaveBeenCalledTimes(2); // (called on blur also)
      expect(screen.getByText(errorText)).toBeInTheDocument();
    });
  });
});
