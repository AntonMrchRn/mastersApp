import React, { useEffect, useState } from 'react';

import { useToast } from 'rn-ui-kit';

import { useGetTaskQuery, usePatchTaskMutation } from '@/store/api/tasks';
import { Material, Service } from '@/store/api/tasks/types';

export const useTaskCardEstimate = ({
  services,
  taskId,
}: {
  services: Service[];
  taskId: number;
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
  const onEdit = (id: number) => {
    getTask.refetch();
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
  };
};
