import { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
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
import { Material, Service } from '@/store/api/tasks/types';
import { selectAuth } from '@/store/slices/auth/selectors';
import { EstimateTab } from '@/types/task';

export const useTaskCardEstimate = ({
  services,
  taskId,
  navigation,
  onEstimateBottomVisible,
  estimateBottomVisible,
  currentEstimateTab,
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
}) => {
  const toast = useToast();

  const bsRef = useRef<BottomSheetModal>(null);

  const { user } = useAppSelector(selectAuth);

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
  const userServices = userOffer?.services || [];

  const currentServices =
    currentEstimateTab === EstimateTab.TASK_ESTIMATE ? services : userServices;

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
  };
};
