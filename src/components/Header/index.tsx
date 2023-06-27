import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackHeaderProps } from '@react-navigation/stack';
import { Text, useTheme } from 'rn-ui-kit';

import ArrowBack from '@/assets/icons/svg/auth/ArrowBack';

import styles from './style';

type HeaderProps = StackHeaderProps & {
  label?: string;
};

const Header: FC<HeaderProps> = ({ navigation, label = '' }) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={styles.wrapper} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.lateralWrapper}>
          <TouchableOpacity style={styles.btnBack} onPress={navigation.goBack}>
            <ArrowBack />
          </TouchableOpacity>
        </View>
        <Text variant={'bodyMBold'} color={theme.text.basic}>
          {label}
        </Text>
        <View style={styles.fix} />
      </View>
    </SafeAreaView>
  );
};

export default Header;
