import React, { FC } from 'react';
import { View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { PriceIcon } from '@/assets/icons/svg/estimate/PriceIcon';
import { useAppSelector } from '@/store';
import { Service } from '@/store/api/tasks/types';
import { selectAuth } from '@/store/slices/auth/selectors';
import { RoleType } from '@/types/task';

import { styles } from './styles';

type ServiceItemProps = {
  service: Service;
  showPrice?: boolean;
};
export const ServiceItem: FC<ServiceItemProps> = ({
  service,
  showPrice = true,
}) => {
  const theme = useTheme();
  const isInternalExecutor =
    useAppSelector(selectAuth).user?.roleID === RoleType.INTERNAL_EXECUTOR;

  const measureName = service?.measureName?.toLowerCase();
  const measure = measureName === 'час' ? 'часах' : measureName;
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
        {service?.price && showPrice && !isInternalExecutor ? (
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
              {measure === 'пустое' ? 'Не указано' : `Измеряется в ${measure}`}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
