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
import {
  useGetTaskQuery,
  usePatchMaterialMutation,
  usePatchTaskServiceMutation,
} from '@/store/api/tasks';
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

  const getTask = useGetTaskQuery(taskId.toString());

  const [patchTaskService, mutationTaskService] = usePatchTaskServiceMutation();
  const [patchMaterial, mutationMaterial] = usePatchMaterialMutation();

  useEffect(() => {
    if (isFocused) {
      getTask.refetch();
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

  const task = getTask?.data?.tasks?.[0];
  const services = task?.services || [];
  const service = services.find(service => {
    return service.ID === serviceId;
  });

  const material = materialName
    ? service?.materials?.find(materia => materia.name === materialName)
    : undefined;

  const methods = useForm({
    defaultValues: { estimateCount: '' },
    resolver: yupResolver(estimateCountValidationSchema),
    mode: 'onChange',
  });
  const {
    formState: { errors },
  } = methods;
  const onSubmit = async ({ estimateCount }: { estimateCount: string }) => {
    if (!materialName) {
      //для услуги
      //кинуть только то что меняем
      await patchTaskService({
        ID: serviceId,
        count: +estimateCount,
        taskID: taskId,
        materials: [],
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
        });
      } catch (error) {
        toast.show({
          type: 'error',
          title: (error as AxiosQueryErrorResponse).data.message,
        });
      }
    }

    getTask.refetch();
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <Text variant={'title3'} style={styles.title} color={theme.text.basic}>
        Внесите необходимые изменения
      </Text>
      {service?.categoryName && (
        <Text variant={'captionRegular'} color={theme.text.neutral}>
          {service?.categoryName}
        </Text>
      )}
      {service?.name && (
        <Text
          variant={'bodyMBold'}
          color={theme.text.basic}
          style={styles.name}
        >
          {service?.name}
        </Text>
      )}
      {service?.description && (
        <Text
          variant={'bodySRegular'}
          color={theme.text.basic}
          style={styles.description}
        >
          {service?.description}
        </Text>
      )}
      <View style={styles.row}>
        <PriceIcon />
        <Text
          variant={'bodySRegular'}
          color={theme.text.neutral}
          style={styles.rowText}
        >
          {`${service?.price} ₽ за шт.`}
        </Text>
      </View>
      <View style={styles.row}>
        <CubeIcon />
        <Text
          variant={'bodySRegular'}
          color={theme.text.neutral}
          style={styles.rowText}
        >
          {`Измеряется в ${
            materialName ? material?.measure?.toLowerCase() : 'шт.'
          }`}
        </Text>
      </View>
      <Spacer size={'l'} />
      <FormProvider {...methods}>
        <ControlledInput
          name={'estimateCount'}
          variant={'number'}
          label={'Количество'}
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
