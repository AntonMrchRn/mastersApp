import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker, {
  Image,
  ImageOrVideo,
  Video,
} from 'react-native-image-crop-picker';

import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { BottomSheet, Button, Text, useTheme, useToast } from 'rn-ui-kit';

import { FileIcon } from '@/assets/icons/svg/files/FileIcon';
import { CameraIcon } from '@/assets/icons/svg/screens/CameraIcon';
import { GalleryIcon } from '@/assets/icons/svg/screens/GalleryIcon';
import { VideoIcon } from '@/assets/icons/svg/screens/VideoIcon';
import { configApp } from '@/constants/platform';
import { useAppDispatch } from '@/store';
import { useGetCompressRateQuery } from '@/store/api/tasks';
import { AxiosQueryErrorResponse } from '@/types/error';
import { HandleUpload } from '@/types/fileManager';
import { checkSizes } from '@/utils/fileManager/checkSizes';
import { fillFormData } from '@/utils/fileManager/fillFormData';
import { Exif, fixImageRotation } from '@/utils/fileManager/fixImageRotation';

import styles from './styles';

export enum UploadAction {
  TakeFromGallery = 'TakeFromGallery',
  TakePhotoMedia = 'TakePhotoMedia',
  TakeVideoMedia = 'TakeVideoMedia',
  TakeFromFiles = 'TakeFromFiles',
}

type UploadBottomSheetProps = {
  isVisible: boolean;
  formData: FormData;
  onClose: () => void;
  onBanner: () => void;
  deleteProgress: ActionCreatorWithPayload<string>;
  handleUpload: ({ formData, files, date }: HandleUpload) => void;
  isUserFile?: boolean;
  toClose?: boolean | undefined;
};

