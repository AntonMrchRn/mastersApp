import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from 'rn-ui-kit';

import { InfoIcon } from '@/assets/icons/svg/screens/InfoIcon';
import { NotFoundIcon } from '@/assets/icons/svg/screens/NotFoundIcon';
import TaskSearchClear from '@/assets/icons/svg/screens/TaskSearchClear';
import { BottomTab, RootStackParamList } from '@/types/navigation';

import styles from './style';

export type PreviewProps = {
  type?: number;
};

const PreviewNotFound: FC<PreviewProps> = ({ type }) => {
  if (type === 1) {
    return (
      <View style={styles.wrapperNotFound}>
        <TaskSearchClear />
        <Text style={styles.title}>Задачи не найдены</Text>
        <Text style={styles.text}>
          В вашем регионе задач сейчас нет. Попробуйте продолжить поиск позже
        </Text>
      </View>
    );
  }
  if (type === 2) {
    const { navigate } =
      useNavigation<StackNavigationProp<RootStackParamList>>();

    const onPress = () => navigate(BottomTab.ProfileNavigation);

    return (
      <View style={styles.wrapperNotFound}>
        <NotFoundIcon />
        <Text style={styles.title}>Задачи не доступны</Text>
        <Text style={styles.text}>
          Для доступа к IT-задачам у вас должна быть подтверждена учетная запись
        </Text>
        <Button
          label="Перейти в профиль"
          onPress={onPress}
          style={styles.btn}
        />
      </View>
    );
  }
  if (type === 3) {
    const { navigate } =
      useNavigation<StackNavigationProp<RootStackParamList>>();

    const onPress = () => navigate(BottomTab.TaskSearchNavigation);

    return (
      <View style={styles.wrapperNotFound}>
        <InfoIcon />
        <Text style={styles.title}>Задач пока нет</Text>
        <Text style={styles.text}>
          Здесь будут отображаться задачи, в которых вы участвуете или подали
          смету. Найдите свою первую задачу с помощью поиска
        </Text>
        <Button label="Найти задачу" onPress={onPress} style={styles.btn} />
      </View>
    );
  } else return <></>;
};

export default PreviewNotFound;
