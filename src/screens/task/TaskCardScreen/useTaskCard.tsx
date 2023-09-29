import React, { useEffect, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useToast } from 'rn-ui-kit';
import { TabItem } from 'rn-ui-kit/lib/typescript/components/TabControl';

import { TaskCardComment } from '@/components/task/TaskCard/TaskCardComment';
import { TaskCardDescription } from '@/components/task/TaskCard/TaskCardDescription';
import { TaskCardEstimate } from '@/components/task/TaskCard/TaskCardEstimate';
import { TaskCardHistory } from '@/components/task/TaskCard/TaskCardHistory';
import { TaskCardReport } from '@/components/task/TaskCard/TaskCardReport';
import { useTaskSSE } from '@/hooks/useTaskSSE';
import { AppScreenName } from '@/navigation/AppNavigation';
import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { BottomTabName } from '@/navigation/TabNavigation';
import { axiosInstance } from '@/services/axios/axiosInstance';
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
import { GetTaskResponse } from '@/store/api/tasks/types';
import { useGetUserQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import { getCommentsPreview } from '@/store/slices/myTasks/asyncActions';
import { setNewOfferServices } from '@/store/slices/tasks/actions';
import { AxiosQueryErrorResponse, ErrorCode } from '@/types/error';
import { CompositeTaskCardNavigationProp } from '@/types/navigation';
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
import { checkFilesOnDevice } from '@/utils/fileManager/checkFilesOnDevice';

import { getBanner } from './getBanner';
import { getButtons } from './getButtons';

type Tab = {
  id: number;
  label: TaskTab;
};

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
const initialTab = {
  id: 0,
  label: TaskTab.DESCRIPTION,
};

export const useTaskCard = ({
  taskId,
  navigation,
}: {
  taskId: number;
  navigation: CompositeTaskCardNavigationProp;
}) => {
  const isFocused = useIsFocused();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const [tab, setTab] = useState<Tab>(initialTab);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [uploadLimitBannerVisible, setUploadLimitBannerVisible] =
    useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [estimateBottomVisible, setEstimateBottomVisible] = useState(false);
  const [estimateBannerVisible, setEstimateBannerVisible] = useState(false);
  const [isSubmissionByCurator, setSubmissionByCurator] = useState(false);

  const [cantDeleteBannerVisible, setCantDeleteBannerVisible] = useState(false);
  const [noAccessToTaskBannerVisible, setNoAccessToTaskBannerVisible] =
    useState(false);
  const [
    directionNotSpecifiedBannerVisible,
    setDirectionNotSpecifiedBannerVisible,
  ] = useState(false);
  const [submissionModalVisible, setSubmissionModalVisible] = useState(false);
  const [currentEstimateTab, setCurrentEstimateTab] = useState<EstimateTab>(
    EstimateTab.TASK_ESTIMATE,
  );

  const user = useAppSelector(selectAuth).user;
  const isMessagesExist = !!useAppSelector(state => state.myTasks)
    .commentsPreview?.taskComment?.length;

  const [patchTask] = usePatchTaskMutation();
  const [patchOffers] = usePatchOffersMutation();
  const [deleteOffer, deleteOffersMutation] = useDeleteOffersMutation();
  const [patchITTaskMember] = usePatchITTaskMemberMutation();
  const [deleteITTaskMember] = useDeleteITTaskMemberMutation();
  const [postITTaskMember] = usePostITTaskMemberMutation();

  const getUserQuery = useGetUserQuery(user?.userID);
  const { data, isError, error, refetch, isLoading, isSuccess } =
    useGetTaskQuery(taskId);
  const getTaskHistory = useGetTaskHistoryQuery(taskId);
  const task = data?.tasks?.[0];

  const isSkipTask =
    task?.subsetID &&
    ![TaskType.COMMON_AUCTION_SALE, TaskType.IT_AUCTION_SALE].includes(
      task?.subsetID,
    );

  const getUserOffersQuery = useGetUserOffersQuery(
    {
      taskID: taskId,
      userID: user?.userID as number,
    },
    {
      skip: isSkipTask,
    },
  );
  const getAnotherOffers = useGetAnotherOffersQuery(
    {
      taskID: taskId,
      userID: user?.userID as number,
    },
    {
      skip: isSkipTask,
    },
  );

  const userOffersData = getUserOffersQuery.data?.offers || [];

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);
  useEffect(() => {
    if (isError) {
      if (
        [
          ErrorCode.TaskIsAlreadyTaken,
          ErrorCode.OTHER_CANDIDATE,
          ErrorCode.NOT_FOUND,
        ].includes((error as AxiosQueryErrorResponse).data.code)
      ) {
        navigation.navigate(BottomTabName.TaskSearch);
        return toast.show({
          type: 'info',
          duration: 6000,
          title: (error as AxiosQueryErrorResponse).data.message,
        });
      }

      if (isError) {
        toast.show({
          type: 'error',
          title: (error as AxiosQueryErrorResponse).data.message,
        });
      }
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
  useEffect(() => {
    if (isSuccess) {
      checkFilesOnDevice(files);
    }
  }, [isSuccess]);

  const userData = getUserQuery.data;
  const entityTypeID = userData?.entityTypeID;
  /**
   * личный коэффициент оплаты исполнителя
   */
  const serviceMultiplier = userData?.serviceMultiplier || 1;
  const isSelfEmployed = entityTypeID === 1;

  const id = task?.ID || 0;
  const name = task?.name || '';
  /**
   * участники задачи
   */
  const executors = task?.executors || [];
  const confirmedExecutors = executors.filter(executor => executor.isConfirm);
  const cancelReason = task?.cancelReason;
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
  const closureFiles = files.filter(file => file.isClosure || file.isAct);
  const services = task?.services || [];
  const startTime = task?.startTime || '';
  const contacts = task?.contacts || [];
  const webdata = task?.webdata;
  const endTime = task?.endTime || '';
  const address = task?.object?.name || '';
  const car = task?.car;
  const description = task?.description || '';
  const offersDeadline = task?.offersDeadline;
  const winnerOffer = task?.winnerOffer;
  console.log('🚀 ~ file: useTaskCard.tsx:260 ~ winnerOffer:', winnerOffer);
  const executorsCount = task?.executorsCount;

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
    ? `Опубликовано ${dayjs(task?.publicTime).format('D MMMM в HH:mm')}`
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

  // is подрядчик
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
          subsetID,
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
      ? isOffersDeadlineOver &&
        subsetID &&
        [TaskType.IT_AUCTION_SALE, TaskType.COMMON_AUCTION_SALE].includes(
          subsetID,
        )
        ? 'Подача заявок окончена. Результаты торгов будут объявлены в ближайшее время'
        : `Срок подачи сметы до ${dayjs(offersDeadline).format(
            'D MMMM в HH:mm',
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
      getCommentsPreview({ idCard: taskId, numberOfPosts: 5, sort: 'desc' }),
    );
    getTaskHistory.refetch();
    if (!isSkipTask) {
      getUserOffersQuery.refetch();
      getAnotherOffers.refetch();
    }
  };
  useTaskSSE({ taskId, refresh: onRefresh });

  const onUploadLimitBannerVisible = () => {
    setUploadLimitBannerVisible(!uploadLimitBannerVisible);
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
  const onCancelModalVisible = () => setCancelModalVisible(!cancelModalVisible);
  const onUploadModalClose = () => setUploadModalVisible(false);

  // Проверка модалки
  const onSubmissionModalVisible = (isSubmissionCurator?: boolean) => {
    if (!hasAccessToTask) {
      return onNoAccessToTaskBannerVisible();
    }
    if (!hasAccessToDirection) {
      return onDirectionNotSpecifiedBannerVisible();
    }
    if (isSubmissionCurator === true) {
      setSubmissionByCurator(true);
    }
    return setSubmissionModalVisible(true);
  };

  const onSubmissionModalClose = () => setSubmissionModalVisible(false);

  const navigateToChat = () => {
    const recipientIDs = executors
      .concat(curators as { ID: number }[])
      .map(recipient => recipient.ID);

    navigation.navigate(AppScreenName.CommentsChat, {
      taskId,
      recipientIDs,
      isMessageInputAvailable: !isTaskClosed && !isTaskCanceled,
      isITServices,
    });
  };

  const banner = getBanner({
    tab: tab.label,
    statusID,
    outlayStatusID,
    navigateToChat,
    isContractor,
    executor,
    isCurator,
    curator,
    cancelReason,
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
    //навигация на скрин подачи сметы, если IT-ЛОТЫ Исполнитель
    if (subsetID === TaskType.IT_AUCTION_SALE && !isSubmissionByCurator) {
      dispatch(setNewOfferServices(services));
      console.log('Исполнитель --->');
      setSubmissionByCurator(false);

      navigation.navigate(AppScreenName.EstimateSubmission, {
        taskId,
        isInvitedExecutor,
        executor,
      });
    }

    //навигация на скрин подачи сметы, если IT-ЛОТЫ Куратор
    if (subsetID === TaskType.IT_AUCTION_SALE && isSubmissionByCurator) {
      setSubmissionByCurator(false);
      dispatch(setNewOfferServices(services));
      console.log('Куратор --->');
      // проверять на наличие подрядчиков, если есть - на подачу сметы, затем на приглашение подрядчиков
      // если нет - на экран, где написано, что нет подрядчиков
    }

    if (subsetID === TaskType.COMMON_FIRST_RESPONSE) {
      //принимаем таску в работу, если первый отклик
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
        taskId,
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
            ID: taskId,
            statusID: StatusType.WORK,
            outlayStatusID: OutlayStatusType.READY,
          }).unwrap();
        }

        // самостоятельный исполнитель
        // сначала post - создаём исполнителя, затем patch задания
        if (!isContractor) {
          // mutation order matters
          await postITTaskMember({
            taskID: taskId,
            members: [
              {
                userID: user.userID,
                isConfirm: true,
              },
            ],
          }).unwrap();
          await patchTask({
            ID: taskId,
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

    //принять задачу, если IT внутренний исполнитель
    //исполнителей может быть один или двое
    if (subsetID === TaskType.IT_INTERNAL_EXECUTIVES && user?.userID) {
      //проверяем есть ли он в мемберах
      //если пригласили то isInvitedExecutor
      try {
        if (isInvitedExecutor) {
          //если в мемберах то
          await patchITTaskMember({
            ID: executorMemberId,
            isConfirm: true,
          }).unwrap();
        }
        // если его нет то делаем
        await postITTaskMember({
          taskID: taskId,
          members: [
            {
              userID: user.userID,
              isConfirm: true,
            },
          ],
        }).unwrap();
        if (task?.executorsCount === 1) {
          // если исполнитель один, то просто принимаем задачу
          //патчим таску и берем в работу
          await patchTask({
            ID: taskId,
            statusID: StatusType.WORK,
            outlayStatusID: OutlayStatusType.READY,
          }).unwrap();
        }
        if (task?.executorsCount === 2) {
          // если исполнителей двое, то
          //проверяем на isConfirmed, если двое то патчим таску и переводим в работу
          //если нет то ждем второго исполнителя и уже он патчит таску
          //либо же руководитель может пропатчить у себя таску не дожидаясь второго исполнителя

          const getTask = await axiosInstance.get<GetTaskResponse>(
            `tasks/web?query=?ID==${id}?`,
          );
          const currentExecutors = getTask.data.tasks[0]?.executors || [];
          const currentConfirmedExecutors = currentExecutors.filter(
            executor => executor.isConfirm,
          );
          if (currentConfirmedExecutors.length > 1) {
            await patchTask({
              ID: taskId,
              statusID: StatusType.WORK,
              outlayStatusID: OutlayStatusType.READY,
            }).unwrap();
          }
        }
      } catch (error) {
        toast.show({
          type: 'error',
          title: (error as AxiosQueryErrorResponse).data.message,
        });
      }
    }

    if (submissionModalVisible) {
      onSubmissionModalClose();
    }
  };
  const noAccessButtonPress = () => {
    onNoAccessToTaskBannerVisible();
    navigation.navigate(BottomTabName.ProfileNavigation, {
      screen: ProfileScreenName.Profile,
    });
  };
  const noDirectionButtonPress = () => {
    onDirectionNotSpecifiedBannerVisible();
    navigation.navigate(BottomTabName.ProfileNavigation, {
      screen: ProfileScreenName.Profile,
    });
  };
  const onWorkDelivery = async () => {
    if (
      subsetID &&
      [TaskType.COMMON_FIRST_RESPONSE, TaskType.IT_FIRST_RESPONSE].includes(
        subsetID,
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
              ID: taskId,
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
        }
      }
      if (subsetID === TaskType.IT_INTERNAL_EXECUTIVES && executorMemberId) {
        //* если задание не в статусе опубликовано
        //* проверяем длину executors фильтрованному по isConfirm (текущее количество исполнителей)
        //* и если он 1 - то задание переводим во 2 статус (опубликовано)
        if (statusID !== StatusType.ACTIVE && confirmedExecutors.length === 1) {
          await patchTask({
            ID: taskId,
            refuseReason,
            statusID: StatusType.ACTIVE,
            outlayStatusID: OutlayStatusType.READY,
          }).unwrap();
        }
        //* далее делаем удаление мембера (себя оттуда)
        await deleteITTaskMember(executorMemberId).unwrap();
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
    setCurrentEstimateTab(EstimateTab.TASK_ESTIMATE);
  };

  const onSubmitAnTask = () => {
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
        taskId,
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
            car={car}
            endTime={endTime}
            address={address}
            webdata={webdata}
            contacts={contacts}
            statusID={statusID}
            startTime={startTime}
            executors={executors}
            subsetID={subsetID}
            isCurator={isCurator}
            description={description}
            coordinator={coordinator}
            isITServices={isITServices}
            applicationFiles={applicationFiles}
            isInternalExecutor={isInternalExecutor}
            navigateToContractors={navigateToContractors}
          />
        );
      case TaskTab.ESTIMATE:
        return (
          <TaskCardEstimate
            taskId={id}
            services={services}
            statusID={statusID}
            subsetID={subsetID}
            navigation={navigation}
            winnerOffer={winnerOffer}
            isContractor={isContractor}
            outlayStatusID={outlayStatusID}
            serviceMultiplier={serviceMultiplier}
            currentEstimateTab={currentEstimateTab}
            estimateBottomVisible={estimateBottomVisible}
            cantDeleteBannerVisible={cantDeleteBannerVisible}
            onEstimateBottomVisible={onEstimateBottomVisible}
            onCantDeleteBannerVisible={onCantDeleteBannerVisible}
          />
        );
      case TaskTab.REPORT:
        return (
          <TaskCardReport
            taskId={taskId}
            toClose={toClose}
            statusID={statusID}
            subsetID={subsetID}
            isCurator={isCurator}
            reportFiles={reportFiles}
            closureFiles={closureFiles}
            onClose={onUploadModalClose}
            activeBudgetCanceled={!!banner}
            uploadModalVisible={uploadModalVisible}
            uploadLimitBannerVisible={uploadLimitBannerVisible}
            onUploadLimitBannerVisible={onUploadLimitBannerVisible}
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
    setCurrentEstimateTab(EstimateTab.TASK_ESTIMATE);
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
    isExecutor,
    navigateToChat,
    userOffersData,
    onWorkDelivery,
    outlayStatusID,
    isInvitedCurator,
    onTaskSubmission,
    isInvitedExecutor,
    onSubmitAnTask,
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
    onBecomeCurator: navigateToContractors,
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
    setId,
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
    isExecutor,
    onTabChange,
    isContractor,
    onCancelTask,
    budgetEndTime,
    getCurrentTab,
    outlayStatusID,
    isEstimateTabs,
    executorsCount,
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
    noDirectionButtonPress,
    submissionModalVisible,
    cantDeleteBannerVisible,
    onEstimateBannerVisible,
    uploadLimitBannerVisible,
    onSubmissionModalClose,
    onCantDeleteBannerVisible,
    onUploadLimitBannerVisible,
    noAccessToTaskBannerVisible,
    onNoAccessToTaskBannerVisible,
    directionNotSpecifiedBannerVisible,
    onDirectionNotSpecifiedBannerVisible,
  };
};
