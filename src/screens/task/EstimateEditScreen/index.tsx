import React, { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { PriceIcon } from '@/assets/icons/svg/estimate/PriceIcon';
import ControlledInput from '@/components/inputs/ControlledInput';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import {
  useGetTaskQuery,
  usePatchTaskMutation,
  usePatchTaskServiceMutation,
} from '@/store/api/tasks';
import { Material, Service } from '@/store/api/tasks/types';
import { OutlayStatusType } from '@/types/task';
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

  const serviceId = route.params.serviceId;
  const materialName = route.params.materialName;
  const taskId = route.params.taskId;

  const getTask = useGetTaskQuery(taskId.toString());

  const [patchTask, mutationTask] = usePatchTaskMutation();

  const [patchTaskService, mutationTaskService] = usePatchTaskServiceMutation();

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
  console.log('🚀 ~ file: index.tsx:60 ~ service ~ service:', service);
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
    const newServices = services.reduce<Service[]>((acc, val) => {
      if (val.ID === serviceId) {
        if (materialName) {
          const newMaterial = val.materials?.reduce<Material[]>((ac, va) => {
            if (va.name === materialName) {
              return ac.concat({ ...va, count: +estimateCount });
            }
            return ac.concat(va);
          }, []);
          return acc.concat({ ...val, materials: newMaterial });
        }
        return acc.concat({ ...val, count: +estimateCount });
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
          variant={'text'}
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
