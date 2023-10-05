import { Image } from 'react-native-image-crop-picker';

import ImageResizer, {
  ResizeFormat,
} from '@bam.tech/react-native-image-resizer';

import { configApp } from '@/constants/platform';

export type Exif = {
  Orientation: 1 | 6 | 3 | 8 | 0;
  '{MakerApple}'?: object;
};

const COMPRESS_COEFFICIENT = 2;

const rotationByOrientation = {
  0: 0,
  1: 90,
  3: 270,
  6: 360,
  8: 180,
};

export const fixImageRotation = async (response: Image, quality?: number) => {
  const { exif, path, sourceURL, filename, width, height, mime } = response;
  const rotation = rotationByOrientation[(exif as Exif).Orientation];
  const format = mime.split('/')[1]?.toUpperCase() as ResizeFormat;

  try {
    const correctlyRotatedImageResponse = await ImageResizer.createResizedImage(
      configApp.ios ? (sourceURL as string) : path,
      width / COMPRESS_COEFFICIENT,
      height / COMPRESS_COEFFICIENT,
      format,
      quality ? quality * 100 : 100,
      rotation,
    );

    return {
      ...correctlyRotatedImageResponse,
      ...(configApp.ios && { filename }),
      filename: configApp.ios ? filename : path.split('/').at(-1),
      path: correctlyRotatedImageResponse.uri,
      mime,
    };
  } catch (err) {
    throw new Error(`fixImageRotation error: ${err}`);
  }
};
