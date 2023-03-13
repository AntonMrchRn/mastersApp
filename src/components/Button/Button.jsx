import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchUserAuth } from '../../redux/slices/auth/asyncActions';
import { styles } from './style';

export const Button = ({ isPhoneAuth, isDisabled, tel, password, email }) => {
  const dispatch = useDispatch();

  const validatePhone =
    tel?.length === 10 && password?.length > 0 && isPhoneAuth;
  const validateMail =
    email?.length > 0 && password?.length > 0 && !isPhoneAuth;

  const onPress = () => {
    dispatch(fetchUserAuth({ tel, email, password, isPhoneAuth }));
  };

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        !validatePhone && !validateMail && isDisabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={!validatePhone && !validateMail && isDisabled}
    >
      <Text style={styles.labelBtn}>Войти</Text>
    </TouchableOpacity>
  );
};
