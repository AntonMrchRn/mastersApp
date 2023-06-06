import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Button, Card, Text, useTheme } from 'rn-ui-kit';

import { AddressIcon } from '@/assets/icons/svg/screens/AddressIcon';
import { AvatarIcon } from '@/assets/icons/svg/screens/AvatarIcon';
import { CalendarCheckIcon } from '@/assets/icons/svg/screens/CalendarCheckIcon';
import { CaretDownIcon } from '@/assets/icons/svg/screens/CaretDownIcon';
import { EditIcon } from '@/assets/icons/svg/screens/EditIcon';
import { PhoneIcon } from '@/assets/icons/svg/screens/PhoneIcon';
import { DownloadManager } from '@/components/DownloadManager';
import { TaskCardStatus } from '@/screens/tabs/TaskCardScreen/useTaskCard';

import { useTaskCardDescription } from './useTaskCardDescription';

import { styles } from './styles';

type TaskCardDescriptionProps = {
  status: TaskCardStatus;
};
export const TaskCardDescription: FC<TaskCardDescriptionProps> = ({
  status,
}) => {
  const { contacts, files, getButton } = useTaskCardDescription(status);
  const theme = useTheme();

  return (
    <View>
      <Text variant="title3" style={styles.task} color={theme.text.basic}>
        О задаче
      </Text>
      <Text variant="bodySRegular" style={styles.text} color={theme.text.basic}>
        Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies egestas
        tempus feugiat sagittis at gravida. Duis vitae elit habitant tortor
        viverra semper dictum ultricies non. Lectus morbi ut nascetur varius.
        Etiam urna tincidunt nulla non leo malesuada consequat orci eget. Amet
        aliquet eu est egestas dictum interdum mattis vestibulum. Vitae integer.
        Tincidunt ultricies egestas tempus feugiat sagittis at gravida. Duis
        vitae elit habitant tortor viverra semper dictum ultricies non. Lectus
        morbi ut nascetur varius.
      </Text>
      <View style={styles.address}>
        <AddressIcon />
        <Text
          variant="bodySRegular"
          color={theme.text.basic}
          style={styles.ml10}
        >
          Краснодар, ул. Чекистов 24, кв. 89, нежилые помещения 1,2,3,4,5,6
          (Аптека Апрель)
        </Text>
      </View>
      <View style={styles.date}>
        <CalendarCheckIcon />
        <Text
          variant="bodySRegular"
          color={theme.text.basic}
          style={styles.ml10}
        >
          с 12 апреля 09:00 по 17 апреля 18:00
        </Text>
      </View>
      {status === 'inProgress' && (
        <TouchableOpacity style={styles.edit}>
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
      <View style={styles.button}>
        {getButton().map((button, index) => (
          <Button
            key={index}
            label={button.label}
            variant={button.variant}
            style={index !== 0 && { marginTop: 16 }}
            labelStyle={styles.labelStyle}
          />
        ))}
      </View>
    </View>
  );
};
