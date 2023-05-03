import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearRecoveryError } from '../../../redux/slices/auth/reducer';
import { Button } from '../../Button/Button';
import { styles } from './style';

const ConfrimPreviewEmail = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Мы отправили вам письмо</Text>
        <Text style={styles.text}>
          для подтверждения смены пароля. Следуйте инструкциям, указанным
        </Text>
        <Text style={styles.text}>в письме</Text>
      </View>
      <Button
        onPress={() => {
          dispatch(clearRecoveryError());
          // @ts-expect-error TS(2769): No overload matches this call.
          navigation.navigate('SignUpScreen');
        }}
        label="Хорошо, понятно"
      />
    </View>
  );
};

export default ConfrimPreviewEmail;
