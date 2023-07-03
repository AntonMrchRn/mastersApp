import React from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Button, Spacer } from 'rn-ui-kit';

import { AppScreenName } from '@/navigation/AppNavigation';
import { SignInScreenNavigationProp } from '@/types/navigation';

import styles from './style';

const ConfirmPreviewEmail = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const navigateToSignIn = () => {
    navigation.navigate(AppScreenName.SignIn);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Мы отправили вам письмо</Text>
        <Text style={styles.text}>
          для подтверждения смены пароля. Следуйте инструкциям, указанным
        </Text>
        <Text style={styles.text}>в письме</Text>
      </View>
      <Spacer size="xl" />
      <Button label="Хорошо, понятно" onPress={navigateToSignIn} />
    </View>
  );
};

export default ConfirmPreviewEmail;
