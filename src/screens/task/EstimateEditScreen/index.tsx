import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { PriceIcon } from '@/assets/icons/svg/estimate/PriceIcon';
import ControlledInput from '@/components/inputs/ControlledInput';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppSelector } from '@/store';
import {
  useGetTaskQuery,
  usePatchMaterialMutation,
  usePatchTaskServiceMutation,
} from '@/store/api/tasks';
import { selectAuth } from '@/store/slices/auth/selectors';
import { AxiosQueryErrorResponse } from '@/types/error';
import { estimateCountValidationSchema } from '@/utils/formValidation';

import { styles } from './styles';

type EstimateEditScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.EstimateEdit
>;

export const EstimateEditScreen: FC<EstimateEditScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const toast = useToast();
  const isFocused = useIsFocused();

  const { taskId, serviceId, materialName } = route.params;

  const { data, refetch } = useGetTaskQuery(taskId);

  const [patchTaskService, mutationTaskService] = usePatchTaskServiceMutation();
  const [patchMaterial, mutationMaterial] = usePatchMaterialMutation();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);
  useEffect(() => {
    if (mutationTaskService.error && 'data' in mutationTaskService.error) {
      toast.show({
        type: 'error',
        title: mutationTaskService?.error?.data?.message,
      });
    }
  }, [mutationTaskService.error]);
  useEffect(() => {
    if (mutationMaterial.error && 'data' in mutationMaterial.error) {
      toast.show({
        type: 'error',
        title: mutationMaterial?.error?.data?.message,
      });
    }
  }, [mutationMaterial.error]);

  const task = data?.tasks?.[0];
  const services = task?.services || [];
  const service = services.find(service => {
    return service.ID === serviceId;
  });

  const material = materialName
    ? service?.materials?.find(materia => materia.name === materialName)
    : undefined;
  const userRole = useAppSelector(selectAuth).user?.roleID;
  const name = materialName ? material?.name : service?.name;
  const description = materialName ? '' : service?.description;
  const price = materialName ? material?.price : service?.price;
  const measure = materialName
    ? material?.measure?.split('(')?.[1]?.slice(0, -1)
    : service?.measure?.toLowerCase();
  const currMeasure = measure === 'час' ? 'часах' : measure;
  const methods = useForm({
    defaultValues: { estimateCount: '' },
    resolver: yupResolver(estimateCountValidationSchema),
    mode: 'onSubmit',
  });
  const {
    formState: { errors },
  } = methods;
  const onSubmit = async ({ estimateCount }: { estimateCount: string }) => {
    if (!materialName) {
      //для услуги
      //кинуть только то что меняем и новую сумму (от старой суммы отнимаем сумму чистой услуги и добавляем новую сумму чистой услуги)
      const newSum =
        (service?.sum || 0) -
        (service?.count || 1) * (service?.price || 0) +
        +estimateCount * (service?.price || 0);
      await patchTaskService({
        ID: serviceId,
        count: +estimateCount,
        sum: newSum,
        taskID: taskId,
        materials: [],
        roleID: userRole,
      });
    } else {
      //для материалов patch materials
      // перед прокидыванием материала необходимо прокинуть новую сумму в patchTaskService({sum: }) а уже после этого patch materials
      const newSum =
        (service?.sum || 0) -
        (material?.count || 0) * (material?.price || 0) +
        +estimateCount * (material?.price || 0);
      try {
        await patchTaskService({
          ID: serviceId,
          taskID: taskId,
          materials: [],
          sum: newSum,
        }).unwrap();
        await patchMaterial({
          ID: material?.ID,
          taskID: taskId,
          count: +estimateCount,
          roleID: userRole,
        });
      } catch (error) {
        toast.show({
          type: 'error',
          title: (error as AxiosQueryErrorResponse).data.message,
        });
      }
    }

    refetch();
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <Text variant={'title3'} style={styles.title} color={theme.text.basic}>
        Внесите необходимые изменения
      </Text>
      {!!service?.categoryName && (
        <Text variant={'captionRegular'} color={theme.text.neutral}>
          {service?.categoryName}
        </Text>
      )}
      {!!name && (
        <Text
          variant={'bodyMBold'}
          color={theme.text.basic}
          style={styles.name}
        >
          {name}
        </Text>
      )}
      {!!description && (
        <Text
          variant={'bodySRegular'}
          color={theme.text.basic}
          style={styles.description}
        >
          {description}
        </Text>
      )}
      {!!price && (
        <View style={styles.row}>
          <PriceIcon />
          <Text
            variant={'bodySRegular'}
            color={theme.text.neutral}
            style={styles.rowText}
          >
            {`${price} ₽ ${
              measure === 'пустое' || !measure ? '' : `за ${measure}`
            }`}
          </Text>
        </View>
      )}
      <View style={styles.row}>
        <CubeIcon />
        <Text
          variant={'bodySRegular'}
          color={theme.text.neutral}
          style={styles.rowText}
        >
          {measure === 'пустое' || !measure
            ? 'Единица измерения не указана'
            : `Измеряется в ${currMeasure}`}
        </Text>
      </View>
      <Spacer size={'l'} />
      <FormProvider {...methods}>
        <ControlledInput
          name={'estimateCount'}
          variant={'number'}
          label={'Количество'}
          maxLength={5}
          hint={errors.estimateCount?.message}
          isError={!!errors.estimateCount?.message}
        />
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
