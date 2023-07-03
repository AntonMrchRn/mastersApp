import React, { FC } from 'react';
import { View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RadioButton, Spacer, Text, useTheme } from 'rn-ui-kit';

import { TaskEstimateItem } from '@/components/task/TaskEstimateItem';
import { TaskEstimateOutline } from '@/components/task/TaskEstimateOutline';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { Service } from '@/store/api/tasks/types';
import { OutlayStatusType, StatusType } from '@/types/task';

import { AddServiceBottomSheet } from '../AddServiceBottomSheet';
import { TaskCardAddEstimateBottomSheet } from '../TaskCardAddEstimateBottomSheet';
import { useTaskCardEstimate } from './useTaskCardEstimate';

import { styles } from './styles';

type TaskCardEstimateProps = {
  services: Service[];
  outlayStatusID: OutlayStatusType | undefined;
  statusID: StatusType | undefined;
  taskId: number;
  navigation: StackNavigationProp<
    AppStackParamList,
    AppScreenName.TaskCard,
    undefined
  >;
  onEstimateBottomVisible: () => void;
  estimateBottomVisible: boolean;
  selectedServiceId: number | undefined;
  setSelectedServiceId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  onCantDeleteBannerVisible: () => void;
};

export const TaskCardEstimate: FC<TaskCardEstimateProps> = ({
  services,
  outlayStatusID,
  statusID,
  taskId,
  navigation,
  onEstimateBottomVisible,
  estimateBottomVisible,
  selectedServiceId,
  setSelectedServiceId,
  onCantDeleteBannerVisible,
}) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const {
    estimateSheetVisible,
    onEstimateSheetVisible,
    allSum,
    materialsSum,
    onEdit,
    onDeleteService,
    onDeleteMaterial,
    onPressMaterial,
    onPressService,
    bsRef,
    addServiceBottomSheetClose,
  } = useTaskCardEstimate({
    services,
    taskId,
    navigation,
    onEstimateBottomVisible,
    estimateBottomVisible,
  });

  const canSwipe = !estimateBottomVisible && statusID === StatusType.WORK;
  const addService = (service: Service) => {
    navigation.navigate(AppScreenName.EstimateAddService, {
      service,
      taskId,
    });
    bsRef.current?.close();
  };
  return (
    <>
      <TaskCardAddEstimateBottomSheet
        isVisible={estimateSheetVisible}
        onCancel={onEstimateSheetVisible}
        pressMaterial={onPressMaterial}
        pressService={onPressService}
      />
      {isFocused && (
        <AddServiceBottomSheet
          ref={bsRef}
          onCancel={addServiceBottomSheetClose}
          addService={addService}
        />
      )}
      <View>
        <Spacer size={'xxxl'} />
        {outlayStatusID && statusID === StatusType.WORK && (
          <TaskEstimateOutline
            outlayStatusID={outlayStatusID}
            onPress={onEstimateSheetVisible}
          />
        )}
        <Text variant={'title3'} color={theme.text.basic} style={styles.mb8}>
          Перечень услуг и материалов
        </Text>
        {services.map(service => {
          const firstActionService = () => {
            onEdit(service.ID);
          };
          const secondActionService = () => {
            if (services.length > 1) {
              onDeleteService(service.ID);
            } else {
              onCantDeleteBannerVisible();
            }
          };
          const radioPress = () => {
            setSelectedServiceId(service.ID);
          };
          return (
            <View key={service.ID}>
              <View style={styles.itemRow}>
                {estimateBottomVisible && (
                  <RadioButton
                    checked={selectedServiceId === service.ID}
                    style={styles.radio}
                    onPress={radioPress}
                  />
                )}
                <TaskEstimateItem
                  firstAction={firstActionService}
                  secondAction={secondActionService}
                  title={service?.name}
                  price={service?.price}
                  count={service?.count}
                  sum={service?.sum}
                  roleID={service?.roleID}
                  canSwipe={canSwipe}
                />
              </View>
              <Spacer size={0} separator="bottom" />
              {service?.materials?.map((material, inde) => {
                const firstActionMaterial = () => {
                  onEdit(service.ID, material.name);
                };
                const secondActionMaterial = () => {
                  onDeleteMaterial(service, material);
                };
                return (
                  <View key={material.measure + material.name + inde}>
                    <TaskEstimateItem
                      firstAction={firstActionMaterial}
                      secondAction={secondActionMaterial}
                      title={material?.name}
                      price={material?.price}
                      count={material?.count}
                      sum={(material?.count || 0) * (material?.price || 0)}
                      roleID={material?.roleID}
                      canSwipe={canSwipe}
                    />
                    <Spacer size={0} separator="bottom" />
                  </View>
                );
              })}
            </View>
          );
        })}
        <View style={styles.bottom}>
          <View style={styles.row}>
            <Text variant="bodySBold" color={theme.text.basic}>
              Всего по работам
            </Text>
            <Text variant="bodySBold" color={theme.text.basic}>
              {allSum} ₽
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="bodySBold" color={theme.text.basic}>
              Всего по материалам
            </Text>
            <Text variant="bodySBold" color={theme.text.basic}>
              {materialsSum} ₽
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="bodySBold" color={theme.text.accent}>
              ИТОГО
            </Text>
            <Text variant="bodySBold" color={theme.text.accent}>
              {allSum} ₽
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};
