import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormikContextType, useFormikContext } from 'formik';
import get from 'lodash/get';
import React, { useCallback } from 'react';

export type RequiredFormikCheckboxFields = Required<Pick<FormikContextType<unknown>, 'setFieldValue'>>;
export type ThemedCheckboxProps = CheckboxProps & Required<Pick<CheckboxProps, 'name'>> & { label?: string };

export const PCheckbox = (props: ThemedCheckboxProps) => {
  const { values, setFieldValue } = useFormikContext();
  const checked = get(values, props.name);

  return <PCheckboxMemo checked={checked} setFieldValue={setFieldValue} {...props} />;
};

const PCheckboxWithFormikComp = (props: ThemedCheckboxProps & RequiredFormikCheckboxFields & { checked: boolean }) => {
  const { name, label, checked, setFieldValue, ...otherProps } = props;
  const handleCheckBoxChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(target.name, target.checked);
    },
    [setFieldValue],
  );

  const renderCheckBox = useCallback(() => {
    return <Checkbox name={name} checked={checked} onChange={handleCheckBoxChange} {...otherProps} />;
  }, [name, checked, handleCheckBoxChange, otherProps]);

  return name ? label ? <FormControlLabel control={renderCheckBox()} label={label} /> : renderCheckBox() : null;
};

export const PCheckboxMemo = React.memo(PCheckboxWithFormikComp);
