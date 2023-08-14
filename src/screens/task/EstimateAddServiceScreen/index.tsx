import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import ControlledInput from '@/components/inputs/ControlledInput';
import { ServiceItem } from '@/components/task/ServiceItem';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetTaskQuery, usePostTaskServiceMutation } from '@/store/api/tasks';
import { selectAuth } from '@/store/slices/auth/selectors';
import { addOfferService } from '@/store/slices/tasks/actions';
import { selectTasks } from '@/store/slices/tasks/selectors';
import { estimateAddServiceValidationSchema } from '@/utils/formValidation';
import { getRandomUniqNumber } from '@/utils/getRandomUniqNumber';

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
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const userRole = useAppSelector(selectAuth).user?.roleID;
  const { offerServices } = useAppSelector(selectTasks);

  const { taskId, service, fromEstimateSubmission } = route.params;

  const ids = offerServices.reduce<number[]>((acc, val) => {
    if (val?.ID) {
      return acc.concat(val.ID);
    }
    return acc;
  }, []);
  const ID = service?.ID || getRandomUniqNumber(ids);

  const getTask = useGetTaskQuery(taskId.toString());

  const [postTask, mutationTask] = usePostTaskServiceMutation();

  useEffect(() => {
    if (mutationTask.error && 'data' in mutationTask.error) {
      toast.show({
        type: 'error',
        title: mutationTask?.error?.data?.message,
      });
    }
  }, [mutationTask.error]);
  useEffect(() => {
    if (isFocused) {
      getTask.refetch();
    }
  }, [isFocused]);

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
      });
    }
    if (fromEstimateSubmission) {
      dispatch(
        addOfferService({
          ...service,
          ID,
          count: +count,
          sum: +count * service.price,
          roleID: userRole,
          materials: [],
          canDelete: true,
        })
      );
    } else {
      await postTask({
        categoryID: service.categoryID,
        categoryName: service.categoryName,
        description: service.description,
        measureID: service.measureID,
        measureName: service.measureName,
        name: service.name,
        price: service.price,
        setID: service.setID,
        serviceID: service.ID,
        count: +count,
        sum: +count * service.price,
        roleID: userRole,
        taskID: taskId,
        materials: [],
      });
      getTask.refetch();
    }
    goBack();
  };
  return (
    <View style={styles.container}>
      <Text variant={'title3'} style={styles.title} color={theme.text.basic}>
        Заполните данные об услуге
      </Text>
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
