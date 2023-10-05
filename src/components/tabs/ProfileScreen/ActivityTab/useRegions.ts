import { useEffect } from 'react';

import { useToast } from 'rn-ui-kit';

import { useGetRegionsQuery } from '@/store/api/user';
import { AxiosQueryErrorResponse } from '@/types/error';

const useRegions = (regionIDs: number[] | undefined, isContractor = false) => {
  const toast = useToast();
  const { regions, userRegions, error, isError, isLoading } =
    useGetRegionsQuery(undefined, {
      selectFromResult: ({ data, isLoading, isError, error }) => ({
        regions: data,
        error,
        isError,
        isLoading,
        userRegions: data?.filter(region => regionIDs?.includes(region.ID)),
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

  const convertedRegions = userRegions
    ?.reduce(
      (convertedRegions, region, index, array) =>
        array.length === 1
          ? array[0]?.name || ''
          : isContractor
          ? index !== array.length - 1
            ? `${convertedRegions} ${region.name},`
            : `${convertedRegions} ${region.name}`
          : `${array[0]?.name}, + еще ${array.length - 1}`,
      '',
    )
    .trim();

  return {
    regions,
    convertedRegions,
    isRegionsLoading: isLoading,
  };
};

export default useRegions;
