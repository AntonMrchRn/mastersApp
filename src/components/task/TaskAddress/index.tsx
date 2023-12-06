import React, { FC } from 'react';
import { View } from 'react-native';

import { Text, useTheme } from 'rn-ui-kit';

import { AddressIcon } from '@/assets/icons/svg/screens/AddressIcon';

import { styles } from './styles';

type TaskAddressProps = {
  address: string;
  regionID?: number;
  textColor?: string;
};

export const TaskAddress: FC<TaskAddressProps> = ({
  address,
  regionID,
  textColor,
}) => {
  const theme = useTheme();

  const color = textColor || theme.text.neutral;

  return (
    <View style={styles.address}>
      <View style={styles.wrapperIcon}>
        <AddressIcon fill={color} />
      </View>
      <View style={styles.ml10}>
        <Text variant="captionRegular" color={color}>
          {address}
        </Text>
        {!!regionID && (
          <Text
            variant="captionRegular"
            color={theme.text.neutral}
            style={styles.id}
          >
            ID {regionID}
          </Text>
        )}
      </View>
    </View>
  );
};
