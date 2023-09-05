import React, { FC } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Banner, Button, Input, Spacer, Text, useTheme } from 'rn-ui-kit';

import { PlusIcon } from '@/assets/icons/svg/estimate/PlusIcon';
import { DeleteEstimateModal } from '@/components/task/DeleteEstimateModal';
import { EstimateTotal } from '@/components/task/EstimateTotal';
import { AddServiceBottomSheet } from '@/components/task/TaskCard/AddServiceBottomSheet';
import { TaskCardAddEstimateBottomSheet } from '@/components/task/TaskCard/TaskCardAddEstimateBottomSheet';
import { configApp, deviceWidth } from '@/constants/platform';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch } from '@/store';
import {
  addMaterialCount,
  addMaterialLocalSum,
  addServiceCount,
  addServiceLocalSum,
} from '@/store/slices/tasks/actions';

import { Item } from './Item';
import { useEstimateSubmission } from './useEstimateSubmission';

import { styles } from './styles';

type EstimateSubmissionScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.EstimateSubmission
>;
export const EstimateSubmissionScreen: FC<EstimateSubmissionScreenProps> = ({
  navigation,
  route,
}) => {
  const { taskId, isEdit } = route.params;

  const {
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
    loading,
    serviceNames,
    allSum,
    onDeleteService,
    pressMaterial,
    pressService,
    services,
    onDeleteMaterial,
    materialsSum,
    isError,
    onSubmit,
    initialEstimateServices,
  } = useEstimateSubmission({ navigation, taskId, isEdit });

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isFocused = useIsFocused();

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
          serviceNames={serviceNames}
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
            const serviceInInitialEstimate = initialEstimateServices.find(
              serv => serv.name === service.name
            );
            const onDelete = () => {
              setServiceForDelete(service);
              onDeleteEstimateModalVisible();
            };
            const onChangeSum = (text: string) => {
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
            const onChangeCount = (text: string) => {
              if (text && error) {
                delete errors[service.ID as number];
              }
              dispatch(
                addServiceCount({
                  serviceID: service.ID,
                  count: +text,
                })
              );
            };
            return (
              <View key={service.name}>
                <Item
                  onChangeSum={onChangeSum}
                  onChangeCount={onChangeCount}
                  title={service.name}
                  description={service.description}
                  count={service?.count || 0}
                  sum={service.sum || 0}
                  localSum={service?.localSum}
                  error={errors?.[service.ID as number]}
                  canDelete={!serviceInInitialEstimate}
                  onDelete={onDelete}
                  measure={service.measure || ''}
                  categoryName={service?.categoryName}
                />
                {service.materials?.map(material => {
                  const error = errors?.[material.ID as number];
                  const materialInInitialService =
                    serviceInInitialEstimate?.materials?.find(
                      mat => mat.name === material.name
                    );
                  const onDelete = () => {
                    onDeleteMaterial(service, material);
                  };
                  const onChangeSum = (text: string) => {
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
                  const onChangeCount = (text: string) => {
                    if (text && error) {
                      delete errors[material.ID as number];
                    }
                    dispatch(
                      addMaterialCount({
                        serviceID: service.ID,
                        materialID: material.ID,
                        count: +text,
                      })
                    );
                  };
                  return (
                    <Item
                      onChangeSum={onChangeSum}
                      onChangeCount={onChangeCount}
                      localSum={material?.localSum}
                      key={material.name}
                      onDelete={onDelete}
                      error={error}
                      title={material.name}
                      count={material.count}
                      sum={material.count * material.price}
                      canDelete={!materialInInitialService}
                      measure={material.measure || ''}
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
            value={offerComment}
            onChangeText={setComment}
          />
          <Spacer size={40} />
        </ScrollView>
        <View style={styles.ph20}>
          <View
            style={{
              position: 'absolute',
              bottom: 70,
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
          <Button
            label={isEdit ? 'Редактировать смету' : 'Подать смету'}
            disabled={isError}
            onPress={onSubmit}
            style={{ marginBottom: configApp.android ? 20 : 0 }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
