import React, { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';

import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';

import { styles } from './styles';

type EstimateSubmissionScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.EstimateSubmission
>;
export const EstimateSubmissionScreen: FC<
  EstimateSubmissionScreenProps
> = () => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <></>
    </SafeAreaView>
  );
};
