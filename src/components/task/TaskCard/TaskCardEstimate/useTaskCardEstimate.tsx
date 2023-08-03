import { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';
import { useToast } from 'rn-ui-kit';

import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppSelector } from '@/store';
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
import { EstimateTab, StatusType } from '@/types/task';

export const useTaskCardEstimate = ({
  services,
  taskId,
  navigation,
  onEstimateBottomVisible,
  estimateBottomVisible,
  currentEstimateTab,
  statusID,
  winnerOffer,
}: {
  services: Service[];
  taskId: number;
  navigation: StackNavigationProp<
    AppStackParamList,
    AppScreenName.TaskCard,
    undefined
  >;
  onEstimateBottomVisible: () => void;
  estimateBottomVisible: boolean;
  currentEstimateTab: EstimateTab;
  statusID: StatusType | undefined;
  winnerOffer: Offer | undefined;
}) => {
  const toast = useToast();

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

  const userServices = userOffer?.services || [];
  const isTaskEctimateTab = currentEstimateTab === EstimateTab.TASK_ESTIMATE;
  const userComment = userOffer?.comment;
  const currentServices =
    currentEstimateTab === EstimateTab.TASK_ESTIMATE ? services : userServices;
  const canSwipe = !estimateBottomVisible && statusID === StatusType.WORK;

  const [deleteTaskService, mutationDeleteTaskService] =
    useDeleteTaskServiceMutation();
  const [patchTaskService, mutationTaskService] = usePatchTaskServiceMutation();
  const [deleteMaterial, mutationDeleteMateria] = useDeleteMaterialMutation();

  const [estimateSheetVisible, setEstimateSheetVisible] = useState(false);

  const isAnotherOffers = !!getAnotherOffers.data;

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
    !estimateBottomVisible && onEstimateBottomVisible();
    onEstimateSheetVisible();
  };
  const onPressService = () => {
    estimateBottomVisible && onEstimateBottomVisible();
    onEstimateSheetVisible();
    setTimeout(() => {
      bsRef.current?.present();
    }, 500);
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
      navigation.navigate(AppScreenName.UserEstimateEdit, {
        taskId,
        offer: userOffer,
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
  };
};
