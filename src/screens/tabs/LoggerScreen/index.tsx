import React, { FC } from 'react';
import NetworkLogger from 'react-native-network-logger';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { BottomTabName, BottomTabParamList } from '@/navigation/TabNavigation';

import { styles } from './styles';

type LoggerScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  BottomTabName.Logger
>;
export const LoggerScreen: FC<LoggerScreenProps> = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <NetworkLogger />
    </SafeAreaView>
  );
};
