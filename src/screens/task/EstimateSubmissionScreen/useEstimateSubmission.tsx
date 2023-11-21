import { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useIsFocused,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useToast } from 'rn-ui-kit';

import { useTaskMembers } from '@/hooks/useTaskMembers';
import { useTaskSSE } from '@/hooks/useTaskSSE';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { BottomTabName, BottomTabParamList } from '@/navigation/TabNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  tasksAPI,
  usePatchITTaskMemberMutation,
  usePatchOffersMutation,
  usePatchTaskLotMutation,
  usePostITTaskMemberMutation,
  usePostOffersMutation,
} from '@/store/api/tasks';
import { Material, Service } from '@/store/api/tasks/types';
import { useGetUserQuery } from '@/store/api/user';
import { selectAuth } from '@/store/slices/auth/selectors';
import {
  setNewOfferServices,
  setOfferComment,
  setOfferID,
} from '@/store/slices/tasks/actions';
import { selectTasks } from '@/store/slices/tasks/selectors';
import { AxiosQueryErrorResponse, ErrorCode } from '@/types/error';
import { OutlayStatusType, StatusType, TaskType } from '@/types/task';

type EstimateSubmissionNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AppStackParamList, AppScreenName.EstimateSubmission>,
  BottomTabNavigationProp<BottomTabParamList, keyof BottomTabParamList>
>;

