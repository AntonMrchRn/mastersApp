import React, { useEffect, useRef, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';
import { useToast } from 'rn-ui-kit';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import {
  TaskCardBottomBanner,
  TaskCardBottomButton,
} from '@/components/TabScreens/TaskCard/TaskCardBottom';
import { TaskCardComment } from '@/components/TabScreens/TaskCard/TaskCardComment';
import { TaskCardDescription } from '@/components/TabScreens/TaskCard/TaskCardDescription';
import { TaskCardEstimate } from '@/components/TabScreens/TaskCard/TaskCardEstimate';
import { TaskCardHisory } from '@/components/TabScreens/TaskCard/TaskCardHistory';
import { TaskCardReport } from '@/components/TabScreens/TaskCard/TaskCardReport';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppSelector } from '@/store';
import { useGetTaskQuery, usePatchTaskMutation } from '@/store/api/tasks';
import { selectAuth } from '@/store/slices/auth/selectors';
import { OutlayStatusType, StatusType, TaskTab, TaskType } from '@/types/task';

export const useTaskCard = ({
  taskId,
  navigation,
}: {
  taskId: string;
  navigation: StackNavigationProp<
    AppStackParamList,
    AppScreenName.TaskCard,
    undefined
  >;
}) => {
  const [tab, setTab] = useState<TaskTab>(TaskTab.DESCRIPTION);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [estimateBottomVisible, setEstimateBottomVisible] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number>();
  const [estimateBannerVisible, setEstimateBannerVisible] = useState(false);
  const [cantDeleteBannerVisible, setCantDeleteBannerVisible] = useState(false);
  const isFocused = useIsFocused();

  const ref = useRef<{
    setId: (id: number) => void;
  }>(null);

  const toast = useToast();
  const { user } = useAppSelector(selectAuth);

  const getTask = useGetTaskQuery('996');
  // const getTask = useGetTaskQuery(taskId);

  useEffect(() => {
    if (isFocused) {
      getTask.refetch();
    }
  }, [isFocused]);
  useEffect(() => {
    if (
      typeof getTask.error === 'object' &&
      getTask.error !== null &&
      'data' in getTask.error &&
      typeof getTask.error.data === 'object' &&
      getTask.error.data !== null &&
      'message' in getTask.error.data &&
      typeof getTask.error.data.message === 'string'
    ) {
      toast.show({
        type: 'error',
        title: getTask?.error?.data?.message,
        contentHeight: 120,
      });
    }
  }, [getTask?.error]);

  const [patchTask] = usePatchTaskMutation();

  const onRefresh = () => {
    getTask.refetch();
  };
  const refreshing = getTask.isLoading;
  const task = getTask?.data?.tasks?.[0];
  const id = task?.ID || 0;
  const subsetID = task?.subsetID || '';
  const files = task?.files || [];
  const services = task?.services || [];
  const startTime = task?.startTime || '';
  const contacts = task?.contacts || [];
  const endTimePlan = task?.endTimePlan || '';
  const address = task?.object?.name || '';
  const description = task?.description || '';
  /**
   * Статус задачи
   */
  const statusID: StatusType | undefined = task?.statusID;
  // const statusID: StatusType | undefined = 11;
  /**
   * Статус сметы
   */
  const outlayStatusID: OutlayStatusType | undefined = task?.outlayStatusID;
  const name = task?.name || '';
  const budget = `${task?.budget} ₽` || '';

  /**
   * Ночные работы
   */
  const isNight = task?.isNight || false;
  /**
   * Срочная задача
   */
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
      label: TaskTab.DESCRIPTION,
      icon: false,
    },
    {
      id: 1,
      label: TaskTab.ESTIMATE,
      icon: false,
    },
    {
      id: 2,
      label: TaskTab.COMMENTS,
      icon: false,
    },
    {
      id: 3,
      label: TaskTab.REPORT,
      icon: false,
    },
    {
      id: 4,
      label: TaskTab.HISTORY,
      icon: false,
    },
  ];

  const onCantDeleteBannerVisible = () => {
    setCantDeleteBannerVisible(!cantDeleteBannerVisible);
  };
  const onEstimateBannerVisible = () => {
    setEstimateBannerVisible(!estimateBannerVisible);
  };
  const onEstimateBottomVisible = () => {
    setEstimateBottomVisible(!estimateBottomVisible);
  };
  const onBudgetModalVisible = () => {
    setBudgetModalVisible(!budgetModalVisible);
  };
  const onUploadModalVisible = () => {
    setUploadModalVisible(!uploadModalVisible);
  };
  const onEstimateBannerPress = () => {
    onEstimateBannerVisible();
    ref.current?.setId(1);
    setTab(TaskTab.ESTIMATE);
  };
  const onBudgetSubmission = () => {
    //
  };
  const onAddEstimateMaterial = () => {
    if (selectedServiceId) {
      navigation.navigate(AppScreenName.EstimateAddMaterial, {
        serviceId: selectedServiceId,
        taskId: id,
      });
      onEstimateBottomVisible();
      setSelectedServiceId(undefined);
    }
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
    if (outlayStatusID !== OutlayStatusType.READY) {
      !estimateBannerVisible && onEstimateBannerVisible();
    } else {
      await patchTask({
        //id таски
        ID: id,
        //перевод таски в статус Сдача работ
        statusID: 5,
      });
    }

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
  const onSendEstimateForApproval = async () => {
    if (outlayStatusID === OutlayStatusType.MATCHING) {
      toast.show({
        type: 'info',
        title: 'Смета уже отправлена на согласование',
        contentHeight: 120,
      });
    } else {
      await patchTask({
        //id таски
        ID: id,
        //меняем статус сметы на Согласование
        outlayStatusID: OutlayStatusType.MATCHING,
      });
    }
    getTask.refetch();
  };
  const onRevokeBudget = () => {
    //TODO необходимо сначала получить оффер юзера по этой таске
    //https://sandbox8.apteka-april.ru/api/offers?query=?taskID==977*userID==81?
    //далее необходимо удалить этот оффер через DELETE offers/id
    setBudgetModalVisible(!budgetModalVisible);
  };

  const getCurrentTab = () => {
    switch (tab) {
      case TaskTab.DESCRIPTION:
        return (
          <TaskCardDescription
            description={description}
            address={address}
            startTime={startTime}
            endTimePlan={endTimePlan}
            contacts={contacts}
            files={files}
          />
        );
      case TaskTab.ESTIMATE:
        return (
          <TaskCardEstimate
            services={services}
            outlayStatusID={outlayStatusID}
            statusID={statusID}
            taskId={id}
            navigation={navigation}
            onEstimateBottomVisible={onEstimateBottomVisible}
            estimateBottomVisible={estimateBottomVisible}
            selectedServiceId={selectedServiceId}
            setSelectedServiceId={setSelectedServiceId}
            onCantDeleteBannerVisible={onCantDeleteBannerVisible}
          />
        );
      case TaskTab.REPORT:
        return (
          <TaskCardReport
            activeBudgetCanceled={!!getBanner()}
            statusID={statusID}
            files={files}
            taskId={taskId}
            uploadModalVisible={uploadModalVisible}
            onUploadModalVisible={onUploadModalVisible}
          />
        );
      case TaskTab.HISTORY:
        return <TaskCardHisory taskId={taskId} />;
      case TaskTab.COMMENTS:
        return <TaskCardComment taskId={taskId} statusID={statusID} />;
      default:
        return <></>;
    }
  };
  const onTabChange = (item: TabItem) => {
    setTab(item.label as TaskTab);
  };

  const getBanner = (): TaskCardBottomBanner => {
    if (tab === TaskTab.DESCRIPTION) {
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
    }
    return null;
  };

  const getButtons = (): TaskCardBottomButton[] => {
    switch (statusID) {
      case StatusType.ACTIVE:
        if (subsetID === TaskType.COMMON_FIRST_RESPONCE) {
          return [
            {
              label: 'Принять задачу',
              variant: 'accent',
              onPress: onTaskSubmission,
            },
          ];
        }
        if (outlayStatusID === OutlayStatusType.MATCHING) {
          return [
            {
              label: 'Отозвать смету',
              variant: 'outlineDanger',
              onPress: onBudgetModalVisible,
            },
          ];
        }
        if (outlayStatusID === OutlayStatusType.PENDING) {
          return [
            {
              label: 'Подать смету',
              variant: 'accent',
              onPress: onBudgetSubmission,
            },
          ];
        }
        return [];
      case StatusType.WORK:
        if (tab === TaskTab.REPORT) {
          if (files.length) {
            return [
              {
                label: 'Сдать работы',
                variant: 'accent',
                onPress: onWorkDelivery,
              },
              {
                label: 'Загрузить еще файлы',
                variant: 'outlineAccent',
                onPress: onUploadModalVisible,
              },
            ];
          }
          return [
            {
              label: 'Загрузить файлы',
              variant: 'accent',
              onPress: onUploadModalVisible,
            },
          ];
        }
        if (tab === TaskTab.ESTIMATE) {
          if (estimateBottomVisible) {
            return [
              {
                label: 'Выбрать',
                variant: 'accent',
                onPress: onAddEstimateMaterial,
                disabled: !selectedServiceId,
              },
              {
                label: 'Отменить',
                variant: 'outlineAccent',
                onPress: onEstimateBottomVisible,
              },
            ];
          }
          if (outlayStatusID !== OutlayStatusType.READY) {
            return [
              {
                label: 'Отправить смету на согласование',
                variant: 'accent',
                onPress: onSendEstimateForApproval,
                disabled: outlayStatusID === OutlayStatusType.MATCHING,
              },
              {
                label: 'Отказаться от задачи',
                variant: 'outlineDanger',
                onPress: onCancelModalVisible,
              },
            ];
          }
        }
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
      case StatusType.SUMMARIZING:
      case StatusType.COMPLETED:
      case StatusType.PAID:
        if (tab === TaskTab.REPORT) {
          return [
            {
              label: 'Загрузить еще файлы',
              variant: 'accent',
              onPress: onUploadModalVisible,
            },
          ];
        }
        return [];
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
    estimateBannerVisible,
    onEstimateBannerVisible,
    onEstimateBannerPress,
    ref,
    onCantDeleteBannerVisible,
    cantDeleteBannerVisible,
    outlayStatusID,
    onRefresh,
    refreshing,
  };
};
