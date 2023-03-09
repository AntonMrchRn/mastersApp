import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { storageMMKV } from '../../mmkv/storage';
import { fetchUserAuth } from '../../redux/slices/auth/asyncActions';
import { styles } from './style';

const Button = ({ isPhoneAuth, isDisabled, tel, password, email }) => {
  const dispatch = useDispatch();

  const validPhone = tel?.length === 10 && password?.length > 0 && isPhoneAuth;
  const validMail = email?.length > 0 && password?.length > 0 && !isPhoneAuth;
  const token = storageMMKV.getString('token');
  const onPress = () => {
    dispatch(fetchUserAuth({ tel, email, password, isPhoneAuth }));
    console.log('token', token);
    console.log({
      user: 'ant',
      age: 23,
    });
  };

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={onPress}
      disabled={!validPhone && !validMail && isDisabled}
    >
      <Text style={styles.labelBtn}>Войти</Text>
    </TouchableOpacity>
  );
};

export default Button;
