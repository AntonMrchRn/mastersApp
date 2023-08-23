import { DocumentPickerResponse } from 'react-native-document-picker';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import { Asset, ImagePickerResponse } from 'react-native-image-picker';

import dayjs from 'dayjs';

import { UploadAction } from '@/components/FileManager/UploadBottomSheet';
import { configApp } from '@/constants/platform';

export const fillFormData = (
  formData: FormData,
  result: ImagePickerResponse | DocumentPickerResponse[] | ImageOrVideo[],
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
    return (result as ImagePickerResponse)?.assets as Asset[];
  };
  const assets = getAssets();

  assets?.map((asset, index) => {
    const getName = () => {
      if (actionType === UploadAction.TakeFromFiles) {
        return (asset as DocumentPickerResponse)?.name;
      }
      if (actionType === UploadAction.TakeFromGallery) {
        if (configApp.android) {
          return (asset as ImageOrVideo)?.path.split('/').at(-1);
        }
        return (asset as ImageOrVideo)?.filename;
      }
      if (
        [UploadAction.TakePhotoMedia, UploadAction.TakeVideoMedia].includes(
          actionType
        )
      ) {
        return `МастерА-${dayjs().format('DD/MM/YYYY-hh:mm:ss')}`;
      }
      return (asset as Asset)?.fileName?.split('.')[0] || `name-${index}`;
    };
    const name = getName()?.split('.')[0] || `name-${index}`;
    const getType = () => {
      if (actionType === UploadAction.TakeFromGallery) {
        return (asset as ImageOrVideo).mime;
      }
      return (asset as Asset).type;
    };
    const getUri = () => {
      if (actionType === UploadAction.TakeFromGallery) {
        if (configApp.android) {
          return (asset as ImageOrVideo)?.path;
        }
        return (asset as ImageOrVideo)?.sourceURL;
      }
      return (asset as Asset)?.uri;
    };
    const size = [
      UploadAction.TakeFromFiles,
      UploadAction.TakeFromGallery,
    ].includes(actionType)
      ? (asset as DocumentPickerResponse)?.size
      : (asset as Asset)?.fileSize;

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
