import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ArrowBack from '../../assets/icons/svg/auth/ArrowBack';

import { styles } from './styles';

type HeaderProps = {
  label?: string;
  callBack: any;
  itemFlag?: boolean;
};

const Header = ({ label = '', callBack = () => {}, itemFlag }: HeaderProps) => {
  return itemFlag ? (
    <View style={styles.container}>
      <View style={styles.lateralWrapper}>
        <TouchableOpacity style={styles.btnBack} onPress={callBack}>
          <ArrowBack />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fix} />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.lateralWrapper}>
        <TouchableOpacity style={styles.btnBack} onPress={callBack}>
          <ArrowBack />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fix} />
    </View>
  );
};

export default Header;
