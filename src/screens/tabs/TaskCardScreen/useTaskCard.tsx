import React, { useState } from 'react';

import { Variant } from 'rn-ui-kit/lib/typescript/components/Badge';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import { NightIcon } from '@/assets/icons/svg/screens/NightIcon';
import { TaskCardDescription } from '@/components/TabScreens/TaskCard/TaskCardDescription';

export type TaskCardStatus =
  | 'published'
  | 'inProgress'
  | 'workDelivery'
  | 'done'
  | 'paid'
  | 'cancelled'
  | 'closed';
export type TaskCardBadge = {
  label: string;
  icon: boolean | JSX.Element;
  variant: Variant;
  secondary?: boolean;
};
export const useTaskCard = () => {
  const [status, setStatus] = useState<TaskCardStatus>('inProgress');
  const [tab, setTab] = useState('Описание');
  const getBadges = (): TaskCardBadge[] => {
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
        return <TaskCardDescription status={status} />;
      default:
        return <TaskCardDescription status={status} />;
    }
  };
  const onTabChange = (item: TabItem) => {
    setTab(item.label);
  };
  return {
    onTabChange,
    getBadges,
    tabs,
    getCurrentTab,
    status,
  };
};
