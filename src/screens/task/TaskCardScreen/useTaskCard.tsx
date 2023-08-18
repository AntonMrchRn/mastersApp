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
import { TaskCardHistory } from '@/components/task/TaskCard/TaskCardHistory';
import { TaskCardReport } from '@/components/task/TaskCard/TaskCardReport';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { BottomTabName, BottomTabParamList } from '@/navigation/TabNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  useDeleteITTaskMemberMutation,
  useDeleteOffersMutation,
  useGetAnotherOffersQuery,
  useGetTaskHistoryQuery,
  useGetTaskQuery,
  useGetUserOffersQuery,
  usePatchITTaskMemberMutation,
  usePatchOffersMutation,
  usePatchTaskMutation,
  usePostITTaskMemberMutation,
} from '@/store/api/tasks';
import { useGetUserQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import { getCommentsPreview } from '@/store/slices/myTasks/asyncActions';
import { setNewOfferServices } from '@/store/slices/tasks/actions';
import { AxiosQueryErrorResponse } from '@/types/error';
import {
  EstimateTab,
  OutlayConfirmStatus,
  OutlayStatusType,
  RoleType,
  StatusType,
  TaskSetType,
  TaskTab,
  TaskType,
} from '@/types/task';

import { getBanner } from './getBanner';
import { getButtons } from './getButtons';

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
const estimateTabsArray = [
  EstimateTab.TASK_ESTIMATE,
  EstimateTab.MY_SUGGESTION,
];

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
  const [estimateBannerVisible, setEstimateBannerVisible] = useState(false);
  const [cantDeleteBannerVisible, setCantDeleteBannerVisible] = useState(false);
  const [noAccessToTaskBannerVisible, setNoAccessToTaskBannerVisible] =
    useState(false);
  const [
    directionNotSpecifiedBannerVisible,
    setDirectionNotSpecifiedBannerVisible,
  ] = useState(false);
  const [submissionModalVisible, setSubmissionModalVisible] = useState(false);
  const [currentEstimateTab, setCurrentEstimateTab] = useState<EstimateTab>(
    EstimateTab.TASK_ESTIMATE
  );

  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const toast = useToast();
  const { user } = useAppSelector(selectAuth);

  const isMessagesExist = !!useAppSelector(state => state.myTasks)
    .commentsPreview?.taskComment?.length;
  const getUserQuery = useGetUserQuery(user?.userID);
  const userData = getUserQuery.data;

  const entityTypeID = userData?.entityTypeID;

  const isSelfEmployed = entityTypeID === 1;
  const [patchTask] = usePatchTaskMutation();
  const [patchOffers] = usePatchOffersMutation();
  const [deleteOffer, deleteOffersMutation] = useDeleteOffersMutation();
  const [patchITTaskMember] = usePatchITTaskMemberMutation();
  const [deleteITTaskMember] = useDeleteITTaskMemberMutation();
  const [postITTaskMember] = usePostITTaskMemberMutation();
  const { data, isError, error, refetch, isLoading } = useGetTaskQuery(taskId);
  const getTaskHistory = useGetTaskHistoryQuery(taskId);
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
  const getAnotherOffers = useGetAnotherOffersQuery(
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

  const id = task?.ID || 0;
  const name = task?.name || '';
  /**
   * участники задачи
   */
  const executors = task?.executors || [];
  const curators = task?.curators || [];
  const coordinator = task?.coordinator;
  const executor = executors.find(executor => executor.ID === user?.userID);
  const curator = curators.find(curator => curator.ID === user?.userID);
  const executorMemberId = executor?.memberID;
  const curatorMemberId = curator?.memberID;
  /**
   * тип задачи
   */
  const setId = task?.setID;
  const subsetID = task?.subsetID;
  const isITServices = setId === TaskSetType.IT_SERVICES;
  const files = task?.files || [];
  /**
   * Вложения
   */
  const applicationFiles = files.filter(file => file.isApplication);
  /**
   * Загруженные файлы сметы
   */
  const reportFiles = files.filter(file => file.isOffer);
  /**
   * закрывающие документы сметы
   */
  const closureFiles = files.filter(file => file.isClosure);
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
   * Промежуточный статус “к Закрытию“ для:
   * Самозанятых без Сбера “Свое дело”(им нужно чек сфоткать и прислать)
   * ИП и юр.лиц, если они не прислали координатору закрывающие документы
   */
  const toClose = !!task?.toClose;
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
  // const statusID: StatusType | undefined = 12;
  /**
   * Статус сметы
   */
  const outlayStatusID: OutlayStatusType | undefined = task?.outlayStatusID;
  /**
   * Статус подтверждения сметы
   */
  const outlayConfirmID: OutlayConfirmStatus | undefined =
    task?.outlayConfirmID;
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

  /**
   * Отказался ли подрядчик принять задачу
   */
  const isRefusedExecutor = !!executor?.isRefuse;
  /**
   * Отказался ли куратор принять задачу
   */
  const isRefusedCurator = !!curator?.isRefuse;
  // проверка на роль в задаче
  const isContractor = !!executor?.hasCurator && !isRefusedExecutor;
  const isExecutor = !!executor && !executor.hasCurator && !isRefusedExecutor;
  const isCoordinator = coordinator?.ID === user?.userID;
  const isSupervisor = user?.roleID === RoleType.SUPERVISOR;
  const isCurator =
    curators.some(curator => curator.ID === user?.userID) && !curator?.isRefuse;
  const isInternalExecutor = user?.roleID === RoleType.INTERNAL_EXECUTOR;
  /**
   * Принял ли задачу куратор
   */
  const isConfirmedCurator = isCurator && !!curator?.isConfirm;
  /**
   * Принял ли задачу подрядчик
   */
  const isConfirmedExecutor = isExecutor && !!executor?.isConfirm;
  /**
   * Задача с куратором
   */
  const isCuratorAllowedTask = !!task?.isCuratorAllowed;
  /**
   * Задача с участием куратора, который её ещё не принял (или принял, но отказался)
   */
  const isTaskWithUnconfirmedCurator =
    isCuratorAllowedTask && (!isConfirmedCurator || isRefusedCurator);
  /**
   * Является ли куратор приглашённым (координатором или руководителем)
   */
  const isInvitedCurator =
    (!isConfirmedCurator || isRefusedCurator) &&
    (curator?.inviterRoleID === RoleType.COORDINATOR ||
      curator?.inviterRoleID === RoleType.SUPERVISOR);
  /**
   * Является ли исполнитель приглашённым (координатором или руководителем)
   */
  const isInvitedExecutor =
    (!isConfirmedExecutor || (isConfirmedExecutor && isRefusedExecutor)) &&
    (executor?.inviterRoleID === RoleType.COORDINATOR ||
      executor?.inviterRoleID === RoleType.SUPERVISOR);

  const getBudget = () => {
    if (
      (subsetID &&
        isContractor &&
        [TaskType.IT_FIRST_RESPONSE, TaskType.IT_AUCTION_SALE].includes(
          subsetID
        )) ||
      (isITServices && isInternalExecutor)
    ) {
      return '';
    }
    // В шапке задания отображать сумму сметы из "Итого" в статусах сметы "Смета не согласована", "Смета на согласовании" и "Смета возвращена".
    if (
      outlayStatusID &&
      [
        OutlayStatusType.PENDING,
        OutlayStatusType.RETURNED,
        OutlayStatusType.MATCHING,
      ].includes(outlayStatusID)
    ) {
      return (
        `${services.reduce((acc, val) => acc + (val?.sum || 0), 0)} ₽` || ''
      );
    }
    return `${task?.budget} ₽` || '';
  };
  const budget = getBudget();

  const budgetEndTime =
    subsetID === TaskType.IT_AUCTION_SALE && isContractor
      ? ''
      : offersDeadline
      ? `Срок подачи сметы до ${dayjs(offersDeadline).format(
          'DD MMMM в HH:mm'
        )}`
      : '';

  const hasAccessToTask = userData?.isApproved;
  const isCommentsAvailable =
    (isSupervisor ||
      isExecutor ||
      isContractor ||
      isCurator ||
      isCoordinator) &&
    statusID !== StatusType.ACTIVE;
  const isTaskCanceled =
    !!statusID &&
    [
      StatusType.CANCELLED_BY_CUSTOMER,
      StatusType.CANCELLED_BY_EXECUTOR,
    ].includes(statusID);

  const hasAccessToDirection = setId && userData?.setIDs?.includes(setId);

  const isTaskClosed = statusID === StatusType.CLOSED;

  const isEstimateTabs =
    tab.label === TaskTab.ESTIMATE &&
    statusID === StatusType.ACTIVE &&
    !!userOffersData.length;

  const onRefresh = () => {
    refetch();
    dispatch(
      getCommentsPreview({ idCard: taskId, numberOfPosts: 5, sort: 'desc' })
    );
    getTaskHistory.refetch();
    if (task?.subsetID === TaskType.COMMON_AUCTION_SALE) {
      getUserOffersQuery.refetch();
      getAnotherOffers.refetch();
    }
  };

  const onCantDeleteBannerVisible = () =>
    setCantDeleteBannerVisible(!cantDeleteBannerVisible);
  const onDirectionNotSpecifiedBannerVisible = () =>
    setDirectionNotSpecifiedBannerVisible(!directionNotSpecifiedBannerVisible);
  const onNoAccessToTaskBannerVisible = () =>
    setNoAccessToTaskBannerVisible(!noAccessToTaskBannerVisible);
  const onEstimateBannerVisible = () =>
    setEstimateBannerVisible(!estimateBannerVisible);
  const onEstimateBottomVisible = () =>
    setEstimateBottomVisible(!estimateBottomVisible);
  const onBudgetModalVisible = () => setBudgetModalVisible(!budgetModalVisible);
  const onUploadModalVisible = () => setUploadModalVisible(!uploadModalVisible);

  const onSubmissionModalVisible = () => {
    if (!hasAccessToTask) {
      return onNoAccessToTaskBannerVisible();
    }
    if (!hasAccessToDirection) {
      return onDirectionNotSpecifiedBannerVisible();
    }
    return setSubmissionModalVisible(!submissionModalVisible);
  };

  const navigateToChat = () => {
    const recipientIDs = executors
      .concat(curators as { ID: number }[])
      .map(recipient => recipient.ID);

    navigation.navigate(AppScreenName.CommentsChat, {
      taskId: id,
      recipientIDs,
      isITServices,
      isMessageInputAvailable: !isTaskClosed && !isTaskCanceled,
    });
  };

  const banner = getBanner({
    tab: tab.label,
    statusID,
    outlayStatusID,
    navigateToChat,
  });

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

  const onTaskSubmission = async () => {
    //принимаем таску в работу, если первый отклик
    if (subsetID === TaskType.COMMON_FIRST_RESPONSE) {
      try {
        if (user?.userID) {
          await patchTask({
            //id таски
            ID: id,
            //статус для принятия в работу
            statusID: StatusType.WORK,
            //id профиля
            executors: [{ ID: user?.userID }],
          }).unwrap();
        }
      } catch (error) {
        toast.show({
          type: 'error',
          title: (error as AxiosQueryErrorResponse).data.message,
        });
      }
    }
    //навигация на скрин подачи сметы, если ЛОТЫ
    if (subsetID === TaskType.COMMON_AUCTION_SALE) {
      dispatch(setNewOfferServices(services));
      navigation.navigate(AppScreenName.EstimateSubmission, {
        taskId: +taskId,
      });
    }

    //принять задачу, если IT первый отклик
    if (subsetID === TaskType.IT_FIRST_RESPONSE && user?.userID) {
      try {
        // куратор-подрядчик
        // сначала делаем patch задачи, потом patch участника задания (подрядчика)
        if (isContractor) {
          executorMemberId &&
            (await patchITTaskMember({
              ID: executorMemberId,
              isConfirm: true,
            }).unwrap());
          await patchTask({
            ID: +taskId,
            statusID: StatusType.WORK,
            outlayStatusID: OutlayStatusType.READY,
          }).unwrap();
        }

        // самостоятельный исполнитель
        // сначала post - создаём исполнителя, затем patch задания
        if (!isContractor) {
          // mutation order matters
          await postITTaskMember({
            taskID: +taskId,
            members: [
              {
                userID: user.userID,
                isConfirm: true,
              },
            ],
          }).unwrap();
          await patchTask({
            ID: +taskId,
            statusID: StatusType.WORK,
            outlayStatusID: OutlayStatusType.READY,
          }).unwrap();
        }
      } catch (error) {
        toast.show({
          type: 'error',
          title: (error as AxiosQueryErrorResponse).data.message,
        });
      }
    }

    if (submissionModalVisible) {
      onSubmissionModalVisible();
    }
  };
  const onCancelModalVisible = () => {
    setCancelModalVisible(!cancelModalVisible);
  };
  const noAccessButtonPress = () => {
    onNoAccessToTaskBannerVisible();
    navigation.navigate(BottomTabName.ProfileNavigation);
  };
  const noDirectionButtonPress = () => {
    onDirectionNotSpecifiedBannerVisible();
    navigation.navigate(BottomTabName.ProfileNavigation);
  };
  const onWorkDelivery = async () => {
    if (
      subsetID &&
      [TaskType.COMMON_FIRST_RESPONSE, TaskType.IT_FIRST_RESPONSE].includes(
        subsetID
      ) &&
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
  };

  const onCancelTask = async (refuseReason?: string) => {
    try {
      //если это общие, то
      //первый отклик - патч задания, refuseReason, id задания
      if (subsetID === TaskType.COMMON_FIRST_RESPONSE) {
        await patchTask({
          //id таски
          ID: id,
          //причина отказа
          refuseReason,
        }).unwrap();
      }
      //если общие лоты то - патч оффера, id оффера, taskID, refuseReason
      if (subsetID === TaskType.COMMON_AUCTION_SALE && winnerOffer) {
        await patchOffers({
          //id таски
          taskID: id,
          //id выигрышного офера (юзер уже должен его выиграть)
          ID: winnerOffer.ID,
          //причина отказа
          refuseReason,
        }).unwrap();
      }
      // IT задачи - первый отклик
      if (subsetID === TaskType.IT_FIRST_RESPONSE) {
        // при отказе от задачи в статусе 'опубликовано' сбрасываем участника через patch
        if (statusID === StatusType.ACTIVE && user?.userID) {
          await patchITTaskMember({
            ID: isConfirmedCurator ? curatorMemberId : executorMemberId,
            userID: user?.userID,
            isConfirm: false,
            isRefuse: true,
          }).unwrap();
        }
        // при отказе от задачи в статусе 'в работе' делаем patch задачи (если это не куратор)
        // и сбрасываем участника через delete
        if (statusID === StatusType.WORK && user?.userID) {
          if (!isCurator) {
            await patchTask({
              ID: +taskId,
              refuseReason,
              statusID: StatusType.ACTIVE,
              outlayStatusID: OutlayStatusType.READY,
            }).unwrap();
          }

          // если куратор-подрядчик, то удалять и себя и куратора
          // удаление куратора
          isContractor &&
            curators[0]?.memberID &&
            (await deleteITTaskMember(curators[0].memberID).unwrap());
          // удаление исполнителя
          isExecutor &&
            executorMemberId &&
            (await deleteITTaskMember(executorMemberId).unwrap());
          // удаление куратора
          isCurator &&
            curatorMemberId &&
            (await deleteITTaskMember(curatorMemberId).unwrap());
          // navigation.goBack();
        }
      }
    } catch (error) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
      });
    } finally {
      if (cancelModalVisible) {
        onCancelModalVisible();
      }
    }
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
  };

  const onApproveEstimateChanges = async () => {
    await patchTask({
      //id таски
      ID: id,
      //меняем статус сметы на Согласовано
      outlayStatusID: OutlayStatusType.READY,
    });
  };

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
    if (!hasAccessToTask) {
      return onNoAccessToTaskBannerVisible();
    }
    if (!hasAccessToDirection) {
      return onDirectionNotSpecifiedBannerVisible();
    }
    if (!isSelfEmployed) {
      return onTaskSubmission();
    }
    //показываем модалку с условиями если самозанятый
    return onSubmissionModalVisible();
  };

  const navigateToContractors = () => {
    if (user?.userID) {
      navigation.navigate(AppScreenName.Contractors, {
        taskId: +taskId,
        isInvitedCurator,
        curatorId: user.userID,
        curatorMemberId: curator?.memberID,
      });
    }
  };

  const getCurrentTab = () => {
    switch (tab.label) {
      case TaskTab.DESCRIPTION:
        return (
          <TaskCardDescription
            address={address}
            webdata={webdata}
            contacts={contacts}
            statusID={statusID}
            startTime={startTime}
            executors={executors}
            subsetID={subsetID}
            isCurator={isCurator}
            endTimePlan={endTimePlan}
            description={description}
            applicationFiles={applicationFiles}
            navigateToContractors={navigateToContractors}
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
            toClose={toClose}
            statusID={statusID}
            subsetID={subsetID}
            isCurator={isCurator}
            taskId={id.toString()}
            reportFiles={reportFiles}
            closureFiles={closureFiles}
            activeBudgetCanceled={!!banner}
            uploadModalVisible={uploadModalVisible}
            onUploadModalVisible={onUploadModalVisible}
          />
        );
      case TaskTab.HISTORY:
        return <TaskCardHistory taskId={taskId} statusID={statusID} />;
      case TaskTab.COMMENTS:
        return (
          <TaskCardComment
            taskId={taskId}
            isTaskClosed={isTaskClosed}
            isITServices={isITServices}
            isTaskCanceled={isTaskCanceled}
            isCommentsAvailable={isCommentsAvailable}
            isNotAvailableForActiveType={statusID === StatusType.ACTIVE}
            isNotAvailableForFutureExecutor={
              statusID === StatusType.ACTIVE &&
              (isContractor || isInvitedExecutor)
            }
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
    tab: tab.label,
    toClose,
    subsetID,
    statusID,
    isCurator,
    reportFiles,
    closureFiles,
    onCancelTask,
    isContractor,
    navigateToChat,
    userOffersData,
    onWorkDelivery,
    outlayStatusID,
    onBecomeCurator: navigateToContractors,
    isInvitedCurator,
    onTaskSubmission,
    isInvitedExecutor,
    onSubmitAnEstimate,
    isInternalExecutor,
    isCommentsAvailable,
    isCuratorAllowedTask,
    isOffersDeadlineOver,
    onCancelModalVisible,
    onUploadModalVisible,
    onBudgetModalVisible,
    onSubmissionModalVisible,
    onApproveEstimateChanges,
    onSendEstimateForApproval,
    isTaskWithUnconfirmedCurator,
    isTaskClosedWithoutMessages: isTaskClosed && !isMessagesExist,
    isTaskCanceledWithoutMessages: isTaskCanceled && !isMessagesExist,
    isLastChangesFromCoordinator:
      outlayConfirmID === OutlayConfirmStatus.ESTIMATE_CONFIRMED_BY_COORDINATOR,
  });

  return {
    id,
    tab,
    tabs,
    name,
    budget,
    banner,
    buttons,
    toClose,
    isNight,
    isUrgent,
    subsetID,
    statusID,
    publicTime,
    executors,
    onRefresh,
    onTabChange,
    isContractor,
    onCancelTask,
    budgetEndTime,
    getCurrentTab,
    outlayStatusID,
    isEstimateTabs,
    onRevokeBudget,
    onTaskSubmission,
    estimateTabsArray,
    cancelModalVisible,
    budgetModalVisible,
    onSwitchEstimateTab,
    noAccessButtonPress,
    onBudgetModalVisible,
    onCancelModalVisible,
    refreshing: isLoading,
    estimateBannerVisible,
    onEstimateBannerPress,
    submissionModalVisible,
    cantDeleteBannerVisible,
    onEstimateBannerVisible,
    onSubmissionModalVisible,
    onCantDeleteBannerVisible,
    noAccessToTaskBannerVisible,
    onNoAccessToTaskBannerVisible,
    directionNotSpecifiedBannerVisible,
    onDirectionNotSpecifiedBannerVisible,
    noDirectionButtonPress,
    setId,
  };
};
