import React, { FC } from 'react';
import { View } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { MaskedText } from 'react-native-mask-text';

import { Spacer, Text, useTheme } from 'rn-ui-kit';

import { CaretDownIcon } from '@/assets/icons/svg/screens/CaretDownIcon';
import { DownloadManager } from '@/components/FileManager/DownloadManager';
import { TaskAddress } from '@/components/task/TaskAddress';
import { Contact, Task, WebData } from '@/store/api/tasks/types';
import { File } from '@/types/fileManager';
import { StatusType } from '@/types/task';

import { TaskDate } from '../../TaskDate';

import { styles } from './styles';

type TaskCardDescriptionProps = {
  description: string;
  address: string;
  startTime: string;
  endTimePlan: string;
  contacts: Contact[];
  files: File[];
  statusID: StatusType | undefined;
  webdata: WebData | undefined;
};

export const TaskCardDescription: FC<TaskCardDescriptionProps> = ({
  description,
  address,
  startTime,
  endTimePlan,
  contacts,
  files,
  statusID,
  webdata,
}) => {
  const theme = useTheme();

  const applicationFiles = files.filter(file => file.isApplication);

  const onDelete = async ({ filePath }: { filePath?: string }) => {
    filePath && (await ReactNativeBlobUtil.fs.unlink(filePath));
  };
  console.log('webdata', webdata);
  return (
    <View>
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
      {contacts.length && statusID !== StatusType.ACTIVE ? (
        <>
          <View style={styles.contacts}>
            <Text variant="title3" color={theme.text.basic} style={styles.mr11}>
              Контакты
            </Text>
          </View>
          {contacts.map((contact, index) => {
            return (
              <View key={index} style={styles.wrapperGrid}>
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

      {webdata && statusID !== StatusType.ACTIVE ? (
        <>
          <View style={styles.contacts}>
            <Text variant="title3" color={theme.text.basic} style={styles.mr11}>
              Интернет данные
            </Text>
          </View>
          <View style={styles.wrapperGrid}>
            <View>
              <Text variant="captionRegular" color={theme.text.neutral}>
                Статус
              </Text>
              <Text
                variant="bodyMRegular"
                color={theme.text.basic}
                style={styles.name}
              >
                {webdata?.connectionStageName}
              </Text>
            </View>
            <Spacer size={'m'} separator="top" />

            <View>
              <Text variant="captionRegular" color={theme.text.neutral}>
                Логин
              </Text>
              <Text
                variant="bodyMRegular"
                color={theme.text.basic}
                style={styles.name}
              >
                {webdata?.login}
              </Text>
            </View>
            <Spacer size={'m'} separator="top" />

            <View>
              <Text variant="captionRegular" color={theme.text.neutral}>
                Пароль
              </Text>
              <Text
                variant="bodyMRegular"
                color={theme.text.basic}
                style={styles.name}
              >
                {webdata?.password}
              </Text>
            </View>
            <Spacer size={'m'} separator="top" />

            <View>
              <Text variant="captionRegular" color={theme.text.neutral}>
                IP-адрес
              </Text>
              <Text
                variant="bodyMRegular"
                color={theme.text.basic}
                style={styles.name}
              >
                {webdata?.IPadress}
              </Text>
            </View>
            <Spacer size={'m'} separator="top" />

            <View>
              <Text variant="captionRegular" color={theme.text.neutral}>
                Маска
              </Text>
              <Text
                variant="bodyMRegular"
                color={theme.text.basic}
                style={styles.name}
              >
                {webdata?.IPmask}
              </Text>
            </View>
            <Spacer size={'m'} separator="top" />

            <View>
              <Text variant="captionRegular" color={theme.text.neutral}>
                Шлюз
              </Text>
              <Text
                variant="bodyMRegular"
                color={theme.text.basic}
                style={styles.name}
              >
                {webdata?.IPgateway}
              </Text>
            </View>
            <Spacer size={'m'} separator="top" />
          </View>
        </>
      ) : (
        <></>
      )}

      {applicationFiles.length ? (
        <>
          <View style={styles.attachments}>
            <Text variant="title3" color={theme.text.basic} style={styles.mr11}>
              Вложения
            </Text>
            <CaretDownIcon />
          </View>
          <DownloadManager files={applicationFiles} onDelete={onDelete} />
        </>
      ) : (
        <></>
      )}
    </View>
  );
};
