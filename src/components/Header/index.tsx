import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackHeaderProps } from '@react-navigation/stack';

import ArrowBack from '@/assets/icons/svg/auth/ArrowBack';

import styles from './style';

type HeaderProps = {
  label?: string;
};

const Header = ({ navigation, label = '' }: HeaderProps & StackHeaderProps) => (
  <SafeAreaView style={styles.wrapper} edges={['top']}>
    <View style={styles.container}>
      <View style={styles.lateralWrapper}>
        <TouchableOpacity style={styles.btnBack} onPress={navigation.goBack}>
          <ArrowBack />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fix} />
    </View>
  </SafeAreaView>
);

export default Header;
