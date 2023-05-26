import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useAppSelector } from '../../../store';
import { selectAuth } from '../../../store/slices/auth/selectors';
import { Error } from '../../../types/error';
import { validateEmail } from '../../../utils/helpers/validateEmail';

import { styles } from './style';

type ButtonAuthProps = {
  label: string;
  email: string;
  password: string;
  isPhoneAuth: boolean;
  isDisabled: boolean;
  tel?: string;
  value?: string;
  flag?: boolean;
  withOutPassword?: boolean;
  isRestore?: boolean;
  valueCheckBox?: boolean;
  onPress?: () => void;
  recoveryError?: null | boolean | Error;
};

export const ButtonAuth = ({
  isPhoneAuth,
  isDisabled,
  tel = '',
  password,
  email,
  label = 'Войти',
  onPress,
  withOutPassword,
  value = '',
  isRestore,
  flag,
  recoveryError,
  valueCheckBox = true,
}: ButtonAuthProps) => {
  const { isActiveTimer, isActiveTimerEmail, authError } =
    useAppSelector(selectAuth);

  const [validateEmailBtn, setValidateEmailBtn] = useState<boolean>(false);

  const isPhone = tel?.length === 10 && isPhoneAuth;
  const isMail = email?.length > 0 && !isPhoneAuth;

  const isPhoneWithPass =
    tel?.length === 10 && password?.length > 0 && isPhoneAuth;
  const isMailWithPass =
    email?.length > 0 && password?.length > 0 && !isPhoneAuth;
  const isPasswordWidthPass = password?.length > 5 && value?.length > 5;

  const validWithPassword = !isPhoneWithPass && !isMailWithPass && isDisabled;
  const validWithOutPassword = !isPhone && !isMail && isDisabled;

  useEffect(() => {
    setValidateEmailBtn(validateEmail(email));
  }, [email]);

  return isRestore ? (
    <TouchableOpacity
      style={[
        styles.btn,
        !isPasswordWidthPass && styles.disabled,
        (recoveryError as Error)?.message?.length > 0 && styles.disabled,
        !!authError && authError?.length > 0 && styles.disabled,
      ]}
      onPress={onPress}
      disabled={
        !isPasswordWidthPass ||
        (recoveryError as Error)?.message?.length > 0 ||
        (!!authError && authError?.length > 0)
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
        !!authError && authError?.length > 0 && styles.disabled,
      ]}
      onPress={onPress}
      disabled={
        withOutPassword
          ? flag
            ? validWithOutPassword ||
              !valueCheckBox ||
              (!isPhoneAuth && !validateEmailBtn) ||
              (!!authError && authError?.length > 0)
            : validWithOutPassword ||
              (isPhoneAuth && isActiveTimer) ||
              (!isPhoneAuth && isActiveTimerEmail) ||
              !valueCheckBox ||
              (!isPhoneAuth && !validateEmailBtn) ||
              (!!authError && authError?.length > 0)
          : flag
          ? validWithPassword ||
            !valueCheckBox ||
            (!isPhoneAuth && !validateEmailBtn) ||
            (!!authError && authError?.length > 0)
          : validWithPassword ||
            (isPhoneAuth && isActiveTimer) ||
            (!isPhoneAuth && isActiveTimerEmail) ||
            (!isPhoneAuth && !validateEmailBtn) ||
            (!!authError && authError?.length > 0)
      }
    >
      <Text style={styles.labelBtn}>{label}</Text>
    </TouchableOpacity>
  );
};
