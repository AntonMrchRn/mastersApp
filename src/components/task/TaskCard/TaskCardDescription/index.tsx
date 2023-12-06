import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { MaskedText } from 'react-native-mask-text';

import { Button, Spacer, Text, useTheme, useToast } from 'rn-ui-kit';

import { CarIcon } from '@/assets/icons/svg/screens/CarIcon';
import { UsersIcon } from '@/assets/icons/svg/screens/UsersIcon';
import { DownloadManager } from '@/components/FileManager/DownloadManager';
import { TaskAddress } from '@/components/task/TaskAddress';
import { TaskDate } from '@/components/task/TaskDate';
import { useDeleteInvitationMutation } from '@/store/api/tasks';
import {
  Car,
  Contact,
  Coordinator,
  Executor,
  WebData,
} from '@/store/api/tasks/types';
import { AxiosQueryErrorResponse } from '@/types/error';
import { File } from '@/types/fileManager';
import { StatusType, TaskType } from '@/types/task';

import { ContactItem } from './ContactItem';

import { styles } from './styles';

type TaskCardDescriptionProps = {
  address: string;
  endTime: string;
  startTime: string;
  description: string;
  contacts: Contact[];
  car: Car | undefined;
  isITServices: boolean;
  applicationFiles: File[];
  executors: Executor[] | [];
  isInternalExecutor: boolean;
  isConfirmedCurator: boolean;
  regionID: number | undefined;
  webdata: WebData | undefined;
  subsetID: TaskType | undefined;
  statusID: StatusType | undefined;
  navigateToContractors: () => void;
  coordinator: Coordinator | undefined;
  contractorsInvitedByCurator: Executor[] | [];
};

