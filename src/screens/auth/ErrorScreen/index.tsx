import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { Button } from 'rn-ui-kit';

import ErrorCross from '@/assets/icons/svg/auth/ErrorCross';

import styles from './style';

const ErrorScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.wrapperSignIn}>
        <View style={styles.containerInfo}>
          <ErrorCross />
          <Text style={styles.title}>Сервис временно недоступен</Text>
          <Text style={styles.text}>
            Повторите попытку или попробуйте войти позже, скоро мы всё починим
          </Text>
        </View>
      </View>
      <Button label="Повторить попытку" onPress={navigation.goBack} />
    </SafeAreaView>
  );
};

export default ErrorScreen;
