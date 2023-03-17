import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';

const ConfrimPreview = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Подтверждение телефона</Text>
      <Text style={styles.text}>Введите код из смс и новый пароль</Text>
    </View>
  );
};

export default ConfrimPreview;
