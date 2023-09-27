import { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useToast } from 'rn-ui-kit';

import { useTaskSSE } from '@/hooks/useTaskSSE';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  useGetTaskQuery,
  usePatchITTaskMemberMutation,
  usePatchOffersMutation,
  usePatchTaskLotMutation,
  usePostITTaskMemberMutation,
  usePostOffersMutation,
} from '@/store/api/tasks';
import { Executor, Material, Service } from '@/store/api/tasks/types';
import { selectAuth } from '@/store/slices/auth/selectors';
import {
  setNewOfferServices,
  setOfferComment,
  setOfferID,
} from '@/store/slices/tasks/actions';
import { selectTasks } from '@/store/slices/tasks/selectors';
import { AxiosQueryErrorResponse } from '@/types/error';
import { TaskType } from '@/types/task';

export const useEstimateSubmission = ({
  navigation,
  taskId,
  isEdit,
  isInvitedExecutor,
  executor,
}: {
  navigation: StackNavigationProp<
    AppStackParamList,
    AppScreenName.EstimateSubmission,
    undefined
  >;
  taskId: number;
  isEdit: boolean | undefined;
  isInvitedExecutor: boolean | undefined;
  executor: Executor | undefined;
}) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const isFocused = useIsFocused();

  const bsRef = useRef<BottomSheetModal>(null);
  const { data, refetch } = useGetTaskQuery(taskId);

  useTaskSSE(taskId);

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

  const { offerServices, error, loading, offerComment, offerID } =
    useAppSelector(selectTasks);
  const user = useAppSelector(selectAuth).user;
  const userRole = useAppSelector(selectAuth).user?.roleID;
  const isItLots = data?.tasks[0]?.subsetID === TaskType.IT_AUCTION_SALE;

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

  const task = data?.tasks?.[0];
  const allowCostIncrease = task?.allowCostIncrease;
  const currentSum = task?.currentSum;
  const costStep = task?.costStep;
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
    field => !!field.localPrice || !!field.localCount
  );

  const onEstimateModalVisible = () => {
    setEstimateModalVisible(!estimateModalVisible);
  };
  const onClosePress = () => {
    setBanner(undefined);
  };
  const onDeleteEstimateServiceModalVisible = () => {
    setDeleteEstimateServiceModalVisible(!deleteEstimateServiceModalVisible);
  };
  const onDeleteEstimateMaterialModalVisible = () => {
    setDeleteEstimateMaterialModalVisible(!deleteEstimateMaterialModalVisible);
  };
  const onCancelDeleteService = () => {
    setServiceForDelete(undefined);
    setDeleteEstimateServiceModalVisible(!deleteEstimateServiceModalVisible);
  };
  const onCancelDeleteMaterial = () => {
    setMaterialForDelete(undefined);
    setDeleteEstimateMaterialModalVisible(!deleteEstimateMaterialModalVisible);
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
          m => m !== materialForDelete?.material
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
  const setComment = (text: string) => {
    dispatch(setOfferComment(text));
  };

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
        ...(isEdit && offerID && { offerID }),
      }).unwrap();

      const postServices: Service[] = services.map(service => {
        const postMaterials =
          service.materials?.map(material => {
            return {
              count: +(material.localCount || 0),
              measure: material.measure,
              name: material.name,
              price: +(material.localPrice || 0),
              roleID: userRole,
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
          roleID: userRole,
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
            sum: allSum,
          }).unwrap();
          toast.show({
            type: 'success',
            title: 'Ценовое предложение изменено',
          });
          refetch();
          dispatch(setNewOfferServices([]));
          dispatch(setOfferComment(''));
          dispatch(setOfferID(undefined));
          navigation.navigate(AppScreenName.TaskCard, {
            taskId,
          });
        }
      } else {
        // Подача сметы для IT-лотов Исполнителем
        if (isItLots) {
          isInvitedExecutor
            ? await patchITTaskMember({
                ID: executor?.memberID,
                isConfirm: true,
                isCurator: false,
                offer: {
                  taskID: taskId,
                  isCurator: false,
                  services: postServices,
                },
              }).unwrap()
            : await postITTaskMember({
                taskID: taskId,
                members: [
                  {
                    userID: user?.userID,
                    isConfirm: true,
                    isCurator: false,
                    offer: {
                      taskID: taskId,
                      isCurator: false,
                      services: postServices,
                    },
                  },
                ],
              }).unwrap();
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
        navigation.navigate(AppScreenName.EstimateSubmissionSuccess, {
          taskId,
        });
      }
    } catch (err) {
      toast.show({
        type: 'error',
        title: (err as AxiosQueryErrorResponse).data.message,
      });
    }
  };
  return {
    bsRef,
    onEstimateModalVisible,
    onClosePress,
    onDeleteEstimateServiceModalVisible,
    onCancelDeleteService,
    addServiceBottomSheetClose,
    offerComment,
    deleteEstimateServiceModalVisible,
    estimateModalVisible,
    errors,
    setServiceForDelete,
    setComment,
    banner,
    addService,
    onDeleteService,
    loading,
    serviceNames,
    allSum,
    pressMaterial,
    pressService,
    services,
    onDeleteMaterial,
    materialsSum,
    isError,
    onSubmit,
    allowCostIncrease,
    currentSum,
    costStep,
    setMaterialForDelete,
    onDeleteEstimateMaterialModalVisible,
    onCancelDeleteMaterial,
    deleteEstimateMaterialModalVisible,
  };
};
