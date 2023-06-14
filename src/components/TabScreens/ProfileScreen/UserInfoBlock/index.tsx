import React from 'react';
import { View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import styles from './style';

type UserInfoBlockProps = {
  label: string;
  info: string;
};

const UserInfoBlock = ({ label, info }: UserInfoBlockProps) => {
  const theme = useTheme();

  return (
    <>
      <View style={styles.container}>
        <Text variant="captionRegular" color={theme.text.neutral}>
          {label}
        </Text>
        <Spacer size="xs" />
        <Text variant="bodyMRegular">{info}</Text>
      </View>
      <View
        style={[
          styles.line,
          { backgroundColor: theme.background.neutralDisableSecond },
        ]}
      />
    </>
  );
};

export default UserInfoBlock;
