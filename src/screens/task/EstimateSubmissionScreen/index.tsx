import React, { FC, useEffect, useRef, useState } from 'react';
import { FieldValues, FormProvider, Resolver, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import { PlusIcon } from '@/assets/icons/svg/estimate/PlusIcon';
import ControlledInput from '@/components/inputs/ControlledInput';
import { EstimateTotal } from '@/components/task/EstimateTotal';
import { AddServiceBottomSheet } from '@/components/task/TaskCard/AddServiceBottomSheet';
import { TaskCardAddEstimateBottomSheet } from '@/components/task/TaskCard/TaskCardAddEstimateBottomSheet';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { Material, Service } from '@/store/api/tasks/types';
import { getTaskServices } from '@/store/slices/tasks/asyncActions';
import { selectTasks } from '@/store/slices/tasks/selectors';

import { Item } from './Item';

import { styles } from './styles';

type EstimateSubmissionScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.EstimateSubmission
>;
export const EstimateSubmissionScreen: FC<EstimateSubmissionScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const bsRef = useRef<BottomSheetModal>(null);

  const [estimateModalVisible, setEstimateModalVisible] = useState(false);

  const onEstimateModalVisible = () => {
    setEstimateModalVisible(!estimateModalVisible);
  };
  const addServiceBottomSheetClose = () => {
    bsRef.current?.close();
  };
  const addService = (service: Service) => {
    navigation.navigate(AppScreenName.EstimateAddService, {
      service,
      taskId,
    });
    bsRef.current?.close();
  };

  const { offerServices, error, loading } = useAppSelector(selectTasks);

  const { taskId } = route.params;
  const services = offerServices || [];
  const serviceIDs = services?.reduce<number[]>(
    (acc, val) => acc.concat(val.ID),
    []
  );
  const allSum = services.reduce((acc, val) => {
    if (val.sum) {
      return acc + val.sum;
    }
    return acc;
  }, 0);
  const materials = services.reduce<Material[]>((acc, val) => {
    if (val.materials) {
      return acc.concat(val.materials);
    }
    return acc;
  }, []);
  const materialsSum = materials.reduce((acc, val) => {
    if (val.price && val.count) {
      const sum = val.price * val.count;
      return acc + sum;
    }
    return acc;
  }, 0);

  const getTasks = () => {
    dispatch(getTaskServices({ taskId }));
  };

  useEffect(() => {
    getTasks();
  }, []);
  useEffect(() => {
    if (error) {
      toast.show({
        type: 'error',
        title: error.message,
        contentHeight: 120,
      });
    }
  }, [error]);

  const pressMaterial = () => {
    onEstimateModalVisible();
    navigation.navigate(AppScreenName.NewMaterial, { taskId });
  };
  const pressService = () => {
    onEstimateModalVisible();
    navigation.navigate(AppScreenName.NewMaterial, { taskId });
  };

  const resolver: Resolver<{
    [key: string]: string | undefined;
  }> = async values => {
    const errors = Object.keys(values).reduce((acc, val) => {
      if (!values[val] && val !== 'comment') {
        return {
          ...acc,
          [val]: {
            type: 'required',
            message: 'Для подачи сметы необходимо заполнить все поля',
          },
        };
      }
      return acc;
    }, {});
    return {
      values,
      errors,
    };
  };

  const methods = useForm({
    mode: 'onChange',
    resolver,
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const onSubmit = (fieldValues: FieldValues) => {
    console.log(
      '🚀 ~ file: index.tsx:70 ~ onSubmit ~ fieldValues:',
      fieldValues
    );
  };

  if (loading) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <>
      {isFocused && (
        <AddServiceBottomSheet
          ref={bsRef}
          onCancel={addServiceBottomSheetClose}
          addService={addService}
          serviceIDs={serviceIDs}
        />
      )}
      <TaskCardAddEstimateBottomSheet
        isVisible={estimateModalVisible}
        onCancel={onEstimateModalVisible}
        pressMaterial={pressMaterial}
        pressService={pressService}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <FormProvider {...methods}>
          <ScrollView style={styles.ph20}>
            <Text
              variant="title3"
              color={theme.text.basic}
              style={styles.title}
            >
              Ваше ценовое предложение
            </Text>
            {services.map(service => {
              return (
                <View key={service.name}>
                  <Item
                    name={service.ID.toString()}
                    title={service.name}
                    description={service.description}
                    count={service?.count || 0}
                    sum={service.sum || 0}
                    error={errors?.[service.ID]?.message as string}
                    canDelete={service.canDelete}
                  />
                  {service.materials?.map(material => {
                    return (
                      <Item
                        key={material.name}
                        error={errors?.[material.ID]?.message as string}
                        name={material.ID.toString()}
                        title={material.name}
                        count={material.count}
                        sum={material.count * material.price}
                        canDelete={material.canDelete}
                      />
                    );
                  })}
                </View>
              );
            })}
            <EstimateTotal allSum={allSum} materialsSum={materialsSum} />
            <Spacer size={20} />
            <TouchableOpacity
              style={styles.add}
              onPress={onEstimateModalVisible}
            >
              <PlusIcon fill={theme.icons.basic} />
              <Text variant="bodySBold" color={theme.text.basic}>
                Добавить услугу или материал
              </Text>
            </TouchableOpacity>
            <Spacer size={16} />
            <ControlledInput
              name={'comment'}
              variant={'textarea'}
              label={'Комментарии к ценовому предложению'}
            />
            <Spacer size={40} />
          </ScrollView>
          <View style={styles.ph20}>
            <Button
              label="Подать смету"
              disabled={!isValid}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </FormProvider>
      </SafeAreaView>
    </>
  );
};
