import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CalculatorIcon } from '@/assets/icons/svg/estimate/CalculatorIcon';
import { CalculatorLargeIcon } from '@/assets/icons/svg/estimate/CalculatorLargeIcon';
import { GavelIcon } from '@/assets/icons/svg/estimate/GavelIcon';
import { EditIcon } from '@/assets/icons/svg/screens/EditIcon';
import { EstimateTotal } from '@/components/task/EstimateTotal';
import { TaskEstimateItem } from '@/components/task/TaskEstimateItem';
import { TaskEstimateOutline } from '@/components/task/TaskEstimateOutline';
import { AppScreenName, AppStackParamList } from '@/navigation/AppNavigation';
import { Offer, Service } from '@/store/api/tasks/types';
import {
  EstimateTab,
  OutlayStatusType,
  StatusType,
  TaskSetType,
  TaskType,
} from '@/types/task';

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
  onCantDeleteBannerVisible: () => void;
  subsetID: TaskType | undefined;
  currentEstimateTab: EstimateTab;
  winnerOffer: Offer | undefined;
  isContractor: boolean;
};

export const TaskCardEstimate: FC<TaskCardEstimateProps> = ({
  services,
  outlayStatusID,
  statusID,
  taskId,
  navigation,
  onCantDeleteBannerVisible,
  subsetID,
  currentEstimateTab,
  winnerOffer,
  isContractor,
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
    isAnotherOffers,
    addServiceBottomSheetClose,
    isTaskEctimateTab,
    currentServices,
    isOffersPublic,
    userComment,
    isOffersDeadlineOver,
    canSwipe,
    serviceIDs,
    addService,
    onCompetitorEstimates,
    onTradingResults,
    onEditEstimate,
    setId,
    isInternalExecutor,
  } = useTaskCardEstimate({
    services,
    taskId,
    navigation,
    currentEstimateTab,
    statusID,
    winnerOffer,
    subsetID,
    isContractor,
  });

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
        {outlayStatusID &&
          statusID === StatusType.WORK &&
          !isContractor &&
          subsetID &&
          [
            TaskType.COMMON_FIRST_RESPONSE,
            TaskType.IT_AUCTION_SALE,
            TaskType.IT_FIRST_RESPONSE,
          ].includes(subsetID) && (
            <TaskEstimateOutline
              outlayStatusID={outlayStatusID}
              onPress={onEstimateSheetVisible}
            />
          )}
        <Text variant={'title3'} color={theme.text.basic} style={styles.mb8}>
          Перечень услуг и материалов
        </Text>
        {currentServices.map(service => {
          const firstActionService = () => {
            onEdit(service.ID as number);
          };
          const secondActionService = () => {
            if (services.length > 1) {
              onDeleteService(service.ID as number);
            } else {
              onCantDeleteBannerVisible();
            }
          };
          return (
            <View key={service.ID}>
              <TaskEstimateItem
                firstAction={firstActionService}
                secondAction={secondActionService}
                title={service?.name}
                price={service?.price}
                count={service?.count}
                sum={service?.sum}
                roleID={service?.roleID}
                canSwipe={canSwipe}
                measure={service.measure?.toLowerCase()}
              />
              <Spacer size={0} separator="bottom" />
              {service?.materials?.map(material => {
                const firstActionMaterial = () => {
                  onEdit(service.ID as number, material.name);
                };
                const secondActionMaterial = () => {
                  onDeleteMaterial(service, material);
                };
                return (
                  <View key={material.ID}>
                    <TaskEstimateItem
                      measure={material.measure.split('(')[1]?.slice(0, -1)}
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
        {(isContractor &&
          subsetID &&
          [TaskType.IT_FIRST_RESPONSE, TaskType.IT_AUCTION_SALE].includes(
            subsetID
          )) ||
        (setId === TaskSetType.IT_SERVICES && isInternalExecutor) ? null : (
          <EstimateTotal allSum={allSum} materialsSum={materialsSum} />
        )}
        {subsetID &&
          [TaskType.COMMON_AUCTION_SALE, TaskType.IT_AUCTION_SALE].includes(
            subsetID
          ) && (
            <View style={styles.mt16}>
              {isTaskEctimateTab ? (
                <>
                  {isOffersPublic && (
                    <>
                      {!isOffersDeadlineOver && !winnerOffer ? (
                        <>
                          {isAnotherOffers ? (
                            <TouchableOpacity
                              style={styles.candidatRow}
                              onPress={onCompetitorEstimates}
                            >
                              <CalculatorIcon color={theme.text.basic} />
                              <Text
                                variant="bodySBold"
                                color={theme.text.basic}
                              >
                                Сметы других кандидатов
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <Text
                              variant="bodySRegular"
                              color={theme.text.neutral}
                            >
                              Предложений других кандидатов пока нет
                            </Text>
                          )}
                        </>
                      ) : (
                        <TouchableOpacity
                          style={styles.candidatRow}
                          onPress={onTradingResults}
                        >
                          <GavelIcon />
                          <Text variant="bodySBold" color={theme.text.basic}>
                            Посмотреть результаты торгов
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {!isOffersDeadlineOver && !winnerOffer && (
                    <TouchableOpacity
                      style={styles.edit}
                      onPress={onEditEstimate}
                    >
                      <EditIcon />
                      <Text variant="bodySBold" color={theme.text.basic}>
                        Редактировать смету
                      </Text>
                    </TouchableOpacity>
                  )}
                  {userComment && (
                    <>
                      <Spacer size={20} />
                      <View style={styles.comment}>
                        <Text
                          variant="captionRegular"
                          color={theme.text.neutral}
                        >
                          Ваш комментарий к ценовому предложению
                        </Text>
                        <Text variant="bodyMRegular" color={theme.text.basic}>
                          {userComment}
                        </Text>
                      </View>
                      <Spacer size={20} separator="bottom" />
                    </>
                  )}
                </>
              )}
            </View>
          )}
      </View>
    </>
  );
};
