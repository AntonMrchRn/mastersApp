import React from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Button } from 'rn-ui-kit';

import ErrorCross from '@/assets/icons/svg/auth/ErrorCross';
import Header from '@/components/Header';

import styles from './style';

const ErrorScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.wrapperSignIn}>
        <View style={styles.containerInfo}>
          <ErrorCross />
          <Text style={styles.title}>Сервис временно недоступен</Text>
          <Text style={styles.text}>
            Повторите попытку или попробуйте войти позже, скоро мы всё починим
          </Text>
        </View>
        <Button label="Повторить попытку" onPress={navigation.goBack} />
      </View>
    </View>
  );
};

export default ErrorScreen;
