import React, { FC } from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { StackScreenProps } from '@react-navigation/stack';
import { Spacer, Text } from 'rn-ui-kit';

import { configApp, deviceWidth } from '@/constants/platform';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useGetOffersQuery } from '@/store/api/tasks';

import { styles } from './styles';

type CompetitorEstimatesScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.CompetitorEstimates
>;
export const CompetitorEstimatesScreen: FC<CompetitorEstimatesScreenProps> = ({
  route,
}) => {
  const offers = useGetOffersQuery(route.params.taskId.toString());
  const data = offers.data?.offers || [];
  console.log('🚀 ~ file: index.tsx:23 ~ data:', data);
  return (
    <View style={styles.container}>
      <Text variant="title2" style={styles.title}>
        Текущие предложения
      </Text>
      <Carousel
        loop={false}
        style={styles.carousel}
        width={deviceWidth - 40}
        data={data}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text variant="title3">Кандидат {index + 1}</Text>
            <Spacer size={8} />
          </View>
        )}
      />
    </View>
  );
};
