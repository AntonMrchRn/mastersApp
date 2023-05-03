import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  useWindowDimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { clearAuthError } from '../../../redux/slices/auth/reducer';
import { configApp } from '../../../utils/helpers/platform';
import { styles } from './style';

export const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const windowHeight = useWindowDimensions().height;

  return (
    <View
      style={[
        styles.container,
        configApp.android && windowHeight < 593 && { marginTop: 0 },
      ]}
    >
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          // @ts-expect-error TS(2769): No overload matches this call.
          navigation.navigate('RecoveryScreen');
          // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
          dispatch(clearAuthError());
        }}
      >
        <Text style={styles.labelBtn}>Восстановить пароль</Text>
      </TouchableOpacity>
    </View>
  );
};
