import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './style';

const TypeSelection = ({ isPhoneAuth, setIsPhoneAuth }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, isPhoneAuth && styles.activeBtn]}
        onPress={() => setIsPhoneAuth(true)}
      >
        <Text style={[styles.textBtn, isPhoneAuth && styles.activeTextBtn]}>
          Телефон
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, !isPhoneAuth && styles.activeBtn]}
        onPress={() => setIsPhoneAuth(false)}
      >
        <Text style={[styles.textBtn, !isPhoneAuth && styles.activeTextBtn]}>
          Email
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TypeSelection;
