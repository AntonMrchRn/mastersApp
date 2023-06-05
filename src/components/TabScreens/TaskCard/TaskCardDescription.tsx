import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text, useTheme } from 'rn-ui-kit';

import { AddressIcon } from '@/assets/icons/svg/screens/AddressIcon';
import { CalendarCheckIcon } from '@/assets/icons/svg/screens/CalendarCheckIcon';
import { CaretDownIcon } from '@/assets/icons/svg/screens/CaretDownIcon';
import { DownloadManager } from '@/components/DownloadManager';

export const TaskCardDescription: FC = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    task: {
      marginTop: 36,
    },
    text: {
      marginTop: 24,
    },
    address: {
      marginTop: 16,
      flexDirection: 'row',
    },
    date: {
      marginTop: 8,
      flexDirection: 'row',
    },
    ml10: {
      marginLeft: 10,
    },
    attachments: {
      marginTop: 36,
      marginBottom: 24,
      flexDirection: 'row',
      alignItems: 'center',
    },
    mr11: {
      marginRight: 11,
    },
    labelStyle: {
      fontFamily: 'Nunito Sans Bold',
      fontSize: 17,
      fontWeight: '700',
      lineHeight: 24,
    },
    button: {
      marginTop: 16,
      marginBottom: 12,
    },
  });
  const files = [
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/19945c8cc72150f1f1b08befd230cda5.png',
      name: 'Screenshot_7',
      fileID: 282,
      userID: 45,
      isCheck: false,
      isOffer: false,
      mime: 'image/png',
      extension: 'png',
      extensionOriginal: 'png',
      isApplication: true,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/c5509c4413f1bb001e430af9ba78b3dc.jpg',
      name: '169887-gorod-zdanie-purpur-tsvetnoy-liniya_gorizonta-7680x4320',
      fileID: 283,
      userID: 45,
      isCheck: false,
      isOffer: false,
      mime: 'image/jpeg',
      extension: 'jpg',
      extensionOriginal: 'jpg',
      isApplication: true,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/5f050b889b25f9ed68f7db4f7072ead4.mp4',
      name: '2022-09-30 14-54-49_Trim',
      fileID: 285,
      userID: 45,
      isCheck: false,
      isOffer: false,
      mime: 'video/mp4',
      extension: 'video',
      extensionOriginal: 'mp4',
      isApplication: true,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/af2d14c8f901b6ed9fa7e57f6cb9b5b3.jpg',
      name: '170099-priroda-derevo-dekoracii-peyzash-doroga-3840x2160',
      fileID: 290,
      userID: 43,
      isCheck: false,
      isOffer: true,
      mime: 'image/jpeg',
      extension: 'jpg',
      extensionOriginal: 'jpg',
      isApplication: false,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/995b4b540924a3b2bb13cdd638f4bda8.webp',
      name: 'test11234',
      fileID: 574,
      userID: 37,
      isCheck: false,
      isOffer: false,
      mime: 'image/webp',
      extension: 'webp',
      extensionOriginal: 'webp',
      isApplication: false,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/c8116803277e5ab2421e3dcf67d35c87.webp',
      name: 'test1123',
      fileID: 575,
      userID: 37,
      isCheck: false,
      isOffer: false,
      mime: 'image/webp',
      extension: 'webp',
      extensionOriginal: 'webp',
      isApplication: false,
      size: 100,
    },
    {
      url: 'https://246601.selcdn.ru/tasks-test/tasks/180/816a2b1781e343aa9c8e09e98dfc6f2f.pdf',
      name: 'Act-180',
      fileID: 578,
      userID: 8,
      isCheck: false,
      isOffer: false,
      mime: 'application/pdf',
      extension: 'pdf',
      extensionOriginal: 'pdf',
      isApplication: false,
      size: 100,
    },
  ];
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
      <View style={styles.attachments}>
        <Text variant="title3" color={theme.text.basic} style={styles.mr11}>
          Вложения
        </Text>
        <CaretDownIcon />
      </View>
      <DownloadManager files={files} />
      <View style={styles.button}>
        <Button label="Подать смету" labelStyle={styles.labelStyle} />
      </View>
    </View>
  );
};
