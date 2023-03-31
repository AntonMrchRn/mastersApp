import React from 'react';
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
  value,
  isRestore,
  flag,
  recoveryError,
  valueCheckBox = true,
}) => {
  const isPhone = tel?.length === 10 && isPhoneAuth;
  const isMail = email?.length > 0 && !isPhoneAuth;

  const isPhoneWithPass =
    tel?.length === 10 && password?.length > 0 && isPhoneAuth;
  const isMailWithPass =
    email?.length > 0 && password?.length > 0 && !isPhoneAuth;
  const isPasswordWidthPass = password?.length > 5 && value?.length > 5;

  const validWithPassword = !isPhoneWithPass && !isMailWithPass && isDisabled;
  const validWithOutPassword = !isPhone && !isMail && isDisabled;

  const { isActiveTimer, isActiveTimerEmail } = useSelector(
    state => state.auth
  );

  return isRestore ? (
    <TouchableOpacity
      style={[
        styles.btn,
        !isPasswordWidthPass && styles.disabled,
        recoveryError?.message?.length > 0 && styles.disabled,
      ]}
      onPress={onPress}
      disabled={!isPasswordWidthPass || recoveryError?.message?.length > 0}
    >
      <Text style={styles.labelBtn}>{label}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.btn,
        withOutPassword
          ? validWithOutPassword && styles.disabled
          : validWithPassword && styles.disabled,
        !flag && isPhoneAuth && isActiveTimer && styles.disabled,
        !flag && !isPhoneAuth && isActiveTimerEmail && styles.disabled,
        !valueCheckBox && styles.disabled,
      ]}
      onPress={onPress}
      disabled={
        withOutPassword
          ? flag
            ? validWithOutPassword || !valueCheckBox
            : validWithOutPassword ||
              (isPhoneAuth && isActiveTimer) ||
              (!isPhoneAuth && isActiveTimerEmail) ||
              !valueCheckBox
          : flag
          ? validWithPassword || !valueCheckBox
          : validWithPassword ||
            (isPhoneAuth && isActiveTimer) ||
            (!isPhoneAuth && isActiveTimerEmail)
      }
    >
      <Text style={styles.labelBtn}>{label}</Text>
    </TouchableOpacity>
  );
};
