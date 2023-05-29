import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  TextInputMask,
  TextInputMaskOptionProp,
} from 'react-native-masked-text';
import { useDispatch } from 'react-redux';

import ClearTel from '@/assets/icons/svg/auth/ClearTel';
import Flag from '@/assets/icons/svg/auth/Flag';
import ErrorField from '@/components/ErrorField';
import { useAppSelector } from '@/store';
import { clearAuthError } from '@/store/slices/auth/actions';
import { selectAuth } from '@/store/slices/auth/selectors';
import { ErrorCode } from '@/types/error';

import styles from './style';

const INPUT_MASK_OPTIONS: TextInputMaskOptionProp = {
  maskType: 'BRL',
  withDDD: true,
  dddMask: '999 999-99-99',
};

type InputProps = {
  tel: string;
  email: string;
  isActive: boolean;
  onFocus: () => void;
  isPhoneAuth: boolean;
  onSubmitEditing: () => void;
  setTel: (tel: string) => void;
  setEmail: (email: string) => void;
  setIsActive: (isActive: boolean) => void;
};

const Input = ({
  tel,
  email,
  setTel,
  onFocus,
  isActive,
  setEmail,
  setIsActive,
  isPhoneAuth,
  onSubmitEditing,
}: InputProps) => {
  const { authError, authErrorCode } = useAppSelector(selectAuth);
  const dispatch = useDispatch();

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isActiveTel, setIsActiveTel] = useState<boolean>(false);
  const [isActiveEmail, setIsActiveEmail] = useState<boolean>(false);

  useEffect(() => {
    if (tel?.length === 10) {
      onSubmitEditing();
    }
    if (tel?.length > 0) {
      setIsActiveTel(true);
    }
    if (tel?.length < 1) {
      setIsActiveTel(false);
    }
    dispatch(clearAuthError(null));
  }, [tel]);

  useEffect(() => {
    if (email?.length > 0) {
      setIsActiveEmail(true);
    }
    if (email?.length < 1) {
      setIsActiveEmail(false);
    }
    dispatch(clearAuthError(null));
  }, [email]);

  const clearTelValue = () => {
    setTel('');
    if (!isActive) {
      setIsFocus(false);
    }
  };

  const clearEmailValue = () => {
    setEmail('');
  };

  const onChangeTel = (text: string) => {
    if (text.length === 1) {
      text = text.replace(/[^\d\s\(\)-]/g, '');
      text = text.replace(/(^[0-8])/, '(9$1');
      setTel(text.replace(/[\D]+/g, ''));
    } else {
      text = text.replace(/[^\d\s\(\)-]/g, '');
      text = text.replace(/(^[7 | 8])/, '');
      text = text.replace(/(^[0-8])/, '(9$1');
      setTel(text.replace(/[\D]+/g, ''));
    }
  };

  const onBlurTel = () => tel?.length < 1 && setIsFocus(false);
  const onFocusTel = () => {
    onFocus;
    setIsFocus(true);
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          isPhoneAuth ? styles.container : styles.containerEmail,
          isActive && styles.activeInput,
          isPhoneAuth
            ? authErrorCode === ErrorCode.IncorrectPhone && styles.error
            : authErrorCode === ErrorCode.IncorrectEmail && styles.error,
        ]}
      >
        {isPhoneAuth ? (
          <>
            <View style={styles.icon}>
              <Flag />
            </View>
            <Text
              style={[
                styles.prefixPhone,
                isFocus && styles.activePrefix,
                authErrorCode === ErrorCode.IncorrectPhone &&
                  styles.errorPrefix,
              ]}
            >
              +7
            </Text>
            <TextInputMask
              type={'cel-phone'}
              options={INPUT_MASK_OPTIONS}
              style={[
                styles.inputBasic,
                authErrorCode === ErrorCode.IncorrectPhone && styles.errorText,
              ]}
              placeholder={'900 000-00-00'}
              placeholderTextColor={'#5e5e5e'}
              keyboardType={'numeric'}
              maxLength={tel?.length < 2 ? 100 : 13}
              value={tel}
              onChangeText={onChangeTel}
              onPressIn={() => setIsActive(true)}
              onEndEditing={() => setIsActive(false)}
              autoCapitalize="none"
              onBlur={onBlurTel}
              onFocus={onFocusTel}
            />
            {isActiveTel && (
              <TouchableOpacity style={styles.btnClose} onPress={clearTelValue}>
                <ClearTel />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            <TextInput
              style={[
                styles.inputBasicEmail,
                authErrorCode === ErrorCode.IncorrectEmail && styles.errorText,
              ]}
              placeholder={'Электронная почта'}
              keyboardType="email-address"
              placeholderTextColor={'#5e5e5e'}
              maxLength={60}
              value={email}
              onChangeText={text => setEmail(text)}
              onPressIn={() => setIsActive(true)}
              onEndEditing={() => setIsActive(false)}
              autoCapitalize="none"
              onSubmitEditing={onSubmitEditing}
              onFocus={onFocus}
            />
            {isActiveEmail && (
              <TouchableOpacity style={styles.btn} onPress={clearEmailValue}>
                <ClearTel />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      {isPhoneAuth
        ? authErrorCode === ErrorCode.IncorrectPhone && (
            <ErrorField error={authError} />
          )
        : authErrorCode === ErrorCode.IncorrectEmail && (
            <ErrorField error={authError} />
          )}
    </View>
  );
};

export default Input;
