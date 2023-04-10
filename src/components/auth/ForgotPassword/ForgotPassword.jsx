import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearAuthError } from '../../../redux/slices/auth/reducer';
import { styles } from './style';

export const ForgotPassword = ({ setScrollHeight }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setScrollHeight(215);
          navigation.navigate('RecoveryScreen');
          dispatch(clearAuthError());
        }}
      >
        <Text style={styles.labelBtn}>Не можете войти?</Text>
      </TouchableOpacity>
    </View>
  );
};
