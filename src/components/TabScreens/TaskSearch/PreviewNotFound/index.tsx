import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from 'rn-ui-kit';

import { InfoIcon } from '@/assets/icons/svg/screens/InfoIcon';
import { NotFoundIcon } from '@/assets/icons/svg/screens/NotFoundIcon';
import TaskSearchClear from '@/assets/icons/svg/screens/TaskSearchClear';
import { BottomTabName, BottomTabParamList } from '@/navigation/TabNavigation';

import styles from './style';

export type PreviewProps = {
  type?: number;
  closeModal?: () => void;
};

const PreviewNotFound: FC<PreviewProps> = ({ type, closeModal }) => {
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
      useNavigation<StackNavigationProp<BottomTabParamList>>();

    const onPress = () => {
      navigate(BottomTabName.ProfileNavigation);
      closeModal && closeModal();
    };

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
      useNavigation<StackNavigationProp<BottomTabParamList>>();

    const onPress = () => navigate(BottomTabName.TaskSearch);

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
  }
  if (type === 4) {
    return (
      <View style={styles.wrapperNotFound}>
        <InfoIcon />
        <Text style={styles.title}>Сообщений пока нет</Text>
        <Text style={styles.text}>
          Здесь вы можете обсудить детали задачи с координатором
        </Text>
      </View>
    );
  } else return <></>;
};

export default PreviewNotFound;
