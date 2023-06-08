import React, { useState } from 'react';

import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import { NightIcon } from '@/assets/icons/svg/screens/NightIcon';
import { TaskCardDescription } from '@/components/TabScreens/TaskCard/TaskCardDescription';
import { TaskBadge } from '@/components/task/TaskBadges';

export type TaskCardStatus =
  | 'published'
  | 'inProgress'
  | 'workDelivery'
  | 'done'
  | 'paid'
  | 'cancelled'
  | 'closed';

export const useTaskCard = () => {
  const [status, setStatus] = useState<TaskCardStatus>('inProgress');
  const [tab, setTab] = useState('Описание');
  const getBadges = (): TaskBadge[] => {
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
  const getCurrentTab = () => {
    switch (tab) {
      case 'Описание':
        return <TaskCardDescription status={status} setStatus={setStatus} />;
      default:
        return <TaskCardDescription status={status} setStatus={setStatus} />;
    }
  };
  const onTabChange = (item: TabItem) => {
    setTab(item.label);
  };
  const badges = getBadges();
  return {
    onTabChange,
    badges,
    tabs,
    getCurrentTab,
    status,
  };
};
