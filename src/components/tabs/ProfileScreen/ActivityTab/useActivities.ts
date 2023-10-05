import { useEffect } from 'react';

import { useToast } from 'rn-ui-kit';

import { useGetActivitiesQuery } from '@/store/api/user';
import { AxiosQueryErrorResponse } from '@/types/error';

const useActivities = (setIDs: number[] | undefined) => {
  const toast = useToast();
  const { activities, userActivities, error, isError, isLoading } =
    useGetActivitiesQuery(undefined, {
      selectFromResult: ({ data, isLoading, isError, error }) => ({
        activities: data,
        error: error,
        isError,
        isLoading,
        userActivities: data?.filter(activity => setIDs?.includes(activity.ID)),
      }),
    });

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
      });
    }
  }, [isError]);

  const convertedActivities = userActivities
    ?.reduce(
      (convertedActivities, activity, index, array) =>
        index !== array.length - 1
          ? `${convertedActivities} ${activity.description},`
          : `${convertedActivities} ${activity.description}`,
      '',
    )
    .trim();

  return {
    activities,
    convertedActivities,
    isActivitiesLoading: isLoading,
  };
};

export default useActivities;
