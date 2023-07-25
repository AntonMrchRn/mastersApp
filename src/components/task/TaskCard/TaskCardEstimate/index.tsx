import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RadioButton, Spacer, Text, useTheme } from 'rn-ui-kit';

import { CalculatorIcon } from '@/assets/icons/svg/estimate/CalculatorIcon';
import { CalculatorLargeIcon } from '@/assets/icons/svg/estimate/CalculatorLargeIcon';
import { GavelIcon } from '@/assets/icons/svg/estimate/GavelIcon';
import { EstimateTotal } from '@/components/task/EstimateTotal';
import { TaskEstimateItem } from '@/components/task/TaskEstimateItem';
import { TaskEstimateOutline } from '@/components/task/TaskEstimateOutline';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { useGetOffersQuery } from '@/store/api/tasks';
import { Service } from '@/store/api/tasks/types';
import { OutlayStatusType, StatusType, TaskType } from '@/types/task';

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
  subsetID: TaskType | undefined;
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
  subsetID,
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
  const offers = useGetOffersQuery(taskId.toString());

  const canSwipe = !estimateBottomVisible && statusID === StatusType.WORK;
  const serviceIDs = services?.reduce<number[]>(
    (acc, val) => acc.concat(val.ID),
    []
  );
  const addService = (service: Service) => {
    navigation.navigate(AppScreenName.EstimateAddService, {
      service,
      taskId,
    });
    bsRef.current?.close();
  };
  const onCompetitorEstimates = () => {
    navigation.navigate(AppScreenName.CompetitorEstimates, {
      taskId,
    });
  };
  const onTradingResults = () => {
    navigation.navigate(AppScreenName.TradingResults, {
      taskId,
    });
  };
  if (!services.length) {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.icon,
            {
              backgroundColor: theme.background.fieldMain,
            },
          ]}
        >
          <CalculatorLargeIcon />
        </View>
        <Spacer size={'xl'} />
        <Text variant={'title2'} color={theme.text.basic}>
          Сметы нет
        </Text>
        <Spacer size={12} />
        <Text
          variant={'bodySRegular'}
          color={theme.text.neutral}
          style={styles.text}
        >
          Данная задача не предусматривает наличие сметы
        </Text>
      </View>
    );
  }
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
          serviceIDs={serviceIDs}
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
              {service?.materials?.map(material => {
                const firstActionMaterial = () => {
                  onEdit(service.ID, material.name);
                };
                const secondActionMaterial = () => {
                  onDeleteMaterial(service, material);
                };
                return (
                  <View key={material.ID}>
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
        <EstimateTotal allSum={allSum} materialsSum={materialsSum} />
        {subsetID === TaskType.COMMON_AUCTION_SALE && (
          <View style={styles.mt16}>
            {offers.data?.count ? (
              <TouchableOpacity
                style={styles.candidatRow}
                onPress={onCompetitorEstimates}
              >
                <CalculatorIcon color={theme.text.basic} />
                <Text variant="bodySBold" color={theme.text.basic}>
                  Сметы других кандидатов
                </Text>
              </TouchableOpacity>
            ) : (
              <Text variant="bodySRegular" color={theme.text.neutral}>
                Предложений других кандидатов пока нет
              </Text>
            )}
            <TouchableOpacity
              style={styles.candidatRow}
              onPress={onTradingResults}
            >
              <GavelIcon />
              <Text variant="bodySBold" color={theme.text.basic}>
                Посмотреть результаты торгов
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};