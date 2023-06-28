import React from 'react';
import { useController } from 'react-hook-form';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { InputPhone } from 'rn-ui-kit';
import { InputPhoneProps } from 'rn-ui-kit/lib/typescript/components/InputPhone';

type ControlledInputProps = {
  name: string;
} & Omit<InputPhoneProps, 'value' | 'onChangeText'>;

const ControlledInputPhone = ({
  name,
  ...inputProps
}: ControlledInputProps) => {
  const { field } = useController({
    name,
  });

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    inputProps.onBlur && inputProps.onBlur(e);
    field.onBlur();
  };

  const onClear = () => {
    inputProps.onClear && inputProps.onClear();
    field.onChange('');
  };

  return (
    <InputPhone
      ref={field.ref}
      {...inputProps}
      onBlur={onBlur}
      onClear={onClear}
      value={field.value}
      onChangeText={(_, unmasked) => field.onChange(unmasked)}
    />
  );
};

export default ControlledInputPhone;
