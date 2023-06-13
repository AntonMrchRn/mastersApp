import React, { useState } from 'react';

import dayjs from 'dayjs';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import {
  TaskCardBottomBanner,
  TaskCardBottomButton,
} from '@/components/TabScreens/TaskCard/TaskCardBottom';
import { TaskCardDescription } from '@/components/TabScreens/TaskCard/TaskCardDescription';
import { TaskCardReport } from '@/components/TabScreens/TaskCard/TaskCardReport';
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
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const onBudgetModalVisible = () => {
    setBudgetModalVisible(!budgetModalVisible);
  };
  const onBudgetSubmission = () => {
    //
  };
  const onTaskSubmission = () => {
    //
  };
  const onCancelModalVisible = () => {
    setCancelModalVisible(!cancelModalVisible);
  };
  const onWorkDelivery = () => {
    //
  };
  const onCancelTask = () => {
    onCancelModalVisible();
  };
  const onRevokeBudget = () => {
    //TODO необходимо сначала получить оффер юзера по этой таске
    //https://sandbox8.apteka-april.ru/api/offers?query=?taskID==977*userID==81?
    //далее необходимо удалить этот оффер через DELETE offers/id
    setBudgetModalVisible(!budgetModalVisible);
  };

  const [tab, setTab] = useState('Описание');
  const taskId = '978';
  const getTask = useGetTaskQuery(taskId);
  const getTaskStatuses = useGetTaskStatusesQuery();
  const task = getTask?.data?.tasks?.[0];
  const id = task?.ID || '';
  const subsetID = task?.subsetID || '';
  const isCommonFirstResponse = subsetID === 5;
  console.log(
    '🚀 ~ file: useTaskCard.tsx:62 ~ useTaskCard ~ isFirstResponse:',
    isCommonFirstResponse
  );
  const files = task?.files || [];
  const startTime = task?.startTime || '';
  const contacts = task?.contacts || [];
  const endTimePlan = task?.endTimePlan || '';
  const address = task?.object?.name || '';
  const description = task?.description || '';
  const statusID = task?.statusID;
  const outlayStatusID = task?.outlayStatusID;
  const status = getTaskStatuses?.data?.find(stat => stat.ID === statusID);
  const statusCode: TaskCardStatus = status?.code || '';
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
      case 'Отчет':
        return (
          <TaskCardReport
            activeBudgetCanceled={!!getBanner()}
            statusCode={statusCode}
          />
        );
      default:
        return <></>;
    }
  };
  const onTabChange = (item: TabItem) => {
    setTab(item.label);
  };
  const getBanner = (): TaskCardBottomBanner => {
    switch (statusCode) {
      case 'active':
        if (outlayStatusID === 4) {
          return {
            title: 'Ваша смета отклонена координатором',
            type: 'error',
            icon: 'alert',
            text: 'К сожалению, теперь вы не можете стать исполнителем этой задачи',
          };
        }
        return null;
      case 'summarizing':
        return {
          title: 'Задача на проверке',
          type: 'info',
          icon: 'info',
          text: 'Координатор проверяет выполненные услуги. После успешной проверки задача будет передана на оплату',
        };
      case 'completed':
        return {
          title: 'Выполненные услуги приняты',
          type: 'success',
          icon: 'success',
          text: 'В ближайшее время оплата поступит на вашу банковскую карту/счет',
        };
      case 'paid':
        return {
          title: 'Оплата произведена',
          type: 'success',
          icon: 'success',
          text: 'Денежные средства переведены вам на указанные в профиле реквизиты',
        };
      case 'cancelledByExecutor':
      case 'cancelledByCustomer':
        return {
          title: 'Задача отменена',
          type: 'error',
          icon: 'alert',
          text: 'По инициативе координатора выполнение задачи прекращено',
        };
      default:
        return null;
    }
  };
  const getButtons = (): TaskCardBottomButton[] => {
    switch (statusCode) {
      case 'active':
        if (outlayStatusID === 2) {
          return [
            {
              label: 'Отозвать смету',
              variant: 'outlineDanger',
              onPress: onBudgetModalVisible,
            },
          ];
        }
        if (outlayStatusID === 1) {
          return isCommonFirstResponse
            ? [
                {
                  label: 'Принять задачу',
                  variant: 'accent',
                  onPress: onTaskSubmission,
                },
              ]
            : [
                {
                  label: 'Подать смету',
                  variant: 'accent',
                  onPress: onBudgetSubmission,
                },
              ];
        }
        return [];
      case 'signing':
        return [
          {
            label: 'Сдать работы',
            variant: 'accent',
            onPress: onWorkDelivery,
          },
          {
            label: 'Отказаться от задачи',
            variant: 'outlineDanger',
            onPress: onCancelModalVisible,
          },
        ];
      default:
        return [];
    }
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
    getBanner,
    getButtons,
    budgetModalVisible,
    onBudgetModalVisible,
    onRevokeBudget,
    cancelModalVisible,
    onCancelModalVisible,
    onCancelTask,
  };
};
