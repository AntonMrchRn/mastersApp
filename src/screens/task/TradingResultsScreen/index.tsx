import React, { FC, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { StarIcon } from '@/assets/icons/svg/estimate/StarIcon';
import { EstimateTotal } from '@/components/task/EstimateTotal';
import { deviceWidth } from '@/constants/platform';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useGetOffersQuery } from '@/store/api/tasks';
import { Material } from '@/store/api/tasks/types';

import { Item } from './Item';

import { styles } from './styles';

type TradingResultsScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.TradingResults
>;
export const TradingResultsScreen: FC<TradingResultsScreenProps> = ({
  route,
}) => {
  const { taskId, winnerOffer } = route.params;

  const isFocused = useIsFocused();
  const theme = useTheme();

  const offers = useGetOffersQuery(taskId.toString());
  const data = offers.data?.offers || [];

  useEffect(() => {
    if (isFocused) {
      offers.refetch();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={{ flex: 1 }} nestedScrollEnabled>
        <Text variant="title2" style={styles.title}>
          Результаты торгов
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          horizontal
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {data.map((item, index) => {
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
              <View
                key={item.ID}
                style={{
                  flex: 1,
                  paddingVertical: 24,
                  paddingHorizontal: 16,
                  marginLeft: 20,
                  borderRadius: 20,
                  width: deviceWidth - 70,
                  backgroundColor: 'white',
                  borderWidth: 1.5,
                  borderColor: '#F1F1F1',
                }}
              >
                <View style={styles.candidat}>
                  <Text variant="title3">Кандидат {index + 1}</Text>
                  {winnerOffer?.ID === item.ID && (
                    <View
                      style={[
                        styles.winner,
                        { backgroundColor: theme.background.fieldSuccess },
                      ]}
                    >
                      <StarIcon />
                      <Text variant="captionRegular" color={theme.text.success}>
                        Победитель
                      </Text>
                    </View>
                  )}
                </View>
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
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};
