import React, { useState } from 'react';

import dayjs from 'dayjs';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import {
  TaskCardBottomBanner,
  TaskCardBottomButton,
} from '@/components/TabScreens/TaskCard/TaskCardBottom';
import { TaskCardDescription } from '@/components/TabScreens/TaskCard/TaskCardDescription';
import { TaskCardReport } from '@/components/TabScreens/TaskCard/TaskCardReport';
import {
  useGetTaskQuery,
  useGetTaskStatusesQuery,
  usePatchTaskMutation,
} from '@/store/api/tasks';

export enum TaskType {
  IT_AUCTION_SALE = 1,
  IT_FIRST_RESPONCE = 2,
  IT_INTERNAL_EXECUTIVES = 3,
  COMMON_AUCTION_SALE = 4,
  COMMON_FIRST_RESPONCE = 5,
}
export enum StatusType {
  /**
   * Подготовка
   */
  PENDING = 1,
  /**
   * Опубликовано
   */
  ACTIVE = 2,
  /**
   * Согласование смет
   */
  MATCHING = 3,
  /**
   * Выполнение / Подписание документов
   */
  SIGNING = 4,
  /**
   * Сдача работ
   */
  SUMMARIZING = 5,
  /**
   * Выполнено
   */
  COMPLETED = 6,
  /**
   * Отменено исполнителем
   */
  CANCELLED_BY_EXECUTOR = 7,
  /**
   * Отменено заказчиком
   */
  CANCELLED_BY_CUSTOMER = 8,
  /**
   * Оплачено
   */
  PAID = 9,
  /**
   * Возвращено на доработку
   */
  RETURNED = 10,
  /**
   * В работе
   */
  WORK = 11,
  /**
   * Закрыто
   */
  CLOSED = 12,
}

export const useTaskCard = () => {
  const [tab, setTab] = useState('Описание');
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const taskId = '978';
  const getTask = useGetTaskQuery(taskId);

  const [patchTask, taskMutation] = usePatchTaskMutation();

  const task = getTask?.data?.tasks?.[0];
  const id = task?.ID || 0;
  const subsetID = task?.subsetID || '';
  const files = task?.files || [];
  const startTime = task?.startTime || '';
  const contacts = task?.contacts || [];
  const endTimePlan = task?.endTimePlan || '';
  const address = task?.object?.name || '';
  const description = task?.description || '';
  const statusID: StatusType | undefined = task?.statusID;
  const outlayStatusID = task?.outlayStatusID;
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

  const onBudgetModalVisible = () => {
    setBudgetModalVisible(!budgetModalVisible);
  };
  const onBudgetSubmission = () => {
    //
  };
  const onTaskSubmission = () => {
    patchTask({
      //id таски
      ID: id,
      //статус для принятия в работу
      statusID: 11,
      //id профиля
      executors: [{ ID: 222 }],
    });
    getTask.refetch();
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
  const getCurrentTab = () => {
    switch (tab) {
      case 'Описание':
        return (
          <TaskCardDescription
            statusID={statusID}
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
            statusID={statusID}
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
    switch (statusID) {
      case StatusType.ACTIVE:
        if (outlayStatusID === 4) {
          return {
            title: 'Ваша смета отклонена координатором',
            type: 'error',
            icon: 'alert',
            text: 'К сожалению, теперь вы не можете стать исполнителем этой задачи',
          };
        }
        return null;
      case StatusType.SUMMARIZING:
        return {
          title: 'Задача на проверке',
          type: 'info',
          icon: 'info',
          text: 'Координатор проверяет выполненные услуги. После успешной проверки задача будет передана на оплату',
        };
      case StatusType.COMPLETED:
        return {
          title: 'Выполненные услуги приняты',
          type: 'success',
          icon: 'success',
          text: 'В ближайшее время оплата поступит на вашу банковскую карту/счет',
        };
      case StatusType.PAID:
        return {
          title: 'Оплата произведена',
          type: 'success',
          icon: 'success',
          text: 'Денежные средства переведены вам на указанные в профиле реквизиты',
        };
      case StatusType.CANCELLED_BY_CUSTOMER:
      case StatusType.CANCELLED_BY_EXECUTOR:
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
    switch (statusID) {
      case StatusType.ACTIVE:
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
          return subsetID === TaskType.COMMON_FIRST_RESPONCE
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
      case StatusType.SIGNING:
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
    budgetEndTime,
    getBanner,
    getButtons,
    budgetModalVisible,
    onBudgetModalVisible,
    onRevokeBudget,
    cancelModalVisible,
    onCancelModalVisible,
    onCancelTask,
    subsetID,
    statusID,
  };
};
