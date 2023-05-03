import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError } from '../../../redux/slices/auth/reducer';
import { ErrorField } from '../../ErrorField/ErrorFiled';
import Eye from '../../svg/auth/Eye';
import HideEye from '../../svg/auth/HideEye';

import { styles } from './style';

export const InputPassword = ({
  password,
  setPassword,
  innerRef,
  label = 'Пароль',
}) => {
  const [active, setActive] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  const { authError, authErrorCode } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authErrorCode === 20002) {
      dispatch(clearAuthError(null));
    }
  }, [password]);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.containerPassword,
          active && styles.activeInput,
          authErrorCode === 20002 && styles.error,
        ]}
      >
        <>
          <TextInput
            ref={innerRef}
            style={[
              styles.inputBasicPassword,
              authErrorCode === 20002 && styles.errorText,
            ]}
            placeholder={label}
            placeholderTextColor={'#5e5e5e'}
            value={password}
            maxLength={64}
            onChangeText={text => setPassword(text)}
            onPressIn={() => setActive(true)}
            onEndEditing={() => setActive(false)}
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
      {authErrorCode === 20002 && <ErrorField error={authError} />}
    </View>
  );
};
