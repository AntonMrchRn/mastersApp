import React, { FC, useEffect, useState } from 'react';

import { useToast } from 'rn-ui-kit';

import { useDeleteMaterialMutation } from '@/store/api/tasks';
import { AxiosQueryErrorResponse } from '@/types/error';
import { OutlayStatusType, RoleType, StatusType, TaskType } from '@/types/task';

import { TaskEstimateItem } from '../../TaskEstimateItem';

type MaterialItemProps = {
  firstAction: () => void;
  refetch: () => void;
  title?: string;
  price?: number;
  count?: number;
  taskId: number;
  materialID: number | undefined;
  sum?: number;
  roleID: RoleType;
  canSwipe?: boolean;
  measure: string | undefined;
  outlayStatusID: OutlayStatusType | undefined;
  statusID: StatusType | undefined;
  subsetID: TaskType | undefined;
};
export const MaterialItem: FC<MaterialItemProps> = ({
  title = '',
  price = 0,
  count = 0,
  sum = 0,
  roleID,
  canSwipe,
  measure = '',
  outlayStatusID,
  statusID,
  subsetID,
  firstAction,
  refetch,
  taskId,
  materialID,
}) => {
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const [deleteMaterial, { isError, error }] = useDeleteMaterialMutation();

  const secondActionMaterial = async () => {
    if (materialID && !loading) {
      setLoading(true);
      await deleteMaterial({
        ID: materialID.toString(),
        taskID: taskId.toString(),
      });
      await refetch();
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
      });
    }
  }, [error]);

  return (
    <TaskEstimateItem
      subsetID={subsetID}
      firstAction={firstAction}
      secondAction={secondActionMaterial}
      title={title}
      price={price}
      count={count}
      sum={sum}
      roleID={roleID}
      canSwipe={canSwipe}
      measure={measure}
      outlayStatusID={outlayStatusID}
      statusID={statusID}
    />
  );
};
