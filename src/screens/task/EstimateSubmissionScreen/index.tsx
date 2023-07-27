import React, { FC, useEffect, useRef, useState } from 'react';
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
import {
  Banner,
  Button,
  Input,
  Spacer,
  Text,
  useTheme,
  useToast,
} from 'rn-ui-kit';

import { PlusIcon } from '@/assets/icons/svg/estimate/PlusIcon';
import { DeleteEstimateModal } from '@/components/task/DeleteEstimateModal';
import { EstimateTotal } from '@/components/task/EstimateTotal';
import { AddServiceBottomSheet } from '@/components/task/TaskCard/AddServiceBottomSheet';
import { TaskCardAddEstimateBottomSheet } from '@/components/task/TaskCard/TaskCardAddEstimateBottomSheet';
import { deviceWidth } from '@/constants/platform';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  useGetTaskQuery,
  usePatchTaskLotMutation,
  usePostOffersMutation,
} from '@/store/api/tasks';
import { Material, Service } from '@/store/api/tasks/types';
import { selectAuth } from '@/store/slices/auth/selectors';
import {
  addMaterialLocalSum,
  addServiceLocalSum,
  setNewOfferServices,
} from '@/store/slices/tasks/actions';
import { getTaskServices } from '@/store/slices/tasks/asyncActions';
import { selectTasks } from '@/store/slices/tasks/selectors';
import { AxiosQueryErrorResponse } from '@/types/error';

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
  const { taskId } = route.params;

  const bsRef = useRef<BottomSheetModal>(null);

  const [patchTaskLot] = usePatchTaskLotMutation();
  const [postOffers] = usePostOffersMutation();

  const getTaskQuery = useGetTaskQuery(taskId.toString());

  const task = getTaskQuery?.data?.tasks?.[0];

  const allowCostIncrease = task?.allowCostIncrease;
  const currentSum = task?.currentSum;

  const costStep = task?.costStep;

  const [serviceForDelete, setServiceForDelete] = useState<Service>();
  const [banner, setBanner] = useState<{ title: string; text: string }>();
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [comment, setComment] = useState('');
  const [estimateModalVisible, setEstimateModalVisible] = useState(false);
  const [deleteEstimateModalVisible, setDeleteEstimateModalVisible] =
    useState(false);

  const onEstimateModalVisible = () => {
    setEstimateModalVisible(!estimateModalVisible);
  };
  const onClosePress = () => {
    setBanner(undefined);
  };
  const onDeleteEstimateModalVisible = () => {
    setDeleteEstimateModalVisible(!deleteEstimateModalVisible);
  };
  const onCancelDeleteService = () => {
    setServiceForDelete(undefined);
    setDeleteEstimateModalVisible(!deleteEstimateModalVisible);
  };
  const addServiceBottomSheetClose = () => {
    bsRef.current?.close();
  };
  const addService = (service: Service) => {
    navigation.navigate(AppScreenName.EstimateAddService, {
      service,
      taskId,
      fromEstimateSubmission: true,
    });
    bsRef.current?.close();
  };

  const { offerServices, error, loading } = useAppSelector(selectTasks);
  const userRole = useAppSelector(selectAuth).user?.roleID;
  const services = offerServices || [];
  console.log('🚀 ~ file: index.tsx:115 ~ services:', services);
  const serviceIDs = services?.reduce<number[]>((acc, val) => {
    if (val.ID) {
      acc.concat(val.ID);
    }
    return acc;
  }, []);
  const allSum = services.reduce((acc, val) => {
    const mSums =
      val?.materials?.reduce((mAcc, mVal) => {
        const mSum = +(mVal.localSum || 0);
        return mAcc + mSum;
      }, 0) || 0;
    const sum = +(val.localSum || 0) + mSums;
    return acc + sum;
  }, 0);

  const materials = services.reduce<Material[]>((acc, val) => {
    if (val.materials) {
      return acc.concat(val.materials);
    }
    return acc;
  }, []);
  const materialsSum = materials.reduce((acc, val) => {
    if (val.localSum) {
      return acc + +val.localSum;
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
      });
    }
  }, [error]);

  const pressMaterial = () => {
    onEstimateModalVisible();
    navigation.navigate(AppScreenName.NewMaterial, { taskId });
  };
  const pressService = () => {
    onEstimateModalVisible();
    setTimeout(() => {
      bsRef.current?.present();
    }, 500);
  };

  const fields = services.reduce((acc, val) => {
    const mFields = val?.materials?.reduce((mAcc, mVal) => {
      return { ...mAcc, [mVal.ID as number]: !mVal.localSum };
    }, {});
    return { ...acc, [val.ID as number]: !val.localSum, ...mFields };
  }, {});

  const isError = Object.values(fields).some(field => field === true);

  const onSubmit = async () => {
    //если есть ошибка валидации
    if (isError) {
      return setErrors(fields);
    }
    //если нельзя подать смету ценой выше поданной ранее
    if (allowCostIncrease && currentSum && allSum > currentSum) {
      //ошибка
      return setBanner({
        title: 'Скорректируйте смету',
        text: `Ваше предложение превышает текущую минимальную цену торгов — ${currentSum} ₽. Для участия необходимо понизить смету как минимум на ${costStep} ₽ (шаг торгов)`,
      });
    }
    //если сумма предложения не более или менее шага цены от текущей суммы сметы
    if (
      currentSum &&
      costStep &&
      !(allSum >= currentSum + costStep) &&
      !(allSum <= currentSum - costStep)
    ) {
      //ошибка
      return setBanner({
        title: 'Недостаточный шаг цены',
        text: `Измените свое предложения как минимум на ${costStep} ₽`,
      });
    }
    if (!userRole) {
      return toast.show({
        type: 'error',
        title: 'Не удалось определить роль пользователя',
        contentHeight: 120,
      });
    }
    try {
      await patchTaskLot({
        taskID: taskId,
        sum: allSum,
      }).unwrap();
      const postServices: Service[] = services.map(service => {
        const postMaterials =
          service.materials?.map(material => {
            return {
              count: material.count,
              measure: material.measure,
              name: material.name,
              price: +(material.localSum || 0) / material.count,
              roleID: userRole,
            };
          }) || [];
        const matSums =
          service?.materials?.reduce((acc, val) => {
            if (val.localSum) {
              return acc + +val.localSum;
            }
            return acc;
          }, 0) || 0;
        const res: Service = {
          categoryID: service.categoryID,
          categoryName: service.categoryName,
          description: service.description,
          measureID: service.measureID,
          measureName: service.measureName,
          name: service.name,
          price: service.price,
          setID: service.setID,
          serviceID: service.serviceID || service.ID,
          count: service.count,
          sum: (service.count || 0) * service.price + matSums,
          roleID: userRole,
          taskID: taskId,
          materials: postMaterials,
        };
        return res;
      });
      await postOffers({
        taskID: taskId,
        comment,
        services: postServices,
      }).unwrap();
      navigation.navigate(AppScreenName.EstimateSubmissionSuccess);
    } catch (err) {
      toast.show({
        type: 'error',
        title: (err as AxiosQueryErrorResponse).data.message,
        contentHeight: 100,
      });
    }
  };
  const onDeleteService = () => {
    const newServices = services.filter(ser => ser !== serviceForDelete);
    dispatch(setNewOfferServices(newServices));
    onDeleteEstimateModalVisible();
  };
  const onDeleteMaterial = (service: Service, material: Material) => {
    const newMaterials = service?.materials?.filter(m => m !== material) || [];
    const newServices = services.reduce<Service[]>((acc, val) => {
      if (val === service) {
        return acc.concat({ ...service, materials: newMaterials });
      }
      return acc.concat(val);
    }, []);
    dispatch(setNewOfferServices(newServices));
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
      <DeleteEstimateModal
        isVisible={deleteEstimateModalVisible}
        onCancel={onCancelDeleteService}
        onDelete={onDeleteService}
      />
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
        <ScrollView style={styles.ph20}>
          <Text variant="title3" color={theme.text.basic} style={styles.title}>
            Ваше ценовое предложение
          </Text>
          {services.map(service => {
            const error = errors?.[service.ID as number];
            const onDelete = () => {
              setServiceForDelete(service);
              onDeleteEstimateModalVisible();
            };
            const onChangeText = (text: string) => {
              if (text && error) {
                delete errors[service.ID as number];
              }
              dispatch(
                addServiceLocalSum({
                  serviceID: service.ID,
                  localSum: text,
                })
              );
            };
            return (
              <View key={service.name}>
                <Item
                  onChangeText={onChangeText}
                  title={service.name}
                  description={service.description}
                  count={service?.count || 0}
                  sum={service.sum || 0}
                  value={service?.localSum}
                  error={errors?.[service.ID as number]}
                  canDelete={service.canDelete}
                  onDelete={onDelete}
                />
                {service.materials?.map(material => {
                  const error = errors?.[material.ID as number];
                  const onDelete = () => {
                    onDeleteMaterial(service, material);
                  };
                  const onChangeText = (text: string) => {
                    if (text && error) {
                      delete errors[material.ID as number];
                    }
                    dispatch(
                      addMaterialLocalSum({
                        serviceID: service.ID,
                        materialID: material.ID,
                        localSum: text,
                      })
                    );
                  };
                  return (
                    <Item
                      onChangeText={onChangeText}
                      value={material?.localSum}
                      key={material.name}
                      onDelete={onDelete}
                      error={error}
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
          <TouchableOpacity style={styles.add} onPress={onEstimateModalVisible}>
            <PlusIcon fill={theme.icons.basic} />
            <Text variant="bodySBold" color={theme.text.basic}>
              Добавить услугу или материал
            </Text>
          </TouchableOpacity>
          <Spacer size={16} />
          <Input
            variant={'textarea'}
            label={'Комментарии к ценовому предложению'}
            value={comment}
            onChangeText={setComment}
          />
          <Spacer size={40} />
        </ScrollView>
        <View style={styles.ph20}>
          <View
            style={{
              position: 'absolute',
              bottom: 60,
              width: deviceWidth - 40,
              alignSelf: 'center',
            }}
          >
            {banner && (
              <Banner
                type={'warning'}
                icon={'alert'}
                title={banner?.title}
                text={banner?.text}
                onClosePress={onClosePress}
              />
            )}
          </View>
          <Button label="Подать смету" disabled={isError} onPress={onSubmit} />
        </View>
      </SafeAreaView>
    </>
  );
};
