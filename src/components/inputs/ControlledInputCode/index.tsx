import React from 'react';
import { useController } from 'react-hook-form';

import { InputCode } from 'rn-ui-kit';
import { InputCodeProps } from 'rn-ui-kit/lib/typescript/components/InputCode';

type ControlledInputCodeProps = {
  name: string;
} & Omit<InputCodeProps, 'value' | 'onChangeText'>;

const ControlledInputCode = ({
  name,
  ...inputProps
}: ControlledInputCodeProps) => {
  const { field } = useController({
    name,
  });

  return (
    <InputCode
      {...inputProps}
      value={field.value}
      onChangeText={field.onChange}
    />
  );
};

export default ControlledInputCode;
