import React, { useEffect, useRef, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';
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
import { useAppDispatch, useAppSelector } from '@/store';
import {
  useGetTaskQuery,
  useGetUserOffersQuery,
  usePatchTaskMutation,
} from '@/store/api/tasks';
import { useGetUserQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import { getCommentsPreview } from '@/store/slices/myTasks/asyncActions';
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
  const [submissionModalVisible, setSubmissionModalVisible] = useState(false);
  const [currentEstimateTab, setCurrentEstimateTab] = useState<EstimateTab>(
    EstimateTab.TASK_ESTIMATE
  );

  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const ref = useRef<{
    setId: (id: number) => void;
  }>(null);

  const toast = useToast();
  const { user } = useAppSelector(selectAuth);
  const getUserQuery = useGetUserQuery(user?.userID);
  const entityTypeID = getUserQuery.data?.entityTypeID;
  const isSelfEmployed = entityTypeID === 1;
  const [patchTask] = usePatchTaskMutation();
  const { data, isError, error, refetch, isLoading } = useGetTaskQuery(taskId);
  const getUserOffersQuery = useGetUserOffersQuery({
    taskID: +taskId,
    userID: user?.userID as number,
  });
  const userOffersData = getUserOffersQuery.data;
  useEffect(() => {
    if (isFocused) {
      refetch();
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

  const estimateTabsArray = [
    EstimateTab.TASK_ESTIMATE,
    EstimateTab.MY_SUGGESTION,
  ];
  const isEstimateTabs = tab === TaskTab.ESTIMATE && !!getUserOffersQuery.data;

  const task = data?.tasks?.[0];
  const id = task?.ID || 0;
  /**
   * участники задачи
   */
  const executors = task?.executors || [];
  const curators = task?.curators || [];
  const coordinator = task?.coordinator;
  /**
   * тип задачи
   */
  const setId = task?.setID;
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
  const isUserOfferWin = getUserOffersQuery.data?.offers.some(
    offer => offer.ID === winnerOffer?.ID
  );
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
  const budgetEndTime = offersDeadline
    ? `Срок подачи сметы до ${dayjs(offersDeadline).format('DD MMMM в HH:mm')}`
    : '';
  const banner = getBanner({
    tab,
    statusID,
    outlayStatusID,
  });

  const isITServices = setId === TaskSetType.ITServices;
  const isCurator = curators.some(curator => curator.ID === user?.userID);
  const isExecutor = executors.some(executor => executor.ID === user?.userID);
  const isCoordinator = coordinator?.ID === user?.userID;
  const isSupervisor = user?.roleID === RoleType.SUPERVISOR;

  const isCommentsAvailable =
    isSupervisor || isExecutor || isCurator || isCoordinator;

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

  const onRefresh = () => {
    refetch();
    dispatch(
      getCommentsPreview({ idCard: taskId, numberOfPosts: 5, sort: 'desc' })
    );
  };

  const onSubmissionModalVisible = () =>
    setSubmissionModalVisible(!submissionModalVisible);
  const onCantDeleteBannerVisible = () =>
    setCantDeleteBannerVisible(!cantDeleteBannerVisible);

  const onEstimateBannerVisible = () =>
    setEstimateBannerVisible(!estimateBannerVisible);

  const onEstimateBottomVisible = () =>
    setEstimateBottomVisible(!estimateBottomVisible);

  const onBudgetModalVisible = () => setBudgetModalVisible(!budgetModalVisible);
  const onUploadModalVisible = () => setUploadModalVisible(!uploadModalVisible);

  const navigateToChat = () => {
    const recipientIDs = executors
      .concat(curators)
      .map(recipient => recipient.ID);

    navigation.navigate(AppScreenName.CommentsChat, {
      taskId: id,
      recipientIDs,
      isITServices,
    });
  };

  const onEstimateBannerPress = () => {
    onEstimateBannerVisible();
    ref.current?.setId(1);
    setTab(TaskTab.ESTIMATE);
  };
  const onBudgetSubmission = () => {
    //
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
      navigation.navigate(AppScreenName.EstimateSubmission, {
        taskId: +taskId,
      });
    }
    onSubmissionModalVisible();
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

    refetch();
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
  const onRevokeBudget = () => {
    //TODO необходимо сначала получить оффер юзера по этой таске
    //https://sandbox8.apteka-april.ru/api/offers?query=?taskID==977*userID==81?
    //далее необходимо удалить этот оффер через DELETE offers/id
    setBudgetModalVisible(!budgetModalVisible);
  };
  const onSubmitAnEstimate = () => {
    //показываем модалку с условиями если самозанятый
    if (isSelfEmployed) {
      onSubmissionModalVisible();
    } else {
      onTaskSubmission();
    }
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
            statusID={statusID}
            webdata={webdata}
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
    setTab(item.label as TaskTab);
  };

  const buttons = getButtons({
    subsetID,
    statusID,
    tab,
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
    ref,
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
  };
};
