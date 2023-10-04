import React, { FC, useEffect, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';

import { useAppSelector } from '@/store';
import { useDeleteTaskServiceMutation } from '@/store/api/tasks';
import { selectAuth } from '@/store/slices/auth/selectors';
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
  isContractor: boolean;
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
  isContractor,
}) => {
  const toast = useToast();

  const userRoleId = useAppSelector(selectAuth).user?.roleID;

  const [loading, setLoading] = useState(false);

  const [deleteTaskService, { isError, error }] =
    useDeleteTaskServiceMutation();

  const isInternalExecutor = userRoleId === RoleType.INTERNAL_EXECUTOR;

  useFocusEffect(() => {
    return setLoading(false);
  });

  const secondActionService = async () => {
    if (servicesLength > 1 || isInternalExecutor) {
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

  const firstActionService = () => {
    if (!loading) {
      setLoading(true);
      firstAction();
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
      firstAction={firstActionService}
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
      isContractor={isContractor}
    />
  );
};
