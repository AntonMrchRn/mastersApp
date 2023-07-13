import React, { FC } from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { StackScreenProps } from '@react-navigation/stack';
import { Text } from 'rn-ui-kit';

import { deviceWidth } from '@/constants/platform';
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
  return (
    <View style={styles.container}>
      <Text variant="title2" style={styles.title}>
        Текущие предложения
      </Text>
      <Carousel
        style={styles.carousel}
        width={deviceWidth}
        height={deviceWidth / 2}
        data={[...new Array(6).keys()]}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}
          >
            <Text
              variant="title2"
              style={{ textAlign: 'center', fontSize: 30 }}
            >
              {index}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
