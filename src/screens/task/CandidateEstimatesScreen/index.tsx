import React, { useRef } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CaretLeftIcon } from '@/assets/icons/svg/estimate/CaretLeftIcon';
import { CaretRightIcon } from '@/assets/icons/svg/estimate/CaretRightIcon';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { CandidateItem } from '@/screens/task/CandidateEstimatesScreen/CandidateItem';
import { useCandidateEstimates } from '@/screens/task/CandidateEstimatesScreen/useCandidateEstimates';
import { Offer } from '@/store/api/tasks/types';

import { styles } from './styles';

type CandidateEstimatesScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.CandidateEstimates
>;

export const CandidateEstimatesScreen = ({
  route,
}: CandidateEstimatesScreenProps) => {
  const { taskId, userID, isResults } = route.params;
  const theme = useTheme();
  const {
    ref,
    offers,
    scrollX,
    onScroll,
    scrollTo,
    isLoading,
    onViewRef,
    activeIndex,
    onRefresh,
    winnerOffer,
  } = useCandidateEstimates(taskId, isResults, userID);

  const keyExtractor = (item: Offer) => `${item.ID}`;
  const renderItem = ({
    item: offer,
    index,
  }: {
    item: Offer;
    index: number;
  }) => (
    <CandidateItem
      key={offer.ID}
      offer={offer}
      index={index}
      scrollX={scrollX}
      length={offers.length}
      isWinner={isResults ? winnerOffer?.ID === offer.ID : false}
    />
  );
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        nestedScrollEnabled
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <Text variant="title2" style={styles.title}>
          {isResults ? 'Результаты торгов' : 'Текущие предложения'}
        </Text>
        {offers.length > 1 && (
          <>
            <Spacer />
            <View style={styles.arrows}>
              <ShadowedView style={[styles.arrow, styles.shadow]}>
                <TouchableOpacity
                  style={styles.arrowBtn}
                  disabled={activeIndex === 0}
                  onPress={() => scrollTo('left')}
                >
                  <CaretLeftIcon
                    fill={
                      activeIndex === 0
                        ? theme.icons.neutralDisable
                        : theme.icons.basic
                    }
                  />
                </TouchableOpacity>
              </ShadowedView>
              <ShadowedView style={[styles.arrow, styles.shadow]}>
                <TouchableOpacity
                  style={styles.arrowBtn}
                  disabled={activeIndex === offers.length - 1}
                  onPress={() => scrollTo('right')}
                >
                  <CaretRightIcon
                    fill={
                      activeIndex === offers.length - 1
                        ? theme.icons.neutralDisable
                        : theme.icons.basic
                    }
                  />
                </TouchableOpacity>
              </ShadowedView>
            </View>
          </>
        )}
        <Spacer />
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Animated.FlatList
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ref={ref}
            pagingEnabled
            horizontal
            data={offers}
            bounces={false}
            viewabilityConfig={viewConfig}
            onScroll={onScroll}
            decelerationRate="fast"
            scrollEventThrottle={16}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewRef.current}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
