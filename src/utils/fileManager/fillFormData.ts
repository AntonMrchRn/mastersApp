import { DocumentPickerResponse } from 'react-native-document-picker';
import { Asset, ImagePickerResponse } from 'react-native-image-picker';

import { configApp } from '@/constants/platform';

export const fillFormData = (
  formData: FormData,
  result: ImagePickerResponse | DocumentPickerResponse[],
  isDocumentPicker = false
) => {
  let files: { name: string; size: number }[] = [];
  let sizes: { size: number; type: string }[] = [];

  const names: string[] = [];
  const assets = isDocumentPicker
    ? (result as DocumentPickerResponse[])
    : ((result as ImagePickerResponse)?.assets as Asset[]);

  assets?.map((asset, index) => {
    const nameWithExtension = isDocumentPicker
      ? (asset as DocumentPickerResponse)?.name
      : configApp.android
      ? (asset as Asset)?.fileName?.split('rn_image_picker_lib_temp_')[1]
      : (asset as Asset)?.fileName;
    const name = nameWithExtension?.split('.')[0];
    const size = isDocumentPicker
      ? (asset as DocumentPickerResponse)?.size
      : (asset as Asset)?.fileSize;

    formData.append(`file${Number(index) + 1}`, {
      uri: asset?.uri,
      type: asset.type,
      name,
    });
    formData.append(`name${Number(index) + 1}`, name);
    files = files.concat({
      name: name || `name${Number(index) + 1}`,
      size: size || 0,
    });
    sizes = sizes.concat({
      size: size || 0,
      type: asset?.type || '',
    });
    names.push(name || `name${Number(index) + 1}`);
  });

  return { sizes, files, names };
};
