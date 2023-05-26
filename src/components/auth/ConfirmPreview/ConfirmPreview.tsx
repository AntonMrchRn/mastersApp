import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './style';

const ConfirmPreview = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Мы отправили вам смс с 6-значным кодом.</Text>
      <Text style={styles.text}>Пожалуйста, введите код и новый пароль</Text>
    </View>
  );
};

export default ConfirmPreview;
