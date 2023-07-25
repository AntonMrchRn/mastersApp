import React, { FC } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Button, Text, useTheme } from 'rn-ui-kit';

import { CheckmarkIcon } from '@/assets/icons/svg/estimate/CheckmarkIcon';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';

import { styles } from './styles';

type EstimateSubmissionSuccessScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.EstimateSubmissionSuccess
>;
export const EstimateSubmissionSuccessScreen: FC<
  EstimateSubmissionSuccessScreenProps
> = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <View />
      <View style={styles.body}>
        <View
          style={[
            styles.icon,
            { backgroundColor: theme.background.fieldSuccess },
          ]}
        >
          <CheckmarkIcon />
        </View>
        <Text variant={'title2'} color={theme.text.basic} style={styles.title}>
          Вы успешно подали смету
        </Text>
        <Text
          variant={'bodySRegular'}
          color={theme.text.neutral}
          style={styles.description}
        >
          Скоро координатор назначит исполнителя. Проверить статус задачи можно
          во вкладке Мои задачи
        </Text>
      </View>
      <Button label="Перейти в Мои задачи" />
    </SafeAreaView>
  );
};
