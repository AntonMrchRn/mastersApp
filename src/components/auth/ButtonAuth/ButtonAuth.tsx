import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { validateEmail } from '../../../utils/hooks/validateEmail';
import { styles } from './style';

type ButtonProps = {
  isPhoneAuth: boolean;
  isDisabled: boolean;
  tel: string;
  password: string;
  email: string;
  withOutPassword: boolean;
  label: string;
  isRestore: boolean;
  value: string;
  flag: boolean;
  recoveryError?: any;
  valueCheckBox: boolean;
  onPress: any;
};

export const ButtonAuth = ({
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
}: ButtonProps) => {
  const [validateEmailBtn, setValidateEmail] = useState(false);

  const isPhone = tel?.length === 10 && isPhoneAuth;
  const isMail = email?.length > 0 && !isPhoneAuth;

  const isPhoneWithPass =
    tel?.length === 10 && password?.length > 0 && isPhoneAuth;
  const isMailWithPass =
    email?.length > 0 && password?.length > 0 && !isPhoneAuth;
  const isPasswordWidthPass = password?.length > 5 && value?.length > 5;

  const validWithPassword = !isPhoneWithPass && !isMailWithPass && isDisabled;
  const validWithOutPassword = !isPhone && !isMail && isDisabled;

  const { isActiveTimer, isActiveTimerEmail, authError } = useSelector(
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    state => state.auth
  );

  useEffect(() => {
    setValidateEmail(validateEmail({ email }));
  }, [email]);

  console.log('->', recoveryError);

  return isRestore ? (
    <TouchableOpacity
      style={[
        styles.btn,
        !isPasswordWidthPass && styles.disabled,
        recoveryError?.message?.length > 0 && styles.disabled,
        authError?.length > 0 && styles.disabled,
      ]}
      onPress={onPress}
      disabled={
        !isPasswordWidthPass ||
        recoveryError?.message?.length > 0 ||
        authError?.length > 0
      }
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
        !isPhoneAuth && !validateEmailBtn && styles.disabled,
        authError?.length > 0 && styles.disabled,
      ]}
      onPress={onPress}
      disabled={
        withOutPassword
          ? flag
            ? validWithOutPassword ||
              !valueCheckBox ||
              (!isPhoneAuth && !validateEmailBtn) ||
              authError?.length > 0
            : validWithOutPassword ||
              (isPhoneAuth && isActiveTimer) ||
              (!isPhoneAuth && isActiveTimerEmail) ||
              !valueCheckBox ||
              (!isPhoneAuth && !validateEmailBtn) ||
              authError?.length > 0
          : flag
          ? validWithPassword ||
            !valueCheckBox ||
            (!isPhoneAuth && !validateEmailBtn) ||
            authError?.length > 0
          : validWithPassword ||
            (isPhoneAuth && isActiveTimer) ||
            (!isPhoneAuth && isActiveTimerEmail) ||
            (!isPhoneAuth && !validateEmailBtn) ||
            authError?.length > 0
      }
    >
      <Text style={styles.labelBtn}>{label}</Text>
    </TouchableOpacity>
  );
};
