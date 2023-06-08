import React, { useState } from 'react';

import dayjs from 'dayjs';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import { TaskCardDescription } from '@/components/TabScreens/TaskCard/TaskCardDescription';
import { useGetTaskQuery, useGetTaskStatusesQuery } from '@/store/api/tasks';

export type TaskCardStatus =
  | 'pending'
  | 'active'
  | 'matching'
  | 'signing'
  | 'summarizing'
  | 'completed'
  | 'cancelledByExecutor'
  | 'cancelledByCustomer'
  | 'paid'
  | 'returned'
  | 'work'
  | 'closed'
  | '';

export const useTaskCard = () => {
  const [tab, setTab] = useState('Описание');
  const taskId = '926';
  const getTask = useGetTaskQuery(taskId);
  const getTaskStatuses = useGetTaskStatusesQuery();
  const task = getTask?.data?.tasks?.[0];
  const id = task?.ID || '';
  const files = task?.files || [];
  const startTime = task?.startTime || '';
  const contacts = task?.contacts || [];
  const endTimePlan = task?.endTimePlan || '';
  const address = task?.object?.name || '';
  const description = task?.description || '';
  const statusID = task?.statusID;
  const status = getTaskStatuses?.data?.find(stat => stat.ID === statusID);
  const statusCode = status?.code || '';
  const name = task?.name || '';
  const budget = `${task?.budget} ₽` || '';
  const isNight = task?.isNight || false;
  const isUrgent = task?.isUrgent || false;
  const publicTime = task?.publicTime
    ? `Опубликовано ${dayjs(task?.publicTime).format('DD MMMM в HH:mm')}`
    : '';
  const budgetEndTime = task?.endTimePlan
    ? `Срок подачи сметы до ${dayjs(task?.endTimePlan).format(
        'DD MMMM в HH:mm'
      )}`
    : '';

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
        return (
          <TaskCardDescription
            statusCode={statusCode}
            description={description}
            address={address}
            startTime={startTime}
            endTimePlan={endTimePlan}
            contacts={contacts}
            files={files}
          />
        );
      default:
        return <></>;
    }
  };
  const onTabChange = (item: TabItem) => {
    setTab(item.label);
  };
  return {
    onTabChange,
    tabs,
    getCurrentTab,
    id,
    name,
    budget,
    isNight,
    publicTime,
    isUrgent,
    statusCode,
    budgetEndTime,
  };
};
