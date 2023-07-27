import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Text, useTheme } from 'rn-ui-kit';

import ArrowBack from '@/assets/icons/svg/auth/ArrowBack';
import { CheckmarkIcon } from '@/assets/icons/svg/estimate/CheckmarkIcon';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { BottomTabName, BottomTabParamList } from '@/navigation/TabNavigation';

import { styles } from './styles';

export type EstimateSubmissionSuccessScreenProps = CompositeScreenProps<
  StackScreenProps<AppStackParamList, AppScreenName.EstimateSubmissionSuccess>,
  BottomTabScreenProps<BottomTabParamList>
>;
export const EstimateSubmissionSuccessScreen: FC<
  EstimateSubmissionSuccessScreenProps
> = ({ navigation, route }) => {
  const theme = useTheme();

  const { taskId } = route.params;

  const navigateMyTasks = () => {
    navigation.navigate(BottomTabName.MyTasks);
  };
  const navigateTask = () => {
    navigation.navigate(AppScreenName.TaskCard, { taskId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.arrow} onPress={navigateTask}>
        <ArrowBack />
        <Text variant="bodyMRegular">К задаче</Text>
      </TouchableOpacity>
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
      <Button label="Перейти в Мои задачи" onPress={navigateMyTasks} />
    </SafeAreaView>
  );
};
