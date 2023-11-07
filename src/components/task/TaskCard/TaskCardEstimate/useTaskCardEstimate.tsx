import { useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';

import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  useGetAnotherOffersQuery,
  useGetTaskQuery,
  useGetUserOffersQuery,
} from '@/store/api/tasks';
import { Material, Service } from '@/store/api/tasks/types';
import { selectAuth } from '@/store/slices/auth/selectors';
import {
  setNewOfferServices,
  setOfferComment,
  setOfferID,
} from '@/store/slices/tasks/actions';
import { EstimateTab, RoleType, StatusType, TaskType } from '@/types/task';
import { getInitServices } from '@/utils/getInitServices';

export const useTaskCardEstimate = ({
  taskId,
  services,
  statusID,
  subsetID,
  curatorId,
  navigation,
  isContractor,
  currentEstimateTab,
}: {
  taskId: number;
  services: Service[];
  curatorId?: number;
  isContractor: boolean;
  subsetID: TaskType | undefined;
  statusID: StatusType | undefined;
  currentEstimateTab: EstimateTab;
  navigation: StackNavigationProp<AppStackParamList, AppScreenName.TaskCard>;
}) => {
  const dispatch = useAppDispatch();
  const bsRef = useRef<BottomSheetModal>(null);

  const [estimateSheetVisible, setEstimateSheetVisible] = useState(false);

  const { user } = useAppSelector(selectAuth);

  const userID = user?.userID;

  const { data, refetch } = useGetTaskQuery(taskId);
  const getAnotherOffers = useGetAnotherOffersQuery({
    taskID: +taskId,
    userID: userID as number,
  });
  const getUserOffersQuery = useGetUserOffersQuery({
    taskID: +taskId,
    userID: (isContractor && subsetID === TaskType.IT_AUCTION_SALE
      ? curatorId
      : userID) as number,
  });
  const userOffer = getUserOffersQuery.data?.offers?.[0];
  const isAnotherOffers = !!getAnotherOffers?.data?.count;
  const task = data?.tasks?.[0];
  const setId = task?.setID;
  const isOffersPublic = task?.isOffersPublic;
  const offersDeadline = task?.offersDeadline;
  const isOffersDeadlineOver =
    offersDeadline && dayjs().isAfter(offersDeadline);

  const userServices = userOffer?.services || [];
  const isTaskEstimateTab = currentEstimateTab === EstimateTab.TASK_ESTIMATE;
  const userComment = userOffer?.comment;
  const clientComment = userOffer?.clientComment || '';
  const isInternalExecutor = user?.roleID === RoleType.INTERNAL_EXECUTOR;

  const showOffers =
    (subsetID &&
      !isContractor &&
      [TaskType.COMMON_AUCTION_SALE, TaskType.IT_AUCTION_SALE].includes(
        subsetID,
      ) &&
      statusID === StatusType.ACTIVE) ||
    (subsetID === TaskType.IT_AUCTION_SALE && statusID === StatusType.WORK);

  const isEstimateEditable =
    subsetID === TaskType.IT_AUCTION_SALE
      ? (!isTaskEstimateTab &&
          !isContractor &&
          statusID === StatusType.ACTIVE) ||
        (statusID === StatusType.WORK && !isContractor && isTaskEstimateTab)
      : !isTaskEstimateTab;

  const canSwipe =
    subsetID &&
    !(isContractor && subsetID === TaskType.IT_FIRST_RESPONSE) &&
    statusID === StatusType.WORK &&
    ![TaskType.COMMON_AUCTION_SALE, TaskType.IT_AUCTION_SALE].includes(
      subsetID,
    );

  const getCurrentServices = () => {
    switch (subsetID) {
      case TaskType.COMMON_FIRST_RESPONSE:
        return services;
      case TaskType.COMMON_AUCTION_SALE:
        if (
          statusID !== StatusType.ACTIVE ||
          currentEstimateTab === EstimateTab.MY_SUGGESTION
        ) {
          return userServices;
        }
        return services;
      case TaskType.IT_AUCTION_SALE:
        if (
          (statusID === StatusType.ACTIVE && isContractor) ||
          (statusID && ![StatusType.ACTIVE].includes(statusID)) ||
          currentEstimateTab === EstimateTab.MY_SUGGESTION
        ) {
          return userServices;
        }
        return services;
      default:
        return services;
    }
  };

  const currentServices = getCurrentServices();
  const allMaterials = currentServices.reduce<Material[]>(
    (acc, val) =>
      acc.concat(typeof val.materials !== 'undefined' ? val.materials : []),
    [],
  );
  const servicesSum = currentServices.reduce(
    (acc, val) => acc + (val?.count || 0) * (val?.price || 0),
    0,
  );
  const materialsSum = allMaterials.reduce(
    (acc, val) => acc + (val?.count || 0) * (val?.price || 0),
    0,
  );
  const serviceNames = services?.reduce<string[]>((acc, val) => {
    if (val.name) {
      return acc.concat(val.name);
    }
    return acc;
  }, []);

  const onEstimateSheetVisible = () => setEstimateSheetVisible(true);
  const onEstimateSheetClose = () => setEstimateSheetVisible(false);
  const addServiceBottomSheetClose = () => bsRef.current?.close();

  const onPressMaterial = () => {
    onEstimateSheetClose();
    navigation.navigate(AppScreenName.NewMaterial, {
      taskId,
      services: currentServices,
    });
  };
  const onPressService = () => {
    onEstimateSheetClose();
    bsRef.current?.present();
  };
  const onEdit = (serviceId: number, materialName?: string) =>
    navigation.navigate(AppScreenName.EstimateEdit, {
      taskId,
      serviceId,
      materialName,
    });

  const addService = (service: Service) => {
    navigation.navigate(AppScreenName.EstimateAddService, {
      service,
      taskId,
    });
    bsRef.current?.close();
  };
  const onCandidateEstimates = (isResults: boolean) =>
    navigation.navigate(AppScreenName.CandidateEstimates, {
      taskId,
      ...(!isResults && { userID }),
      isResults,
    });

  const onEditEstimate = () => {
    if (userOffer) {
      const initServices: Service[] = getInitServices(userOffer, services);

      dispatch(setNewOfferServices(initServices));
      dispatch(setOfferComment(userOffer.comment));
      dispatch(setOfferID(userOffer.ID));
      navigation.navigate(AppScreenName.EstimateSubmission, {
        taskId,
        isEdit: true,
      });
    }
  };

  return {
    bsRef,
    setId,
    userID,
    onEdit,
    refetch,
    canSwipe,
    showOffers,
    servicesSum,
    addService,
    userComment,
    serviceNames,
    materialsSum,
    clientComment,
    onEditEstimate,
    isOffersPublic,
    onPressService,
    currentServices,
    onPressMaterial,
    isAnotherOffers,
    isInternalExecutor,
    isEstimateEditable,
    isOffersDeadlineOver,
    onCandidateEstimates,
    onEstimateSheetClose,
    estimateSheetVisible,
    onEstimateSheetVisible,
    addServiceBottomSheetClose,
  };
};
