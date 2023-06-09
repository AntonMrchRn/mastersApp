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
    },
    ml10: {
      marginLeft: 10,
    },
  });
  return (
    <View style={styles.address}>
      <AddressIcon />
      <Text variant="bodySRegular" color={theme.text.basic} style={styles.ml10}>
        {address}
      </Text>
    </View>
  );
};
