import React, { FC } from 'react';
import { View } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { Text, useTheme } from 'rn-ui-kit';

import {
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName,
} from '@/types/navigation';

import { styles } from './styles';

type EstimateEditScreenProps = StackScreenProps<
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName.EstimateEdit
>;

export const EstimateEditScreen: FC<EstimateEditScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text variant={'title3'} style={styles.title} color={theme.text.basic}>
        Внесите необходимые изменения
      </Text>
    </View>
  );
};
