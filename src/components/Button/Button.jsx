import React, { useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { storageMMKV } from '../../mmkv/storage';
import { styles } from './style';

export const Button = ({
  isPhoneAuth,
  isDisabled,
  tel,
  password,
  email,
  label = 'Войти',
  onPress,
  withOutPassword,
}) => {
  const isPhone = tel?.length === 10 && isPhoneAuth;
  const isMail = email?.length > 0 && !isPhoneAuth;

  const isPhoneWithPass =
    tel?.length === 10 && password?.length > 0 && isPhoneAuth;
  const isMailWithPass =
    email?.length > 0 && password?.length > 0 && !isPhoneAuth;

  const validWithPassword = !isPhoneWithPass && !isMailWithPass && isDisabled;
  const validWithOutPassword = !isPhone && !isMail && isDisabled;

  const { isActiveTimer } = useSelector(state => state.auth);
  console.log('isActiveTimer', isActiveTimer);
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        withOutPassword
          ? validWithOutPassword && styles.disabled
          : validWithPassword && styles.disabled,
        isActiveTimer && styles.disabled,
      ]}
      onPress={onPress}
      disabled={
        withOutPassword
          ? validWithOutPassword || isActiveTimer
          : validWithPassword || isActiveTimer
      }
    >
      <Text style={styles.labelBtn}>{label}</Text>
    </TouchableOpacity>
  );
};
