import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  useWindowDimensions,
} from 'react-native';
import { clearAuthError } from '../../../redux/slices/auth/reducer';
import { configApp } from '../../../utils/helpers/platform';
import { useAppDispatch } from '../../../utils/hooks/useRedux';
import { styles } from './style';

export const ForgotPassword = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const windowHeight = useWindowDimensions().height;

  return (
    <View
      style={[
        styles.container,
        configApp.android && windowHeight < 593 && styles.marginAndroid,
      ]}
    >
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Recovery');
          dispatch(clearAuthError(null));
        }}
      >
        <Text style={styles.labelBtn}>Восстановить пароль</Text>
      </TouchableOpacity>
    </View>
  );
};
