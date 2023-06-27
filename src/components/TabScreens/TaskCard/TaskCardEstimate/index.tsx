import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';

import { Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import { TaskEstimateItem } from '@/components/task/TaskEstimateItem';
import { TaskEstimateOutline } from '@/components/task/TaskEstimateOutline';
import { useGetTaskQuery, usePatchTaskMutation } from '@/store/api/tasks';
import { Material, Service } from '@/store/api/tasks/types';
import { OutlayStatusType, StatusType } from '@/types/task';

import { TaskCardAddEstimateBottomSheet } from '../TaskCardAddEstimateBottomSheet';

import { styles } from './styles';

type TaskCardEstimateProps = {
  services: Service[];
  outlayStatusID: OutlayStatusType | undefined;
  statusID: StatusType | undefined;
  taskId: number;
};

export const TaskCardEstimate: FC<TaskCardEstimateProps> = ({
  services,
  outlayStatusID,
  statusID,
  taskId,
}) => {
  const theme = useTheme();
  const toast = useToast();
  const getTask = useGetTaskQuery(taskId.toString());

  const [patchTask, mutationTask] = usePatchTaskMutation();

  const [sheetVisible, setSheetVisible] = useState(false);

  const allSum = services.reduce((acc, val) => acc + val.sum, 0);
  const allMaterials = services.reduce<Material[]>(
    (acc, val) =>
      acc.concat(typeof val.materials !== 'undefined' ? val.materials : []),
    []
  );
  const materialsSum = allMaterials.reduce(
    (acc, val) => acc + (val?.count || 0) * (val?.price || 0),
    0
  );
  useEffect(() => {
    if (mutationTask.error && 'data' in mutationTask.error) {
      toast.show({
        type: 'error',
        title: mutationTask?.error?.data?.message,
        contentHeight: 120,
      });
    }
  }, [mutationTask.error]);

  const onEdit = (id: number) => {
    getTask.refetch();
  };
  const onDeleteService = async (id: number) => {
    const newServices = services.filter(servic => servic.ID !== id);
    await patchTask({
      //id таски
      // ID: taskId,
      services: newServices,
    });
    getTask.refetch();
  };
  const onSheetVisible = () => {
    setSheetVisible(!sheetVisible);
  };

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
          const firstAction = () => {
            onEdit(service.ID);
          };
          const secondAction = () => {
            onDeleteService(service.ID);
          };
          return (
            <View key={service.ID}>
              <TaskEstimateItem
                firstAction={firstAction}
                secondAction={secondAction}
                title={service?.name}
                price={service?.price}
                count={service?.count}
                sum={service?.sum}
              />
              <Spacer size={0} separator="bottom" />
              {service?.materials?.map((material, inde) => {
                return (
                  <View key={material.measure + material.name + inde}>
                    <TaskEstimateItem
                      firstAction={firstAction}
                      secondAction={secondAction}
                      title={material?.name}
                      price={material?.price}
                      count={material?.count}
                      sum={(material?.count || 0) * (material?.price || 0)}
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
