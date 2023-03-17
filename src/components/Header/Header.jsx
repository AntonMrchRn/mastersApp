import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

const Header = ({ label = '' }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.lateralWrapper}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../assets/icons/arrowBack.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fix} />
    </View>
  );
};

export default Header;
