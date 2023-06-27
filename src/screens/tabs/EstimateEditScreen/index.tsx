import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { Button, Spacer, Text, useTheme } from 'rn-ui-kit';

import { CubeIcon } from '@/assets/icons/svg/estimate/CubeIcon';
import { PriceIcon } from '@/assets/icons/svg/estimate/PriceIcon';
import ControlledInput from '@/components/inputs/ControlledInput';
import { useGetTaskQuery } from '@/store/api/tasks';
import {
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName,
} from '@/types/navigation';

import { styles } from './styles';

type EstimateEditScreenProps = StackScreenProps<
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName.EstimateEdit
>;

export const EstimateEditScreen: FC<EstimateEditScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();

  const serviceId = route.params.serviceId;
  const materialName = route.params.materialName;
  const taskId = route.params.taskId;

  const getTask = useGetTaskQuery(taskId.toString());

  const task = getTask?.data && getTask?.data?.tasks && getTask?.data?.tasks[0];
  const services = task?.services || [];
  const service = services.find(service => {
    return service.ID === serviceId;
  });
  const material = materialName
    ? service?.materials?.find(materia => materia.name === materialName)
    : undefined;

  const methods = useForm({
    defaultValues: { estimateCount: '' },
    mode: 'onChange',
  });

  const onPress = ({ estimateCount }: { estimateCount: string }) => {
    console.log(
      '🚀 ~ file: index.tsx:50 ~ onPress ~ estimateCount:',
      estimateCount
    );
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
        />
        <Spacer size={'xl'} />
        <Button label={'Сохранить'} onPress={methods.handleSubmit(onPress)} />
      </FormProvider>
    </View>
  );
};
