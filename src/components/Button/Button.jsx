import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './style';

export const Button = ({
  isPhoneAuth,
  isDisabled,
  tel,
  password,
  email,
  label = 'Войти',
  onPress,
}) => {
  const validatePhone =
    tel?.length === 10 && password?.length > 0 && isPhoneAuth;
  const validateMail =
    email?.length > 0 && password?.length > 0 && !isPhoneAuth;

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        !validatePhone && !validateMail && isDisabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={!validatePhone && !validateMail && isDisabled}
    >
      <Text style={styles.labelBtn}>{label}</Text>
    </TouchableOpacity>
  );
};
