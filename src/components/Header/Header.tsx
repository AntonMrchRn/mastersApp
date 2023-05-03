import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

const Header = ({ label = '', callBack = () => {}, itemFlag }: any) => {
  return itemFlag ? (
    <View style={styles.container}>
      <View style={styles.lateralWrapper}>
        <TouchableOpacity style={styles.btnBack} onPress={callBack}>
          <Image
            source={require('../../assets/icons/arrowBack.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fix} />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.lateralWrapper}>
        <TouchableOpacity style={styles.btnBack} onPress={callBack}>
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
