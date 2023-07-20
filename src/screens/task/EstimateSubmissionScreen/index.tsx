import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import { PlusIcon } from '@/assets/icons/svg/estimate/PlusIcon';
import ControlledInput from '@/components/inputs/ControlledInput';
import { EstimateTotal } from '@/components/task/EstimateTotal';
import { TaskCardAddEstimateBottomSheet } from '@/components/task/TaskCard/TaskCardAddEstimateBottomSheet';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useGetTaskServiceQuery } from '@/store/api/tasks';
import { AxiosQueryErrorResponse } from '@/types/error';

import { Item } from './Item';

import { styles } from './styles';

type EstimateSubmissionScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.EstimateSubmission
>;
export const EstimateSubmissionScreen: FC<EstimateSubmissionScreenProps> = ({
  route,
}) => {
  const theme = useTheme();
  const toast = useToast();

  const getService = useGetTaskServiceQuery({ taskID: route.params.taskId });

  const [services, setServices] = useState(getService?.data?.services || []);

  useEffect(() => {
    if (getService?.data?.services) {
      setServices(getService?.data?.services);
    }
  }, [getService?.data?.services]);
  useEffect(() => {
    if (getService.isError) {
      toast.show({
        type: 'error',
        title: (getService.error as AxiosQueryErrorResponse).data.message,
        contentHeight: 120,
      });
    }
  }, [getService.isError]);

  const [visible, setVisible] = useState(false);

  const onVisible = () => {
    setVisible(!visible);
  };

  const methods = useForm({
    defaultValues: { 123: '' },
    mode: 'onChange',
  });

  return (
    <>
      <TaskCardAddEstimateBottomSheet
        isVisible={visible}
        onCancel={onVisible}
        pressMaterial={function (): void {
          throw new Error('Function not implemented.');
        }}
        pressService={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <FormProvider {...methods}>
          <ScrollView style={styles.ph20}>
            <Text
              variant="title3"
              color={theme.text.basic}
              style={styles.title}
            >
              Ваше ценовое предложение
            </Text>
            {services.map(service => {
              return (
                <View key={service.name}>
                  <Item
                    title={service.name}
                    description={service.description}
                    count={service?.count || 0}
                    sum={service.sum || 0}
                  />
                  {service.materials?.map(material => {
                    return (
                      <Item
                        key={material.name}
                        title={material.name}
                        description={''}
                        count={material.count}
                        sum={material.count * material.price}
                      />
                    );
                  })}
                </View>
              );
            })}
            <EstimateTotal allSum={0} materialsSum={0} />
            <Spacer size={20} />
            <TouchableOpacity style={styles.add} onPress={onVisible}>
              <PlusIcon fill={theme.icons.basic} />
              <Text variant="bodySBold" color={theme.text.basic}>
                Добавить услугу или материал
              </Text>
            </TouchableOpacity>
            <Spacer size={16} />
            <ControlledInput
              name={'comment'}
              variant={'textarea'}
              label={'Комментарии к ценовому предложению'}
            />
            <Spacer size={40} />
          </ScrollView>
          <View style={styles.ph20}>
            <Button label="Подать смету" disabled={true} />
          </View>
        </FormProvider>
      </SafeAreaView>
    </>
  );
};
