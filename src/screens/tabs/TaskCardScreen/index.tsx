import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import {
  Badge,
  Button,
  Card,
  TabControl,
  Text,
  Tips,
  useTheme,
} from 'rn-ui-kit';
import { Variant } from 'rn-ui-kit/lib/typescript/components/Badge';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import { AddressIcon } from '@/assets/icons/svg/screens/AddressIcon';
import { CalendarCheckIcon } from '@/assets/icons/svg/screens/CalendarCheckIcon';
import { CaretDownIcon } from '@/assets/icons/svg/screens/CaretDownIcon';
import { NightIcon } from '@/assets/icons/svg/screens/NightIcon';
import { DownloadManager } from '@/components/DownloadManager';
import { TaskCardHeader } from '@/components/TaskCardHeader';
import {
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName,
} from '@/types/navigation';

import { styles } from './styles';

type TaskCardScreenProps = StackScreenProps<
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName.TaskCard
>;
export const TaskCardScreen: FC<TaskCardScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  type Badge = {
    label: string;
    icon: boolean | JSX.Element;
    variant: Variant;
    secondary?: boolean;
  };
  const badges: Badge[] = [
    { label: 'Опубликовано', icon: false, variant: 'basic', secondary: true },
    { label: 'Срочно', icon: true, variant: 'secondary', secondary: true },
    {
      label: 'Ночные работы',
      icon: <NightIcon />,
      variant: 'special',
      secondary: true,
    },
  ];
  const tabs: TabItem[] = [
    {
      id: 0,
      label: 'Описание',
      icon: false,
    },
    {
      id: 1,
      label: 'Смета',
      icon: false,
    },
    {
      id: 2,
      label: 'Комментарии',
      icon: false,
    },
    {
      id: 3,
      label: 'Отчет',
      icon: false,
    },
    {
      id: 4,
      label: 'История',
      icon: false,
    },
  ];
  const files = [
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/19945c8cc72150f1f1b08befd230cda5.png',
      name: 'Screenshot_7',
      fileID: 282,
      userID: 45,
      isCheck: false,
      isOffer: false,
      mime: 'image/png',
      extension: 'png',
      extensionOriginal: 'png',
      isApplication: true,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/c5509c4413f1bb001e430af9ba78b3dc.jpg',
      name: '169887-gorod-zdanie-purpur-tsvetnoy-liniya_gorizonta-7680x4320',
      fileID: 283,
      userID: 45,
      isCheck: false,
      isOffer: false,
      mime: 'image/jpeg',
      extension: 'jpg',
      extensionOriginal: 'jpg',
      isApplication: true,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/5f050b889b25f9ed68f7db4f7072ead4.mp4',
      name: '2022-09-30 14-54-49_Trim',
      fileID: 285,
      userID: 45,
      isCheck: false,
      isOffer: false,
      mime: 'video/mp4',
      extension: 'video',
      extensionOriginal: 'mp4',
      isApplication: true,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/af2d14c8f901b6ed9fa7e57f6cb9b5b3.jpg',
      name: '170099-priroda-derevo-dekoracii-peyzash-doroga-3840x2160',
      fileID: 290,
      userID: 43,
      isCheck: false,
      isOffer: true,
      mime: 'image/jpeg',
      extension: 'jpg',
      extensionOriginal: 'jpg',
      isApplication: false,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/995b4b540924a3b2bb13cdd638f4bda8.webp',
      name: 'test11234',
      fileID: 574,
      userID: 37,
      isCheck: false,
      isOffer: false,
      mime: 'image/webp',
      extension: 'webp',
      extensionOriginal: 'webp',
      isApplication: false,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/c8116803277e5ab2421e3dcf67d35c87.webp',
      name: 'test1123',
      fileID: 575,
      userID: 37,
      isCheck: false,
      isOffer: false,
      mime: 'image/webp',
      extension: 'webp',
      extensionOriginal: 'webp',
      isApplication: false,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/816a2b1781e343aa9c8e09e98dfc6f2f.pdf',
      name: 'Act-180',
      fileID: 578,
      userID: 8,
      isCheck: false,
      isOffer: false,
      mime: 'application/pdf',
      extension: 'pdf',
      extensionOriginal: 'pdf',
      isApplication: false,
      size: 100,
    },
  ];
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TaskCardHeader
        navigation={navigation}
        title={'Задача ID 32996'}
        description={'Опубликовано 10 апреля в 23:52'}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.badges}>
            {badges.map(badge => (
              <Badge
                secondary={badge?.secondary}
                label={badge.label}
                icon={badge.icon}
                variant={badge.variant}
                style={styles.badge}
                key={badge.label}
              />
            ))}
          </View>
          <Text variant="title2" style={styles.title} color={theme.text.basic}>
            Какое-то длинное название задания на 2-3 строчки
          </Text>
          <Text variant="title3" style={styles.price} color={theme.text.basic}>
            18 000 ₽
          </Text>
          <Tips
            type={'warning'}
            text="Срок подачи сметы до 10 апреля 19:00"
            containerStyle={styles.tips}
          />
          <TabControl data={tabs} initialId={0} />
        </View>
        <Card isShadow style={styles.card}>
          <Text variant="title3" style={styles.task} color={theme.text.basic}>
            О задаче
          </Text>
          <Text
            variant="bodySRegular"
            style={styles.text}
            color={theme.text.basic}
          >
            Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies egestas
            tempus feugiat sagittis at gravida. Duis vitae elit habitant tortor
            viverra semper dictum ultricies non. Lectus morbi ut nascetur
            varius. Etiam urna tincidunt nulla non leo malesuada consequat orci
            eget. Amet aliquet eu est egestas dictum interdum mattis vestibulum.
            Vitae integer. Tincidunt ultricies egestas tempus feugiat sagittis
            at gravida. Duis vitae elit habitant tortor viverra semper dictum
            ultricies non. Lectus morbi ut nascetur varius.
          </Text>
          <View style={styles.address}>
            <AddressIcon />
            <Text
              variant="bodySRegular"
              color={theme.text.basic}
              style={styles.ml10}
            >
              Краснодар, ул. Чекистов 24, кв. 89, нежилые помещения 1,2,3,4,5,6
              (Аптека Апрель)
            </Text>
          </View>
          <View style={styles.date}>
            <CalendarCheckIcon />
            <Text
              variant="bodySRegular"
              color={theme.text.basic}
              style={styles.ml10}
            >
              с 12 апреля 09:00 по 17 апреля 18:00
            </Text>
          </View>
          <View style={styles.attachments}>
            <Text variant="title3" color={theme.text.basic} style={styles.mr11}>
              Вложения
            </Text>
            <CaretDownIcon />
          </View>
          <DownloadManager files={files} />
          <View style={styles.button}>
            <Button label="Подать смету" labelStyle={styles.labelStyle} />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
