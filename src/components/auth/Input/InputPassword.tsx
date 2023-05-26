import React, { RefObject, useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Eye from '../../../assets/icons/svg/auth/Eye';
import HideEye from '../../../assets/icons/svg/auth/HideEye';
import { useAppSelector } from '../../../store';
import { clearAuthError } from '../../../store/slices/auth/actions';
import { selectAuth } from '../../../store/slices/auth/selectors';
import { ErrorCode } from '../../../types/error';
import { ErrorField } from '../../ErrorField';

import { styles } from './style';

type InputPasswordProps = {
  password: string;
  innerRef: RefObject<TextInput>;
  setPassword: (password: string) => void;
  label?: string;
};

export const InputPassword = ({
  innerRef,
  password,
  setPassword,
  label = 'Пароль',
}: InputPasswordProps) => {
  const { authError, authErrorCode } = useAppSelector(selectAuth);
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  useEffect(() => {
    if (authErrorCode === ErrorCode.IncorrectPassword) {
      dispatch(clearAuthError(null));
    }
  }, [password]);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.containerPassword,
          isActive && styles.activeInput,
          authErrorCode === ErrorCode.IncorrectPassword && styles.error,
        ]}
      >
        <>
          <TextInput
            ref={innerRef}
            style={[
              styles.inputBasicPassword,
              authErrorCode === ErrorCode.IncorrectPassword && styles.errorText,
            ]}
            placeholder={label}
            placeholderTextColor={'#5e5e5e'}
            value={password}
            maxLength={64}
            onChangeText={text => setPassword(text)}
            onPressIn={() => setIsActive(true)}
            onEndEditing={() => setIsActive(false)}
            secureTextEntry={isShowPassword}
            autoCapitalize="none"
            keyboardType="default"
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setIsShowPassword(!isShowPassword)}
          >
            <View style={styles.iconPassword}>
              {isShowPassword ? <Eye /> : <HideEye />}
            </View>
          </TouchableOpacity>
        </>
      </View>
      {authErrorCode === ErrorCode.IncorrectPassword && (
        <ErrorField error={authError} />
      )}
    </View>
  );
};