export const useEstimateSubmission = ({
  navigation,
  taskId,
  isEdit,
  isSubmissionByCuratorItLots,
}: {
  navigation: EstimateSubmissionNavigationProp;
  taskId: number;
  isEdit: boolean | undefined;
  isSubmissionByCuratorItLots: boolean | undefined;
}) => {
  const isFocused = useIsFocused();
  const toast = useToast();
  const bsRef = useRef<BottomSheetModal>(null);
  const dispatch = useAppDispatch();

  const {
    task,
    userID,
    refetch,
    executor,
    isRefusedInvitedCurator,
    isRefusedInvitedExecutor,
    curatorMemberId,
    isInvitedCurator,
    isInvitedExecutor,
    isError: isTaskError,
    error: taskError,
    isCuratorAllowedTask,
    curator,
  } = useTaskMembers(taskId);

  const refresh = () =>
    dispatch(
      tasksAPI.endpoints.getTask.initiate(taskId, {
        forceRefetch: true,
      }),
    );
  useTaskSSE({ taskId, refresh });

  const [postITTaskMember] = usePostITTaskMemberMutation();
  const [patchITTaskMember] = usePatchITTaskMemberMutation();
  const [patchTaskLot] = usePatchTaskLotMutation();
  const [postOffers] = usePostOffersMutation();
  const [patchOffers] = usePatchOffersMutation();

  const [serviceForDelete, setServiceForDelete] = useState<Service>();
  const [materialForDelete, setMaterialForDelete] = useState<{
    service: Service;
    material: Material;
  }>();
  const [banner, setBanner] = useState<{ title: string; text: string }>();
  const [errors, setErrors] = useState<{
    [key: string]: { localPrice: boolean; localCount: boolean };
  }>({});
  const [estimateModalVisible, setEstimateModalVisible] = useState(false);
  const [
    deleteEstimateServiceModalVisible,
    setDeleteEstimateServiceModalVisible,
  ] = useState(false);
  const [
    deleteEstimateMaterialModalVisible,
    setDeleteEstimateMaterialModalVisible,
  ] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { error, loading, offerID, offerComment, offerServices } =
    useAppSelector(selectTasks);
  const user = useGetUserQuery(userID).data;
  const roleID = useAppSelector(selectAuth).user?.roleID;
  const isItLots = task?.subsetID === TaskType.IT_AUCTION_SALE;
  const isActive = task?.statusID === StatusType.ACTIVE;
  const isWork = task?.statusID === StatusType.WORK;

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (error) {
      toast.show({
        type: 'error',
        title: error.message,
      });
    }
  }, [error]);
  useEffect(() => {
    if (isTaskError) {
      if (
        [
          ErrorCode.TASK_IS_ALREADY_TAKEN,
          ErrorCode.OTHER_CANDIDATE,
          ErrorCode.NOT_FOUND,
        ].includes((taskError as AxiosQueryErrorResponse).data.code)
      ) {
        navigation.navigate(BottomTabName.TaskSearch);
        return toast.show({
          type: 'info',
          duration: 6000,
          title: (taskError as AxiosQueryErrorResponse).data.message,
        });
      }

      toast.show({
        type: 'error',
        title: (taskError as AxiosQueryErrorResponse).data.message,
      });
    }
  }, [isTaskError]);

  const services = offerServices || [];
  const serviceNames = services?.reduce<string[]>((acc, val) => {
    if (val.name) {
      return acc.concat(val.name);
    }
    return acc;
  }, []);
  const allSumReduce = services.reduce((acc, val) => {
    const mSums =
      val?.materials?.reduce((mAcc, mVal) => {
        const mSum = +(mVal.localPrice || 0) * +(mVal.localCount || 0);
        return mAcc + mSum;
      }, 0) || 0;
    const sum = +(val.localPrice || 0) * +(val.localCount || 0) + mSums;
    return acc + sum;
  }, 0);
  const allSum = allSumReduce.toString().includes('.')
    ? Number(allSumReduce.toFixed(2))
    : allSumReduce;

  const allowCostIncrease = task?.allowCostIncrease;
  const currentSum = task?.currentSum;
  const costStep = task?.costStep;
  const getWithNDS = () => {
    //показываем НДС если правовая форма получателя ИП или Юр. лицо и он является Плательщиком НДС
    // (Общее условие для всех остальных условий)
    if (
      user &&
      user?.entityTypeID &&
      [2, 3].includes(user.entityTypeID) &&
      user.isNDSPayer
    ) {
      //Если в задании участвует куратор и подрядчик то сумму НДС показываем только если куратор является плательщиком НДС
      //(подрядчик напрямую отношения к смете не имеет)
      if (isCuratorAllowedTask) {
        return !!curator?.isNDSPayer;
      }
      return true;
    }
    return false;
  };
  const withNDS = getWithNDS();

  const materials = services.reduce<Material[]>((acc, val) => {
    if (val.materials) {
      return acc.concat(val.materials);
    }
    return acc;
  }, []);
  const materialsSumReduce = materials.reduce((acc, val) => {
    if (val.localPrice && val.localCount) {
      return acc + +val.localPrice * +val.localCount;
    }
    return acc;
  }, 0);
  const materialsSum = materialsSumReduce.toString().includes('.')
    ? Number(materialsSumReduce.toFixed(2))
    : materialsSumReduce;
  const fields = services.reduce<{
    [key: number]: {
      localPrice: boolean;
      localCount: boolean;
    };
  }>((acc, val) => {
    const mFields = val?.materials?.reduce((mAcc, mVal) => {
      return {
        ...mAcc,
        [mVal.ID as number]: {
          localPrice: !+(mVal.localPrice || '0'),
          localCount: !+(mVal.localCount || '0'),
        },
      };
    }, {});
    return {
      ...acc,
      [val.ID as number]: {
        localPrice: !+(val.localPrice || '0'),
        localCount: !+(val.localCount || '0'),
      },
      ...mFields,
    };
  }, {});

  const isError = Object.values(fields).some(
    field => !!field.localPrice || !!field.localCount,
  );

  const onEstimateModalVisible = () =>
    setEstimateModalVisible(!estimateModalVisible);
  const onClosePress = () => setBanner(undefined);
  const onDeleteEstimateServiceModalVisible = () =>
    setDeleteEstimateServiceModalVisible(!deleteEstimateServiceModalVisible);
  const onDeleteEstimateMaterialModalVisible = () =>
    setDeleteEstimateMaterialModalVisible(!deleteEstimateMaterialModalVisible);
  const onCancelDeleteService = () => {
    setServiceForDelete(undefined);
    setDeleteEstimateServiceModalVisible(!deleteEstimateServiceModalVisible);
  };
  const onCancelDeleteMaterial = () => {
    setMaterialForDelete(undefined);
    setDeleteEstimateMaterialModalVisible(!deleteEstimateMaterialModalVisible);
  };
  const addServiceBottomSheetClose = () => bsRef.current?.close();

  const addService = (service: Service) => {
    navigation.navigate(AppScreenName.EstimateAddService, {
      service,
      taskId,
      fromEstimateSubmission: true,
    });
    bsRef.current?.close();
  };
  const onDeleteService = () => {
    const newServices = services.filter(ser => ser !== serviceForDelete);
    dispatch(setNewOfferServices(newServices));
    onDeleteEstimateServiceModalVisible();
  };
  const pressMaterial = () => {
    onEstimateModalVisible();
    navigation.navigate(AppScreenName.NewMaterial, {
      taskId,
      isEdit,
      fromEstimateSubmission: true,
      services: offerServices,
      isSubmissionByCuratorItLots,
    });
  };
  const pressService = () => {
    onEstimateModalVisible();
    setTimeout(() => {
      bsRef.current?.present();
    }, 500);
  };
  const onDeleteMaterial = () => {
    if (materialForDelete) {
      const newMaterials =
        materialForDelete?.service?.materials?.filter(
          m => m !== materialForDelete?.material,
        ) || [];
      const newServices = services.reduce<Service[]>((acc, val) => {
        if (val === materialForDelete.service) {
          return acc.concat({
            ...materialForDelete.service,
            materials: newMaterials,
          });
        }
        return acc.concat(val);
      }, []);
      dispatch(setNewOfferServices(newServices));
    }
    onDeleteEstimateMaterialModalVisible();
  };
  const setComment = (text: string) => dispatch(setOfferComment(text));

  const onSubmit = async () => {
    //если есть ошибка валидации
    if (isError) {
      return setErrors(fields);
    }
    //если нельзя подать смету ценой выше поданной ранее
    if (!allowCostIncrease && currentSum && allSum > currentSum) {
      //ошибка
      return setBanner({
        title: 'Скорректируйте смету',
        text: `Ваша цена должна быть меньше последнего предложения (${currentSum} ₽) как минимум на ${costStep} ₽`,
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
        title: 'Скорректируйте смету',
        text: `Ваша цена должна отличаться от последнего предложения (${currentSum} ₽) как минимум на ${costStep} ₽`,
      });
    }
    if (!roleID) {
      return toast.show({
        type: 'error',
        title: 'Не удалось определить роль пользователя',
        contentHeight: 120,
      });
    }
    try {
      setIsLoading(true);
      if (isActive) {
        await patchTaskLot({
          taskID: taskId,
          sum: allSum,
          ...(isEdit && offerID && { offerID }),
        }).unwrap();
      }

      const postServices: Service[] = services.map(service => {
        const postMaterials =
          service.materials?.map(material => {
            return {
              count: +(material.localCount || 0),
              measure: material.measure,
              name: material.name,
              price: +(material.localPrice || 0),
              roleID,
            };
          }) || [];
        const matSums =
          service?.materials?.reduce((acc, val) => {
            if (val.localPrice && val.localCount) {
              return acc + +val.localPrice * +val.localCount;
            }
            return acc;
          }, 0) || 0;
        const res: Service = {
          categoryID: service.categoryID,
          categoryName: service.categoryName,
          description: service.description,
          measureID: service.measureID,
          measureName: service.measureName,
          measure: service.measure,
          name: service.name,
          price: +(service.localPrice || 0),
          setID: service.setID,
          serviceID: service.serviceID || service.ID,
          count: +(service.localCount || 0),
          sum:
            +(service.localPrice || 0) * +(service.localCount || 0) + matSums,
          roleID,
          taskID: taskId,
          materials: postMaterials,
        };
        return res;
      });
      if (isEdit) {
        if (offerID) {
          await patchOffers({
            taskID: taskId,
            ID: offerID,
            comment: offerComment,
            services: postServices,
            ...(isWork && { outlayStatusID: OutlayStatusType.PENDING }),
            sum: allSum,
          }).unwrap();
          toast.show({
            type: 'success',
            title: 'Ценовое предложение изменено',
          });
          dispatch(setNewOfferServices([]));
          dispatch(setOfferComment(''));
          dispatch(setOfferID(undefined));

          if (isSubmissionByCuratorItLots) {
            navigation.navigate(AppScreenName.Contractors, {
              taskId,
              fromEstimateSubmission: true,
            });
          } else {
            navigation.navigate(AppScreenName.TaskCard, {
              taskId,
            });
          }
        }
      } else {
        if (isItLots) {
          // Подача сметы для IT-лотов Куратором
          if (isSubmissionByCuratorItLots) {
            isInvitedCurator || isRefusedInvitedCurator
              ? await patchITTaskMember({
                  ID: curatorMemberId,
                  isConfirm: true,
                  isCurator: true,
                  offer: {
                    taskID: taskId,
                    isCurator: true,
                    comment: offerComment,
                    services: postServices,
                  },
                }).unwrap()
              : await postITTaskMember({
                  taskID: taskId,
                  members: [
                    {
                      userID,
                      isConfirm: true,
                      isCurator: true,
                      offer: {
                        taskID: taskId,
                        isCurator: true,
                        comment: offerComment,
                        services: postServices,
                      },
                    },
                  ],
                }).unwrap();
          } else {
            // Подача сметы для IT-лотов Исполнителем
            isInvitedExecutor || isRefusedInvitedExecutor
              ? await patchITTaskMember({
                  ID: executor?.memberID,
                  isConfirm: true,
                  isCurator: false,
                  offer: {
                    taskID: taskId,
                    isCurator: false,
                    comment: offerComment,
                    services: postServices,
                  },
                }).unwrap()
              : await postITTaskMember({
                  taskID: taskId,
                  members: [
                    {
                      userID,
                      isConfirm: true,
                      isCurator: false,
                      offer: {
                        taskID: taskId,
                        isCurator: false,
                        comment: offerComment,
                        services: postServices,
                      },
                    },
                  ],
                }).unwrap();
          }
        } else {
          // Подача сметы для Общих лотов Исполнителем
          await postOffers({
            taskID: taskId,
            comment: offerComment,
            services: postServices,
            sum: allSum,
          }).unwrap();
        }

        dispatch(setNewOfferServices([]));
        dispatch(setOfferComment(''));

        if (!isSubmissionByCuratorItLots) {
          navigation.navigate(AppScreenName.EstimateSubmissionSuccess, {
            taskId,
          });
        } else {
          toast.show({
            type: 'success',
            title: 'Смета успешно подана',
          });

          navigation.navigate(AppScreenName.Contractors, {
            taskId,
            fromEstimateSubmission: true,
          });
        }
      }
    } catch (err) {
      toast.show({
        type: 'error',
        title: (err as AxiosQueryErrorResponse).data.message,
      });
    } finally {
      refetch();
      setIsLoading(false);
    }
  };
  return {
    bsRef,
    errors,
    banner,
    allSum,
    withNDS,
    isError,
    loading,
    services,
    onSubmit,
    costStep,
    isLoading,
    currentSum,
    addService,
    setComment,
    serviceNames,
    pressService,
    offerComment,
    onClosePress,
    materialsSum,
    pressMaterial,
    onDeleteService,
    onDeleteMaterial,
    allowCostIncrease,
    setServiceForDelete,
    estimateModalVisible,
    setMaterialForDelete,
    onCancelDeleteService,
    onCancelDeleteMaterial,
    onEstimateModalVisible,
    addServiceBottomSheetClose,
    deleteEstimateServiceModalVisible,
    deleteEstimateMaterialModalVisible,
    onDeleteEstimateServiceModalVisible,
    onDeleteEstimateMaterialModalVisible,
  };
};
