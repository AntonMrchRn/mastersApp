import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './style';

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.labelBtn}>Не можете войти?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
