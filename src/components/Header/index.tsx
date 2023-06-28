import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Text, useTheme } from 'rn-ui-kit';

import ArrowBack from '@/assets/icons/svg/auth/ArrowBack';

import styles from './style';

type HeaderProps = {
  title?: string;
  description?: string;
};

const Header = ({ title, description }: HeaderProps) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnBack} onPress={goBack}>
        <ArrowBack />
      </TouchableOpacity>
      <View style={styles.wrapper}>
        {title && (
          <Text variant="bodyMBold" color={theme.text.basic}>
            {title}
          </Text>
        )}
        {description && (
          <Text variant="captionRegular" color={theme.text.neutral}>
            {description}
          </Text>
        )}
      </View>
      <View style={styles.fix} />
    </View>
  );
};

export default Header;
