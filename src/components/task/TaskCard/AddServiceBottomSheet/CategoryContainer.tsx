import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Button, Chips, Spacer, useTheme } from 'rn-ui-kit';

import { useGetServicesByCategoriesQuery } from '@/store/api/tasks';
import { Service, ServicesCategory } from '@/store/api/tasks/types';

import { ServiceItem } from '../../ServiceItem';

import { styles } from './styles';

type CategoryContainerProps = {
  chipses: ServicesCategory[];
  setChipses: React.Dispatch<React.SetStateAction<ServicesCategory[]>>;
  addService: (service: Service) => void;
};
export const CategoryContainer: FC<CategoryContainerProps> = ({
  chipses,
  setChipses,
  addService,
}) => {
  const theme = useTheme();
  const serviceIDs = chipses
    .reduce<number[]>((acc, val) => acc.concat(val.ID), [])
    .join(',');
  const services = useGetServicesByCategoriesQuery(serviceIDs);
  return (
    <View>
      <View style={styles.chipses}>
        {chipses.map(chips => {
          const closeIconPress = () => {
            setChipses(chipses.filter(chip => chip !== chips));
          };
          return (
            <Chips
              key={chips.ID}
              label={chips.name}
              selected
              close
              closeIconPress={closeIconPress}
            />
          );
        })}
      </View>
      {services.isLoading && services.isFetching ? (
        <View style={styles.center}>
          <ActivityIndicator size={'large'} color={theme.background.accent} />
        </View>
      ) : (
        <>
          {services?.data?.services?.map(service => {
            const onPress = () => {
              addService(service);
            };
            return (
              <View key={service.ID}>
                <ServiceItem service={service} />
                <Button
                  label={'Добавить'}
                  size={'S'}
                  style={styles.itemButton}
                  onPress={onPress}
                />
                <Spacer size={15} separator="bottom" />
              </View>
            );
          })}
        </>
      )}
    </View>
  );
};
