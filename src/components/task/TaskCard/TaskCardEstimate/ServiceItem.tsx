import React, { FC, useEffect, useState } from 'react';

import { useToast } from 'rn-ui-kit';

import { useDeleteTaskServiceMutation } from '@/store/api/tasks';
import { AxiosQueryErrorResponse } from '@/types/error';
import { OutlayStatusType, RoleType, StatusType, TaskType } from '@/types/task';

import { TaskEstimateItem } from '../../TaskEstimateItem';

type ServiceItemProps = {
  firstAction: () => void;
  title?: string;
  price?: number;
  count?: number;
  sum?: number;
  roleID: RoleType;
  canSwipe?: boolean;
  measure: string | undefined;
  outlayStatusID: OutlayStatusType | undefined;
  statusID: StatusType | undefined;
  subsetID: TaskType | undefined;
  servicesLength: number;
  serviceID: number;
  refetch: () => void;
  handleBanner: () => void;
};
export const ServiceItem: FC<ServiceItemProps> = ({
  firstAction,
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
  servicesLength,
  serviceID,
  refetch,
  handleBanner,
}) => {
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const [deleteTaskService, { isError, error }] =
    useDeleteTaskServiceMutation();

  const secondActionService = async () => {
    if (servicesLength > 1) {
      if (!loading) {
        setLoading(true);
        await deleteTaskService({
          serviceId: serviceID,
        });
        await refetch();
      }
    } else {
      handleBanner();
    }
  };

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
      });
      setLoading(false);
    }
  }, [error]);

  return (
    <TaskEstimateItem
      subsetID={subsetID}
      firstAction={firstAction}
      secondAction={secondActionService}
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
