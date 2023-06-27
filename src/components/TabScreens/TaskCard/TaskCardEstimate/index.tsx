import React, { FC } from 'react';
import { View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { TaskEstimateItem } from '@/components/task/TaskEstimateItem';
import { TaskEstimateOutline } from '@/components/task/TaskEstimateOutline';
import { Service } from '@/store/api/tasks/types';
import {
  TaskSearchNavigationParamList,
  TaskSearchNavigatorScreenName,
} from '@/types/navigation';
import { OutlayStatusType, StatusType } from '@/types/task';

import { TaskCardAddEstimateBottomSheet } from '../TaskCardAddEstimateBottomSheet';
import { useTaskCardEstimate } from './useTaskCardEstimate';

import { styles } from './styles';

type TaskCardEstimateProps = {
  services: Service[];
  outlayStatusID: OutlayStatusType | undefined;
  statusID: StatusType | undefined;
  taskId: number;
  navigation: StackNavigationProp<
    TaskSearchNavigationParamList,
    TaskSearchNavigatorScreenName.TaskCard,
    undefined
  >;
};

export const TaskCardEstimate: FC<TaskCardEstimateProps> = ({
  services,
  outlayStatusID,
  statusID,
  taskId,
  navigation,
}) => {
  const {
    sheetVisible,
    onSheetVisible,
    allSum,
    materialsSum,
    onEdit,
    onDeleteService,
    onDeleteMaterial,
  } = useTaskCardEstimate({
    services,
    taskId,
    navigation,
  });
  console.log('🚀 ~ file: index.tsx:53 ~ services:', services);
  const theme = useTheme();

  return (
    <>
      <TaskCardAddEstimateBottomSheet
        isVisible={sheetVisible}
        onCancel={onSheetVisible}
        pressMaterial={function (): void {
          throw new Error('Function not implemented.');
        }}
        pressService={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <View>
        <Spacer size={'xxxl'} />
        {outlayStatusID && statusID === StatusType.WORK && (
          <TaskEstimateOutline
            outlayStatusID={outlayStatusID}
            onPress={onSheetVisible}
          />
        )}
        {/* <TaskEstimateOutline
          outlayStatusID={outlayStatusID}
          onPress={onSheetVisible}
        /> */}
        <Text variant={'title3'} color={theme.text.basic} style={styles.mb8}>
          Перечень услуг и материалов
        </Text>
        {services.map(service => {
          const firstActionService = () => {
            onEdit(service.ID);
          };
          const secondActionService = () => {
            onDeleteService(service.ID);
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
              />
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
