import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from './style';

export const ForgotPassword = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('RecoveryScreen')}
      >
        <Text style={styles.labelBtn}>Не можете войти?</Text>
      </TouchableOpacity>
    </View>
  );
};
