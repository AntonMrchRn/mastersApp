import React from 'react';
import { View } from 'react-native';

import { CheckBox, Spacer, Text, useTheme } from 'rn-ui-kit';

import { hitSlop } from '@/constants/platform';

import styles from './style';

type SelectableModalItem = {
  text: string;
  isChecked: boolean;
  onSelect: () => void;
};

const SelectableModalItem = ({
  text,
  onSelect,
  isChecked,
}: SelectableModalItem) => {
  const theme = useTheme();

  return (
    <>
      <View style={styles.container}>
        <Text variant="bodyMRegular" style={styles.text}>
          {text}
        </Text>
        <CheckBox
          hitSlop={hitSlop}
          onPress={onSelect}
          checked={isChecked}
          style={isChecked && { backgroundColor: theme.background.accent }}
        />
      </View>
      <Spacer
        separator="bottom"
        separatorColor={theme.background.neutralDisableSecond}
      />
    </>
  );
};

export default SelectableModalItem;
