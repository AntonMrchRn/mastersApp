import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, useTheme } from 'rn-ui-kit';

import { AddressIcon } from '@/assets/icons/svg/screens/AddressIcon';

type TaskAddressProps = {
  address: string;
};

export const TaskAddress: FC<TaskAddressProps> = ({ address }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    address: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    ml10: { marginLeft: 7 },
    wrapperIcon: { width: 20, alignItems: 'center', bottom: 2 },
  });

  return (
    <View style={styles.address}>
      <View style={styles.wrapperIcon}>
        <AddressIcon />
      </View>
      <Text
        variant="captionRegular"
        color={theme.text.basic}
        style={styles.ml10}
      >
        {address}
      </Text>
    </View>
  );
};
