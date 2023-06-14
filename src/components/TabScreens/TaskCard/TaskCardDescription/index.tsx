import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Card, Text, useTheme } from 'rn-ui-kit';

import { AvatarIcon } from '@/assets/icons/svg/screens/AvatarIcon';
import { CaretDownIcon } from '@/assets/icons/svg/screens/CaretDownIcon';
import { EditIcon } from '@/assets/icons/svg/screens/EditIcon';
import { PhoneIcon } from '@/assets/icons/svg/screens/PhoneIcon';
import { DownloadManager } from '@/components/DownloadManager';
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
};
export const TaskCardDescription: FC<TaskCardDescriptionProps> = ({
  statusID,
  description,
  address,
  startTime,
  endTimePlan,
  contacts,
  files,
}) => {
  const {
    onDateModalVisible,
    dateModalVisible,
    inputDateValue,
    onInputDateValue,
    onDateBottomSheetButton,
  } = useTaskCardDescription();
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
      <View style={styles.date}>
        <TaskDate from={startTime} to={endTimePlan} />
      </View>
      {statusID === StatusType.SIGNING && (
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
          {contacts.map((contact, index) => (
            <Card
              isShadow
              style={[
                styles.card,
                {
                  borderColor: theme.stroke.accentDisable,
                },
                index !== 0 && { marginTop: 16 },
              ]}
              key={index}
            >
              <View style={styles.cardBody}>
                <View style={styles.mr16}>
                  <AvatarIcon />
                </View>
                <View>
                  <Text variant="bodyMBold" color={theme.text.basic}>
                    {contact?.position}
                  </Text>
                  <Text
                    variant="bodySRegular"
                    color={theme.text.basic}
                    style={styles.name}
                  >
                    {contact?.sname} {contact?.name} {contact?.pname}
                  </Text>
                  <View style={styles.phone}>
                    <View style={styles.mr10}>
                      <PhoneIcon />
                    </View>
                    <Text variant="bodySRegular" color={theme.text.basic}>
                      {contact?.phone}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
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
