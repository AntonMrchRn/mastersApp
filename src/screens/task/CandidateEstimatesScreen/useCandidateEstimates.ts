import { useEffect, useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'rn-ui-kit';

import { useGetAnotherOffersQuery, useGetOffersQuery } from '@/store/api/tasks';
import { AxiosQueryErrorResponse } from '@/types/error';

export const useCandidateEstimates = (
  taskId: number,
  isResults: boolean,
  userID?: number,
) => {
  const isFocused = useIsFocused();
  const toast = useToast();

  const scrollX = useSharedValue<number>(0);
  const ref = useRef<FlatList>(null);

  const [activeIndex, setActiveIndex] = useState<number | null | undefined>(0);

  const {
    data: offersData,
    refetch: refetchOffers,
    isError: isOffersError,
    error: offersError,
    isLoading: isOffersLoading,
  } = useGetOffersQuery(taskId, {
    skip: !isResults,
  });
  const {
    data: anotherOffersData,
    refetch: refetchAnotherOffers,
    isError: isAnotherOffersError,
    error: anotherOffersError,
    isLoading: isAnotherOffersLoading,
  } = useGetAnotherOffersQuery(
    {
      taskID: taskId,
      userID: userID as number,
    },
    { skip: isResults || !userID },
  );

  const error = isResults ? offersError : anotherOffersError;
  const isError = isResults ? isOffersError : isAnotherOffersError;
  const isLoading = isResults ? isOffersLoading : isAnotherOffersLoading;
  const offers =
    (isResults ? offersData?.offers : anotherOffersData?.offers) || [];

  useEffect(() => {
    if (isFocused) {
      isResults ? refetchOffers() : refetchAnotherOffers();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
      });
    }
  }, [isError]);

  const onViewRef = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      setActiveIndex(viewableItems[0]?.index);
    },
  );
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });
  const scrollTo = (direction: 'left' | 'right' = 'right') =>
    activeIndex !== null &&
    activeIndex !== undefined &&
    ref.current?.scrollToIndex({
      index: direction === 'left' ? activeIndex - 1 : activeIndex + 1,
    });

  return {
    ref,
    offers,
    scrollX,
    onScroll,
    scrollTo,
    isLoading,
    onViewRef,
    activeIndex,
  };
};
