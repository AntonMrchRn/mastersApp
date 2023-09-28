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
import { Material, Offer, Service } from '@/store/api/tasks/types';
import { selectAuth } from '@/store/slices/auth/selectors';
import {
  setNewOfferServices,
  setOfferComment,
  setOfferID,
} from '@/store/slices/tasks/actions';
import { EstimateTab, RoleType, StatusType, TaskType } from '@/types/task';

export const useTaskCardEstimate = ({
  services,
  taskId,
  navigation,
  currentEstimateTab,
  statusID,
  winnerOffer,
  subsetID,
  isContractor,
}: {
  services: Service[];
  taskId: number;
  navigation: StackNavigationProp<
    AppStackParamList,
    AppScreenName.TaskCard,
    undefined
  >;
  currentEstimateTab: EstimateTab;
  statusID: StatusType | undefined;
  winnerOffer: Offer | undefined;
  subsetID: TaskType | undefined;
  isContractor: boolean;
}) => {
  const dispatch = useAppDispatch();
  const bsRef = useRef<BottomSheetModal>(null);

  const { user } = useAppSelector(selectAuth);

  const userRoleID = user?.roleID;

  const userID = user?.userID;

  const { data, refetch } = useGetTaskQuery(taskId);
  const getAnotherOffers = useGetAnotherOffersQuery({
    taskID: +taskId,
    userID: userID as number,
  });
  const getUserOffersQuery = useGetUserOffersQuery({
    taskID: +taskId,
    userID: userID as number,
  });
  const userOffer = getUserOffersQuery.data?.offers?.[0];
  const task = data?.tasks?.[0];
  const setId = task?.setID;
  const isOffersPublic = task?.isOffersPublic;
  const offersDeadline = task?.offersDeadline;
  const isOffersDeadlineOver =
    offersDeadline && dayjs().isAfter(offersDeadline);

  const isInternalExecutor = user?.roleID === RoleType.INTERNAL_EXECUTOR;

  const userServices = userOffer?.services || [];
  const isTaskEstimateTab = currentEstimateTab === EstimateTab.TASK_ESTIMATE;
  const userComment = userOffer?.comment;
  const clientComment = userOffer?.clientComment || '';

  const getCurrentServices = () => {
    switch (subsetID) {
      case TaskType.COMMON_FIRST_RESPONSE:
        return services;
      case (TaskType.COMMON_AUCTION_SALE, TaskType.IT_AUCTION_SALE):
        if (statusID !== StatusType.ACTIVE) {
          return userServices;
        }
        if (currentEstimateTab === EstimateTab.MY_SUGGESTION) {
          return userServices;
        }
        return services;
      default:
        return services;
    }
  };

  const currentServices = getCurrentServices();
  const canSwipe =
    subsetID &&
    !(
      isContractor &&
      [TaskType.IT_FIRST_RESPONSE, TaskType.IT_AUCTION_SALE].includes(subsetID)
    ) &&
    statusID === StatusType.WORK &&
    subsetID !== TaskType.COMMON_AUCTION_SALE;

  const [estimateSheetVisible, setEstimateSheetVisible] = useState(false);

  const isAnotherOffers = !!getAnotherOffers?.data?.count;

  const allMaterials = currentServices.reduce<Material[]>(
    (acc, val) =>
      acc.concat(typeof val.materials !== 'undefined' ? val.materials : []),
    []
  );
  const servicesSum = currentServices.reduce(
    (acc, val) => acc + (val?.count || 0) * (val?.price || 0),
    0
  );
  const materialsSum = allMaterials.reduce(
    (acc, val) => acc + (val?.count || 0) * (val?.price || 0),
    0
  );
  const serviceNames = services?.reduce<string[]>((acc, val) => {
    if (val.name) {
      return acc.concat(val.name);
    }
    return acc;
  }, []);

  const onEstimateSheetVisible = () => {
    setEstimateSheetVisible(true);
  };
  const onEstimateSheetClose = () => {
    setEstimateSheetVisible(false);
  };

  const addServiceBottomSheetClose = () => {
    bsRef.current?.close();
  };
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
  const onEdit = (serviceId: number, materialName?: string) => {
    navigation.navigate(AppScreenName.EstimateEdit, {
      taskId,
      serviceId,
      materialName,
    });
  };

  const addService = (service: Service) => {
    navigation.navigate(AppScreenName.EstimateAddService, {
      service,
      taskId,
    });
    bsRef.current?.close();
  };
  const onCandidateEstimates = (isResults: boolean) => {
    navigation.navigate(AppScreenName.CandidateEstimates, {
      taskId,
      ...(!isResults && { userID }),
      ...(isResults && { winnerOffer }),
      isResults,
    });
  };

  const onEditEstimate = () => {
    if (userOffer) {
      const initServices: Service[] = userOffer.services.map(serv => {
        const coordServices = services.find(ser => ser.name === serv.name);
        const initMaterials: Material[] =
          serv.materials?.map(mat => {
            const coordMaterial = coordServices?.materials?.find(
              m => m.name === mat.name
            );
            return {
              ...mat,
              price: coordMaterial ? coordMaterial.price : mat.price,
              canDelete: !coordMaterial,
              localPrice: mat.price?.toString(),
              count: coordMaterial ? coordMaterial.count : mat.count,
              localCount: mat.count.toString(),
            };
          }) || [];
        return {
          ...serv,
          canDelete: !coordServices,
          price: coordServices ? coordServices.price : serv.price,
          count: coordServices ? coordServices.count : serv.count,
          localPrice: serv.price.toString(),
          localCount: serv.count?.toString() || '',
          materials: initMaterials,
        };
      });
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
    estimateSheetVisible,
    onEstimateSheetVisible,
    onEstimateSheetClose,
    materialsSum,
    onEdit,
    onPressMaterial,
    onPressService,
    bsRef,
    addServiceBottomSheetClose,
    isAnotherOffers,
    currentServices,
    userID,
    userComment,
    clientComment,
    isTaskEstimateTab,
    isOffersPublic,
    isOffersDeadlineOver,
    canSwipe,
    serviceNames,
    addService,
    onCandidateEstimates,
    onEditEstimate,
    userRoleID,
    setId,
    isInternalExecutor,
    servicesSum,
    refetch,
  };
};
