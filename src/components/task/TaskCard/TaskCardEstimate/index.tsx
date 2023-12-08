import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CalculatorIcon } from '@/assets/icons/svg/estimate/CalculatorIcon';
import { GavelIcon } from '@/assets/icons/svg/estimate/GavelIcon';
import { EditIcon } from '@/assets/icons/svg/screens/EditIcon';
import PreviewNotFound, {
  PreviewNotFoundType,
} from '@/components/tabs/TaskSearch/PreviewNotFound';
import { EstimateTotal } from '@/components/task/EstimateTotal';
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
import { MaterialItem } from './MaterialItem';
import { ServiceItem } from './ServiceItem';
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
  serviceMultiplier: number;
  cantDeleteBannerVisible: boolean;
  curatorId?: number;
  withNDS?: boolean;
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
  serviceMultiplier,
  curatorId,
  cantDeleteBannerVisible,
  withNDS,
}) => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const {
    bsRef,
    setId,
    userID,
    onEdit,
    refetch,
    canSwipe,
    showOffers,
    servicesSum,
    addService,
    userComment,
    serviceNames,
    materialsSum,
    clientComment,
    onEditEstimate,
    isOffersPublic,
    onPressService,
    currentServices,
    onPressMaterial,
    isAnotherOffers,
    isInternalExecutor,
    isEstimateEditable,
    isOffersDeadlineOver,
    onCandidateEstimates,
    onEstimateSheetClose,
    estimateSheetVisible,
    onEstimateSheetVisible,
    addServiceBottomSheetClose,
  } = useTaskCardEstimate({
    services,
    taskId,
    navigation,
    currentEstimateTab,
    statusID,
    subsetID,
    isContractor,
    curatorId,
  });

  if (!services.length) {
    return <PreviewNotFound type={PreviewNotFoundType.NoEstimate} />;
  }

  return (
    <>
      <TaskCardAddEstimateBottomSheet
        isVisible={estimateSheetVisible}
        onCancel={onEstimateSheetClose}
        pressMaterial={onPressMaterial}
        pressService={onPressService}
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
      <View>
        {outlayStatusID &&
          statusID === StatusType.WORK &&
          !isContractor &&
          subsetID &&
          [
            TaskType.COMMON_FIRST_RESPONSE,
            TaskType.IT_AUCTION_SALE,
            TaskType.IT_FIRST_RESPONSE,
            TaskType.IT_INTERNAL_EXECUTIVES,
          ].includes(subsetID) && (
            <TaskEstimateOutline
              showAddButton={
                subsetID !== TaskType.IT_AUCTION_SALE && !isContractor
              }
              showEstimateStatus={!isInternalExecutor}
              outlayStatusID={outlayStatusID}
              onPress={onEstimateSheetVisible}
            />
          )}
        <Text variant={'title3'} color={theme.text.basic} style={styles.mb8}>
          Перечень услуг и материалов
        </Text>
        {currentServices.map(service => {
          const firstActionService = () => onEdit(service.ID as number);
          const handleBanner = () =>
            !cantDeleteBannerVisible && onCantDeleteBannerVisible();

          return (
            <View key={service.ID}>
              <ServiceItem
                subsetID={subsetID}
                firstAction={firstActionService}
                title={service?.name}
                servicesLength={services.length}
                price={service?.price}
                count={service?.count}
                sum={(service?.count || 0) * (service?.price || 0)}
                roleID={service?.roleID}
                canSwipe={canSwipe}
                measure={service.measure?.toLowerCase()}
                outlayStatusID={outlayStatusID}
                statusID={statusID}
                serviceID={service.ID as number}
                refetch={refetch}
                isContractor={isContractor}
                handleBanner={handleBanner}
              />
              <Spacer size={0} separator="bottom" />
              {service?.materials?.map(material => {
                const firstActionMaterial = () => {
                  onEdit(service.ID as number, material.name);
                };

                return (
                  <View key={material.ID}>
                    <MaterialItem
                      subsetID={subsetID}
                      isContractor={isContractor}
                      measure={material?.measure.toLowerCase()}
                      firstAction={firstActionMaterial}
                      title={material?.name}
                      price={material?.price}
                      count={material?.count}
                      sum={(material?.count || 0) * (material?.price || 0)}
                      roleID={material?.roleID}
                      canSwipe={canSwipe}
                      outlayStatusID={outlayStatusID}
                      statusID={statusID}
                      refetch={refetch}
                      taskId={taskId}
                      materialID={material?.ID}
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
            subsetID,
          )) ||
        (setId === TaskSetType.IT_SERVICES && isInternalExecutor) ? null : (
          <EstimateTotal
            servicesSum={servicesSum}
            materialsSum={materialsSum}
            withNDS={withNDS}
            serviceMultiplier={
              subsetID === TaskType.COMMON_FIRST_RESPONSE
                ? serviceMultiplier
                : undefined
            }
          />
        )}
        {showOffers && (
          <View style={styles.mt16}>
            {!isEstimateEditable ? (
              <>
                {isOffersPublic && (
                  <>
                    {!isOffersDeadlineOver && !winnerOffer ? (
                      <>
                        {isAnotherOffers ? (
                          <TouchableOpacity
                            style={styles.candidatRow}
                            onPress={() => onCandidateEstimates(false)}
                          >
                            <CalculatorIcon color={theme.text.basic} />
                            <Text variant="bodySBold" color={theme.text.basic}>
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
                      <>
                        {isOffersDeadlineOver && (
                          <>
                            {winnerOffer && winnerOffer?.userID !== userID ? (
                              <TouchableOpacity
                                style={styles.candidatRow}
                                onPress={() => onCandidateEstimates(true)}
                              >
                                <GavelIcon />
                                <Text
                                  variant="bodySBold"
                                  color={theme.text.basic}
                                >
                                  Посмотреть результаты торгов
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <>
                                {!winnerOffer && isAnotherOffers ? (
                                  <TouchableOpacity
                                    style={styles.candidatRow}
                                    onPress={() => onCandidateEstimates(false)}
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
                                    Предложений других кандидатов нет
                                  </Text>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {((!isOffersDeadlineOver && !winnerOffer) ||
                  (statusID === StatusType.WORK &&
                    subsetID === TaskType.IT_AUCTION_SALE)) && (
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
                      <Text variant="captionRegular" color={theme.text.neutral}>
                        Ваш комментарий к ценовому предложению
                      </Text>
                      <Text variant="bodyMRegular" color={theme.text.basic}>
                        {userComment}
                      </Text>
                    </View>
                    <Spacer size={20} separator="bottom" />
                  </>
                )}
                {clientComment && (
                  <>
                    <Spacer size={20} />
                    <View style={styles.comment}>
                      <Text variant="captionRegular" color={theme.text.neutral}>
                        Ответ координатора
                      </Text>
                      <Text variant="bodyMRegular" color={theme.text.basic}>
                        {clientComment}
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
