import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import PreviewNotFound, {
  PreviewNotFoundType,
} from '@/components/tabs/TaskSearch/PreviewNotFound';
import { ServiceItem } from '@/components/task/ServiceItem';
import { GetServicesResponse, Service } from '@/store/api/tasks/types';

import { styles } from './styles';
type SearchContainerProps = {
  data: GetServicesResponse | undefined;
  loader: boolean;
  addService: (service: Service) => void;
};
export const SearchContainer: FC<SearchContainerProps> = ({
  data,
  loader,
  addService,
}) => {
  const theme = useTheme();
  if (loader) {
    return (
      <View style={[styles.center]}>
        <ActivityIndicator size={'large'} color={theme.background.accent} />
      </View>
    );
  }
  if (!data?.services?.length) {
    return (
      <View style={{ marginTop: '33%' }}>
        <PreviewNotFound type={PreviewNotFoundType.ServiceNotFound} />
      </View>
    );
  }
  return (
    <View>
      <Text variant={'title3'} color={theme.text.basic}>
        Результаты поиска
      </Text>
      <Text
        variant={'bodySRegular'}
        color={theme.text.neutral}
        style={styles.mv8}
      >
        Найдено {data?.count || 0} совпадений
      </Text>
      {data?.services.map(service => {
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
    </View>
  );
};
