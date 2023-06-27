import React from 'react';
import { useController } from 'react-hook-form';

import { InputPhone } from 'rn-ui-kit';
import { InputPhoneProps } from 'rn-ui-kit/lib/typescript/components/InputPhone';

type ControlledInputProps = {
  name: string;
} & Omit<InputPhoneProps, 'value' | 'onChangeText' | 'onClear'>;

const ControlledInputPhone = ({
  name,
  ...inputProps
}: ControlledInputProps) => {
  const { field } = useController({
    name,
  });

  return (
    <InputPhone
      ref={field.ref}
      {...inputProps}
      value={field.value}
      onClear={() => field.onChange('')}
      onChangeText={(_, unmasked) => field.onChange(unmasked)}
    />
  );
};

export default ControlledInputPhone;
