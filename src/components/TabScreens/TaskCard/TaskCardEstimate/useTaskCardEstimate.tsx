import { useEffect, useState } from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { useToast } from 'rn-ui-kit';

import { useGetTaskQuery, usePatchTaskMutation } from '@/store/api/tasks';
import { Material, Service } from '@/store/api/tasks/types';
import {
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName,
} from '@/types/navigation';

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
    TaskSearchNavigationParamList,
    TaskSearchNavigatorScreenName.TaskCard,
    undefined
  >;
  onEstimateBottomVisible: () => void;
  estimateBottomVisible: boolean;
}) => {
  const toast = useToast();

  const getTask = useGetTaskQuery(taskId.toString());

  const [patchTask, mutationTask] = usePatchTaskMutation();

  const [sheetVisible, setSheetVisible] = useState(false);

  const allSum = services.reduce((acc, val) => acc + val.sum, 0);
  const allMaterials = services.reduce<Material[]>(
    (acc, val) =>
      acc.concat(typeof val.materials !== 'undefined' ? val.materials : []),
    []
  );
  const materialsSum = allMaterials.reduce(
    (acc, val) => acc + (val?.count || 0) * (val?.price || 0),
    0
  );

  const onSheetVisible = () => {
    setSheetVisible(!sheetVisible);
  };
  const onPressMaterial = () => {
    !estimateBottomVisible && onEstimateBottomVisible();
    onSheetVisible();
  };
  const onPressService = () => {
    !estimateBottomVisible && onEstimateBottomVisible();
    onSheetVisible();
  };
  const onEdit = (serviceId: number, materialName?: string) => {
    navigation.navigate(TaskSearchNavigatorScreenName.EstimateEdit, {
      taskId,
      serviceId,
      materialName,
    });
  };
  const onDeleteService = async (serviceId: number) => {
    const newServices = services.filter(servic => servic.ID !== serviceId);
    await patchTask({
      //id таски
      ID: taskId,
      //массив услуг
      services: newServices,
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
    });
    getTask.refetch();
  };
  //TODO при добавлении материала проверять чтобы имя не совпадало с другими именами в массиве материалов к конкретной услуге
  useEffect(() => {
    if (mutationTask.error && 'data' in mutationTask.error) {
      toast.show({
        type: 'error',
        title: mutationTask?.error?.data?.message,
        contentHeight: 120,
      });
    }
  }, [mutationTask.error]);

  return {
    sheetVisible,
    onSheetVisible,
    allSum,
    materialsSum,
    onEdit,
    onDeleteService,
    onDeleteMaterial,
    onPressMaterial,
    onPressService,
  };
};
