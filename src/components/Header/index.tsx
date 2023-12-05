import React, { JSX } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { Text, useTheme } from 'rn-ui-kit';

import ArrowBack from '@/assets/icons/svg/auth/ArrowBack';

import styles from './style';

type HeaderProps = {
  title?: string;
  description?: string;
  icon?: JSX.Element;
  customGoBack?: () => void;
};

const Header = ({
  title,
  description,
  icon = <ArrowBack />,
  customGoBack,
}: HeaderProps) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const goBack = () => {
    if (navigation.canGoBack()) {
      if (customGoBack) {
        return customGoBack();
      }
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.background} edges={['top']}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnBack} onPress={goBack}>
          {icon}
        </TouchableOpacity>
        <View style={styles.wrapper}>
          {title && (
            <Text
              numberOfLines={1}
              variant="bodyMBold"
              style={styles.titleTxt}
              color={theme.text.basic}
            >
              {title}
            </Text>
          )}
          {description && (
            <Text
              numberOfLines={1}
              variant="captionRegular"
              style={styles.descriptionTxt}
              color={theme.text.neutral}
            >
              {description}
            </Text>
          )}
        </View>
        <View style={styles.fix} />
      </View>
    </SafeAreaView>
  );
};

export default Header;
