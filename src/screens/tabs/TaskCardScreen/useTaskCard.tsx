import React, { useState } from 'react';

import dayjs from 'dayjs';
import { useToast } from 'rn-ui-kit';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import {
  TaskCardBottomBanner,
  TaskCardBottomButton,
} from '@/components/TabScreens/TaskCard/TaskCardBottom';
import { TaskCardDescription } from '@/components/TabScreens/TaskCard/TaskCardDescription';
import { TaskCardReport } from '@/components/TabScreens/TaskCard/TaskCardReport';
import { useAppSelector } from '@/store';
import { useGetTaskQuery, usePatchTaskMutation } from '@/store/api/tasks';
import { selectAuth } from '@/store/slices/auth/selectors';
import { StatusType, TaskType } from '@/types/task';

export const useTaskCard = () => {
  const [tab, setTab] = useState('Описание');
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const toast = useToast();
  const { user } = useAppSelector(selectAuth);

  const taskId = '978';
  const getTask = useGetTaskQuery(taskId);

  const [patchTask] = usePatchTaskMutation();

  const task = getTask?.data?.tasks?.[0];
  const id = task?.ID || 0;
  const subsetID = task?.subsetID || '';
  const files = task?.files || [];
  const startTime = task?.startTime || '';
  const endTime = task?.endTime || '';
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
  const onTaskSubmission = async () => {
    try {
      await patchTask({
        //id таски
        ID: id,
        //статус для принятия в работу
        statusID: 11,
        //id профиля
        executors: [{ ID: user?.userID }],
      }).unwrap();
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof error.data === 'object' &&
        error.data !== null &&
        'message' in error.data &&
        typeof error.data.message === 'string'
      ) {
        toast.show({
          type: 'error',
          title: error.data.message,
          contentHeight: 120,
        });
      }
    } finally {
      getTask.refetch();
    }
  };
  const onCancelModalVisible = () => {
    setCancelModalVisible(!cancelModalVisible);
  };
  const onWorkDelivery = async () => {
    await patchTask({
      //id таски
      ID: id,
      //перевод таски в статус Сдача работ
      statusID: 5,
    });
    getTask.refetch();
  };
  const onChangeEndTimePlan = async (time: string) => {
    //при изменении любого из времени нужно передавать все три поля
    await patchTask({
      //id таски
      ID: id,
      //планируемый срок окончания
      endTimePlan: time,
      //срок окончания
      endTime,
      //срок начала
      startTime,
    });
    getTask.refetch();
  };
  const onCancelTask = async (text: string) => {
    //если это общие, то
    //первый отклик - патч задания, refuseReason, id задания
    //если лоты то - патч оффера, id оффера, taskID, refuseReason
    //в ИТ там все иначе 🙂
    await patchTask({
      //id таски
      ID: id,
      //причина отказа
      refuseReason: text,
    });
    getTask.refetch();
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
            onChangeEndTimePlan={onChangeEndTimePlan}
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
      case StatusType.WORK:
        return [
          {
            label: 'Отказаться от задачи',
            variant: 'outlineDanger',
            onPress: onCancelModalVisible,
          },
        ];
      case StatusType.PENDING:
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
