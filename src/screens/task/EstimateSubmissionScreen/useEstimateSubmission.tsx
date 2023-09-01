import { useEffect, useRef, useState } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useToast } from 'rn-ui-kit';

import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  useGetTaskQuery,
  usePatchOffersMutation,
  usePatchTaskLotMutation,
  usePostOffersMutation,
} from '@/store/api/tasks';
import { Material, Service } from '@/store/api/tasks/types';
import { selectAuth } from '@/store/slices/auth/selectors';
import {
  setNewOfferServices,
  setOfferComment,
  setOfferID,
} from '@/store/slices/tasks/actions';
import { selectTasks } from '@/store/slices/tasks/selectors';
import { AxiosQueryErrorResponse } from '@/types/error';

export const useEstimateSubmission = ({
  navigation,
  taskId,
  isEdit,
}: {
  navigation: StackNavigationProp<
    AppStackParamList,
    AppScreenName.EstimateSubmission,
    undefined
  >;
  taskId: number;
  isEdit: boolean | undefined;
}) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const isFocused = useIsFocused();

  const bsRef = useRef<BottomSheetModal>(null);

  const getTaskQuery = useGetTaskQuery(taskId.toString());

  const [patchTaskLot] = usePatchTaskLotMutation();
  const [postOffers] = usePostOffersMutation();
  const [patchOffers] = usePatchOffersMutation();

  const [serviceForDelete, setServiceForDelete] = useState<Service>();
  const [banner, setBanner] = useState<{ title: string; text: string }>();
  const [errors, setErrors] = useState<{
    [key: string]: { localSum: boolean; count: boolean };
  }>({});
  const [estimateModalVisible, setEstimateModalVisible] = useState(false);
  const [deleteEstimateModalVisible, setDeleteEstimateModalVisible] =
    useState(false);

  const { offerServices, error, loading, offerComment, offerID } =
    useAppSelector(selectTasks);
  const userRole = useAppSelector(selectAuth).user?.roleID;

  useEffect(() => {
    if (isFocused) {
      getTaskQuery.refetch();
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
  const serviceIDs = services?.reduce<number[]>((acc, val) => {
    if (val.ID) {
      acc.concat(val.ID);
    }
    return acc;
  }, []);
  const allSumReduce = services.reduce((acc, val) => {
    const mSums =
      val?.materials?.reduce((mAcc, mVal) => {
        const mSum = +(mVal.localSum || 0);
        return mAcc + mSum;
      }, 0) || 0;
    const sum = +(val.localSum || 0) + mSums;
    return acc + sum;
  }, 0);
  const allSum = allSumReduce.toString().includes('.')
    ? Number(allSumReduce.toFixed(2))
    : allSumReduce;
  const task = getTaskQuery?.data?.tasks?.[0];
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
    if (val.localSum) {
      return acc + +val.localSum;
    }
    return acc;
  }, 0);
  const materialsSum = materialsSumReduce.toString().includes('.')
    ? Number(materialsSumReduce.toFixed(2))
    : materialsSumReduce;
  const fields = services.reduce<{
    [key: number]: {
      localSum: boolean;
      count: boolean;
    };
  }>((acc, val) => {
    const mFields = val?.materials?.reduce((mAcc, mVal) => {
      return {
        ...mAcc,
        [mVal.ID as number]: {
          localSum: !mVal.localSum,
          count: !mVal.localSum,
        },
      };
    }, {});
    return {
      ...acc,
      [val.ID as number]: { localSum: !val.localSum, count: !val.count },
      ...mFields,
    };
  }, {});
  const isError = Object.values(fields).some(
    field => !!field.localSum || !!field.count
  );

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
  const onDeleteService = () => {
    const newServices = services.filter(ser => ser !== serviceForDelete);
    dispatch(setNewOfferServices(newServices));
    onDeleteEstimateModalVisible();
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
        ...(isEdit && offerID && { offerID }),
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
          measure: service.measure,
          name: service.name,
          price: +(service.localSum || 0) / (service.count || 0),
          setID: service.setID,
          serviceID: service.serviceID || service.ID,
          count: service.count,
          sum: +(service.localSum || 0) + matSums,
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
          }).unwrap();
          toast.show({
            type: 'success',
            title: 'Ценовое предложение изменено',
          });
          getTaskQuery.refetch();
          dispatch(setNewOfferServices([]));
          dispatch(setOfferComment(''));
          dispatch(setOfferID(undefined));
          navigation.navigate(AppScreenName.TaskCard, {
            taskId,
          });
        }
      } else {
        await postOffers({
          taskID: taskId,
          comment: offerComment,
          services: postServices,
        }).unwrap();
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
    onDeleteEstimateModalVisible,
    onCancelDeleteService,
    addServiceBottomSheetClose,
    offerComment,
    deleteEstimateModalVisible,
    estimateModalVisible,
    errors,
    setServiceForDelete,
    setComment,
    banner,
    addService,
    onDeleteService,
    loading,
    serviceIDs,
    allSum,
    pressMaterial,
    pressService,
    services,
    onDeleteMaterial,
    materialsSum,
    isError,
    onSubmit,
  };
};
