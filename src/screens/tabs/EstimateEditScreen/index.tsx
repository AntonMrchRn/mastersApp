import React, { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from 'rn-ui-kit';

import {
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName,
} from '@/types/navigation';

import { styles } from './styles';
import { View } from 'react-native';
import Header from '@/components/Header';

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
      <></>
    </View>
  );
};
