import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import ControlledInput from '@/components/inputs/ControlledInput';
import { MeasureItem } from '@/components/TabScreens/EstimateAddMaterialScreen/MeasureItem';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useGetTaskQuery, usePatchTaskMutation } from '@/store/api/tasks';
import { Service } from '@/store/api/tasks/types';
import { selectAuth } from '@/store/slices/auth/selectors';
import { Measure, OutlayStatusType } from '@/types/task';
import { estimateAddMaterialValidationSchema } from '@/utils/formValidation';

import { styles } from './styles';

type EstimateAddMaterialScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.EstimateAddMaterial
>;

export const EstimateAddMaterialScreen: FC<EstimateAddMaterialScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const toast = useToast();

  const serviceId = route.params.serviceId;
  const taskId = route.params.taskId;

  const userRole = useSelector(selectAuth).user?.roleID;

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
  const materials =
    services.find(serv => serv.ID === serviceId)?.materials || [];
  const materialsNames = materials.reduce<string[]>(
    (acc, val) => acc.concat(val?.name || []),
    []
  );
  const methods = useForm({
    defaultValues: {
      name: '',
      count: '',
      price: '',
      measure: '',
    },
    resolver: yupResolver(estimateAddMaterialValidationSchema),
    mode: 'onChange',
  });
  const {
    formState: { errors },
    watch,
  } = methods;

  const name = watch('name');
  const count = watch('count');
  const price = watch('price');
  const measure = watch('measure');

  const onSubmit = async ({
    name,
    count,
    price,
  }: {
    name: string;
    count: string;
    price: string;
  }) => {
    if (!userRole) {
      return toast.show({
        type: 'error',
        title: 'Не удалось определить роль пользователя',
        contentHeight: 120,
      });
    }
    if (materialsNames.includes(name)) {
      return toast.show({
        type: 'error',
        title: 'Имя материала не должно совпадать с имеющимся в услуге',
        contentHeight: 120,
      });
    }
    const newServices = services.reduce<Service[]>((acc, val) => {
      if (val.ID === serviceId) {
        const materials = val?.materials || [];
        const newMaterials = materials.concat({
          count: +count,
          measure: 'string',
          name: name,
          price: +price,
          roleID: userRole,
        });
        return acc.concat({ ...val, materials: newMaterials });
      }
      return acc.concat(val);
    }, []);
    await patchTask({
      //id таски
      ID: taskId,
      //массив услуг
      services: newServices,
      //при изменении сметы она снова становится не согласована
      outlayStatusID: OutlayStatusType.PENDING,
    });
    getTask.refetch();
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
        Заполните данные о материале
      </Text>
      <Spacer size={'xl'} />
      <FormProvider {...methods}>
        <View style={styles.inputs}>
          <ControlledInput
            name={'name'}
            label={name ? 'Наименование' : undefined}
            placeholder={'Наименование'}
            variant={'text'}
            hint={errors.name?.message}
            isError={!!errors.name?.message}
          />
          <ControlledInput
            name={'count'}
            label={count ? 'Количество' : undefined}
            placeholder={'Количество'}
            variant={'text'}
            hint={errors.count?.message}
            isError={!!errors.count?.message}
            keyboardType="numeric"
          />
          <ControlledInput
            name={'price'}
            label={price ? 'Цена' : undefined}
            placeholder={'Цена'}
            variant={'text'}
            keyboardType="numeric"
            hint={
              errors.price?.message ||
              'Указывается в рублях за одну единицу измерения'
            }
            isError={!!errors.price?.message}
          />
        </View>
        <MeasureItem
          measure={measure}
          measures={measures}
          error={errors.measure?.message}
        />
        <Spacer size={'xl'} />
        <Button
          label={'Добавить'}
          onPress={methods.handleSubmit(onSubmit)}
          style={styles.button}
        />
      </FormProvider>
    </View>
  );
};
