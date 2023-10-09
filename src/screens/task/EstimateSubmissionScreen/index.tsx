import React, { FC } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Banner, Button, Input, Spacer, Text, useTheme } from 'rn-ui-kit';

import { PlusIcon } from '@/assets/icons/svg/estimate/PlusIcon';
import { DeleteEstimateMaterialModal } from '@/components/task/DeleteEstimateMaterialModal';
import { DeleteEstimateServiceModal } from '@/components/task/DeleteEstimateServiceModal';
import { EstimateTotal } from '@/components/task/EstimateTotal';
import { AddServiceBottomSheet } from '@/components/task/TaskCard/AddServiceBottomSheet';
import { TaskCardAddEstimateBottomSheet } from '@/components/task/TaskCard/TaskCardAddEstimateBottomSheet';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { BottomTabParamList } from '@/navigation/TabNavigation';
import { useAppDispatch } from '@/store';
import {
  addMaterialLocalCount,
  addMaterialLocalPrice,
  addServiceLocalCount,
  addServiceLocalPrice,
} from '@/store/slices/tasks/actions';

import { Item } from './Item';
import { useEstimateSubmission } from './useEstimateSubmission';

import { styles } from './styles';

type EstimateSubmissionScreenProps = CompositeScreenProps<
  StackScreenProps<AppStackParamList, AppScreenName.EstimateSubmission>,
  BottomTabScreenProps<BottomTabParamList>
>;
export const EstimateSubmissionScreen: FC<EstimateSubmissionScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    taskId,
    isEdit,
    isInvitedExecutor,
    executor,
    submissionByCurator,
    curatorMemberID,
    isInvitedCurator,
  } = route.params;

  const {
    bsRef,
    errors,
    banner,
    allSum,
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
  } = useEstimateSubmission({
    navigation,
    taskId,
    isEdit,
    isInvitedExecutor,
    executor,
    submissionByCurator,
    curatorMemberID,
    isInvitedCurator: !!isInvitedCurator,
  });

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
      <DeleteEstimateServiceModal
        isVisible={deleteEstimateServiceModalVisible}
        onCancel={onCancelDeleteService}
        onDelete={onDeleteService}
      />
      <DeleteEstimateMaterialModal
        isVisible={deleteEstimateMaterialModalVisible}
        onCancel={onCancelDeleteMaterial}
        onDelete={onDeleteMaterial}
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
          <Banner
            type={'info'}
            icon={<></>}
            closeIcon={<></>}
            text={
              allowCostIncrease
                ? `Смета должна отличаться от последнего предложения (${currentSum} ₽) как минимум на ${costStep} ₽`
                : `Смета должна быть меньше последнего предложения (${currentSum} ₽) как минимум на ${costStep} ₽`
            }
          />
          <Text variant="title3" color={theme.text.basic} style={styles.title}>
            Ваше ценовое предложение
          </Text>
          {services.map(service => {
            const error = errors?.[service.ID as number];
            const onDelete = () => {
              setServiceForDelete(service);
              onDeleteEstimateServiceModalVisible();
            };
            const onChangePrice = (text: string) => {
              if (text && error) {
                error.localPrice = false;
              }
              dispatch(
                addServiceLocalPrice({
                  serviceID: service.ID,
                  localPrice: text,
                }),
              );
            };
            const onChangeCount = (text: string) => {
              if (text && error && service.ID) {
                error.localCount = false;
              }
              dispatch(
                addServiceLocalCount({
                  serviceID: service.ID,
                  localCount: text,
                }),
              );
            };
            return (
              <View key={service.name}>
                <Item
                  onChangePrice={onChangePrice}
                  onChangeCount={onChangeCount}
                  title={service.name}
                  description={service.description}
                  count={service?.count || 0}
                  localCount={service?.localCount}
                  price={service.price || 0}
                  localPrice={service?.localPrice}
                  error={errors?.[service.ID as number]}
                  canDelete={service.canDelete}
                  onDelete={onDelete}
                  measure={service.measure || ''}
                  categoryName={service?.categoryName}
                />
                {service.materials?.map(material => {
                  const error = errors?.[material.ID as number];
                  const onDelete = () => {
                    setMaterialForDelete({ service, material });
                    onDeleteEstimateMaterialModalVisible();
                    // onDeleteMaterial(service, material);
                  };
                  const onChangePrice = (text: string) => {
                    if (text && error) {
                      delete errors[material.ID as number];
                    }
                    dispatch(
                      addMaterialLocalPrice({
                        serviceID: service.ID,
                        materialID: material.ID,
                        localPrice: text,
                      }),
                    );
                  };
                  const onChangeCount = (text: string) => {
                    if (text && error) {
                      delete errors[material.ID as number];
                    }
                    dispatch(
                      addMaterialLocalCount({
                        serviceID: service.ID,
                        materialID: material.ID,
                        localCount: text,
                      }),
                    );
                  };
                  return (
                    <Item
                      onChangePrice={onChangePrice}
                      onChangeCount={onChangeCount}
                      localPrice={material?.localPrice}
                      key={material.name}
                      localCount={material?.localCount}
                      onDelete={onDelete}
                      error={error}
                      title={material.name}
                      count={material.count}
                      price={material.price as number}
                      canDelete={material.canDelete}
                      measure={material.measure || ''}
                    />
                  );
                })}
              </View>
            );
          })}
          <EstimateTotal
            servicesSum={allSum - materialsSum}
            materialsSum={materialsSum}
          />
          <Spacer size={20} />
          <TouchableOpacity style={styles.add} onPress={onEstimateModalVisible}>
            <PlusIcon fill={theme.icons.basic} />
            <Text
              variant="bodySBold"
              color={theme.text.basic}
              style={styles.addText}
            >
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
          <View style={styles.bannerContainer}>
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
            isPending={isLoading}
            label={isEdit ? 'Редактировать смету' : 'Подать смету'}
            disabled={isError || isLoading}
            onPress={onSubmit}
            style={styles.btn}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
