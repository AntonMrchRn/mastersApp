import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import ControlledInput from '@/components/inputs/ControlledInput';
import { useGetTaskQuery, usePatchTaskMutation } from '@/store/api/tasks';
import {
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName,
} from '@/types/navigation';
import { estimateAddMaterialValidationSchema } from '@/utils/formValidation';

import { styles } from './styles';

type EstimateAddMaterialScreenProps = StackScreenProps<
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName.EstimateAddMaterial
>;

export const EstimateAddMaterialScreen: FC<EstimateAddMaterialScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const toast = useToast();

  const serviceId = route.params.serviceId;
  const taskId = route.params.taskId;

  const getTask = useGetTaskQuery(taskId.toString());

  const [patchTask, mutationTask] = usePatchTaskMutation();

  useEffect(() => {
    if (mutationTask.error && 'data' in mutationTask.error) {
      toast.show({
        type: 'error',
        title: mutationTask?.error?.data?.message,
        contentHeight: 120,
      });
    }
  }, [mutationTask.error]);

  const task = getTask?.data && getTask?.data?.tasks && getTask?.data?.tasks[0];
  const services = task?.services || [];
  const service = services.find(service => {
    return service.ID === serviceId;
  });

  const methods = useForm({
    defaultValues: {
      name: '',
      count: '',
      price: '',
    },
    resolver: yupResolver(estimateAddMaterialValidationSchema),
    mode: 'onChange',
  });
  const {
    formState: { errors },
  } = methods;
  const onSubmit = async ({
    name,
    count,
    price,
  }: {
    name: string;
    count: string;
    price: string;
  }) => {
    //
  };
  return (
    <View style={styles.container}>
      <Text variant={'title3'} style={styles.title} color={theme.text.basic}>
        Заполните данные о материале
      </Text>
      <Spacer size={'xl'} />
      <FormProvider {...methods}>
        <View style={styles.inputs}>
          <ControlledInput
            name={'name'}
            label={'Наименование'}
            variant={'text'}
            hint={errors.name?.message}
            isError={!!errors.name?.message}
          />
          <ControlledInput
            name={'count'}
            label={'Количество'}
            variant={'text'}
            hint={errors.count?.message}
            isError={!!errors.count?.message}
          />
          <ControlledInput
            name={'price'}
            label={'Цена'}
            variant={'text'}
            hint={
              errors.price?.message ||
              'Указывается в рублях за одну единицу измерения'
            }
            isError={!!errors.price?.message}
          />
        </View>
        <Spacer size={'xl'} />
        <Button
          label={'Сохранить'}
          onPress={methods.handleSubmit(onSubmit)}
          style={styles.button}
        />
      </FormProvider>
    </View>
  );
};
