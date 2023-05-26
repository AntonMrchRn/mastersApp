import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './style';

const ForgotPreview = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Введите контактные данные, привязанные</Text>
      <Text style={styles.text}>к вашему аккаунту</Text>
    </View>
  );
};

export default ForgotPreview;
