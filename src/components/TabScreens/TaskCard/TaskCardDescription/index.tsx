import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Banner, Button, Card, Text, useTheme } from 'rn-ui-kit';

import { AvatarIcon } from '@/assets/icons/svg/screens/AvatarIcon';
import { CaretDownIcon } from '@/assets/icons/svg/screens/CaretDownIcon';
import { EditIcon } from '@/assets/icons/svg/screens/EditIcon';
import { PhoneIcon } from '@/assets/icons/svg/screens/PhoneIcon';
import { DownloadManager } from '@/components/DownloadManager';
import { TaskAddress } from '@/components/task/TaskAddress';
import { TaskCardStatus } from '@/screens/tabs/TaskCardScreen/useTaskCard';

import { TaskDate } from '../../../task/TaskDate';
import { TaskCardBudgetModal } from '../TaskCardBudgetModal';
import { TaskCardCancelBottomSheet } from '../TaskCardCancelBottomSheet';
import { TaskCardDateBottomSheet } from '../TaskCardDateBottomSheet';
import { useTaskCardDescription } from './useTaskCardDescription';

import { styles } from './styles';

type TaskCardDescriptionProps = {
  statusCode: TaskCardStatus;
  description: string;
  address: string;
};
export const TaskCardDescription: FC<TaskCardDescriptionProps> = ({
  statusCode,
  description,
  address,
}) => {
  const {
    contacts,
    files,
    buttons,
    banner,
    budgetModalVisible,
    onBudgetModalVisible,
    onRevokeBudget,
    onDateModalVisible,
    dateModalVisible,
    dateFrom,
    dateTo,
    inputDateValue,
    onInputDateValue,
    onDateBottomSheetButton,
    cancelModalVisible,
    onCancelModalVisible,
    onCancelTask,
  } = useTaskCardDescription(statusCode);
  const theme = useTheme();

  return (
    <View>
      <TaskCardBudgetModal
        isVisible={budgetModalVisible}
        onCancel={onBudgetModalVisible}
        onRevoke={onRevokeBudget}
      />
      <TaskCardCancelBottomSheet
        isVisible={cancelModalVisible}
        onCancel={onCancelModalVisible}
        onRefuse={onCancelTask}
      />
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
      <View style={styles.address}>
        <TaskAddress address={address} />
      </View>
      <View style={styles.date}>
        <TaskDate from={dateFrom} to={dateTo} />
      </View>
      {statusCode === 'signing' && (
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
                {contact.title}
              </Text>
              <Text
                variant="bodySRegular"
                color={theme.text.basic}
                style={styles.name}
              >
                {contact.name}
              </Text>
              <View style={styles.phone}>
                <View style={styles.mr10}>
                  <PhoneIcon />
                </View>
                <Text variant="bodySRegular" color={theme.text.basic}>
                  {contact.phone}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      ))}
      <View style={styles.attachments}>
        <Text variant="title3" color={theme.text.basic} style={styles.mr11}>
          Вложения
        </Text>
        <CaretDownIcon />
      </View>
      <DownloadManager files={files} />
      <View style={styles.bottom}>
        {buttons.map((button, index) => (
          <Button
            onPress={button.onPress}
            key={index}
            label={button.label}
            variant={button.variant}
            style={index !== 0 && { marginTop: 16 }}
          />
        ))}
        {banner && (
          <Banner
            type={banner.type}
            icon={banner.icon}
            text={banner.text}
            title={banner.title}
          />
        )}
      </View>
    </View>
  );
};
