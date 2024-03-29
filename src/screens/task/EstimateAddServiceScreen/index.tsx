import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import { yupResolver } from '@hookform/resolvers/yup';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import ControlledInput from '@/components/inputs/ControlledInput';
import ControlledPriceInput from '@/components/inputs/ControlledPriceInput';
import { ServiceItem } from '@/components/task/ServiceItem';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetTaskQuery, usePostTaskServiceMutation } from '@/store/api/tasks';
import { selectAuth } from '@/store/slices/auth/selectors';
import { addOfferService } from '@/store/slices/tasks/actions';
import { selectTasks } from '@/store/slices/tasks/selectors';
import { EstimateServiceAdditionFormValues } from '@/types/form';
import { TaskType } from '@/types/task';
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

  const [loading, setLoading] = useState(false);

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

  const { refetch, data } = useGetTaskQuery(taskId);
  const isItLots = data?.tasks[0]?.subsetID === TaskType.IT_AUCTION_SALE;
  const [postTask, mutationTask] = usePostTaskServiceMutation();

  useEffect(() => {
    if (mutationTask.error && 'data' in mutationTask.error) {
      toast.show({
        type: 'error',
        title: mutationTask?.error?.data?.message,
      });
      setLoading(false);
    }
  }, [mutationTask.error]);
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const methods = useForm<EstimateServiceAdditionFormValues>({
    defaultValues: {
      count: '',
      ...(isItLots && { price: '' }),
    },
    resolver: yupResolver<
      | EstimateServiceAdditionFormValues
      | Omit<EstimateServiceAdditionFormValues, 'price'>
    >(estimateAddServiceValidationSchema(isItLots)),
    mode: 'onSubmit',
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

  const onSubmit = async ({
    count,
    price,
  }: {
    count: string;
    price?: string;
  }) => {
    if (!userRole) {
      return toast.show({
        type: 'error',
        title: 'Не удалось определить роль пользователя',
      });
    }
    setLoading(true);
    if (fromEstimateSubmission) {
      dispatch(
        addOfferService({
          ...service,
          ID,
          count: +count,
          sum: isItLots && price ? +count * +price : +count * service.price,
          localPrice: isItLots ? price : service.price.toString(),
          localCount: count,
          measure: service.measureName,
          canDelete: true,
          roleID: userRole,
          materials: [],
        }),
      );
    } else {
      await postTask({
        categoryID: service.categoryID,
        categoryName: service.categoryName,
        description: service.description,
        measureID: service.measureID,
        measureName: service.measureName,
        name: service.name,
        price: isItLots && price ? +price : service.price,
        setID: service.setID,
        serviceID: service.ID,
        count: +count,
        sum: isItLots && price ? +count * +price : +count * service.price,
        roleID: userRole,
        taskID: taskId,
        materials: [],
      });
      await refetch();
    }
    goBack();
  };
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
      >
        <Text variant={'title3'} style={styles.title} color={theme.text.basic}>
          Заполните данные об услуге
        </Text>
        <ServiceItem service={service} showPrice={!isItLots} />
        <FormProvider {...methods}>
          <View style={styles.input}>
            <ControlledInput
              name={'count'}
              label={count ? 'Количество' : undefined}
              placeholder={'Количество'}
              variant={'number'}
              hint={errors.count?.message}
              isError={!!errors.count?.message}
              maxLength={5}
            />
            {isItLots && (
              <>
                <Spacer size="l" />
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
                <Spacer
                  size="l"
                  separator="bottom"
                  separatorColor={theme.background.neutralDisableSecond}
                />
              </>
            )}
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
              isPending={loading}
              disabled={loading}
            />
          </View>
        </FormProvider>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