export const UploadBottomSheet = ({
  formData,
  onClose,
  onBanner,
  isVisible,
  handleUpload,
  deleteProgress,
  isUserFile = false,
  toClose = false,
}: UploadBottomSheetProps) => {
  const theme = useTheme();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const compressRateQuery = useGetCompressRateQuery();
  const quality = compressRateQuery.data || 0.8;

  const uploadActions = {
    // передаем quality для IOS здесь, потому что фото с камеры
    // и фото из галереи (которые не сделаны на это устройство)
    // не обрабатываются функцией fixImageRotation
    // андроид при передаче параметра compressImageQuality меняет оригинальное наименование файла
    [UploadAction.TakeFromGallery]: async () =>
      await ImagePicker.openPicker({
        mediaType: isUserFile ? 'photo' : 'any',
        includeExif: true,
        multiple: true,
        maxFiles: 10,
        ...(configApp.ios && { compressImageQuality: quality }),
      }),
    [UploadAction.TakePhotoMedia]: async () =>
      await ImagePicker.openCamera({
        includeExif: true,
        mediaType: 'photo',
        ...(configApp.ios && { compressImageQuality: quality }),
      }),
    [UploadAction.TakeVideoMedia]: async () =>
      await ImagePicker.openCamera({ mediaType: 'video' }),
    [UploadAction.TakeFromFiles]: async () =>
      await DocumentPicker.pick({
        type: configApp.android
          ? [
              'image/jpeg',
              'image/png',
              'image/webp',
              'application/zip',
              'application/pdf',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'application/vnd.ms-excel',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              'image/gif',
              ...(!toClose
                ? [
                    'video/mpeg',
                    'video/mp4',
                    'video/ogg',
                    'video/webm',
                    'video/quicktime',
                    'video/x-matroska',
                  ]
                : []),
            ]
          : [
              'public.jpg',
              'public.jpeg',
              'public.png',
              'public.zip-archive',
              'com.adobe.pdf',
              'public.content',
              'com.microsoft.excel.xls',
              'org.openxmlformats.spreadsheetml.sheet',
              'com.compuserve.gif',
              ...(!toClose
                ? [
                    'public.mpeg',
                    'public.mpeg-4',
                    'com.apple.quicktime-movie',
                    'io.iina.mkv',
                    'dyn.ah62d4rv4ge804450',
                    DocumentPicker.types.video,
                  ]
                : []),
            ],
      }),
  };

  const convertResponse = (result: ImageOrVideo[]) =>
    result.map((resp: Image | Video) => {
      const isImage = resp.mime.split('/')[0] === 'image';

      // ios
      // если фото из галереи и оно сделано на данное устройство
      // (скриншоты/загруженные картинки и т.п. не теряют корректный поворот(rotation) и не нуждаются в обработке)
      const isImageTakenOnThisIOS =
        isImage &&
        configApp.ios &&
        !!((resp as Image)?.exif as Exif)['{MakerApple}'];

      // передаем quality только для android, потому что для ios передается
      // параметр compressImageQuality в опциях пикера
      return isImage && (configApp.android || isImageTakenOnThisIOS)
        ? fixImageRotation(
            resp as Image,
            configApp.android ? quality : undefined,
          )
        : resp;
    });

  const onUploadAction = async (actionType: UploadAction) => {
    onClose();
    setTimeout(async () => {
      const date = new Date().toISOString();

      try {
        let result = await uploadActions[actionType]();

        // исправление поворота изображения на android
        // и ios (только в кейсе загрузки изображения, снятого на данное устройство, из галереи)
        if (actionType === UploadAction.TakePhotoMedia && configApp.android) {
          // передаем quality только для android, потому что для ios передается
          // параметр compressImageQuality в опциях пикера
          result = await fixImageRotation(result as Image, quality);
        }

        if (actionType === UploadAction.TakeFromGallery) {
          result = await Promise.all(convertResponse(result as ImageOrVideo[]));
        }
        //////////

        if ((result as ImageOrVideo[]).length > 10) {
          return toast.show({
            type: 'error',
            title: 'Превышено максимальное число файлов (10)',
          });
        }

        const { sizes, files, names } = fillFormData(
          formData,
          result,
          actionType,
        );
        const check = checkSizes({
          sizes,
          isUserFile,
          isDoc: actionType === UploadAction.TakeFromFiles,
        });

        if (check) {
          await handleUpload({
            formData,
            files,
            date,
            names,
          });
        } else {
          onBanner();
        }
      } catch (error) {
        if (
          typeof error === 'object' &&
          error !== null &&
          'data' in error &&
          typeof error.data === 'object' &&
          error.data !== null &&
          'message' in error.data &&
          typeof error.data.message === 'string' &&
          (error as AxiosQueryErrorResponse).data.message !== 'canceled'
        ) {
          toast.show({
            type: 'error',
            title: (error as AxiosQueryErrorResponse).data.message,
          });
        }
      } finally {
        dispatch(deleteProgress(date));
      }
    }, 500);
  };

  const actions = [
    {
      icon: <GalleryIcon />,
      title: 'Выбрать из галереи',
      action: () => onUploadAction(UploadAction.TakeFromGallery),
    },
    {
      icon: <CameraIcon />,
      title: 'Сделать фото',
      action: () => onUploadAction(UploadAction.TakePhotoMedia),
    },
    // в загруженные документы и документы пользователя нельзя кидать видео
    ...(!isUserFile && !toClose
      ? [
          {
            icon: <VideoIcon />,
            title: 'Сделать видео',
            action: () => onUploadAction(UploadAction.TakeVideoMedia),
          },
        ]
      : []),
    {
      icon: <FileIcon />,
      title: 'Выбрать из файлов',
      action: () => onUploadAction(UploadAction.TakeFromFiles),
    },
  ];

  return (
    <BottomSheet
      isVisible={isVisible}
      title="Загрузка файлов"
      closeIconPress={onClose}
      titleStyle={styles.mt12}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      backdropTransitionOutTiming={0}
      subtitle="Не более 10 вложений одновременно"
    >
      <View style={styles.container}>
        {actions.map(action => (
          <View key={action.title}>
            <TouchableOpacity onPress={action.action} style={styles.action}>
              <View style={styles.icon}>{action.icon}</View>
              <Text variant="bodyMRegular" color={theme.text.basic}>
                {action.title}
              </Text>
            </TouchableOpacity>
            <View
              style={[
                styles.line,
                { backgroundColor: theme.background.neutralDisableSecond },
              ]}
            />
          </View>
        ))}
        <Button
          size="M"
          variant="outlineAccent"
          label="Отмена"
          style={styles.mt24}
          onPress={onClose}
        />
      </View>
    </BottomSheet>
  );
};
