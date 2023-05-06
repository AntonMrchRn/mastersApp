import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { clearRecoveryError } from '../../../redux/slices/auth/reducer';
import { useAppDispatch } from '../../../utils/hooks/useRedux';
import { Button } from '../../Button/Button';
import { styles } from './style';

const ConfrimPreviewEmail = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

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
          navigation.navigate('SignUp');
        }}
        label="Хорошо, понятно"
      />
    </View>
  );
};

export default ConfrimPreviewEmail;
