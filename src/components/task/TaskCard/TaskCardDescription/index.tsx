import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { MaskedText } from 'react-native-mask-text';

import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import { CaretDownIcon } from '@/assets/icons/svg/screens/CaretDownIcon';
import { UsersIcon } from '@/assets/icons/svg/screens/UsersIcon';
import { DownloadManager } from '@/components/FileManager/DownloadManager';
import { TaskAddress } from '@/components/task/TaskAddress';
import { useDeleteInvitationMutation } from '@/store/api/tasks';
import { Contact, Executor, WebData } from '@/store/api/tasks/types';
import { AxiosQueryErrorResponse } from '@/types/error';
import { File } from '@/types/fileManager';
import { StatusType, TaskType } from '@/types/task';

import { TaskDate } from '../../TaskDate';

import { styles } from './styles';

type TaskCardDescriptionProps = {
  description: string;
  address: string;
  startTime: string;
  endTimePlan: string;
  contacts: Contact[];
  applicationFiles: File[];
  statusID: StatusType | undefined;
  webdata: WebData | undefined;
  executors: Executor[] | [];
  subsetID: TaskType | undefined;
  isCurator: boolean;
};

export const TaskCardDescription = ({
  description,
  address,
  startTime,
  endTimePlan,
  contacts,
  applicationFiles,
  statusID,
  webdata,
  executors,
  subsetID,
  isCurator,
}: TaskCardDescriptionProps) => {
  const theme = useTheme();

  const toast = useToast();

  const [deleteInvitation, { isLoading, isError, error }] =
    useDeleteInvitationMutation();

  const cancelInvitation = async (memberID?: number) => {
    memberID && (await deleteInvitation(memberID));
  };

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
      });
    }
  }, [isError]);

  const onDelete = async ({ filePath }: { filePath?: string }) => {
    filePath && (await ReactNativeBlobUtil.fs.unlink(filePath));
  };
  return (
    <View>
      {/* Выбор подрядчиков  */}
      {subsetID &&
      [TaskType.IT_AUCTION_SALE, TaskType.IT_FIRST_RESPONSE].includes(
        subsetID
      ) &&
      isCurator &&
      statusID === StatusType.ACTIVE ? (
        <>
          <Text variant="title3" style={styles.mt36} color={theme.text.basic}>
            Приглашенные подрядчики
          </Text>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              style={styles.pv20}
              color={theme.background.accent}
            />
          ) : executors.length ? (
            executors.map((executor, index) => {
              return (
                <View key={index}>
                  <View style={styles.mt16}>
                    <Text variant="captionRegular" color={theme.text.neutral}>
                      ID {executor.ID}
                    </Text>
                    <Text variant="bodyMRegular">
                      {executor.name} {executor.pname} {executor.sname}
                    </Text>
                    {executor.phone ? (
                      <MaskedText
                        mask="+ 9 (999) 999-99-99"
                        style={[styles.phoneText, { color: theme.text.basic }]}
                      >
                        {executor?.phone?.toString()}
                      </MaskedText>
                    ) : (
                      <Text variant="bodyMRegular">{executor.email}</Text>
                    )}
                    <View style={styles.wrapBottom}>
                      <View style={styles.wrapStatus}>
                        {executor.isRefuse && (
                          <Text
                            variant="captionRegular"
                            color={theme.background.danger}
                            style={styles.mt5}
                          >
                            Отказался от задачи
                          </Text>
                        )}
                        {executor.isConfirm && (
                          <Text
                            variant="captionRegular"
                            color={theme.background.success}
                            style={styles.mt5}
                          >
                            Задачу принял
                          </Text>
                        )}
                        {!executor.isRefuse && !executor.isConfirm && (
                          <Text
                            variant="captionRegular"
                            color={theme.text.warning}
                            style={styles.mt5}
                          >
                            Пока не принял задачу
                          </Text>
                        )}
                      </View>
                      <Button
                        label="Отменить приглашение"
                        size="S"
                        variant="ghost"
                        style={styles.wrapInvitation}
                        onPress={() => cancelInvitation(executor?.memberID)}
                      />
                    </View>
                    <Spacer size={'m'} separator="bottom" />
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.mt16}>
              <View style={styles.wrapBottom}>
                <View style={styles.w20}>
                  <UsersIcon />
                </View>
                <View style={styles.w80}>
                  <Text variant="bodySRegular" color={theme.text.neutral}>
                    Для выполнения задачи пригласите хотя-бы одного подрядчика
                  </Text>
                </View>
              </View>
            </View>
          )}
          {!isLoading && executors.length ? (
            <Button
              label="Изменить выбор"
              size="S"
              style={styles.mt16}
              onPress={() => console.log('Переход на выбор подрядчика')}
            />
          ) : (
            <Button
              label="Пригласить"
              size="S"
              style={styles.mt16}
              onPress={() => console.log('Пригласить подрядчика')}
            />
          )}
        </>
      ) : (
        <></>
      )}

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

      {/* Контакты в задаче */}
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

      {/* Интернет данные */}
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

      {/* Прикрепленные файлы */}
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
