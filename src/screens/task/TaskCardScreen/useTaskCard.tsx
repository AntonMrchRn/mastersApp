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
import { useTaskMembers } from '@/hooks/useTaskMembers';
import { useTaskSSE } from '@/hooks/useTaskSSE';
import { AppScreenName } from '@/navigation/AppNavigation';
import { ProfileScreenName } from '@/navigation/ProfileNavigation';
import { BottomTabName } from '@/navigation/TabNavigation';
import { axiosInstance } from '@/services/axios/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  tasksAPI,
  useDeleteITTaskMemberMutation,
  useDeleteOffersMutation,
  useGetAnotherOffersQuery,
  useGetAvailableContractorsQuery,
  useGetTaskHistoryQuery,
  useGetUserOffersQuery,
  usePatchITTaskMemberMutation,
  usePatchOffersMutation,
  usePatchTaskMutation,
  usePostITTaskMemberMutation,
} from '@/store/api/tasks';
import { GetTaskResponse } from '@/store/api/tasks/types';
import { useGetUserQuery } from '@/store/api/user';
import { getCommentsPreview } from '@/store/slices/myTasks/asyncActions';
import { setNewOfferServices } from '@/store/slices/tasks/actions';
import { AxiosQueryErrorResponse, ErrorCode } from '@/types/error';
import { CompositeTaskCardNavigationProp } from '@/types/navigation';
import {
  ContractorStatus,
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

export const useTaskCard = ({
  taskId,
  navigation,
  tabId,
}: {
  taskId: number;
  navigation: CompositeTaskCardNavigationProp;
  tabId: number | undefined;
}) => {
  const isFocused = useIsFocused();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const {
    task,
    error,
    isError,
    userID,
    refetch,
    isLoading,
    curator,
    curators,
    executor,
    executors,
    isSuccess,
    isCurator,
    isExecutor,
    coordinator,
    isContractor,
    isSupervisor,
    isCoordinator,
    curatorMemberId,
    executorMemberId,
    isInvitedCurator,
    isInvitedExecutor,
    isConfirmedCurator,
    isCuratorAllowedTask,
    isConfirmedContractor,
    isRefusedInvitedCurator,
    isRefusedInvitedExecutor,
    isTaskWithUnconfirmedCurator,
  } = useTaskMembers(taskId);

  const initialTab = (
    tabId && +tabId <= 4 ? tabs?.[+tabId || 0] : tabs[0]
  ) as Tab;

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
  const [
    inappropriateRegionBannerVisible,
    setInappropriateRegionBannerVisible,
  ] = useState<boolean>(false);
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(true);
  const [submissionModalVisible, setSubmissionModalVisible] = useState(false);
  const [currentEstimateTab, setCurrentEstimateTab] = useState<EstimateTab>(
    EstimateTab.TASK_ESTIMATE,
  );

  const isMessagesExist = !!useAppSelector(state => state.myTasks)
    .commentsPreview?.taskComment?.length;

  const [patchTask, { isLoading: isPatchTaskLoading }] = usePatchTaskMutation();
  const [patchOffers] = usePatchOffersMutation();
  const [deleteOffer, deleteOffersMutation] = useDeleteOffersMutation();
  const [
    patchITTaskMember,
    { isSuccess: isPatchITMemberSuccess, isLoading: isPatchITMemberLoading },
  ] = usePatchITTaskMemberMutation();
  const [deleteITTaskMember] = useDeleteITTaskMemberMutation();
  const [
    postITTaskMember,
    { isSuccess: isPostITMemberSuccess, isLoading: isPostITMemberLoading },
  ] = usePostITTaskMemberMutation();

  const user = useGetUserQuery(userID).data;
  const getTaskHistory = useGetTaskHistoryQuery(taskId);
  const { data: contractors } = useGetAvailableContractorsQuery(
    {
      curatorId: user?.ID as number,
      taskId,
    },
    {
      skip: !user?.roleID || !taskId,
    },
  );

  const isSkipTask =
    task?.subsetID &&
    ![TaskType.COMMON_AUCTION_SALE, TaskType.IT_AUCTION_SALE].includes(
      task?.subsetID,
    );
  const isItLots = task?.subsetID === TaskType.IT_AUCTION_SALE;
  const getUserOffersQuery = useGetUserOffersQuery(
    {
      taskID: taskId,
      userID: (isItLots && isContractor
        ? executor?.curatorID
        : userID) as number,
    },
    {
      skip: isSkipTask,
    },
  );

  const getAnotherOffers = useGetAnotherOffersQuery(
    {
      taskID: taskId,
      userID: userID as number,
    },
    {
      skip: isSkipTask,
    },
  );

  const userOffersData = getUserOffersQuery.data?.offers || [];

  useEffect(() => {
    if (tabId && initialTab !== tab) {
      setTab(initialTab);
    }
  }, [tabId]);
  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);
  useEffect(() => {
    if (isError) {
      if (
        [
          ErrorCode.TASK_IS_ALREADY_TAKEN,
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

  const entityTypeID = user?.entityTypeID;
  /**
   * Самозанятый
   */
  const isSelfEmployed = entityTypeID === 1;
  const isInternalExecutor = user?.roleID === RoleType.INTERNAL_EXECUTOR;
  /**
   * Статус задачи
   */
  const statusID: StatusType | undefined = task?.statusID;
  /**
   * Сбер Свое дело
   */
  const isSberPayment = user?.isSberPayment;
  const isEstimateTabs =
    tab.label === TaskTab.ESTIMATE &&
    statusID === StatusType.ACTIVE &&
    !!userOffersData.length &&
    !isContractor;
  /**
   * личный коэффициент оплаты исполнителя
   */
  const serviceMultiplier =
    (statusID === StatusType.ACTIVE
      ? user?.serviceMultiplier
      : task?.serviceMultiplier) || 1;

  useEffect(() => {
    !isBannerVisible && setIsBannerVisible(true);
  }, [statusID]);

  const getWithNDS = () => {
    //показываем НДС если правовая форма получателя ИП или Юр. лицо и он является Плательщиком НДС
    // (Общее условие для всех остальных условий)
    if (entityTypeID && [2, 3].includes(entityTypeID) && user.isNDSPayer) {
      //Если в задании участвует куратор и подрядчик то сумму НДС показываем только если куратор является плательщиком НДС
      //(подрядчик напрямую отношения к смете не имеет)
      if (isCuratorAllowedTask) {
        return !!curator?.isNDSPayer;
      }
      //В лотах не показываем сумму НДС на смете координатора(смета задачи)
      if (
        task?.subsetID &&
        [TaskType.COMMON_AUCTION_SALE, TaskType.IT_AUCTION_SALE].includes(
          task?.subsetID,
        )
      ) {
        if (isEstimateTabs) {
          return currentEstimateTab !== EstimateTab.TASK_ESTIMATE;
        }
        return statusID !== StatusType.ACTIVE;
      }
      //для первого отклика соответственно:
      //если задача опубликована (исполнитель не принял) , то суммы НДС нет,
      //если на задачу назначен исполнитель плательщик НДС (в работе, сдача работ, выполнено, закрыто и т.д.),
      //то сумму НДС показываем
      if (
        task?.subsetID &&
        statusID &&
        [TaskType.COMMON_FIRST_RESPONSE, TaskType.IT_FIRST_RESPONSE].includes(
          task?.subsetID,
        )
      ) {
        return statusID !== StatusType.ACTIVE;
      }
      return true;
    }
    return false;
  };
  /**
   * показываем НДС если правовая форма получателя ИП или Юр. лицо и он является Плательщиком НДС
   *
   * Если в задании участвует куратор и подрядчик то сумму НДС показываем только если куратор является плательщиком
   * НДС (подрядчик напрямую отношения к смете не имеет)
   *
   * В лотах не показываем сумму НДС на смете координатора(смета задачи)
   */
  const withNDS = getWithNDS();
  const id = task?.ID || 0;
  const name = task?.name || '';

  const confirmedExecutors = executors.filter(executor => executor.isConfirm);
  const contractorsInvitedByCurator = executors.filter(
    contractor => contractor.curatorID === userID,
  );
  const cancelReason = task?.cancelReason;
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
  const stage = task?.stage || '';
  const regionID = task?.object?.regionID;
  const car = task?.car;
  const description = task?.description || '';
  const offersDeadline = task?.offersDeadline;
  const winnerOffer = task?.winnerOffer;
  const executorsCount = task?.executorsCount;
  const addressID = task?.object?.ID;
  const isNewPharmacy = !!task?.object?.findID;

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
   * Доступны ли подрядчики
   */
  const isAvailableContractorsExist =
    !!contractors?.some(
      contractor => contractor.subStatusID === ContractorStatus.AVAILABLE,
    ) && !!contractors.length;

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
      const reducer = services.reduce((acc, val) => acc + (val?.sum || 0), 0);
      const result = Number.isInteger(reducer)
        ? reducer.toString()
        : reducer.toFixed(2);
      return `${result} ₽` || '';
    }
    return `${task?.budget} ₽` || '';
  };
  const budget = getBudget();

  const getBudgetEndTime = () => {
    if (subsetID === TaskType.IT_AUCTION_SALE && isContractor) {
      //принятие приглашения подрядчиком IT-лоты
      if (!isOffersDeadlineOver && offersDeadline && isConfirmedContractor) {
        return `Эта задача с конкурсным отбором участников. Результаты отбора будут объявлены после ${dayjs(
          offersDeadline,
        ).format('D MMMM в HH:mm')}`;
      }
      if (
        isOffersDeadlineOver &&
        subsetID &&
        [TaskType.IT_AUCTION_SALE].includes(subsetID)
      ) {
        return 'Подача заявок окончена. К сожалению, вы больше не можете принять участие в этой задаче';
      }
    }
    if (offersDeadline) {
      if (
        isOffersDeadlineOver &&
        subsetID &&
        [TaskType.IT_AUCTION_SALE, TaskType.COMMON_AUCTION_SALE].includes(
          subsetID,
        )
      ) {
        return 'Подача заявок окончена. Результаты торгов будут объявлены в ближайшее время';
      } else {
        return `Срок подачи сметы до ${dayjs(offersDeadline).format(
          'D MMMM в HH:mm',
        )}`;
      }
    }
    return '';
  };

  const budgetEndTime = getBudgetEndTime();

  const hasAccessToTask = user?.isApproved;
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

  const hasAccessToDirection = setId && user?.setIDs?.includes(setId);
  const hasAppropriateRegion = regionID && user?.regionIDs?.includes(regionID);

  const isTaskClosed = statusID === StatusType.CLOSED;

  const refresh = () => {
    dispatch(
      tasksAPI.endpoints.getTask.initiate(taskId, {
        forceRefetch: true,
      }),
    );
    dispatch(
      tasksAPI.endpoints.getTaskHistory.initiate(taskId, {
        forceRefetch: true,
      }),
    );
    dispatch(
      getCommentsPreview({ idCard: taskId, numberOfPosts: 5, sort: 'desc' }),
    );
    if (!isSkipTask) {
      dispatch(
        tasksAPI.endpoints.getUserOffers.initiate(
          {
            taskID: taskId,
            userID: userID as number,
          },
          {
            forceRefetch: true,
          },
        ),
      );
      dispatch(
        tasksAPI.endpoints.getAnotherOffers.initiate(
          {
            taskID: taskId,
            userID: userID as number,
          },
          {
            forceRefetch: true,
          },
        ),
      );
    }
  };
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

  useTaskSSE({ taskId, refresh });

  const onBannerClose = () => setIsBannerVisible(false);
  const onUploadLimitBannerVisible = () =>
    setUploadLimitBannerVisible(!uploadLimitBannerVisible);
  const onCantDeleteBannerVisible = () =>
    setCantDeleteBannerVisible(!cantDeleteBannerVisible);
  const onDirectionNotSpecifiedBannerVisible = () =>
    setDirectionNotSpecifiedBannerVisible(!directionNotSpecifiedBannerVisible);
  const onInappropriateRegionBannerVisible = () =>
    setInappropriateRegionBannerVisible(!inappropriateRegionBannerVisible);
  const onNoAccessToTaskBannerVisible = () =>
    setNoAccessToTaskBannerVisible(!noAccessToTaskBannerVisible);
  const onEstimateBannerVisible = () =>
    setEstimateBannerVisible(!estimateBannerVisible);
  const onEstimateBottomVisible = () =>
    setEstimateBottomVisible(!estimateBottomVisible);
  const onBudgetModalVisible = () => setBudgetModalVisible(!budgetModalVisible);
  const onUploadModalVisible = () => setUploadModalVisible(!uploadModalVisible);
  const onCloseCancelModalVisible = () => setCancelModalVisible(false);
  const onOpenCancelModalVisible = () => setCancelModalVisible(true);
  const onUploadModalClose = () => setUploadModalVisible(false);

  // Проверка модалки
  const onSubmissionModalVisible = (isSubmissionCurator?: boolean) => {
    if (!hasAccessToTask) {
      return onNoAccessToTaskBannerVisible();
    }
    if (!hasAccessToDirection) {
      return onDirectionNotSpecifiedBannerVisible();
    }
    if (!hasAppropriateRegion) {
      return onInappropriateRegionBannerVisible();
    }
    if (isSubmissionCurator === true) {
      setSubmissionByCurator(true);
    }
    return setSubmissionModalVisible(true);
  };

  const onSubmissionModalClose = () => {
    setSubmissionModalVisible(false);
    setSubmissionByCurator(false);
  };

  const navigateToChat = () => {
    const recipientIDs = executors
      .concat(curators as { ID: number }[])
      .map(recipient => recipient.ID);

    statusID &&
      navigation.navigate(AppScreenName.CommentsChat, {
        taskId,
        recipientIDs,
        statusID,
        isITServices,
      });
  };

  const navigateToReport = () => {
    setTab({
      id: 3,
      label: TaskTab.REPORT,
    });
    onBannerClose();
    onUploadModalVisible();
  };

  const banner = getBanner({
    tab: tab.label,
    statusID,
    outlayStatusID,
    navigateToChat,
    isContractor,
    executor,
    cancelReason,
    isInvitedExecutor,
    isInternalExecutor,
    isSelfEmployed,
    isSberPayment,
    navigateToReport,
    isBannerVisible,
    onBannerClose,
    isInvitedCurator,
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

  const offerID = userOffersData?.[0]?.ID;

  const onTaskSubmission = async () => {
    if (
      isPatchTaskLoading ||
      isPatchITMemberLoading ||
      isPostITMemberLoading ||
      isPostITMemberSuccess ||
      isPatchITMemberSuccess
    ) {
      return;
    }

    if (subsetID === TaskType.IT_AUCTION_SALE) {
      //IT-Лоты принятие задачи подрядчиком
      if (isContractor) {
        try {
          await patchITTaskMember({
            ID: executorMemberId,
            isConfirm: true,
            isCurator: false,
            offerID,
          }).unwrap();
        } catch (error) {
          toast.show({
            type: 'error',
            title: (error as AxiosQueryErrorResponse).data.message,
          });
        }
      }
      if (!isSubmissionByCurator && !isContractor) {
        //IT-ЛОТЫ Исполнитель, навигация на скрин подачи сметы
        setSubmissionByCurator(false);
        dispatch(setNewOfferServices(services));

        navigation.navigate(AppScreenName.EstimateSubmission, {
          taskId,
        });
      }
      //IT-ЛОТЫ Куратор, навигация на скрин подачи сметы
      if (isSubmissionByCurator) {
        setSubmissionByCurator(false);
        dispatch(setNewOfferServices(services));

        // Подрядчики отсутствуют или недоступны подрядчики'
        if (!contractors?.length || !isAvailableContractorsExist) {
          navigation.navigate(AppScreenName.Contractors, {
            taskId,
          });
        } else {
          // Подрядчики доступны -> подача сметы
          navigation.navigate(AppScreenName.EstimateSubmission, {
            taskId,
            isSubmissionByCuratorItLots: true,
          });
        }
      }
    }

    if (subsetID === TaskType.COMMON_FIRST_RESPONSE) {
      //принимаем таску в работу, если первый отклик
      try {
        if (userID) {
          await patchTask({
            //id таски
            ID: id,
            //статус для принятия в работу
            statusID: StatusType.WORK,
            //id профиля
            executors: [{ ID: userID }],
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
    if (subsetID === TaskType.IT_FIRST_RESPONSE && userID) {
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
                userID,
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
    if (subsetID === TaskType.IT_INTERNAL_EXECUTIVES && userID) {
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
              userID,
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
  const inappropriateRegionButtonPress = () => {
    onInappropriateRegionBannerVisible();
    navigation.navigate(BottomTabName.ProfileNavigation, {
      screen: ProfileScreenName.Profile,
    });
  };
  const onWorkDelivery = async () => {
    if (
      subsetID &&
      [
        TaskType.COMMON_FIRST_RESPONSE,
        TaskType.IT_FIRST_RESPONSE,
        TaskType.IT_AUCTION_SALE,
      ].includes(subsetID) &&
      outlayStatusID !== OutlayStatusType.READY
    ) {
      !estimateBannerVisible && onEstimateBannerVisible();
    } else {
      await patchTask({
        //id таски
        ID: id,
        //перевод таски в статус Сдача работ
        statusID: StatusType.SUMMARIZING,
      });
    }
  };

  const onCancelTask = async (refuseReason?: string) => {
    try {
      if (subsetID === TaskType.IT_AUCTION_SALE) {
        //отклонение приглашения подрядчиком в статусе Опубликовано
        if (isContractor && statusID === StatusType.ACTIVE) {
          await patchITTaskMember({
            ID: executorMemberId,
            isConfirm: false,
            isCurator: false,
            offerID,
            isRefuse: true,
          }).unwrap();
        }

        // отказ от задачи в статусе в работе
        if (statusID === StatusType.WORK && winnerOffer) {
          // если это куратор, то удаляем мембера
          if (isCurator && curatorMemberId) {
            await deleteITTaskMember(curatorMemberId).unwrap();
            navigation.navigate(BottomTabName.TaskSearch);
          }
          // если это подрядчик или самостоятельный исполнитель,
          // то патчим оффер (остальная обработка на бэке)
          if (isContractor || isExecutor) {
            await patchOffers({
              //id таски
              taskID: id,
              //id выигрышного офера (юзер уже должен его выиграть)
              ID: winnerOffer.ID,
              //причина отказа
              refuseReason,
            }).unwrap();
          }
        }
      }
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
        if (statusID === StatusType.ACTIVE && userID) {
          await patchITTaskMember({
            ID: isConfirmedCurator ? curatorMemberId : executorMemberId,
            userID,
            isConfirm: false,
            isRefuse: true,
          }).unwrap();
        }
        // при отказе от задачи в статусе 'в работе' делаем patch задачи (если это не куратор)
        // и сбрасываем участника через delete
        if (statusID === StatusType.WORK && userID) {
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
      onCloseCancelModalVisible();
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

    if (isOffersDeadlineOver) {
      toast.show({
        type: 'info',
        title: 'Ваше ценовое предложение отозвано',
      });
      navigation.navigate(BottomTabName.MyTasks);
    }
  };
  useEffect(() => {
    if (statusID === StatusType.ACTIVE) {
      setCurrentEstimateTab(EstimateTab.TASK_ESTIMATE);
    }
  }, [statusID]);
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

  const navigateToContractors = () =>
    userID &&
    navigation.navigate(AppScreenName.Contractors, {
      taskId,
    });

  const getCurrentTab = () => {
    switch (tab.label) {
      case TaskTab.DESCRIPTION:
        return (
          <TaskCardDescription
            car={car}
            stage={stage}
            endTime={endTime}
            address={address}
            webdata={webdata}
            contacts={contacts}
            statusID={statusID}
            addressID={addressID}
            startTime={startTime}
            executors={executors}
            subsetID={subsetID}
            description={description}
            coordinator={coordinator}
            isITServices={isITServices}
            isNewPharmacy={isNewPharmacy}
            applicationFiles={applicationFiles}
            isConfirmedCurator={isConfirmedCurator}
            isInternalExecutor={isInternalExecutor}
            navigateToContractors={navigateToContractors}
            contractorsInvitedByCurator={contractorsInvitedByCurator}
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
            curatorId={executor?.curatorID}
            serviceMultiplier={serviceMultiplier}
            currentEstimateTab={currentEstimateTab}
            estimateBottomVisible={estimateBottomVisible}
            cantDeleteBannerVisible={cantDeleteBannerVisible}
            onEstimateBottomVisible={onEstimateBottomVisible}
            onCantDeleteBannerVisible={onCantDeleteBannerVisible}
            withNDS={withNDS}
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
            isContractor={isContractor}
            closureFiles={closureFiles}
            onClose={onUploadModalClose}
            activeBudgetCanceled={!!banner}
            isInvitedExecutor={isInvitedExecutor}
            isInternalExecutor={isInternalExecutor}
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
    isConfirmedContractor,
    tab: tab.label,
    toClose,
    subsetID,
    statusID,
    isCurator,
    isExecutor,
    reportFiles,
    closureFiles,
    onCancelTask,
    isContractor,
    onSubmitAnTask,
    navigateToChat,
    userOffersData,
    onWorkDelivery,
    outlayStatusID,
    isInvitedCurator,
    onTaskSubmission,
    isInvitedExecutor,
    isInternalExecutor,
    isCommentsAvailable,
    isCuratorAllowedTask,
    isOffersDeadlineOver,
    onUploadModalVisible,
    onBudgetModalVisible,
    isRefusedInvitedCurator,
    isRefusedInvitedExecutor,
    onOpenCancelModalVisible,
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
    isCurator,
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
    currentEstimateTab,
    cancelModalVisible,
    budgetModalVisible,
    onSwitchEstimateTab,
    noAccessButtonPress,
    onBudgetModalVisible,
    refreshing: isLoading,
    estimateBannerVisible,
    onEstimateBannerPress,
    onSubmissionModalClose,
    noDirectionButtonPress,
    submissionModalVisible,
    cantDeleteBannerVisible,
    onEstimateBannerVisible,
    uploadLimitBannerVisible,
    onCloseCancelModalVisible,
    onCantDeleteBannerVisible,
    onUploadLimitBannerVisible,
    noAccessToTaskBannerVisible,
    onNoAccessToTaskBannerVisible,
    inappropriateRegionButtonPress,
    inappropriateRegionBannerVisible,
    onInappropriateRegionBannerVisible,
    directionNotSpecifiedBannerVisible,
    onDirectionNotSpecifiedBannerVisible,
  };
};
