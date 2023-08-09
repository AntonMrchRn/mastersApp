import React, { useEffect, useState } from 'react';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useIsFocused,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';
import { useToast } from 'rn-ui-kit';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import { TaskCardComment } from '@/components/task/TaskCard/TaskCardComment';
import { TaskCardDescription } from '@/components/task/TaskCard/TaskCardDescription';
import { TaskCardEstimate } from '@/components/task/TaskCard/TaskCardEstimate';
import { TaskCardHisory } from '@/components/task/TaskCard/TaskCardHistory';
import { TaskCardReport } from '@/components/task/TaskCard/TaskCardReport';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { BottomTabName, BottomTabParamList } from '@/navigation/TabNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  useDeleteOffersMutation,
  useGetTaskQuery,
  useGetUserOffersQuery,
  usePatchOffersMutation,
  usePatchTaskMutation,
} from '@/store/api/tasks';
import { useGetUserQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import { getCommentsPreview } from '@/store/slices/myTasks/asyncActions';
import { setNewOfferServices } from '@/store/slices/tasks/actions';
import { AxiosQueryErrorResponse } from '@/types/error';
import {
  EstimateTab,
  OutlayStatusType,
  RoleType,
  StatusType,
  TaskSetType,
  TaskTab,
  TaskType,
} from '@/types/task';

import { getBanner } from './getBanner';
import { getButtons } from './getButtons';

export const useTaskCard = ({
  taskId,
  navigation,
}: {
  taskId: string;
  navigation: CompositeNavigationProp<
    StackNavigationProp<AppStackParamList, AppScreenName.TaskCard, undefined>,
    BottomTabNavigationProp<
      BottomTabParamList,
      keyof BottomTabParamList,
      undefined
    >
  >;
}) => {
  const tabs: TabItem[] = [
    {
      id: 0,
      label: TaskTab.DESCRIPTION,
    },
    {
      id: 1,
      label: TaskTab.ESTIMATE,
    },
    {
      id: 2,
      label: TaskTab.COMMENTS,
    },
    {
      id: 3,
      label: TaskTab.REPORT,
    },
    {
      id: 4,
      label: TaskTab.HISTORY,
    },
  ];
  const [tab, setTab] = useState<{
    id: number;
    label: TaskTab;
  }>(
    tabs[0] as {
      id: number;
      label: TaskTab;
    }
  );
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [estimateBottomVisible, setEstimateBottomVisible] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number>();
  const [estimateBannerVisible, setEstimateBannerVisible] = useState(false);
  const [cantDeleteBannerVisible, setCantDeleteBannerVisible] = useState(false);
  const [noAccessToTaskBannerVisible, setNoAccessToTaskBannerVisible] =
    useState(false);
  const [submissionModalVisible, setSubmissionModalVisible] = useState(false);
  const [currentEstimateTab, setCurrentEstimateTab] = useState<EstimateTab>(
    EstimateTab.TASK_ESTIMATE
  );

  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const toast = useToast();
  const { user } = useAppSelector(selectAuth);
  const getUserQuery = useGetUserQuery(user?.userID);
  const userData = getUserQuery.data;

  const entityTypeID = userData?.entityTypeID;

  const isSelfEmployed = entityTypeID === 1;
  const [patchTask] = usePatchTaskMutation();
  const [patchOffers] = usePatchOffersMutation();
  const [deleteOffer, deleteOffersMutation] = useDeleteOffersMutation();
  const { data, isError, error, refetch, isLoading } = useGetTaskQuery(taskId);
  const task = data?.tasks?.[0];

  const getUserOffersQuery = useGetUserOffersQuery(
    {
      taskID: +taskId,
      userID: user?.userID as number,
    },
    {
      skip: task?.subsetID !== TaskType.COMMON_AUCTION_SALE,
    }
  );
  const userOffersData = getUserOffersQuery.data?.offers || [];

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);
  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
      });
    }
  }, [isError]);
  useEffect(() => {
    if (deleteOffersMutation.isError) {
      toast.show({
        type: 'error',
        title: (deleteOffersMutation.error as AxiosQueryErrorResponse).data
          .message,
      });
    }
  }, [deleteOffersMutation.isError]);

  const estimateTabsArray = [
    EstimateTab.TASK_ESTIMATE,
    EstimateTab.MY_SUGGESTION,
  ];

  const id = task?.ID || 0;
  /**
   * участники задачи
   */
  const executors = task?.executors || [];
  const curators = task?.curators || [];
  const coordinator = task?.coordinator;

  const executorMember = executors.find(
    executor => executor.ID === user?.userID
  );

  const isRefusedContractor = !!executorMember?.isRefuse;

  const setId = task?.setID;
  /**
   * тип задачи
   */
  const subsetID = task?.subsetID;
  const files = task?.files || [];
  const services = task?.services || [];
  const startTime = task?.startTime || '';
  const contacts = task?.contacts || [];
  const webdata = task?.webdata;
  const endTimePlan = task?.endTimePlan || '';
  const address = task?.object?.name || '';
  const description = task?.description || '';
  const offersDeadline = task?.offersDeadline;
  const winnerOffer = task?.winnerOffer;
  /**
   * Закончился ли дедлайн подачи сметы
   */
  const isOffersDeadlineOver = !!(
    offersDeadline && dayjs().isAfter(offersDeadline)
  );
  /**
   * Статус задачи
   */
  const statusID: StatusType | undefined = task?.statusID;
  /**
   * Статус сметы
   */
  const outlayStatusID: OutlayStatusType | undefined = task?.outlayStatusID;
  const name = task?.name || '';
  /**
   * Является ли пользователь подрядчиком в задаче
   */
  const isContractor = !!executorMember?.hasCurator && !isRefusedContractor;

  const budget =
    (subsetID === TaskType.IT_FIRST_RESPONSE && isContractor) ||
    (subsetID === TaskType.IT_AUCTION_SALE && isContractor) ||
    (setId === TaskSetType.ITServices &&
      user?.roleID === RoleType.INTERNAL_EXECUTOR)
      ? ''
      : `${task?.budget} ₽` || '';

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
  const budgetEndTime =
    subsetID === TaskType.IT_AUCTION_SALE && isContractor
      ? ''
      : offersDeadline
      ? `Срок подачи сметы до ${dayjs(offersDeadline).format(
          'DD MMMM в HH:mm'
        )}`
      : '';
  const banner = getBanner({
    tab: tab.label,
    statusID,
    outlayStatusID,
  });

  const isITServices = setId === TaskSetType.ITServices;
  const isCurator = curators.some(curator => curator.ID === user?.userID);

  const isExecutor = !!executorMember && !isRefusedContractor;

  const isCoordinator = coordinator?.ID === user?.userID;
  const isSupervisor = user?.roleID === RoleType.SUPERVISOR;
  const hasAccessToTask =
    userData?.isApproved && setId && userData?.setIDs?.includes(setId);
  const isEstimateTabs =
    tab.label === TaskTab.ESTIMATE &&
    statusID === StatusType.ACTIVE &&
    !!userOffersData.length;
  const isCommentsAvailable =
    isSupervisor || isExecutor || isCurator || isCoordinator;

  const onRefresh = () => {
    refetch();
    dispatch(
      getCommentsPreview({ idCard: taskId, numberOfPosts: 5, sort: 'desc' })
    );
  };

  const onSubmissionModalVisible = () => {
    if (hasAccessToTask) {
      setSubmissionModalVisible(!submissionModalVisible);
    } else {
      onNoAccessToTaskBannerVisible();
    }
  };

  const onCantDeleteBannerVisible = () =>
    setCantDeleteBannerVisible(!cantDeleteBannerVisible);

  const onNoAccessToTaskBannerVisible = () =>
    setNoAccessToTaskBannerVisible(!noAccessToTaskBannerVisible);

  const onEstimateBannerVisible = () =>
    setEstimateBannerVisible(!estimateBannerVisible);

  const onEstimateBottomVisible = () =>
    setEstimateBottomVisible(!estimateBottomVisible);

  const onBudgetModalVisible = () => setBudgetModalVisible(!budgetModalVisible);
  const onUploadModalVisible = () => setUploadModalVisible(!uploadModalVisible);

  const navigateToChat = () => {
    const recipientIDs = executors
      .concat(curators as { ID: number }[])
      .map(recipient => recipient.ID);

    navigation.navigate(AppScreenName.CommentsChat, {
      taskId: id,
      recipientIDs,
      isITServices,
    });
  };

  const onEstimateBannerPress = () => {
    onEstimateBannerVisible();
    setTab({
      id: 1,
      label: TaskTab.ESTIMATE,
    });
  };

  const onSwitchEstimateTab = (index: number) => {
    const newTab = estimateTabsArray[index];
    newTab && setCurrentEstimateTab(newTab);
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
    //принимаем таску в работу, если первый отклик
    if (subsetID === TaskType.COMMON_FIRST_RESPONSE) {
      try {
        if (user?.userID) {
          await patchTask({
            //id таски
            ID: id,
            //статус для принятия в работу
            statusID: 11,
            //id профиля
            executors: [{ ID: user?.userID }],
          }).unwrap();
        }
      } catch (error) {
        toast.show({
          type: 'error',
          title: (error as AxiosQueryErrorResponse).data.message,
        });
      } finally {
        refetch();
      }
    }
    //навигация на скрин подачи сметы, если ЛОТЫ
    if (subsetID === TaskType.COMMON_AUCTION_SALE) {
      dispatch(setNewOfferServices(services));
      navigation.navigate(AppScreenName.EstimateSubmission, {
        taskId: +taskId,
      });
    }
    onSubmissionModalVisible();
  };
  const onCancelModalVisible = () => {
    setCancelModalVisible(!cancelModalVisible);
  };
  const noAccessButtonPress = () => {
    onNoAccessToTaskBannerVisible();
    navigation.navigate(BottomTabName.ProfileNavigation);
  };
  const onWorkDelivery = async () => {
    if (
      subsetID === TaskType.COMMON_FIRST_RESPONSE &&
      outlayStatusID !== OutlayStatusType.READY
    ) {
      !estimateBannerVisible && onEstimateBannerVisible();
    } else {
      await patchTask({
        //id таски
        ID: id,
        //перевод таски в статус Сдача работ
        statusID: 5,
      });
    }

    refetch();
  };
  const onCancelTask = async (text: string) => {
    //если это общие, то
    //первый отклик - патч задания, refuseReason, id задания
    if (subsetID === TaskType.COMMON_FIRST_RESPONSE) {
      await patchTask({
        //id таски
        ID: id,
        //причина отказа
        refuseReason: text,
      });
    }
    //если общие лоты то - патч оффера, id оффера, taskID, refuseReason
    if (subsetID === TaskType.COMMON_AUCTION_SALE && winnerOffer) {
      await patchOffers({
        //id таски
        taskID: id,
        //id выигрышного офера (юзер уже должен его выиграть)
        ID: winnerOffer.ID,
        //причина отказа
        refuseReason: text,
      });
    }
    //в ИТ там все иначе 🙂

    refetch();
    onCancelModalVisible();
  };
  const onSendEstimateForApproval = async () => {
    if (outlayStatusID === OutlayStatusType.MATCHING) {
      toast.show({
        type: 'info',
        title: 'Смета уже отправлена на согласование',
      });
    } else {
      await patchTask({
        //id таски
        ID: id,
        //меняем статус сметы на Согласование
        outlayStatusID: OutlayStatusType.MATCHING,
      });
    }
    refetch();
  };
  console.log('subsetID', subsetID);
  const onRevokeBudget = async () => {
    setBudgetModalVisible(!budgetModalVisible);
    if (userOffersData.length) {
      const offerID = userOffersData?.[0]?.ID;
      if (offerID) {
        await deleteOffer(offerID.toString());
        getUserOffersQuery.refetch();
        refetch();
      }
    }
  };

  const onSubmitAnEstimate = () => {
    if (hasAccessToTask) {
      //показываем модалку с условиями если самозанятый
      if (isSelfEmployed) {
        onSubmissionModalVisible();
      } else {
        onTaskSubmission();
      }
    } else {
      onNoAccessToTaskBannerVisible();
    }
  };

  const getCurrentTab = () => {
    switch (tab.label) {
      case TaskTab.DESCRIPTION:
        return (
          <TaskCardDescription
            description={description}
            address={address}
            startTime={startTime}
            endTimePlan={endTimePlan}
            contacts={contacts}
            files={files}
            statusID={statusID}
            webdata={webdata}
            executors={executors}
            subsetID={subsetID}
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
            subsetID={subsetID}
            currentEstimateTab={currentEstimateTab}
            winnerOffer={winnerOffer}
            isContractor={isContractor}
          />
        );
      case TaskTab.REPORT:
        return (
          <TaskCardReport
            activeBudgetCanceled={!!banner}
            statusID={statusID}
            files={files}
            taskId={id.toString()}
            uploadModalVisible={uploadModalVisible}
            onUploadModalVisible={onUploadModalVisible}
          />
        );
      case TaskTab.HISTORY:
        return <TaskCardHisory taskId={taskId} />;
      case TaskTab.COMMENTS:
        return (
          <TaskCardComment
            taskId={taskId}
            isITServices={isITServices}
            isCommentsAvailable={isCommentsAvailable}
          />
        );
      default:
        return <></>;
    }
  };
  const onTabChange = (item: TabItem) => {
    setTab({ id: item.id, label: item.label as TaskTab });
  };

  const buttons = getButtons({
    subsetID,
    statusID,
    tab: tab.label,
    isCommentsAvailable,
    navigateToChat,
    onSubmissionModalVisible,
    userOffersData,
    isOffersDeadlineOver,
    onSubmitAnEstimate,
    onWorkDelivery,
    onCancelModalVisible,
    estimateBottomVisible,
    onAddEstimateMaterial,
    selectedServiceId,
    onEstimateBottomVisible,
    files,
    onUploadModalVisible,
    outlayStatusID,
    onSendEstimateForApproval,
    onBudgetModalVisible,
  });

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
    banner,
    buttons,
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
    onCantDeleteBannerVisible,
    cantDeleteBannerVisible,
    outlayStatusID,
    onRefresh,
    refreshing: isLoading,
    executors,
    onSubmissionModalVisible,
    onTaskSubmission,
    submissionModalVisible,
    estimateTabsArray,
    onSwitchEstimateTab,
    isEstimateTabs,
    onNoAccessToTaskBannerVisible,
    noAccessToTaskBannerVisible,
    noAccessButtonPress,
    tab,
  };
};
