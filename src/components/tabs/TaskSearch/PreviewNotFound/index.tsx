import React, { JSX } from 'react';
import { Linking, View } from 'react-native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, useTheme } from 'rn-ui-kit';

import { CalculatorLargeIcon } from '@/assets/icons/svg/estimate/CalculatorLargeIcon';
import ActiveTaskIcon from '@/assets/icons/svg/screens/ActiveTaskIcon';
import ChatIcon from '@/assets/icons/svg/screens/Chat';
import CloseIcon from '@/assets/icons/svg/screens/CloseIcon';
import ListBulletsIcon from '@/assets/icons/svg/screens/ListBulletsIcon';
import MapPinIcon from '@/assets/icons/svg/screens/MapPinIcon';
import { NoFilesIcon } from '@/assets/icons/svg/screens/NoFilesIcon';
import { OtesIcon } from '@/assets/icons/svg/screens/OtesIcon';
import SearchIcon from '@/assets/icons/svg/screens/SearchIcon';
import UserIcon from '@/assets/icons/svg/screens/UserIcon';
import Preview from '@/components/tabs/TaskSearch/PreviewNotFound/Preview';
import { storageMMKV } from '@/mmkv/storage';
import {
  ProfileScreenName,
  ProfileStackParamList,
} from '@/navigation/ProfileNavigation';
import { BottomTabName, BottomTabParamList } from '@/navigation/TabNavigation';
import { useAppDispatch } from '@/store';
import { logOut } from '@/store/slices/auth/actions';
import { ProfileTab } from '@/types/tab';

export enum PreviewNotFoundType {
  TasksNotFound = 'TasksNotFound',
  TasksNotAvailable = 'TasksNotAvailable',
  NoTasks = 'NoTasks',
  NoMessagesTaskCanceled = 'NoMessagesTaskCanceled',
  NoMessagesTaskClosed = 'NoMessagesTaskClosed',
  NoMessagesYet = 'NoMessagesYet',
  MessagesNotAvailable = 'MessagesNotAvailable',
  RegionNotChanged = 'RegionNotChanged',
  NoHistoryEvents = 'NoHistoryEvents',
  NoContractors = 'NoContractors',
  ReportNotAvailable = 'ReportNotAvailable',
  ReportNotYetAvailable = 'ReportNotYetAvailable',
  NoFiles = 'NoFiles',
  CommentsClosedNow = 'CommentsClosedNow',
  ServiceNotFound = 'ServiceNotFound',
  AccessRestricted = 'AccessRestricted',
  NoEstimate = 'NoEstimate',
}

type PreviewContent = {
  icon: JSX.Element;
  title: string;
  text?: string;
  button?: JSX.Element;
};

type PreviewNotFoundProps = {
  type: PreviewNotFoundType;
  closeModal?: () => void;
};

