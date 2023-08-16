import { DocumentPickerResponse } from 'react-native-document-picker';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import { Asset, ImagePickerResponse } from 'react-native-image-picker';

import { configApp } from '@/constants/platform';

export const fillFormData = (
  formData: FormData,
  result: ImagePickerResponse | DocumentPickerResponse[] | ImageOrVideo[],
  isDocumentPicker = false,
  isCropPicker = false
) => {
  let files: { name: string; size: number }[] = [];
  let sizes: { size: number; type: string }[] = [];

  const names: string[] = [];
  const getAssets = () => {
    if (isDocumentPicker) {
      return result as DocumentPickerResponse[];
    }
    if (isCropPicker) {
      return result as ImageOrVideo[];
    }
    return (result as ImagePickerResponse)?.assets as Asset[];
  };
  const assets = getAssets();

  assets?.map((asset, index) => {
    const getName = () => {
      if (isDocumentPicker) {
        return (asset as DocumentPickerResponse)?.name;
      }
      if (isCropPicker) {
        if (configApp.android) {
          return (asset as ImageOrVideo)?.path.split('/').at(-1);
        }
        return (asset as ImageOrVideo)?.filename;
      }
      if (configApp.android) {
        return `МастерА-${
          (asset as Asset)?.fileName?.split('rn_image_picker_lib_temp_')[1]
        }`;
      }
      return (asset as Asset)?.fileName;
    };
    const name = getName()?.split('.')[0] || `name-${index}`;
    const getType = () => {
      if (isCropPicker) {
        return (asset as ImageOrVideo).mime;
      }
      return (asset as Asset).type;
    };
    const getUri = () => {
      if (isCropPicker) {
        if (configApp.android) {
          return (asset as ImageOrVideo)?.path;
        }
        return (asset as ImageOrVideo)?.sourceURL;
      }
      return (asset as Asset)?.uri;
    };
    const size =
      isDocumentPicker || isCropPicker
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
