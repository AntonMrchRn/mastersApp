import { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { useToast } from 'rn-ui-kit';

import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import {
  useDeleteTaskServiceMutation,
  useGetTaskQuery,
  usePatchTaskMutation,
} from '@/store/api/tasks';
import { Material, Service } from '@/store/api/tasks/types';
import { OutlayStatusType } from '@/types/task';

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

  const [patchTask, mutationTask] = usePatchTaskMutation();
  const [deleteTaskService, mutationDeleteTaskService] =
    useDeleteTaskServiceMutation();

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
    const newMaterials = service.materials?.filter(
      materia => materia !== material
    );
    const newService = { ...service, materials: newMaterials };
    const newServices = services.reduce<Service[]>((acc, val) => {
      if (val.ID === newService.ID) {
        return acc.concat(newService);
      }
      return acc.concat(val);
    }, []);
    await patchTask({
      //id таски
      ID: taskId,
      //массив услуг
      services: newServices,
      //при удалении сметы она снова становится не согласована
      outlayStatusID: OutlayStatusType.PENDING,
    });
    getTask.refetch();
  };
  useEffect(() => {
    if (mutationTask.error && 'data' in mutationTask.error) {
      toast.show({
        type: 'error',
        title: mutationTask?.error?.data?.message,
        contentHeight: 120,
      });
    }
  }, [mutationTask.error]);

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
