import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import ControlledInput from '@/components/inputs/ControlledInput';
import { ServiceItem } from '@/components/task/ServiceItem';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppSelector } from '@/store';
import { useGetTaskQuery, usePatchTaskMutation } from '@/store/api/tasks';
import { selectAuth } from '@/store/slices/auth/selectors';
import { OutlayStatusType } from '@/types/task';
import { estimateAddServiceValidationSchema } from '@/utils/formValidation';

import { styles } from './styles';

type EstimateAddServiceScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.EstimateAddService
>;

export const EstimateAddServiceScreen: FC<EstimateAddServiceScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const toast = useToast();

  const userRole = useAppSelector(selectAuth).user?.roleID;

  const taskId = route.params.taskId;
  const service = route.params.service;

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
  const methods = useForm({
    defaultValues: {
      count: '',
    },
    resolver: yupResolver(estimateAddServiceValidationSchema),
    mode: 'onChange',
  });
  const {
    formState: { errors },
    watch,
  } = methods;

  const count = watch('count');

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const onSubmit = async ({ count }: { count: string }) => {
    if (!userRole) {
      return toast.show({
        type: 'error',
        title: 'Не удалось определить роль пользователя',
        contentHeight: 120,
      });
    }
    const newServices = services.concat({
      ...service,
      count: +count,
      sum: +count * service.price,
      roleID: userRole,
    });
    await patchTask({
      //id таски
      ID: taskId,
      //массив услуг
      services: newServices,
      //при изменении сметы она снова становится не согласована
      outlayStatusID: OutlayStatusType.PENDING,
    });
    getTask.refetch();
    goBack();
  };
  return (
    <View style={styles.container}>
      <Text variant={'title3'} style={styles.title} color={theme.text.basic}>
        Заполните данные об услуге
      </Text>
      <Spacer size={'xl'} />
      <ServiceItem service={service} />
      <FormProvider {...methods}>
        <View style={styles.input}>
          <ControlledInput
            name={'count'}
            label={count ? 'Количество' : undefined}
            placeholder={'Количество'}
            variant={'text'}
            hint={errors.count?.message}
            isError={!!errors.count?.message}
            keyboardType="numeric"
          />
        </View>
        <Spacer size={'xl'} />
        <View style={styles.row}>
          <Button
            label={'Отменить'}
            onPress={goBack}
            variant={'outlineAccent'}
            style={styles.button}
          />
          <Button
            label={'Добавить'}
            onPress={methods.handleSubmit(onSubmit)}
            style={styles.button}
          />
        </View>
      </FormProvider>
    </View>
  );
};
