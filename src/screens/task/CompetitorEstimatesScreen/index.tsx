import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Spacer, Text } from 'rn-ui-kit';

import { EstimateTotal } from '@/components/task/EstimateTotal';
import { deviceWidth } from '@/constants/platform';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useGetOffersQuery } from '@/store/api/tasks';
import { Material } from '@/store/api/tasks/types';

import { Item } from './Item';

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

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        nestedScrollEnabled
      >
        <Text variant="title2" style={styles.title}>
          Текущие предложения
        </Text>
        <Carousel
          loop={false}
          vertical={false}
          style={styles.carousel}
          width={deviceWidth - 40}
          data={data}
          renderItem={({ item, index }) => {
            const allSum = item.services.reduce(
              (acc, val) =>
                acc + (val?.sum || (val?.count || 0) * (val?.price || 0)),
              0
            );
            const allMaterials = item.services.reduce<Material[]>(
              (acc, val) =>
                acc.concat(
                  typeof val.materials !== 'undefined' ? val.materials : []
                ),
              []
            );
            const materialsSum = allMaterials.reduce(
              (acc, val) => acc + (val?.count || 0) * (val?.price || 0),
              0
            );
            return (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.item}
                scrollEnabled={false}
                contentContainerStyle={styles.contentContainerStyle}
              >
                <Text variant="title3">Кандидат {index + 1}</Text>
                <Spacer size={8} />
                {item.services.map(service => {
                  return (
                    <View key={service.ID}>
                      <Item
                        name={service?.name || ''}
                        price={service?.price || 0}
                        count={service?.count || 0}
                        sum={service?.sum || 0}
                      />
                      {service.materials?.map(material => {
                        return (
                          <Item
                            key={material.name}
                            name={material?.name || ''}
                            price={material?.price || 0}
                            count={material?.count || 0}
                            sum={
                              (material?.count || 0) * (material?.price || 0)
                            }
                          />
                        );
                      })}
                    </View>
                  );
                })}
                <EstimateTotal allSum={allSum} materialsSum={materialsSum} />
              </ScrollView>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
