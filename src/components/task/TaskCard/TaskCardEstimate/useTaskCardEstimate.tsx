import { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';
import { useToast } from 'rn-ui-kit';

import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  useDeleteMaterialMutation,
  useDeleteTaskServiceMutation,
  useGetAnotherOffersQuery,
  useGetTaskQuery,
  useGetUserOffersQuery,
  usePatchTaskServiceMutation,
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
  const toast = useToast();
  const dispatch = useAppDispatch();
  const bsRef = useRef<BottomSheetModal>(null);

  const { user } = useAppSelector(selectAuth);

  const userRoleID = user?.roleID;

  const userID = user?.userID;

  const getTask = useGetTaskQuery(taskId.toString());
  const getAnotherOffers = useGetAnotherOffersQuery({
    taskID: +taskId,
    userID: userID as number,
  });
  const getUserOffersQuery = useGetUserOffersQuery({
    taskID: +taskId,
    userID: userID as number,
  });
  const userOffer = getUserOffersQuery.data?.offers?.[0];
  const task = getTask.data?.tasks?.[0];
  const setId = task?.setID;
  const isOffersPublic = task?.isOffersPublic;
  const offersDeadline = task?.offersDeadline;
  const isOffersDeadlineOver =
    offersDeadline && dayjs().isAfter(offersDeadline);

  const isInternalExecutor = user?.roleID === RoleType.INTERNAL_EXECUTOR;

  const userServices = userOffer?.services || [];
  const isTaskEctimateTab = currentEstimateTab === EstimateTab.TASK_ESTIMATE;
  const userComment = userOffer?.comment;
  const clientComment = userOffer?.clientComment || '';

  const getCurrentServices = () => {
    switch (subsetID) {
      case TaskType.COMMON_FIRST_RESPONSE:
        return services;
      case TaskType.COMMON_AUCTION_SALE:
        if (statusID === StatusType.WORK) {
          return winnerOffer?.services || [];
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

  const [deleteTaskService, mutationDeleteTaskService] =
    useDeleteTaskServiceMutation();
  const [patchTaskService, mutationTaskService] = usePatchTaskServiceMutation();
  const [deleteMaterial, mutationDeleteMateria] = useDeleteMaterialMutation();

  const [estimateSheetVisible, setEstimateSheetVisible] = useState(false);

  const isAnotherOffers = !!getAnotherOffers?.data?.count;

  const allSum = currentServices.reduce((acc, val) => acc + (val?.sum || 0), 0);
  const allMaterials = currentServices.reduce<Material[]>(
    (acc, val) =>
      acc.concat(typeof val.materials !== 'undefined' ? val.materials : []),
    []
  );
  const materialsSum = allMaterials.reduce(
    (acc, val) => acc + (val?.count || 0) * (val?.price || 0),
    0
  );
  const serviceIDs = services?.reduce<number[]>(
    (acc, val) => acc.concat(val.ID as number),
    []
  );

  const onEstimateSheetVisible = () => {
    setEstimateSheetVisible(!estimateSheetVisible);
  };
  const addServiceBottomSheetClose = () => {
    bsRef.current?.close();
  };
  const onPressMaterial = () => {
    onEstimateSheetVisible();
    navigation.navigate(AppScreenName.NewMaterial, {
      taskId,
      services: currentServices,
    });
  };
  const onPressService = () => {
    onEstimateSheetVisible();
    bsRef.current?.present();
  };
  const onEdit = (serviceId: number, materialName?: string) => {
    navigation.navigate(AppScreenName.EstimateEdit, {
      taskId,
      serviceId,
      materialName,
    });
  };
  const onDeleteService = async (serviceId: number) => {
    await deleteTaskService({
      serviceId,
    });
    getTask.refetch();
  };
  const onDeleteMaterial = async (service: Service, material: Material) => {
    if (material.ID) {
      await patchTaskService({
        ID: service.ID,
        taskID: taskId,
        materials: [],
        sum:
          (service?.sum || 0) - (material?.price || 0) * (material?.count || 0),
      });
      await deleteMaterial({
        ID: material.ID.toString(),
        taskID: taskId.toString(),
      });
      getTask.refetch();
    }
  };
  const addService = (service: Service) => {
    navigation.navigate(AppScreenName.EstimateAddService, {
      service,
      taskId,
    });
    bsRef.current?.close();
  };
  const onCompetitorEstimates = () => {
    if (userID) {
      navigation.navigate(AppScreenName.CompetitorEstimates, {
        taskId,
        userID,
      });
    }
  };
  const onTradingResults = () => {
    navigation.navigate(AppScreenName.TradingResults, {
      taskId,
      winnerOffer,
    });
  };
  const onEditEstimate = () => {
    if (userOffer) {
      const initServices: Service[] = userOffer.services.map(serv => {
        const initMaterials: Material[] =
          serv.materials?.map(mat => {
            return {
              ...mat,
              localSum: (mat.count * mat.price).toString(),
            };
          }) || [];
        return {
          ...serv,
          localSum: serv.sum?.toString(),
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

  useEffect(() => {
    if (
      mutationDeleteTaskService.error &&
      'data' in mutationDeleteTaskService.error
    ) {
      toast.show({
        type: 'error',
        title: mutationDeleteTaskService?.error?.data?.message,
      });
    }
  }, [mutationDeleteTaskService.error]);
  useEffect(() => {
    if (mutationTaskService.error && 'data' in mutationTaskService.error) {
      toast.show({
        type: 'error',
        title: mutationTaskService?.error?.data?.message,
      });
    }
  }, [mutationTaskService.error]);
  useEffect(() => {
    if (mutationDeleteMateria.error && 'data' in mutationDeleteMateria.error) {
      toast.show({
        type: 'error',
        title: mutationDeleteMateria?.error?.data?.message,
      });
    }
  }, [mutationDeleteMateria.error]);

  return {
    estimateSheetVisible,
    onEstimateSheetVisible,
    allSum,
    materialsSum,
    onEdit,
    onDeleteService,
    onDeleteMaterial,
    onPressMaterial,
    onPressService,
    bsRef,
    addServiceBottomSheetClose,
    isAnotherOffers,
    currentServices,
    userID,
    userComment,
    clientComment,
    isTaskEctimateTab,
    isOffersPublic,
    isOffersDeadlineOver,
    canSwipe,
    serviceIDs,
    addService,
    onCompetitorEstimates,
    onTradingResults,
    onEditEstimate,
    userRoleID,
    setId,
    isInternalExecutor,
  };
};