export const TaskCardDescription = ({
  car,
  address,
  endTime,
  webdata,
  regionID,
  contacts,
  statusID,
  subsetID,
  executors,
  startTime,
  coordinator,
  description,
  isITServices,
  applicationFiles,
  isInternalExecutor,
  isConfirmedCurator,
  navigateToContractors,
  contractorsInvitedByCurator,
}: TaskCardDescriptionProps) => {
  const theme = useTheme();
  const toast = useToast();

  const [deleteInvitation, { isLoading, isError, error }] =
    useDeleteInvitationMutation();

  const showContractorsInvitationButton = contractorsInvitedByCurator.every(
    contractor => !contractor.isConfirm,
  );

  useEffect(() => {
    if (isError) {
      toast.show({
        type: 'error',
        title: (error as AxiosQueryErrorResponse).data.message,
      });
    }
  }, [isError]);

  const cancelInvitation = async (memberID?: number) =>
    memberID && (await deleteInvitation(memberID));

  const onDelete = async ({ filePath }: { filePath?: string }) => {
    filePath && (await ReactNativeBlobUtil.fs.unlink(filePath));
  };

  const handlePhone = async (phone: number) => {
    const url = `tel:+${phone}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    }
  };
  const isWebData = !!webdata && Object.values(webdata).some(it => !!it);
  return (
    <View>
      {/* Выбор подрядчиков  */}
      {subsetID &&
      [TaskType.IT_AUCTION_SALE, TaskType.IT_FIRST_RESPONSE].includes(
        subsetID,
      ) &&
      isConfirmedCurator &&
      statusID === StatusType.ACTIVE ? (
        <>
          <Text variant="title3" color={theme.text.basic}>
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
                      <TouchableOpacity
                        onPress={() => handlePhone(executor?.phone as number)}
                      >
                        <MaskedText
                          mask="+ 9 (999) 999-99-99"
                          style={[
                            styles.phoneText,
                            { color: theme.text.basic },
                          ]}
                        >
                          {executor?.phone?.toString()}
                        </MaskedText>
                      </TouchableOpacity>
                    ) : (
                      <Text variant="bodyMRegular">{executor.email}</Text>
                    )}
                    <View style={styles.wrapBottom}>
                      <View style={styles.wrapStatus}>
                        {executor.isRefuse && (
                          <Text
                            variant="captionRegular"
                            color={theme.background.danger}
                          >
                            Отказался от задачи
                          </Text>
                        )}
                        {executor.isConfirm && (
                          <Text
                            variant="captionRegular"
                            color={theme.background.success}
                          >
                            Задачу принял
                          </Text>
                        )}
                        {!executor.isRefuse && !executor.isConfirm && (
                          <Text
                            variant="captionRegular"
                            color={theme.text.warning}
                          >
                            Пока не принял задачу
                          </Text>
                        )}
                      </View>
                      <Button
                        size="S"
                        variant="ghost"
                        label="Отменить приглашение"
                        style={styles.wrapInvitation}
                        onPress={() => cancelInvitation(executor?.memberID)}
                      />
                    </View>
                    <Spacer
                      size={'m'}
                      separator="bottom"
                      separatorColor={theme.background.neutralDisableSecond}
                    />
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
          {showContractorsInvitationButton && (
            <Button
              label={
                !isLoading && contractorsInvitedByCurator.length
                  ? 'Изменить выбор'
                  : 'Пригласить'
              }
              size="S"
              style={styles.mt16}
              onPress={navigateToContractors}
            />
          )}
          <Spacer size="xxxl" />
        </>
      ) : (
        <></>
      )}

      <Text variant="title3" color={theme.text.basic}>
        О задаче
      </Text>
      <Text variant="bodySRegular" style={styles.mt24} color={theme.text.basic}>
        {description}
      </Text>
      <Spacer size="l" />
      {isInternalExecutor && statusID !== StatusType.ACTIVE && (
        <View style={styles.car}>
          <CarIcon />
          <Text variant="bodySRegular">
            {car
              ? `${car.model}, гос. номер ${car.number}`
              : 'Автомобиль не нужен'}
          </Text>
        </View>
      )}
      {address && (
        <TaskAddress
          address={address}
          textColor={theme.text.basic}
          {...(isITServices && { regionID })}
        />
      )}
      {(startTime || endTime) && (
        <TaskDate from={startTime} to={endTime} textColor={theme.text.basic} />
      )}

      {/* Контакты в задаче */}
      {(contacts.length || coordinator) &&
      statusID &&
      ![
        StatusType.ACTIVE,
        StatusType.CANCELLED_BY_CUSTOMER,
        StatusType.CANCELLED_BY_EXECUTOR,
      ].includes(statusID) ? (
        <>
          <Text variant="title3" color={theme.text.basic} style={styles.mt36}>
            Контакты
          </Text>
          <Spacer />
          {/* координатор */}
          {!!coordinator && (
            <ContactItem
              handlePhone={handlePhone}
              sname={coordinator.sname}
              name={coordinator.name}
              pname={coordinator.pname}
              note="Координатор"
              phone={coordinator.phone}
            />
          )}
          {contacts?.map((contact, index) => {
            return (
              <ContactItem
                key={index}
                handlePhone={handlePhone}
                sname={contact.sname}
                name={contact.name}
                pname={contact.pname}
                note={contact.note}
                phone={contact.phone}
              />
            );
          })}
        </>
      ) : (
        <></>
      )}

      {/* Интернет данные */}
      {isITServices && statusID !== StatusType.ACTIVE && (
        <>
          <Text variant="title3" color={theme.text.basic} style={styles.mt36}>
            Интернет данные
          </Text>
          <Spacer size={isWebData ? 'xl' : 's'} />
          {isWebData ? (
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
              <View>
                <Text variant="captionRegular" color={theme.text.neutral}>
                  Примечание
                </Text>
                <Text
                  variant="bodyMRegular"
                  color={theme.text.basic}
                  style={styles.name}
                >
                  {webdata?.description}
                </Text>
              </View>
            </View>
          ) : (
            <Text variant="bodySRegular" color={theme.text.neutral}>
              Информация отсутствует
            </Text>
          )}
        </>
      )}

      {/* Прикрепленные файлы */}

      <>
        <View style={styles.attachments}>
          <Text variant="title3" color={theme.text.basic} style={styles.mr11}>
            Вложения
          </Text>
        </View>
        <Spacer size={applicationFiles.length ? 'xl' : 's'} />
        {applicationFiles.length ? (
          <DownloadManager files={applicationFiles} onDelete={onDelete} />
        ) : (
          <Text variant="bodySRegular" color={theme.text.neutral}>
            Файлов нет
          </Text>
        )}
      </>
    </View>
  );
};
