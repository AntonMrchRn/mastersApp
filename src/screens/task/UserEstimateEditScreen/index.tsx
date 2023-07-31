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
import { deviceWidth } from '@/constants/platform';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useAppDispatch } from '@/store';
import {
  addMaterialLocalSum,
  addServiceLocalSum,
} from '@/store/slices/tasks/actions';

import { Item } from './Item';
import { useUserEstimateEdit } from './useUserEstimateEdit';

import { styles } from './styles';

type UserEstimateEditScreenProps = StackScreenProps<
  AppStackParamList,
  AppScreenName.UserEstimateEdit
>;
export const UserEstimateEditScreen: FC<UserEstimateEditScreenProps> = ({
  navigation,
  route,
}) => {
  const { taskId, offer } = route.params;

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
    serviceIDs,
    allSum,
    onDeleteService,
    pressMaterial,
    pressService,
    services,
    onDeleteMaterial,
    materialsSum,
    isError,
    onSubmit,
  } = useUserEstimateEdit({ navigation, taskId, offer });

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
                  measure={'шт.'}
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
                      measure={material.measure || 'шт.'}
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
