import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';
import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import { PlusIcon } from '@/assets/icons/svg/estimate/PlusIcon';
import ControlledInput from '@/components/inputs/ControlledInput';
import { EstimateTotal } from '@/components/task/EstimateTotal';
import { TaskCardAddEstimateBottomSheet } from '@/components/task/TaskCard/TaskCardAddEstimateBottomSheet';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { getTaskServices } from '@/store/slices/tasks/asyncActions';
import { selectTasks } from '@/store/slices/tasks/selectors';

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
  const dispatch = useAppDispatch();
  const { offerServices, error, loading } = useAppSelector(selectTasks);
  const services = offerServices || [];

  useEffect(() => {
    dispatch(getTaskServices({ taskId: route.params.taskId }));
  }, []);
  useEffect(() => {
    if (error) {
      toast.show({
        type: 'error',
        title: error.message,
        contentHeight: 120,
      });
    }
  }, [error]);

  const [visible, setVisible] = useState(false);

  const onVisible = () => {
    setVisible(!visible);
  };

  const methods = useForm({
    defaultValues: { 123: '' },
    mode: 'onChange',
  });

  if (loading) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
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
