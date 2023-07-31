import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from 'rn-ui-kit';

import { InfoIcon } from '@/assets/icons/svg/screens/InfoIcon';
import { NoMessagesIcon } from '@/assets/icons/svg/screens/NoMessagesIcon';
import { NotFoundIcon } from '@/assets/icons/svg/screens/NotFoundIcon';
import TaskSearchClear from '@/assets/icons/svg/screens/TaskSearchClear';
import Preview from '@/components/tabs/TaskSearch/PreviewNotFound/Preview';
import { BottomTabName, BottomTabParamList } from '@/navigation/TabNavigation';

export enum PreviewNotFoundType {
  TasksNotFound = 'TasksNotFound',
  TasksNotAvailable = 'TasksNotAvailable',
  NoTasks = 'NoTasks',
  NoMessages = 'NoMessages',
  MessagesNotAvailable = 'MessagesNotAvailable',
}

type PreviewNotFoundProps = {
  type: PreviewNotFoundType;
  closeModal?: () => void;
};

const PreviewNotFound = ({ type, closeModal }: PreviewNotFoundProps) => {
  const { navigate } = useNavigation<StackNavigationProp<BottomTabParamList>>();

  const navigateToProfile = () => {
    navigate(BottomTabName.ProfileNavigation);
    closeModal && closeModal();
  };
  const navigateToTaskSearch = () => navigate(BottomTabName.TaskSearch);

  const previewContents = {
    [PreviewNotFoundType.TasksNotFound]: {
      icon: <TaskSearchClear />,
      title: 'Задачи не найдены',
      text: 'В вашем регионе задач сейчас нет. Попробуйте продолжить поиск позже',
      button: undefined,
    },
    [PreviewNotFoundType.TasksNotAvailable]: {
      icon: <NotFoundIcon />,
      title: 'Задачи не доступны',
      text: 'Для доступа к IT-задачам у вас должна быть подтверждена учетная запись',
      button: <Button label="Перейти в профиль" onPress={navigateToProfile} />,
    },
    [PreviewNotFoundType.NoTasks]: {
      icon: <InfoIcon />,
      title: 'Задач пока нет',
      text: 'Здесь будут отображаться задачи, в которых вы участвуете или подали смету. Найдите свою первую задачу с помощью поиска',
      button: <Button label="Найти задачу" onPress={navigateToTaskSearch} />,
    },
    [PreviewNotFoundType.NoMessages]: {
      icon: <NoMessagesIcon />,
      title: 'Сообщений пока нет',
      text: 'Здесь вы можете обсудить детали задачи с координатором',
      button: undefined,
    },
    [PreviewNotFoundType.MessagesNotAvailable]: {
      icon: <NoMessagesIcon />,
      title: 'Комментарии пока закрыты',
      text: 'Отправка сообщений будет доступна в случае назначения вас в качестве исполнителя',
      button: undefined,
    },
  };

  const currentPreview = previewContents[type];

  return (
    <Preview
      title={currentPreview.title}
      text={currentPreview.text}
      icon={currentPreview.icon}
      button={currentPreview.button}
    />
  );
};

export default PreviewNotFound;
