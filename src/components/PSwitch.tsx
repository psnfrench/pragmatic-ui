import { SwitchProps } from '@mui/material';
import Switch from '@mui/material/Switch';
import { FormikContextType, useFormikContext } from 'formik';
import get from 'lodash/get';
import React from 'react';

export type RequiredFormikSwitchFields = Required<Pick<FormikContextType<unknown>, 'setFieldValue'>>;
export type ThemedSwitchProps = SwitchProps & Required<Pick<SwitchProps, 'name'>>;

export const PSwitch = (props: ThemedSwitchProps) => {
  const { values, setFieldValue } = useFormikContext();
  const checked = get(values, props.name);

  return <PSwitchMemo checked={checked} setFieldValue={setFieldValue} {...props} />;
};

const PSwitchWithFormikComp = (props: ThemedSwitchProps & RequiredFormikSwitchFields & { checked: boolean }) => {
  const { name, checked, setFieldValue, ...otherProps } = props;
  const handleSwitchChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(target.name, target.checked);
  };

  return name ? <Switch name={name} checked={checked} onChange={handleSwitchChange} /> : null;
};

export const PSwitchMemo = React.memo(PSwitchWithFormikComp);
