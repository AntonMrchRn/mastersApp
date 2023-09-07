import React from 'react';
import { View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import WarningCircleIcon from '@/assets/icons/svg/screens/WarningCircleIcon';

import styles from './style';

type DeletionInfoBlock = {
  text: string;
};

export const DeletionInfoBlock = ({ text }: DeletionInfoBlock) => {
  const theme = useTheme();

  return (
    <>
      <View style={styles.container}>
        <WarningCircleIcon />
        <Spacer size="s" horizontal />
        <Text variant="bodyMRegular" style={styles.text}>
          {text}
        </Text>
      </View>
      <Spacer
        size="l"
        separator="bottom"
        separatorColor={theme.background.neutralDisableSecond}
      />
    </>
  );
};
