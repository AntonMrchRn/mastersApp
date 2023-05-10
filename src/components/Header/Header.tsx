import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBack from '../../assets/icons/svg/auth/ArrowBack';

import { styles } from './styles';

const Header = (props: any) => {
  return props.itemFlag ? (
    <SafeAreaView edges={['top']}>
      <View style={styles.container}>
        <View style={styles.lateralWrapper}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => props.navigation.goBack()}
          >
            <ArrowBack />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>{props.label}</Text>
        <View style={styles.fix} />
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView edges={['top']}>
      <View style={styles.container}>
        <View style={styles.lateralWrapper}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => props.navigation.goBack()}
          >
            <ArrowBack />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>{props.label}</Text>
        <View style={styles.fix} />
      </View>
    </SafeAreaView>
  );
};

export default Header;
