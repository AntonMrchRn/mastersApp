import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { StackScreenProps } from '@react-navigation/stack';
import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import ControlledInput from '@/components/inputs/ControlledInput';
import { ServiceItem } from '@/components/task/ServiceItem';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { usePatchTaskMutation } from '@/store/api/tasks';
import { selectAuth } from '@/store/slices/auth/selectors';
import { Measure } from '@/types/task';

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

  const userRole = useSelector(selectAuth).user?.roleID;

  // const getTask = useGetTaskQuery(taskId.toString());

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

  // const task = getTask?.data && getTask?.data?.tasks && getTask?.data?.tasks[0];
  // const services = task?.services || [];
  const methods = useForm({
    defaultValues: {
      count: '',
    },
    // resolver: yupResolver(estimateAddMaterialValidationSchema),
    mode: 'onChange',
  });
  const {
    formState: { errors },
    watch,
  } = methods;

  const count = watch('count');

  const name = 'name';
  const price = 'price';
  const measure = 'measure';

  const onSubmit = async ({ count }: { count: string }) => {
    if (!userRole) {
      return toast.show({
        type: 'error',
        title: 'Не удалось определить роль пользователя',
        contentHeight: 120,
      });
    }
    // const newServices = [];
    // await patchTask({
    //   //id таски
    //   ID: taskId,
    //   //массив услуг
    //   services: newServices,
    //   //при изменении сметы она снова становится не согласована
    //   outlayStatusID: OutlayStatusType.PENDING,
    // });
    // getTask.refetch();
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  const measures: Measure[] = [
    {
      text: 'Метр (м.)',
      name: 'М',
    },
    {
      text: 'Квадратный метр (кв.м.)',
      name: 'М²',
    },
    {
      text: 'Кубический метр (куб.м.)',
      name: 'М³',
    },
    {
      text: 'Километр (км.)',
      name: 'Км',
    },
    {
      text: 'Погонный метр (п.м.)',
      name: 'М/П',
    },
    {
      text: 'Штука (шт.)',
      name: 'Шт.',
    },
  ];
  return (
    <View style={styles.container}>
      <Text variant={'title3'} style={styles.title} color={theme.text.basic}>
        Заполните данные об услуге
      </Text>
      <Spacer size={'xl'} />
      <ServiceItem />
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
            onPress={methods.handleSubmit(onSubmit)}
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
