import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import ControlledInput from '@/components/inputs/ControlledInput';
import ControlledPriceInput from '@/components/inputs/ControlledPriceInput';
import { MeasureItem } from '@/components/task/MeasureItem';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  useGetMeasuresQuery,
  useGetTaskQuery,
  usePatchTaskServiceMutation,
  usePostMaterialMutation,
} from '@/store/api/tasks';
import { Material, Service } from '@/store/api/tasks/types';
import { selectAuth } from '@/store/slices/auth/selectors';
import { setNewOfferServices } from '@/store/slices/tasks/actions';
import { selectTasks } from '@/store/slices/tasks/selectors';
import { AxiosQueryErrorResponse } from '@/types/error';
import { estimateAddMaterialValidationSchema } from '@/utils/formValidation';
import { getRandomUniqNumber } from '@/utils/getRandomUniqNumber';

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
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const { serviceId, taskId, fromEstimateSubmission, isEdit } = route.params;

  const userRole = useAppSelector(selectAuth).user?.roleID;
  const { offerServices } = useAppSelector(selectTasks);

  const { data, refetch } = useGetTaskQuery(taskId);
  const getMeasures = useGetMeasuresQuery('material');

  const [postMaterial, mutationMaterial] = usePostMaterialMutation();
  const [patchTaskService] = usePatchTaskServiceMutation();

  useEffect(() => {
    if (mutationMaterial.error && 'data' in mutationMaterial.error) {
      toast.show({
        type: 'error',
        title: mutationMaterial?.error?.data?.message,
      });
    }
  }, [mutationMaterial.error]);
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const task = data?.tasks && data?.tasks[0];
  const services = fromEstimateSubmission
    ? offerServices
    : task?.services || [];
  const service = services.find(serv => serv.ID === serviceId);
  const materials = service?.materials || [];
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
    mode: 'onSubmit',
  });
  const {
    formState: { errors },
    watch,
  } = methods;

  const name = watch('name');
  const measure = watch('measure');

  const hasName = materialsNames.includes(name);
  const onSubmit = async ({
    name,
    count,
    price,
    measure,
  }: {
    name: string;
    count: string;
    price: string;
    measure: string;
  }) => {
    if (!userRole) {
      return toast.show({
        type: 'error',
        title: 'Не удалось определить роль пользователя',
      });
    }
    if (fromEstimateSubmission) {
      const ids = materials.reduce<number[]>((acc, val) => {
        if (val?.ID) {
          return acc.concat(val.ID);
        }
        return acc;
      }, []);
      const newMeasure =
        measures.find(m => m.description === measure)?.name || '';
      const newMaterial: Material = {
        ID: getRandomUniqNumber(ids),
        count: +count,
        measure: newMeasure,
        localPrice: price,
        localCount: count,
        canDelete: true,
        name,
        price: +price,
        roleID: userRole,
      };
      const newMaterials = materials.concat(newMaterial);
      const newServices = offerServices.reduce<Service[]>((acc, val) => {
        if (val.ID === serviceId) {
          return acc.concat({ ...val, materials: newMaterials });
        }
        return acc.concat(val);
      }, []);
      dispatch(setNewOfferServices(newServices));
      navigation.navigate(AppScreenName.EstimateSubmission, { taskId, isEdit });
    } else {
      try {
        const newSum = ((service?.sum || 0) + +price * +count)
          .toString()
          .includes('.')
          ? Number(((service?.sum || 0) + +price * +count).toFixed(2))
          : (service?.sum || 0) + +price * +count;
        await patchTaskService({
          ID: service?.ID,
          taskID: taskId,
          materials: [],
          sum: newSum,
        }).unwrap();
        await postMaterial({
          serviceID: service?.ID,
          taskID: taskId,
          count: +count,
          measure: measures.find(m => m.description === measure)?.name,
          name,
          price: +price,
          roleID: userRole,
        });
      } catch (error) {
        toast.show({
          type: 'error',
          title: (error as AxiosQueryErrorResponse).data.message,
        });
      }
      await refetch();
      navigation.navigate(AppScreenName.TaskCard, { taskId });
    }
  };

  const measures = getMeasures.data?.measures || [];
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
            placeholder={'Наименование'}
            variant={'text'}
            maxLength={50}
            hint={
              errors.name?.message ||
              (hasName ? 'Данный материал уже включен в смету' : undefined)
            }
            isError={!!errors.name?.message || hasName}
          />
          <ControlledInput
            name={'count'}
            label={'Количество'}
            placeholder={'Количество'}
            variant={'number'}
            hint={errors.count?.message}
            isError={!!errors.count?.message}
            maxLength={5}
          />
          <ControlledPriceInput
            name={'price'}
            label={'Цена'}
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
          isPending={mutationMaterial.isLoading}
          disabled={hasName}
        />
      </FormProvider>
    </View>
  );
};