const PreviewNotFound = ({ type, closeModal }: PreviewNotFoundProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { navigate } =
    useNavigation<
      CompositeNavigationProp<
        BottomTabNavigationProp<BottomTabParamList>,
        StackNavigationProp<ProfileStackParamList>
      >
    >();

  const navigateToProfile = () => {
    navigate(BottomTabName.ProfileNavigation, {
      screen: ProfileScreenName.Profile,
    });
    closeModal && closeModal();
  };
  const navigateToProfileOnActivity = () => {
    navigate(BottomTabName.ProfileNavigation, {
      screen: ProfileScreenName.Profile,
      params: { tab: { id: 2, label: ProfileTab.Activity } },
    });
  };

  const navigateToTaskSearch = () => navigate(BottomTabName.TaskSearch);

  const onExit = () => {
    storageMMKV.clearAll();
    dispatch(logOut());
  };

  const navigateToSite = async () => {
    const url = 'https://mastera-service.ru/';
    const canOpenURL = await Linking.canOpenURL(url);
    if (canOpenURL) {
      Linking.openURL(url);
    }
  };

  const previewContents: Record<PreviewNotFoundType, PreviewContent> = {
    [PreviewNotFoundType.TasksNotFound]: {
      icon: <SearchIcon />,
      title: 'Задачи не найдены',
      text: 'В вашем регионе задач сейчас нет. Попробуйте продолжить поиск позже',
    },
    [PreviewNotFoundType.NoHistoryEvents]: {
      icon: <ActiveTaskIcon />,
      title: 'Событий нет',
      text: 'Здесь будет отображаться ход событий задачи, когда задача перейдет в работу',
    },
    [PreviewNotFoundType.TasksNotAvailable]: {
      icon: <CloseIcon fill={theme.icons.danger} size={40} />,
      title: 'Задачи не доступны',
      text: 'Для доступа к IT-задачам у вас должна быть подтверждена учетная запись',
      button: <Button label="Перейти в профиль" onPress={navigateToProfile} />,
    },
    [PreviewNotFoundType.NoTasks]: {
      icon: <ListBulletsIcon />,
      title: 'Задач пока нет',
      text: 'Здесь будут отображаться задачи, в которых вы участвуете или подали смету. Найдите свою первую задачу с помощью поиска',
      button: <Button label="Найти задачу" onPress={navigateToTaskSearch} />,
    },
    [PreviewNotFoundType.NoMessagesYet]: {
      icon: <ChatIcon />,
      title: 'Сообщений пока нет',
      text: 'Здесь вы можете обсудить детали задачи с координатором',
    },
    [PreviewNotFoundType.NoMessagesTaskCanceled]: {
      icon: <ChatIcon />,
      title: 'Сообщений нет',
      text: 'Задача отменена. Отправка сообщений координатору недоступна',
    },
    [PreviewNotFoundType.NoMessagesTaskClosed]: {
      icon: <ChatIcon />,
      title: 'Сообщений нет',
      text: 'Задача закрыта. Отправка сообщений координатору недоступна',
    },
    [PreviewNotFoundType.CommentsClosedNow]: {
      icon: <ChatIcon />,
      title: 'Комментарии пока закрыты',
      text: 'Отправка сообщений будет доступна, когда задача перейдет в работу',
    },
    [PreviewNotFoundType.MessagesNotAvailable]: {
      icon: <ChatIcon />,
      title: 'Комментарии пока закрыты',
      text: 'Отправка сообщений будет доступна в случае назначения вас в качестве исполнителя',
    },
    [PreviewNotFoundType.AccessRestricted]: {
      icon: <CloseIcon fill={theme.icons.danger} size={40} />,
      title: 'Доступ ограничен',
      text: 'Мобильное приложение работает только для исполнителей. Используйте веб-версию',
      button: (
        <View style={{ gap: 16, width: '100%' }}>
          <Button label="Перейти на сайт" onPress={navigateToSite} />
          <Button
            label="Выйти"
            onPress={onExit}
            style={{ backgroundColor: 'transparent' }}
            labelStyle={{ color: theme.text.basic }}
          />
        </View>
      ),
    },
    [PreviewNotFoundType.RegionNotChanged]: {
      icon: <MapPinIcon />,
      title: 'Регион не выбран',
      text: 'Для поиска задач необходимо в Профиле выбрать подходящий регион',
      button: (
        <Button
          label="Перейти в профиль"
          onPress={navigateToProfileOnActivity}
        />
      ),
    },
    [PreviewNotFoundType.NoContractors]: {
      icon: <UserIcon />,
      title: 'У вас нет подрядчиков',
      text: 'Чтобы выполнять задачи в роли куратора вам необходимо пригласить в свою команду других пользователей',
    },
    [PreviewNotFoundType.ReportNotAvailable]: {
      icon: <OtesIcon />,
      title: 'Отчет недоступен',
      text: 'Отправка файлов доступна только назначенным исполнителям',
    },
    [PreviewNotFoundType.ReportNotYetAvailable]: {
      icon: <OtesIcon />,
      title: 'Отчет пока недоступен',
      text: 'Вы сможете отправлять файлы для подтверждения выполненных услуг, когда задача перейдет в работу',
    },
    [PreviewNotFoundType.NoFiles]: {
      icon: <NoFilesIcon />,
      title: 'Файлов нет',
    },
    [PreviewNotFoundType.ServiceNotFound]: {
      icon: <CloseIcon fill={theme.icons.danger} size={40} />,
      title: 'Услуга не найдена',
      text: 'Пожалуйста, убедитесь, что все слова написаны без ошибок или попробуйте другой запрос',
    },
    [PreviewNotFoundType.NoEstimate]: {
      icon: <CalculatorLargeIcon />,
      title: 'Сметы нет',
      text: 'В данной задаче смета не предусмотрена',
    },
  };

  const currentPreview = previewContents[type];

  return (
    <Preview
      type={type}
      text={currentPreview.text}
      icon={currentPreview.icon}
      title={currentPreview.title}
      button={currentPreview.button}
    />
  );
};

export default PreviewNotFound;
