import React, { FC } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Banner, Button, Input, Spacer, Text, Tips, useTheme } from 'rn-ui-kit';

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
  const { taskId, isEdit, isSubmissionByCuratorItLots } = route.params;

  const {
    bsRef,
    errors,
    banner,
    setId,
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
    withNDS,
  } = useEstimateSubmission({
    navigation,
    taskId,
    isEdit,
    isSubmissionByCuratorItLots,
  });

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isFocused = useIsFocused();

  if (loading) {
    return (
      <View style={styles.loader}>
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
          setId={setId}
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
        <KeyboardAwareScrollView
          style={styles.ph20}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          extraHeight={90}
        >
          <Tips
            type={'info'}
            text={
              allowCostIncrease
                ? `Смета должна отличаться от последнего предложения (${currentSum}\u00A0₽) как минимум на ${costStep}\u00A0₽`
                : `Смета должна быть меньше последнего предложения (${currentSum}\u00A0₽) как минимум на ${costStep}\u00A0₽`
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
            withNDS={withNDS}
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
          <View style={styles.ph20}>
            <View style={styles.bannerContainer}>
              {banner && (
                <Banner
                  type={'error'}
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
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};
