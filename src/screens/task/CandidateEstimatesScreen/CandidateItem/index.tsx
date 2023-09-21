import React from 'react';
import { View } from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Text, useTheme } from 'rn-ui-kit';

import { EstimateTotal } from '@/components/task/EstimateTotal';
import { deviceWidth } from '@/constants/platform';
import { Item } from '@/screens/task/CandidateEstimatesScreen/Item';
import { Material, Offer } from '@/store/api/tasks/types';

import { styles } from './styles';

const CARD_WIDTH = deviceWidth - 20;

type CandidateItemProps = {
  offer: Offer;
  index: number;
  length: number;
  isWinner: boolean;
  scrollX: SharedValue<number>;
};

export const CandidateItem = ({
  offer,
  index,
  length,
  scrollX,
  isWinner,
}: CandidateItemProps) => {
  const theme = useTheme();

  const servicesSum = offer.services.reduce(
    (acc, val) => acc + (val?.count || 0) * (val?.price || 0),
    0
  );
  const allMaterials = offer.services.reduce<Material[]>(
    (acc, val) =>
      acc.concat(typeof val.materials !== 'undefined' ? val.materials : []),
    []
  );
  const materialsSum = allMaterials.reduce(
    (acc, val) => acc + (val?.count || 0) * (val?.price || 0),
    0
  );

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH],
      [0.9, 1, 0.9],
      Extrapolate.EXTEND
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <ShadowedView style={[styles.item, styles.shadow]}>
        <View style={styles.candidate}>
          <Text variant="bodyMBold">
            Участник {index + 1} / {length}
          </Text>
          {isWinner && (
            <View
              style={[
                styles.winner,
                { backgroundColor: theme.background.fieldSuccess },
              ]}
            >
              <Text variant="captionRegular" color={theme.text.success}>
                Победитель
              </Text>
            </View>
          )}
        </View>
        {offer.services.map(service => (
          <View key={service.ID}>
            <Item
              name={service?.name || ''}
              price={service?.price || 0}
              count={service?.count || 0}
              sum={service?.sum || 0}
            />
            {service.materials?.map(material => (
              <Item
                key={material.name}
                name={material?.name || ''}
                price={material?.price || 0}
                count={material?.count || 0}
                sum={(material?.count || 0) * (material?.price || 0)}
              />
            ))}
          </View>
        ))}
        <EstimateTotal servicesSum={servicesSum} materialsSum={materialsSum} />
      </ShadowedView>
    </Animated.View>
  );
};
