import React, { FC, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Badge, Card, TabControl, Text, Tips, useTheme } from 'rn-ui-kit';
import { Variant } from 'rn-ui-kit/lib/typescript/components/Badge';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import { NightIcon } from '@/assets/icons/svg/screens/NightIcon';
import { TaskCardDescription } from '@/components/TabScreens/TaskCard/TaskCardDescription';
import { TaskCardHeader } from '@/components/TabScreens/TaskCard/TaskCardHeader';
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
  const [tab, setTab] = useState('Описание');
  const theme = useTheme();
  const [status, setStatus] = useState<Status>('closed');
  type Status =
    | 'published'
    | 'inProgress'
    | 'workDelivery'
    | 'done'
    | 'paid'
    | 'cancelled'
    | 'closed';
  type Badge = {
    label: string;
    icon: boolean | JSX.Element;
    variant: Variant;
    secondary?: boolean;
  };
  const getBadges = (): Badge[] => {
    switch (status) {
      case 'published':
        return [
          {
            label: 'Опубликовано',
            icon: false,
            variant: 'basic',
            secondary: true,
          },
          {
            label: 'Срочно',
            icon: true,
            variant: 'secondary',
            secondary: true,
          },
          {
            label: 'Ночные работы',
            icon: <NightIcon />,
            variant: 'special',
            secondary: true,
          },
        ];
      case 'inProgress':
        return [
          {
            label: 'В работе',
            icon: false,
            variant: 'accent',
            secondary: true,
          },
          {
            label: 'Срочно',
            icon: true,
            variant: 'secondary',
            secondary: true,
          },
          {
            label: 'Ночные работы',
            icon: <NightIcon />,
            variant: 'special',
            secondary: true,
          },
        ];
      case 'workDelivery':
        return [
          {
            label: 'Сдача работ',
            icon: false,
            variant: 'warning',
            secondary: true,
          },
        ];
      case 'done':
        return [
          {
            label: 'Ожидает оплаты',
            icon: false,
            variant: 'special',
            secondary: true,
          },
        ];
      case 'paid':
        return [
          {
            label: 'Оплачено',
            icon: false,
            variant: 'success',
            secondary: true,
          },
        ];
      case 'cancelled':
        return [
          {
            label: 'Отменено',
            icon: false,
            variant: 'danger',
            secondary: true,
          },
        ];
      case 'closed':
        return [
          {
            label: 'Закрыто',
            icon: false,
            variant: 'basic',
            secondary: true,
          },
        ];
      default:
        return [];
    }
  };

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
  const handleTabChange = (item: TabItem) => {
    setTab(item.label);
  };
  const getCurrentTab = () => {
    switch (tab) {
      case 'Описание':
        return <TaskCardDescription />;
      default:
        return <TaskCardDescription />;
    }
  };
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TaskCardHeader
        goBack={goBack}
        title={'Задача ID 32996'}
        description={'Опубликовано 10 апреля в 23:52'}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.badges}>
            {getBadges().map(badge => (
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
          <TabControl data={tabs} initialId={0} onChange={handleTabChange} />
        </View>
        <Card isShadow style={styles.card}>
          {getCurrentTab()}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
