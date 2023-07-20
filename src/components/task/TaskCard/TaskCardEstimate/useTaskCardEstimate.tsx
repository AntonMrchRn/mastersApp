import { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { useToast } from 'rn-ui-kit';

import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import {
  useDeleteMaterialMutation,
  useDeleteTaskServiceMutation,
  useGetTaskQuery,
  usePatchTaskServiceMutation,
} from '@/store/api/tasks';
import { Material, Service } from '@/store/api/tasks/types';

export const useTaskCardEstimate = ({
  services,
  taskId,
  navigation,
  onEstimateBottomVisible,
  estimateBottomVisible,
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
}) => {
  const toast = useToast();

  const bsRef = useRef<BottomSheetModal>(null);

  const getTask = useGetTaskQuery(taskId.toString());

  const [deleteTaskService, mutationDeleteTaskService] =
    useDeleteTaskServiceMutation();
  const [patchTaskService, mutationTaskService] = usePatchTaskServiceMutation();
  const [deleteMaterial, mutationDeleteMateria] = useDeleteMaterialMutation();

  const [estimateSheetVisible, setEstimateSheetVisible] = useState(false);

  const allSum = services.reduce((acc, val) => acc + (val?.sum || 0), 0);
  const allMaterials = services.reduce<Material[]>(
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
  };

  useEffect(() => {
    if (
      mutationDeleteTaskService.error &&
      'data' in mutationDeleteTaskService.error
    ) {
      toast.show({
        type: 'error',
        title: mutationDeleteTaskService?.error?.data?.message,
        contentHeight: 120,
      });
    }
  }, [mutationDeleteTaskService.error]);
  useEffect(() => {
    if (mutationTaskService.error && 'data' in mutationTaskService.error) {
      toast.show({
        type: 'error',
        title: mutationTaskService?.error?.data?.message,
        contentHeight: 120,
      });
    }
  }, [mutationTaskService.error]);
  useEffect(() => {
    if (mutationDeleteMateria.error && 'data' in mutationDeleteMateria.error) {
      toast.show({
        type: 'error',
        title: mutationDeleteMateria?.error?.data?.message,
        contentHeight: 120,
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
  };
};
