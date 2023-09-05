import { DocumentPickerResponse } from 'react-native-document-picker';
import { Image, ImageOrVideo, Video } from 'react-native-image-crop-picker';

import dayjs from 'dayjs';

import { UploadAction } from '@/components/FileManager/UploadBottomSheet';
import { configApp } from '@/constants/platform';

export const fillFormData = (
  formData: FormData,
  result: Image | Video | ImageOrVideo[] | DocumentPickerResponse[],
  actionType: UploadAction
) => {
  let files: { name: string; size: number }[] = [];
  let sizes: { size: number; type: string }[] = [];

  const names: string[] = [];
  const getAssets = () => {
    if (actionType === UploadAction.TakeFromFiles) {
      return result as DocumentPickerResponse[];
    }
    if (actionType === UploadAction.TakeFromGallery) {
      return result as ImageOrVideo[];
    }
    return [result as ImageOrVideo];
  };
  const assets = getAssets();

  assets?.map((asset, index) => {
    const getName = () => {
      if (actionType === UploadAction.TakeFromFiles) {
        return (asset as DocumentPickerResponse)?.name;
      }
      if (actionType === UploadAction.TakeFromGallery) {
        const isImage = (asset as ImageOrVideo).mime.split('/')[0] === 'image';

        // наименование изображения
        if (isImage) {
          return (asset as Image)?.filename;
        }

        // наименование видео
        if (configApp.android) {
          return (asset as Video)?.path.split('/').at(-1);
        }
        return (asset as Video)?.filename;
      }
      if (
        [UploadAction.TakePhotoMedia, UploadAction.TakeVideoMedia].includes(
          actionType
        )
      ) {
        return `МастерА-${dayjs().format('D/MM/YYYY-hh:mm:ss')}`;
      }
      return `МастерА-${dayjs().format('D/MM/YYYY-hh:mm:ss')}`;
    };
    const name = getName()?.split('.')[0] || `name-${index}`;
    const getType = () => {
      if (actionType !== UploadAction.TakeFromFiles) {
        return (asset as ImageOrVideo).mime;
      }
      return (asset as DocumentPickerResponse).type;
    };
    const getUri = () => {
      if (actionType === UploadAction.TakePhotoMedia && configApp.ios) {
        return `file://${(asset as Image).path}`;
      }

      if (actionType !== UploadAction.TakeFromFiles) {
        return (asset as ImageOrVideo)?.path;
      }
      return (asset as DocumentPickerResponse)?.uri;
    };
    const size = asset?.size;

    formData.append(`file${Number(index) + 1}`, {
      uri: getUri(),
      type: getType() || '',
      name,
    });
    formData.append(`name${Number(index) + 1}`, name);
    files = files.concat({
      name: name || `name${Number(index) + 1}`,
      size: size || 0,
    });
    sizes = sizes.concat({
      size: size || 0,
      type: getType() || '',
    });
    names.push(name || `name${Number(index) + 1}`);
  });

  return { sizes, files, names };
};
