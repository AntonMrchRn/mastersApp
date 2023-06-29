import { PixelRatio } from 'react-native';

import { deviceWidth } from '@/constants/platform';

const ratio: number = PixelRatio.getFontScale();
const idealWidth = 390;

const scaleFontSize = (fontSize = 1): number => {
  const divisionRatio: number = idealWidth / (fontSize / ratio);
  return deviceWidth / divisionRatio;
};

export { scaleFontSize };
