import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { PriceIcon } from '@/assets/icons/svg/estimate/PriceIcon';
import { Service } from '@/store/api/tasks/types';

type ServiceItemProps = {
  service: Service;
};
export const ServiceItem: FC<ServiceItemProps> = ({ service }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    ml4: {
      marginLeft: 4,
    },
    rowDirection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    itemTitle: {
      marginVertical: 8,
    },
    items: {
      gap: 4,
    },
  });

  return (
    <View>
      <Spacer size={'l'} />
      {service?.categoryName && (
        <View>
          <Text variant={'captionRegular'} color={theme.text.neutral}>
            {service?.categoryName}
          </Text>
        </View>
      )}
      {service?.name && (
        <View>
          <Text
            variant={'bodyMBold'}
            color={theme.text.basic}
            style={styles.itemTitle}
          >
            {service?.name}
          </Text>
        </View>
      )}
      {service?.description && (
        <View>
          <Text variant={'bodySRegular'} color={theme.text.basic}>
            {service?.description}
          </Text>
        </View>
      )}
      <View style={styles.items}>
        {service?.price ? (
          <View style={styles.rowDirection}>
            <PriceIcon />
            <Text
              variant={'bodySRegular'}
              color={theme.text.neutral}
              style={styles.ml4}
            >
              {service?.price} ₽
            </Text>
          </View>
        ) : (
          <></>
        )}
        {service?.measureName && (
          <View style={styles.rowDirection}>
            <CubeIcon />
            <Text
              variant={'bodySRegular'}
              color={theme.text.neutral}
              style={styles.ml4}
            >
              Измеряется в {service?.measureName?.toLowerCase()}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
