import React from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from 'rn-ui-kit';

import { InfoIcon } from '@/assets/icons/svg/screens/InfoIcon';
import { NoMessagesIcon } from '@/assets/icons/svg/screens/NoMessagesIcon';
import { NotFoundIcon } from '@/assets/icons/svg/screens/NotFoundIcon';
import TaskSearchClear from '@/assets/icons/svg/screens/TaskSearchClear';
import { BottomTabName, BottomTabParamList } from '@/navigation/TabNavigation';

import styles from './style';

export enum PreviewNotFoundType {
  TasksNotFound = 'TasksNotFound',
  TasksNotAvailable = 'TasksNotAvailable',
  NoTasks = 'NoTasks',
  NoMessages = 'NoMessages',
}

type PreviewProps = {
  type: PreviewNotFoundType;
  closeModal?: () => void;
};

const PreviewNotFound = ({ type, closeModal }: PreviewProps) => {
  const { navigate } = useNavigation<StackNavigationProp<BottomTabParamList>>();

  const navigateToProfile = () => {
    navigate(BottomTabName.ProfileNavigation);
    closeModal && closeModal();
  };

  const navigateToTaskSearch = () => navigate(BottomTabName.TaskSearch);

  const previews = {
    [PreviewNotFoundType.TasksNotFound]: (
      <View style={styles.wrapperNotFound}>
        <TaskSearchClear />
        <Text style={styles.title}>Задачи не найдены</Text>
        <Text style={styles.text}>
          В вашем регионе задач сейчас нет. Попробуйте продолжить поиск позже
        </Text>
      </View>
    ),
    [PreviewNotFoundType.TasksNotAvailable]: (
      <View style={styles.wrapperNotFound}>
        <NotFoundIcon />
        <Text style={styles.title}>Задачи не доступны</Text>
        <Text style={styles.text}>
          Для доступа к IT-задачам у вас должна быть подтверждена учетная запись
        </Text>
        <Button
          label="Перейти в профиль"
          onPress={navigateToProfile}
          style={styles.btn}
        />
      </View>
    ),
    [PreviewNotFoundType.NoTasks]: (
      <View style={styles.wrapperNotFound}>
        <InfoIcon />
        <Text style={styles.title}>Задач пока нет</Text>
        <Text style={styles.text}>
          Здесь будут отображаться задачи, в которых вы участвуете или подали
          смету. Найдите свою первую задачу с помощью поиска
        </Text>
        <Button
          label="Найти задачу"
          onPress={navigateToTaskSearch}
          style={styles.btn}
        />
      </View>
    ),
    [PreviewNotFoundType.NoMessages]: (
      <View style={styles.wrapperNotFound}>
        <NoMessagesIcon />
        <Text style={styles.title}>Сообщений пока нет</Text>
        <Text style={styles.text}>
          Здесь вы можете обсудить детали задачи с координатором
        </Text>
      </View>
    ),
  };

  return previews[type];
};

export default PreviewNotFound;
