import React, { useEffect, useState } from 'react';

import { Button } from 'rn-ui-kit';

import { useAppSelector } from '@/store';
import { selectAuth } from '@/store/slices/auth/selectors';
import { validateEmail } from '@/utils/validateEmail';

import styles from './style';

type ButtonAuthProps = {
  label: string;
  email: string;
  password: string;
  isPhoneAuth: boolean;
  isDisabled: boolean;
  phone?: string;
  value?: string;
  flag?: boolean;
  authError?: string;
  isLoading?: boolean;
  isRestore?: boolean;
  onPress?: () => void;
  recoveryError?: string;
  valueCheckBox?: boolean;
  withOutPassword?: boolean;
};

// TODO refactor this component
// 1) we don't need to use the component twice
// 2) use constants for large conditions

const ButtonAuth = ({
  flag,
  email,
  onPress,
  password,
  authError,
  isRestore,
  phone = '',
  value = '',
  isDisabled,
  isPhoneAuth,
  recoveryError,
  label = 'Войти',
  withOutPassword,
  isLoading = false,
  valueCheckBox = true,
}: ButtonAuthProps) => {
  const { isActiveTimer, isActiveTimerEmail } = useAppSelector(selectAuth);

  const [validateEmailBtn, setValidateEmailBtn] = useState<boolean>(false);

  const isPhone = phone?.length === 10 && isPhoneAuth;
  const isMail = email?.length > 0 && !isPhoneAuth;

  const isPhoneWithPass =
    phone?.length === 10 && password?.length > 0 && isPhoneAuth;
  const isMailWithPass =
    email?.length > 0 && password?.length > 0 && !isPhoneAuth;
  const isPasswordWidthPass = password?.length > 5 && value?.length > 5;

  const validWithPassword = !isPhoneWithPass && !isMailWithPass && isDisabled;
  const validWithOutPassword = !isPhone && !isMail && isDisabled;

  useEffect(() => {
    setValidateEmailBtn(validateEmail(email));
  }, [email]);

  return isRestore ? (
    <Button
      isPending={isLoading}
      onPress={onPress}
      style={[
        styles.btn,
        !isPasswordWidthPass && styles.disabled,
        !!recoveryError?.length && styles.disabled,
        !!authError && styles.disabled,
      ]}
      disabled={!isPasswordWidthPass || !!recoveryError?.length || !!authError}
      label={label}
      labelStyle={styles.labelBtn}
    />
  ) : (
    <Button
      isPending={isLoading}
      label={label}
      style={[
        styles.btn,
        withOutPassword
          ? validWithOutPassword && styles.disabled
          : validWithPassword && styles.disabled,
        !flag && isPhoneAuth && isActiveTimer && styles.disabled,
        !flag && !isPhoneAuth && isActiveTimerEmail && styles.disabled,
        !valueCheckBox && styles.disabled,
        !isPhoneAuth && !validateEmailBtn && styles.disabled,
        !!authError && styles.disabled,
      ]}
      onPress={onPress}
      disabled={
        withOutPassword
          ? flag
            ? validWithOutPassword ||
              !valueCheckBox ||
              (!isPhoneAuth && !validateEmailBtn) ||
              !!authError
            : validWithOutPassword ||
              (isPhoneAuth && isActiveTimer) ||
              (!isPhoneAuth && isActiveTimerEmail) ||
              !valueCheckBox ||
              (!isPhoneAuth && !validateEmailBtn) ||
              !!authError
          : flag
          ? validWithPassword ||
            !valueCheckBox ||
            (!isPhoneAuth && !validateEmailBtn) ||
            !!authError
          : validWithPassword ||
            (isPhoneAuth && isActiveTimer) ||
            (!isPhoneAuth && isActiveTimerEmail) ||
            (!isPhoneAuth && !validateEmailBtn) ||
            !!authError
      }
      labelStyle={styles.labelBtn}
    />
  );
};

export default ButtonAuth;
