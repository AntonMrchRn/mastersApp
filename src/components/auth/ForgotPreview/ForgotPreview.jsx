import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';

const ForgotPreview = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Введите свой электронный адрес или номер телефона.
      </Text>
      <Text style={styles.text}>
        Мы вышлем на него код подтверждения для восстановления пароля.
      </Text>
    </View>
  );
};

export default ForgotPreview;
