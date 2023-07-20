import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Text, useTheme } from 'rn-ui-kit';

import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';

import { Item } from './Item';

import { styles } from './styles';

type EstimateSubmissionScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.EstimateSubmission
>;
export const EstimateSubmissionScreen: FC<
  EstimateSubmissionScreenProps
> = () => {
  const theme = useTheme();

  const methods = useForm({
    defaultValues: { 123: '' },
    mode: 'onChange',
  });

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Text variant="title3" color={theme.text.basic} style={styles.title}>
        Ваше ценовое предложение
      </Text>
      <FormProvider {...methods}>
        <Item
          title={'title'}
          description={'description'}
          count={10}
          sum={10000}
        />
      </FormProvider>
    </SafeAreaView>
  );
};
