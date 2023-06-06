import { Variant } from 'rn-ui-kit/lib/typescript/components/Button';

import { TaskCardStatus } from '@/screens/tabs/TaskCardScreen/useTaskCard';

export type TaskCardContants = {
  title: string;
  name: string;
  phone: string;
};
export const useTaskCardDescription = (status: TaskCardStatus) => {
  const contacts: TaskCardContants[] = [
    {
      title: 'Роль контактного лица',
      name: 'Иванов Иван Иванович',
      phone: '+7 (999) 999-99-99',
    },
    {
      title: 'Роль контактного лица',
      name: 'Иванов Иван Иванович',
      phone: '+7 (999) 999-99-99',
    },
  ];
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
  const getButton = (): { label: string; variant: Variant }[] => {
    switch (status) {
      case 'published':
        return [
          {
            label: 'Подать смету',
            variant: 'accent',
          },
        ];
      case 'inProgress':
        return [
          {
            label: 'Сдать работы',
            variant: 'accent',
          },
          {
            label: 'Отказаться от задачи',
            variant: 'outlineDanger',
          },
        ];
      default:
        return [];
    }
  };
  return { contacts, files, getButton };
};
