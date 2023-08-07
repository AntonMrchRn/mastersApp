import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import ControlledInput from '@/components/inputs/ControlledInput';
import { MeasureItem } from '@/components/task/MeasureItem';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  useGetTaskQuery,
  usePatchTaskServiceMutation,
  usePostMaterialMutation,
} from '@/store/api/tasks';
import { Material, Service } from '@/store/api/tasks/types';
import { selectAuth } from '@/store/slices/auth/selectors';
import { setNewOfferServices } from '@/store/slices/tasks/actions';
import { selectTasks } from '@/store/slices/tasks/selectors';
import { AxiosQueryErrorResponse } from '@/types/error';
import { Measure } from '@/types/task';
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

  const getTask = useGetTaskQuery(taskId.toString());

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
      getTask.refetch();
    }
  }, [isFocused]);

  const task = getTask?.data && getTask?.data?.tasks && getTask?.data?.tasks[0];
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
    mode: 'onChange',
  });
  const {
    formState: { errors, isValid },
    watch,
  } = methods;

  const name = watch('name');
  const count = watch('count');
  const price = watch('price');
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
      const newMaterial: Material = {
        ID: getRandomUniqNumber(ids),
        count: +count,
        measure: measures.find(m => m.text === measure)?.text || '',
        name,
        price: +price,
        roleID: userRole,
        canDelete: true,
      };
      const newMaterials = materials.concat(newMaterial);
      const newServices = offerServices.reduce<Service[]>((acc, val) => {
        if (val.ID === serviceId) {
          return acc.concat({ ...val, materials: newMaterials });
        }
        return acc.concat(val);
      }, []);
      dispatch(setNewOfferServices(newServices));
      navigation.navigate(
        isEdit
          ? AppScreenName.UserEstimateEdit
          : AppScreenName.EstimateSubmission,
        { taskId }
      );
    } else {
      try {
        await patchTaskService({
          ID: service?.ID,
          taskID: taskId,
          materials: [],
          sum: (service?.sum || 0) + +price * +count,
        }).unwrap();
        await postMaterial({
          serviceID: service?.ID,
          taskID: taskId,
          count: +count,
          measure: measures.find(m => m.text === measure)?.text,
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
      getTask.refetch();
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
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
            hint={
              errors.name?.message ||
              (hasName ? 'Данный материал уже включен в смету' : undefined)
            }
            isError={!!errors.name?.message || hasName}
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
          isPending={mutationMaterial.isLoading}
          disabled={!isValid || hasName}
        />
      </FormProvider>
    </View>
  );
};
