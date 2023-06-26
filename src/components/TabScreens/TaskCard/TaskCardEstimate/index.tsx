import React, { FC, useState } from 'react';
import { View } from 'react-native';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { TaskEstimateItem } from '@/components/task/TaskEstimateItem';
import { TaskEstimateOutline } from '@/components/task/TaskEstimateOutline';
import { Service } from '@/store/api/tasks/types';
import { OutlayStatusType, StatusType } from '@/types/task';

import { TaskCardAddEstimateBottomSheet } from '../TaskCardAddEstimateBottomSheet';

import { styles } from './styles';

type TaskCardEstimateProps = {
  services: Service[];
  outlayStatusID: OutlayStatusType | undefined;
  statusID: StatusType | undefined;
};

export const TaskCardEstimate: FC<TaskCardEstimateProps> = ({
  services,
  outlayStatusID,
  statusID,
}) => {
  const theme = useTheme();
  const [sheetVisible, setSheetVisible] = useState(false);
  const allSum = services.reduce((acc, val) => acc + val.sum, 0);
  const onEdit = (id: number) => {
    //
  };
  const onDelete = (id: number) => {
    //
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
        <TaskEstimateOutline
          outlayStatusID={outlayStatusID}
          onPress={onSheetVisible}
        />
        <Text variant={'title3'} color={theme.text.basic} style={styles.mb8}>
          Перечень услуг и материалов
        </Text>
        {services.map((service, index) => {
          const firstAction = () => {
            onEdit(service.ID);
          };
          const secondAction = () => {
            onDelete(service.ID);
          };
          return (
            <View key={service.ID}>
              <TaskEstimateItem
                service={service}
                previewActions={!index}
                firstAction={firstAction}
                secondAction={secondAction}
              />
              <Spacer size={0} separator="bottom" />
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
              0 ₽
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
