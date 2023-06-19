import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaskedText } from 'react-native-mask-text';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CaretDownIcon } from '@/assets/icons/svg/screens/CaretDownIcon';
import { EditIcon } from '@/assets/icons/svg/screens/EditIcon';
import { DownloadManager } from '@/components/FileManager/DownloadManager';
import { TaskAddress } from '@/components/task/TaskAddress';
import { Contact, File } from '@/store/api/tasks/types';
import { StatusType } from '@/types/task';

import { TaskDate } from '../../../task/TaskDate';
import { TaskCardDateBottomSheet } from '../TaskCardDateBottomSheet';
import { useTaskCardDescription } from './useTaskCardDescription';

import { styles } from './styles';

type TaskCardDescriptionProps = {
  statusID: StatusType | undefined;
  description: string;
  address: string;
  startTime: string;
  endTimePlan: string;
  contacts: Contact[];
  files: File[];
  onChangeEndTimePlan: (time: string) => Promise<void>;
};

export const TaskCardDescription: FC<TaskCardDescriptionProps> = ({
  statusID,
  description,
  address,
  startTime,
  endTimePlan,
  contacts,
  files,
  onChangeEndTimePlan,
}) => {
  const {
    onDateModalVisible,
    dateModalVisible,
    inputDateValue,
    onInputDateValue,
    onDateBottomSheetButton,
  } = useTaskCardDescription(onChangeEndTimePlan);
  const theme = useTheme();

  return (
    <View>
      <TaskCardDateBottomSheet
        isVisible={dateModalVisible}
        onCancel={onDateModalVisible}
        onChange={onDateBottomSheetButton}
        value={inputDateValue}
        onChangeText={onInputDateValue}
      />
      <Text variant="title3" style={styles.mt36} color={theme.text.basic}>
        О задаче
      </Text>
      <Text variant="bodySRegular" style={styles.mt24} color={theme.text.basic}>
        {description}
      </Text>
      {address && (
        <View style={styles.address}>
          <TaskAddress address={address} />
        </View>
      )}
      {(startTime || endTimePlan) && (
        <View style={styles.date}>
          <TaskDate from={startTime} to={endTimePlan} />
        </View>
      )}
      {statusID === StatusType.WORK && (
        <TouchableOpacity style={styles.edit} onPress={onDateModalVisible}>
          <EditIcon />
          <Text
            variant="bodySBold"
            color={theme.text.basic}
            style={styles.ml10}
          >
            Изменить срок окончания
          </Text>
        </TouchableOpacity>
      )}
      {contacts.length ? (
        <>
          <View style={styles.contacts}>
            <Text variant="title3" color={theme.text.basic} style={styles.mr11}>
              Контакты
            </Text>
            <CaretDownIcon />
          </View>
          {contacts.map((contact, index) => {
            return (
              <View key={index}>
                <View>
                  <Text variant="captionRegular" color={theme.text.neutral}>
                    {contact?.position}
                  </Text>
                  <Text
                    variant="bodyMRegular"
                    color={theme.text.basic}
                    style={styles.name}
                  >
                    {contact?.sname} {contact?.name} {contact?.pname}
                  </Text>
                  {contact?.phone && (
                    <View style={styles.phone}>
                      <MaskedText
                        mask="+ 9 (999) 999-99-99"
                        style={[styles.phoneText, { color: theme.text.basic }]}
                      >
                        {contact?.phone?.toString()}
                      </MaskedText>
                    </View>
                  )}
                </View>
                <Spacer size={'m'} separator="top" />
              </View>
            );
          })}
        </>
      ) : (
        <></>
      )}
      {files.length ? (
        <>
          <View style={styles.attachments}>
            <Text variant="title3" color={theme.text.basic} style={styles.mr11}>
              Вложения
            </Text>
            <CaretDownIcon />
          </View>
          <DownloadManager files={files} />
        </>
      ) : (
        <></>
      )}
    </View>
  );
};
