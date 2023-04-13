import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError } from '../../../redux/slices/auth/reducer';
import { ErrorField } from '../../ErrorField/ErrorFiled';
import ClearTel from '../../svg/auth/ClearTel';
import Flag from '../../svg/auth/Flag';
import { styles } from './style';

export const Input = ({
  isPhoneAuth,
  tel,
  setTel,
  email,
  setMail,
  onSubmitEditing,
  onFocus,
  setActive,
  active,
}) => {
  const [focus, setFocus] = useState(false);
  const [activeTel, setActiveTel] = useState(false);
  const [activeEmail, setActiveEmail] = useState(false);
  const { authError, authErrorCode } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (tel?.length === 10) {
      onSubmitEditing();
    }
    if (tel?.length > 0) {
      setActiveTel(true);
    }
    if (tel?.length < 1) {
      setActiveTel(false);
    }
    dispatch(clearAuthError());
  }, [tel]);

  useEffect(() => {
    if (email?.length > 0) {
      setActiveEmail(true);
    }
    if (email?.length < 1) {
      setActiveEmail(false);
    }
    dispatch(clearAuthError(null));
  }, [email]);

  const clearValueTel = () => {
    setTel('');
  };

  const clearValueEmail = () => {
    setMail('');
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          isPhoneAuth ? styles.container : styles.containerEmail,
          active && styles.activeInput,
          isPhoneAuth
            ? authErrorCode === 20004 && styles.error
            : authErrorCode === 20003 && styles.error,
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
                focus && styles.activePrefix,
                authErrorCode === 20004 && styles.errorPrefix,
              ]}
            >
              +7
            </Text>
            <TextInputMask
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '999 999-99-99',
              }}
              style={[
                styles.inputBasic,
                authErrorCode === 20004 && styles.errorText,
              ]}
              placeholder={'900 000-00-00'}
              placeholderTextColor={'#5e5e5e'}
              keyboardType={'numeric'}
              maxLength={tel?.length < 2 ? 100 : 13}
              value={tel}
              onChangeText={text => {
                if (text.length == 1) {
                  text = text.replace(/[^\d\s\(\)-]/g, '');
                  text = text.replace(/(^[0-8])/, '(9$1');
                  setTel(text.replace(/[\D]+/g, ''));
                } else {
                  text = text.replace(/[^\d\s\(\)-]/g, '');
                  text = text.replace(/(^[7 | 8])/, '');
                  text = text.replace(/(^[0-8])/, '(9$1');
                  setTel(text.replace(/[\D]+/g, ''));
                }
              }}
              onPressIn={() => setActive(true)}
              onEndEditing={() => setActive(false)}
              autoCapitalize="none"
              onBlur={() => tel?.length < 1 && setFocus(false)}
              onFocus={() => {
                onFocus;
                setFocus(true);
              }}
            />
            {activeTel && (
              <TouchableOpacity onPress={() => clearValueTel()}>
                <ClearTel />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            <TextInput
              style={[
                styles.inputBasicEmail,
                authErrorCode === 20003 && styles.errorText,
              ]}
              placeholder={'Email'}
              keyboardType="email-address"
              placeholderTextColor={'#5e5e5e'}
              maxLength={60}
              value={email}
              onChangeText={text => setMail(text)}
              onPressIn={() => setActive(true)}
              onEndEditing={() => setActive(false)}
              autoCapitalize="none"
              onSubmitEditing={onSubmitEditing}
              onFocus={onFocus}
            />
            {activeEmail && (
              <TouchableOpacity onPress={() => clearValueEmail()}>
                <ClearTel />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      {isPhoneAuth
        ? authErrorCode === 20004 && <ErrorField error={authError} />
        : authErrorCode === 20003 && <ErrorField error={authError} />}
    </View>
  );
};
